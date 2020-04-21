import { createPool, Pool } from 'mysql2/promise';
import awsParamStore from 'aws-param-store';

export interface AttributeType {
    attribute: string;
}

export const getAuroraDBClient = (): Pool => {
    let client: Pool;

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        client = createPool({
            host: 'localhost',
            user: 'fdbt_netex',
            password: 'password',
            database: 'fdbt',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    } else {
        client = createPool({
            host: process.env.RDS_HOST,
            user: awsParamStore.getParameterSync('fdbt-rds-netex-output-username', { region: 'eu-west-2' }).Value,
            password: awsParamStore.getParameterSync('fdbt-rds-netex-output-password', { region: 'eu-west-2' }).Value,
            database: 'fdbt',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    return client;
};

let connectionPool: Pool;

const executeQuery = async (query: string): Promise <[]> => {
    if (!connectionPool) {
        connectionPool = getAuroraDBClient();
    }
    const [rows] = await connectionPool.execute(query);
    return JSON.parse(JSON.stringify(rows));
};

export const getAttributeValueByNocCode = async (nocCode: string): Promise<string> => {
    try {
        const queryInput = 'SELECT nocTable.opId, nocTable.vosaPsvLicenseName, nocTable.operatorPublicName,' +
        ' website.nocPublicName, ttrteEnq.nocPublicName, fareEnq.nocPublicName, complEnq.nocPublicName, nocLine.mode' +
        ' FROM ((nocTable INNER JOIN nocPublicName ON nocTable.pubNmId = nocPublicName.pubNmId)' +
        ' INNER JOIN nocLine ON nocTable.nocCode = nocLine.nocCode) WHERE `nocCode` = ?';

        const queryResult = (await executeQuery(queryInput, [nocCode])).map((item: AttributeType) => ({
            attribute: item.attribute,
        }));

        const attributeValue = queryResult[0].attribute;

        return attributeValue;
        
    } catch (err) {
        throw new Error(`Could not retrieve attribute value from AuroraDB: ${err.name}, ${err.message}`);
    }
};

export const getAttributeValueByNocCodeAndLineName = async (nocCode: string, lineName: string, attribute: string, table: string): Promise<string> => {
    try {
        const queryInput = `Select ${attribute} from ${table} where (nocCode = "${nocCode}" and lineName = "${lineName}")`;
            
        const queryResult = (await executeQuery(queryInput)).map((item: AttributeType) => ({
            attribute: item.attribute,
        }));

        const attributeValue = queryResult[0].attribute;

        return attributeValue;
        
    } catch (err) {
        throw new Error(`Could not retrieve attribute value from AuroraDB: ${err.name}, ${err.message}`);
    }
};
