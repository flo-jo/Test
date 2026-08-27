import React from 'react';
import { MarketCategory, MarketAsset, EconomicIndicator } from '../types';
import { CATEGORY_ASSETS, ECONOMIC_CALENDAR } from '../data/marketData';
import { TrendingUp, TrendingDown, ArrowUpRight, Calendar, AlertCircle, Bookmark, Check, ShieldAlert } from 'lucide-react';

interface CategoryContentProps {
  category: MarketCategory;
  onSelectAsset: (asset: MarketAsset) => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
}

export const CategoryContent: React.FC<CategoryContentProps> = ({
  category,
  onSelectAsset,
  onToggleWatchlist,
  isWatchlisted
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
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
              >
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{asset.symbol}</div>
                <div className="font-bold text-gray-900 text-sm mt-1">{asset.name}</div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-extrabold text-gray-900">
                    {asset.price.toFixed(2)}
                    {asset.unit || ''}
                  </span>
                  <span className="text-xs text-gray-400">{asset.volume}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">{asset.extraInfo}</div>
              </div>
            );
          })}
        </div>

        {/* Economic Calendar */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Global Economic Calendar</h3>
            </div>
            <span className="text-xs text-gray-500">Live consensus releases</span>
          </div>

          <div className="divide-y divide-gray-50">
            {ECONOMIC_CALENDAR.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-gray-50/60 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{item.title}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.impact === 'high'
                            ? 'bg-rose-50 text-rose-600'
                            : item.impact === 'medium'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-right self-end md:self-center">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Actual</span>
                    <span className="font-bold text-gray-900">{item.current}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Forecast</span>
                    <span className="text-gray-600 font-medium">{item.forecast}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Previous</span>
                    <span className="text-gray-500">{item.previous}</span>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium text-[11px]">
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
          <h3 className="text-xl font-bold text-gray-900">{category} Overview</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time streaming prices, 24h high/lows, and market movement
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {assets.length} Active Feeds
        </span>
      </div>

      {/* Asset Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          const inWatchlist = isWatchlisted(asset.symbol);

          return (
            <div
              key={asset.symbol}
              onClick={() => onSelectAsset(asset)}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {asset.symbol}
                    </span>
                    {asset.unit && (
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                        {asset.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px] mt-0.5">
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
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'border-gray-100 text-gray-300 hover:text-blue-600 hover:border-blue-200'
                  }`}
                  title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price and Percentage */}
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    {category === 'Crypto' && '$'}
                    {category === 'US stocks' && '$'}
                    {category === 'World stocks' && (asset.symbol.includes('.KS') ? '₩' : asset.symbol.includes('.T') ? '¥' : '$')}
                    {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Vol: {asset.volume}</div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold text-xs ${
                      isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    24h H: {asset.high24h.toLocaleString()}
                  </div>
                </div>
              </div>

              {asset.extraInfo && (
                <div className="mt-3 pt-2 border-t border-gray-50 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>{asset.extraInfo}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
