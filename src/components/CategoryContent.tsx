import React from 'react';
import { MarketCategory, MarketAsset, EconomicIndicator } from '../types';
import { CATEGORY_ASSETS, ECONOMIC_CALENDAR } from '../data/marketData';
import { TrendingUp, TrendingDown, Calendar, Bookmark, Check, ArrowUpRight } from 'lucide-react';

interface CategoryContentProps {
  category: MarketCategory;
  onSelectAsset: (asset: MarketAsset) => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
  isDark?: boolean;
}

export const CategoryContent: React.FC<CategoryContentProps> = ({
  category,
  onSelectAsset,
  onToggleWatchlist,
  isWatchlisted,
  isDark = false
}) => {
  const assets = CATEGORY_ASSETS[category] || [];

  if (category === 'Economy') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Economic Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((asset) => {
            return (
              <div
                key={asset.symbol}
                onClick={() => onSelectAsset(asset)}
                className={`rounded-3xl p-5 border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] hover:border-blue-500/50'
                    : 'bg-white border-gray-100 shadow-xs hover:shadow-md hover:border-blue-200'
                }`}
              >
                <div className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">{asset.symbol}</div>
                <div className={`font-bold text-sm mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.name}</div>
                <div className="flex items-baseline gap-2 mt-3 font-mono">
                  <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {asset.price.toFixed(2)}
                    {asset.unit || ''}
                  </span>
                  <span className="text-xs text-gray-400 font-sans">{asset.volume}</span>
                </div>
                <div className="text-xs text-gray-400 mt-2">{asset.extraInfo}</div>
              </div>
            );
          })}
        </div>

        {/* Economic Calendar */}
        <div
          className={`rounded-3xl border p-6 transition-all ${
            isDark
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-gray-100 shadow-xs text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Global Economic Calendar
              </h3>
            </div>
            <span className="text-xs text-gray-400">Live consensus releases</span>
          </div>

          <div className={`divide-y ${isDark ? 'divide-[#2a2e39]' : 'divide-gray-50'}`}>
            {ECONOMIC_CALENDAR.map((item, idx) => (
              <div
                key={idx}
                className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-xl px-2 transition-colors ${
                  isDark ? 'hover:bg-[#131722]/60' : 'hover:bg-gray-50/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.impact === 'high'
                            ? isDark
                              ? 'bg-rose-950/40 text-rose-400'
                              : 'bg-rose-50 text-rose-600'
                            : item.impact === 'medium'
                            ? isDark
                              ? 'bg-amber-950/40 text-amber-400'
                              : 'bg-amber-50 text-amber-600'
                            : isDark
                            ? 'bg-gray-800 text-gray-400'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right self-end md:self-center">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Actual</span>
                    <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.current}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Forecast</span>
                    <span className="font-mono text-gray-400 font-medium">{item.forecast}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Previous</span>
                    <span className="font-mono text-gray-500">{item.previous}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg font-medium text-[11px] ${
                    isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {item.releaseDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Category Overview Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {category} Feeds
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Streaming real-time pricing, volume dynamics, and institutional liquidity
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isDark ? 'bg-[#1e222d] text-[#787b86]' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {assets.length} Active Quotes
        </span>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          const inWatchlist = isWatchlisted(asset.symbol);

          return (
            <div
              key={asset.symbol}
              onClick={() => onSelectAsset(asset)}
              className={`rounded-3xl p-5 border transition-all cursor-pointer group flex flex-col justify-between ${
                isDark
                  ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] hover:border-blue-500/50'
                  : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold group-hover:text-blue-500 transition-colors">
                      {asset.symbol}
                    </span>
                    {asset.unit && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isDark ? 'bg-[#131722] text-[#787b86]' : 'bg-gray-50 text-gray-400'
                      }`}>
                        {asset.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">
                    {asset.name}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(asset.symbol);
                  }}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    inWatchlist
                      ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/40 dark:border-blue-600'
                      : isDark
                      ? 'border-[#2a2e39] text-[#787b86] hover:text-blue-400'
                      : 'border-gray-100 text-gray-300 hover:text-blue-600'
                  }`}
                  title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price and Percentage */}
              <div className={`mt-4 pt-3 border-t flex items-end justify-between ${
                isDark ? 'border-[#2a2e39]' : 'border-gray-50'
              }`}>
                <div>
                  <div className={`text-xl font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category === 'Crypto' && '$'}
                    {category === 'US stocks' && '$'}
                    {category === 'World stocks' && (asset.symbol.includes('.KS') ? '₩' : asset.symbol.includes('.T') ? '¥' : '$')}
                    {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-0.5">Vol: {asset.volume}</div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                      isPositive
                        ? isDark
                          ? 'bg-emerald-950/40 text-emerald-400'
                          : 'bg-emerald-50 text-emerald-600'
                        : isDark
                        ? 'bg-rose-950/40 text-rose-400'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                    24h H: {asset.high24h.toLocaleString()}
                  </div>
                </div>
              </div>

              {asset.extraInfo && (
                <div className={`mt-3 pt-2 border-t text-[11px] text-gray-400 flex items-center justify-between ${
                  isDark ? 'border-[#2a2e39]' : 'border-gray-50'
                }`}>
                  <span>{asset.extraInfo}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
