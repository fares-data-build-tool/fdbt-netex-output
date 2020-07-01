import AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';

export interface S3ObjectParameters {
    Bucket: string;
    Key: string;
}

const getS3Client = (): AWS.S3 => {
    let options = {};

    if (process.env.NODE_ENV === 'development') {
        options = {
            s3ForcePathStyle: true,
            accessKeyId: 'S3RVER',
            secretAccessKey: 'S3RVER',
            endpoint: new AWS.Endpoint('http://localhost:4572'),
        };
    }

    return new AWS.S3(options);
};

const s3 = getS3Client();

export const getNetexFileFromS3 = async (params: S3ObjectParameters): Promise<string> => {
    const data = await s3.getObject(params).promise();
    return data.Body?.toString('utf-8') ?? '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchDataFromMatchingS3 = async (event: S3Event): Promise<any> => {
    try {
        const s3MatchingBucket = process.env.MATCHING_DATA_BUCKET as string;
        const s3FileName: string = event.Records[0].s3.object.key.replace('.xml', '.json');
        const dataAsString: string =
            (
                await s3
                    .getObject({
                        Bucket: s3MatchingBucket,
                        Key: s3FileName,
                    })
                    .promise()
            ).Body?.toString('utf-8') ?? '';
        return JSON.parse(dataAsString);
    } catch (err) {
        throw new Error(`Error in retrieving data. ${err.stack}`);
    }
};
