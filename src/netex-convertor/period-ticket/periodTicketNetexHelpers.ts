import { Stop, UserPeriodTicket, OperatorData } from '../types';

export const getScheduledStopPointsList = (stops: Stop[]): {}[] =>
    stops.map((stop: Stop) => ({
        versionRef: 'EXTERNAL',
        ref: `naptStop:${stop.naptanCode}`,
        $t: `${stop.stopName}, ${stop.street}, ${stop.localityName}`,
    }));

export const getTopographicProjectionRefList = (stops: Stop[]): {}[] =>
    stops.map((stop: Stop) => ({
        versionRef: 'nptg:EXTERNAL',
        ref: `nptgLocality:${stop.localityCode}`,
        $t: `${stop.street}, ${stop.localityName}, ${stop.parentLocalityName}`,
    }));

export const getLinesList = (userPeriodTicket: UserPeriodTicket, operatorData: OperatorData): {}[] =>
    userPeriodTicket.selectedServices ? userPeriodTicket.selectedServices.map(service => ({
        version: '1.0',
        id: `op:${service.lineName}`,
        Name: { $t: `Line ${service.lineName}` },
        Description: { $t: service.description },
        Url: { $t: operatorData.website },
        PublicCode: { $t: service.lineName },
        PrivateCode: { type: 'noc', $t: `${userPeriodTicket.nocCode}_${service.lineName}` },
        OperatorRef: { version: '1.0', ref: `noc:${userPeriodTicket.nocCode}` },
        LineType: { $t: 'local' },
    })) : [];

export const getLineRefList = (userPeriodTicket: UserPeriodTicket): {}[] =>
    userPeriodTicket.selectedServices ? userPeriodTicket.selectedServices.map(service => ({
        version: '1.0',
        ref: `op:${service.lineName}`})) : [];
