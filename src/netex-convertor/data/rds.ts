import AWS from 'aws-sdk';
import * as mysql from 'mysql2';
import { Query } from 'mysql2';

const { RDS_HOST } = process.env;

const getSsmParameterValue = async (parameterName: string): Promise<string> => {
    const ssm = new AWS.SSM();
    const params = {
        Name: parameterName,
        WithDecryption: true,
    };
    const value = await ssm.getParameter(params).promise();

    if (value === undefined || value.Parameter === undefined || value.Parameter.Value === undefined) {
        throw new Error('Parameters are undefined.');
    }

    return value.Parameter.Value;
};

const connectToDatabase = async (): Promise<mysql.Connection> => {
    let connection: mysql.Connection;
    try {
        const user = await getSsmParameterValue('fdbt-rds-netex-output-username');
        const password = await getSsmParameterValue('fdbt-rds-netex-output-password');

        connection = mysql.createConnection({
            host: RDS_HOST,
            database: 'FDBT',
            user,
            password,
        });
    } catch (error) {
        throw new Error(`Error connecting to database: ${error.message}`);
    }
    return connection;
};

export const getAttributeValueFromNocTable = async (nocCode: string, attribute: string): Promise<Query> => {
    try {
        const connection = await connectToDatabase();
        const queryInput = `Select ${attribute} from nocTable where NocCode = "${nocCode}"`;
        const attributeValue = connection.query(queryInput);
        connection.end();

        return attributeValue;
    } catch (err) {
        throw new Error(`Could not retireve attribute value from database: ${err.name}, ${err.message}`);
    }
};

export const getAttributeValueFromNocPublicName = async (
    nocCode: string,
    attribute: string
): Promise<Query> => {
    try {
        const connection = await connectToDatabase();
        const queryInput = `Select ${attribute} from nocPublicName inner join NocTable on nocPublicName.pubNmId = nocTable.pubNmId where NocCode = "${nocCode}"`;
        const attributeValue = connection.query(queryInput);
        connection.end();

        return attributeValue;
    } catch (err) {
        throw new Error(`Could not retireve attribute value from database: ${err.name}, ${err.message}`);
    }
};

export const getAttributeValueFromNocLine = async (nocCode: string, attribute: string): Promise<Query> => {
    try {
        const connection = await connectToDatabase();
        const queryInput = `Select ${attribute} from nocLine where NocCode = "${nocCode}"`;
        const attributeValue = connection.query(queryInput);
        connection.end();

        return attributeValue;
    } catch (err) {
        throw new Error(`Could not retireve attribute value from database: ${err.name}, ${err.message}`);
    }
};

export const getAttributeValueFromTndsOperatorService = async (nocCode: string, lineName: string, attribute: string): Promise<Query> => {
    try {
        const connection = await connectToDatabase();
        const queryInput = `Select ${attribute} from tndsOperatorService where (NocCode = "${nocCode}" and lineName = "${lineName}"`;
        const attributeValue = connection.query(queryInput);
        connection.end();

        return attributeValue;
    } catch (err) {
        throw new Error(`Could not retireve attribute value from database: ${err.name}, ${err.message}`);
    }
};
