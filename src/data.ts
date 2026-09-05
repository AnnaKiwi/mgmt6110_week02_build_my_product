import { DevelopmentRecord, Salesperson, TransactionRecord } from './types';

export const CURRENT_DEVELOPMENT_NAME = 'The Amberline Residences';
export const CURRENT_DEVELOPMENT_LOCATION = 'District 15, Amber Road, Singapore';
export const CLOSING_TIME_STRING = '20:00 SGT (8:00 PM)';

/**
 * 10 Salespeople on the condominium sales team.
 * Representative mix of Singaporean names (Chinese, Malay, Indian).
 */
export const SALES_TEAM: Salesperson[] = [
  {
    id: 'sp-1',
    name: 'Marcus Tan Wei Ming',
    avatarInitials: 'MT',
    monthlyUnitsSold: 6,
    monthlyTotalAmount: 14800000,
    monthlyRank: 1,
    monthlyTarget: 16000000,
  },
  {
    id: 'sp-2',
    name: 'Priya Sundaram',
    avatarInitials: 'PS',
    monthlyUnitsSold: 5,
    monthlyTotalAmount: 11900000,
    monthlyRank: 2,
    monthlyTarget: 14000000,
  },
  {
    id: 'sp-3',
    name: 'Siti Nurhaliza bte Ahmad',
    avatarInitials: 'SN',
    monthlyUnitsSold: 4,
    monthlyTotalAmount: 9200000,
    monthlyRank: 3,
    monthlyTarget: 11000000,
  },
  {
    id: 'sp-4',
    name: 'Desmond Lim Jun Hao',
    avatarInitials: 'DL',
    monthlyUnitsSold: 3,
    monthlyTotalAmount: 7400000,
    monthlyRank: 4,
    monthlyTarget: 9500000,
  },
  {
    id: 'sp-5',
    name: 'Nurul Izzah Rahim',
    avatarInitials: 'NI',
    monthlyUnitsSold: 3,
    monthlyTotalAmount: 6100000,
    monthlyRank: 5,
    monthlyTarget: 8500000,
  },
  {
    id: 'sp-6',
    name: 'Chloe Wong Shu Ting',
    avatarInitials: 'CW',
    monthlyUnitsSold: 2,
    monthlyTotalAmount: 4800000,
    monthlyRank: 6,
    monthlyTarget: 7000000,
  },
  {
    id: 'sp-7',
    name: 'Rajesh Kumar',
    avatarInitials: 'RK',
    monthlyUnitsSold: 2,
    monthlyTotalAmount: 4100000,
    monthlyRank: 7,
    monthlyTarget: 6500000,
  },
  {
    id: 'sp-8',
    name: 'Muhammad Farhan bin Ali',
    avatarInitials: 'MF',
    monthlyUnitsSold: 1,
    monthlyTotalAmount: 2400000,
    monthlyRank: 8,
    monthlyTarget: 5000000,
  },
  {
    id: 'sp-9',
    name: 'Valerie Goh Si En',
    avatarInitials: 'VG',
    monthlyUnitsSold: 1,
    monthlyTotalAmount: 1900000,
    monthlyRank: 9,
    monthlyTarget: 4000000,
  },
  {
    id: 'sp-10',
    name: 'Jonathan Lee Zhi Wei',
    avatarInitials: 'JL',
    monthlyUnitsSold: 1,
    monthlyTotalAmount: 1500000,
    monthlyRank: 10,
    monthlyTarget: 3500000,
  },
];

/**
 * Dataset (a): Daily Transaction Records (9 sales closed today).
 * Sorted by total price descending by default.
 * Unit format: #block-floor-unit (e.g., #03-22-2201).
 * Timestamps spread across business day (09:45 to 19:25).
 * Prices in realistic Singapore condo range (S$2,680 - S$3,120 psf, S$1.35M - S$3.99M).
 */
export const DAILY_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-1',
    unitNumber: '#03-22-2201',
    salespersonName: 'Marcus Tan Wei Ming',
    transactionTime: '09:45',
    areaSqft: 1280,
    unitPricePsf: 3120,
    totalPrice: 3993600,
  },
  {
    id: 'tx-2',
    unitNumber: '#01-16-1604',
    salespersonName: 'Priya Sundaram',
    transactionTime: '11:15',
    areaSqft: 1150,
    unitPricePsf: 2820,
    totalPrice: 3243000,
  },
  {
    id: 'tx-3',
    unitNumber: '#02-14-1402',
    salespersonName: 'Siti Nurhaliza bte Ahmad',
    transactionTime: '13:10',
    areaSqft: 980,
    unitPricePsf: 2750,
    totalPrice: 2695000,
  },
  {
    id: 'tx-4',
    unitNumber: '#03-09-0905',
    salespersonName: 'Marcus Tan Wei Ming',
    transactionTime: '14:35',
    areaSqft: 820,
    unitPricePsf: 2950,
    totalPrice: 2419000,
  },
  {
    id: 'tx-5',
    unitNumber: '#01-08-0803',
    salespersonName: 'Desmond Lim Jun Hao',
    transactionTime: '15:50',
    areaSqft: 790,
    unitPricePsf: 2680,
    totalPrice: 2117200,
  },
  {
    id: 'tx-6',
    unitNumber: '#02-06-0601',
    salespersonName: 'Nurul Izzah Rahim',
    transactionTime: '16:40',
    areaSqft: 710,
    unitPricePsf: 2850,
    totalPrice: 2023500,
  },
  {
    id: 'tx-7',
    unitNumber: '#03-04-0406',
    salespersonName: 'Chloe Wong Shu Ting',
    transactionTime: '17:55',
    areaSqft: 650,
    unitPricePsf: 2720,
    totalPrice: 1768000,
  },
  {
    id: 'tx-8',
    unitNumber: '#01-03-0302',
    salespersonName: 'Priya Sundaram',
    transactionTime: '18:30',
    areaSqft: 560,
    unitPricePsf: 2900,
    totalPrice: 1624000,
  },
  {
    id: 'tx-9',
    unitNumber: '#02-02-0203',
    salespersonName: 'Rajesh Kumar',
    transactionTime: '19:25',
    areaSqft: 490,
    unitPricePsf: 2760,
    totalPrice: 1352400,
  },
];

/**
 * Calculated verification totals:
 * Sum of transactions = S$21,235,700
 * Total units sold = 9
 */
export const TOTAL_DAILY_AMOUNT = DAILY_TRANSACTIONS.reduce(
  (sum, tx) => sum + tx.totalPrice,
  0
);
export const TOTAL_DAILY_UNITS = DAILY_TRANSACTIONS.length;

/**
 * Dataset (b): 6 Fictional Property Developments for Group Ranking Section.
 * Singapore-style English names, daily sales, monthly targets, and month-to-date completed amounts.
 */
export const DEVELOPMENTS_GROUP: DevelopmentRecord[] = [
  {
    id: 'dev-1',
    name: 'The Orchard Boulevard Suites',
    location: 'District 09 — Orchard',
    dailySalesAmount: 27500000,
    monthlyCompletedAmount: 96200000,
    monthlyTargetAmount: 120000000,
    isCurrentDevelopment: false,
  },
  {
    id: 'dev-2',
    name: CURRENT_DEVELOPMENT_NAME,
    location: 'District 15 — East Coast / Marine Parade',
    dailySalesAmount: TOTAL_DAILY_AMOUNT, // Exactly S$21,235,700 for 100% data consistency
    monthlyCompletedAmount: 64100000,
    monthlyTargetAmount: 85000000,
    isCurrentDevelopment: true,
  },
  {
    id: 'dev-3',
    name: 'Marina Cove Promenade',
    location: 'District 01 — Marina Bay',
    dailySalesAmount: 18400000,
    monthlyCompletedAmount: 59800000,
    monthlyTargetAmount: 90000000,
    isCurrentDevelopment: false,
  },
  {
    id: 'dev-4',
    name: 'Holland Peak Residences',
    location: 'District 10 — Holland Road',
    dailySalesAmount: 14800000,
    monthlyCompletedAmount: 48500000,
    monthlyTargetAmount: 75000000,
    isCurrentDevelopment: false,
  },
  {
    id: 'dev-5',
    name: 'East Coast Parkshore',
    location: 'District 16 — Bayshore',
    dailySalesAmount: 12100000,
    monthlyCompletedAmount: 40200000,
    monthlyTargetAmount: 60000000,
    isCurrentDevelopment: false,
  },
  {
    id: 'dev-6',
    name: 'Bishan Green Terraces',
    location: 'District 20 — Bishan Central',
    dailySalesAmount: 8900000,
    monthlyCompletedAmount: 32400000,
    monthlyTargetAmount: 50000000,
    isCurrentDevelopment: false,
  },
];

/**
 * Currency and Number Formatting Helpers for Singapore Dollar Standards
 */
export function formatCurrency(amount: number): string {
  return `S$${amount.toLocaleString('en-SG')}`;
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `S$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `S$${(amount / 1_000).toFixed(0)}k`;
  }
  return `S$${amount.toLocaleString('en-SG')}`;
}

export function formatPsf(psf: number): string {
  return `S$${psf.toLocaleString('en-SG')} psf`;
}
