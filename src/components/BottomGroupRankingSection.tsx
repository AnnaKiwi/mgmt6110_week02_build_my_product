import React from 'react';
import {
  Building,
  Flag,
  Target,
} from 'lucide-react';
import { formatCompactCurrency, formatCurrency } from '../data';
import { DevelopmentRecord } from '../types';

interface BottomGroupRankingSectionProps {
  developments: DevelopmentRecord[];
}

export const BottomGroupRankingSection: React.FC<
  BottomGroupRankingSectionProps
> = ({ developments }) => {
  // Sort developments by daily sales amount highest to lowest
  const sortedDevelopments = [...developments].sort(
    (a, b) => b.dailySalesAmount - a.dailySalesAmount
  );

  const managerDev = sortedDevelopments.find((d) => d.isCurrentDevelopment);
  const managerRank =
    managerDev ? sortedDevelopments.findIndex((d) => d.isCurrentDevelopment) + 1 : 0;

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
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20">
                Bottom Section
              </span>
              <span className="text-xs text-[#666666] font-medium">
                Company Benchmark (6 Developments)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-1.5 tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A961] shrink-0" />
              <span>Development Group Ranking & Monthly Progress</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              Ranked by today's closed sales amount with month-to-date target tracking.
            </p>
          </div>
        </div>

        {/* Manager's Quick Position Callout (Deep Navy Luxury Card) */}
        {managerDev && (
          <div
            id="manager-position-summary"
            className="mt-3.5 p-3.5 rounded-xl bg-[#1B2A4A] text-white shadow-xs border border-[#142038]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#C9A961] text-[#1B2A4A] font-black text-sm shadow-xs">
                  #{managerRank}
                </span>
                <div>
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                    Your Development Position Today
                  </div>
                  <div className="font-bold text-sm sm:text-base text-white">
                    {managerDev.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-300">Daily Sales</div>
                <div className="text-base sm:text-lg font-extrabold text-[#C9A961] font-mono">
                  {formatCurrency(managerDev.dailySalesAmount)}
                </div>
              </div>
            </div>

            {/* Target Remaining Callout */}
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                <span>
                  Remaining to Monthly Target:{' '}
                  <strong className="text-white font-semibold font-mono">
                    {formatCurrency(
                      managerDev.monthlyTargetAmount - managerDev.monthlyCompletedAmount
                    )}
                  </strong>
                </span>
              </div>
              <span className="font-bold text-[#C9A961] font-mono">
                {(
                  (managerDev.monthlyCompletedAmount /
                    managerDev.monthlyTargetAmount) *
                  100
                ).toFixed(1)}
                % Complete
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Development Ranking List */}
      <div className="divide-y divide-[#EBEBEB]">
        {sortedDevelopments.map((dev, idx) => {
          const rank = idx + 1;
          const isOwnDev = dev.isCurrentDevelopment;
          const isEven = idx % 2 === 1;
          const progressPercent = Math.min(
            100,
            (dev.monthlyCompletedAmount / dev.monthlyTargetAmount) * 100
          );
          const remainingAmount = dev.monthlyTargetAmount - dev.monthlyCompletedAmount;

          return (
            <div
              key={dev.id}
              id={`development-rank-row-${dev.id}`}
              className={`p-3.5 sm:p-4 transition-all ${
                isOwnDev
                  ? 'bg-[#1B2A4A]/8 border-l-4 border-l-[#1B2A4A]'
                  : isEven
                  ? 'bg-[#FAFAFA] hover:bg-[#F0F0F0]'
                  : 'bg-white hover:bg-[#F5F5F5]'
              }`}
            >
              {/* Top Row: Rank + Name + Daily Sales Amount */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                      rank === 1
                        ? 'bg-[#C9A961] text-[#1B2A4A] shadow-xs'
                        : isOwnDev
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
                          isOwnDev ? 'text-[#1B2A4A] font-extrabold' : 'text-[#333333]'
                        }`}
                      >
                        {dev.name}
                      </h4>
                      {isOwnDev && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-[#1B2A4A] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Your Team
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#666666]">{dev.location}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-[#777777] font-medium">
                    Daily Sales
                  </div>
                  <div
                    className={`text-sm sm:text-base font-extrabold font-mono ${
                      isOwnDev ? 'text-[#1B2A4A]' : 'text-[#333333]'
                    }`}
                  >
                    {formatCurrency(dev.dailySalesAmount)}
                  </div>
                </div>
              </div>

              {/* Monthly Progress Bar Section */}
              <div className="mt-3 bg-white p-2.5 rounded-xl border border-[#E5E5E5]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#555555] font-medium">
                    Monthly Target Progress
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-semibold text-[#333333]">
                      {formatCurrency(dev.monthlyCompletedAmount)} / {formatCurrency(dev.monthlyTargetAmount)}
                    </span>
                    <span className="font-bold px-1.5 py-0.5 rounded text-[11px] bg-[#1B2A4A]/10 text-[#1B2A4A]">
                      {progressPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar (Gold fill on Light Gray track #E5E5E5) */}
                <div className="w-full bg-[#E5E5E5] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#C9A961]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Subtext: How much more needed */}
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#666666]">
                  <span>
                    Need <strong className="text-[#333333] font-mono">{formatCurrency(remainingAmount)}</strong> more to reach monthly goal
                  </span>
                  <span className="text-[#888888] font-mono">
                    Target: {formatCompactCurrency(dev.monthlyTargetAmount)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
