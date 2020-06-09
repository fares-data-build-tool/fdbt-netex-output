import {
    SingleTicket,
    ReturnTicket,
    PeriodGeoZoneTicket,
    PeriodMultipleServicesTicket,
    FlatFareTicket,
} from '../types';

export const singleTicket: SingleTicket = {
    lineName: '237',
    nocCode: 'MCTR',
    operatorShortName: 'Manchester Community Tr',
    serviceDescription: 'Ashton Under Lyne - Glossop',
    type: 'single',
    fareZones: [
        {
            name: 'Fare Zone 1',
            stops: [
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
            ],
            prices: [],
        },
        {
            name: 'Fare Zone 2',
            stops: [
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
            ],
            prices: [
                { price: '1.00', fareZones: ['Fare Zone 3'] },
                { price: '1.20', fareZones: ['Fare Zone 1'] },
            ],
        },
        {
            name: 'Fare Zone 3',
            stops: [
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
            ],
            prices: [{ price: '1.30', fareZones: ['Fare Zone 1'] }],
        },
    ],
    passengerType: 'Anyone',
};

export const returnTicket: ReturnTicket = {
    lineName: '16',
    nocCode: 'PBLT',
    operatorShortName: 'Rotala Preston Bus',
    serviceDescription: 'PRESTON - PRESTON via New Hall Lane',
    type: 'return',
    inboundFareZones: [
        {
            name: 'Shott Drive',
            stops: [
                {
                    stopName: 'Tudor Avenue',
                    naptanCode: 'lanagjtm',
                    atcoCode: '25001163',
                    localityCode: 'N0078526',
                    localityName: 'Farringdon Park',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'Tudor Avenue',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['The Stag pub', 'Frederick Drive', 'Red Lane'] },
                { price: '1.70', fareZones: ['Rail Station', 'Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'The Stag pub',
            stops: [
                {
                    stopName: 'Ripon Terrace',
                    naptanCode: 'landtatj',
                    atcoCode: '2500IMG1409',
                    localityCode: 'N0078526',
                    localityName: 'Farringdon Park',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Frederick Drive', 'Red Lane'] },
                { price: '1.70', fareZones: ['Rail Station', 'Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Frederick Drive',
            stops: [
                {
                    stopName: 'Hesketh Arms',
                    naptanCode: 'lanatwgp',
                    atcoCode: '250020161',
                    localityCode: 'N0078526',
                    localityName: 'Farringdon Park',
                    parentLocalityName: 'Preston',
                    indicator: 'opp',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Red Lane', 'Rail Station', 'Redtree Street'] },
                { price: '1.70', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Red Lane',
            stops: [
                {
                    stopName: 'Acregate Lane',
                    naptanCode: 'lanapmjm',
                    atcoCode: '250015489',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'opp',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Rail Station', 'Redtree Street'] },
                { price: '1.70', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Rail Station',
            stops: [
                {
                    stopName: 'Waldon Street',
                    naptanCode: 'landpwdt',
                    atcoCode: '2500IMG1324',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Redtree Street',
            stops: [
                {
                    stopName: 'Skeffington Road',
                    naptanCode: 'landgpjw',
                    atcoCode: '2500DCL3135',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'opp',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Park Lane',
            stops: [
                {
                    stopName: 'Centenary Mill',
                    naptanCode: 'landgpjt',
                    atcoCode: '2500DCL3133',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'opp',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Daws Bank/Plough Ave',
            stops: [
                {
                    stopName: "St Mary's Street",
                    naptanCode: 'landgpjp',
                    atcoCode: '2500DCL3131',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'opp',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [],
        },
    ],
    outboundFareZones: [
        {
            name: 'Shott Drive',
            stops: [
                {
                    stopName: 'Bus Station',
                    naptanCode: 'langmptd',
                    atcoCode: '2500JB20',
                    localityCode: 'N0078525',
                    localityName: 'Preston City Centre',
                    parentLocalityName: 'Preston',
                    indicator: 'Stand 37',
                    street: 'LORDS WALK',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['The Stag pub', 'Frederick Drive', 'Red Lane'] },
                { price: '1.70', fareZones: ['Rail Station', 'Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'The Stag pub',
            stops: [
                {
                    stopName: 'Lancaster Road',
                    naptanCode: 'landgpag',
                    atcoCode: '2500DCL3103',
                    localityCode: 'N0078525',
                    localityName: 'Preston City Centre',
                    parentLocalityName: 'Preston',
                    indicator: 'Stand L',
                    street: 'Lancaster Road',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Frederick Drive', 'Red Lane'] },
                { price: '1.70', fareZones: ['Rail Station', 'Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Frederick Drive',
            stops: [
                {
                    stopName: 'Church Street',
                    naptanCode: 'landptjm',
                    atcoCode: '2500IMG1284',
                    localityCode: 'N0078525',
                    localityName: 'Preston City Centre',
                    parentLocalityName: 'Preston',
                    indicator: 'Stand I',
                    street: 'Church Street',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Red Lane', 'Rail Station', 'Redtree Street'] },
                { price: '1.70', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Red Lane',
            stops: [
                {
                    stopName: 'London Road',
                    naptanCode: 'lanapapd',
                    atcoCode: '250014831',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [
                { price: '1.10', fareZones: ['Rail Station', 'Redtree Street'] },
                { price: '1.70', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] },
            ],
        },
        {
            name: 'Rail Station',
            stops: [
                {
                    stopName: 'Centenary Mill',
                    naptanCode: 'landpwdm',
                    atcoCode: '2500IMG1320',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Redtree Street', 'Park Lane', 'Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Redtree Street',
            stops: [
                {
                    stopName: 'Skeffington Road',
                    naptanCode: 'lanagpdp',
                    atcoCode: '25001182',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Park Lane', 'Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Park Lane',
            stops: [
                {
                    stopName: 'Acregate Lane',
                    naptanCode: 'lanagjdt',
                    atcoCode: '25001154',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [{ price: '1.00', fareZones: ['Daws Bank/Plough Ave'] }],
        },
        {
            name: 'Daws Bank/Plough Ave',
            stops: [
                {
                    stopName: 'Ribbleton Park',
                    naptanCode: 'lanamgpt',
                    atcoCode: '250014008',
                    localityCode: 'E0016129',
                    localityName: 'Fishwick',
                    parentLocalityName: 'Preston',
                    indicator: 'by',
                    street: 'New Hall Lane',
                    qualifierName: '',
                },
            ],
            prices: [],
        },
    ],
    passengerType: 'Anyone',
};

export const periodGeoZoneTicket: PeriodGeoZoneTicket = {
    operatorName: 'Blackpool Transport',
    type: 'periodGeoZone',
    nocCode: 'BLAC',
    products: [
        { productName: 'Selenium Test Product', productPrice: '10.50', productDuration: '1', productValidity: '24hr' },
        { productName: 'Selenium Test Product 2', productPrice: '150', productDuration: '2', productValidity: 'Calendar' },
        { productName: 'Selenium Test Product 3', productPrice: '170', productDuration: '3', productValidity: '24hr' },
        { productName: 'Selenium Test Product 4', productPrice: '15', productDuration: '4', productValidity: '24hr' },
    ],
    passengerType: 'Student',
    ageRange: 'Yes',
    ageRangeMax: '30',
    proof: 'No',
    zoneName: 'Test Town Centre',
    stops: [
        {
            stopName: 'The Towers',
            naptanCode: 'CHEPJWM',
            atcoCode: '0600MA6001',
            localityCode: 'N0076467',
            localityName: 'Macclesfield',
            parentLocalityName: '',
            indicator: 'opp',
            street: 'Park Street',
        },
        {
            stopName: 'Dog & Partridge',
            naptanCode: 'wrgdpma',
            atcoCode: '069000012480',
            localityCode: 'E0043040',
            localityName: 'Paddington',
            parentLocalityName: 'Warrington',
            indicator: 'o/s',
            street: 'New Manchester Road',
        },
        {
            stopName: 'Manchester Rd',
            naptanCode: 'MANATDWT',
            atcoCode: '1800ED24711',
            localityCode: 'E0028839',
            localityName: 'Hollinwood',
            parentLocalityName: '',
            indicator: 'Stop A',
            street: 'MANCHESTER RD',
        },
        {
            stopName: 'Bower Fold',
            naptanCode: 'MANDGADW',
            atcoCode: '1800EH37241',
            localityCode: 'E0028586',
            localityName: 'Bower Fold',
            parentLocalityName: 'Stalybridge',
            indicator: '',
            street: 'Mottram Rd',
        },
        {
            stopName: 'Oak Road',
            naptanCode: 'MANJTPJW',
            atcoCode: '1800SJ47971',
            localityCode: 'N0075113',
            localityName: 'Partington',
            parentLocalityName: '',
            indicator: 'nr',
            street: 'WARBURTON LANE',
        },
        {
            stopName: 'Meadow Close',
            naptanCode: 'MANPATDT',
            atcoCode: '1800WA15551',
            localityCode: 'E0028979',
            localityName: 'Little Lever',
            parentLocalityName: '',
            indicator: 'opp',
            street: 'BOOTH ROAD',
        },
        {
            stopName: 'Church Road',
            naptanCode: 'lanatgjp',
            atcoCode: '25001814',
            localityCode: 'E0015836',
            localityName: 'Great Plumpton',
            parentLocalityName: '',
            indicator: 'by',
            street: 'Church Road',
        },
        {
            stopName: 'Hare and Hounds',
            naptanCode: 'lanawtwg',
            atcoCode: '2500759',
            localityCode: 'E0015881',
            localityName: 'Clayton-le-Moors',
            parentLocalityName: '',
            indicator: 'Stop 2',
            street: 'Whalley Road',
        },
        {
            stopName: 'Skippool Avenue',
            naptanCode: 'langjpaw',
            atcoCode: '2500IMG456',
            localityCode: 'E0016583',
            localityName: 'Poulton-le-Fylde',
            parentLocalityName: '',
            indicator: 'opp',
            street: 'Breck Road',
        },
        {
            stopName: 'Lytham St Annes HTC',
            naptanCode: 'lanpamtw',
            atcoCode: '2500LAA16548',
            localityCode: 'E0015826',
            localityName: 'Ansdell',
            parentLocalityName: '',
            indicator: 'by',
            street: 'Church Road',
        },
        {
            stopName: 'Torsway Avenue',
            naptanCode: 'blpadadw',
            atcoCode: '2590B0008',
            localityCode: 'E0035280',
            localityName: 'Kingscote',
            parentLocalityName: 'Blackpool',
            indicator: 'by',
            street: 'Newton Drive',
        },
        {
            stopName: 'Spencer Court',
            naptanCode: 'blpadwgm',
            atcoCode: '2590B0316',
            localityCode: 'N0079370',
            localityName: 'Central',
            parentLocalityName: 'Blackpool',
            indicator: 'by',
            street: 'Talbot Road',
        },
        {
            stopName: 'Mesnes Park',
            naptanCode: 'mergjpjd',
            atcoCode: '2800S10110A',
            localityCode: 'E0029817',
            localityName: 'Newton le Willows',
            parentLocalityName: '',
            indicator: 'Opposite',
            street: 'Park Road North',
        },
        {
            stopName: 'Grosvenor Road',
            naptanCode: 'merdwgmt',
            atcoCode: '2800S51045B',
            localityCode: 'E0052682',
            localityName: 'Prescot',
            parentLocalityName: '',
            indicator: 'Adjacent',
            street: 'St Helens Road',
        },
        {
            stopName: 'Campbell Avenue',
            naptanCode: '32900357',
            atcoCode: '3290YYA00357',
            localityCode: 'E0043596',
            localityName: 'Holgate',
            parentLocalityName: 'York',
            indicator: 'opp',
            street: 'Hamilton Drive',
        },
        {
            stopName: 'Bank End Farm',
            naptanCode: '37055608',
            atcoCode: '370055608',
            localityCode: 'E0030284',
            localityName: 'Howbrook',
            parentLocalityName: '',
            indicator: '',
            street: 'Bank Lane',
        },
        {
            stopName: 'Main Street St Johns Close',
            naptanCode: '45010202',
            atcoCode: '450010202',
            localityCode: 'E0032162',
            localityName: 'Aberford',
            parentLocalityName: 'Leeds',
            indicator: 'at',
            street: 'Main Street',
        },
        {
            stopName: 'Midgley Road Spring Villas',
            naptanCode: '45019529',
            atcoCode: '450019529',
            localityCode: 'E0033244',
            localityName: 'Mytholmroyd',
            parentLocalityName: 'Hebden Bridge',
            indicator: 'at',
            street: 'Midgley Road',
        },
    ],
};

export const periodMultipleServicesTicket: PeriodMultipleServicesTicket = {
    operatorName: 'Lancashire County Council',
    type: 'periodMultipleServices',
    nocCode: 'PBLT',
    products: [
        { productName: 'Day Rider', productPrice: '12', productDuration: '1', productValidity: '24hr' },
        { productName: 'Weekly Rider', productPrice: '30', productDuration: '7', productValidity: '24hr' },
    ],
    passengerType: 'Adult',
    ageRange: 'Yes',
    ageRangeMin: '12',
    ageRangeMax: '25',
    proof: 'Yes',
    proofDocuments: ['Membership Card', 'Student Card', 'Identity Document'],
    selectedServices: [
        { lineName: '35', startDate: '30/03/2020', serviceDescription: 'PRESTON - PRESTON via Fylde Road, Lane Ends' },
        {
            lineName: '401',
            startDate: '03/09/2018',
            serviceDescription: 'MYERSCOUGH COLLEGE - BARTON GRANGE CENTRE - MYERSCOUGH COLLEGE',
        },
        {
            lineName: '656',
            startDate: '09/01/2017',
            serviceDescription: 'BROADGATE - LEA - ASHTON - ARCHBISHOP TEMPLE HS',
        },
        {
            lineName: '731',
            startDate: '05/09/2018',
            serviceDescription: 'WALMER BRIDGE - PENWORTHAM ALL HALLOWS RCHS  ',
        },
        {
            lineName: '112',
            startDate: '28/03/2020',
            serviceDescription:
                'PRESTON - MOSS SIDE via Frenchwood, Walton le Dale, Walton Summit, Clayton Green, Runshaw College, Midge Hall',
        },
        {
            lineName: '114',
            startDate: '28/03/2020',
            serviceDescription:
                'CHORLEY - PRESTON via Eaves Lane, Chorley Hospital, Whittle le Woods, Clayton Green, Farington Moss, Broadgate',
        },
        {
            lineName: '25A',
            startDate: '28/03/2020',
            serviceDescription: 'MELLOR BROOK - BLACKBURN via Lammack, St.Marys College',
        },
        {
            lineName: '337',
            startDate: '28/03/2020',
            serviceDescription: 'CHORLEY - ORMSKIRK via Lower Burgh, Charnock Richard, Mawdesley, Parbold',
        },
        {
            lineName: '400',
            startDate: '08/09/2014',
            serviceDescription: 'FLEETWOOD - MYERSCOUGH COLLEGE via Cleveleys, Blackpool, Poulton',
        },
        { lineName: '5', startDate: '04/01/2020', serviceDescription: 'ASDA - PRESTON  ' },
        {
            lineName: '15',
            startDate: '28/03/2020',
            serviceDescription: 'PRESTON - BROUGHTON via Longsands, ASDA, Royal Preston Hospital, Wychnor',
        },
        {
            lineName: '664',
            startDate: '03/09/2018',
            serviceDescription: 'NEW HALL LANE - FULWOOD ACADEMY via Brookfield',
        },
        {
            lineName: '75',
            startDate: '28/03/2020',
            serviceDescription: 'FLEETWOOD - PRESTON via Thornton, Singleton, Weeton, Newton, Riversway',
        },
        { lineName: '6', startDate: '02/01/2020', serviceDescription: 'ORMSKIRK - SCOTT ESTATE CIRCULAR  ' },
        {
            lineName: '680',
            startDate: '03/09/2019',
            serviceDescription: 'HESKETH BANK - MUCH HOOLE - PENWORTHAM GIRLS HIGH SCHOOL',
        },
        { lineName: '698', startDate: '24/02/2020', serviceDescription: 'WALTON PARK - PENWORTHAM ALL HALLOWS RCHS  ' },
        { lineName: '959', startDate: '09/02/2012', serviceDescription: 'MILLER ROAD - CORPUS CHRISTI  ' },
        { lineName: '961', startDate: '09/02/2012', serviceDescription: 'MOOR NOOK - CORPUS CHRISTI  ' },
        { lineName: '963', startDate: '04/01/2012', serviceDescription: 'GAMULL LANE - CITY CENTRE - CORPUS CHRISTI' },
        {
            lineName: '5',
            startDate: '28/03/2020',
            serviceDescription: 'CHIPPING - CLITHEROE via Knowle Green, Hurst Green, Barrow Brook',
        },
        {
            lineName: '23',
            startDate: '30/03/2020',
            serviceDescription: 'PRESTON - PRESTON via Plunginton Road, Black Bull Lane',
        },
        {
            lineName: '312',
            startDate: '28/03/2020',
            serviceDescription: 'SKELMERSDALE - WRIGHTINGTON via Tanhouse, Hall Green',
        },
        {
            lineName: '44',
            startDate: '30/03/2020',
            serviceDescription: 'PRESTON - PRESTON via University, Eldon Street, Lane Ends, Hoyles Lane',
        },
        {
            lineName: '45',
            startDate: '28/03/2020',
            serviceDescription: 'PRESTON - BLACKBURN via Fulwood, RPH, Goosnargh, Whittingham, Salesbury, Wilpshire',
        },
        {
            lineName: '663',
            startDate: '16/09/2019',
            serviceDescription: 'HOLME SLACK - GAMULL LANE - BROOKFIELD - FULWOOD ACADEMY',
        },
        { lineName: '8', startDate: '30/03/2020', serviceDescription: 'PRESTON - PRESTON via Ribbleton Lane' },
        {
            lineName: '89',
            startDate: '30/03/2020',
            serviceDescription: 'PRESTON - PRESTON via Park and Ride Portway, Riversway',
        },
        { lineName: '2', startDate: '28/03/2020', serviceDescription: 'CLITHEROE - CLITHEROE via Low Moor' },
        {
            lineName: '31',
            startDate: '30/03/2020',
            serviceDescription: 'PRESTON - PRESTON via Brook Street, Lane Ends',
        },
        { lineName: '576', startDate: '03/09/2008', serviceDescription: 'FRIARGATE - CORPUS CHRISTI RCHS  ' },
    ],
};

export const flatFareTicket: FlatFareTicket = {
    operatorName: "Warrington's Own Buses",
    nocCode: 'WBTR',
    type: 'flatFare',
    products: [{ productName: 'Weekly Rider', productPrice: '100' }],
    selectedServices: [
        {
            lineName: '709',
            startDate: '02/03/2020',
            serviceDescription: 'Warrington Road / Dunbeath Avenue - Prescot Road / Regents Road',
        },
        {
            lineName: '743',
            startDate: '02/03/2020',
            serviceDescription: 'Alder Hey Road / De La Salle School - News Lane / Hydes Brow',
        },
        {
            lineName: '751',
            startDate: '02/03/2020',
            serviceDescription: 'Alder Hey Road / De La Salle School - Warrington Road / Lawton Road',
        },
        {
            lineName: '754',
            startDate: '02/03/2020',
            serviceDescription: 'Alder Hey Road / De La Salle School - Forest Road / Shakespeare Road',
        },
        {
            lineName: '755',
            startDate: '02/03/2020',
            serviceDescription: 'Alder Hey Road / De La Salle School - St Helens Junction Rail Station/ Station Road',
        },
        {
            lineName: '708',
            startDate: '02/03/2020',
            serviceDescription: 'Warrington Road / Coylton Avenue - Prescot / Prescot Bus Station',
        },
        {
            lineName: '787',
            startDate: '02/03/2020',
            serviceDescription: 'Higher Lane / Rainford High School - City Road / Hard Lane',
        },
        { lineName: '25', startDate: '06/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '25', startDate: '13/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '26', startDate: '06/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '28E', startDate: '06/04/2020', serviceDescription: 'Warrington - Leigh' },
        { lineName: '31', startDate: '06/04/2020', serviceDescription: 'Origin - Destination' },
        { lineName: '3D', startDate: '06/04/2020', serviceDescription: 'Runcorn High Street - Halton Hospital' },
        { lineName: 'CAT6', startDate: '06/04/2020', serviceDescription: 'Warrington - Grappenhall' },
        { lineName: 'CAT8', startDate: '06/04/2020', serviceDescription: 'Warrington - Appleton Thorn' },
        { lineName: 'CAT9', startDate: '06/04/2020', serviceDescription: 'Warrington - Northwich' },
        { lineName: '13', startDate: '13/04/2020', serviceDescription: 'Warrington - Omega' },
        { lineName: '14', startDate: '06/04/2020', serviceDescription: 'Warrington - Penketh/Gt Sankey (Circ)' },
        { lineName: '14', startDate: '13/04/2020', serviceDescription: 'Warrington - Penketh/Gt Sankey (Circ)' },
        { lineName: '16', startDate: '06/04/2020', serviceDescription: 'Warrington - Dallam' },
        { lineName: '17', startDate: '13/04/2020', serviceDescription: 'Warrington - Callands' },
        { lineName: '19', startDate: '13/04/2020', serviceDescription: 'Warrington - Culcheth' },
        { lineName: '20A', startDate: '06/04/2020', serviceDescription: 'Warrington - Longford/Orford (Circ)' },
        { lineName: '28A', startDate: '06/04/2020', serviceDescription: 'Warrington - Leigh' },
        { lineName: '3', startDate: '13/04/2020', serviceDescription: 'Warrington - Martinscroft' },
        { lineName: '3D', startDate: '13/04/2020', serviceDescription: 'Runcorn High Street - Halton Hospital' },
        { lineName: 'CAT6', startDate: '13/04/2020', serviceDescription: 'Warrington - Grappenhall' },
        { lineName: '1', startDate: '13/04/2020', serviceDescription: 'Warrington - Latchford/Westy (Circ)' },
        { lineName: '15', startDate: '06/04/2020', serviceDescription: 'Warrington - Gt Sankey/Penketh (Circ)' },
        { lineName: '15', startDate: '13/04/2020', serviceDescription: 'Warrington - Gt Sankey/Penketh (Circ)' },
        { lineName: '22', startDate: '06/04/2020', serviceDescription: 'Warrington - Ashton' },
        { lineName: '22A', startDate: '06/04/2020', serviceDescription: 'Warrington - Wigan' },
        { lineName: '27', startDate: '06/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '27', startDate: '13/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '28E', startDate: '13/04/2020', serviceDescription: 'Warrington - Leigh' },
        { lineName: '47', startDate: '13/04/2020', serviceDescription: 'Warrington - Knutsford' },
        { lineName: '11', startDate: '06/04/2020', serviceDescription: 'Warrington - Gains/Latchford (Circ)' },
        { lineName: '12', startDate: '06/04/2020', serviceDescription: 'Gains/Latchford (Circ) - Warrington' },
        { lineName: '16', startDate: '13/04/2020', serviceDescription: 'Warrington - Dallam' },
        { lineName: '2', startDate: '06/04/2020', serviceDescription: 'Warrington - Westy/Latchford (Circ)' },
        { lineName: '20A', startDate: '13/04/2020', serviceDescription: 'Warrington - Longford/Orford (Circ)' },
        { lineName: '26', startDate: '13/04/2020', serviceDescription: 'Warrington - Gorse Covert' },
        { lineName: '3', startDate: '06/04/2020', serviceDescription: 'Warrington - Martinscroft' },
        { lineName: '47', startDate: '06/04/2020', serviceDescription: 'Warrington - Knutsford' },
        { lineName: '48A', startDate: '06/04/2020', serviceDescription: 'Frodsham - Northwich' },
        { lineName: 'CAT5', startDate: '06/04/2020', serviceDescription: 'Warrington - Lymm' },
        { lineName: 'CAT5', startDate: '13/04/2020', serviceDescription: 'Warrington - Lymm' },
        { lineName: 'CAT7', startDate: '06/04/2020', serviceDescription: 'Warrington - Appleton Thorn' },
        { lineName: 'CAT7', startDate: '13/04/2020', serviceDescription: 'Warrington - Appleton Thorn' },
        { lineName: 'CAT8', startDate: '13/04/2020', serviceDescription: 'Warrington - Appleton Thorn' },
        { lineName: '17', startDate: '06/04/2020', serviceDescription: 'Warrington - Callands' },
        { lineName: '2', startDate: '13/04/2020', serviceDescription: 'Warrington - Westy/Latchford (Circ)' },
        { lineName: '22', startDate: '13/04/2020', serviceDescription: 'Warrington - Ashton' },
        { lineName: '22A', startDate: '13/04/2020', serviceDescription: 'Warrington - Wigan' },
        { lineName: 'CAT9', startDate: '13/04/2020', serviceDescription: 'Warrington - Northwich' },
        { lineName: 'H20', startDate: '06/04/2020', serviceDescription: 'Murdishaw - Murdishaw' },
        { lineName: '1', startDate: '06/04/2020', serviceDescription: 'Warrington - Latchford/Westy (Circ)' },
        { lineName: '11', startDate: '13/04/2020', serviceDescription: 'Warrington - Gains/Latchford (Circ)' },
        { lineName: '13', startDate: '06/04/2020', serviceDescription: 'Warrington - Omega' },
        { lineName: '21', startDate: '06/04/2020', serviceDescription: 'Warrington - Orford/Longford (Circ)' },
        { lineName: '21', startDate: '13/04/2020', serviceDescription: 'Warrington - Orford/Longford (Circ)' },
        { lineName: '21A', startDate: '13/04/2020', serviceDescription: 'Warrington - Orford/Longford (Circ)' },
        { lineName: '32', startDate: '13/04/2020', serviceDescription: 'Warrington - Widnes Market' },
        { lineName: '48A', startDate: '13/04/2020', serviceDescription: 'Frodsham - Northwich' },
        { lineName: 'H20A', startDate: '06/04/2020', serviceDescription: 'Murdishaw - Murdishaw' },
        { lineName: '20', startDate: '06/04/2020', serviceDescription: 'Warrington - Longford/Orford (Circ)' },
        { lineName: '21A', startDate: '06/04/2020', serviceDescription: 'Warrington - Orford/Longford (Circ)' },
        {
            lineName: '3D',
            startDate: '02/02/2020',
            serviceDescription: 'RUNCORN HIGH STREET- STAND C - Halton Hospital',
        },
        { lineName: '12', startDate: '13/04/2020', serviceDescription: 'Gains/Latchford (Circ) - Warrington' },
        { lineName: '19', startDate: '06/04/2020', serviceDescription: 'Warrington - Culcheth' },
        { lineName: '20', startDate: '13/04/2020', serviceDescription: 'Warrington - Longford/Orford (Circ)' },
        { lineName: '28A', startDate: '13/04/2020', serviceDescription: 'Warrington - Leigh' },
        { lineName: '31', startDate: '13/04/2020', serviceDescription: 'Origin - Destination' },
        { lineName: '32', startDate: '06/04/2020', serviceDescription: 'Warrington - Widnes Market' },
        { lineName: '48', startDate: '06/04/2020', serviceDescription: 'Frodsham - Northwich' },
        { lineName: '48', startDate: '13/04/2020', serviceDescription: 'Frodsham - Northwich' },
        { lineName: 'H20', startDate: '13/04/2020', serviceDescription: 'Murdishaw - Murdishaw' },
        { lineName: 'H20A', startDate: '13/04/2020', serviceDescription: 'Murdishaw - Murdishaw' },
    ],
    passengerType: 'Anyone',
};

export const periodGeoZoneTicketWithNoType = {
    operatorName: 'IW Bus',
    zoneName: 'Test Town Centre',
    stops: [
        {
            stopName: 'The Towers',
            naptanCode: 'CHEPJWM',
            atcoCode: '0600MA6001',
            localityCode: 'N0076467',
            localityName: 'Macclesfield',
            parentLocalityName: '',
            indicator: 'opp',
            street: 'Park Street',
        },
    ],
    products: [
        {
            productName: 'Test Product',
            productPrice: '1000',
            productDuration: '31',
            productValidity: 'endOfCalendarDay',
        },
    ],
    nocCode: 'IW1234',
    passengerType: 'Student',
    ageRange: 'Yes',
    ageRangeMax: '30',
    proof: 'No',
};
