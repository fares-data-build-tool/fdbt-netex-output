import _ from 'lodash';
import parser from 'xml2json';
import fs from 'fs';
import { PeriodTicket, PointToPointTicket, GroupTicket, User, GroupCompanion } from '../types';

export interface NetexObject {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line import/prefer-default-export
export const getCleanWebsite = (nocWebsite: string): string => {
    if (nocWebsite !== null) {
        const splitWebsite = nocWebsite.split('#');

        return splitWebsite.length > 1 && splitWebsite[1] ? splitWebsite[1] : splitWebsite[0];
    }
    return '';
};

export const getNetexTemplateAsJson = async (filepath: string): Promise<NetexObject> => {
    try {
        const fileData = await fs.promises.readFile(`${__dirname}/${filepath}`, { encoding: 'utf8' });
        const json = JSON.parse(parser.toJson(fileData, { reversible: true, trim: true }));

        return json;
    } catch (error) {
        throw new Error(`Error converting NeTEx template to JSON: ${error.stack}`);
    }
};

export const convertJsonToXml = (netexFileAsJsonObject: NetexObject): string => {
    const netexFileAsJsonString = JSON.stringify(netexFileAsJsonObject);
    const netexFileAsXmlString = parser.toXml(netexFileAsJsonString, { sanitize: true, ignoreNull: true });

    return netexFileAsXmlString;
};

export const isGroupTicket = (ticket: PeriodTicket | PointToPointTicket): ticket is GroupTicket =>
    (ticket as GroupTicket).groupDefinition !== undefined;

export const getProfileRef = (ticket: PeriodTicket | PointToPointTicket): NetexObject => {
    if (isGroupTicket(ticket)) {
        return {
            GroupTicketRef: {
                version: '1.0',
                ref: `op:${ticket.passengerType}`,
            },
        };
    }

    return {
        UserProfileRef: {
            version: '1.0',
            ref: `op:${ticket.passengerType}`,
        },
    };
};

export const getUserProfile = (user: User | GroupCompanion): NetexObject => ({
    version: '1.0',
    id: `op:${user.passengerType}`,
    Name: { $t: user.passengerType },
    TypeOfConcessionRef: {
        version: 'fxc:v1.0',
        ref: `fxc:${
            user.passengerType === 'anyone' || user.passengerType === 'adult' ? 'none' : _.snakeCase(user.passengerType)
        }`,
    },
    MinimumAge: { $t: user.ageRangeMin || null },
    MaximumAge: { $t: user.ageRangeMax || null },
    ProofRequired: { $t: user.proofDocuments?.join(' ') || null },
});

export const getGroupElement = (userPeriodTicket: GroupTicket): NetexObject => {
    return {
        version: '1.0',
        id: `op:Tariff@group`,
        Name: { $t: 'Eligible groups' },
        TypeOfFareStructureElementRef: {
            version: 'fxc:v1.0',
            ref: 'fxc:groups',
        },
        GenericParameterAssignment: {
            id: `op:Tariff@group`,
            version: '1.0',
            order: '0',
            TypeOfAccessRightAssignmentRef: {
                version: 'fxc:v1.0',
                ref: 'fxc:eligible',
            },
            LimitationGroupingType: { $t: 'OR' },
            limitations: {
                GroupTicket: {
                    id: 'op:group',
                    version: '1.0',
                    MaximumNumberOfPersons: {
                        $t: userPeriodTicket.groupDefinition.maxPeople,
                    },
                    companionProfiles: {
                        CompanionProfile: userPeriodTicket.groupDefinition.companions.map(companion => ({
                            version: '1.0',
                            id: `op:companion@${companion.passengerType}`,
                            UserProfileRef: {
                                version: '1.0',
                                ref: `op:${companion.passengerType}`,
                            },
                            MinimumNumberOfPersons: {
                                $t: companion.minNumber || null,
                            },
                            MaximumNumberOfPersons: {
                                $t: companion.maxNumber || null,
                            },
                        })),
                    },
                },
            },
        },
    };
};
