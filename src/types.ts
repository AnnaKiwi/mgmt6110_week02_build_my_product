export interface TransactionRecord {
  id: string;
  unitNumber: string; // e.g. '#02-18-1804'
  salespersonName: string;
  transactionTime: string; // e.g. '10:15'
  areaSqft: number; // e.g. 1420
  unitPricePsf: number; // e.g. 2850
  totalPrice: number; // e.g. 4047000
}

export interface Salesperson {
  id: string;
  name: string;
  avatarInitials: string;
  monthlyUnitsSold: number;
  monthlyTotalAmount: number;
  monthlyRank: number;
  monthlyTarget: number;
}

export interface SalespersonAggregated {
  salespersonId: string;
  name: string;
  unitsSold: number;
  totalSalesAmount: number;
  rank: number;
  isChampion: boolean;
}

export interface DevelopmentRecord {
  id: string;
  name: string;
  location: string;
  dailySalesAmount: number;
  monthlyCompletedAmount: number;
  monthlyTargetAmount: number;
  isCurrentDevelopment: boolean;
}

export type SalespersonSortField = 'amount' | 'units';
export type SortDirection = 'desc' | 'asc';
