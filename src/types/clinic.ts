export interface ClinicData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  hfeaLicensed: boolean;
  hfeaNumber?: string;
  soloFriendly: boolean;
  distanceMiles?: number;
  prices: {
    basicIvf?: number;
    ivfIcsi?: number;
    donorSpermIvf?: number;
    donorEggIvf?: number;
    embryoStorage?: number;
    soloPackage?: number;
    consultation?: number;
  };
  successRates: {
    under35?: number;
    age35to37?: number;
    age38to39?: number;
  };
  waitingTimeWeeks?: number;
  nhsReferrals?: boolean;
  paymentPlans?: boolean;
  fetchedAt?: string;
}

export interface ClinicSearchResponse {
  clinics: ClinicData[];
  source: "live" | "seed";
  fetchedAt: string;
  location: string;
  radius: number;
}
