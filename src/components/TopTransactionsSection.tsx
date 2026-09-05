import React, { useEffect, useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Crown,
  Filter,
  Sparkles,
  Target,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import {
  CURRENT_DEVELOPMENT_LOCATION,
  CURRENT_DEVELOPMENT_NAME,
  formatCompactCurrency,
  formatCurrency,
  formatPsf,
  SALES_TEAM,
} from '../data';
import { TransactionRecord } from '../types';

interface TopTransactionsSectionProps {
  transactions: TransactionRecord[];
  allTransactionsCount: number;
  totalDailyAmount: number;
  selectedSalesperson: string | null;
  onClearFilter: () => void;
  onSelectSalesperson: (name: string) => void;
}

export const TopTransactionsSection: React.FC<TopTransactionsSectionProps> = ({
  transactions,
  allTransactionsCount,
  totalDailyAmount,
  selectedSalesperson,
  onClearFilter,
  onSelectSalesperson,
}) => {
  const isFiltered = Boolean(selectedSalesperson);
  const currentUnitsCount = transactions.length;
  const currentTotalAmount = transactions.reduce(
    (sum, tx) => sum + tx.totalPrice,
    0
  );

  // Detail card expand/collapse toggle state (auto-opens when a salesperson is selected)
  const [isDetailCardExpanded, setIsDetailCardExpanded] = useState<boolean>(true);

  // Auto-expand detail card whenever a new salesperson is selected
  useEffect(() => {
    if (selectedSalesperson) {
      setIsDetailCardExpanded(true);
    }
  }, [selectedSalesperson]);

  // Find the selected salesperson data for monthly metrics
  const salespersonData = selectedSalesperson
    ? SALES_TEAM.find(
        (sp) => sp.name.toLowerCase() === selectedSalesperson.toLowerCase()
      )
    : null;

  const monthlyProgressPercent = salespersonData
    ? Math.min(
        100,
        (salespersonData.monthlyTotalAmount / salespersonData.monthlyTarget) * 100
      )
    : 0;

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
                Daily Sales Closing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>{CURRENT_DEVELOPMENT_NAME}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              {CURRENT_DEVELOPMENT_LOCATION}
            </p>
          </div>
        </div>

        {/* Filter Alert Banner */}
        {isFiltered && (
          <div className="mt-3.5 flex items-center justify-between bg-[#1B2A4A]/5 border border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl px-3 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1B2A4A] shrink-0" />
              <span>
                Filtered by:{' '}
                <strong className="font-bold text-[#1B2A4A]">{selectedSalesperson}</strong>{' '}
                ({currentUnitsCount} of {allTransactionsCount} units)
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
        <span>Daily Transaction Details</span>
        <span className="text-[#888888] font-normal normal-case text-[11px]">
          Sorted by Amount (High → Low)
        </span>
      </div>

      {/* CHANGE 2: Inline Expandable Salesperson Detail Card (Auto-opens when filtered) */}
      {isFiltered && salespersonData && (
        <div
          id="salesperson-monthly-detail-card"
          className="m-3 sm:m-4 rounded-xl border border-[#1B2A4A]/30 overflow-hidden bg-white shadow-xs transition-all"
        >
          {/* Detail Card Navy Header with Collapse/Expand Toggle */}
          <div className="bg-[#1B2A4A] text-white px-3.5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#C9A961] text-[#1B2A4A] flex items-center justify-center font-bold text-xs">
                {salespersonData.avatarInitials}
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-300">
                  Salesperson Performance Detail
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
                  {salespersonData.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="toggle-detail-card-btn"
                onClick={() => setIsDetailCardExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-slate-200 px-2 py-1 rounded transition-colors"
                title={isDetailCardExpanded ? 'Collapse card' : 'Expand card'}
              >
                <span>{isDetailCardExpanded ? 'Hide Details' : 'View Details'}</span>
                {isDetailCardExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Content Body */}
          {isDetailCardExpanded && (
            <div className="p-3.5 space-y-3 bg-[#FAFAFA]">
              {/* Today vs This Month Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Today Stats */}
                <div className="bg-white p-2.5 rounded-lg border border-[#E5E5E5]">
                  <div className="text-[11px] font-bold text-[#666666] uppercase tracking-wider">
                    Today
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs text-[#777777]">Units Sold:</span>
                    <span className="text-sm font-bold text-[#1B2A4A]">
                      {currentUnitsCount} {currentUnitsCount === 1 ? 'unit' : 'units'}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-baseline justify-between">
                    <span className="text-xs text-[#777777]">Total Amount:</span>
                    <span className="text-sm font-extrabold text-[#1B2A4A] font-mono">
                      {formatCurrency(currentTotalAmount)}
                    </span>
                  </div>
                </div>

                {/* This Month Stats */}
                <div className="bg-white p-2.5 rounded-lg border border-[#E5E5E5]">
                  <div className="text-[11px] font-bold text-[#666666] uppercase tracking-wider">
                    This Month (MTD)
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs text-[#777777]">MTD Units:</span>
                    <span className="text-sm font-bold text-[#1B2A4A]">
                      {salespersonData.monthlyUnitsSold} units
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-baseline justify-between">
                    <span className="text-xs text-[#777777]">MTD Amount:</span>
                    <span className="text-sm font-extrabold text-[#1B2A4A] font-mono">
                      {formatCurrency(salespersonData.monthlyTotalAmount)}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-baseline justify-between">
                    <span className="text-xs text-[#777777]">Team Rank:</span>
                    <span className="text-xs font-bold text-[#1B2A4A] bg-[#1B2A4A]/10 px-1.5 py-0.2 rounded">
                      #{salespersonData.monthlyRank} of 10
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Target Progress Bar */}
              <div className="bg-white p-2.5 rounded-lg border border-[#E5E5E5]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#555555] font-medium flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>Monthly Target Progress</span>
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-semibold text-[#333333]">
                      {formatCurrency(salespersonData.monthlyTotalAmount)} / {formatCurrency(salespersonData.monthlyTarget)}
                    </span>
                    <span className="font-bold px-1.5 py-0.2 rounded text-[11px] bg-[#1B2A4A]/10 text-[#1B2A4A]">
                      {monthlyProgressPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar (Gold on light gray track) */}
                <div className="w-full bg-[#E5E5E5] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#C9A961]"
                    style={{ width: `${monthlyProgressPercent}%` }}
                  />
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px] text-[#777777]">
                  <span>
                    Need <strong className="text-[#333333] font-mono">{formatCurrency(Math.max(0, salespersonData.monthlyTarget - salespersonData.monthlyTotalAmount))}</strong> more
                  </span>
                  <span>Target: {formatCompactCurrency(salespersonData.monthlyTarget)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact Data Table (5 columns: Unit | Salesperson | Area (sqft) | $psf | Amount) */}
      <div className="overflow-x-hidden">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#1B2A4A] text-white text-[11px] font-bold uppercase tracking-wider border-b border-[#1B2A4A]">
              <th scope="col" className="w-24 sm:w-28 py-2 pl-3 pr-1 text-left">
                Unit
              </th>
              <th scope="col" className="w-auto py-2 px-1 text-left">
                Salesperson
              </th>
              <th scope="col" className="w-20 sm:w-24 py-2 px-1 text-right">
                Area (sqft)
              </th>
              <th scope="col" className="w-16 sm:w-20 py-2 px-1 text-right">
                $psf
              </th>
              <th scope="col" className="w-26 sm:w-30 py-2 pr-3 pl-1 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBEB] text-[11px] sm:text-xs">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 px-3 text-center text-[#666666]">
                  <p className="font-medium text-xs">
                    No transactions recorded for this salesperson today.
                  </p>
                  <button
                    onClick={onClearFilter}
                    className="mt-2 text-xs text-[#1B2A4A] font-bold underline underline-offset-4"
                  >
                    Reset filter to see all transactions
                  </button>
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => {
                const isTopDeal = idx === 0 && !isFiltered;
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
                    {/* Unit Column (Clean unit number without overlapping badge) */}
                    <td className="py-2 pl-3 pr-1 align-middle whitespace-nowrap">
                      <span className="font-mono font-bold text-[#1B2A4A]">
                        {tx.unitNumber}
                      </span>
                    </td>

                    {/* Salesperson Column */}
                    <td className="py-2 px-1 align-middle text-[#333333] truncate">
                      <button
                        onClick={() => onSelectSalesperson(tx.salespersonName)}
                        className="text-left font-medium text-[#1B2A4A] hover:text-[#C9A961] hover:underline truncate block max-w-full"
                        title={`Filter by ${tx.salespersonName}`}
                      >
                        {tx.salespersonName}
                      </button>
                    </td>

                    {/* Area (sqft) Column */}
                    <td className="py-2 px-1 text-right align-middle text-[#666666] whitespace-nowrap font-mono">
                      {tx.areaSqft.toLocaleString('en-SG')}
                    </td>

                    {/* $psf Column */}
                    <td className="py-2 px-1 text-right align-middle text-[#666666] whitespace-nowrap font-mono">
                      ${tx.unitPricePsf.toLocaleString('en-SG')}
                    </td>

                    {/* Amount Column (Right-aligned, bold, with crown icon on Top Deal) */}
                    <td className="py-2 pr-3 pl-1 text-right align-middle font-mono font-bold text-[#1B2A4A] whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1">
                        {isTopDeal && (
                          <Crown
                            className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961] shrink-0"
                            title="Top Deal Today"
                          />
                        )}
                        <span>{formatCurrency(tx.totalPrice)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Daily Totals Summary Footer (Navy background, bold totals) */}
      <div
        id="daily-totals-summary"
        className="p-3.5 sm:p-4 bg-[#1B2A4A] text-white border-t border-[#142038]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#C9A961]" />
            <h3 className="text-[11px] sm:text-xs font-bold tracking-wide text-slate-200 uppercase">
              {isFiltered ? 'Filtered Total' : 'Daily Sales Totals (Closing Confirmed)'}
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-white/10 text-slate-200 px-2 py-0.5 rounded border border-white/20">
            8:00 PM Final
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              Total Units Sold Today
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {currentUnitsCount}{' '}
              <span className="text-xs font-normal text-slate-300">units</span>
            </div>
            {isFiltered && (
              <div className="text-[10px] text-slate-300 mt-0.5">
                of {allTransactionsCount} total team units
              </div>
            )}
          </div>

          <div className="bg-white/10 p-2.5 rounded-lg border border-white/15">
            <div className="text-[11px] text-slate-300 font-medium">
              Total Sales Amount Today
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#C9A961] mt-0.5 tracking-tight font-mono">
              {formatCurrency(currentTotalAmount)}
            </div>
            {isFiltered && (
              <div className="text-[10px] text-slate-300 mt-0.5 font-mono">
                Total dev: {formatCurrency(totalDailyAmount)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
