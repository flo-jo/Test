import React from 'react';
import { MarketIndex } from '../types';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

interface IndicesSectionProps {
  indices: MarketIndex[];
  selectedIndexId: string;
  onSelectIndex: (id: string) => void;
  onViewAllIndices: () => void;
  isDark?: boolean;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  selectedIndexId,
  onSelectIndex,
  onViewAllIndices,
  isDark = false
}) => {
  return (
    <section data-purpose="indices-section" className="mb-10">
      {/* Indices Section Title */}
      <div
        id="indices-section-header"
        onClick={onViewAllIndices}
        className="flex items-center justify-between mb-6 group cursor-pointer w-max select-none"
      >
        <h2
          className={`text-3xl font-bold tracking-tight transition-colors flex items-center gap-1 ${
            isDark
              ? 'text-white group-hover:text-blue-400'
              : 'text-gray-900 group-hover:text-blue-600'
          }`}
        >
          <span>Indices</span>
          <svg
            className={`w-6 h-6 transition-colors ${
              isDark
                ? 'text-white group-hover:text-blue-400'
                : 'text-gray-900 group-hover:text-blue-600'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </h2>
      </div>

      {/* Indices 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indices.map((index) => {
          const isSelected = selectedIndexId === index.id;
          const isPositive = index.changePercent >= 0;

          return (
            <div
              key={index.id}
              id={`index-card-${index.id}`}
              onClick={() => onSelectIndex(index.id)}
              className={`rounded-2xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-[#1e222d] ring-2 ring-blue-500/40 border border-blue-500/50 shadow-md'
                    : 'bg-gray-100 ring-2 ring-blue-500/20 shadow-xs'
                  : isDark
                  ? 'bg-[#1e222d]/60 hover:bg-[#1e222d] border border-[#2a2e39]'
                  : 'bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200 shadow-2xs'
              }`}
              data-purpose="index-card"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${index.badgeColor} flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0`}
                >
                  {index.badgeNumber}
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{index.name}</span>
                    <span className="text-xs text-gray-400 font-mono font-normal">{index.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <span className={`font-mono font-medium ${isDark ? 'text-[#d1d4dc]' : 'text-gray-700'}`}>
                      {index.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span
                      className={`inline-flex items-center font-mono font-bold ${
                        isPositive ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {index.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Day High and Chevron */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-gray-400">Day High</div>
                  <div className="text-xs font-mono font-medium text-emerald-500">{index.high.toLocaleString()}</div>
                </div>
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected
                      ? isDark
                        ? 'bg-[#2a2e39] text-blue-400'
                        : 'bg-white text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
