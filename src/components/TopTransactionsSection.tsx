import React from 'react';
import { Building2, Crown, Filter, TrendingUp, X } from 'lucide-react';
import { formatCurrency, formatPsf } from '../data';
import { HdbTransaction } from '../types';

interface TopTransactionsSectionProps {
  transactions: HdbTransaction[];
  allTransactionsCount: number;
  totalMarketAmount: number;
  selectedTown: string | null;
  latestMonth: string;
  onClearFilter: () => void;
  onSelectTown: (town: string) => void;
}

export const TopTransactionsSection: React.FC<TopTransactionsSectionProps> = ({
  transactions,
  allTransactionsCount,
  totalMarketAmount,
  selectedTown,
  latestMonth,
  onClearFilter,
  onSelectTown,
}) => {
  const isFiltered = Boolean(selectedTown);
  const currentCount = transactions.length;
  const currentTotalAmount = transactions.reduce(
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
                Top Section
              </span>
              <span className="text-xs text-[#666666] font-medium">
                Simulated Daily Closing | Source: HDB {latestMonth || '2026-09'} Monthly Dataset
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>HDB Resale Transaction Details</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              Simulated daily subset extracted from official HDB monthly resale dataset, for branch estate advisory.
            </p>
          </div>
        </div>

        {/* Filter Alert Banner if town is filtered */}
        {isFiltered && (
          <div className="mt-3.5 flex items-center justify-between bg-[#1B2A4A]/5 border border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl px-3 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1B2A4A] shrink-0" />
              <span>
                Filtered by Town:{' '}
                <strong className="font-bold text-[#1B2A4A]">{selectedTown}</strong>{' '}
                ({currentCount} of {allTransactionsCount} units)
              </span>
            </div>
            <button
              id="clear-filter-btn"
              onClick={onClearFilter}
              className="inline-flex items-center gap-1 font-bold text-[#1B2A4A] hover:bg-[#1B2A4A]/10 bg-white px-2.5 py-1 rounded-lg border border-[#1B2A4A]/20 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Show All</span>
            </button>
          </div>
        )}
      </div>

      {/* Subheader Title */}
      <div className="px-4 sm:px-5 py-2.5 bg-[#F5F5F5] border-b border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#1B2A4A] uppercase tracking-wider">
        <span>Daily Resale Records ({currentCount} units)</span>
        <span className="text-[#888888] font-normal normal-case text-[11px]">
          Sorted by Price (High → Low)
        </span>
      </div>

      {/* Compact Data Table (6 columns: Town | Flat Type | Block-Street | Area(sqm) | S$ psf | Total S$) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#1B2A4A] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b border-[#1B2A4A]">
              <th scope="col" className="w-24 sm:w-28 py-2 pl-3 pr-1 text-left">
                Town
              </th>
              <th scope="col" className="w-14 sm:w-16 py-2 px-1 text-left">
                Flat Type
              </th>
              <th scope="col" className="w-auto py-2 px-1 text-left">
                Block-Street
              </th>
              <th scope="col" className="w-12 sm:w-14 py-2 px-1 text-right">
                Area(sqm)
              </th>
              <th scope="col" className="w-14 sm:w-16 py-2 px-1 text-right">
                S$ psf
              </th>
              <th scope="col" className="w-32 sm:w-36 py-2 pr-3.5 pl-1 text-right">
                Total S$
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB] text-[11px] sm:text-xs">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-[#666666]">
                  <p className="font-medium text-xs">
                    No matching HDB resale records found. Try selecting a different town or month.
                  </p>
                  {isFiltered && (
                    <button
                      onClick={onClearFilter}
                      className="mt-2 text-xs text-[#1B2A4A] font-bold underline underline-offset-4"
                    >
                      Reset town filter
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => {
                const isTopDeal = idx === 0;
                const isEven = idx % 2 === 1;

                return (
                  <tr
                    key={tx.id}
                    id={`transaction-row-${tx.id}`}
                    className={`transition-colors ${
                      isTopDeal
                        ? 'bg-[#C9A961]/20 border-l-4 border-l-[#C9A961] font-semibold'
                        : isEven
                        ? 'bg-[#F5F5F5] hover:bg-[#EBEBEB]'
                        : 'bg-white hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {/* Town Column */}
                    <td className="py-1.5 pl-3 pr-1 align-middle">
                      <button
                        onClick={() => onSelectTown(tx.town)}
                        className="font-bold text-[#1B2A4A] hover:text-[#C9A961] hover:underline whitespace-nowrap block text-left"
                        title={`Filter by ${tx.town}`}
                      >
                        {tx.town}
                      </button>
                    </td>

                    {/* Flat Type Column */}
                    <td className="py-1.5 px-1 align-middle text-[#555555] truncate whitespace-nowrap">
                      {tx.flat_type}
                    </td>

                    {/* Block-Street Column */}
                    <td className="py-1.5 px-1 align-middle text-[#333333] truncate">
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

                    {/* Total S$ Column (Right-aligned, bold, crown on top deal of this day) */}
                    <td className="py-1.5 pr-3.5 pl-1 text-right align-middle font-mono font-bold text-[#1B2A4A] whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {isTopDeal && (
                          <Crown
                            className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961] shrink-0"
                            title="Highest Price Transaction of the Day"
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

      {/* Summary Total Row at Bottom (Navy styling, calculated only for this day's records) */}
      <div
        id="transactions-totals-summary"
        className="p-3.5 sm:p-4 bg-[#1B2A4A] text-white border-t border-[#142038]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#C9A961]" />
            <h3 className="text-[11px] sm:text-xs font-bold tracking-wide text-slate-200 uppercase">
              {isFiltered ? `${selectedTown} Daily Volume Summary` : 'Daily HDB Closing Market Total'}
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/20">
            Daily Closing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              Total Units Sold Today
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 font-mono">
              {currentCount.toLocaleString('en-SG')}{' '}
              <span className="text-xs font-normal text-slate-300 font-sans">units</span>
            </div>
            {isFiltered && (
              <div className="text-[10px] text-slate-300 mt-0.5">
                of {allTransactionsCount.toLocaleString('en-SG')} total day units
              </div>
            )}
          </div>

          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              Total Daily Transaction Value
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#C9A961] mt-0.5 tracking-tight font-mono">
              {formatCurrency(currentTotalAmount)}
            </div>
            {isFiltered && (
              <div className="text-[10px] text-slate-300 mt-0.5 font-mono">
                Day total: {formatCurrency(totalMarketAmount)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
