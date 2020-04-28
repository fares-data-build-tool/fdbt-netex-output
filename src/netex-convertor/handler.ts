import { S3Event } from 'aws-lambda';
import singleTicketNetexGenerator from './single-ticket/singleTicketNetexGenerator';
import periodTicketNetexGenerator from './period-ticket/periodTicketNetexGenerator';
import * as db from './data/auroradb';
import * as s3 from './data/s3';
import { MatchingData, PeriodTicket } from './types';

export const netexConvertorHandler = async (event: S3Event): Promise<void> => {
    try {
        const s3Data = await s3.fetchDataFromS3(event);

        const { type } = s3Data;

        console.info(`NeTEx generation starting for type: ${type}...`);

        if (type === 'pointToPoint') {
            const matchingData: MatchingData = s3Data;
            const operatorData = await db.getOperatorDataByNocCode(matchingData.nocCode);

            const serviceData = await db.getTndsServiceDataByNocCodeAndLineName(
                matchingData.nocCode,
                matchingData.lineName,
            );

            const netexGen = singleTicketNetexGenerator(matchingData, operatorData, serviceData);
            const generatedNetex = await netexGen.generate();

            const fileName = `${matchingData.operatorShortName.replace(/\/|\s/g, '_')}_${
                matchingData.lineName
            }_${new Date().toISOString()}.xml`;

            const fileNameWithoutSlashes = fileName.replace('/', '_');
            await s3.uploadNetexToS3(generatedNetex, fileNameWithoutSlashes);
        } else if (type === 'periodGeoZone' || type === 'periodMultipleServices') {
            const userPeriodTicket: PeriodTicket = s3Data;
            const operatorData = await db.getOperatorDataByNocCode(userPeriodTicket.nocCode);
            const netexGen = periodTicketNetexGenerator(userPeriodTicket, operatorData);
            const generatedNetex = await netexGen.generate();
            const fileName = `${userPeriodTicket.operatorName.replace(/\/|\s/g, '_')}_${
                userPeriodTicket.productName
            }_${new Date().toISOString()}.xml`;

            const fileNameWithoutSlashes = fileName.replace('/', '_');
            await s3.uploadNetexToS3(generatedNetex, fileNameWithoutSlashes);
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
