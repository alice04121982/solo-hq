// Relative, extensioned import: scripts/check-data.ts loads this file under
// Node's type stripping, which cannot resolve the "@/" alias.
import type { GeoPoint } from "../types/clinic.ts";

/**
 * Location for the clinic finder: distance between two points, and a small
 * built-in gazetteer that turns what someone types into a point.
 *
 * Everything here runs in the browser and nothing leaves it. That is a
 * deliberate constraint, not a shortcut: the site's privacy policy promises
 * that the finder's questions are answered in the browser, the CSP lets the
 * browser talk to no other origin, and where someone lives is exactly the
 * kind of detail this site should not be sending to a geocoding service. So
 * instead of a geocoder there is a list of places with coordinates, good to a
 * few kilometres, which is all a nearest-first ordering needs.
 *
 * Coverage: every UK postcode area, named for its post town, so a postcode
 * resolves to its area's town (CB23 2TN resolves to Cambridge); the larger UK
 * towns and cities; and the cities people fly to for treatment. A place that
 * is not here can still be reached with "Use my location".
 */

export interface Place extends GeoPoint {
  name: string;
  country: string;
  /** UK postcode areas (the letters before the digits) that resolve here. */
  postcodeAreas?: string[];
  /** Other spellings or names people type. */
  aliases?: string[];
}

/** A location the finder is measuring from. */
export interface FinderLocation extends GeoPoint {
  /** What to call it on screen: a place name, or "your location" for the device. */
  label: string;
  source: "place" | "device";
}

const EARTH_RADIUS_MILES = 3958.8;

/** Great-circle distance in miles. Straight line, not a route. */
export function distanceMiles(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(h)));
}

/**
 * Distance as the finder prints it. Under ten miles keeps one decimal, so two
 * London clinics do not both read "2 miles"; anything further is a whole
 * number, because the gazetteer is only good to a few kilometres anyway.
 */
export function formatMiles(miles: number): string {
  if (miles < 10) {
    const rounded = Math.round(miles * 10) / 10;
    return `${rounded} ${rounded === 1 ? "mile" : "miles"}`;
  }
  return `${Math.round(miles).toLocaleString("en-GB")} miles`;
}

/** "12 miles from Cambridge", or "12 miles from you" for the device's own position. */
export function distanceText(from: FinderLocation, to: GeoPoint): string {
  const who = from.source === "device" ? "you" : from.label;
  return `${formatMiles(distanceMiles(from, to))} from ${who}`;
}

/** Distance ceilings offered once a location is set. */
export const DISTANCE_CEILINGS_MILES = [10, 25, 50, 100, 250] as const;

const UK = "United Kingdom";

/**
 * The gazetteer. UK entries carry the postcode areas that resolve to them;
 * London is split by its postal districts so an inner-London postcode lands
 * on the right side of the city rather than on Charing Cross.
 */
export const PLACES: Place[] = [
  // ── London, by postcode district group ──
  { name: "Central London", country: UK, lat: 51.5142, lng: -0.1210, postcodeAreas: ["WC", "EC"], aliases: ["London", "City of London"] },
  { name: "West London", country: UK, lat: 51.5120, lng: -0.1950, postcodeAreas: ["W"] },
  { name: "South West London", country: UK, lat: 51.4560, lng: -0.1920, postcodeAreas: ["SW"], aliases: ["Chelsea", "Wandsworth", "Wimbledon"] },
  { name: "South East London", country: UK, lat: 51.4700, lng: -0.0500, postcodeAreas: ["SE"], aliases: ["Greenwich", "Lewisham", "Camberwell"] },
  { name: "East London", country: UK, lat: 51.5300, lng: -0.0300, postcodeAreas: ["E"], aliases: ["Stratford", "Hackney"] },
  { name: "North London", country: UK, lat: 51.5750, lng: -0.1050, postcodeAreas: ["N"], aliases: ["Islington", "Finchley"] },
  { name: "North West London", country: UK, lat: 51.5500, lng: -0.1900, postcodeAreas: ["NW"], aliases: ["Camden", "Hampstead"] },
  { name: "Croydon", country: UK, lat: 51.3727, lng: -0.1099, postcodeAreas: ["CR"] },
  { name: "Bromley", country: UK, lat: 51.4060, lng: 0.0150, postcodeAreas: ["BR"] },
  { name: "Dartford", country: UK, lat: 51.4460, lng: 0.2170, postcodeAreas: ["DA"] },
  { name: "Romford", country: UK, lat: 51.5768, lng: 0.1801, postcodeAreas: ["RM"] },
  { name: "Ilford", country: UK, lat: 51.5590, lng: 0.0740, postcodeAreas: ["IG"] },
  { name: "Enfield", country: UK, lat: 51.6520, lng: -0.0810, postcodeAreas: ["EN"], aliases: ["Cheshunt", "Waltham Cross", "Barnet", "Potters Bar"] },
  { name: "Harrow", country: UK, lat: 51.5806, lng: -0.3420, postcodeAreas: ["HA"], aliases: ["Wembley", "Pinner"] },
  { name: "Uxbridge", country: UK, lat: 51.5460, lng: -0.4780, postcodeAreas: ["UB"], aliases: ["Southall", "Hayes"] },
  { name: "Twickenham", country: UK, lat: 51.4470, lng: -0.3260, postcodeAreas: ["TW"], aliases: ["Hounslow", "Richmond"] },
  { name: "Kingston upon Thames", country: UK, lat: 51.4123, lng: -0.3007, postcodeAreas: ["KT"], aliases: ["Kingston", "Epsom"] },
  { name: "Sutton", country: UK, lat: 51.3618, lng: -0.1945, postcodeAreas: ["SM"] },
  { name: "Watford", country: UK, lat: 51.6565, lng: -0.3903, postcodeAreas: ["WD"] },

  // ── England ──
  { name: "Bath", country: UK, lat: 51.3811, lng: -2.3590, postcodeAreas: ["BA"] },
  { name: "Birmingham", country: UK, lat: 52.4862, lng: -1.8904, postcodeAreas: ["B"] },
  { name: "Blackburn", country: UK, lat: 53.7480, lng: -2.4820, postcodeAreas: ["BB"], aliases: ["Burnley"] },
  { name: "Blackpool", country: UK, lat: 53.8175, lng: -3.0357, postcodeAreas: ["FY"] },
  { name: "Bolton", country: UK, lat: 53.5780, lng: -2.4290, postcodeAreas: ["BL"] },
  { name: "Bournemouth", country: UK, lat: 50.7192, lng: -1.8808, postcodeAreas: ["BH"], aliases: ["Poole"] },
  { name: "Bradford", country: UK, lat: 53.7960, lng: -1.7594, postcodeAreas: ["BD"] },
  { name: "Brighton", country: UK, lat: 50.8225, lng: -0.1372, postcodeAreas: ["BN"], aliases: ["Hove", "Worthing", "Eastbourne"] },
  { name: "Bristol", country: UK, lat: 51.4545, lng: -2.5879, postcodeAreas: ["BS"] },
  { name: "Cambridge", country: UK, lat: 52.2053, lng: 0.1218, postcodeAreas: ["CB"], aliases: ["Ely", "Newmarket"] },
  { name: "Canterbury", country: UK, lat: 51.2802, lng: 1.0789, postcodeAreas: ["CT"], aliases: ["Margate", "Dover", "Folkestone"] },
  { name: "Carlisle", country: UK, lat: 54.8925, lng: -2.9329, postcodeAreas: ["CA"] },
  { name: "Chelmsford", country: UK, lat: 51.7356, lng: 0.4685, postcodeAreas: ["CM"], aliases: ["Brentwood", "Harlow"] },
  { name: "Cheltenham", country: UK, lat: 51.8994, lng: -2.0783 },
  { name: "Chester", country: UK, lat: 53.1934, lng: -2.8931, postcodeAreas: ["CH"], aliases: ["Wirral", "Birkenhead"] },
  { name: "Colchester", country: UK, lat: 51.8959, lng: 0.8919, postcodeAreas: ["CO"] },
  { name: "Coventry", country: UK, lat: 52.4068, lng: -1.5197, postcodeAreas: ["CV"], aliases: ["Warwick", "Leamington Spa", "Rugby"] },
  { name: "Crewe", country: UK, lat: 53.0977, lng: -2.4440, postcodeAreas: ["CW"] },
  { name: "Darlington", country: UK, lat: 54.5253, lng: -1.5535, postcodeAreas: ["DL"] },
  { name: "Derby", country: UK, lat: 52.9225, lng: -1.4746, postcodeAreas: ["DE"] },
  { name: "Doncaster", country: UK, lat: 53.5228, lng: -1.1288, postcodeAreas: ["DN"], aliases: ["Grimsby", "Scunthorpe"] },
  { name: "Dorchester", country: UK, lat: 50.7112, lng: -2.4412, postcodeAreas: ["DT"], aliases: ["Weymouth"] },
  { name: "Dudley", country: UK, lat: 52.5120, lng: -2.0810, postcodeAreas: ["DY"], aliases: ["Kidderminster"] },
  { name: "Durham", country: UK, lat: 54.7761, lng: -1.5733, postcodeAreas: ["DH"] },
  { name: "Exeter", country: UK, lat: 50.7184, lng: -3.5339, postcodeAreas: ["EX"], aliases: ["Barnstaple"] },
  { name: "Gloucester", country: UK, lat: 51.8642, lng: -2.2382, postcodeAreas: ["GL"] },
  { name: "Guildford", country: UK, lat: 51.2362, lng: -0.5704, postcodeAreas: ["GU"], aliases: ["Woking", "Farnborough"] },
  { name: "Halifax", country: UK, lat: 53.7248, lng: -1.8658, postcodeAreas: ["HX"] },
  { name: "Harrogate", country: UK, lat: 53.9921, lng: -1.5418, postcodeAreas: ["HG"] },
  { name: "Hemel Hempstead", country: UK, lat: 51.7526, lng: -0.4692, postcodeAreas: ["HP"], aliases: ["High Wycombe", "Aylesbury"] },
  { name: "Hereford", country: UK, lat: 52.0565, lng: -2.7160, postcodeAreas: ["HR"] },
  { name: "Huddersfield", country: UK, lat: 53.6458, lng: -1.7850, postcodeAreas: ["HD"] },
  { name: "Hull", country: UK, lat: 53.7457, lng: -0.3367, postcodeAreas: ["HU"], aliases: ["Kingston upon Hull"] },
  { name: "Ipswich", country: UK, lat: 52.0567, lng: 1.1482, postcodeAreas: ["IP"], aliases: ["Bury St Edmunds"] },
  { name: "Lancaster", country: UK, lat: 54.0466, lng: -2.8007, postcodeAreas: ["LA"], aliases: ["Kendal", "Barrow-in-Furness"] },
  { name: "Leeds", country: UK, lat: 53.8008, lng: -1.5491, postcodeAreas: ["LS"] },
  { name: "Leicester", country: UK, lat: 52.6369, lng: -1.1398, postcodeAreas: ["LE"], aliases: ["Loughborough"] },
  { name: "Lincoln", country: UK, lat: 53.2307, lng: -0.5406, postcodeAreas: ["LN"] },
  { name: "Liverpool", country: UK, lat: 53.4084, lng: -2.9916, postcodeAreas: ["L"] },
  { name: "Luton", country: UK, lat: 51.8787, lng: -0.4200, postcodeAreas: ["LU"], aliases: ["Dunstable"] },
  { name: "Manchester", country: UK, lat: 53.4808, lng: -2.2426, postcodeAreas: ["M"], aliases: ["Salford"] },
  { name: "Medway", country: UK, lat: 51.3880, lng: 0.5060, postcodeAreas: ["ME"], aliases: ["Rochester", "Chatham", "Gillingham", "Maidstone"] },
  { name: "Middlesbrough", country: UK, lat: 54.5742, lng: -1.2350, postcodeAreas: ["TS"], aliases: ["Teesside", "Stockton-on-Tees"] },
  { name: "Milton Keynes", country: UK, lat: 52.0406, lng: -0.7594, postcodeAreas: ["MK"], aliases: ["Bedford"] },
  { name: "Newcastle upon Tyne", country: UK, lat: 54.9783, lng: -1.6178, postcodeAreas: ["NE"], aliases: ["Newcastle", "Gateshead"] },
  { name: "Northampton", country: UK, lat: 52.2405, lng: -0.9027, postcodeAreas: ["NN"], aliases: ["Kettering"] },
  { name: "Norwich", country: UK, lat: 52.6309, lng: 1.2974, postcodeAreas: ["NR"] },
  { name: "Nottingham", country: UK, lat: 52.9548, lng: -1.1581, postcodeAreas: ["NG"] },
  { name: "Oldham", country: UK, lat: 53.5409, lng: -2.1114, postcodeAreas: ["OL"], aliases: ["Rochdale"] },
  { name: "Oxford", country: UK, lat: 51.7520, lng: -1.2577, postcodeAreas: ["OX"], aliases: ["Banbury"] },
  { name: "Peterborough", country: UK, lat: 52.5695, lng: -0.2405, postcodeAreas: ["PE"], aliases: ["King's Lynn", "Huntingdon"] },
  { name: "Plymouth", country: UK, lat: 50.3755, lng: -4.1427, postcodeAreas: ["PL"] },
  { name: "Portsmouth", country: UK, lat: 50.8198, lng: -1.0880, postcodeAreas: ["PO"], aliases: ["Chichester", "Isle of Wight"] },
  { name: "Preston", country: UK, lat: 53.7632, lng: -2.7031, postcodeAreas: ["PR"] },
  { name: "Reading", country: UK, lat: 51.4543, lng: -0.9781, postcodeAreas: ["RG"], aliases: ["Basingstoke", "Newbury", "Bracknell"] },
  { name: "Redhill", country: UK, lat: 51.2400, lng: -0.1700, postcodeAreas: ["RH"], aliases: ["Crawley", "Horsham", "Gatwick"] },
  { name: "Salisbury", country: UK, lat: 51.0693, lng: -1.7944, postcodeAreas: ["SP"], aliases: ["Andover"] },
  { name: "Sheffield", country: UK, lat: 53.3811, lng: -1.4701, postcodeAreas: ["S"], aliases: ["Rotherham", "Barnsley", "Chesterfield"] },
  { name: "Shrewsbury", country: UK, lat: 52.7073, lng: -2.7553, postcodeAreas: ["SY"] },
  { name: "Slough", country: UK, lat: 51.5105, lng: -0.5950, postcodeAreas: ["SL"], aliases: ["Windsor", "Maidenhead"] },
  { name: "Southampton", country: UK, lat: 50.9097, lng: -1.4044, postcodeAreas: ["SO"], aliases: ["Winchester", "Eastleigh"] },
  { name: "Southend-on-Sea", country: UK, lat: 51.5459, lng: 0.7077, postcodeAreas: ["SS"], aliases: ["Southend", "Basildon"] },
  { name: "St Albans", country: UK, lat: 51.7520, lng: -0.3360, postcodeAreas: ["AL"], aliases: ["Hatfield", "Welwyn Garden City"] },
  { name: "Stevenage", country: UK, lat: 51.9038, lng: -0.2020, postcodeAreas: ["SG"], aliases: ["Hitchin", "Letchworth"] },
  { name: "Stockport", country: UK, lat: 53.4106, lng: -2.1575, postcodeAreas: ["SK"], aliases: ["Macclesfield"] },
  { name: "Stoke-on-Trent", country: UK, lat: 53.0027, lng: -2.1794, postcodeAreas: ["ST"], aliases: ["Stoke", "Stafford"] },
  { name: "Sunderland", country: UK, lat: 54.9069, lng: -1.3838, postcodeAreas: ["SR"] },
  { name: "Swindon", country: UK, lat: 51.5558, lng: -1.7797, postcodeAreas: ["SN"], aliases: ["Chippenham"] },
  { name: "Taunton", country: UK, lat: 51.0150, lng: -3.1030, postcodeAreas: ["TA"], aliases: ["Yeovil", "Bridgwater"] },
  { name: "Telford", country: UK, lat: 52.6784, lng: -2.4453, postcodeAreas: ["TF"] },
  { name: "Tonbridge", country: UK, lat: 51.1950, lng: 0.2740, postcodeAreas: ["TN"], aliases: ["Tunbridge Wells", "Hastings", "Sevenoaks"] },
  { name: "Torquay", country: UK, lat: 50.4619, lng: -3.5253, postcodeAreas: ["TQ"], aliases: ["Torbay", "Newton Abbot"] },
  { name: "Truro", country: UK, lat: 50.2632, lng: -5.0510, postcodeAreas: ["TR"], aliases: ["Cornwall", "Falmouth", "Penzance"] },
  { name: "Wakefield", country: UK, lat: 53.6830, lng: -1.4977, postcodeAreas: ["WF"] },
  { name: "Walsall", country: UK, lat: 52.5860, lng: -1.9829, postcodeAreas: ["WS"] },
  { name: "Warrington", country: UK, lat: 53.3900, lng: -2.5970, postcodeAreas: ["WA"], aliases: ["Runcorn", "Widnes"] },
  { name: "Wigan", country: UK, lat: 53.5450, lng: -2.6325, postcodeAreas: ["WN"] },
  { name: "Wolverhampton", country: UK, lat: 52.5870, lng: -2.1288, postcodeAreas: ["WV"] },
  { name: "Worcester", country: UK, lat: 52.1936, lng: -2.2216, postcodeAreas: ["WR"], aliases: ["Evesham"] },
  { name: "York", country: UK, lat: 53.9600, lng: -1.0873, postcodeAreas: ["YO"], aliases: ["Scarborough"] },

  // ── Wales ──
  { name: "Cardiff", country: UK, lat: 51.4816, lng: -3.1791, postcodeAreas: ["CF"], aliases: ["Caerdydd", "Bridgend", "Pontypridd"] },
  { name: "Llandrindod Wells", country: UK, lat: 52.2410, lng: -3.3790, postcodeAreas: ["LD"], aliases: ["Powys", "Brecon"] },
  { name: "Llandudno", country: UK, lat: 53.3241, lng: -3.8276, postcodeAreas: ["LL"], aliases: ["Bangor", "Wrexham", "Anglesey"] },
  { name: "Newport", country: UK, lat: 51.5842, lng: -2.9977, postcodeAreas: ["NP"], aliases: ["Casnewydd", "Cwmbran"] },
  { name: "Swansea", country: UK, lat: 51.6214, lng: -3.9436, postcodeAreas: ["SA"], aliases: ["Abertawe", "Carmarthen", "Llanelli"] },

  // ── Scotland ──
  { name: "Aberdeen", country: UK, lat: 57.1497, lng: -2.0943, postcodeAreas: ["AB"] },
  { name: "Dundee", country: UK, lat: 56.4620, lng: -2.9707, postcodeAreas: ["DD"] },
  { name: "Dumfries", country: UK, lat: 55.0709, lng: -3.6051, postcodeAreas: ["DG"] },
  { name: "Edinburgh", country: UK, lat: 55.9533, lng: -3.1883, postcodeAreas: ["EH"] },
  { name: "Falkirk", country: UK, lat: 56.0019, lng: -3.7839, postcodeAreas: ["FK"], aliases: ["Stirling"] },
  { name: "Galashiels", country: UK, lat: 55.6180, lng: -2.8070, postcodeAreas: ["TD"], aliases: ["Scottish Borders"] },
  { name: "Glasgow", country: UK, lat: 55.8642, lng: -4.2518, postcodeAreas: ["G"] },
  { name: "Inverness", country: UK, lat: 57.4778, lng: -4.2247, postcodeAreas: ["IV"], aliases: ["Highlands"] },
  { name: "Kilmarnock", country: UK, lat: 55.6117, lng: -4.4957, postcodeAreas: ["KA"], aliases: ["Ayr"] },
  { name: "Kirkcaldy", country: UK, lat: 56.1107, lng: -3.1580, postcodeAreas: ["KY"], aliases: ["Fife", "Dunfermline", "St Andrews"] },
  { name: "Kirkwall", country: UK, lat: 58.9809, lng: -2.9605, postcodeAreas: ["KW"], aliases: ["Orkney", "Wick", "Thurso"] },
  { name: "Lerwick", country: UK, lat: 60.1550, lng: -1.1450, postcodeAreas: ["ZE"], aliases: ["Shetland"] },
  { name: "Motherwell", country: UK, lat: 55.7890, lng: -3.9910, postcodeAreas: ["ML"], aliases: ["Lanarkshire", "Hamilton"] },
  { name: "Paisley", country: UK, lat: 55.8456, lng: -4.4239, postcodeAreas: ["PA"] },
  { name: "Perth", country: UK, lat: 56.3950, lng: -3.4308, postcodeAreas: ["PH"] },
  { name: "Stornoway", country: UK, lat: 58.2090, lng: -6.3870, postcodeAreas: ["HS"], aliases: ["Outer Hebrides", "Western Isles"] },

  // ── Northern Ireland, Crown Dependencies ──
  { name: "Belfast", country: UK, lat: 54.5973, lng: -5.9301, postcodeAreas: ["BT"], aliases: ["Northern Ireland", "Derry", "Londonderry", "Lisburn"] },
  { name: "Douglas", country: "Isle of Man", lat: 54.1500, lng: -4.4800, postcodeAreas: ["IM"], aliases: ["Isle of Man"] },
  { name: "St Helier", country: "Jersey", lat: 49.1860, lng: -2.1070, postcodeAreas: ["JE"], aliases: ["Jersey"] },
  { name: "St Peter Port", country: "Guernsey", lat: 49.4550, lng: -2.5360, postcodeAreas: ["GY"], aliases: ["Guernsey"] },

  // ── Ireland and Europe ──
  { name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 },
  { name: "Cork", country: "Ireland", lat: 51.8985, lng: -8.4756 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Lyon", country: "France", lat: 45.7640, lng: 4.8357 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },
  { name: "Valencia", country: "Spain", lat: 39.4699, lng: -0.3763 },
  { name: "Alicante", country: "Spain", lat: 38.3452, lng: -0.4810 },
  { name: "Málaga", country: "Spain", lat: 36.7213, lng: -4.4214, aliases: ["Malaga", "Marbella"] },
  { name: "Seville", country: "Spain", lat: 37.3891, lng: -5.9845, aliases: ["Sevilla"] },
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, aliases: ["Lisboa"] },
  { name: "Porto", country: "Portugal", lat: 41.1579, lng: -8.6291 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, aliases: ["Roma"] },
  { name: "Milan", country: "Italy", lat: 45.4642, lng: 9.1900, aliases: ["Milano"] },
  { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
  { name: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820, aliases: ["München"] },
  { name: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821 },
  { name: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517, aliases: ["Bruxelles", "Brussel"] },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683, aliases: ["København"] },
  { name: "Aarhus", country: "Denmark", lat: 56.1629, lng: 10.2039 },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { name: "Gothenburg", country: "Sweden", lat: 57.7089, lng: 11.9746, aliases: ["Göteborg"] },
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },
  { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
  { name: "Reykjavík", country: "Iceland", lat: 64.1466, lng: -21.9426, aliases: ["Reykjavik"] },
  { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, aliases: ["Wien"] },
  { name: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417, aliases: ["Zürich"] },
  { name: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432, aliases: ["Genève"] },
  { name: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378, aliases: ["Praha", "Czechia"] },
  { name: "Brno", country: "Czech Republic", lat: 49.1951, lng: 16.6068 },
  { name: "Bratislava", country: "Slovakia", lat: 48.1486, lng: 17.1077 },
  { name: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122, aliases: ["Warszawa"] },
  { name: "Kraków", country: "Poland", lat: 50.0647, lng: 19.9450, aliases: ["Krakow", "Cracow"] },
  { name: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },
  { name: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025, aliases: ["București"] },
  { name: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219 },
  { name: "Zagreb", country: "Croatia", lat: 45.8150, lng: 15.9819 },
  { name: "Ljubljana", country: "Slovenia", lat: 46.0569, lng: 14.5058 },
  { name: "Riga", country: "Latvia", lat: 56.9496, lng: 24.1052 },
  { name: "Vilnius", country: "Lithuania", lat: 54.6872, lng: 25.2797 },
  { name: "Tallinn", country: "Estonia", lat: 59.4370, lng: 24.7536 },
  { name: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234, aliases: ["Kiev"] },
  { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275, aliases: ["Athina"] },
  { name: "Thessaloniki", country: "Greece", lat: 40.6401, lng: 22.9444, aliases: ["Salonika"] },
  { name: "Nicosia", country: "Cyprus", lat: 35.1856, lng: 33.3823, aliases: ["Lefkosia"] },
  { name: "Limassol", country: "Cyprus", lat: 34.7071, lng: 33.0226, aliases: ["Lemesos"] },
  { name: "Valletta", country: "Malta", lat: 35.8989, lng: 14.5146, aliases: ["Malta"] },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, aliases: ["İstanbul"] },
  { name: "Ankara", country: "Turkey", lat: 39.9334, lng: 32.8597 },
  { name: "Antalya", country: "Turkey", lat: 36.8969, lng: 30.7133 },
  { name: "Izmir", country: "Turkey", lat: 38.4237, lng: 27.1428, aliases: ["İzmir"] },

  // ── Middle East, Africa ──
  { name: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818 },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708, aliases: ["UAE"] },
  { name: "Abu Dhabi", country: "United Arab Emirates", lat: 24.4539, lng: 54.3773 },
  { name: "Doha", country: "Qatar", lat: 25.2854, lng: 51.5310 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lng: -0.1870 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473, aliases: ["Joburg"] },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { name: "Durban", country: "South Africa", lat: -29.8587, lng: 31.0218 },

  // ── Asia, Pacific ──
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, aliases: ["Bombay"] },
  { name: "Delhi", country: "India", lat: 28.6139, lng: 77.2090, aliases: ["New Delhi"] },
  { name: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946, aliases: ["Bangalore"] },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251 },
  { name: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605 },
  { name: "Auckland", country: "New Zealand", lat: -36.8509, lng: 174.7645 },

  // ── Americas ──
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.0060, aliases: ["NYC", "Manhattan", "Brooklyn"] },
  { name: "Boston", country: "United States", lat: 42.3601, lng: -71.0589 },
  { name: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
  { name: "Denver", country: "United States", lat: 39.7392, lng: -104.9903, aliases: ["Colorado"] },
  { name: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437, aliases: ["LA"] },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { name: "Seattle", country: "United States", lat: 47.6062, lng: -122.3321 },
  { name: "Miami", country: "United States", lat: 25.7617, lng: -80.1918 },
  { name: "Houston", country: "United States", lat: 29.7604, lng: -95.3698 },
  { name: "Washington", country: "United States", lat: 38.9072, lng: -77.0369, aliases: ["Washington DC", "DC"] },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { name: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673, aliases: ["Montréal"] },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, aliases: ["Ciudad de México"] },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, aliases: ["Sao Paulo"] },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
];

/** Lower-case, accents stripped, punctuation dropped: what both sides of a match are reduced to. */
function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The postcode area (its leading letters) if the query looks like a UK
 * postcode or the start of one: "CB23 2TN", "cb23", "SW1W 8RH", "M1". A bare
 * word of letters is not a postcode, so "Bath" never resolves to the BA area
 * ahead of the city.
 */
export function postcodeArea(query: string): string | undefined {
  const m = /^([A-Za-z]{1,2})\d/.exec(query.trim());
  return m ? m[1].toUpperCase() : undefined;
}

const placesByArea = new Map<string, Place>();
for (const place of PLACES) {
  for (const area of place.postcodeAreas ?? []) placesByArea.set(area, place);
}

/**
 * Places matching what has been typed, best first, at most `limit`. A place
 * name that starts with the query beats an alias that does, which beats a
 * later word that does; a postcode resolves to its area's town and nothing
 * else. Two characters is the least that says anything, except for a
 * postcode, where one letter and a digit already name an area.
 */
export function searchPlaces(query: string, limit = 6): Place[] {
  const area = postcodeArea(query);
  if (area) {
    const place = placesByArea.get(area);
    return place ? [place] : [];
  }

  const q = normalise(query);
  if (q.length < 2) return [];

  const scored: { place: Place; score: number }[] = [];
  for (const place of PLACES) {
    const name = normalise(place.name);
    const aliases = (place.aliases ?? []).map(normalise);
    let score = 0;
    if (name === q) score = 5;
    else if (name.startsWith(q)) score = 4;
    else if (aliases.some((a) => a === q || a.startsWith(q))) score = 3;
    else if (name.split(" ").some((w) => w.startsWith(q))) score = 2;
    else if (aliases.some((a) => a.split(" ").some((w) => w.startsWith(q)))) score = 1;
    else if (normalise(place.country) === q) score = 0.5;
    if (score > 0) scored.push({ place, score });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name))
    .slice(0, limit)
    .map((s) => s.place);
}

/** The location the finder measures from when a place is chosen. */
export function locationForPlace(place: Place): FinderLocation {
  return { label: place.name, lat: place.lat, lng: place.lng, source: "place" };
}
