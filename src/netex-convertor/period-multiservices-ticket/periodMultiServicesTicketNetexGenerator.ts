import { OperatorData, MultipleServicesPeriodPass, ServiceData } from '../types';
import { NetexObject, getCleanWebsite, getNetexTemplateAsJson, convertJsonToXml } from '../sharedHelpers';

const periodMultiServicesTicketNetexGenerator = (
    multipleServicesData: MultipleServicesPeriodPass,
    operatorData: OperatorData,
): { generate: Function } => {
    const opIdNocFormat = `noc:${operatorData.opId}`;
    const nocCodeNocFormat = `noc:${multipleServicesData.nocCode}`;
    const periodProductNameOpFormat = `op:Pass@${multipleServicesData.productName}`;
    const currentDate = new Date(Date.now());
    const website = getCleanWebsite(operatorData.website);

    const updatePublicationTimeStamp = (publicationTimeStamp: NetexObject): NetexObject => {
        const publicationTimeStampToUpdate = { ...publicationTimeStamp };
        publicationTimeStampToUpdate.PublicationTimestamp.$t = currentDate;

        return publicationTimeStampToUpdate;
    };

    const updatePublicationRequest = (publicationRequest: NetexObject): NetexObject => {
        const publicationRequestToUpdate = { ...publicationRequest };
        publicationRequestToUpdate.RequestTimestamp.$t = currentDate;
        publicationRequestToUpdate.Description.$t = `Request for ${multipleServicesData.nocCode} bus pass fares`;
        publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.OperatorRef.ref = nocCodeNocFormat;
        publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.OperatorRef.$t = opIdNocFormat;
        publicationRequestToUpdate.topics.NetworkFrameTopic.NetworkFilterByValue.objectReferences.PreassignedFareProductRef.ref = periodProductNameOpFormat;

        return publicationRequestToUpdate;
    };

    const updateCompositeFrame = (compositeFrame: NetexObject): NetexObject => {
        const compositeFrameToUpdate = { ...compositeFrame };
        compositeFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:CompositeFrame_UK_PI_NETWORK_FARE_OFFER:Pass@${multipleServicesData.productName}:op`;
        compositeFrameToUpdate.Name.$t = `Fares for ${multipleServicesData.operatorName} - ${multipleServicesData.productName}`;
        compositeFrameToUpdate.Description.$t = `${multipleServicesData.operatorName} - ${multipleServicesData.productName} is accessible under a period pass. A price is given for multiple services.`;

        return compositeFrameToUpdate;
    };

    const updateResourceFrame = (resourceFrame: NetexObject): NetexObject => {
        const resourceFrameToUpdate = { ...resourceFrame };

        resourceFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:ResourceFrame_UK_PI_COMMON:${multipleServicesData.nocCode}:op`;
        resourceFrameToUpdate.codespaces.Codespace.XmlnsUrl.$t = website;
        resourceFrameToUpdate.dataSources.DataSource.Email.$t = operatorData.ttrteEnq;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[0].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.ref = nocCodeNocFormat;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[0].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.$t =
            operatorData.operatorPublicName;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[1].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.ref = nocCodeNocFormat;
        resourceFrameToUpdate.responsibilitySets.ResponsibilitySet[1].roles.ResponsibilityRoleAssignment.ResponsibleOrganisationRef.$t =
            operatorData.operatorPublicName;
        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.id = `op:${multipleServicesData.operatorName}@brand`;
        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.Name.$t = operatorData.operatorPublicName;
        resourceFrameToUpdate.typesOfValue.ValueSet[0].values.Branding.Url.$t = website;
        resourceFrameToUpdate.organisations.Operator.id = nocCodeNocFormat;
        resourceFrameToUpdate.organisations.Operator.PublicCode.$t = multipleServicesData.nocCode;
        resourceFrameToUpdate.organisations.Operator.Name.$t = operatorData.operatorPublicName;
        resourceFrameToUpdate.organisations.Operator.ShortName.$t = multipleServicesData.operatorName;
        resourceFrameToUpdate.organisations.Operator.TradingName.$t = operatorData.vosaPsvLicenseName; // eslint-disable-line @typescript-eslint/camelcase
        resourceFrameToUpdate.organisations.Operator.ContactDetails.Phone.$t = operatorData.fareEnq;
        resourceFrameToUpdate.organisations.Operator.ContactDetails.Url.$t = website;
        resourceFrameToUpdate.organisations.Operator.Address.Street.$t = operatorData.complEnq;
        resourceFrameToUpdate.organisations.Operator.PrimaryMode.$t = operatorData.mode.toLowerCase();

        return resourceFrameToUpdate;
    };

    const updateSiteFrame = (siteFrame: NetexObject): NetexObject => {
        const siteFrameToUpdate = { ...siteFrame };

        siteFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:SiteFrame_UK_PI_STOP:sale_pois:op`;
        siteFrameToUpdate.Name.$t = `Common site elements for ${multipleServicesData.nocCode}: Travel Shops`;

        return siteFrameToUpdate;
    };

    const updateServiceCalendarFrame = (serviceCalendarFrame: NetexObject): NetexObject => {
        const serviceCalendarFrameToUpdate = { ...serviceCalendarFrame };

        serviceCalendarFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:ServiceCalendarFrame_UK_PI_CALENDAR:sale_pois:op`;

        return serviceCalendarFrameToUpdate;
    };

    const updateServiceFrame = (serviceFrame: NetexObject): NetexObject => {
        const serviceFrameToUpdate = { ...serviceFrame };
        serviceFrameToUpdate.id = `epd:UK:${matchingData.nocCode}:ServiceFrame_UK_PI_NETWORK:${lineIdName}:op`;
        serviceFrameToUpdate.lines.Line.id = matchingData.lineName;
        serviceFrameToUpdate.lines.Line.Name.$t = operatorPublicNameLineNameFormat;
        serviceFrameToUpdate.lines.Line.Description.$t = serviceData.description;
        serviceFrameToUpdate.lines.Line.PublicCode.$t = matchingData.lineName;
        serviceFrameToUpdate.lines.Line.PrivateCode.$t = noccodeLineNameFormat;
        serviceFrameToUpdate.lines.Line.OperatorRef.ref = nocCodeNocFormat;
        serviceFrameToUpdate.lines.Line.OperatorRef.$t = opIdNocFormat;
        serviceFrameToUpdate.scheduledStopPoints.ScheduledStopPoint = getScheduledStopPointsList(
            matchingData.fareZones,
        );

        return serviceFrameToUpdate;
    };

    const updateNetworkFareFrame = (networkFareFrame: NetexObject): NetexObject => {
        const networkFareFrameToUpdate = { ...networkFareFrame };

        networkFareFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:FareFrame_UK_PI_FARE_NETWORK:${multipleServicesData.productName}@pass:op`;
        networkFareFrameToUpdate.Name.$t = `${multipleServicesData.productName} Network`;
        networkFareFrameToUpdate.prerequisites.ResourceFrameRef.ref = `epd:UK:${multipleServicesData.nocCode}:ResourceFrame_UK_PI_COMMON:${multipleServicesData.nocCode}:op`;

        return networkFareFrameToUpdate;
    };

    const updatePriceFareFrame = (priceFareFrame: NetexObject): NetexObject => {
        const priceFareFrameToUpdate = { ...priceFareFrame };

        priceFareFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:FareFrame_UK_PI_FARE_PRODUCT:${multipleServicesData.productName}@pass:op`;
        priceFareFrameToUpdate.prerequisites.FareFrameRef.ref = `epd:UK:${multipleServicesData.nocCode}:FareFrame_UK_PI_FARE_NETWORK:${multipleServicesData.productName}@pass:op`;
        priceFareFrameToUpdate.tariffs.Tariff.id = `op:Tariff@${multipleServicesData.productName}`;
        priceFareFrameToUpdate.tariffs.Tariff.validityConditions = {
            ValidBetween: {
                FromDate: { $t: currentDate.toISOString() },
                ToDate: { $t: new Date(currentDate.setFullYear(currentDate.getFullYear() + 99)).toISOString() },
            },
        };
        priceFareFrameToUpdate.tariffs.Tariff.Name.$t = `${multipleServicesData.productName} - Tariff`;
        priceFareFrameToUpdate.tariffs.Tariff.Description.$t = `${multipleServicesData.productName} single zone tariff`;
        priceFareFrameToUpdate.tariffs.Tariff.OperatorRef.ref = nocCodeNocFormat;
        priceFareFrameToUpdate.tariffs.Tariff.OperatorRef.$t = opIdNocFormat;
        priceFareFrameToUpdate.tariffs.Tariff.geographicalIntervals.GeographicalInterval.id = `op:Tariff@${multipleServicesData.productName}@1zone`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[0].id = `op:Tariff@${multipleServicesData.productName}@1day`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[1].id = `op:Tariff@${multipleServicesData.productName}@1week`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[2].id = `op:Tariff@${multipleServicesData.productName}@4week`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[3].id = `op:Tariff@${multipleServicesData.productName}@1year`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[4].id = `op:Tariff@${multipleServicesData.productName}@1term`;
        priceFareFrameToUpdate.tariffs.Tariff.timeIntervals.TimeInterval[5].id = `op:Tariff@${multipleServicesData.productName}@1academic_year`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[0].id = `op:Tariff@${multipleServicesData.productName}@access_zones`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[0].GenericParameterAssignment.id = `op:Tariff@${multipleServicesData.productName}@access_zones`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[0].GenericParameterAssignment.validityParameters.FareZoneRef.ref = `op:${multipleServicesData.productName}@${multipleServicesData.productName}`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[1].id = `op:Tariff@${multipleServicesData.productName}@eligibility`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[1].GenericParameterAssignment.id = `op:Tariff@${multipleServicesData.productName}@eligibitity`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].id = `op:Tariff@${multipleServicesData.productName}@durations@adult`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].timeIntervals.TimeIntervalRef[0].ref = `op:Tariff@${multipleServicesData.productName}@1day`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].timeIntervals.TimeIntervalRef[1].ref = `op:Tariff@${multipleServicesData.productName}@1week`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].timeIntervals.TimeIntervalRef[2].ref = `op:Tariff@${multipleServicesData.productName}@4week`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].timeIntervals.TimeIntervalRef[3].ref = `op:Tariff@${multipleServicesData.productName}@1year`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[2].GenericParameterAssignment.id = `op:Tariff@${multipleServicesData.productName}@adult_or_child`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[3].id = `op:Tariff@${multipleServicesData.productName}@durations@adult_cash`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[3].timeIntervals.TimeIntervalRef[0].ref = `op:Tariff@${multipleServicesData.productName}@1day`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[3].timeIntervals.TimeIntervalRef[1].ref = `op:Tariff@${multipleServicesData.productName}@1week`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[3].GenericParameterAssignment.id = `op:Pass@${multipleServicesData.productName}@duration@1D_1W`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[4].id = `op:Tariff@${multipleServicesData.productName}@conditions_of_travel`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[4].GenericParameterAssignment.id = `op:Tariff@${multipleServicesData.productName}@conditions_of_travel`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[4].GenericParameterAssignment.limitations.Transferability.id = `op:Pass@${multipleServicesData.productName}@transferability`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[4].GenericParameterAssignment.limitations.FrequencyOfUse.id = `op:Pass@${multipleServicesData.productName}@frequency`;
        priceFareFrameToUpdate.tariffs.Tariff.fareStructureElements.FareStructureElement[4].GenericParameterAssignment.limitations.Interchanging.id = `op:Pass@${multipleServicesData.productName}@interchanging`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.id = `op:Pass@${multipleServicesData.productName}`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.Name.$t = `${multipleServicesData.productName} Pass`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.OperatorRef.ref = nocCodeNocFormat;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.OperatorRef.$t = opIdNocFormat;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.id = `op:Pass@${multipleServicesData.productName}@travel`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.fareStructureElements.FareStructureElementRef[0].ref = `op:Tariff@${multipleServicesData.productName}@access_zones`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.fareStructureElements.FareStructureElementRef[1].ref = `op:Tariff@${multipleServicesData.productName}@eligibility`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.fareStructureElements.FareStructureElementRef[2].ref = `op:Tariff@${multipleServicesData.productName}@durations@adult`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.fareStructureElements.FareStructureElementRef[3].ref = `op:Tariff@${multipleServicesData.productName}@durations@adult_cash`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.validableElements.ValidableElement.fareStructureElements.FareStructureElementRef[4].ref = `op:Tariff@${multipleServicesData.productName}@conditions_of_travel`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.accessRightsInProduct.AccessRightInProduct.id = `op:Pass@${multipleServicesData.productName}@travel`;
        priceFareFrameToUpdate.fareProducts.PreassignedFareProduct.accessRightsInProduct.AccessRightInProduct.ValidableElementRef.ref = `op:Pass@${multipleServicesData.productName}@travel`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].id = `op:Pass@${multipleServicesData.productName}-SOP@p-ticket`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].BrandingRef.ref = `op:${multipleServicesData.operatorName}@brand`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].Name.$t = `${multipleServicesData.productName} - paper ticket`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].distributionAssignments.DistributionAssignment[0].id = `op:Pass@${multipleServicesData.productName}-GSOP@p-ticket@on_board`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].distributionAssignments.DistributionAssignment[1].id = `op:Pass@${multipleServicesData.productName}-GSOP@p-ticket@travel_shop`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].salesOfferPackageElements.SalesOfferPackageElement.id = `op:Pass@${multipleServicesData.productName}-SOP@p-ticket`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[0].salesOfferPackageElements.SalesOfferPackageElement.PreassignedFareProductRef.ref = `op:Pass@${multipleServicesData.productName}`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].id = `op:Pass@${multipleServicesData.productName}-SOP@m-ticket`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].BrandingRef.ref = `op:${multipleServicesData.operatorName}@brand`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].Name.$t = `${multipleServicesData.productName} - mobile app`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].distributionAssignments.DistributionAssignment.id = `op:Pass@${multipleServicesData.productName}-GSOP@m-ticket@mobile_app`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].salesOfferPackageElements.SalesOfferPackageElement.id = `op:Pass@${multipleServicesData.productName}Pass-SOP@m-ticket`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[1].salesOfferPackageElements.SalesOfferPackageElement.PreassignedFareProductRef.ref = `op:Pass@${multipleServicesData.productName}`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].id = `op:Pass@${multipleServicesData.productName}-SOP@subscription`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].Name.$t = `${operatorData.operatorPublicName} Unlimited`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].validityParameterAssignments.GenericParameterAssignment.id = `op:Pass@${multipleServicesData.productName}-SOP@subscription@subscribing`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].validityParameterAssignments.GenericParameterAssignment.limitations.Subscribing.id = `op:Pass@${multipleServicesData.productName}-SOP@subscription@subscribing`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].validityParameterAssignments.GenericParameterAssignment.limitations.Subscribing.possibleInstallmenttIntervals.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@4week`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].distributionAssignments.DistributionAssignment.id = `op:Pass@${multipleServicesData.productName}-GSOP@subscription@online`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].salesOfferPackageElements.SalesOfferPackageElement.id = `op:Pass@${multipleServicesData.productName}-SOP@subscription`;
        priceFareFrameToUpdate.salesOfferPackages.SalesOfferPackage[2].salesOfferPackageElements.SalesOfferPackageElement.PreassignedFareProductRef.ref = `op:Pass@${multipleServicesData.productName}`;

        return priceFareFrameToUpdate;
    };

    const updateFareTableFareFrame = (fareTableFareFrame: NetexObject): NetexObject => {
        const fareTableFareFrameToUpdate = { ...fareTableFareFrame };

        fareTableFareFrameToUpdate.id = `epd:UK:${multipleServicesData.nocCode}:FareFrame_UK_PI_FARE_PRICE:${multipleServicesData.productName}@pass:op`;
        fareTableFareFrameToUpdate.Name.$t = `${multipleServicesData.productName} Prices`;
        fareTableFareFrameToUpdate.prerequisites.FareFrameRef.ref = `epd:UK:${multipleServicesData.nocCode}:FareFrame_UK_PI_FARE_PRODUCT:${multipleServicesData.productName}@pass:op`;
        fareTableFareFrameToUpdate.PricingParameterSet.id = `op:Pass@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.id = `op:Pass@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.Name.$t = `${multipleServicesData.productName} Fares`;
        fareTableFareFrameToUpdate.fareTables.FareTable.pricesFor.PreassignedFareProductRef.ref = `op:Pass@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.usedIn.TariffRef.ref = `op:Tariff@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[0].id = `op:${multipleServicesData.productName}@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[0].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[1].id = `op:${multipleServicesData.productName}@1week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[1].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[2].id = `op:${multipleServicesData.productName}@4week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[2].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@4week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[3].id = `op:${multipleServicesData.productName}@4week-Unlimited`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[3].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@4week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[4].id = `op:${multipleServicesData.productName}@1year`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[4].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1year`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[5].id = `op:${multipleServicesData.productName}@1term`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[5].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1term`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[6].id = `op:${multipleServicesData.productName}@1academic_year`;
        fareTableFareFrameToUpdate.fareTables.FareTable.rows.FareTableRow[6].representing.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1academic_year`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.Name.$t = multipleServicesData.productName;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.specifics.TariffZoneRef.ref = `op:${multipleServicesData.productName}@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.columns.FareTableColumn.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.columns.FareTableColumn.Name.$t =
            multipleServicesData.productName;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.columns.FareTableColumn.representing.TariffZoneRef.ref = `op:${multipleServicesData.productName}@${multipleServicesData.productName}`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.Name.$t = `${multipleServicesData.productName} - Cash`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.pricesFor.SalesOfferPackageRef.ref = `op:Pass@${multipleServicesData.productName}-SOP@p-ticket`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.columns.FareTableColumn.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.Name.$t = `${multipleServicesData.productName} - Cash - Adult`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.columns.FareTableColumn.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[0].id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[0].TimeIntervalPrice.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[0].TimeIntervalPrice.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[0].ColumnRef.ref = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[0].RowRef.ref = `op:${multipleServicesData.productName}@1day`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[1].id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult@1week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[1].TimeIntervalPrice.id = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult@1week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[1].TimeIntervalPrice.TimeIntervalRef.ref = `op:Tariff@${multipleServicesData.productName}@1week`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[1].ColumnRef.ref = `op:${multipleServicesData.productName}@${multipleServicesData.productName}@p-ticket@adult`;
        fareTableFareFrameToUpdate.fareTables.FareTable.includes.FareTable.includes.FareTable.includes.FareTable.cells.Cell[1].RowRef.ref = `op:${multipleServicesData.productName}@1week`;

        return fareTableFareFrameToUpdate;
    };

    const generate = async (): Promise<string> => {
        const netexJson = await getNetexTemplateAsJson('periodMultiServicesTicketNetexTemplate.xml');

        netexJson.PublicationDelivery = updatePublicationTimeStamp(netexJson.PublicationDelivery);
        netexJson.PublicationDelivery.PublicationRequest = updatePublicationRequest(
            netexJson.PublicationDelivery.PublicationRequest,
        );
        netexJson.PublicationDelivery.dataObjects.CompositeFrame[0] = updateCompositeFrame(
            netexJson.PublicationDelivery.dataObjects.CompositeFrame[0],
        );

        const netexFrames = netexJson.PublicationDelivery.dataObjects.CompositeFrame[0].frames;
        netexFrames.SiteFrame = updateSiteFrame(netexFrames.SiteFrame);
        netexFrames.ResourceFrame = updateResourceFrame(netexFrames.ResourceFrame);
        netexFrames.ServiceCalendarFrame = updateServiceCalendarFrame(netexFrames.ServiceCalendarFrame);
        netexFrames.ServiceFrame = updateServiceFrame(netexFrames.ServiceFrame);

        // The first FareFrame is the NetworkFareFrame which relates to the FareZone given by the user on the csvZoneUpload page.
        netexFrames.FareFrame[0] = updateNetworkFareFrame(netexFrames.FareFrame[0]);

        // The second FareFrame is the ProductFareFrame which relates to the validity/name/price of the sales offer package
        netexFrames.FareFrame[1] = updatePriceFareFrame(netexFrames.FareFrame[1]);

        // The third FareFrame is the FareTableFareFrame which ties together each ParentFareZone/FareZone, with Prices, Validity, Media (TicketTypes) and UserTypes
        netexFrames.FareFrame[2] = updateFareTableFareFrame(netexFrames.FareFrame[2]);

        return convertJsonToXml(netexJson);
    };

    return { generate };
};

export default periodMultiServicesTicketNetexGenerator;
