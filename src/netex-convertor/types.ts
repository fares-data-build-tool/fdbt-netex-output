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
    fareZones: FareZone[];
}

export interface BasePeriodTicket {
    operatorName: string;
    products: ProductDetails[];
    nocCode: string;
}

export interface PeriodGeoZoneTicket extends BasePeriodTicket {
    zoneName: string;
    stops: Stop[];
}

export interface PeriodMultipleServicesTicket extends BasePeriodTicket {
    selectedServices: SelectedService[];
}

export type PeriodTicket = PeriodGeoZoneTicket | PeriodMultipleServicesTicket;

export interface SelectedService {
    lineName: string;
    startDate: string;
    description: string;
}

export interface ProductDetails {
    productName: string;
    productPrice: string;
    daysValid: string;
    expiryRules: string;
}
