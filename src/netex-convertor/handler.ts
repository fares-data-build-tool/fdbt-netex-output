import { S3Event } from 'aws-lambda';
import singleTicketNetexGenerator from './single-ticket/singleTicketNetexGenerator';
import periodTicketNetexGenerator from './period-ticket/periodTicketNetexGenerator';
import * as rds from './data/rds';
import * as s3 from './data/s3';
import { OperatorData, ServiceData, MatchingData, GeographicalFareZonePass } from './types';

const getOperatorData = async (nocCode: string): Promise<OperatorData> => {
    try {
        const opId = await rds.getAttributeValueByNocCode(nocCode, 'OpId', 'nocTable');
        const vosaPSVLicenseName = await rds.getAttributeValueByNocCode(nocCode,
            'vosaPsvLicenseName', 'nocTable'
        );
        const website = await rds.getAttributeValueByNocCode(nocCode, 'website', 'nocPublicName');
        const ttrteEnq = await rds.getAttributeValueByNocCode(nocCode, 'ttrteEnq', 'nocPublicName');
        const publicName = await rds.getAttributeValueByNocCode(nocCode, 'operatorPublicName', 'nocTable');
        const fareEnq = await rds.getAttributeValueByNocCode(nocCode, 'fareEnq', 'nocPublicName');
        const complEnq = await rds.getAttributeValueByNocCode(nocCode, 'ComplEnq', 'nocPublicName');
        const mode = await rds.getAttributeValueByNocCode(nocCode, 'mode', 'nocLine');

        return {
            opId,
            vosaPSVLicenseName,
            website,
            ttrteEnq,
            publicName,
            fareEnq,
            complEnq,
            mode,
        };
    } catch (error) {
        throw new Error(`Error retrieving operator data from database: ${error.message}`);
    }
};

const getTndsServiceData = async (nocCode: string, lineName: string): Promise<ServiceData> => {
    try {
        const serviceDescription = await rds.getAttributeValueByNocCodeAndLineName(nocCode, lineName, 'description', 'tndsService');

        return {
            serviceDescription,
        };
    } catch (error) {
        throw new Error(`Error retrieving service data from database: ${error.message}`);
    }
};

export const netexConvertorHandler = async (event: S3Event): Promise<void> => {
    try {
        const s3Data = await s3.fetchDataFromS3(event);
        if (s3Data.type === 'pointToPoint') {
            const matchingData: MatchingData = s3Data;
            const operatorData = getOperatorData(matchingData.nocCode);
            const serviceData = getTndsServiceData(matchingData.nocCode, matchingData.lineName);
            const netexGen = singleTicketNetexGenerator(matchingData, operatorData, serviceData);
            const generatedNetex = await netexGen.generate();
            const fileName = `${matchingData.operatorShortName.replace(/\/|\s/g, '_')}_${
                matchingData.lineName
            }_${new Date().toISOString()}.xml`;
            const fileNameWithoutSlashes = fileName.replace('/', '_');
            await s3.uploadNetexToS3(generatedNetex, fileNameWithoutSlashes);
        } else if (s3Data.type === 'period') {
            const geoFareZonePass: GeographicalFareZonePass = s3Data;
            const operatorData = getOperatorData(geoFareZonePass.nocCode);
            const netexGen = periodTicketNetexGenerator(geoFareZonePass, operatorData);
            const generatedNetex = await netexGen.generate();
            const fileName = `${geoFareZonePass.operatorName.replace(/\/|\s/g, '_')}_${geoFareZonePass.zoneName}_${
                geoFareZonePass.productName
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
};

export default netexConvertorHandler;
