import { Stop } from '../types';

export const getScheduledStopPointsList = (stops: Stop[]): {}[] => stops.map((stop: Stop) => ({
    versionRef: 'EXTERNAL',
    ref: `naptStop:${stop.naptanCode}`,
    $t: `${stop.stopName}, ${stop.street}, ${stop.localityName}`
}));

export const getTopographicProjectionRefList = (stops: Stop[]): {}[] => stops.map((stop: Stop) => ({
    versionRef: 'nptg:EXTERNAL',
    ref: `nptgLocality:${stop.localityCode}`,
    $t: `${stop.street}, ${stop.localityName}, ${stop.parentLocalityName}`
}))