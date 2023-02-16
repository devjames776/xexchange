import { fallbackNetworkConfigurations } from "@elrondnetwork/dapp-core/constants";
import { NetworkType } from "@elrondnetwork/dapp-core/types";
import moment from "moment";

export const environment = "mainnet";

export const launchpadApiAddress = "https://api.maiarlaunchpad.com";
export const kycServiceApi = "https://tools.elrond.com/kyc";
export const strapiCMSAddress = "";
export const mediaAddress = "https://media.maiarlaunchpad.com";
export const geoCodeApi = "https://misc-api.elrond.com/country";
export const network: NetworkType & { maiarIdApi: string; extrasApi: string } =
  {
    ...fallbackNetworkConfigurations.mainnet,
    maiarIdApi: "https://id.maiar.com/api/v1",
    extrasApi: "https://extras-api.elrond.com",
    apiAddress: "https://internal-api.elrond.com",
  };

export const kycEnd = moment().utc().isAfter(moment.utc("2022-10-21 11:00:00"));
export const snapshotCountdownEnd = "2021-09-30 08:00:00";
export const useCMS = false;

export const whitelist: string[] = [];
export const contractShards: Record<string, number> = {};

export enum ProjectsEnum {
  ITHEUM = "itheum",
  HOLORIDE = "holoride",
  CANTINA = "cantina-royale",
  ASHSWAP = "ashswap",
}

export const currentProject = ProjectsEnum.ASHSWAP;

export type ProjectsType = `${ProjectsEnum}`;

export const allProjects = [
  {
    name: ProjectsEnum.HOLORIDE,
  },
  {
    name: ProjectsEnum.ITHEUM,
  },
  {
    name: ProjectsEnum.CANTINA,
  },
  {
    name: ProjectsEnum.ASHSWAP,
  },
];

export interface TierType {
  minimumStaked: number;
  tickets: number;
  number: number;
  suffix: string;
  egldNextTier: number;
}
export const tiers: Array<TierType> = [
  {
    minimumStaked: 500,
    tickets: 64,
    number: 1,
    suffix: "st",
    egldNextTier: 0,
  },
  {
    minimumStaked: 100,
    tickets: 32,
    number: 2,
    suffix: "nd",
    egldNextTier: 0,
  },
  { minimumStaked: 25, tickets: 16, number: 3, suffix: "rd", egldNextTier: 0 },
  { minimumStaked: 5, tickets: 8, number: 4, suffix: "th", egldNextTier: 0 },
  { minimumStaked: 1, tickets: 4, number: 5, suffix: "th", egldNextTier: 0 },
];

export const pricePerTicket = 1.06;
export const ticketCurrencyLabel = "EGLD";

interface IndexType {
  [index: string]: string;
}

export const hardRestrictedCountries: IndexType = {};

export const softRestrictedCountries: IndexType = {
  AF: "Afghanistan",
  AL: "Albania",
  BB: "Barbados",
  BY: "Belarus",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CO: "Colombia",
  CG: "Congo",
  EG: "Egypt",
  GQ: "Guinea",
  GW: "Guinea-Bissau",
  HT: "Haiti",
  IR: "Iran",
  IQ: "Iraq",
  JM: "Jamaica",
  JO: "Jordan",
  KE: "Kenya",
  KP: "North Korea",
  LB: "Lebanon",
  LY: "Libya",
  ML: "Mali",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  PK: "Pakistan",
  PA: "Panama",
  PH: "Philippines",
  RU: "Russia",
  SN: "Senegal",
  SO: "Somalia",
  SS: "South Sudan",
  SD: "Sudan",
  SY: "Syria",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  UG: "Uganda",
  US: "United States of America",
  AE: "United Arab Emirates",
  VU: "Vanuatu",
  VE: "Venezuela",
  YE: "Yemen",
  ZE: "Zimbabwe",
};
