import { PeriodGeoZoneTicket } from '../types';
import * as netexHelpers from './periodTicketNetexHelpers';
import { periodGeoZoneTicket, periodMultipleServicesTicket } from '../test-data/matchingData';
import operatorData from '../test-data/operatorData';
import {
    expectedScheduledStopPointsList,
    expectedTopographicProjectionsList,
    expectedLinesList,
    expectedLineRefList,
    expectedGeoZoneFareTables,
    expectedMultiServiceFareTables,
    expectedSalesOfferPackages,
    expectedGeoZonePreassignedFareProducts,
    expectedMultiServicesPreassignedFareProducts,
    expectedTimeIntervals,
    expectedMultiServiceFareStructureElements,
    expectedGeoZoneFareStructureElements,
} from '../test-data/testData';

describe('periodTicketNetexHelpers', () => {
    const { stops } = periodGeoZoneTicket;
    const geoUserPeriodTicket: PeriodGeoZoneTicket = periodGeoZoneTicket;
    const opData = operatorData;
    const placeHolderText = 'PLACEHOLDER';

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
            const linesList = netexHelpers.getLinesList(periodMultipleServicesTicket, opData);

            expect(linesList).toEqual(expectedLinesList);
        });
    });

    describe('getLineRefList', () => {
        it('returns a list of NeTEx line refs given a UserPeriodTicket object', () => {
            const lineRefList = netexHelpers.getLineRefList(periodMultipleServicesTicket);

            expect(lineRefList).toEqual(expectedLineRefList);
        });
    });

    describe('getGeoZoneFareTable', () => {
        it('returns a fare table for geoZone products', () => {
            const result = netexHelpers.getGeoZoneFareTable(geoUserPeriodTicket, placeHolderText);

            expect(result).toEqual(expectedGeoZoneFareTables);
        });
    });

    describe('getMultiServiceFareTable', () => {
        it('returns a fare table for multiple services products', () => {
            const result = netexHelpers.getMultiServiceFareTable(periodMultipleServicesTicket);

            expect(result).toEqual(expectedMultiServiceFareTables);
        });
    });

    describe('getSalesOfferPackageList', () => {
        it('returns a sales offer package for each product in the products array', () => {
            const result = netexHelpers.getSalesOfferPackageList(geoUserPeriodTicket);

            expect(result).toEqual(expectedSalesOfferPackages);
        });
    });

    describe('getPreassignedFareProduct', () => {
        it('returns a preassigned fare product per each product in the products array for geoZone', () => {
            const result = netexHelpers.getPreassignedFareProducts(
                geoUserPeriodTicket,
                `noc:${geoUserPeriodTicket.nocCode}`,
                'noc:TestOperatorOpId',
            );

            expect(result).toEqual(expectedGeoZonePreassignedFareProducts);
        });

        it('returns a preassigned fare product per each product in the products array for multiService', () => {
            const result = netexHelpers.getPreassignedFareProducts(
                periodMultipleServicesTicket,
                `noc:${periodMultipleServicesTicket.nocCode}`,
                'noc:TestOperatorOpId',
            );

            expect(result).toEqual(expectedMultiServicesPreassignedFareProducts);
        });
    });

    describe('getTimeIntervals', () => {
        it('returns a time interval for each product in the products array', () => {
            const result = netexHelpers.getTimeIntervals(periodMultipleServicesTicket);

            expect(result).toEqual(expectedTimeIntervals);
        });
    });

    describe('getFareStructureElements', () => {
        it.only('returns a list of fareSructureElements for each product in the products array for multiService', () => {
            const result = netexHelpers.getFareStructuresElements(multiServicePeriodData, placeHolderText);

            expect(result).toEqual(expectedMultiServiceFareStructureElements);
        });

        it('returns a list of fareSructureElements for each product in the products array for geoZone', () => {
            const result = netexHelpers.getFareStructuresElements(geoUserPeriodTicket, placeHolderText);

            expect(result).toEqual(expectedGeoZoneFareStructureElements);
        });
    });
});
