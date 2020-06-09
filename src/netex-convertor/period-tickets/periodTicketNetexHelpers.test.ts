import { PeriodGeoZoneTicket } from '../types';
import * as netexHelpers from './periodTicketNetexHelpers';
import { periodGeoZoneTicket, periodMultipleServicesTicket } from '../test-data/matchingData';
import operatorData from '../test-data/operatorData';
import {
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
            const expectedLength = stops.length;

            expect(scheduledStopPointsList).toHaveLength(expectedLength);
            scheduledStopPointsList.forEach(scheduledStopPoint => {
                expect(scheduledStopPoint).toEqual(
                    expect.objectContaining({
                        versionRef: 'EXTERNAL',
                        ref: expect.any(String),
                        $t: expect.any(String),
                    }),
                );
            });
        });
    });

    describe('getTopographicProjectionRefList', () => {
        it('returns a list of NeTEx topographic projections given a list of stops', () => {
            const topographicProjectionsList = netexHelpers.getTopographicProjectionRefList(stops);
            const expectedLength = stops.length;

            expect(topographicProjectionsList).toHaveLength(expectedLength);
            topographicProjectionsList.forEach(topographicProjection => {
                expect(topographicProjection).toEqual(
                    expect.objectContaining({
                        versionRef: 'nptg:EXTERNAL',
                        ref: expect.any(String),
                        $t: expect.any(String),
                    }),
                );
            });
        });
    });

    describe('getLinesList', () => {
        it('returns a list of NeTEx lines given periodMultipleServicesTicket matching data', () => {
            const expectedLineFormat = {
                version: '1.0',
                id: expect.stringContaining('op:'),
                Name: expect.objectContaining({ $t: expect.any(String) }),
                Description: { $t: expect.any(String) },
                Url: expect.objectContaining({ $t: expect.any(String) }),
                PublicCode: expect.objectContaining({ $t: expect.any(String) }),
                PrivateCode: expect.objectContaining({ type: 'noc', $t: expect.any(String) }),
                OperatorRef: { version: '1.0', ref: expect.stringContaining('noc:') },
                LineType: { $t: 'local' },
            };
            const expectedLength = periodMultipleServicesTicket.selectedServices.length;

            const linesList = netexHelpers.getLinesList(periodMultipleServicesTicket, opData);

            expect(linesList).toHaveLength(expectedLength);
            linesList.forEach(line => {
                expect(line).toEqual(expectedLineFormat);
            });
        });
    });

    describe('getLineRefList', () => {
        it('returns a list of NeTEx line refs given periodMultipleServicesTicket matching data', () => {
            const expectLineRefFormat = {
                version: '1.0',
                ref: expect.stringContaining('op:'),
            };
            const expectedLength = periodMultipleServicesTicket.selectedServices.length;

            const lineRefList = netexHelpers.getLineRefList(periodMultipleServicesTicket);

            expect(lineRefList).toHaveLength(expectedLength);
            lineRefList.forEach(lineRef => {
                expect(lineRef).toEqual(expectLineRefFormat);
            });
        });
    });

    describe('getGeoZoneFareTable', () => {
        it('returns a list of geoFareZoneTable objects for the products defined in periodGeoZoneTicket matching data', () => {
            const opString = expect.stringContaining('op:');
            const representingObjectTypeOfTravelDoc = {
                TypeOfTravelDocumentRef: expect.objectContaining({ ref: opString, version: '1.0' }),
                UserProfileRef: expect.objectContaining({ ref: opString, version: '1.0' }),
            };

            const expectedFareTableColumn = (representing: {}): jest.Expect =>
                expect.objectContaining({
                    Name: expect.objectContaining({ $t: expect.any(String) }),
                    id: opString,
                    representing: expect.objectContaining(representing),
                    version: '1.0',
                });

            const geoZoneFareTableFormat = {
                version: '1.0',
                id: opString,
                Name: expect.objectContaining({ $t: expect.any(String) }),
                specifics: {
                    TariffZoneRef: { ref: opString, version: '1.0' },
                },
                columns: expect.objectContaining({
                    FareTableColumn: expectedFareTableColumn({
                        TariffZoneRef: { ref: opString, version: '1.0' },
                    }),
                }),
                includes: {
                    FareTable: {
                        Name: { $t: expect.any(String) },
                        columns: {
                            FareTableColumn: expectedFareTableColumn(representingObjectTypeOfTravelDoc),
                        },
                        id: opString,
                        includes: {
                            FareTable: {
                                Name: { $t: expect.any(String) },
                                cells: {
                                    Cell: {
                                        TimeIntervalPrice: {
                                            Amount: expect.any(Object),
                                            TimeIntervalRef: { ref: opString, version: '1.0' },
                                            id: opString,
                                            version: '1.0',
                                        },
                                        id: opString,
                                        order: '1',
                                        version: '1.0',
                                        ColumnRef: { ref: opString, version: '1.0' },
                                        RowRef: { ref: opString, version: '1.0' },
                                    },
                                },
                                columns: {
                                    FareTableColumn: expectedFareTableColumn(representingObjectTypeOfTravelDoc),
                                },
                                id: opString,
                                limitations: {
                                    UserProfileRef: { ref: opString, version: '1.0' },
                                },
                                version: '1.0',
                            },
                        },
                        pricesFor: {
                            SalesOfferPackageRef: { ref: opString, version: '1.0' },
                        },
                        specifics: {
                            TypeOfTravelDocumentRef: { ref: opString, version: '1.0' },
                        },
                        version: '1.0',
                    },
                },
            };
            const expectedLength = geoUserPeriodTicket.products.length;

            const geoZoneFareTables = netexHelpers.getGeoZoneFareTable(geoUserPeriodTicket, placeHolderText);

            expect(geoZoneFareTables).toHaveLength(expectedLength);
            geoZoneFareTables.forEach(geoZoneFareTable => {
                expect(geoZoneFareTable).toEqual(geoZoneFareTableFormat);
            });
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
        it('returns a list of fareSructureElements for each product in the products array for multiService', () => {
            const result = netexHelpers.getFareStructuresElements(periodMultipleServicesTicket, placeHolderText);

            expect(result).toEqual(expectedMultiServiceFareStructureElements);
        });

        it('returns a list of fareSructureElements for each product in the products array for geoZone', () => {
            const result = netexHelpers.getFareStructuresElements(geoUserPeriodTicket, placeHolderText);

            expect(result).toEqual(expectedGeoZoneFareStructureElements);
        });
    });
});
