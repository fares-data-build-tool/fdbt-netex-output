import { S3Event } from 'aws-lambda';

export const mockS3Event = (bucketName: string, fileName: string): S3Event => ({
    Records: [
        {
            eventVersion: '',
            eventSource: '',
            awsRegion: '',
            eventTime: '',
            eventName: '',
            userIdentity: {
                principalId: '',
            },
            requestParameters: {
                sourceIPAddress: '',
            },
            responseElements: {
                'x-amz-request-id': '',
                'x-amz-id-2': '',
            },
            s3: {
                s3SchemaVersion: '',
                configurationId: '',
                bucket: {
                    name: bucketName,
                    ownerIdentity: {
                        principalId: '',
                    },
                    arn: '',
                },
                object: {
                    key: fileName,
                    size: 1,
                    eTag: '',
                    versionId: '',
                    sequencer: '',
                },
            },
            glacierEventData: {
                restoreEventData: {
                    lifecycleRestorationExpiryTime: '',
                    lifecycleRestoreStorageClass: '',
                },
            },
        },
    ],
});

export const fareZoneList = {
    lineName: '354',
    nocCode: 'TLCT',
    operatorShortName: 'IWBus',
    fareZones: [
        {
            name: 'Acomb Green Lane',
            stops: [
                {
                    stopName: 'Queenswood Grove',
                    naptanCode: '32903623',
                    atcoCode: '3290YYA03623',
                    localityCode: 'E0026633',
                    localityName: 'Bewbush',
                    parentLocalityName: 'IW Test',
                    qualifierName: 'West Sussex',
                },
                {
                    stopName: 'Kingsthorpe',
                    naptanCode: '32900077',
                    atcoCode: '3290YYA00077',
                    localityCode: 'E0026633',
                    localityName: 'Bewbush',
                    parentLocalityName: 'IW Test',
                    qualifierName: 'West Sussex',
                },
            ],
            prices: [
                {
                    price: '1.10',
                    fareZones: ['Mattison Way'],
                },
                {
                    price: '1.70',
                    fareZones: ['Nursery Drive'],
                },
                {
                    price: '2.20',
                    fareZones: ['Holl Bank/Beech Ave'],
                },
            ],
        },
        {
            name: 'Mattison Way',
            stops: [
                {
                    stopName: 'Mattison Way',
                    naptanCode: '32900359',
                    atcoCode: '3290YYA00359',
                    localityCode: 'E0026633',
                    localityName: 'Bewbush',
                    parentLocalityName: 'IW Test',
                    qualifierName: 'West Sussex',
                },
            ],
            prices: [
                {
                    price: '1.10',
                    fareZones: ['Nursery Drive'],
                },
                {
                    price: '1.70',
                    fareZones: ['Holl Bank/Beech Ave'],
                },
            ],
        },
        {
            name: 'Nursery Drive',
            stops: [
                {
                    stopName: 'Campbell Avenue',
                    naptanCode: '32900357',
                    atcoCode: '3290YYA00357',
                    localityCode: 'E0026633',
                    localityName: 'Bewbush',
                    parentLocalityName: 'IW Test',
                    qualifierName: 'West Sussex',
                },
            ],
            prices: [
                {
                    price: '1.10',
                    fareZones: ['Holl Bank/Beech Ave'],
                },
            ],
        },
        {
            name: 'Holl Bank/Beech Ave',
            stops: [],
            prices: [
                {
                    price: '1.10',
                    fareZones: [],
                },
            ],
        },
    ],
};

export const expectedInnerFareTables = [
    {
        id: 'Trip@single-SOP@p-ticket@line_123@Anyone@c1@Fare_Zone_1',
        version: '1.0',
        Description: { $t: 'Column 1' },
        Name: { $t: 'Fare Zone 1' },
        cells: {
            Cell: [
                // {
                //     ColumnRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@c1@Acomb_Green_Lane',
                //         versionRef: '1',
                //     },
                //     DistanceMatrixElementPrice: {
                //         DistanceMatrixElementRef: { ref: 'Acomb_Green_Lane+Mattison_Way', version: '1.0' },
                //         GeographicalIntervalPriceRef: { ref: 'price_band_1.10@adult', version: '1.0' },
                //         id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane+Mattison_Way',
                //         version: '1.0',
                //     },
                //     RowRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@r3@Mattison_Way',
                //         versionRef: '1',
                //     },
                //     id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane',
                //     order: 1,
                //     version: '1.0',
                // },
                // {
                //     ColumnRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@c1@Acomb_Green_Lane',
                //         versionRef: '1',
                //     },
                //     DistanceMatrixElementPrice: {
                //         DistanceMatrixElementRef: { ref: 'Acomb_Green_Lane+Nursery_Drive', version: '1.0' },
                //         GeographicalIntervalPriceRef: { ref: 'price_band_1.70@adult', version: '1.0' },
                //         id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane+Nursery_Drive',
                //         version: '1.0',
                //     },
                //     RowRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@r2@Nursery_Drive',
                //         versionRef: '1',
                //     },
                //     id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane',
                //     order: 2,
                //     version: '1.0',
                // },
                // {
                //     ColumnRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@c1@Acomb_Green_Lane',
                //         versionRef: '1',
                //     },
                //     DistanceMatrixElementPrice: {
                //         DistanceMatrixElementRef: {
                //             ref: 'Acomb_Green_Lane+Holl_Bank/Beech_Ave',
                //             version: '1.0',
                //         },
                //         GeographicalIntervalPriceRef: { ref: 'price_band_2.20@adult', version: '1.0' },
                //         id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane+Holl_Bank/Beech_Ave',
                //         version: '1.0',
                //     },
                //     RowRef: {
                //         ref: 'Trip@single-SOP@p-ticket@line_123@adult@r1@Holl_Bank/Beech_Ave',
                //         versionRef: '1',
                //     },
                //     id: 'Trip@single-SOP@p-ticket@line_123@adult@Acomb_Green_Lane',
                //     order: 3,
                //     version: '1.0',
                // },
            ],
        },
    },
    {
        id: 'Trip@single-SOP@p-ticket@line_123@Anyone@c2@Fare_Zone_2',
        version: '1.0',
        Description: { $t: 'Column 2' },
        Name: { $t: 'Fare Zone 2' },
        cells: {
            Cell: [
                {
                    ColumnRef: {
                        ref: 'Trip@single-SOP@p-ticket@line_123@Anyone@c2@Fare_Zone_2',
                        versionRef: '1',
                    },
                    DistanceMatrixElementPrice: {
                        DistanceMatrixElementRef: { ref: 'Fare_Zone_2+Fare_Zone_3', version: '1.0' },
                        GeographicalIntervalPriceRef: { ref: 'price_band_1.00@Anyone', version: '1.0' },
                        id: 'Trip@single-SOP@p-ticket@line_123@Anyone@Fare_Zone_2+Fare_Zone_3',
                        version: '1.0',
                    },
                    RowRef: {
                        ref: 'Trip@single-SOP@p-ticket@line_123@Anyone@r1@Fare_Zone_3',
                        versionRef: '1',
                    },
                    id: 'Trip@single-SOP@p-ticket@line_123@Anyone@Fare_Zone_2',
                    order: 1,
                    version: '1.0',
                },
                {
                    ColumnRef: {
                        ref: 'Trip@single-SOP@p-ticket@line_123@Anyone@c2@Fare_Zone_2',
                        versionRef: '1',
                    },
                    DistanceMatrixElementPrice: {
                        DistanceMatrixElementRef: {
                            ref: 'Fare_Zone_2+Fare_Zone_1',
                            version: '1.0',
                        },
                        GeographicalIntervalPriceRef: { ref: 'price_band_1.20@Anyone', version: '1.0' },
                        id: 'Trip@single-SOP@p-ticket@line_123@Anyone@Fare_Zone_2+Fare_Zone_1',
                        version: '1.0',
                    },
                    RowRef: {
                        ref: 'Trip@single-SOP@p-ticket@line_123@Anyone@r0@Fare_Zone_1',
                        versionRef: '1',
                    },
                    id: 'Trip@single-SOP@p-ticket@line_123@Anyone@Fare_Zone_2',
                    order: 2,
                    version: '1.0',
                },
            ],
        },
    },
];

export const expectedScheduledStopPointsList = [
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:CHEPJWM',
        $t: 'The Towers, Park Street, Macclesfield',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:wrgdpma',
        $t: 'Dog & Partridge, New Manchester Road, Paddington',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:MANATDWT',
        $t: 'Manchester Rd, MANCHESTER RD, Hollinwood',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:MANDGADW',
        $t: 'Bower Fold, Mottram Rd, Bower Fold',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:MANJTPJW',
        $t: 'Oak Road, WARBURTON LANE, Partington',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:MANPATDT',
        $t: 'Meadow Close, BOOTH ROAD, Little Lever',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:lanatgjp',
        $t: 'Church Road, Church Road, Great Plumpton',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:lanawtwg',
        $t: 'Hare and Hounds, Whalley Road, Clayton-le-Moors',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:langjpaw',
        $t: 'Skippool Avenue, Breck Road, Poulton-le-Fylde',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:lanpamtw',
        $t: 'Lytham St Annes HTC, Church Road, Ansdell',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:blpadadw',
        $t: 'Torsway Avenue, Newton Drive, Kingscote',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:blpadwgm',
        $t: 'Spencer Court, Talbot Road, Central',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:mergjpjd',
        $t: 'Mesnes Park, Park Road North, Newton le Willows',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:merdwgmt',
        $t: 'Grosvenor Road, St Helens Road, Prescot',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:32900357',
        $t: 'Campbell Avenue, Hamilton Drive, Holgate',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:37055608',
        $t: 'Bank End Farm, Bank Lane, Howbrook',
    },
    {
        versionRef: 'EXTERNAL',
        ref: 'naptStop:45010202',
        $t: 'Main Street St Johns Close, Main Street, Aberford',
    },
    {
        a: 'EXTERNAL',
        b: 'naptStop:45019529',
        c: 'Midgley Road Spring Villas, Midgley Road, Mytholmroyd',
    },
];

export const expectedLinesList = [
    {
        version: '1.0',
        id: 'op:4',
        Name: {
            $t: 'Line 4',
        },
        Description: { $t: 'Bognor - Crawley - Horsham' },
        Url: { $t: 'abc.com' },
        PublicCode: { $t: '4' },
        PrivateCode: { type: 'noc', $t: 'BLAC_4' },
        OperatorRef: { version: '1.0', ref: 'noc:BLAC' },
        LineType: { $t: 'local' },
    },
    {
        version: '1.0',
        id: 'op:17',
        Name: {
            $t: 'Line 17',
        },
        Description: { $t: 'Crewkerne - Yeovil - Sherborne' },
        Url: { $t: 'abc.com' },
        PublicCode: { $t: '17' },
        PrivateCode: { type: 'noc', $t: 'BLAC_17' },
        OperatorRef: { version: '1.0', ref: 'noc:BLAC' },
        LineType: { $t: 'local' },
    },
    {
        version: '1.0',
        id: 'op:2C',
        Name: {
            $t: 'Line 2C',
        },
        Description: { $t: 'Harrogate - Otley - Leeds' },
        Url: { $t: 'abc.com' },
        PublicCode: { $t: '2C' },
        PrivateCode: { type: 'noc', $t: 'BLAC_2C' },
        OperatorRef: { version: '1.0', ref: 'noc:BLAC' },
        LineType: { $t: 'local' },
    },
];

export const expectedLineRefList = [
    {
        version: '1.0',
        ref: 'op:4',
    },
    {
        version: '1.0',
        ref: 'op:17',
    },
    {
        version: '1.0',
        ref: 'op:2C',
    },
];

export const expectedTopographicProjectionsList = [
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0056891',
        $t: 'Woodcock Road, Warminster, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0041864',
        $t: 'Ellacombe Road, Longwell Green, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0028839',
        $t: 'MANCHESTER RD, Hollinwood, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0016583',
        $t: 'Breck Road, Poulton-le-Fylde, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0040583',
        $t: 'Looseleigh Lane, Derriford, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0030284',
        $t: 'Bank Lane, Howbrook, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0054252',
        $t: 'Chester Road West, Queensferry, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0048917',
        $t: 'Rook Street, Lothersdale, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0035483',
        $t: 'Alma Terrace, Ogmore Vale, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0029398',
        $t: 'TODMORDEN RD, Summit, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:N0076772',
        $t: 'Chelmer Village Way, Chelmer Village, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0026040',
        $t: 'St Nicolas Park Drive, Nuneaton, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:ES001323',
        $t: 'A966, Rendall, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:N0067035',
        $t: 'B965, Chapelton, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0036884',
        $t: 'Moor Road, Brough, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0045128',
        $t: 'Derwent Lane, Derwent, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:N0076467',
        $t: 'Queen Victoria Street, Macclesfield, LEEDS',
    },
    {
        versionRef: 'nptg:EXTERNAL',
        ref: 'nptgLocality:E0036851',
        $t: '-, Arram, LEEDS',
    },
];

export const expectedGeoZoneFareTables = [
    {
        Name: { $t: 'IW Village' },
        columns: {
            FareTableColumn: {
                Name: { $t: 'IW Village' },
                id: 'op:IW Product@IW Village@p-ticket',
                representing: { TariffZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
                version: '1.0',
            },
        },
        id: 'op:IW Product@IW Village',
        includes: {
            FareTable: {
                Name: { $t: 'IW Product - Cash' },
                columns: {
                    FareTableColumn: {
                        Name: { $t: 'Cash' },
                        id: 'op:IW Product@IW Village@p-ticket',
                        representing: {
                            TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                            UserProfileRef: { ref: 'op:adult', version: '1.0' },
                        },
                        version: '1.0',
                    },
                },
                id: 'op:IW Product@IW Village@p-ticket',
                includes: {
                    FareTable: {
                        Name: { $t: 'IW Product - Cash - Adult' },
                        cells: {
                            Cell: {
                                TimeIntervalPrice: {
                                    Amount: { $t: '1000' },
                                    TimeIntervalRef: { ref: 'op:Tariff@IW Product@24days', version: '1.0' },
                                    id: 'op:IW Product@IW Village@p-ticket@adult@24days',
                                    version: '1.0',
                                },
                                id: 'op:IW Product@IW Village@p-ticket@adult@24days',
                                order: '1',
                                version: '1.0',
                                ColumnRef: { ref: 'op:IW Product@IW Village@p-ticket@adult', version: '1.0' },
                                RowRef: { ref: 'op:IW Product@24days', version: '1.0' },
                            },
                        },
                        columns: {
                            FareTableColumn: {
                                Name: { $t: 'Adult' },
                                id: 'op:IW Product@IW Village@p-ticket@adult',
                                representing: {
                                    TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                                    UserProfileRef: { ref: 'op:adult', version: '1.0' },
                                },
                                version: '1.0',
                            },
                        },
                        id: 'op:IW Product@IW Village@p-ticket@adult',
                        limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
                        version: '1.0',
                    },
                },
                pricesFor: { SalesOfferPackageRef: { ref: 'op:Pass@IW Product-SOP@p-ticket', version: '1.0' } },
                specifics: { TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' } },
                version: '1.0',
            },
        },
        specifics: { TariffZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
        version: '1.0',
    },
    {
        Name: { $t: 'IW Village' },
        columns: {
            FareTableColumn: {
                Name: { $t: 'IW Village' },
                id: 'op:Super Product@IW Village@p-ticket',
                representing: { TariffZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
                version: '1.0',
            },
        },
        id: 'op:Super Product@IW Village',
        includes: {
            FareTable: {
                Name: { $t: 'Super Product - Cash' },
                columns: {
                    FareTableColumn: {
                        Name: { $t: 'Cash' },
                        id: 'op:Super Product@IW Village@p-ticket',
                        representing: {
                            TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                            UserProfileRef: { ref: 'op:adult', version: '1.0' },
                        },
                        version: '1.0',
                    },
                },
                id: 'op:Super Product@IW Village@p-ticket',
                includes: {
                    FareTable: {
                        Name: { $t: 'Super Product - Cash - Adult' },
                        columns: {
                            FareTableColumn: {
                                Name: { $t: 'Adult' },
                                id: 'op:Super Product@IW Village@p-ticket@adult',
                                representing: {
                                    TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                                    UserProfileRef: { ref: 'op:adult', version: '1.0' },
                                },
                                version: '1.0',
                            },
                        },
                        cells: {
                            Cell: {
                                TimeIntervalPrice: {
                                    Amount: { $t: '1230' },
                                    TimeIntervalRef: { ref: 'op:Tariff@Super Product@4days', version: '1.0' },
                                    id: 'op:Super Product@IW Village@p-ticket@adult@4days',
                                    version: '1.0',
                                },
                                id: 'op:Super Product@IW Village@p-ticket@adult@4days',
                                order: '1',
                                version: '1.0',
                                ColumnRef: { ref: 'op:Super Product@IW Village@p-ticket@adult', version: '1.0' },
                                RowRef: { ref: 'op:Super Product@4days', version: '1.0' },
                            },
                        },
                        id: 'op:Super Product@IW Village@p-ticket@adult',
                        limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
                        version: '1.0',
                    },
                },
                pricesFor: { SalesOfferPackageRef: { ref: 'op:Pass@Super Product-SOP@p-ticket', version: '1.0' } },
                specifics: { TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' } },
                version: '1.0',
            },
        },
        specifics: { TariffZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
        version: '1.0',
    },
];

export const expectedMultiServiceFareTables = [
    {
        Name: { $t: 'BLAC-multi-service' },
        columns: {
            FareTableColumn: {
                Name: { $t: 'BLAC-multi-service' },
                id: 'op:a product@BLAC-multi-service@p-ticket',
                representing: null,
                version: '1.0',
            },
        },
        id: 'op:a product@BLAC-multi-service',
        includes: {
            FareTable: {
                Name: { $t: 'a product - Cash' },
                columns: {
                    FareTableColumn: {
                        Name: { $t: 'Cash' },
                        id: 'op:a product@BLAC-multi-service@p-ticket',
                        representing: {
                            TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                            UserProfileRef: { ref: 'op:adult', version: '1.0' },
                        },
                        version: '1.0',
                    },
                },
                id: 'op:a product@BLAC-multi-service@p-ticket',
                includes: {
                    FareTable: {
                        Name: { $t: 'a product - Cash - Adult' },
                        columns: {
                            FareTableColumn: {
                                Name: { $t: 'Adult' },
                                id: 'op:a product@BLAC-multi-service@p-ticket@adult',
                                representing: {
                                    TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                                    UserProfileRef: { ref: 'op:adult', version: '1.0' },
                                },
                                version: '1.0',
                            },
                        },
                        id: 'op:a product@BLAC-multi-service@p-ticket@adult',
                        limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
                        version: '1.0',
                        cells: {
                            Cell: {
                                TimeIntervalPrice: {
                                    Amount: { $t: '123' },
                                    TimeIntervalRef: { ref: 'op:Tariff@a product@4days', version: '1.0' },
                                    id: 'op:a product@BLAC-multi-service@p-ticket@adult@4days',
                                    version: '1.0',
                                },
                                id: 'op:a product@BLAC-multi-service@p-ticket@adult@4days',
                                order: '1',
                                version: '1.0',
                                ColumnRef: { ref: 'op:a product@BLAC-multi-service@p-ticket@adult', version: '1.0' },
                                RowRef: { ref: 'op:a product@4days', version: '1.0' },
                            },
                        },
                    },
                },
                pricesFor: { SalesOfferPackageRef: { ref: 'op:Pass@a product-SOP@p-ticket', version: '1.0' } },
                specifics: { TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' } },
                version: '1.0',
            },
        },
        specifics: null,
        version: '1.0',
    },
    {
        Name: { $t: 'BLAC-multi-service' },
        columns: {
            FareTableColumn: {
                Name: { $t: 'BLAC-multi-service' },
                id: 'op:best product@BLAC-multi-service@p-ticket',
                representing: null,
                version: '1.0',
            },
        },
        id: 'op:best product@BLAC-multi-service',
        includes: {
            FareTable: {
                Name: { $t: 'best product - Cash' },
                columns: {
                    FareTableColumn: {
                        Name: { $t: 'Cash' },
                        id: 'op:best product@BLAC-multi-service@p-ticket',
                        representing: {
                            TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                            UserProfileRef: { ref: 'op:adult', version: '1.0' },
                        },
                        version: '1.0',
                    },
                },
                id: 'op:best product@BLAC-multi-service@p-ticket',
                includes: {
                    FareTable: {
                        Name: { $t: 'best product - Cash - Adult' },
                        columns: {
                            FareTableColumn: {
                                Name: { $t: 'Adult' },
                                id: 'op:best product@BLAC-multi-service@p-ticket@adult',
                                representing: {
                                    TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                                    UserProfileRef: { ref: 'op:adult', version: '1.0' },
                                },
                                version: '1.0',
                            },
                        },
                        id: 'op:best product@BLAC-multi-service@p-ticket@adult',
                        limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
                        version: '1.0',
                        cells: {
                            Cell: {
                                TimeIntervalPrice: {
                                    Amount: { $t: '132' },
                                    TimeIntervalRef: { ref: 'op:Tariff@best product@3days', version: '1.0' },
                                    id: 'op:best product@BLAC-multi-service@p-ticket@adult@3days',
                                    version: '1.0',
                                },
                                id: 'op:best product@BLAC-multi-service@p-ticket@adult@3days',
                                order: '1',
                                version: '1.0',
                                ColumnRef: { ref: 'op:best product@BLAC-multi-service@p-ticket@adult', version: '1.0' },
                                RowRef: { ref: 'op:best product@3days', version: '1.0' },
                            },
                        },
                    },
                },
                pricesFor: { SalesOfferPackageRef: { ref: 'op:Pass@best product-SOP@p-ticket', version: '1.0' } },
                specifics: { TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' } },
                version: '1.0',
            },
        },
        specifics: null,
        version: '1.0',
    },
];

export const expectedMultipleFareTables = [
    {
        Name: { $t: 'a product Fares' },
        id: 'epd:UK:BLAC:FareFrame_UK_PI_FARE_PRICE:a product@pass:op',
        pricesFor: { PreassignedFareProductRef: { ref: 'op:Pass@a product', version: '1.0' } },
        rows: {
            FareTableRow: {
                Name: { $t: '4 days' },
                id: 'op:a product@4days',
                order: '2',
                representing: { TimeIntervalRef: { ref: 'op:Tariff@a product@4days', version: '1.0' } },
                version: '1.0',
            },
        },
        usedIn: { TariffRef: { ref: 'op:Tariff@PLACEHOLDER', version: '1.0' } },
        version: '1.0',
    },
    {
        Name: { $t: 'best product Fares' },
        id: 'epd:UK:BLAC:FareFrame_UK_PI_FARE_PRICE:best product@pass:op',
        pricesFor: { PreassignedFareProductRef: { ref: 'op:Pass@best product', version: '1.0' } },
        rows: {
            FareTableRow: {
                Name: { $t: '3 days' },
                id: 'op:best product@3days',
                order: '2',
                representing: { TimeIntervalRef: { ref: 'op:Tariff@best product@3days', version: '1.0' } },
                version: '1.0',
            },
        },
        usedIn: { TariffRef: { ref: 'op:Tariff@PLACEHOLDER', version: '1.0' } },
        version: '1.0',
    },
];

export const expectedSalesOfferPackages = [
    {
        BrandingRef: { ref: 'op:InfinityWorks@brand', version: '1.0' },
        Description: { $t: 'Unlimited Travel in a given zone' },
        Name: { $t: 'PLACEHOLDER - paper ticket' },
        distributionAssignments: {
            DistributionAssignment: {
                Description: { $t: 'Pay for ticket onboard.' },
                DistributionChannelRef: { ref: 'fxc:on_board', version: 'fxc:v1.0' },
                DistributionChannelType: { $t: 'onBoard' },
                FulfilmentMethodRef: { ref: 'fxc:collect_on_board', version: 'fxc:v1.0' },
                Name: { $t: 'Onboard' },
                PaymentMethods: { $t: 'cash contactlessPaymentCard' },
                id: 'op:Pass@IW Product-GSOP@p-ticket@on_board',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@IW Product-SOP@p-ticket',
        salesOfferPackageElements: {
            SalesOfferPackageElement: {
                PreassignedFareProductRef: { ref: 'op:Pass@IW Product', version: '1.0' },
                TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                id: 'op:Pass@IW Product-SOP@p-ticket',
                order: '3',
                version: '1.0',
            },
        },
        version: '1.0',
    },
    {
        BrandingRef: { ref: 'op:InfinityWorks@brand', version: '1.0' },
        Description: { $t: 'Unlimited Travel in a given zone' },
        Name: { $t: 'PLACEHOLDER - paper ticket' },
        distributionAssignments: {
            DistributionAssignment: {
                Description: { $t: 'Pay for ticket onboard.' },
                DistributionChannelRef: { ref: 'fxc:on_board', version: 'fxc:v1.0' },
                DistributionChannelType: { $t: 'onBoard' },
                FulfilmentMethodRef: { ref: 'fxc:collect_on_board', version: 'fxc:v1.0' },
                Name: { $t: 'Onboard' },
                PaymentMethods: { $t: 'cash contactlessPaymentCard' },
                id: 'op:Pass@Super Product-GSOP@p-ticket@on_board',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@Super Product-SOP@p-ticket',
        salesOfferPackageElements: {
            SalesOfferPackageElement: {
                PreassignedFareProductRef: { ref: 'op:Pass@Super Product', version: '1.0' },
                TypeOfTravelDocumentRef: { ref: 'op:p-ticket', version: '1.0' },
                id: 'op:Pass@Super Product-SOP@p-ticket',
                order: '3',
                version: '1.0',
            },
        },
        version: '1.0',
    },
];

export const expectedGeoZonePreassignedFareProducts = [
    {
        ChargingMomentType: { $t: 'beforeTravel' },
        Name: { $t: 'IW Product Pass' },
        OperatorRef: { $t: 'noc:TestOperatorOpId', ref: 'noc:IW1234', version: '1.0' },
        ProductType: { $t: 'periodPass' },
        accessRightsInProduct: {
            AccessRightInProduct: {
                ValidableElementRef: { ref: 'op:Pass@IW Product@travel', version: '1.0' },
                id: 'op:Pass@IW Product@travel',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@IW Product',
        typesOfFareProduct: { TypeOfFareProductRef: { ref: 'fxc:standard_product@pass@period', version: 'fxc:v1.0' } },
        validableElements: {
            ValidableElement: {
                Name: { $t: 'Unlimited rides available for specified durations' },
                fareStructureElements: {
                    FareStructureElementRef: [
                        { ref: 'op:Tariff@IW Product@access_zones', version: '1.0' },
                        { ref: 'op:Tariff@eligibility', version: '1.0' },
                        { ref: 'op:Tariff@IW Product@durations@adult', version: '1.0' },
                        { ref: 'op:Tariff@IW Product@conditions_of_travel', version: '1.0' },
                    ],
                },
                id: 'op:Pass@IW Product@travel',
                version: '1.0',
            },
        },
        version: '1.0',
    },
    {
        ChargingMomentType: { $t: 'beforeTravel' },
        Name: { $t: 'Super Product Pass' },
        OperatorRef: { $t: 'noc:TestOperatorOpId', ref: 'noc:IW1234', version: '1.0' },
        ProductType: { $t: 'periodPass' },
        accessRightsInProduct: {
            AccessRightInProduct: {
                ValidableElementRef: { ref: 'op:Pass@Super Product@travel', version: '1.0' },
                id: 'op:Pass@Super Product@travel',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@Super Product',
        typesOfFareProduct: { TypeOfFareProductRef: { ref: 'fxc:standard_product@pass@period', version: 'fxc:v1.0' } },
        validableElements: {
            ValidableElement: {
                Name: { $t: 'Unlimited rides available for specified durations' },
                fareStructureElements: {
                    FareStructureElementRef: [
                        { ref: 'op:Tariff@Super Product@access_zones', version: '1.0' },
                        { ref: 'op:Tariff@eligibility', version: '1.0' },
                        { ref: 'op:Tariff@Super Product@durations@adult', version: '1.0' },
                        { ref: 'op:Tariff@Super Product@conditions_of_travel', version: '1.0' },
                    ],
                },
                id: 'op:Pass@Super Product@travel',
                version: '1.0',
            },
        },
        version: '1.0',
    },
];

export const expectedMultiServicesPreassignedFareProducts = [
    {
        ChargingMomentType: { $t: 'beforeTravel' },
        Name: { $t: 'a product Pass' },
        OperatorRef: { $t: 'noc:TestOperatorOpId', ref: 'noc:BLAC', version: '1.0' },
        ProductType: { $t: 'periodPass' },
        accessRightsInProduct: {
            AccessRightInProduct: {
                ValidableElementRef: { ref: 'op:Pass@a product@travel', version: '1.0' },
                id: 'op:Pass@a product@travel',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@a product',
        typesOfFareProduct: { TypeOfFareProductRef: { ref: 'fxc:standard_product@pass@period', version: 'fxc:v1.0' } },
        validableElements: {
            ValidableElement: {
                Name: { $t: 'Unlimited rides available for specified durations' },
                fareStructureElements: {
                    FareStructureElementRef: [
                        { ref: 'op:Tariff@a product@access_lines', version: '1.0' },
                        { ref: 'op:Tariff@eligibility', version: '1.0' },
                        { ref: 'op:Tariff@a product@durations@adult', version: '1.0' },
                        { ref: 'op:Tariff@a product@conditions_of_travel', version: '1.0' },
                    ],
                },
                id: 'op:Pass@a product@travel',
                version: '1.0',
            },
        },
        version: '1.0',
    },
    {
        ChargingMomentType: { $t: 'beforeTravel' },
        Name: { $t: 'best product Pass' },
        OperatorRef: { $t: 'noc:TestOperatorOpId', ref: 'noc:BLAC', version: '1.0' },
        ProductType: { $t: 'periodPass' },
        accessRightsInProduct: {
            AccessRightInProduct: {
                ValidableElementRef: { ref: 'op:Pass@best product@travel', version: '1.0' },
                id: 'op:Pass@best product@travel',
                order: '1',
                version: '1.0',
            },
        },
        id: 'op:Pass@best product',
        typesOfFareProduct: { TypeOfFareProductRef: { ref: 'fxc:standard_product@pass@period', version: 'fxc:v1.0' } },
        validableElements: {
            ValidableElement: {
                Name: { $t: 'Unlimited rides available for specified durations' },
                fareStructureElements: {
                    FareStructureElementRef: [
                        { ref: 'op:Tariff@best product@access_lines', version: '1.0' },
                        { ref: 'op:Tariff@eligibility', version: '1.0' },
                        { ref: 'op:Tariff@best product@durations@adult', version: '1.0' },
                        { ref: 'op:Tariff@best product@conditions_of_travel', version: '1.0' },
                    ],
                },
                id: 'op:Pass@best product@travel',
                version: '1.0',
            },
        },
        version: '1.0',
    },
];

export const expectedTimeIntervals = [
    { Description: { $t: 'P4D' }, Name: { $t: '4 days' }, id: 'op:Tariff@a product@4days', version: '1.0' },
    { Description: { $t: 'P3D' }, Name: { $t: '3 days' }, id: 'op:Tariff@best product@3days', version: '1.0' },
];

export const expectedMultiServiceFareStructureElements = [
    {
        Description: { $t: 'single zone.' },
        GenericParameterAssignment: {
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:can_access', version: 'fxc:v1.0' },
            ValidityParameterGroupingType: { $t: 'OR' },
            id: 'Tariff@a product@access_lines',
            order: '1',
            validityParameters: {
                LineRef: [
                    { ref: 'op:4', version: '1.0' },
                    { ref: 'op:17', version: '1.0' },
                    { ref: 'op:2C', version: '1.0' },
                ],
            },
            version: '1.0',
        },
        Name: { $t: 'Available zones' },
        TypeOfFareStructureElementRef: { ref: 'fxc:access', version: 'fxc:v1.0' },
        id: 'op:Tariff@a product@access_lines',
        version: '1.0',
    },
    {
        Description: { $t: 'All periods allowed, 60 mins, but no evening - used in for some mticket, single zone.' },
        GenericParameterAssignment: {
            Description: { $t: 'Adult/Child Cash ticket Only available for 1 Day or 1week' },
            LimitationGroupingType: { $t: 'XOR' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:eligible', version: 'fxc:v1.0' },
            id: 'op:Tariff@a product@adult_or_child',
            limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Available duration combination' },
        TypeOfFareStructureElementRef: { ref: 'fxc:durations', version: 'fxc:v1.0' },
        id: 'op:Tariff@a product@durations@adult',
        timeIntervals: { TimeIntervalRef: [{ ref: 'op:Tariff@a product@4days' }] },
        version: '1.0',
    },
    {
        GenericParameterAssignment: {
            LimitationGroupingType: { $t: 'AND' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:condition_of_use', version: 'fxc:v1.0' },
            id: 'op:Tariff@a product@conditions_of_travel',
            limitations: {
                FrequencyOfUse: {
                    FrequencyOfUseType: { $t: 'unlimited' },
                    id: 'op:Pass@a product@frequency',
                    version: '1.0',
                },
                Interchanging: {
                    CanInterchange: { $t: 'true' },
                    id: 'op:Pass@a product@interchanging',
                    version: '1.0',
                },
                Transferability: {
                    CanTransfer: { $t: 'false' },
                    Name: { $t: 'Ticket is not transferable' },
                    id: 'op:Pass@a product@transferability',
                    version: '1.0',
                },
                UsageValidityPeriod: {
                    ActivationMeans: {
                        $t: 'noneRequired',
                    },
                    UsageEnd: {
                        $t: 'endOfFareDay',
                    },
                    UsageTrigger: {
                        $t: 'purchase',
                    },
                    id: 'op:Trip@a product@back@frequency',
                    version: '1.0',
                },
            },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Conditions of travel' },
        id: 'op:Tariff@a product@conditions_of_travel',
        version: '1.0',
    },
    {
        Description: { $t: 'single zone.' },
        GenericParameterAssignment: {
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:can_access', version: 'fxc:v1.0' },
            ValidityParameterGroupingType: { $t: 'OR' },
            id: 'Tariff@best product@access_lines',
            order: '1',
            validityParameters: {
                LineRef: [
                    { ref: 'op:4', version: '1.0' },
                    { ref: 'op:17', version: '1.0' },
                    { ref: 'op:2C', version: '1.0' },
                ],
            },
            version: '1.0',
        },
        Name: { $t: 'Available zones' },
        TypeOfFareStructureElementRef: { ref: 'fxc:access', version: 'fxc:v1.0' },
        id: 'op:Tariff@best product@access_lines',
        version: '1.0',
    },
    {
        Description: { $t: 'All periods allowed, 60 mins, but no evening - used in for some mticket, single zone.' },
        GenericParameterAssignment: {
            Description: { $t: 'Adult/Child Cash ticket Only available for 1 Day or 1week' },
            LimitationGroupingType: { $t: 'XOR' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:eligible', version: 'fxc:v1.0' },
            id: 'op:Tariff@best product@adult_or_child',
            limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Available duration combination' },
        TypeOfFareStructureElementRef: { ref: 'fxc:durations', version: 'fxc:v1.0' },
        id: 'op:Tariff@best product@durations@adult',
        timeIntervals: { TimeIntervalRef: [{ ref: 'op:Tariff@best product@3days' }] },
        version: '1.0',
    },
    {
        GenericParameterAssignment: {
            LimitationGroupingType: { $t: 'AND' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:condition_of_use', version: 'fxc:v1.0' },
            id: 'op:Tariff@best product@conditions_of_travel',
            limitations: {
                FrequencyOfUse: {
                    FrequencyOfUseType: { $t: 'unlimited' },
                    id: 'op:Pass@best product@frequency',
                    version: '1.0',
                },
                Interchanging: {
                    CanInterchange: { $t: 'true' },
                    id: 'op:Pass@best product@interchanging',
                    version: '1.0',
                },
                Transferability: {
                    CanTransfer: { $t: 'false' },
                    Name: { $t: 'Ticket is not transferable' },
                    id: 'op:Pass@best product@transferability',
                    version: '1.0',
                },
                UsageValidityPeriod: {
                    ActivationMeans: {
                        $t: 'noneRequired',
                    },
                    UsageEnd: {
                        $t: 'standardDuration',
                    },
                    UsageTrigger: {
                        $t: 'purchase',
                    },
                    id: 'op:Trip@best product@back@frequency',
                    version: '1.0',
                },
            },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Conditions of travel' },
        id: 'op:Tariff@best product@conditions_of_travel',
        version: '1.0',
    },
];

export const expectedGeoZoneFareStructureElements = [
    {
        Description: { $t: 'single zone.' },
        GenericParameterAssignment: {
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:can_access', version: 'fxc:v1.0' },
            ValidityParameterGroupingType: { $t: 'XOR' },
            id: 'op:Tariff@IW Product@access_zones',
            order: '1',
            validityParameters: { FareZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
            version: '1.0',
        },
        Name: { $t: 'Available zones' },
        TypeOfFareStructureElementRef: { ref: 'fxc:access', version: 'fxc:v1.0' },
        id: 'op:Tariff@IW Product@access_zones',
        version: '1.0',
    },
    {
        Description: { $t: 'All periods allowed, 60 mins, but no evening - used in for some mticket, single zone.' },
        GenericParameterAssignment: {
            Description: { $t: 'Adult/Child Cash ticket Only available for 1 Day or 1week' },
            LimitationGroupingType: { $t: 'XOR' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:eligible', version: 'fxc:v1.0' },
            id: 'op:Tariff@IW Product@adult_or_child',
            limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Available duration combination' },
        TypeOfFareStructureElementRef: { ref: 'fxc:durations', version: 'fxc:v1.0' },
        id: 'op:Tariff@IW Product@durations@adult',
        timeIntervals: { TimeIntervalRef: [{ ref: 'op:Tariff@IW Product@24days' }] },
        version: '1.0',
    },
    {
        GenericParameterAssignment: {
            LimitationGroupingType: { $t: 'AND' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:condition_of_use', version: 'fxc:v1.0' },
            id: 'op:Tariff@IW Product@conditions_of_travel',
            limitations: {
                FrequencyOfUse: {
                    FrequencyOfUseType: { $t: 'unlimited' },
                    id: 'op:Pass@IW Product@frequency',
                    version: '1.0',
                },
                Interchanging: {
                    CanInterchange: { $t: 'true' },
                    id: 'op:Pass@IW Product@interchanging',
                    version: '1.0',
                },
                Transferability: {
                    CanTransfer: { $t: 'false' },
                    Name: { $t: 'Ticket is not transferable' },
                    id: 'op:Pass@IW Product@transferability',
                    version: '1.0',
                },
                UsageValidityPeriod: {
                    ActivationMeans: {
                        $t: 'noneRequired',
                    },
                    UsageEnd: {
                        $t: 'endOfFareDay',
                    },
                    UsageTrigger: {
                        $t: 'purchase',
                    },
                    id: 'op:Trip@IW Product@back@frequency',
                    version: '1.0',
                },
            },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Conditions of travel' },
        id: 'op:Tariff@IW Product@conditions_of_travel',
        version: '1.0',
    },
    {
        Description: { $t: 'single zone.' },
        GenericParameterAssignment: {
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:can_access', version: 'fxc:v1.0' },
            ValidityParameterGroupingType: { $t: 'XOR' },
            id: 'op:Tariff@Super Product@access_zones',
            order: '1',
            validityParameters: { FareZoneRef: { ref: 'op:PLACEHOLDER@IW Village', version: '1.0' } },
            version: '1.0',
        },
        Name: { $t: 'Available zones' },
        TypeOfFareStructureElementRef: { ref: 'fxc:access', version: 'fxc:v1.0' },
        id: 'op:Tariff@Super Product@access_zones',
        version: '1.0',
    },
    {
        Description: { $t: 'All periods allowed, 60 mins, but no evening - used in for some mticket, single zone.' },
        GenericParameterAssignment: {
            Description: { $t: 'Adult/Child Cash ticket Only available for 1 Day or 1week' },
            LimitationGroupingType: { $t: 'XOR' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:eligible', version: 'fxc:v1.0' },
            id: 'op:Tariff@Super Product@adult_or_child',
            limitations: { UserProfileRef: { ref: 'op:adult', version: '1.0' } },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Available duration combination' },
        TypeOfFareStructureElementRef: { ref: 'fxc:durations', version: 'fxc:v1.0' },
        id: 'op:Tariff@Super Product@durations@adult',
        timeIntervals: { TimeIntervalRef: [{ ref: 'op:Tariff@Super Product@4days' }] },
        version: '1.0',
    },
    {
        GenericParameterAssignment: {
            LimitationGroupingType: { $t: 'AND' },
            TypeOfAccessRightAssignmentRef: { ref: 'fxc:condition_of_use', version: 'fxc:v1.0' },
            id: 'op:Tariff@Super Product@conditions_of_travel',
            limitations: {
                FrequencyOfUse: {
                    FrequencyOfUseType: { $t: 'unlimited' },
                    id: 'op:Pass@Super Product@frequency',
                    version: '1.0',
                },
                Interchanging: {
                    CanInterchange: { $t: 'true' },
                    id: 'op:Pass@Super Product@interchanging',
                    version: '1.0',
                },
                Transferability: {
                    CanTransfer: { $t: 'false' },
                    Name: { $t: 'Ticket is not transferable' },
                    id: 'op:Pass@Super Product@transferability',
                    version: '1.0',
                },
                UsageValidityPeriod: {
                    ActivationMeans: {
                        $t: 'noneRequired',
                    },
                    UsageEnd: {
                        $t: 'standardDuration',
                    },
                    UsageTrigger: {
                        $t: 'purchase',
                    },
                    id: 'op:Trip@Super Product@back@frequency',
                    version: '1.0',
                },
            },
            order: '1',
            version: '1.0',
        },
        Name: { $t: 'Conditions of travel' },
        id: 'op:Tariff@Super Product@conditions_of_travel',
        version: '1.0',
    },
];
