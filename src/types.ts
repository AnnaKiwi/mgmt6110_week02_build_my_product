export interface HdbTransaction {
  id: string | number;
  month: string;
  town: string;
  flat_type: string;
  block: string;
  street_name: string;
  floor_area_sqm: number;
  resale_price: number;
  psf: number;
}

export interface TownRankingItem {
  town: string;
  units: number;
  totalValue: number;
  avgPsf: number;
}

export interface HdbApiResponse {
  success: boolean;
  month: string;
  simulatedDay?: number;
  totalUnits: number;
  totalValue: number;
  avgPsf: number;
  mostActiveTown: string;
  townRanking: TownRankingItem[];
  records: HdbTransaction[];
  filterTown: string | null;
  filteredCount: number;
  filteredTotalValue: number;
  errorType?: 'loading' | 'empty' | 'rejected' | 'unreachable';
  error?: string;
}

export type ViewState = 'loading' | 'success' | 'empty' | 'rejected' | 'unreachable';

export type TownSortField = 'units' | 'totalValue' | 'avgPsf';
export type SortDirection = 'desc' | 'asc';

