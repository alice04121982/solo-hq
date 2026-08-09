export type AgeBracket = "any" | "under35" | "age35to37" | "age38to39" | "age40to42" | "age43plus";

export interface ClinicData {
  id: string;
  name: string;
  address: string;
  country?: string;
  phone?: string;
  website?: string;
  hfeaLicensed: boolean;
  hfeaNumber?: string;
  /**
   * Whether the clinic explicitly treats patients without a partner.
   * TODO: fold into a full eligibility dimension covering who each clinic
   * and country will actually treat (solo patients, same-sex couples,
   * surrogacy arrangements). Planned follow-up to the Cairn rebrand; until
   * then this field stays and is surfaced with pathway-scoped labels only.
   */
  soloFriendly: boolean;
  distanceMiles?: number;
  prices: {
    basicIvf?: number;
    /**
     * ICSI is an add-on charged per cycle, not an alternative to IVF — a
     * multi-cycle package is billed this again for every cycle it covers.
     * Stored as the add-on cost alone, never bundled into a cycle price.
     */
    icsiPerCycle?: number;
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
    age40to42?: number;
    age43plus?: number;
  };
  packages?: Array<{
    name: string;
    price: number;
    saves?: number;
    description?: string;
    /** Cycles the package covers. Drives the ICSI add-on multiplier. */
    cycles?: number;
    /** True only when the clinic states ICSI is covered for every cycle. */
    includesIcsi?: boolean;
  }>;
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
