import { S3Event } from 'aws-lambda';
import singleTicketNetexGenerator from './single-ticket/singleTicketNetexGenerator';
import periodTicketNetexGenerator from './period-ticket/periodTicketNetexGenerator';
import * as rds from './data/rds';
import * as s3 from './data/s3';
import { OperatorData, ServiceData, MatchingData, GeographicalFareZonePass } from './types';

const getNocTableData = (nocCode: string): Promise<OperatorData> => {
    try {
        const opId = rds.getAttributeValueFromNocTable(nocCode, 'OpId');
        const vosaPSVLicenseName = rds.getAttributeValueFromNocTable(nocCode,
            'vosaPsvLicenseName',
        );

        return {
            opId,
            vosaPSVLicenseName,
        };
    } catch (error) {
        throw new Error(`Error retrieving nocTable info from dynamo: ${error.message}`);
    }
};

const getNocPublicNameData = (nocCode: string): Promise<OperatorData> => {
    try {
        const website = rds.getAttributeValueFromNocPublicName(nocCode, 'website');
        const ttrteEnq = rds.getAttributeValueFromNocPublicName(nocCode, 'ttrteEnq');
        const publicName = rds.getAttributeValueFromNocPublicName(nocCode, 'operatorPublicName');
        const fareEnq = rds.getAttributeValueFromNocPublicName(nocCode, 'fareEnq');
        const complEnq = rds.getAttributeValueFromNocPublicName(nocCode, 'ComplEnq');

        return {
            website,
            ttrteEnq,
            publicName,
            fareEnq,
            complEnq,
        };
    } catch (error) {
        throw new Error(`Error retrieving nocPublicName info from dynamo: ${error.message}`);
    }
};

const getNocLineData = (nocCode: string): Promise<OperatorData> => {
    try {
        const mode = rds.getAttributeValueFromNocLine(nocCode, 'mode');

        return {
            mode,
        };
    } catch (error) {
        throw new Error(`Error retrieving nocLine info from dynamo: ${error.message}`);
    }
};

const getTndsOperatorServiceData = (nocCode: string, lineName: string): Promise<ServiceData> => {
    try {
        const serviceDescription = rds.getAttributeValueFromTndsOperatorService(nocCode, lineName, 'serviceDescription');

        return {
            serviceDescription,
        };
    } catch (error) {
        throw new Error(`Error retrieving service info from dynamo: ${error.message}`);
    }
};

export const netexConvertorHandler = async (event: S3Event): Promise<void> => {
    try {
        const s3Data = await s3.fetchDataFromS3(event);
        if (s3Data.type === 'pointToPoint') {
            const matchingData: MatchingData = s3Data;
            const operatorData = getNocTableData(matchingData.nocCode);
            const operatorData = getNocPublicNameData(matchingData.nocCode);
            const operatorData = getNocLineData(matchingData.nocCode);
            const servicesData = getTndsOperatorServiceData(matchingData.nocCode, matchingData.lineName);
            const netexGen = singleTicketNetexGenerator(matchingData, operatorData, servicesData);
            const generatedNetex = await netexGen.generate();
            const fileName = `${matchingData.operatorShortName.replace(/\/|\s/g, '_')}_${
                matchingData.lineName
            }_${new Date().toISOString()}.xml`;
            const fileNameWithoutSlashes = fileName.replace('/', '_');
            await s3.uploadNetexToS3(generatedNetex, fileNameWithoutSlashes);
        } else if (s3Data.type === 'period') {
            const geoFareZonePass: GeographicalFareZonePass = s3Data;
            const operatorData = getNocTableData(geoFareZonePass.nocCode);
            const operatorData = getNocPublicNameData(geoFareZonePass.nocCode);
            const operatorData = getNocLineData(geoFareZonePass.nocCode);
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
