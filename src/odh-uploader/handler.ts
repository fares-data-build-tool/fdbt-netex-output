import { S3Event } from 'aws-lambda';
import AWS from 'aws-sdk';
import { promises as fs } from 'fs';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { fetchDataFromMatchingS3, getNetexFileFromS3 } from './data/s3';
import emailTemplate from './template/emailTemplate';

export interface S3ObjectParameters {
    Bucket: string;
    Key: string;
}

export const createMailTransporter = (): Mail => {
    return nodemailer.createTransport({
        SES: new AWS.SES({
            apiVersion: '2010-12-01',
            region: 'eu-west-1',
        }),
    });
};

export interface ProductList {
    productName: string;
}

export interface ServiceList {
    lineName: string;
}

export const setS3ObjectParams = (event: S3Event): S3ObjectParameters => {
    const s3BucketName: string = event.Records[0].s3.bucket.name;
    const s3FileName: string = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    return {
        Bucket: s3BucketName,
        Key: s3FileName,
    };
};

export const setMailOptions = (
    params: S3ObjectParameters,
    pathToNetex: string,
    email: string,
    uuid: string,
    fareType: string,
    selectedServices: ServiceList[],
    products: ProductList[],
    passengerType: string,
): Mail.Options => {
    return {
        from: 'tfn@infinityworks.com',
        to: [email],
        subject: `NeTEx created for ${params.Key}`,
        text: `There was a file uploaded to '${params.Bucket}' [Filename: '${params.Key} ']`,
        html: emailTemplate(
            uuid,
            selectedServices,
            fareType,
            products,
            passengerType,
            `${new Date(Date.now()).toLocaleString()}}`,
        ),
        attachments: [
            {
                path: pathToNetex,
            },
        ],
    };
};

export const odhUploaderHandler = async (event: S3Event): Promise<void> => {
    try {
        const s3ObjectParams = setS3ObjectParams(event);
        const pathToSavedNetex = `/tmp/${s3ObjectParams.Key}`;
        const netexFile = await getNetexFileFromS3(s3ObjectParams);

        const dataAsString = await fetchDataFromMatchingS3(event);

        const { uuid, email, selectedServices, products, type, passengerType } = dataAsString;

        await fs.writeFile(pathToSavedNetex, netexFile);

        const mailOptions = setMailOptions(
            s3ObjectParams,
            pathToSavedNetex,
            email,
            uuid,
            type,
            selectedServices,
            products,
            passengerType,
        );

        const mailTransporter = createMailTransporter();

        const info: SentMessageInfo = await mailTransporter.sendMail(mailOptions);

        if (info.message) {
            console.info(`Email sent: ${info.message.toString()}`);
        } else {
            console.info(`Email sent.`);
        }
    } catch (err) {
        throw new Error(`SES SendEmail failed. Error: ${err.stack}`);
    }
};

export default odhUploaderHandler;
