import { createPool, Pool } from 'mysql2/promise';
import awsParamStore from 'aws-param-store';

export const getAuroraDBClient = (): Pool => {
    let client: Pool;

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        client = createPool({
            host: 'localhost',
            user: 'fdbt_site',
            password: 'password',
            database: 'fdbt',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    } else {
        client = createPool({
            host: process.env.RDS_HOST,
            user: awsParamStore.getParameterSync('fdbt-rds-site-username', { region: 'eu-west-2' }).Value,
            password: awsParamStore.getParameterSync('fdbt-rds-site-password', { region: 'eu-west-2' }).Value,
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

export const getAttributeValueByNocCode = async (nocCode: string, attribute: string, table: string): Promise<[]> => {
    try {
        let queryInput;
        switch (table) {
        case 'nocLine':    
        case 'nocTable':
            queryInput = `Select ${attribute} from ${table} where nocCode = ${nocCode}`;
            break;
        case 'nocPublicName':
            queryInput = `Select ${attribute} from ${table} inner join nocTable on nocPublicName.pubNmId = nocTable.pubNmId where nocCode = ${nocCode}`;
            break;
        default:
            throw new Error(`Unrecognised database table.`);
        }

        const queryResult = await executeQuery(queryInput);

        return queryResult;
        
    } catch (err) {
        throw new Error(`Could not retrieve attribute value from AuroraDB: ${err.name}, ${err.message}`);
    }
};

export const getAttributeValueByNocCodeAndLineName = async (nocCode: string, lineName: string, attribute: string, table: string): Promise<[]> => {
    try {
        const queryInput = `Select ${attribute} from ${table} where (nocCode = "${nocCode}" and lineName = "${lineName}")`;
            
        const queryResult = await executeQuery(queryInput);

        return queryResult;
        
    } catch (err) {
        throw new Error(`Could not retrieve attribute value from AuroraDB: ${err.name}, ${err.message}`);
    }
};
