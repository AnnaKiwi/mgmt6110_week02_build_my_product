import React, { useMemo, useState } from 'react';
import { Building2, ChevronDown, ChevronUp, Crown, Filter, TrendingUp, X } from 'lucide-react';
import { formatCurrency, formatPsf } from '../data';
import { HdbTransaction } from '../types';

interface TopTransactionsSectionProps {
  transactions: HdbTransaction[];
  allTransactionsCount: number;
  totalMarketAmount: number;
  selectedTown: string | null;
  latestMonth: string;
  onClearFilter: () => void;
  onSelectTown: (town: string | null) => void;
}

interface PriceOption {
  value: string;
  label: string;
  test: (price: number) => boolean;
}

const PRICE_OPTIONS: PriceOption[] = [
  { value: '', label: 'All Prices', test: () => true },
  { value: 'under-500k', label: 'Under S$500,000', test: (p) => p < 500000 },
  { value: '500k-800k', label: 'S$500,000 – S$800,000', test: (p) => p >= 500000 && p <= 800000 },
  { value: '800k-1m', label: 'S$800,000 – S$1,000,000', test: (p) => p > 800000 && p <= 1000000 },
  { value: 'over-1m', label: 'Over S$1,000,000', test: (p) => p > 1000000 },
];

export const TopTransactionsSection: React.FC<TopTransactionsSectionProps> = ({
  transactions,
  allTransactionsCount,
  totalMarketAmount,
  selectedTown,
  latestMonth,
  onClearFilter,
  onSelectTown,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedFlatType, setSelectedFlatType] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

  // Extract all unique towns in dataset in alphabetical order
  const allTowns = useMemo(() => {
    const towns = new Set<string>();
    transactions.forEach((tx) => {
      if (tx.town) towns.add(tx.town);
    });
    return Array.from(towns).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  // Extract all unique flat types in dataset
  const allFlatTypes = useMemo(() => {
    const types = new Set<string>();
    transactions.forEach((tx) => {
      if (tx.flat_type) types.add(tx.flat_type);
    });
    return Array.from(types).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  // Combined AND filtering for Town, Flat Type, and Price Range
  const filteredTransactions = useMemo(() => {
    const activePriceOpt = PRICE_OPTIONS.find((p) => p.value === selectedPriceRange);

    const list = transactions.filter((tx) => {
      if (selectedTown && tx.town.toUpperCase() !== selectedTown.toUpperCase()) {
        return false;
      }
      if (selectedFlatType && tx.flat_type !== selectedFlatType) {
        return false;
      }
      if (activePriceOpt && activePriceOpt.value && !activePriceOpt.test(tx.resale_price)) {
        return false;
      }
      return true;
    });

    return list.sort((a, b) => b.resale_price - a.resale_price);
  }, [transactions, selectedTown, selectedFlatType, selectedPriceRange]);

  const isFiltered = Boolean(selectedTown || selectedFlatType || selectedPriceRange);

  // Build active filter labels for the banner
  const activeFilterLabels: string[] = [];
  if (selectedTown) activeFilterLabels.push(selectedTown);
  if (selectedFlatType) activeFilterLabels.push(selectedFlatType);
  if (selectedPriceRange) {
    const opt = PRICE_OPTIONS.find((p) => p.value === selectedPriceRange);
    if (opt && opt.value) activeFilterLabels.push(opt.label);
  }

  const bannerPrefix = selectedTown ? 'Filtered by Town:' : 'Filtered by:';

  const handleClearAllFilters = () => {
    onClearFilter();
    setSelectedFlatType('');
    setSelectedPriceRange('');
  };

  // By default, show only the TOP 15 transactions sorted by total price (high to low)
  const visibleTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, 15);
  const visibleCount = visibleTransactions.length;
  const visibleTotalAmount = visibleTransactions.reduce(
    (sum, tx) => sum + tx.resale_price,
    0
  );
  const filteredTotalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + tx.resale_price,
    0
  );

  return (
    <section
      id="top-transactions-section"
      className="bg-white rounded-2xl border border-[#E5E5E5] shadow-xs overflow-hidden"
    >
      {/* Section Header */}
      <div className="p-4 sm:p-5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20">
                Monthly Transactions
              </span>
              <span className="text-xs text-[#666666] font-medium">
                Official Monthly Dataset | {latestMonth || '2026-09'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>Top HDB Resale Transactions</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              Official HDB monthly resale records, sorted by total price. Source: data.gov.sg
            </p>
          </div>
        </div>

        {/* 3 Filter Dropdowns: Town, Flat Type, Price Range */}
        <div className="mt-4 pt-3.5 border-t border-[#EBEBEB]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 1. Town Selector */}
            <div className="w-full">
              <label
                htmlFor="filter-town-select"
                className="block text-[11px] font-bold text-[#1B2A4A] mb-1"
              >
                Town
              </label>
              <div className="relative">
                <select
                  id="filter-town-select"
                  aria-label="Filter by town"
                  value={selectedTown || ''}
                  onChange={(e) => onSelectTown(e.target.value || null)}
                  className="w-full appearance-none text-xs sm:text-sm font-medium text-[#1B2A4A] bg-white border border-[#D1D5DB] rounded-lg pl-3 pr-8 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] transition-colors cursor-pointer"
                >
                  <option value="">All Towns</option>
                  {allTowns.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Flat Type Selector */}
            <div className="w-full">
              <label
                htmlFor="filter-flat-type-select"
                className="block text-[11px] font-bold text-[#1B2A4A] mb-1"
              >
                Flat Type
              </label>
              <div className="relative">
                <select
                  id="filter-flat-type-select"
                  aria-label="Filter by flat type"
                  value={selectedFlatType}
                  onChange={(e) => setSelectedFlatType(e.target.value)}
                  className="w-full appearance-none text-xs sm:text-sm font-medium text-[#1B2A4A] bg-white border border-[#D1D5DB] rounded-lg pl-3 pr-8 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] transition-colors cursor-pointer"
                >
                  <option value="">All Flat Types</option>
                  {allFlatTypes.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Price Range Selector */}
            <div className="w-full">
              <label
                htmlFor="filter-price-select"
                className="block text-[11px] font-bold text-[#1B2A4A] mb-1"
              >
                Price
              </label>
              <div className="relative">
                <select
                  id="filter-price-select"
                  aria-label="Filter by price"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full appearance-none text-xs sm:text-sm font-medium text-[#1B2A4A] bg-white border border-[#D1D5DB] rounded-lg pl-3 pr-8 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] transition-colors cursor-pointer"
                >
                  {PRICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Alert Banner when any filter is active */}
        {isFiltered && (
          <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#1B2A4A]/5 border border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl px-3 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#1B2A4A] shrink-0" />
              <span>
                {bannerPrefix}{' '}
                <strong className="font-bold text-[#1B2A4A]">
                  {activeFilterLabels.join(' · ')}
                </strong>{' '}
                ({filteredTransactions.length} of {allTransactionsCount} units)
              </span>
            </div>
            <button
              id="clear-filter-btn"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 font-bold text-[#1B2A4A] hover:bg-[#1B2A4A]/10 bg-white px-2.5 py-1 rounded-lg border border-[#1B2A4A]/20 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Subheader Title */}
      <div className="px-4 sm:px-5 py-2.5 bg-[#F5F5F5] border-b border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#1B2A4A] uppercase tracking-wider">
        <span>
          Showing {visibleCount} of {filteredTransactions.length} Transactions
        </span>
        <span className="text-[#888888] font-normal normal-case text-[11px]">
          Sorted by Price (High → Low)
        </span>
      </div>

      {/* Compact Data Table (6 columns: Town | Flat Type | Block-Street | Area(sqm) | S$ psf | Total S$) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] sm:min-w-0 text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#1B2A4A] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b border-[#1B2A4A]">
              <th
                scope="col"
                className="sticky left-0 z-20 bg-[#1B2A4A] w-32 sm:w-36 py-2 pl-3 pr-2 text-left border-r border-[#2A3B5C] border-l-4 border-l-transparent"
              >
                Town
              </th>
              <th scope="col" className="w-20 sm:w-24 py-2 px-1.5 text-left whitespace-nowrap">
                Flat Type
              </th>
              <th scope="col" className="w-auto min-w-[130px] sm:min-w-[160px] py-2 px-1.5 text-left">
                Block-Street
              </th>
              <th scope="col" className="w-16 sm:w-20 py-2 px-1 text-right whitespace-nowrap">
                Area(sqm)
              </th>
              <th scope="col" className="w-16 sm:w-20 py-2 px-1 text-right whitespace-nowrap">
                S$ PSF
              </th>
              <th scope="col" className="w-32 sm:w-36 py-2 pr-3.5 pl-1 text-right whitespace-nowrap">
                Total S$
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB] text-[11px] sm:text-xs">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-[#666666]">
                  <p className="font-medium text-xs">
                    {isFiltered
                      ? 'No transactions match these filters'
                      : 'No matching HDB resale records found. Try selecting a different town or month.'}
                  </p>
                  {isFiltered && (
                    <button
                      onClick={handleClearAllFilters}
                      className="mt-2 text-xs text-[#1B2A4A] font-bold underline underline-offset-4 cursor-pointer"
                    >
                      Clear filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              visibleTransactions.map((tx, idx) => {
                const isTopDeal = idx === 0;
                const isEven = idx % 2 === 1;

                return (
                  <tr
                    key={tx.id}
                    id={`transaction-row-${tx.id}`}
                    className={`group transition-colors ${
                      isTopDeal
                        ? 'bg-[#F7F3E9] hover:bg-[#EFE7D3] font-semibold'
                        : isEven
                        ? 'bg-[#F5F5F5] hover:bg-[#EBEBEB]'
                        : 'bg-white hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {/* Town Column (Sticky on mobile and desktop, solid background matching row, z-index 10) */}
                    <td
                      className={`sticky left-0 z-10 py-1.5 pl-3 pr-2 align-middle border-r border-[#E5E5E5] ${
                        isTopDeal
                          ? 'border-l-4 border-l-[#C9A961] bg-[#F7F3E9] group-hover:bg-[#EFE7D3]'
                          : isEven
                          ? 'border-l-4 border-l-transparent bg-[#F5F5F5] group-hover:bg-[#EBEBEB]'
                          : 'border-l-4 border-l-transparent bg-white group-hover:bg-[#F5F5F5]'
                      }`}
                    >
                      <button
                        onClick={() => onSelectTown(tx.town)}
                        className="font-bold text-[#1B2A4A] hover:text-[#C9A961] hover:underline truncate block text-left cursor-pointer w-full"
                        title={`Filter by ${tx.town}`}
                      >
                        {tx.town}
                      </button>
                    </td>

                    {/* Flat Type Column */}
                    <td className="py-1.5 px-1.5 align-middle text-[#555555] truncate whitespace-nowrap">
                      {tx.flat_type}
                    </td>

                    {/* Block-Street Column */}
                    <td className="py-1.5 px-1.5 align-middle text-[#333333] truncate">
                      <span className="truncate block" title={`Blk ${tx.block} ${tx.street_name}`}>
                        {tx.block} {tx.street_name}
                      </span>
                    </td>

                    {/* Area (sqm) Column */}
                    <td className="py-1.5 px-1 text-right align-middle text-[#666666] whitespace-nowrap font-mono">
                      {tx.floor_area_sqm}
                    </td>

                    {/* S$ psf Column */}
                    <td className="py-1.5 px-1 text-right align-middle text-[#666666] whitespace-nowrap font-mono">
                      ${tx.psf.toLocaleString('en-SG')}
                    </td>

                    {/* Total S$ Column (Right-aligned, bold, crown on top deal of this month) */}
                    <td className="py-1.5 pr-3.5 pl-1 text-right align-middle font-mono font-bold text-[#1B2A4A] whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {isTopDeal && (
                          <Crown
                            className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961] shrink-0"
                            title="Highest Price Transaction of the Month"
                          />
                        )}
                        <span>{formatCurrency(tx.resale_price)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse Button: Shows Top 15 vs Full Filtered Dataset */}
      {filteredTransactions.length > 15 && (
        <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E5E5] text-center">
          <button
            id="toggle-show-all-transactions-btn"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#1B2A4A] bg-white hover:bg-[#1B2A4A]/5 border border-[#1B2A4A]/20 shadow-2xs transition-colors cursor-pointer"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#1B2A4A]" />
                <span>Show top 15 only</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#1B2A4A]" />
                <span>Show all transactions</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Summary Total Row at Bottom (Numbers strictly match visible dataset: top 15 or full month) */}
      <div
        id="transactions-totals-summary"
        className="p-3.5 sm:p-4 bg-[#1B2A4A] text-white border-t border-[#142038]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#C9A961]" />
            <h3 className="text-[11px] sm:text-xs font-bold tracking-wide text-slate-200 uppercase">
              {isFiltered
                ? 'Filtered Transactions Summary'
                : showAll
                ? 'Monthly HDB Resale Market Total'
                : 'Top 15 Visible Transactions Total'}
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/20">
            {showAll ? (isFiltered ? 'All Filtered' : 'Full Month') : 'Top 15 Visible'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              {showAll ? 'Total Filtered Units' : 'Visible Units'}
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 font-mono">
              {visibleCount.toLocaleString('en-SG')}{' '}
              <span className="text-xs font-normal text-slate-300 font-sans">units</span>
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              {showAll
                ? isFiltered
                  ? `of ${allTransactionsCount.toLocaleString('en-SG')} total monthly units`
                  : 'all monthly units'
                : `of ${filteredTransactions.length.toLocaleString('en-SG')} matching transactions`}
            </div>
          </div>

          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              {showAll ? 'Total Filtered Value' : 'Visible Transaction Value'}
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#C9A961] mt-0.5 tracking-tight font-mono">
              {formatCurrency(visibleTotalAmount)}
            </div>
            {!showAll && (
              <div className="text-[10px] text-slate-300 mt-0.5 font-mono">
                {isFiltered ? 'Filtered total: ' : 'Full total: '}
                {formatCurrency(isFiltered ? filteredTotalAmount : totalMarketAmount)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
