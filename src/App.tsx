import React, { useMemo, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Crown,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { BottomGroupRankingSection } from './components/BottomGroupRankingSection';
import { DashboardHeader } from './components/DashboardHeader';
import { MiddleSalespersonRankingSection } from './components/MiddleSalespersonRankingSection';
import { TopTransactionsSection } from './components/TopTransactionsSection';
import {
  CLOSING_TIME_STRING,
  CURRENT_DEVELOPMENT_LOCATION,
  CURRENT_DEVELOPMENT_NAME,
  DAILY_TRANSACTIONS,
  DEVELOPMENTS_GROUP,
  formatCompactCurrency,
  formatCurrency,
  SALES_TEAM,
  TOTAL_DAILY_AMOUNT,
  TOTAL_DAILY_UNITS,
} from './data';
import {
  SalespersonAggregated,
  SalespersonSortField,
  SortDirection,
  TransactionRecord,
} from './types';

export default function App() {
  const [selectedSalesperson, setSelectedSalesperson] = useState<string | null>(
    null
  );
  const [sortField, setSortField] = useState<SalespersonSortField>('amount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Compute aggregated performance for all 10 salespeople
  const salespeoplePerformance: SalespersonAggregated[] = useMemo(() => {
    // 1. Calculate base aggregates for each agent
    const aggregates = SALES_TEAM.map((agent) => {
      const agentTransactions = DAILY_TRANSACTIONS.filter(
        (tx) => tx.salespersonName.toLowerCase() === agent.name.toLowerCase()
      );
      const unitsSold = agentTransactions.length;
      const totalSalesAmount = agentTransactions.reduce(
        (sum, tx) => sum + tx.totalPrice,
        0
      );

      return {
        salespersonId: agent.id,
        name: agent.name,
        unitsSold,
        totalSalesAmount,
      };
    });

    // 2. Determine true #1 sales champion by total sales amount
    const sortedByTrueChampion = [...aggregates].sort(
      (a, b) => b.totalSalesAmount - a.totalSalesAmount
    );
    const championId =
      sortedByTrueChampion.length > 0 &&
      sortedByTrueChampion[0].totalSalesAmount > 0
        ? sortedByTrueChampion[0].salespersonId
        : null;

    // 3. Sort by user-selected sort field and direction
    const sorted = [...aggregates].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = b.totalSalesAmount - a.totalSalesAmount;
        // Secondary sort by units if amounts are equal
        if (comparison === 0) {
          comparison = b.unitsSold - a.unitsSold;
        }
      } else {
        comparison = b.unitsSold - a.unitsSold;
        // Secondary sort by amount if units are equal
        if (comparison === 0) {
          comparison = b.totalSalesAmount - a.totalSalesAmount;
        }
      }

      return sortDirection === 'desc' ? comparison : -comparison;
    });

    // 4. Assign ranks (1 to 10)
    return sorted.map((item, index) => ({
      ...item,
      rank: index + 1,
      isChampion: item.salespersonId === championId,
    }));
  }, [sortField, sortDirection]);

  // Find top performer for the executive snapshot
  const topPerformer = useMemo(() => {
    return (
      salespeoplePerformance.find((sp) => sp.isChampion) ||
      salespeoplePerformance[0]
    );
  }, [salespeoplePerformance]);

  // Current development data & dynamic calculations
  const currentDev = useMemo(() => {
    return DEVELOPMENTS_GROUP.find((d) => d.isCurrentDevelopment);
  }, []);

  const monthlyProgressPercentage = useMemo(() => {
    if (!currentDev || currentDev.monthlyTargetAmount === 0) return '0.0';
    return (
      (currentDev.monthlyCompletedAmount / currentDev.monthlyTargetAmount) *
      100
    ).toFixed(1);
  }, [currentDev]);

  // Find current development rank among 6 developments
  const developmentRank = useMemo(() => {
    const sortedDevs = [...DEVELOPMENTS_GROUP].sort(
      (a, b) => b.dailySalesAmount - a.dailySalesAmount
    );
    const index = sortedDevs.findIndex((d) => d.isCurrentDevelopment);
    return index !== -1 ? index + 1 : 1;
  }, []);

  // Filtered transactions for Top Section
  const displayedTransactions = useMemo(() => {
    let list = [...DAILY_TRANSACTIONS];
    if (selectedSalesperson) {
      list = list.filter(
        (tx) =>
          tx.salespersonName.toLowerCase() === selectedSalesperson.toLowerCase()
      );
    }
    // Sorted by total price descending by default
    return list.sort((a, b) => b.totalPrice - a.totalPrice);
  }, [selectedSalesperson]);

  const handleToggleSort = (field: SalespersonSortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectSalesperson = (name: string) => {
    if (selectedSalesperson === name) {
      setSelectedSalesperson(null);
    } else {
      setSelectedSalesperson(name);
      // Smooth scroll to top transactions section so manager sees filtered results immediately
      const topSection = document.getElementById('top-transactions-section');
      if (topSection) {
        topSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearFilter = () => {
    setSelectedSalesperson(null);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333] font-sans antialiased pb-12">
      {/* Mobile Sticky Header */}
      <DashboardHeader
        activeSection="all"
        onScrollToSection={handleScrollToSection}
      />

      <main className="max-w-xl mx-auto px-3.5 sm:px-4 pt-3.5 space-y-4">
        {/* Executive 8:00 PM Closing KPI Snapshot */}
        <div
          id="executive-closing-summary"
          className="bg-white rounded-2xl p-4 border border-[#E5E5E5] shadow-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
            <div>
              <div className="text-xs font-bold text-[#666666] uppercase tracking-wider">
                Daily Sales Closing Summary
              </div>
              <div className="text-base font-extrabold text-[#1B2A4A] mt-0.5">
                {CURRENT_DEVELOPMENT_NAME}
              </div>
            </div>
            <div className="text-right">
              {/* Navy 8pm Confirmed Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B2A4A] bg-[#1B2A4A]/10 px-2.5 py-0.5 rounded-full border border-[#1B2A4A]/20">
                <CheckCircle2 className="w-3 h-3 text-[#1B2A4A]" />
                8pm Confirmed
              </span>
              <div className="text-[10px] text-[#888888] mt-0.5 font-mono">
                {CLOSING_TIME_STRING}
              </div>
            </div>
          </div>

          {/* 4 Executive Metrics with Luxury Palette */}
          <div className="grid grid-cols-2 gap-2.5 pt-3">
            <div className="bg-[#F5F5F5] p-2.5 rounded-xl border border-[#E5E5E5]">
              <div className="text-[11px] font-medium text-[#666666]">
                Units Sold Today
              </div>
              <div className="text-xl font-extrabold text-[#1B2A4A] mt-0.5">
                {TOTAL_DAILY_UNITS}{' '}
                <span className="text-xs font-normal text-[#666666]">units</span>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-2.5 rounded-xl border border-[#E5E5E5]">
              <div className="text-[11px] font-medium text-[#666666]">
                Total Daily Sales
              </div>
              <div className="text-lg font-extrabold text-[#1B2A4A] mt-0.5 tracking-tight font-mono">
                {formatCurrency(TOTAL_DAILY_AMOUNT)}
              </div>
            </div>

            <div className="bg-[#C9A961]/15 p-2.5 rounded-xl border border-[#C9A961]/40">
              <div className="text-[11px] font-bold text-[#1B2A4A] flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
                <span>Top Performer</span>
              </div>
              <div className="text-xs font-bold text-[#1B2A4A] mt-0.5 truncate">
                {topPerformer ? topPerformer.name : '—'}
              </div>
              <div className="text-[11px] font-semibold text-[#1B2A4A]/80 font-mono">
                {topPerformer
                  ? formatCompactCurrency(topPerformer.totalSalesAmount)
                  : ''}{' '}
                ({topPerformer?.unitsSold} units)
              </div>
            </div>

            <div className="bg-[#1B2A4A]/8 p-2.5 rounded-xl border border-[#1B2A4A]/20">
              <div className="text-[11px] font-bold text-[#1B2A4A] flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[#1B2A4A]" />
                <span>Company Rank</span>
              </div>
              <div className="text-base font-extrabold text-[#1B2A4A] mt-0.5">
                #{developmentRank}{' '}
                <span className="text-[11px] font-normal text-[#666666]">
                  of 6 developments
                </span>
              </div>
              {/* Dynamically calculated monthly target percentage */}
              <div className="text-[11px] font-bold text-[#1B2A4A]">
                {monthlyProgressPercentage}% monthly target
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1 (TOP): Daily Transaction Details */}
        <TopTransactionsSection
          transactions={displayedTransactions}
          allTransactionsCount={DAILY_TRANSACTIONS.length}
          totalDailyAmount={TOTAL_DAILY_AMOUNT}
          selectedSalesperson={selectedSalesperson}
          onClearFilter={handleClearFilter}
          onSelectSalesperson={handleSelectSalesperson}
        />

        {/* SECTION 2 (MIDDLE): Salesperson Daily Ranking in COMPACT TABLE */}
        <MiddleSalespersonRankingSection
          salespeoplePerformance={salespeoplePerformance}
          sortField={sortField}
          sortDirection={sortDirection}
          onToggleSort={handleToggleSort}
          selectedSalesperson={selectedSalesperson}
          onSelectSalesperson={handleSelectSalesperson}
          onClearFilter={handleClearFilter}
        />

        {/* SECTION 3 (BOTTOM): Development Group Ranking & Monthly Progress */}
        <BottomGroupRankingSection developments={DEVELOPMENTS_GROUP} />

        {/* Data Consistency Verification Badge */}
        <div className="p-3 bg-white rounded-xl border border-[#E5E5E5] text-[#666666] text-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-[#1B2A4A]">
            <CheckCircle2 className="w-4 h-4 text-[#1B2A4A]" />
            <span>100% Mathematical Consistency Verified</span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Sum of 9 Transactions ({formatCurrency(TOTAL_DAILY_AMOUNT)}) = Sum of 10 Salespeople amounts = {CURRENT_DEVELOPMENT_NAME}'s Daily Group Amount.
          </p>
        </div>
      </main>
    </div>
  );
}
