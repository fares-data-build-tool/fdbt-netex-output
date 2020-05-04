import * as netexHelpers from './periodTicketNetexHelpers';
import geoZonePeriodData from '../testdata/geoZonePeriodData';
import {
    expectedScheduledStopPointsList,
    expectedTopographicProjectionsList,
    expectedLinesList,
    expectedLineRefList,
    multiServicesPeriodData,
    operatorData
} from '../testdata/test-data';
import { getFareStructureElement } from './periodTicketNetexHelpers';
import { convertJsonToXml } from '../sharedHelpers';

describe('periodTicketNetexHelpers', () => {
    const { stops } = geoZonePeriodData;
    const userPeriodTicket = multiServicesPeriodData;
    const opData = operatorData;

    describe('getScheduledStopPointsList', () => {
        it('returns a list of NeTEx scheduled stop points given a list of stops', () => {
            const scheduledStopPointsList = netexHelpers.getScheduledStopPointsList(stops);

            expect(scheduledStopPointsList).toEqual(expectedScheduledStopPointsList);
        });
    });

    describe('getTopographicProjectionRefList', () => {
        it('returns a list of NeTEx topographic projections given a list of stops', () => {
            const topographicProjectionsList = netexHelpers.getTopographicProjectionRefList(stops);

            expect(topographicProjectionsList).toEqual(expectedTopographicProjectionsList);
        });
    });

    describe('getLinesList', () => {
        it('returns a list of NeTEx lines given a UserPeriodTicket object', () => {
            const linesList = netexHelpers.getLinesList(userPeriodTicket, opData);

            expect(linesList).toEqual(expectedLinesList);
        });
    });

    describe('getLineRefList', () => {
        it('returns a list of NeTEx line refs given a UserPeriodTicket object', () => {
            const lineRefList = netexHelpers.getLineRefList(userPeriodTicket);

            expect(lineRefList).toEqual(expectedLineRefList);
        });
    });

    describe('getFareStructureElement', () => {
        it('returns a fare structure element according to which number provided', () => {
            const fareStructureElementOne = convertJsonToXml(getFareStructureElement(1));
            const fareStructureElementTwo = convertJsonToXml(getFareStructureElement(2));
            const fareStructureElementThree = convertJsonToXml(getFareStructureElement(3));
            const fareStructureElementFour = convertJsonToXml(getFareStructureElement(4));
            const fareStructureElementFive = convertJsonToXml(getFareStructureElement(5));

            expect(fareStructureElementOne).toBe();
            expect(fareStructureElementTwo).toBe();
            expect(fareStructureElementThree).toBe();
            expect(fareStructureElementFour).toBe();
            expect(fareStructureElementFive).toBe();

        })
    })
});
