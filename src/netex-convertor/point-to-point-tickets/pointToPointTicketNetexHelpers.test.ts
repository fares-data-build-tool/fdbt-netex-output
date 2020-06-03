import * as netexHelpers from './pointToPointTicketNetexHelpers';
import { FareZone } from '../types';
import { singleTicket } from '../test-data/matchingData';
import { expectedInnerFareTables } from '../test-data/testData';

describe('Netex Helpers', () => {
    let fareZones: FareZone[];
    let lineIdName: string;

    beforeEach(() => {
        fareZones = singleTicket.fareZones;
        lineIdName = 'line_123';
    });

    describe('getStops', () => {
        it('returns a list of all stops given a list of fare zones', () => {
            const stops = netexHelpers.getStops(fareZones);

            expect(stops).toEqual([
                {
                    stopName: 'Ashton Bus Station',
                    naptanCode: '',
                    atcoCode: '1800EHQ0081',
                    localityCode: 'E0028492',
                    localityName: 'Ashton-under-Lyne',
                    parentLocalityName: '',
                    indicator: 'Arrivals',
                    street: 'Wellington Road',
                    qualifierName: '',
                },
                {
                    stopName: 'Henrietta Street',
                    naptanCode: 'MANDAMPT',
                    atcoCode: '1800EH24201',
                    localityCode: 'E0028492',
                    localityName: 'Ashton-under-Lyne',
                    parentLocalityName: '',
                    indicator: 'Stop BB',
                    street: '',
                    qualifierName: '',
                },
                {
                    stopName: 'Crickets Ln',
                    naptanCode: 'MANDAMPA',
                    atcoCode: '1800EH24151',
                    localityCode: 'E0028492',
                    localityName: 'Ashton-under-Lyne',
                    parentLocalityName: '',
                    indicator: 'opp',
                    street: 'PENNY MEADOW',
                    qualifierName: '',
                },
                {
                    stopName: 'Tameside College',
                    naptanCode: 'MANDAJAM',
                    atcoCode: '1800EH21241',
                    localityCode: 'N0077788',
                    localityName: 'Cockbrook',
                    parentLocalityName: 'Ashton-under-Lyne',
                    indicator: 'opp',
                    street: 'BEAUFORT RD',
                    qualifierName: '',
                },
            ]);
        });
    });

    describe('getUniquePriceGroups', () => {
        it('returns a list of unique price groups given a list of farezones', () => {
            const prices = netexHelpers.getUniquePriceGroups(fareZones);

            expect(prices).toEqual(['1.00', '1.20', '1.30']);
        });
    });

    describe('getIdName', () => {
        it('replaces spaces with underscores', () => {
            const id = netexHelpers.getIdName('some name for a fare zone');

            expect(id).toBe('some_name_for_a_fare_zone');
        });

        it('replaces multiple spaces with a single underscore', () => {
            const id = netexHelpers.getIdName('multiple   spaces        here');

            expect(id).toBe('multiple_spaces_here');
        });
    });

    describe('getScheduledStopPointsList', () => {
        it('gets a NeTEx scheduled stop point for each stop in the fare zones', () => {
            const stops = netexHelpers.getScheduledStopPointsList(fareZones);

            expect(stops).toEqual([
                {
                    Name: { $t: 'Ashton Bus Station' },
                    TopographicPlaceView: {
                        Name: { $t: 'Ashton-under-Lyne' },
                        QualifierName: { $t: '' },
                        TopographicPlaceRef: { ref: 'nptgLocality:E0028492' },
                    },
                    id: 'atco:1800EHQ0081',
                    version: 'any',
                },
                {
                    Name: { $t: 'Henrietta Street' },
                    TopographicPlaceView: {
                        Name: { $t: 'Ashton-under-Lyne' },
                        QualifierName: { $t: '' },
                        TopographicPlaceRef: { ref: 'nptgLocality:E0028492' },
                    },
                    id: 'atco:1800EH24201',
                    version: 'any',
                },
                {
                    Name: { $t: 'Crickets Ln' },
                    TopographicPlaceView: {
                        Name: { $t: 'Ashton-under-Lyne' },
                        QualifierName: { $t: '' },
                        TopographicPlaceRef: { ref: 'nptgLocality:E0028492' },
                    },
                    id: 'atco:1800EH24151',
                    version: 'any',
                },
                {
                    Name: { $t: 'Tameside College' },
                    TopographicPlaceView: {
                        Name: { $t: 'Cockbrook' },
                        QualifierName: { $t: '' },
                        TopographicPlaceRef: { ref: 'nptgLocality:N0077788' },
                    },
                    id: 'atco:1800EH21241',
                    version: 'any',
                },
            ]);
        });
    });

    describe('getPriceGroups', () => {
        it('gets a NeTEx price group for each unique price in the fare zones', () => {
            const priceGroups = netexHelpers.getPriceGroups(singleTicket);

            expect(priceGroups).toEqual([
                {
                    id: 'price_band_1.00',
                    members: [
                        {
                            GeographicalIntervalPrice: {
                                Amount: { $t: '1.00' },
                                id: 'price_band_1.00@Anyone',
                                version: '1.0',
                            },
                        },
                    ],
                    version: '1.0',
                },
                {
                    id: 'price_band_1.20',
                    members: [
                        {
                            GeographicalIntervalPrice: {
                                Amount: { $t: '1.20' },
                                id: 'price_band_1.20@Anyone',
                                version: '1.0',
                            },
                        },
                    ],
                    version: '1.0',
                },
                {
                    id: 'price_band_1.30',
                    members: [
                        {
                            GeographicalIntervalPrice: {
                                Amount: { $t: '1.30' },
                                id: 'price_band_1.30@Anyone',
                                version: '1.0',
                            },
                        },
                    ],
                    version: '1.0',
                },
            ]);
        });
    });

    describe('getFareZoneList', () => {
        it('gets a NeTEx list of fare zones', () => {
            const netexZones = netexHelpers.getFareZoneList(fareZones);

            expect(netexZones).toEqual([
                {
                    Name: { $t: 'Fare Zone 1' },
                    id: 'fs@Fare_Zone_1',
                    members: {
                        ScheduledStopPointRef: [
                            {
                                $t: 'Ashton Bus Station, Ashton-under-Lyne',
                                ref: 'atco:1800EHQ0081',
                                version: 'any',
                            },
                        ],
                    },
                    version: '1.0',
                },
                {
                    Name: { $t: 'Fare Zone 2' },
                    id: 'fs@Fare_Zone_2',
                    members: {
                        ScheduledStopPointRef: [
                            {
                                $t: 'Henrietta Street, Ashton-under-Lyne',
                                ref: 'atco:1800EH24201',
                                version: 'any',
                            },
                        ],
                    },
                    version: '1.0',
                },
                {
                    Name: { $t: 'Fare Zone 3' },
                    id: 'fs@Fare_Zone_3',
                    members: {
                        ScheduledStopPointRef: [
                            {
                                $t: 'Crickets Ln, Ashton-under-Lyne',
                                ref: 'atco:1800EH24151',
                                version: 'any',
                            },
                            {
                                $t: 'Tameside College, Cockbrook',
                                ref: 'atco:1800EH21241',
                                version: 'any',
                            },
                        ],
                    },
                    version: '1.0',
                },
            ]);
        });
    });

    describe('getDistanceMatrixElements', () => {
        it('creates a list of NeTEx distance matrix elements which show the prices between fare zones', () => {
            const matrixElements = netexHelpers.getDistanceMatrixElements(fareZones);

            expect(matrixElements).toEqual([
                {
                    EndTariffZoneRef: { ref: 'fs@Fare_Zone_3', version: '1.0' },
                    StartTariffZoneRef: { ref: 'fs@Fare_Zone_2', version: '1.0' },
                    id: 'Fare_Zone_2+Fare_Zone_3',
                    priceGroups: { PriceGroupRef: { ref: 'price_band_1.00', version: '1.0' } },
                    version: '1.0',
                },
                {
                    EndTariffZoneRef: { ref: 'fs@Fare_Zone_1', version: '1.0' },
                    StartTariffZoneRef: { ref: 'fs@Fare_Zone_2', version: '1.0' },
                    id: 'Fare_Zone_2+Fare_Zone_1',
                    priceGroups: { PriceGroupRef: { ref: 'price_band_1.20', version: '1.0' } },
                    version: '1.0',
                },
                {
                    EndTariffZoneRef: { ref: 'fs@Fare_Zone_1', version: '1.0' },
                    StartTariffZoneRef: { ref: 'fs@Fare_Zone_3', version: '1.0' },
                    id: 'Fare_Zone_3+Fare_Zone_1',
                    priceGroups: { PriceGroupRef: { ref: 'price_band_1.30', version: '1.0' } },
                    version: '1.0',
                },
            ]);
        });
    });

    describe('getFareTableElements', () => {
        it('removes the last item when generating the fare table elements', () => {
            const fareTableElements = netexHelpers.getFareTableElements(
                fareZones,
                lineIdName,
                'c',
                singleTicket.type,
                singleTicket.passengerType,
            );

            expect(fareTableElements).toHaveLength(fareZones.length - 1);
        });

        it('correctly generates elements using the prefix', () => {
            const fareTableElements = netexHelpers.getFareTableElements(
                fareZones,
                lineIdName,
                'c',
                singleTicket.type,
                singleTicket.passengerType,
            );

            expect(fareTableElements).toEqual([
                {
                    Name: { $t: 'Fare Zone 1' },
                    id: 'Trip@single-SOP@p-ticket@line_123@Anyone@c1@Fare_Zone_1',
                    order: 1,
                    version: '1.0',
                },
                {
                    Name: { $t: 'Fare Zone 2' },
                    id: 'Trip@single-SOP@p-ticket@line_123@Anyone@c2@Fare_Zone_2',
                    order: 2,
                    version: '1.0',
                },
            ]);
        });
    });

    describe('getFareTables', () => {
        it('gets the fare tables for all fare zones and price groups', () => {
            const fareTables = netexHelpers.getInnerFareTables(
                fareZones.slice(0, -1),
                lineIdName,
                singleTicket.type,
                singleTicket.passengerType,
            );

            expect(fareTables).toEqual(expectedInnerFareTables);
        });
    });
});
