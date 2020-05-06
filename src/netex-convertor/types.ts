export interface OperatorData {
    website: string;
    ttrteEnq: string;
    operatorPublicName: string;
    opId: string;
    vosaPsvLicenseName: string;
    fareEnq: string;
    complEnq: string;
    mode: string;
}

export interface ServiceData {
    description: string;
}

export interface Stop {
    stopName: string;
    naptanCode: string;
    atcoCode: string;
    localityCode: string;
    localityName: string;
    parentLocalityName: string;
    qualifierName?: string;
    indicator?: string;
    street?: string;
}

export interface FareZonePrices {
    price: string;
    fareZones: string[];
}

export interface FareZone {
    name: string;
    stops: Stop[];
    prices: FareZonePrices[];
}

export interface MatchingData {
    lineName: string;
    nocCode: string;
    operatorShortName: string;
    serviceDescription: string;
    fareZones: FareZone[];
}

export interface BaseTicket {
    operatorName: string;
    nocCode: string;
}

export interface FlatFareTicket extends BaseTicket {
    products: ProductDetails[];
    selectedServices: SelectedService[];
}

export interface BasePeriodTicket extends BaseTicket {
    products: PeriodProductDetails[];
}

export interface PeriodGeoZoneTicket extends BasePeriodTicket {
    zoneName: string;
    stops: Stop[];
}

export interface PeriodMultipleServicesTicket extends BasePeriodTicket {
    selectedServices: SelectedService[];
}

export interface SelectedService {
    lineName: string;
    startDate: string;
    serviceDescription: string;
}

export interface BaseProductDetails {
    productName: string;
    productPrice: string;
}

export interface PeriodProductDetails extends BaseProductDetails{
    daysValid: string;
    expiryRules: string;
}

export type ProductTicket = PeriodGeoZoneTicket | PeriodMultipleServicesTicket | FlatFareTicket;

export type PeriodTicket = PeriodGeoZoneTicket | PeriodMultipleServicesTicket

export type ProductDetails = BaseProductDetails | PeriodProductDetails;

export interface ScheduledStopPoint {
    versionRef: string;
    ref: string;
    $t: string;
}

export interface TopographicProjectionRef {
    versionRef: string;
    ref: string;
    $t: string;
}

export interface Line {
    version: string;
    id: string;
    Name: object;
    Description: object;
    Url: object;
    PublicCode: object;
    PrivateCode: object;
    OperatorRef: object;
    LineType: object;
}

export interface LineRef {
    version: string;
    ref: string;
}

export interface FareStructureElement {
    version: string;
    id: string;
    Name: object;
    Description?: object;
    TypeOfFareStructureElementRef?: object;
    GenericParameterAssignment: object;
    timeIntervals?: object;
}
