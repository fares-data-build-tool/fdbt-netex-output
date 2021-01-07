import { S3Event } from 'aws-lambda';
import libxslt from 'libxslt';
import {
    isMultiOperatorMultipleServicesTicket,
    PointToPointTicket,
    PeriodTicket,
    isMultiOperatorGeoZoneTicket,
    isSchemeOperatorTicket,
    SchemeOperatorTicket,
    Ticket,
} from '../types/index';
import * as db from '../data/auroradb';
import * as s3 from '../data/s3';
import netexGenerator from './netexGenerator';

const isPointToPointTicket = (ticket: Ticket): ticket is PointToPointTicket =>
    ticket.type === 'single' || ticket.type === 'return';

const isPeriodTicket = (ticket: Ticket): ticket is PeriodTicket =>
    ticket.type === 'period' || ticket.type === 'flatFare' || ticket.type === 'multiOperator';

const xsl = `
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:output omit-xml-declaration="yes" indent="yes"/>
        <xsl:strip-space elements="*"/>

        <xsl:template match="node()|@*">
            <xsl:copy>
                <xsl:apply-templates select="node()|@*"/>
            </xsl:copy>
        </xsl:template>

        <xsl:template match="@id">
            <xsl:attribute name="id">
                <xsl:value-of select="translate(., ' ', '_')"/>
            </xsl:attribute>
        </xsl:template>

        <xsl:template match="@ref">
            <xsl:attribute name="ref">
                <xsl:value-of select="translate(., ' ', '_')"/>
            </xsl:attribute>
        </xsl:template>

        <xsl:template match="*[not(@*|*|comment()|processing-instruction()) and normalize-space()='']"/>
    </xsl:stylesheet>
`;

const uploadToS3 = async (netex: string, fileName: string): Promise<void> => {
    if (process.env.NODE_ENV !== 'test') {
        const parsedXsl = libxslt.parse(xsl);
        const transformedNetex = parsedXsl.apply(netex);

        await s3.uploadNetexToS3(transformedNetex, fileName);
    } else {
        await s3.uploadNetexToS3(netex, fileName);
    }
};

export const generateFileName = (eventFileName: string): string => eventFileName.replace('.json', '.xml');

export const buildNocList = (ticket: PointToPointTicket | PeriodTicket | SchemeOperatorTicket): string[] => {
    const nocs: string[] = [];

    // if (isPointToPointTicket(ticket)) {
    //     nocs.push(ticket.nocCode);
    // } else if (isPeriodTicket(ticket)) {
    //     if (ticket.type === 'multiOperator') {
    //         if (isMultiOperatorGeoZoneTicket(ticket) || isSchemeOperatorTicket(ticket)) {
    //             nocs.concat(ticket.additionalNocs);
    //             if (isMultiOperatorGeoZoneTicket(ticket)) {
    //                 nocs.push(ticket.nocCode);
    //             }
    //         } else if (isMultiOperatorMultipleServicesTicket(ticket)) {
    //             const additionalNocs = ticket.additionalOperators.map(additionalOperator => additionalOperator.nocCode);
    //             nocs.concat(additionalNocs);
    //         } else {
    //             nocs.push(ticket.nocCode);
    //         }
    //     } else if (
    //         !isMultiOperatorGeoZoneTicket(ticket) &&
    //         !isMultiOperatorMultipleServicesTicket(ticket) &&
    //         !isSchemeOperatorTicket(ticket)
    //     ) {
    //         nocs.push(ticket.nocCode);
    //     }
    // }

    if (isPointToPointTicket(ticket)) {
        nocs.push(ticket.nocCode);
    } else if (isPeriodTicket(ticket)) {
        const userPeriodTicket: PeriodTicket = ticket;
        if (ticket.type === 'multiOperator') {
            if (isMultiOperatorGeoZoneTicket(userPeriodTicket) || isSchemeOperatorTicket(userPeriodTicket)) {
                const additionalNocs: string[] = [...userPeriodTicket.additionalNocs];
                if (isMultiOperatorGeoZoneTicket(userPeriodTicket)) {
                    additionalNocs.push(userPeriodTicket.nocCode);
                }
                additionalNocs.forEach(additionalNoc => nocs.push(additionalNoc));
            } else if (isMultiOperatorMultipleServicesTicket(userPeriodTicket)) {
                const additionalOperatorNocs: string[] = userPeriodTicket.additionalOperators.map(
                    additionalOperator => additionalOperator.nocCode,
                );
                additionalOperatorNocs.push(userPeriodTicket.nocCode);
                additionalOperatorNocs.forEach(additionalOperatorNoc => nocs.push(additionalOperatorNoc));
            }
        } else if (
            !isMultiOperatorGeoZoneTicket(userPeriodTicket) &&
            !isMultiOperatorMultipleServicesTicket(userPeriodTicket) &&
            !isSchemeOperatorTicket(userPeriodTicket)
        ) {
            nocs.push(userPeriodTicket.nocCode);
        }
    }
    return nocs;
};

export const netexConvertorHandler = async (event: S3Event): Promise<void> => {
    try {
        const ticket = await s3.fetchDataFromS3<PointToPointTicket | PeriodTicket | SchemeOperatorTicket>(event);
        const s3FileName = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
        const { type } = ticket;

        console.info(`NeTEx generation starting for type ${type}...`);

        const nocs: string[] = buildNocList(ticket);
        const operatorData = await db.getOperatorDataByNocCode(nocs);
        const netexGen = netexGenerator(ticket, operatorData);
        const generatedNetex = await netexGen.generate();
        const fileName = generateFileName(s3FileName);

        await uploadToS3(generatedNetex, fileName);

        if (!isSchemeOperatorTicket(ticket) && ticket.nocCode !== 'IWBusCo') {
            console.info(`NeTEx generation complete for type ${type}`);
        }
    } catch (error) {
        console.error(error.stack);
        throw new Error(error);
    }
};

export default netexConvertorHandler;
