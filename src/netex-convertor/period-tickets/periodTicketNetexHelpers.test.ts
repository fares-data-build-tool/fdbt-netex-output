import { PeriodGeoZoneTicket } from '../types';
import * as netexHelpers from './periodTicketNetexHelpers';
import { periodGeoZoneTicket, periodMultipleServicesTicket, flatFareTicket } from '../test-data/matchingData';
import operatorData from '../test-data/operatorData';
import {
    expectedScheduledStopPointsList,
    expectedTopographicProjectionsList,
    expectedLinesList,
    expectedLineRefList,
    expectedGeoZoneFareTables,
    expectedMultiServiceFareTables,
    expectedSalesOfferPackages,
    expectedMultiServicesPreassignedFareProducts,
    expectedTimeIntervals,
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

    describe('getPreassignedFareProducts', () => {
        it('returns a preassigned fare product per each product in the products array for geoZone', () => {
            const result = netexHelpers.getPreassignedFareProducts(
                geoUserPeriodTicket,
                `noc:${geoUserPeriodTicket.nocCode}`,
                'noc:TestOperatorOpId',
            );

            const expectedFormat = {
                ChargingMomentType: expect.objectContaining({ $t: expect.any(String) }),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                OperatorRef: expect.objectContaining({ $t: expect.any(String), ref: expect.any(String), version: '1.0' }),
                ProductType: expect.objectContaining({ $t: expect.any(String) }),
                accessRightsInProduct: expect.any(Object),
                id: expect.any(String),
                typesOfFareProduct: expect.objectContaining({ TypeOfFareProductRef: expect.objectContaining({ ref: expect.any(String), version: expect.any(String) }) }),
                validableElements: expect.any(Object),
                version: '1.0',
            }

            result.forEach((preassignedFareProduct) => {
                expect(preassignedFareProduct).toEqual(expectedFormat);
            })

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

        it('returns 3 fareSructureElements for each product in the products array for multiService; Access Zones, Eligibility and Conditions of Travel', () => {
            const result = netexHelpers.getFareStructuresElements(flatFareTicket, placeHolderText);
            const namesOfTypesOfFareStructureElements: string[] = result.map((element) => {
                return element.Name.$t;
            });

            namesOfTypesOfFareStructureElements.forEach((name) => {
                expect(
                    name === 'Available zones' ||
                    name === 'Eligible user types' ||
                    name === 'Conditions of travel')
                    .toBeTruthy();
            })
        });

        it('returns 4 fareSructureElements for each product in the products array for multiService; Access Zones, Durations, Eligibility and Conditions of Travel', () => {
            const result = netexHelpers.getFareStructuresElements(periodMultipleServicesTicket, placeHolderText);
            const namesOfTypesOfFareStructureElements: string[] = result.map((element) => {
                return element.Name.$t;
            });

            namesOfTypesOfFareStructureElements.forEach((name) => {
                expect(
                    name === 'Available zones' ||
                    name === 'Available duration combination - Adult ticket' ||
                    name === 'Eligible user types' ||
                    name === 'Conditions of travel')
                    .toBeTruthy();
            })
        });

        it('returns 4 fareSructureElements for each product in the products array for geoZone; Access Zones, Durations, Eligibility and Conditions of Travel', () => {
            const result = netexHelpers.getFareStructuresElements(geoUserPeriodTicket, placeHolderText);
            const namesOfTypesOfFareStructureElements: string[] = result.map((element) => {
                return element.Name.$t;
            });

            namesOfTypesOfFareStructureElements.forEach((name) => {
                expect(
                    name === 'Available zones' ||
                    name === 'Available duration combination - Student ticket' ||
                    name === 'Eligible user types' ||
                    name === 'Conditions of travel')
                    .toBeTruthy();
            })
        });

        it('returns the fareStructureElements in the format we expect', () => {
            const geoResult = netexHelpers.getFareStructuresElements(geoUserPeriodTicket, placeHolderText);

            const expectedAccessZonesFareStructureElement = {
                version: '1.0',
                id: expect.stringContaining('op:Tariff@'),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                Description: expect.objectContaining({ $t: expect.any(String) }),
                TypeOfFareStructureElementRef: expect.objectContaining({ version: expect.any(String), ref: expect.any(String) }),
                GenericParameterAssignment: expect.any(Object),
            };

            const expectedDurationsFareStructureElement = {
                version: '1.0',
                id: expect.stringContaining('op:Tariff@'),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                Description: expect.objectContaining({ $t: expect.any(String) }),
                TypeOfFareStructureElementRef: expect.objectContaining({ version: expect.any(String), ref: expect.any(String) }),
                timeIntervals: expect.objectContaining({ TimeIntervalRef: expect.anything() }),
                GenericParameterAssignment: expect.any(Object),
            };

            const expectedEligibilityFareStructureElement = {
                version: '1.0',
                id: expect.stringContaining('op:Tariff@'),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                TypeOfFareStructureElementRef: expect.objectContaining({ version: expect.any(String), ref: expect.any(String) }),
                GenericParameterAssignment: expect.any(Object),
            };

            const expectedConditionsOfTravelFareStructureElement = {
                version: '1.0',
                id: expect.stringContaining('op:Tariff@'),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                GenericParameterAssignment: expect.any(Object),
            };

            geoResult.forEach(fareStructureElement => {
                if (fareStructureElement.timeIntervals) {
                    expect(fareStructureElement).toEqual(expectedDurationsFareStructureElement);
                } else if (fareStructureElement.Description) {
                    expect(fareStructureElement).toEqual(expectedAccessZonesFareStructureElement);
                } else if (fareStructureElement.TypeOfFareStructureElementRef) {
                    expect(fareStructureElement).toEqual(expectedEligibilityFareStructureElement);
                } else {
                    expect(fareStructureElement).toEqual(expectedConditionsOfTravelFareStructureElement);
                }
            });
        })
    });
});
