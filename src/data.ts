import { HdbTransaction, PropertyRegion, RegionSummary, RegionTownItem } from './types';

// Singapore Currency and Number Formatting Helpers

export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'S$0';
  }
  return `S$${Math.round(amount).toLocaleString('en-SG')}`;
}

export function formatCompactCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined || amount === 0) {
    return 'S$0';
  }
  if (amount >= 1_000_000_000) {
    return `S$${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `S$${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `S$${(amount / 1_000).toFixed(0)}k`;
  }
  return `S$${Math.round(amount).toLocaleString('en-SG')}`;
}

export function formatPsf(psf: number): string {
  if (isNaN(psf) || psf === null || psf === undefined || psf === 0) {
    return 'S$0 psf';
  }
  return `S$${Math.round(psf).toLocaleString('en-SG')} psf`;
}

// Singapore Property Regions (CCR, RCR, OCR) Mapping
// Standard HDB town-to-region mapping:
// CCR: BUKIT TIMAH, MARINE PARADE, BISHAN, TOA PAYOH, KALLANG/WHAMPOA, QUEENSTOWN, GEYLANG, CLEMENTI, SERANGOON, NOVENA
// RCR: ANG MO KIO, BEDOK, BUKIT BATOK, BUKIT MERAH, BUKIT PANJANG, CHOA CHU KANG, HOUGANG, JURONG EAST, JURONG WEST, PASIR RIS, PUNGGOL, SENGKANG, TAMPINES, WOODLANDS, YISHUN
// OCR: SEMBAWANG, SENGKANG, PUNGGOL, TAMPINES, WOODLANDS, YISHUN, BUKIT BATOK, CHOA CHU KANG, JURONG WEST, LIM CHU KANG, MANDRAI, TENGAH
// If a town is not in the list, classify as OCR.

const CCR_SET = new Set([
  'BUKIT TIMAH',
  'MARINE PARADE',
  'BISHAN',
  'TOA PAYOH',
  'KALLANG/WHAMPOA',
  'QUEENSTOWN',
  'GEYLANG',
  'CLEMENTI',
  'SERANGOON',
  'NOVENA',
]);

const OCR_SET = new Set([
  'SEMBAWANG',
  'SENGKANG',
  'PUNGGOL',
  'TAMPINES',
  'WOODLANDS',
  'YISHUN',
  'BUKIT BATOK',
  'CHOA CHU KANG',
  'JURONG WEST',
  'LIM CHU KANG',
  'MANDRAI',
  'TENGAH',
]);

const RCR_SET = new Set([
  'ANG MO KIO',
  'BEDOK',
  'BUKIT MERAH',
  'BUKIT PANJANG',
  'HOUGANG',
  'JURONG EAST',
  'PASIR RIS',
]);

export function getTownRegion(town: string): PropertyRegion {
  const t = (town || '').trim().toUpperCase();
  if (CCR_SET.has(t)) return 'CCR';
  if (OCR_SET.has(t)) return 'OCR';
  if (RCR_SET.has(t)) return 'RCR';
  return 'OCR';
}

export function calculateRegionSummaries(records: HdbTransaction[]): RegionSummary[] {
  const regions: Record<
    PropertyRegion,
    {
      units: number;
      totalValue: number;
      totalSqft: number;
      townMap: Record<string, { town: string; units: number; totalValue: number; totalSqft: number }>;
    }
  > = {
    CCR: { units: 0, totalValue: 0, totalSqft: 0, townMap: {} },
    RCR: { units: 0, totalValue: 0, totalSqft: 0, townMap: {} },
    OCR: { units: 0, totalValue: 0, totalSqft: 0, townMap: {} },
  };

  const SQM_TO_SQFT = 10.7639;

  for (const r of records) {
    const reg = getTownRegion(r.town);
    const regionObj = regions[reg];
    regionObj.units += 1;
    regionObj.totalValue += r.resale_price;
    const sqft = r.floor_area_sqm * SQM_TO_SQFT;
    regionObj.totalSqft += sqft;

    const t = r.town;
    if (!regionObj.townMap[t]) {
      regionObj.townMap[t] = { town: t, units: 0, totalValue: 0, totalSqft: 0 };
    }
    regionObj.townMap[t].units += 1;
    regionObj.townMap[t].totalValue += r.resale_price;
    regionObj.townMap[t].totalSqft += sqft;
  }

  const regionConfigs: { region: PropertyRegion; name: string; fullName: string }[] = [
    { region: 'OCR', name: 'OCR', fullName: 'Outside Central Region' },
    { region: 'RCR', name: 'RCR', fullName: 'Rest of Central Region' },
    { region: 'CCR', name: 'CCR', fullName: 'Core Central Region' },
  ];

  return regionConfigs
    .map(({ region, name, fullName }) => {
      const regData = regions[region];
      const topTowns: RegionTownItem[] = Object.values(regData.townMap)
        .map((item) => ({
          town: item.town,
          units: item.units,
          totalValue: item.totalValue,
          avgPsf: item.totalSqft > 0 ? Math.round(item.totalValue / item.totalSqft) : 0,
        }))
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 5);

      return {
        region,
        name,
        fullName,
        units: regData.units,
        totalValue: regData.totalValue,
        avgPsf: regData.totalSqft > 0 ? Math.round(regData.totalValue / regData.totalSqft) : 0,
        topTowns,
      };
    })
    .sort((a, b) => b.units - a.units);
}
