import { FareStructureElement } from './../types';
import {
    Stop,
    OperatorData,
    PeriodTicket,
    PeriodGeoZoneTicket,
    PeriodMultipleServicesTicket,
    ScheduledStopPoint,
    TopographicProjectionRef,
    Line,
    LineRef,
} from '../types';
import { getCleanWebsite } from '../sharedHelpers';

export const getScheduledStopPointsList = (stops: Stop[]): ScheduledStopPoint[] =>
    stops.map((stop: Stop) => ({
        versionRef: 'EXTERNAL',
        ref: `naptStop:${stop.naptanCode}`,
        $t: `${stop.stopName}, ${stop.street}, ${stop.localityName}`,
    }));

export const getTopographicProjectionRefList = (stops: Stop[]): TopographicProjectionRef[] =>
    stops.map((stop: Stop) => ({
        versionRef: 'nptg:EXTERNAL',
        ref: `nptgLocality:${stop.localityCode}`,
        $t: `${stop.street}, ${stop.localityName}, ${stop.parentLocalityName}`,
    }));

export const getLinesList = (userPeriodTicket: PeriodMultipleServicesTicket, operatorData: OperatorData): Line[] =>
    userPeriodTicket.selectedServices
        ? userPeriodTicket.selectedServices.map(service => ({
            version: '1.0',
            id: `op:${service.lineName}`,
            Name: { $t: `Line ${service.lineName}` },
            Description: { $t: service.serviceDescription },
            Url: { $t: getCleanWebsite(operatorData.website) },
            PublicCode: { $t: service.lineName },
            PrivateCode: { type: 'noc', $t: `${userPeriodTicket.nocCode}_${service.lineName}` },
            OperatorRef: { version: '1.0', ref: `noc:${userPeriodTicket.nocCode}` },
            LineType: { $t: 'local' },
        }))
        : [];

export const getLineRefList = (userPeriodTicket: PeriodMultipleServicesTicket): LineRef[] =>
    userPeriodTicket.selectedServices
        ? userPeriodTicket.selectedServices.map(service => ({
            version: '1.0',
            ref: `op:${service.lineName}`,
        }))
        : [];

export const getGeoZoneFareTable = (userPeriodTicket: PeriodGeoZoneTicket): {}[] =>
    userPeriodTicket.products.map(product => ({
        version: '1.0',
        id: `op:${product.productName}@${userPeriodTicket.zoneName}`,
        Name: { $t: `${userPeriodTicket.zoneName}` },
        specifics: {
            TariffZoneRef: {
                version: '1.0',
                ref: `op:${product.productName}@${userPeriodTicket.zoneName}`,
            },
        },
        columns: {
            FareTableColumn: {
                version: '1.0',
                id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket`,
                Name: { $t: `${userPeriodTicket.zoneName}` },
                representing: {
                    TariffZoneRef: {
                        version: '1.0',
                        ref: `op:${product.productName}@${userPeriodTicket.zoneName}`,
                    },
                },
            },
        },
        includes: {
            FareTable: {
                version: '1.0',
                id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket`,
                Name: { t$: `${product.productName} - Cash` },
                pricesFor: {
                    SalesOfferPacakgeRef: {
                        version: '1.0',
                        ref: `op:Pass@${product.productName}-SOP@p-ticket`,
                    },
                },
                specifics: {
                    TypeOfTravelDocumentRef: {
                        version: '1.0',
                        ref: 'op:p-ticket',
                    },
                },
                columns: {
                    FareTableColumn: {
                        version: '1.0',
                        id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket`,
                        Name: { $t: 'Cash' },
                        representing: {
                            TypeOfTravelDocumentRef: {
                                version: '1.0',
                                ref: 'op:p-ticket',
                            },
                            UserProfileRef: {
                                version: '1.0',
                                ref: 'op:adult',
                            },
                        },
                    },
                },
                includes: {
                    Faretable: {
                        version: '1.0',
                        id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket@adult`,
                        Name: { $t: `${product.productName} - Cash - Adult` },
                        limitations: {
                            UserProfileRef: {
                                versions: '1.0',
                                ref: 'op:adult',
                            },
                        },
                        columns: {
                            FareTableColumn: {
                                version: '1.0',
                                id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket@adult`,
                                Name: { $t: 'Adult' },
                                representing: {
                                    TypeOfTravelDocumentRef: {
                                        version: '1.0',
                                        ref: 'op:p-tciket',
                                    },
                                    UserProfileRef: {
                                        version: '1.0',
                                        ref: 'op:adult',
                                    },
                                },
                            },
                        },
                    },
                },
                cells: {
                    Cell: {
                        version: '1.0',
                        id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket@adult@1day`,
                        order: '1',
                        TimeIntervalPrice: {
                            version: '1.0',
                            id: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket@adult@1day`,
                            Amount: { t$: `${product.productPrice}` },
                            TimeIntervalRef: {
                                version: '1.0',
                                ref: `op:Tariff@${product.productName}@1day`,
                            },
                            ColumnRef: {
                                version: '1.0',
                                ref: `op:${product.productName}@${userPeriodTicket.zoneName}@p-ticket@adult`,
                            },
                            RowRef: {
                                version: '1.0',
                                ref: `op:${product.productName}@1day`,
                            },
                        },
                    },
                },
            },
        },
    }));

export const getMultiServiceFareTable = (userPeriodTicket: PeriodMultipleServicesTicket): {}[] => {
    const name = `${userPeriodTicket.nocCode}-multi-service`;
    const netexObjectList = userPeriodTicket.products.map(product => ({
        version: '1.0',
        id: `op:${product.productName}@${name}`,
        Name: { $t: name },
        specifics: null,
        columns: {
            FareTableColumn: {
                version: '1.0',
                id: `op:${product.productName}@${name}@p-ticket`,
                Name: { $t: name },
                representing: null,
            },
        },
        includes: {
            FareTable: {
                version: '1.0',
                id: `op:${product.productName}@${name}@p-ticket`,
                Name: { t$: `${product.productName} - Cash` },
                pricesFor: {
                    SalesOfferPacakgeRef: {
                        version: '1.0',
                        ref: `op:Pass@${product.productName}-SOP@p-ticket`,
                    },
                },
                specifics: {
                    TypeOfTravelDocumentRef: {
                        version: '1.0',
                        ref: 'op:p-ticket',
                    },
                },
                columns: {
                    FareTableColumn: {
                        version: '1.0',
                        id: `op:${product.productName}@${name}@p-ticket`,
                        Name: { $t: 'Cash' },
                        representing: {
                            TypeOfTravelDocumentRef: {
                                version: '1.0',
                                ref: 'op:p-ticket',
                            },
                            UserProfileRef: {
                                version: '1.0',
                                ref: 'op:adult',
                            },
                        },
                    },
                },
                includes: {
                    Faretable: {
                        version: '1.0',
                        id: `op:${product.productName}@${name}@p-ticket@adult`,
                        Name: { $t: `${product.productName} - Cash - Adult` },
                        limitations: {
                            UserProfileRef: {
                                versions: '1.0',
                                ref: 'op:adult',
                            },
                        },
                        columns: {
                            FareTableColumn: {
                                version: '1.0',
                                id: `op:${product.productName}@${name}@p-ticket@adult`,
                                Name: { $t: 'Adult' },
                                representing: {
                                    TypeOfTravelDocumentRef: {
                                        version: '1.0',
                                        ref: 'op:p-tciket',
                                    },
                                    UserProfileRef: {
                                        version: '1.0',
                                        ref: 'op:adult',
                                    },
                                },
                            },
                        },
                    },
                },
                cells: {
                    Cell: {
                        version: '1.0',
                        id: `op:${product.productName}@${name}@p-ticket@adult@1day`,
                        order: '1',
                        TimeIntervalPrice: {
                            version: '1.0',
                            id: `op:${product.productName}@${name}@p-ticket@adult@1day`,
                            Amount: { t$: `${product.productPrice}` },
                            TimeIntervalRef: {
                                version: '1.0',
                                ref: `op:Tariff@${product.productName}@1day`,
                            },
                            ColumnRef: {
                                version: '1.0',
                                ref: `op:${product.productName}@${name}@p-ticket@adult`,
                            },
                            RowRef: {
                                version: '1.0',
                                ref: `op:${product.productName}@1day`,
                            },
                        },
                    },
                },
            },
        },
    }));
    return netexObjectList;
};

export const getFareTableList = (userPeriodTicket: PeriodTicket): {}[] =>
    userPeriodTicket.products.map(product => ({
        version: '1.0',
        id: `epd:UK:${userPeriodTicket.nocCode}:FareFrame_UK_PI_FARE_PRICE:${product.productName}@pass:op`,
        Name: { $t: `${product.productName} Fares` },
        pricesFor: {
            PreassignedFareProductRef: { version: '1.0', ref: `op:Pass@${product.productName}` },
        },
        usedIn: {
            TariffRef: { version: '1.0', ref: `op:Tariff@${product.productName}` },
        },
    }));

export const getFareStructureElement = (elementNumber: number): FareStructureElement => {
    switch (elementNumber) {
        case 1:
            return {
                version: "1.0",
                id: "",
                Name: { $t: "Available zones" },
                Description: { $t: "single zone." },
                TypeOfFareStructureElementRef: {
                    version: "fxc:v1.0",
                    ref: "fxc:access"
                },
                GenericParameterAssignment: {
                    id: "",
                    version: "1.0",
                    order: "1",
                    TypeOfAccessAssignmentRef: {
                        $t: {
                            version: "fxc:v1.0",
                            ref: "fxc:can_access"
                        }
                    },
                    ValidityParameterGroupingType: { $t: "XOR" },
                    validityParameters: {
                        $t: {
                            FareZoneRef: {
                                version: "1.0",
                                ref: ""
                            }
                        }
                    }
                }
            };
        case 2:
            return {
                version: "1.0",
                id: "",
                Name: { $t: "Eligible user types" },
                TypeOfFareStructureElementRef: {
                    version: "fxc:v1.0",
                    ref: "fxc:eligibility"
                },
                GenericParameterAssignment: {
                    id: "",
                    version: "1.0",
                    order: "1",
                    TypeOfAccessAssignmentRef: {
                        $t: {
                            version: "fxc:v1.0",
                            ref: "fxc:eligible"
                        }
                    },
                    LimitationGroupingType: { $t: "XOR" },
                    limitations: {
                        $t: {
                            UserProfile: {
                                version: "1.0",
                                id: "op:adult",
                                Name: {
                                    $t: "Adult"
                                },
                                prices: {
                                    $t: {
                                        UsageParameterPrice: {
                                            version: "1.0",
                                            id: "op:adult"
                                        }
                                    }
                                },
                                TypeOfConcessionRef: {
                                    version: "fxc:v1.0",
                                    ref: "fxc:none"
                                }
                            }
                        }
                    }
                }
            }
    };
        case 3: return {
    version: "1.0",
    id: "",
    Name: { $t: "Available duration combination" },
    Description: { $t: "All periods allowed, 60 mins, but no evening - used in for some mticket, single zone." },
    TypeOfFareStructureElementRef: {
        version: "fxc:v1.0",
        ref: "fxc:durations"
    },
    timeIntervals: {
        $t: {
            TimeIntervalRef: {
                version: "1.0",
                ref: ""
            }
        }
    },
    GenericParameterAssignment: {
        id: "",
        version: "1.0",
        order: "1",
        Description: {
            $t: "Adult/Child Cash ticket Only available for 1 Day or 1week"
        },
        TypeOfAccessAssignmentRef: {
            version: "fxc:v1.0",
            ref: "fxc:eligible"
        },
        LimitationGroupingType: { $t: "XOR" },
        limitations: {
            $t: {
                UserProfileRef: {
                    version: "1.0",
                    id: "op:adult",
                }
            }
        }
    }
};

        case 4:
return {

};

        case 5:
return {

};

        default:
return {
    version: "",
    id: "",
    Name: {},
    Description: {},
    TypeOfFareStructureElementRef: {},
    GenericParameterAssignment: {}
};
    }
}


export const getFareTableRowList = (userPeriodTicket: PeriodTicket): {}[] =>
    userPeriodTicket.products.map(product => ({
        version: '1.0',
        id: `op:${product.productName}@${product.daysValid}day`,
        order: '2',
        Name: { $t: `${product.daysValid} day` },
        representing: {
            TimeIntervalRef: {
                version: '1.0',
                ref: `op:Tariff@${product.productName}@{product.daysValid}day`,
            },
        },
    }));
