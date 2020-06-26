import { S3Event } from 'aws-lambda';
import format from 'xml-formatter';
import pointToPointTicketNetexGenerator from './point-to-point-tickets/pointToPointTicketNetexGenerator';
import periodTicketNetexGenerator from './period-tickets/periodTicketNetexGenerator';
import * as db from './data/auroradb';
import * as s3 from './data/s3';
import { PointToPointTicket, PeriodTicket } from './types';

const uploadToS3 = async (netex: string, fileName: string): Promise<void> => {
    const cleanFileName = fileName.replace(/(\s|\/)/g, '_');
    await s3.uploadNetexToS3(
        netex
            ? format(netex, {
                  collapseContent: true,
              })
            : '',
        cleanFileName,
    );
};

const generateFileName = (nocCode: string, type: string, uuid: string): string =>
    `${nocCode}/${type}/${uuid}-${Date.now()}.xml`;

export const netexConvertorHandler = async (event: S3Event): Promise<void> => {
    try {
        const s3Data = await s3.fetchDataFromS3(event);
        const { type, uuid, nocCode } = s3Data;

        console.info(`NeTEx generation starting for type: ${type}...`);

        if (type === 'single' || type === 'return') {
            const matchingData: PointToPointTicket = s3Data;
            const operatorData = await db.getOperatorDataByNocCode(matchingData.nocCode);

            const netexGen = pointToPointTicketNetexGenerator(matchingData, operatorData);
            const generatedNetex = await netexGen.generate();

            const fileName = generateFileName(nocCode, type, uuid);

            await uploadToS3(generatedNetex, fileName);
        } else if (type === 'periodGeoZone' || type === 'periodMultipleServices' || type === 'flatFare') {
            const userPeriodTicket: PeriodTicket = s3Data;
            const operatorData = await db.getOperatorDataByNocCode(userPeriodTicket.nocCode);
            const netexGen = periodTicketNetexGenerator(userPeriodTicket, operatorData);
            const generatedNetex = await netexGen.generate();

            const fileName = generateFileName(nocCode, type, uuid);

            await uploadToS3(generatedNetex, fileName);
        } else {
            throw new Error(
                `The JSON object '${decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))}' in the '${
                    event.Records[0].s3.bucket.name
                }' bucket does not contain a 'type' attribute to distinguish product type.`,
            );
        }
    } catch (error) {
        console.error(error.stack);
        throw new Error(error);
    }

    console.info('NeTEx generation complete!');
};

export default netexConvertorHandler;
