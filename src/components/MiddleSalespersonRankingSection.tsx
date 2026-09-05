import React from 'react';
import {
  ArrowUpDown,
  Crown,
  Filter,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { formatCurrency } from '../data';
import {
  SalespersonAggregated,
  SalespersonSortField,
  SortDirection,
} from '../types';

interface MiddleSalespersonRankingSectionProps {
  salespeoplePerformance: SalespersonAggregated[];
  sortField: SalespersonSortField;
  sortDirection: SortDirection;
  onToggleSort: (field: SalespersonSortField) => void;
  selectedSalesperson: string | null;
  onSelectSalesperson: (name: string) => void;
  onClearFilter: () => void;
}

export const MiddleSalespersonRankingSection: React.FC<
  MiddleSalespersonRankingSectionProps
> = ({
  salespeoplePerformance,
  sortField,
  sortDirection,
  onToggleSort,
  selectedSalesperson,
  onSelectSalesperson,
  onClearFilter,
}) => {
  const champion = salespeoplePerformance.find(
    (sp) => sp.rank === 1 && sp.totalSalesAmount > 0
  );

  return (
    <section
      id="middle-salesperson-ranking-section"
      className="bg-white rounded-2xl border border-[#E5E5E5] shadow-xs overflow-hidden"
    >
      {/* Section Header */}
      <div className="p-4 sm:p-5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20">
                Middle Section
              </span>
              <span className="text-xs text-[#666666] font-medium">
                10-Agent Team Performance
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>Salesperson Daily Ranking</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              Tap any row to filter transactions. Tap headers to sort.
            </p>
          </div>
        </div>

        {/* Sales Champion Quick Banner */}
        {champion && (
          <div
            id="sales-champion-banner"
            onClick={() => onSelectSalesperson(champion.name)}
            className="mt-3.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] via-[#D4B976] to-[#C9A961] text-[#1B2A4A] shadow-xs border border-[#B8984E] flex items-center justify-between cursor-pointer hover:opacity-95 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1B2A4A] text-[#C9A961] flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1B2A4A]/80">
                  Daily Sales Champion (#1)
                </span>
                <div className="font-extrabold text-sm sm:text-base text-[#1B2A4A] leading-tight">
                  {champion.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-base font-black text-[#1B2A4A]">
                {formatCurrency(champion.totalSalesAmount)}
              </div>
              <div className="text-[11px] font-bold text-[#1B2A4A]/80">
                {champion.unitsSold} units
              </div>
            </div>
          </div>
        )}
      </div>

      {/* COMPACT TABLE FORMAT (All 10 salespeople fit concisely) */}
      <div className="overflow-x-hidden">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#1B2A4A] text-white text-[11px] font-bold uppercase tracking-wider border-b border-[#1B2A4A]">
              <th scope="col" className="w-12 py-2.5 pl-3 pr-1 text-center">
                Rank
              </th>
              <th scope="col" className="w-auto py-2.5 px-2 text-left">
                Salesperson
              </th>
              <th scope="col" className="w-20 py-2.5 px-2 text-right">
                <button
                  id="sort-units-btn"
                  onClick={() => onToggleSort('units')}
                  className={`inline-flex items-center gap-1 font-bold transition-opacity hover:opacity-100 ${
                    sortField === 'units'
                      ? 'text-[#C9A961] underline underline-offset-4'
                      : 'text-slate-300 opacity-90'
                  }`}
                  title="Sort by units sold"
                >
                  <span>Units</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th scope="col" className="w-28 sm:w-32 py-2.5 pr-3 pl-1 text-right">
                <button
                  id="sort-amount-btn"
                  onClick={() => onToggleSort('amount')}
                  className={`inline-flex items-center gap-1 font-bold transition-opacity hover:opacity-100 ${
                    sortField === 'amount'
                      ? 'text-[#C9A961] underline underline-offset-4'
                      : 'text-slate-300 opacity-90'
                  }`}
                  title="Sort by total sales amount"
                >
                  <span>Total (S$)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB] text-xs sm:text-sm">
            {salespeoplePerformance.map((sp, idx) => {
              const isSelected = selectedSalesperson === sp.name;
              const isRank1 = sp.rank === 1 && sp.totalSalesAmount > 0;
              const isZeroSales = sp.unitsSold === 0;
              const isEven = idx % 2 === 1;

              return (
                <tr
                  key={sp.salespersonId}
                  id={`salesperson-rank-row-${sp.rank}`}
                  onClick={() => onSelectSalesperson(sp.name)}
                  className={`cursor-pointer transition-colors ${
                    isRank1
                      ? 'bg-[#C9A961]/20 hover:bg-[#C9A961]/30 font-semibold'
                      : isSelected
                      ? 'bg-[#1B2A4A]/10 hover:bg-[#1B2A4A]/15 font-semibold'
                      : isEven
                      ? 'bg-[#F5F5F5] hover:bg-[#EAEAEA]'
                      : 'bg-white hover:bg-[#F5F5F5]'
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-2.5 pl-3 pr-1 text-center align-middle">
                    {isRank1 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C9A961] text-[#1B2A4A] font-black text-xs shadow-xs">
                        #1
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-semibold ${
                          sp.rank <= 3 ? 'text-[#1B2A4A] font-bold' : 'text-[#666666]'
                        }`}
                      >
                        #{sp.rank}
                      </span>
                    )}
                  </td>

                  {/* Name Column */}
                  <td className="py-2.5 px-2 align-middle text-[#333333]">
                    <div className="flex items-center gap-1.5 flex-wrap truncate">
                      <span
                        className={`truncate text-xs sm:text-sm ${
                          isRank1
                            ? 'text-[#1B2A4A] font-bold'
                            : isSelected
                            ? 'text-[#1B2A4A] font-bold'
                            : isZeroSales
                            ? 'text-[#777777]'
                            : 'text-[#333333] font-medium'
                        }`}
                      >
                        {sp.name}
                      </span>
                      {isRank1 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-[#C9A961] text-[#1B2A4A] px-1.5 py-0.2 rounded shrink-0">
                          <Crown className="w-2.5 h-2.5" />
                          Top
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[10px] font-bold bg-[#1B2A4A] text-white px-1.5 py-0.2 rounded shrink-0">
                          Filtered
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Units Column */}
                  <td className="py-2.5 px-2 text-right align-middle text-[#333333]">
                    <span
                      className={`text-xs font-medium ${
                        isZeroSales ? 'text-[#888888]' : 'text-[#333333] font-semibold'
                      }`}
                    >
                      {sp.unitsSold} <span className="text-[11px] text-[#666666]">u</span>
                    </span>
                  </td>

                  {/* Amount Column */}
                  <td className="py-2.5 pr-3 pl-1 text-right align-middle font-mono">
                    <div
                      className={`text-xs sm:text-sm tracking-tight font-bold ${
                        isRank1
                          ? 'text-[#1B2A4A] font-extrabold'
                          : isZeroSales
                          ? 'text-[#888888] font-normal'
                          : 'text-[#333333]'
                      }`}
                    >
                      {sp.totalSalesAmount > 0
                        ? formatCurrency(sp.totalSalesAmount)
                        : 'S$0'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Helper */}
      <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
        <span>
          10 salespeople (7 active with sales today, 3 at S$0)
        </span>
        {selectedSalesperson && (
          <button
            onClick={onClearFilter}
            className="text-xs text-[#1B2A4A] font-bold underline hover:opacity-80 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filter
          </button>
        )}
      </div>
    </section>
  );
};
