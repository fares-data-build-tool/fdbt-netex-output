import {
    getCoreData,
    NetexObject,
    getNetexTemplateAsJson,
    convertJsonToXml,
    getTimeRestrictions,
    getNetexMode,
} from './sharedHelpers';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Operator, MultiOperatorGeoZoneTicket } from '../types/index';

import {
    getScheduledStopPointsList,
    getTopographicProjectionRefList,
    getLinesList,
    getGeoZoneFareTable,
    getMultiServiceFareTable,
    getPreassignedFareProducts,
    getSalesOfferPackageList,
    getTimeIntervals,
    getFareStructuresElements,
    isMultiServiceTicket,
    isGeoZoneTicket,
    getOrganisations,
    getGroupOfOperators,
    isBaseSchemeOperatorInfo,
} from './period-tickets/periodTicketNetexHelpers';

const netexGenerator = (
    // userPeriodTicket: PeriodTicket | SchemeOperatorTicket,
    ticket: any,
    operatorData: Operator[],
): { generate: Function } => {
    const coreData = getCoreData(operatorData, ticket);
    const baseOperatorInfo = coreData.baseOperatorInfo[0];

    const updatePublicationTimeStamp = (publicationTimeStamp: NetexObject): NetexObject => {
        const publicationTimeStampToUpdate = { ...publicationTimeStamp };
        publicationTimeStampToUpdate.PublicationTimestamp.$t = coreData.currentDate;

        return publicationTimeStampToUpdate;
    };

    const updatePublicationRequest = (publicationRequest: NetexObject): NetexObject => {
        // get the pub request
        const publicationRequestToUpdate = { ...publicationRequest };
        // update the things that are always there
        publicationRequestToUpdate.RequestTimestamp.$t = coreData.currentDate;
        publicationRequestToUpdate.Description.$t = `Request for ${
            coreData.types.isPointToPoint ? `${ticket.nocCode} ${coreData.lineIdName}` : coreData.operatorIdentifier
        } bus pass fares`;
        publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.BrandingRef = {
            version: '1.0',
            ref: coreData.brandingId,
        };
        // update point to point only
        if (coreData.types.isPointToPoint) {
            publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.LineRef.ref =
                coreData.lineName;
        } else {
            // update period only
            publicationRequestToUpdate.topics.NetworkFrameTopic.TypeOfFrameRef.ref = `fxc:UK:DFT:TypeOfFrame_UK_PI_${
                coreData.types.isGeoZone ? 'NETWORK' : 'LINE'
            }_FARE_OFFER:FXCP`;

            publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.PreassignedFareProductRef = ticket.products.map(
                (product: { productName: any }) => ({
                    version: '1.0',
                    ref: `op:Pass@${product.productName}_${ticket.passengerType}`,
                }),
            );
            // check if multiOperator and delete as required
            if (coreData.types.isMultiOperator) {
                publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.GroupOfOperatorsRef = {
                    version: '1.0',
                    ref: 'operators@bus',
                };
                delete publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences
                    .OperatorRef;
            } else {
                publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.OperatorRef.ref =
                    coreData.nocCodeFormat;
                publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.OperatorRef.$t =
                    coreData.opIdNocFormat;
                delete publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences
                    .GroupOfOperatorsRef;
            }
        }

        return publicationRequestToUpdate;
    };

    const updateCompositeFrame = (compositeFrame: NetexObject): NetexObject => {
        const compositeFrameToUpdate = { ...compositeFrame };
        const { nocCode } = baseOperatorInfo as Operator;
        const { lineIdName } = coreData;
        const { ticketType } = coreData.types;
        if (coreData.types.isPointToPoint) {
            compositeFrameToUpdate.id = `epd:UK:${nocCode}:CompositeFrame_UK_PI_LINE_FARE_OFFER:Trip@${coreData.lineIdName}:op`;
            compositeFrameToUpdate.Name.$t = `Fares for ${lineIdName}`;
            compositeFrameToUpdate.Description.$t = `${nocCode} ${lineIdName} is accessible as a ${ticketType} trip fare.  Prices are given zone to zone, where each zone is a linear group of stops, i.e. fare stage.`;
        } else {
            const operatorName = coreData.types.isSchemeOperator ? ticket.schemeOperatorName : ticket.operatorName;
            compositeFrameToUpdate.id = `epd:UK:${coreData.operatorIdentifier}:CompositeFrame_UK_PI_${
                coreData.types.isGeoZone ? 'NETWORK' : 'LINE'
            }_FARE_OFFER:Pass@${coreData.placeholderGroupOfProductsName}:op`;
            compositeFrameToUpdate.Name.$t = `Fares for ${operatorName}`;
            compositeFrameToUpdate.Description.$t = `Period ticket for ${operatorName}`;
        }

        return compositeFrameToUpdate;
    };

    const updateResourceFrame = (resourceFrame: NetexObject): NetexObject => {
        const resourceFrameToUpdate = { ...resourceFrame };

        resourceFrameToUpdate.id = `epd:UK:${coreData.operatorIdentifier}:ResourceFrame_UK_PI_COMMON${`:${
            !coreData.types.isPointToPoint ? `${coreData.operatorIdentifier}:` : ''
        }`}op`;
        resourceFrameToUpdate.codespaces.Codespace.XmlnsUrl.$t = coreData.website;
        resourceFrameToUpdate.dataSources.DataSource.Email.$t = baseOperatorInfo.ttrteEnq;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[0].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.ref =
            coreData.nocCodeFormat;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[0].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.$t =
            coreData.operatorName;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[1].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.ref =
            coreData.nocCodeFormat;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[1].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.$t =
            coreData.operatorName;

        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.id = coreData.brandingId;
        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.Name.$t = coreData.operatorName;
        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.Url.$t = coreData.website;

        if (
            coreData.types.isMultiOperator &&
            (coreData.types.isMultiOperatorGeoZoneTicket || coreData.types.isSchemeOperator)
        ) {
            const nocs = [...ticket.additionalNocs];
            if (coreData.types.isGeoZone) {
                nocs.push((ticket as MultiOperatorGeoZoneTicket).nocCode);
                resourceFrameToUpdate.organisations.Operator = getOrganisations(operatorData);
            } else if (isBaseSchemeOperatorInfo(baseOperatorInfo) && coreData.types.isSchemeOperator) {
                resourceFrameToUpdate.organisations.Operator = getOrganisations(operatorData, baseOperatorInfo);
            }
            resourceFrameToUpdate.groupsOfOperators = getGroupOfOperators(operatorData);
        } else if (coreData.types.isMultiOperator && coreData.types.isMultiOperatorMultiServices) {
            const nocs: string[] = ticket.additionalOperators.map(
                (additionalOperator: { nocCode: any }) => additionalOperator.nocCode,
            );
            nocs.push(ticket.nocCode);
            resourceFrameToUpdate.organisations.Operator = getOrganisations(operatorData);
            resourceFrameToUpdate.groupsOfOperators = getGroupOfOperators(operatorData);
        } else if (
            !coreData.types.isMultiOperator &&
            !coreData.types.isSchemeOperator &&
            !coreData.types.isMultiOperatorMultiServices
        ) {
            resourceFrameToUpdate.organisations.Operator.id = coreData.nocCodeFormat;
            resourceFrameToUpdate.organisations.Operator.PublicCode.$t = coreData.operatorIdentifier;
            resourceFrameToUpdate.organisations.Operator.Name.$t = coreData.operatorName;
            resourceFrameToUpdate.organisations.Operator.ShortName.$t = coreData.operatorName;
            resourceFrameToUpdate.organisations.Operator.TradingName.$t = baseOperatorInfo.vosaPsvLicenseName;
            resourceFrameToUpdate.organisations.Operator.ContactDetails.Phone.$t = baseOperatorInfo.fareEnq;
            resourceFrameToUpdate.organisations.Operator.ContactDetails.Url.$t = coreData.website;
            resourceFrameToUpdate.organisations.Operator.Address.Street.$t = baseOperatorInfo.complEnq;
            resourceFrameToUpdate.organisations.Operator.PrimaryMode.$t = getNetexMode(baseOperatorInfo.mode);
        }

        return resourceFrameToUpdate;
    };

    const updateServiceFrame = (serviceFrame: NetexObject): NetexObject | null => {
        if (isMultiServiceTicket(ticket)) {
            const serviceFrameToUpdate = { ...serviceFrame };
            serviceFrameToUpdate.id = `epd:UK:${ticket.nocCode}:ServiceFrame_UK_PI_NETWORK:${coreData.placeholderGroupOfProductsName}:op`;

            serviceFrameToUpdate.lines.Line = getLinesList(ticket, coreData.website, operatorData);

            return serviceFrameToUpdate;
        }

        return null;
    };

    const updateNetworkFareFrame = (networkFareFrame: NetexObject): NetexObject | null => {
        if (isGeoZoneTicket(ticket)) {
            const networkFareFrameToUpdate = { ...networkFareFrame };

            networkFareFrameToUpdate.id = `epd:UK:${coreData.operatorIdentifier}:FareFrame_UK_PI_FARE_NETWORK:${coreData.placeholderGroupOfProductsName}@pass:op`;
            networkFareFrameToUpdate.Name.$t = `${coreData.placeholderGroupOfProductsName} Network`;
            networkFareFrameToUpdate.prerequisites.ResourceFrameRef.ref = `epd:UK:${coreData.operatorIdentifier}:ResourceFrame_UK_PI_COMMON:${coreData.operatorIdentifier}:op`;

            networkFareFrameToUpdate.fareZones.FareZone.id = `op:${coreData.placeholderGroupOfProductsName}@${ticket.zoneName}`;
            networkFareFrameToUpdate.fareZones.FareZone.Name.$t = `${ticket.zoneName}`;
            networkFareFrameToUpdate.fareZones.FareZone.Description.$t = `${ticket.zoneName} ${coreData.placeholderGroupOfProductsName} Zone`;
            networkFareFrameToUpdate.fareZones.FareZone.members.ScheduledStopPointRef = getScheduledStopPointsList(
                ticket.stops,
            );
            networkFareFrameToUpdate.fareZones.FareZone.projections.TopographicProjectionRef = getTopographicProjectionRefList(
                ticket.stops,
            );

            return networkFareFrameToUpdate;
        }

        return null;
    };

    const updatePriceFareFrame = (priceFareFrame: NetexObject): NetexObject => {
        const priceFareFrameToUpdate = { ...priceFareFrame };

        priceFareFrameToUpdate.id = `epd:UK:${coreData.operatorIdentifier}:FareFrame_UK_PI_FARE_PRODUCT:${coreData.placeholderGroupOfProductsName}@pass:op`;

        if (isGeoZoneTicket(ticket)) {
            priceFareFrameToUpdate.prerequisites.FareFrameRef.ref = `epd:UK:${coreData.operatorIdentifier}:FareFrame_UK_PI_FARE_NETWORK:${coreData.placeholderGroupOfProductsName}@pass:op`;
        } else if (isMultiServiceTicket(ticket)) {
            priceFareFrameToUpdate.prerequisites = null;
        }
        priceFareFrameToUpdate.tariffs.Tariff.id = `op:Tariff@${coreData.placeholderGroupOfProductsName}`;
        let validityCondition;
        if (isMultiServiceTicket(ticket) && ticket.termTime === true) {
            validityCondition = {
                id: 'op:termtime',
                version: '1.0',
                Name: {
                    $t: 'Term Time Usage Only',
                },
            };
        }
        priceFareFrameToUpdate.tariffs.Tariff.validityConditions = {
            ValidBetween: {
                FromDate: { $t: ticket.ticketPeriod.startDate },
                ToDate: { $t: ticket.ticketPeriod.endDate },
            },
            ValidityCondition: validityCondition,
        };
        priceFareFrameToUpdate.tariffs.Tariff.Name.$t = `${coreData.placeholderGroupOfProductsName} - Tariff`;
        priceFareFrameToUpdate.tariffs.Tariff.Description.$t = `${coreData.placeholderGroupOfProductsName} single zone tariff`;

        if (ticket.type === 'multiOperator') {
            priceFareFrameToUpdate.tariffs.Tariff.GroupOfOperatorsRef = {
                version: '1.0',
                ref: 'operators@bus',
            };
            delete priceFareFrameToUpdate.tariffs.Tariff.OperatorRef;
        } else {
            priceFareFrameToUpdate.tariffs.Tariff.OperatorRef.ref = coreData.nocCodeFormat;
            priceFareFrameToUpdate.tariffs.Tariff.OperatorRef.$t = coreData.opIdNocFormat;
            delete priceFareFrameToUpdate.tariffs.Tariff.GroupOfOperatorsRef;
        }

        // Time intervals
        if (isGeoZoneTicket(ticket) || (isMultiServiceTicket(ticket) && ticket.products[0].productDuration)) {
            priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval = getTimeIntervals(ticket);
        } else {
            priceFareFrameToUpdate.tariffs.Tariff.timeIntervals = null;
        }

        if (ticket.timeRestriction && ticket.timeRestriction.length > 0) {
            priceFareFrameToUpdate.tariffs.Tariff.qualityStructureFactors = getTimeRestrictions(ticket.timeRestriction);
        }

        // Fare structure elements
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement = getFareStructuresElements(
            ticket,
            coreData.placeholderGroupOfProductsName,
        );

        // Preassigned Fare Product
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct = getPreassignedFareProducts(
            ticket,
            coreData.nocCodeFormat,
            coreData.opIdNocFormat,
        );

        // Sales Offer Packages
        const salesOfferPackages = getSalesOfferPackageList(ticket, coreData.ticketUserConcat);
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage = salesOfferPackages.flat();

        return priceFareFrameToUpdate;
    };

    const updateFareTableFareFrame = (fareTableFareFrame: NetexObject): NetexObject => {
        const fareTableFareFrameToUpdate = { ...fareTableFareFrame };

        fareTableFareFrameToUpdate.id = `epd:UK:${coreData.operatorIdentifier}:FareFrame_UK_PI_FARE_PRICE:${coreData.placeholderGroupOfProductsName}@pass:op`;
        fareTableFareFrameToUpdate.Name.$t = `${coreData.placeholderGroupOfProductsName} Prices`;
        fareTableFareFrameToUpdate.prerequisites.FareFrameRef.ref = `epd:UK:${coreData.operatorIdentifier}:FareFrame_UK_PI_FARE_PRODUCT:${coreData.placeholderGroupOfProductsName}@pass:op`;

        if (isGeoZoneTicket(ticket)) {
            fareTableFareFrameToUpdate.fareTables.FareTable = getGeoZoneFareTable(
                ticket,
                coreData.placeholderGroupOfProductsName,
                coreData.ticketUserConcat,
            );
        } else if (isMultiServiceTicket(ticket)) {
            fareTableFareFrameToUpdate.fareTables.FareTable = getMultiServiceFareTable(
                ticket,
                coreData.ticketUserConcat,
            );
        }
        return fareTableFareFrameToUpdate;
    };

    const generate = async (): Promise<string> => {
        // if period
        const netexJson: NetexObject = await getNetexTemplateAsJson('period-tickets/periodTicketNetexTemplate.xml');

        // else

        // const netexJson: NetexObject = await getNetexTemplateAsJson(
        //     'point-to-point-tickets/pointToPointTicketNetexTemplate.xml',
        // );

        netexJson.PublicationDelivery = updatePublicationTimeStamp(netexJson.PublicationDelivery);
        netexJson.PublicationDelivery.PublicationRequest = updatePublicationRequest(
            netexJson.PublicationDelivery.PublicationRequest,
        );
        netexJson.PublicationDelivery.dataObjects.CompositeFrame[0] = updateCompositeFrame(
            netexJson.PublicationDelivery.dataObjects.CompositeFrame[0],
        );

        const netexFrames = netexJson.PublicationDelivery.dataObjects.CompositeFrame[0].frames;
        netexFrames.ResourceFrame = updateResourceFrame(netexFrames.ResourceFrame);

        netexFrames.ServiceFrame = updateServiceFrame(netexFrames.ServiceFrame);

        // Multi Service does not need a Network Frame
        if (isGeoZoneTicket(ticket)) {
            netexFrames.FareFrame = [
                updateNetworkFareFrame(netexFrames.FareFrame[0]),
                updatePriceFareFrame(netexFrames.FareFrame[1]),
                updateFareTableFareFrame(netexFrames.FareFrame[2]),
            ];
        } else if (isMultiServiceTicket(ticket)) {
            netexFrames.FareFrame = [
                updatePriceFareFrame(netexFrames.FareFrame[1]),
                updateFareTableFareFrame(netexFrames.FareFrame[2]),
            ];
        }

        return convertJsonToXml(netexJson);
    };

    return { generate };
};

export default netexGenerator;
