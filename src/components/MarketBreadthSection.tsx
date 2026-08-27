import React from 'react';
import { SECTOR_PERFORMANCE_DATA } from '../data/marketData';
import {
  Gauge,
  Activity,
  Flame,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';

interface MarketBreadthSectionProps {
  isDark?: boolean;
}

export const MarketBreadthSection: React.FC<MarketBreadthSectionProps> = ({ isDark = false }) => {
  const fearGreedScore = 68; // Greed
  const advancingCount = 342;
  const decliningCount = 158;
  const advancePercent = ((advancingCount / (advancingCount + decliningCount)) * 100).toFixed(0);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Market Intelligence & Breadth
            </h2>
            <p className={`text-xs ${isDark ? 'text-[#787b86]' : 'text-gray-500'}`}>
              Institutional sentiment, advance/decline breadth, volatility regime, and sector map
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isDark ? 'bg-[#1e222d] text-emerald-400' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          ● Risk-On Regime
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Fear & Greed Index Gauge */}
        <div
          className={`rounded-3xl p-6 border transition-all ${
            isDark
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-gray-100 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" /> Fear & Greed Index
            </span>
            <span className="text-xs font-mono font-bold text-emerald-500">Greed</span>
          </div>

          <div className="flex flex-col items-center justify-center my-3">
            <div className="relative flex items-center justify-center">
              {/* Semi-circular gauge visual */}
              <div className="text-center">
                <span
                  className={`text-5xl font-black font-mono tracking-tighter ${
                    fearGreedScore > 60 ? 'text-emerald-500' : 'text-amber-500'
                  }`}
                >
                  {fearGreedScore}
                </span>
                <span className="block text-xs font-bold text-gray-400 uppercase mt-1">
                  Greed
                </span>
              </div>
            </div>

            {/* Range Bar */}
            <div className="w-full mt-4 space-y-1.5">
              <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-md rounded-full -ml-0.5"
                  style={{ left: `${fearGreedScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>Extreme Fear (0)</span>
                <span>Neutral (50)</span>
                <span>Extreme Greed (100)</span>
              </div>
            </div>
          </div>

          {/* Historical comparison metrics */}
          <div
            className={`grid grid-cols-3 gap-2 pt-4 mt-4 border-t text-center text-xs ${
              isDark ? 'border-[#2a2e39]' : 'border-gray-100'
            }`}
          >
            <div>
              <span className="text-[11px] text-gray-400 block">Previous Close</span>
              <span className="font-bold text-emerald-500">64 (Greed)</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">1 Week Ago</span>
              <span className="font-bold text-emerald-500">58 (Greed)</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">1 Month Ago</span>
              <span className="font-bold text-amber-500">42 (Fear)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Advance / Decline Breadth & Volatility Pulse */}
        <div
          className={`rounded-3xl p-6 border transition-all ${
            isDark
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-gray-100 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-500" /> Market Breadth & VIX
            </span>
            <span className="text-xs font-mono font-bold text-blue-500">NYSE & NASDAQ</span>
          </div>

          <div className="space-y-4">
            {/* Advance / Decline Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Advancing: {advancingCount}
                </span>
                <span className="text-rose-500 flex items-center gap-1">
                  Declining: {decliningCount} <TrendingDown className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-rose-500/20 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-l-full"
                  style={{ width: `${advancePercent}%` }}
                />
                <div
                  className="h-full bg-rose-500 transition-all duration-500 rounded-r-full"
                  style={{ width: `${100 - Number(advancePercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-center font-mono">
                {advancePercent}% Net Advancing Ratio • Strong Market Breadth
              </p>
            </div>

            {/* VIX Volatility Thermometer */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div>
                <span className="text-[11px] text-gray-400 font-bold uppercase block">
                  CBOE Volatility (VIX)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-extrabold font-mono text-emerald-500">14.65</span>
                  <span className="text-xs font-semibold text-emerald-500">-0.48 (-3.17%)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  Low Volatility
                </span>
                <span className="block text-[10px] text-gray-400 mt-1">Calm Equity Environment</span>
              </div>
            </div>

            {/* 52-Week Highs vs Lows */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="text-gray-400 block text-[11px]">New 52W Highs</span>
                <span className="font-bold text-emerald-500">68 Stocks</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block text-[11px]">New 52W Lows</span>
                <span className="font-bold text-rose-500">4 Stocks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Sector Performance Heatmap Summary */}
        <div
          className={`rounded-3xl p-6 border transition-all ${
            isDark
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-gray-100 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-500" /> S&P 500 Sector Heatmap
            </span>
            <span className="text-xs font-mono font-bold text-purple-500">11 Sectors</span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
            {SECTOR_PERFORMANCE_DATA.map((sector) => {
              const isPos = sector.changePercent >= 0;
              return (
                <div
                  key={sector.name}
                  className={`p-2.5 rounded-xl border transition-all cursor-default ${
                    isDark
                      ? isPos
                        ? 'bg-emerald-950/20 border-emerald-800/30'
                        : 'bg-rose-950/20 border-rose-800/30'
                      : isPos
                      ? 'bg-emerald-50/70 border-emerald-100'
                      : 'bg-rose-50/70 border-rose-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[90px]">{sector.name}</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        isPos ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isPos ? '+' : ''}
                      {sector.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">
                    {sector.topContributor}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
