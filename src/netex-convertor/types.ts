export interface OperatorData {
    website: string;
    ttrteEnq: string;
    publicName: string;
    opId: string;
    vosaPSVLicenseName: string;
    fareEnq: string;
    complEnq: string;
    mode: string;
}

export interface ServiceData {
    serviceDescription: string;
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

export interface GeographicalFareZonePass {
    operatorName: string;
    nocCode: string;
    type: string;
    productName: string;
    productPrice: string;
    zoneName: string;
    stops: Stop[];
    daysValid: string;
    expiryRules: string;
}

export interface MultipleServicePeriodPass {
    operatorName: string;
    type: string;
    productName: string;
    productPrice: string;
    daysValid: string;
    expiryRules: string;
    nocCode: string;
    selectedServices: [SelectedService];
}

export interface SelectedService {
    lineName: string; 
    startDate: string;
}
