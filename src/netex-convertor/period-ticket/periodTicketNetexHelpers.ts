import {
    Stop,
    OperatorData,
    PeriodTicket,
    MultipleServicesTicket,
    PeriodGeoZoneTicket,
    ScheduledStopPoint,
    TopographicProjectionRef,
    Line,
    LineRef,
    FareStructureElement,
} from '../types';
import { getCleanWebsite } from '../sharedHelpers';

const placeHolderGroupOfProductsName = "PLACEHOLDER";

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

export const getLinesList = (userPeriodTicket: MultipleServicesTicket, operatorData: OperatorData): Line[] =>
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

export const getLineRefList = (userPeriodTicket: MultipleServicesTicket): LineRef[] =>
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

export const getMultiServiceFareTable = (userPeriodTicket: MultipleServicesTicket): {}[] => {
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
            PreassignedFareProductRef: { version: '1.0', ref: `op:Pass@${placeHolderGroupOfProductsName}` },
        },
        usedIn: {
            TariffRef: { version: '1.0', ref: `op:Tariff@${product.productName}` },
        },
        rows: { FareTableRow: { version: '1.0',
            id: `op:${product.productName}@${product.daysValid}day`,
            order: '2',
            Name: { $t: `${product.daysValid} day` },
            representing: {
                TimeIntervalRef: {
                    version: '1.0',
                    ref: `op:Tariff@${product.productName}@${product.daysValid}day`,
                },
            }}}
    }));


export const getAvailabilityFareStructureElement = (): FareStructureElement => {
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
    }
}

export const getEligibilityFareStructureElement = (): FareStructureElement => {
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
}

export const getDurationFareStructureElement = (): {} => {
    return {
        version: "1.0",
        id: "",
        Name: { $t: "Available duration combination" },
        Description: { $t: "All periods allowed, 60 mins, but no evening - used in for some mticket, single zone." },
        TypeOfFareStructureElementRef: {
            version: "fxc:v1.0",
            ref: "fxc:durations"
        },
        timeIntervals: {
            TimeIntervalRef:
                [
                ]
        },
        GenericParameterAssignment: {
            id: "",
            version: "1.0",
            order: "1",
            Description: {
                $t: "Adult/Child Cash ticket Only available for 1 Day or 1week"
            },
            TypeOfAccessAssignmentRef: {
                $t: {
                    version: "fxc:v1.0",
                    ref: "fxc:eligible"
                }
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
}

export const getConditionsOfTravelFareStructureElement = (): {} => {
    return {
        id: "",
        version: "1.0",
        Name: { $t: "Conditions of travel" },
        GenericParameterAssignment: {
            version: "1.0",
            order: "1",
            id: "",
            TypeOfAccessRightAssignmentRef: {
                $t: {
                    version: "fxc:v1.0",
                    ref: "fxc:condition_of_use"
                }
            },
            LimitationGroupingType: { $t: "AND" },
            limitations: {
                Transferability: {
                    version: "1.0",
                    id: "",
                    Name: { $t: "Ticket is not transferable" },
                    CanTransfer: { $t: "false" }
                },
                FrequencyOfUse: {
                    version: "1.0",
                    id: "",
                    FrequencyOfUseType: { $t: "unlimited" }
                },
                Interchanging: {
                    version: "1.0",
                    id: "",
                    CanInterchange: { $t: "true" }
                }
            }
        }
    }
}

export const getSalesOfferPackageList = (userPeriodTicket: PeriodTicket): {}[] =>
    userPeriodTicket.products.map(product => ({
        version: '1.0',
        id: `op:Pass@${product.productName}-SOP@p-ticket`,
        BrandingRef : { version: '1.0', ref: `op:${userPeriodTicket.operatorName}@brand`},
        Name: {$t: `${placeHolderGroupOfProductsName} - paper ticket`},
        Description: { $t: 'Unlimited Travel in a given zone'},
        distributionAssignments: {
            DistributionAssignment: {
                version: '1.0', 
                id: `op:Pass@${product.productName}-GSOP@p-ticket@on_board`,
                order: '1',
                Name: { $t: 'Onboard'},
                Description: { $t: 'Pay for ticket onboard.'},
                DistributionChannelRef :{
                    version: 'fxc:v1.0',
                    ref: 'fxc:on_board'
                },
                DistributionChannelType: { $t: 'onBoard'},
                PaymentMethods: { $t: 'Cash ContactlessPaymentCard'},
                FulfilmentMethodRef: {
                    ref: 'fxc:collect_on_board',
                    version: 'fxc:v1.0'
                }
            },
            salesOfferPackageElements: {
                SalesOfferPackageElement: {
                    version: '1.0',
                    id: `op:Pass@${product.productName}-SOP@p-ticket`,
                    order: '3',
                    TypeOfTravelDocumentRef: {
                        versions: '1.0',
                        ref: 'op:p-ticket'
                    },
                    PreassignedFareProductRef: {
                        version: '1.0',
                        ref: `op:Pass@${product.productName}`
                    },
                }
            }
        }
    }));

export const getPreassignedFareProduct = (): {} => {
    return {
        version: "1.0",
        id: "",
        Name: {
            $t: ""
        },
        ChargingMomentType: {
            $t: "beforeTravel"
        },
        typesOfFareProduct: {
            TypeOfFareProductRef: {
                version: "fxc:v1.0",
                ref: "fxc:standard_product@pass@period"
            }
        },
        OperatorRef: {
            version: "1.0",
            ref: "",
            $t: ""
        },
        validableElements: {
            ValidableElement: {
                version: "1.0",
                id: "",
                Name: {
                    $t: "Unlimited rides available for specified durations"
                },
                fareStructureElements: [
                    {
                        FareStructureElementRef: {
                            version: "1.0",
                            ref: ""
                        }
                    },
                    {
                        FareStructureElementRef: {
                            version: "1.0",
                            ref: ""
                        }
                    },
                    {
                        FareStructureElementRef: {
                            version: "1.0",
                            ref: ""
                        }
                    },
                    {
                        FareStructureElementRef: {
                            version: "1.0",
                            ref: ""
                        }
                    }
                ]
            }
        },
        accessRightsInProduct: {
            AccessRightInProduct: {
                version: "1.0",
                id: "",
                order: "1",
                ValidableElementRef: {
                    version: "1.0",
                    ref: ""
                }
            }
        },
        ProductType: {
            $t: "periodPass"
        }
    }
}
