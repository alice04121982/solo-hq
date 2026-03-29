import { NextRequest, NextResponse } from "next/server";
import type { ClinicData, ClinicSearchResponse } from "@/types/clinic";
import { CAMBRIDGE_SEED_CLINICS } from "@/lib/clinic-seed-data";

function extractJsonFromText(text: string): ClinicData[] | null {
  // Strip markdown code fences if present
  const stripped = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Try direct parse first
  try {
    const parsed = JSON.parse(stripped);
    if (Array.isArray(parsed)) return parsed as ClinicData[];
  } catch {
    // ignore
  }

  // Try to find a JSON array within the text
  const arrayMatch = stripped.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      const parsed = JSON.parse(arrayMatch[0]);
      if (Array.isArray(parsed)) return parsed as ClinicData[];
    } catch {
      // ignore
    }
  }

  return null;
}

function normaliseClinics(raw: ClinicData[], location: string): ClinicData[] {
  return raw.map((c, i) => ({
    id: c.id ?? `clinic-${i}`,
    name: c.name ?? "Unknown Clinic",
    address: c.address ?? "",
    phone: c.phone,
    website: c.website,
    hfeaLicensed: c.hfeaLicensed ?? false,
    hfeaNumber: c.hfeaNumber,
    soloFriendly: c.soloFriendly ?? false,
    distanceMiles: c.distanceMiles,
    prices: c.prices ?? {},
    successRates: c.successRates ?? {},
    waitingTimeWeeks: c.waitingTimeWeeks,
    nhsReferrals: c.nhsReferrals,
    paymentPlans: c.paymentPlans,
    fetchedAt: new Date().toISOString(),
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location")?.trim();
  const radius = parseInt(searchParams.get("radius") ?? "25", 10);

  if (!location) {
    return NextResponse.json({ error: "location is required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const fetchedAt = new Date().toISOString();

  if (!apiKey) {
    return NextResponse.json<ClinicSearchResponse>({
      clinics: CAMBRIDGE_SEED_CLINICS,
      source: "seed",
      fetchedAt,
      location,
      radius,
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [
          {
            role: "user",
            content: `Search for IVF clinics within ${radius} miles of ${location}, UK.

For each clinic found, provide current data in this exact format and return ONLY a valid JSON array, no markdown, no preamble, no explanation:

[
  {
    "id": "slug-from-name",
    "name": "Full Clinic Name",
    "address": "Full street address including postcode",
    "phone": "phone number or null",
    "website": "https://... or null",
    "hfeaLicensed": true,
    "hfeaNumber": "HFEA number or null",
    "soloFriendly": true/false based on whether they explicitly accept single women,
    "distanceMiles": estimated miles from ${location},
    "prices": {
      "basicIvf": number in GBP or null,
      "ivfIcsi": number in GBP or null,
      "donorSpermIvf": number in GBP or null,
      "donorEggIvf": number in GBP or null,
      "embryoStorage": number per year in GBP or null,
      "soloPackage": number in GBP or null,
      "consultation": number in GBP or null
    },
    "successRates": {
      "under35": live birth rate % as number or null,
      "age35to37": live birth rate % as number or null,
      "age38to39": live birth rate % as number or null
    },
    "waitingTimeWeeks": number or null,
    "nhsReferrals": true/false or null,
    "paymentPlans": true/false or null
  }
]

Include up to 8 clinics. Prioritise those closest to ${location}. Return ONLY the JSON array.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract text from content blocks (skip server_tool_use, web_search_result, etc.)
    const textContent = (data.content as Array<{ type: string; text?: string }>)
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("");

    const clinics = extractJsonFromText(textContent);

    if (!clinics || clinics.length === 0) {
      throw new Error("Could not parse clinic data from API response");
    }

    return NextResponse.json<ClinicSearchResponse>({
      clinics: normaliseClinics(clinics, location),
      source: "live",
      fetchedAt,
      location,
      radius,
    });
  } catch {
    // Fall back to seed data on any error
    return NextResponse.json<ClinicSearchResponse>({
      clinics: CAMBRIDGE_SEED_CLINICS,
      source: "seed",
      fetchedAt,
      location,
      radius,
    });
  }
}
