import React from 'react';
import { Building2, Landmark } from 'lucide-react';

interface DashboardHeaderProps {
  latestMonth?: string;
  onScrollToSection: (sectionId: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  latestMonth,
  onScrollToSection,
}) => {
  return (
    <header
      id="dashboard-header"
      className="bg-white border-b border-[#E5E5E5] sticky top-0 z-30 shadow-xs"
    >
      <div className="max-w-xl mx-auto px-4 py-3">
        {/* Top Status Line */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B2A4A] text-[#C9A961] flex items-center justify-center font-bold text-base shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1B2A4A] leading-tight">
                HDB Resale Market Dashboard
              </h1>
              <p className="text-[11px] text-[#666666] font-medium leading-none mt-0.5">
                Multi-Branch Property Agency Management
              </p>
            </div>
          </div>

          {/* Real-time Status Badge with Navy Styling */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse"></span>
            <span>{latestMonth ? `Simulated Day within ${latestMonth}` : 'Official Open Data'}</span>
          </div>
        </div>

        {/* Section Quick Jump Navigation (Transactions & Town Rankings) */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#F0F0F0]">
          <button
            id="nav-top-section"
            onClick={() => onScrollToSection('top-transactions-section')}
            className="flex-1 text-center py-1.5 px-2 rounded-lg text-xs font-semibold bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1B2A4A] transition-colors shrink-0"
          >
            1. Transactions
          </button>
          <button
            id="nav-bottom-section"
            onClick={() => onScrollToSection('bottom-group-ranking-section')}
            className="flex-1 text-center py-1.5 px-2 rounded-lg text-xs font-semibold bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1B2A4A] transition-colors shrink-0"
          >
            2. Town Rankings
          </button>
        </div>
      </div>
    </header>
  );
};
