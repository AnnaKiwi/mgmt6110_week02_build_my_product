import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Crown,
  Info,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { BottomGroupRankingSection } from './components/BottomGroupRankingSection';
import { DashboardHeader } from './components/DashboardHeader';
import { TopTransactionsSection } from './components/TopTransactionsSection';
import {
  formatCompactCurrency,
  formatCurrency,
  formatPsf,
} from './data';
import { HdbApiResponse, ViewState } from './types';

export default function App() {
  const [data, setData] = useState<HdbApiResponse | null>(null);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedTown, setSelectedTown] = useState<string | null>(null);

  const fetchHdbData = useCallback(async (town: string | null) => {
    setViewState('loading');
    setErrorMessage('');

    try {
      const url = town ? `/api/hdb?town=${encodeURIComponent(town)}` : '/api/hdb';
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 502 || res.status === 503 || res.status === 504) {
          setViewState('unreachable');
          setErrorMessage(
            'Market data source cannot be reached at this moment. Please try again.'
          );
          return;
        }

        let errPayload: any = null;
        try {
          errPayload = await res.json();
        } catch {
          // ignore
        }

        if (errPayload?.errorType === 'unreachable') {
          setViewState('unreachable');
          setErrorMessage(
            'Market data source cannot be reached at this moment. Please try again.'
          );
        } else if (errPayload?.errorType === 'empty') {
          setViewState('empty');
          setErrorMessage(
            'No matching HDB resale records found. Try selecting a different town or month.'
          );
        } else {
          setViewState('rejected');
          setErrorMessage(
            'External data service rejected request, please retry later.'
          );
        }
        return;
      }

      const json: HdbApiResponse = await res.json();

      if (!json.success && json.error) {
        if (json.errorType === 'unreachable') {
          setViewState('unreachable');
          setErrorMessage(
            'Market data source cannot be reached at this moment. Please try again.'
          );
        } else if (json.errorType === 'empty') {
          setViewState('empty');
          setErrorMessage(
            'No matching HDB resale records found. Try selecting a different town or month.'
          );
        } else {
          setViewState('rejected');
          setErrorMessage(
            'External data service rejected request, please retry later.'
          );
        }
        return;
      }

      if (!json.records || (json.records.length === 0 && json.totalUnits === 0)) {
        setViewState('empty');
        setErrorMessage(
          'No matching HDB resale records found. Try selecting a different town or month.'
        );
        setData(json);
        return;
      }

      setData(json);
      setViewState('success');
    } catch (err: any) {
      setViewState('unreachable');
      setErrorMessage(
        'Market data source cannot be reached at this moment. Please try again.'
      );
    }
  }, []);

  useEffect(() => {
    fetchHdbData(selectedTown);
  }, [fetchHdbData, selectedTown]);

  const handleSelectTown = (town: string) => {
    if (selectedTown?.toUpperCase() === town.toUpperCase()) {
      setSelectedTown(null);
    } else {
      setSelectedTown(town);
      const topSection = document.getElementById('top-transactions-section');
      if (topSection) {
        topSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearFilter = () => {
    setSelectedTown(null);
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
        latestMonth={data?.month}
        onScrollToSection={handleScrollToSection}
      />

      <main className="max-w-xl mx-auto px-3.5 sm:px-4 pt-3.5 space-y-4">
        {/* State A: Loading State */}
        {viewState === 'loading' && (
          <div
            id="loading-state-card"
            className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-xs text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#1B2A4A]/10 text-[#1B2A4A] mx-auto flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin text-[#1B2A4A]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B2A4A]">
                Synchronizing Market Data
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-sm mx-auto leading-relaxed">
                Loading Singapore HDB resale market statistics for agency management…
              </p>
            </div>
          </div>
        )}

        {/* State B: Empty Dataset State */}
        {viewState === 'empty' && (
          <div
            id="empty-state-card"
            className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-xs text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#C9A961]/20 text-[#1B2A4A] mx-auto flex items-center justify-center">
              <Info className="w-6 h-6 text-[#C9A961]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B2A4A]">
                No Resale Records
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-sm mx-auto leading-relaxed">
                {errorMessage ||
                  'No matching HDB resale records found. Try selecting a different town or month.'}
              </p>
            </div>
            {selectedTown && (
              <button
                onClick={handleClearFilter}
                className="mt-2 text-xs font-bold text-white bg-[#1B2A4A] px-4 py-2 rounded-lg hover:bg-[#142038] transition-colors"
              >
                Clear Town Filter ({selectedTown})
              </button>
            )}
          </div>
        )}

        {/* State C: Upstream Service Rejected Request */}
        {viewState === 'rejected' && (
          <div
            id="rejected-state-card"
            className="bg-white rounded-2xl p-6 border border-red-200 shadow-xs text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B2A4A]">
                Service Request Rejected
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-sm mx-auto leading-relaxed">
                {errorMessage ||
                  'External data service rejected request, please retry later.'}
              </p>
            </div>
            <button
              onClick={() => fetchHdbData(selectedTown)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B2A4A] px-4 py-2 rounded-lg hover:bg-[#142038] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Request</span>
            </button>
          </div>
        )}

        {/* State D: Upstream Unreachable */}
        {viewState === 'unreachable' && (
          <div
            id="unreachable-state-card"
            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B2A4A]">
                Source Unreachable
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-sm mx-auto leading-relaxed">
                {errorMessage ||
                  'Market data source cannot be reached at this moment. Please try again.'}
              </p>
            </div>
            <button
              onClick={() => fetchHdbData(selectedTown)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B2A4A] px-4 py-2 rounded-lg hover:bg-[#142038] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reconnect Now</span>
            </button>
          </div>
        )}

        {/* Primary Content: KPI Cards and Sections (Rendered when data is loaded) */}
        {data && (
          <>
            {/* Executive HDB Market KPI Snapshot (Computed from the simulated day subset - CHANGE 4) */}
            <div
              id="executive-closing-summary"
              className="bg-white rounded-2xl p-4 border border-[#E5E5E5] shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <div className="text-xs font-bold text-[#666666] uppercase tracking-wider">
                    Singapore HDB Resale Daily Market Overview
                  </div>
                  <div className="text-base font-extrabold text-[#1B2A4A] mt-0.5">
                    Multi-Branch Estate Allocation
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B2A4A] bg-[#1B2A4A]/10 px-2.5 py-0.5 rounded-full border border-[#1B2A4A]/20">
                    <Calendar className="w-3 h-3 text-[#1B2A4A]" />
                    Simulated Daily Closing
                  </span>
                  <div className="text-[10px] text-[#888888] mt-0.5 font-mono">
                    Dataset: {data.month || '2026-09'}
                  </div>
                </div>
              </div>

              {/* 4 Computed Market Metrics derived strictly from the simulated single day records */}
              <div className="grid grid-cols-2 gap-2.5 pt-3">
                {/* 1. Daily Total Sold Units */}
                <div className="bg-[#F5F5F5] p-2.5 rounded-xl border border-[#E5E5E5]">
                  <div className="text-[11px] font-medium text-[#666666]">
                    Daily Total Sold Units
                  </div>
                  <div className="text-xl font-extrabold text-[#1B2A4A] mt-0.5 font-mono">
                    {data.totalUnits.toLocaleString('en-SG')}{' '}
                    <span className="text-xs font-normal text-[#666666] font-sans">
                      units
                    </span>
                  </div>
                </div>

                {/* 2. Daily Total Transaction Value */}
                <div className="bg-[#F5F5F5] p-2.5 rounded-xl border border-[#E5E5E5]">
                  <div className="text-[11px] font-medium text-[#666666]">
                    Daily Transaction Value
                  </div>
                  <div className="text-lg font-extrabold text-[#1B2A4A] mt-0.5 tracking-tight font-mono">
                    {formatCompactCurrency(data.totalValue)}
                  </div>
                  <div className="text-[10px] text-[#777777] font-mono">
                    {formatCurrency(data.totalValue)}
                  </div>
                </div>

                {/* 3. Average psf Price */}
                <div className="bg-[#C9A961]/15 p-2.5 rounded-xl border border-[#C9A961]/40">
                  <div className="text-[11px] font-bold text-[#1B2A4A] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>Average Price PSF</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#1B2A4A] mt-0.5 font-mono">
                    {formatPsf(data.avgPsf)}
                  </div>
                  <div className="text-[10px] text-[#1B2A4A]/80 font-medium">
                    Daily volume weighted
                  </div>
                </div>

                {/* 4. Top Daily Sales Town */}
                <div className="bg-[#1B2A4A]/8 p-2.5 rounded-xl border border-[#1B2A4A]/20">
                  <div className="text-[11px] font-bold text-[#1B2A4A] flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-[#1B2A4A]" />
                    <span>Top Daily Sales Town</span>
                  </div>
                  <div className="text-base font-extrabold text-[#1B2A4A] mt-0.5 truncate">
                    {data.mostActiveTown}
                  </div>
                  <div className="text-[11px] font-semibold text-[#1B2A4A]/80 font-mono">
                    {data.townRanking?.[0]?.units || 0} units (
                    {formatCompactCurrency(data.townRanking?.[0]?.totalValue || 0)})
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 1 (TOP): Simulated Daily HDB Resale Records (CHANGE 2) */}
            <TopTransactionsSection
              transactions={data.records}
              allTransactionsCount={data.totalUnits}
              totalMarketAmount={data.totalValue}
              selectedTown={selectedTown}
              latestMonth={data.month}
              onClearFilter={handleClearFilter}
              onSelectTown={handleSelectTown}
            />

            {/* SECTION 2 (BOTTOM): Town-Level Resale Volume Ranking - Top 10 by Daily Sales (CHANGE 3) */}
            <BottomGroupRankingSection
              townRanking={data.townRanking}
              selectedTown={selectedTown}
              latestMonth={data.month}
              onSelectTown={handleSelectTown}
            />

            {/* Mandatory Footer Licence Attribution Text */}
            <footer
              id="dashboard-footer-attribution"
              className="p-3.5 bg-white rounded-xl border border-[#E5E5E5] text-[#666666] text-xs text-center space-y-1"
            >
              <div className="flex items-center justify-center gap-1.5 font-semibold text-[#1B2A4A]">
                <CheckCircle2 className="w-4 h-4 text-[#1B2A4A]" />
                <span>Singapore Public Housing Open Data</span>
              </div>
              <p className="text-[11px] text-[#777777] leading-normal">
                Data source: Singapore HDB Resale Price data via data.gov.sg (Singapore Open Data Licence).
              </p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
