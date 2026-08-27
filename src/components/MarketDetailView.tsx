import React, { useState, useEffect } from 'react';
import { MarketIndex, ConstituentStock } from '../types';
import { generateCandlePoints, generateOrderBook } from '../data/marketData';
import { AdvancedProChart } from './AdvancedProChart';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  ArrowUpRight,
  Bookmark,
  Check,
  Zap,
  ShieldCheck,
  Activity,
  Layers2
} from 'lucide-react';

interface MarketDetailViewProps {
  index: MarketIndex;
  onSelectStock: (stock: ConstituentStock) => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
  isDark?: boolean;
}

export const MarketDetailView: React.FC<MarketDetailViewProps> = ({
  index,
  onSelectStock,
  onToggleWatchlist,
  isWatchlisted,
  isDark = false
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y'>('1D');
  const [activeTab, setActiveTab] = useState<'overview' | 'constituents' | 'sectors' | 'orderbook'>('overview');
  const [livePrice, setLivePrice] = useState(index.price);
  const [liveChange, setLiveChange] = useState(index.change);
  const [livePercent, setLivePercent] = useState(index.changePercent);
  const [isUpdating, setIsUpdating] = useState(false);

  // Candlestick & Technical points
  const candleData = generateCandlePoints(livePrice, timeframe, timeframe === '1D' ? 30 : 40);
  const orderBook = generateOrderBook(livePrice);

  // Synchronize on index or timeframe change
  useEffect(() => {
    setLivePrice(index.price);
    setLiveChange(index.change);
    setLivePercent(index.changePercent);
  }, [index, timeframe]);

  // Subtle real-time live simulation ticks
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * (index.price * 0.0004);
      setLivePrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        const diff = Number((next - (index.price - index.change)).toFixed(2));
        const pct = Number(((diff / (index.price - index.change)) * 100).toFixed(2));
        setLiveChange(diff);
        setLivePercent(pct);
        return next;
      });
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 450);
    }, 2800);

    return () => clearInterval(interval);
  }, [index]);

  const isPositive = livePercent >= 0;
  const indexInWatchlist = isWatchlisted(index.symbol);

  return (
    <div
      id="market-detail-view"
      className={`rounded-3xl border p-6 transition-all mb-12 ${
        isDark
          ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] shadow-xl'
          : 'bg-white border-gray-100 shadow-xs text-gray-900'
      }`}
    >
      {/* Index Header Bar */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b ${
          isDark ? 'border-[#2a2e39]' : 'border-gray-100'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl ${index.badgeColor} flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0`}
          >
            {index.badgeNumber}
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3
                className={`text-2xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {index.name}
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  isDark ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {index.symbol}
              </span>
              <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Continuous Live Feed
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-xl">{index.description}</p>
          </div>
        </div>

        {/* Live Price Display & Watchlist Action */}
        <div className="flex items-center gap-5 justify-between lg:justify-end">
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span
                className={`text-3xl font-black font-mono tracking-tight transition-colors tabular-nums ${
                  isUpdating
                    ? isPositive
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                    : isDark
                    ? 'text-white'
                    : 'text-gray-900'
                }`}
              >
                {livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-gray-400 font-mono">USD</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end text-xs font-bold mt-0.5 font-mono">
              <span
                className={`flex items-center gap-0.5 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}
              >
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? '+' : ''}
                {liveChange.toFixed(2)} ({isPositive ? '+' : ''}
                {livePercent.toFixed(2)}%)
              </span>
              <span className="text-gray-400 font-normal">Today</span>
            </div>
          </div>

          <button
            id={`watchlist-toggle-${index.symbol}`}
            onClick={() => onToggleWatchlist(index.symbol)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              indexInWatchlist
                ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-400'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86] hover:text-white hover:bg-[#131722]'
                : 'border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 bg-white'
            }`}
            title={indexInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {indexInWatchlist ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Overview, Constituents, Sectors, Level 2 Depth) */}
      <div
        className={`flex items-center justify-between border-b my-4 flex-wrap gap-2 ${
          isDark ? 'border-[#2a2e39]' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? isDark
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-blue-600 text-blue-600'
                : isDark
                ? 'border-transparent text-[#787b86] hover:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Pro Chart & Summary
          </button>
          <button
            onClick={() => setActiveTab('constituents')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'constituents'
                ? isDark
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-blue-600 text-blue-600'
                : isDark
                ? 'border-transparent text-[#787b86] hover:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Constituents ({index.constituents.length})
          </button>
          <button
            onClick={() => setActiveTab('sectors')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'sectors'
                ? isDark
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-blue-600 text-blue-600'
                : isDark
                ? 'border-transparent text-[#787b86] hover:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <PieChartIcon className="w-4 h-4" />
            Sector Weightings
          </button>
          <button
            onClick={() => setActiveTab('orderbook')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'orderbook'
                ? isDark
                  ? 'border-[#2962ff] text-[#2962ff]'
                  : 'border-blue-600 text-blue-600'
                : isDark
                ? 'border-transparent text-[#787b86] hover:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers2 className="w-4 h-4" />
            Level 2 Order Book
          </button>
        </div>

        {/* Timeframe selector */}
        {activeTab === 'overview' && (
          <div
            className={`flex items-center gap-1 p-1 rounded-xl text-xs font-semibold ${
              isDark ? 'bg-[#131722]' : 'bg-gray-100'
            }`}
          >
            {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  timeframe === tf
                    ? isDark
                      ? 'bg-[#2962ff] text-white shadow-sm'
                      : 'bg-white text-blue-600 shadow-2xs'
                    : isDark
                    ? 'text-[#787b86] hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Pro Chart & Technical Summary */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AdvancedProChart
            data={candleData}
            symbol={index.symbol}
            price={livePrice}
            isPositive={isPositive}
            isDark={isDark}
          />

          {/* Institutional Metrics Grid & Technical Gauge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t text-xs border-gray-100 dark:border-[#2a2e39]">
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">Open</span>
              <span className="font-bold font-mono text-sm">{index.open.toLocaleString()}</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">Day High</span>
              <span className="font-bold font-mono text-emerald-500 text-sm">{index.high.toLocaleString()}</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">Day Low</span>
              <span className="font-bold font-mono text-rose-500 text-sm">{index.low.toLocaleString()}</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">24h Volume</span>
              <span className="font-bold font-mono text-sm">{index.volume}</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">52W Range</span>
              <span className="font-bold font-mono text-sm">
                {(index.price * 0.8).toFixed(0)} - {(index.price * 1.05).toFixed(0)}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1 text-[11px] font-semibold">Technical Gauge</span>
              <span className="font-bold text-emerald-500 text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Strong Buy
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Key Constituents */}
      {activeTab === 'constituents' && (
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b font-medium ${
                    isDark ? 'border-[#2a2e39] text-[#787b86]' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <th className="pb-3">Company</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">24h Change</th>
                  <th className="pb-3 text-right">Market Cap</th>
                  <th className="pb-3 text-right">Volume</th>
                  <th className="pb-3 text-right">P/E Ratio</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? 'divide-[#2a2e39]' : 'divide-gray-50'}`}
              >
                {index.constituents.map((stock) => {
                  const stockPositive = stock.changePercent >= 0;
                  return (
                    <tr
                      key={stock.symbol}
                      onClick={() => onSelectStock(stock)}
                      className={`transition-colors cursor-pointer group ${
                        isDark ? 'hover:bg-[#131722]/80' : 'hover:bg-blue-50/40'
                      }`}
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[11px] shrink-0 ${
                              isDark
                                ? 'bg-[#2a2e39] text-blue-400'
                                : 'bg-blue-50 text-blue-600'
                            }`}
                          >
                            {stock.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-bold group-hover:text-blue-500 transition-colors">
                              {stock.symbol}
                            </div>
                            <div className="text-gray-400 text-[11px] truncate max-w-[140px] sm:max-w-none">
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono font-semibold text-[11px] ${
                            stockPositive
                              ? isDark
                                ? 'bg-emerald-950/40 text-emerald-400'
                                : 'bg-emerald-50 text-emerald-700'
                              : isDark
                              ? 'bg-rose-950/40 text-rose-400'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {stockPositive ? '+' : ''}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-medium text-gray-400">{stock.marketCap}</td>
                      <td className="py-3.5 text-right font-mono text-gray-400">{stock.volume}</td>
                      <td className="py-3.5 text-right font-mono text-gray-400">{stock.peRatio || '—'}</td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(stock.symbol);
                          }}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isWatchlisted(stock.symbol)
                              ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/40 dark:border-blue-600'
                              : isDark
                              ? 'border-[#2a2e39] text-[#787b86] hover:text-blue-400'
                              : 'border-gray-200 text-gray-400 hover:text-blue-600'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sector Weightings */}
      {activeTab === 'sectors' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Composition Breakdown
            </h4>
            {index.sectorBreakdown.map((sec) => (
              <div key={sec.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sec.color }} />
                    {sec.name}
                  </span>
                  <span className="font-mono font-bold">{sec.percentage}%</span>
                </div>
                <div
                  className={`w-full rounded-full h-2 overflow-hidden ${
                    isDark ? 'bg-[#131722]' : 'bg-gray-100'
                  }`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={`rounded-3xl p-6 border text-xs space-y-3 ${
              isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <h4 className="font-bold text-sm">Index Methodology & Rebalancing</h4>
            <p className="text-gray-400 leading-relaxed">
              Calculated using free-float market capitalization. Rebalanced quarterly to maintain institutional accuracy across global asset allocation models.
            </p>
            <div className="pt-2 flex items-center gap-4 text-gray-400">
              <div>
                <span className="block text-[11px] text-gray-400">Constituents</span>
                <span className="font-bold text-sm text-blue-500">{index.badgeNumber} Securities</span>
              </div>
              <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
                <span className="block text-[11px] text-gray-400">Weighting Logic</span>
                <span className="font-bold text-sm text-blue-500">Market-Cap Weighted</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Level 2 Order Book Depth */}
      {activeTab === 'orderbook' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bids Ladder */}
          <div
            className={`rounded-2xl p-4 border ${
              isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-emerald-500">
              <span>Bids (Buyers)</span>
              <span>Cumulative Size</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              {orderBook.bids.map((bid, i) => (
                <div key={i} className="relative flex justify-between items-center py-1 px-2 rounded">
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-500/10 rounded"
                    style={{ width: `${(bid.total / 1800) * 100}%` }}
                  />
                  <span className="font-bold text-emerald-500 relative z-10">${bid.price.toFixed(2)}</span>
                  <span className="text-gray-400 relative z-10">{bid.size} (Total: {bid.total})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks Ladder */}
          <div
            className={`rounded-2xl p-4 border ${
              isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-rose-500">
              <span>Asks (Sellers)</span>
              <span>Cumulative Size</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              {orderBook.asks.map((ask, i) => (
                <div key={i} className="relative flex justify-between items-center py-1 px-2 rounded">
                  <div
                    className="absolute inset-y-0 right-0 bg-rose-500/10 rounded"
                    style={{ width: `${(ask.total / 1800) * 100}%` }}
                  />
                  <span className="font-bold text-rose-500 relative z-10">${ask.price.toFixed(2)}</span>
                  <span className="text-gray-400 relative z-10">{ask.size} (Total: {ask.total})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
