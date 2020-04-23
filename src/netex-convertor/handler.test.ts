import { S3Event } from 'aws-lambda';
import { netexConvertorHandler } from './handler';
import * as mocks from './testdata/test-data';
import * as s3 from './data/s3';
import * as singleTicketNetexGenerator from './single-ticket/singleTicketNetexGenerator';
import * as periodGeoZoneTicketNetexGenerator from './period-geozone-ticket/periodGeoZoneTicketNetexGenerator';

jest.mock('./data/auroradb.ts');
jest.spyOn(s3, 'uploadNetexToS3').mockImplementation(() => Promise.resolve());

describe('netexConvertorHandler', () => {
    const event: S3Event = mocks.mockS3Event('BucketThing', 'TheBigBucketName');
    let mockFetchDataFromS3Spy: any;

    beforeEach(() => {
        mockFetchDataFromS3Spy = jest.spyOn(s3, 'fetchDataFromS3');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call the singleTicketNetexGenerator when a user uploads info for a single ticket', async () => {
        const singleTicketNetexGeneratorSpy = jest.spyOn(singleTicketNetexGenerator, 'default');
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        singleTicketNetexGeneratorSpy.mockImplementation(() => ({ generate: () => {} }));
        mockFetchDataFromS3Spy.mockImplementation(() => Promise.resolve(mocks.mockSingleTicketMatchingDataUpload));
        await netexConvertorHandler(event);
        expect(singleTicketNetexGeneratorSpy).toHaveBeenCalled();
    });

    it('should call the periodGeoZoneTicketNetexGenerator when a user uploads info for a period ticket', async () => {
        const periodGeoZoneTicketNetexGeneratorSpy = jest.spyOn(periodGeoZoneTicketNetexGenerator, 'default');
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        periodGeoZoneTicketNetexGeneratorSpy.mockImplementation(() => ({ generate: () => {} }));
        mockFetchDataFromS3Spy.mockImplementation(() => Promise.resolve(mocks.mockPeriodTicketMatchingDataUpload));
        await netexConvertorHandler(event);
        expect(periodGeoZoneTicketNetexGeneratorSpy).toHaveBeenCalled();
    });

    it('should throw an error if the user data uploaded to the fdbt-matching-data bucket does not contain a "type" attribute', async () => {
        mockFetchDataFromS3Spy.mockImplementation(() => Promise.resolve(mocks.mockMatchingDataUploadWithNoType));
        await expect(netexConvertorHandler(event)).rejects.toThrow();
    });
});
