import { S3Event } from 'aws-lambda';
import nodemailer from 'nodemailer';
import * as testData from './testData/testData';
import { createMailTransporter, odhUploaderHandler } from './handler';
import * as s3 from './data/s3';

jest.mock('aws-sdk');

describe('odhHandler SES emailer', () => {
    const mockMailTransporter = jest.fn();

    const mockFetchDataFromS3Spy = jest.spyOn(s3, 'fetchDataFromMatchingS3');
    const mockGetNetexFileFromS3 = jest.spyOn(s3, 'getNetexFileFromS3');

    beforeEach(() => {
        mockFetchDataFromS3Spy.mockImplementation(() => Promise.resolve({ Body: testData.testNetexFromS3 }));
        mockGetNetexFileFromS3.mockImplementation(() => Promise.resolve('Body: testData.testNetexFromS3'));

        (createMailTransporter as {}) = jest.fn().mockImplementation(() => {
            return {
                sendMail: mockMailTransporter,
            };
        });

        mockMailTransporter.mockImplementation(() => {
            return nodemailer.createTransport({
                streamTransport: true,
                newline: 'unix',
                buffer: true,
            });
        });
    });

    afterEach(() => {
        mockMailTransporter.mockReset();
    });

    it('sends an email', async () => {
        const key = 'NameOfNetexFile.xml';
        const event: S3Event = testData.testS3Event('thisIsMyBucket', key);

        await odhUploaderHandler(event);

        expect(mockMailTransporter).toBeCalledTimes(1);
    });
});
