import React from 'react';
import { Crown, Target, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPsf } from '../data';
import { TownRankingItem } from '../types';

interface BottomGroupRankingSectionProps {
  townRanking: TownRankingItem[];
  selectedTown: string | null;
  latestMonth: string;
  onSelectTown: (town: string) => void;
}

export const BottomGroupRankingSection: React.FC<
  BottomGroupRankingSectionProps
> = ({ townRanking, selectedTown, latestMonth, onSelectTown }) => {
  // Limit the ranking list to show only TOP 10 towns of that day (CHANGE 3)
  const top10Towns = townRanking.slice(0, 10);
  const topTown = top10Towns[0];

  return (
    <section
      id="bottom-group-ranking-section"
      className="bg-white rounded-2xl border border-[#E5E5E5] shadow-xs overflow-hidden"
    >
      {/* Section Header */}
      <div className="p-4 sm:p-5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666666] font-medium">
                Monthly Estate Market Share (Top 10 Towns)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>Town-Level Resale Volume Ranking</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              Ranked by total monthly sales amount. Data: HDB {latestMonth || '2026-09'} monthly dataset.
            </p>
          </div>
        </div>

        {/* Top Active Town Callout Card (Deep Navy Luxury Card) */}
        {topTown && (
          <div
            id="top-town-summary"
            onClick={() => onSelectTown(topTown.town)}
            className="mt-3.5 p-3.5 rounded-xl bg-[#1B2A4A] text-white shadow-xs border border-[#142038] cursor-pointer hover:opacity-95 transition-opacity"
            title={`Filter transactions by ${topTown.town}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#C9A961] text-[#1B2A4A] font-black text-sm shadow-xs">
                  #1
                </span>
                <div>
                  <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 text-[#C9A961]" />
                    <span>Top Monthly Sales Town</span>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-white">
                    {topTown.town}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-300">
                  {topTown.units} Units Sold
                </div>
                <div className="text-base sm:text-lg font-extrabold text-[#C9A961] font-mono">
                  {formatCurrency(topTown.totalValue)}
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#C9A961]" />
                Average Price PSF:
              </span>
              <span className="font-bold text-white font-mono">
                {formatPsf(topTown.avgPsf)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Town Volume Ranking List (Top 10 towns of the day) */}
      <div className="divide-y divide-[#EBEBEB]">
        {top10Towns.map((item, idx) => {
          const rank = idx + 1;
          const isTop = rank === 1;
          const isSelected = selectedTown === item.town;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={item.town}
              id={`town-rank-row-${item.town}`}
              onClick={() => onSelectTown(item.town)}
              className={`p-3.5 sm:p-4 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1B2A4A]/8 border-l-4 border-l-[#1B2A4A]'
                  : isTop
                  ? 'bg-[#C9A961]/10 hover:bg-[#C9A961]/20 border-l-4 border-l-[#C9A961]'
                  : isEven
                  ? 'bg-[#FAFAFA] hover:bg-[#F0F0F0]'
                  : 'bg-white hover:bg-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                      isTop
                        ? 'bg-[#C9A961] text-[#1B2A4A] shadow-xs'
                        : isSelected
                        ? 'bg-[#1B2A4A] text-white shadow-xs'
                        : 'bg-[#E5E5E5] text-[#333333]'
                    }`}
                  >
                    #{rank}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4
                        className={`text-sm sm:text-base font-bold ${
                          isSelected
                            ? 'text-[#1B2A4A] font-extrabold'
                            : 'text-[#333333]'
                        }`}
                      >
                        {item.town}
                      </h4>
                      {isTop && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-[#C9A961] text-[#1B2A4A] px-1.5 py-0.2 rounded uppercase tracking-wider">
                          Market Leader
                        </span>
                      )}
                      {isSelected && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-[#1B2A4A] text-white px-1.5 py-0.2 rounded uppercase tracking-wider">
                          Filtered
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#666666] font-mono">
                      Avg: {formatPsf(item.avgPsf)}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-[#777777] font-medium">
                    <strong className="text-[#1B2A4A] font-bold">
                      {item.units}
                    </strong>{' '}
                    {item.units === 1 ? 'unit' : 'units'}
                  </div>
                  <div
                    className={`text-sm sm:text-base font-extrabold font-mono ${
                      isSelected ? 'text-[#1B2A4A]' : 'text-[#333333]'
                    }`}
                  >
                    {formatCurrency(item.totalValue)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
