import React, { useState, useEffect } from 'react';
import { MarketIndex, ConstituentStock } from '../types';
import { generateChartPoints } from '../data/marketData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Maximize2,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  ArrowUpRight,
  Bookmark,
  Check,
  RefreshCw
} from 'lucide-react';

interface MarketDetailViewProps {
  index: MarketIndex;
  onSelectStock: (stock: ConstituentStock) => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
}

export const MarketDetailView: React.FC<MarketDetailViewProps> = ({
  index,
  onSelectStock,
  onToggleWatchlist,
  isWatchlisted
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y'>('1D');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [chartData, setChartData] = useState(() => generateChartPoints(index.price, '1D', 24));
  const [activeTab, setActiveTab] = useState<'overview' | 'constituents' | 'sectors'>('overview');
  const [livePrice, setLivePrice] = useState(index.price);
  const [liveChange, setLiveChange] = useState(index.change);
  const [livePercent, setLivePercent] = useState(index.changePercent);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update chart data on timeframe or index change
  useEffect(() => {
    setChartData(generateChartPoints(index.price, timeframe, timeframe === '1D' ? 24 : 35));
    setLivePrice(index.price);
    setLiveChange(index.change);
    setLivePercent(index.changePercent);
  }, [index, timeframe]);

  // Subtle real-time live simulation ticks
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * 1.8;
      setLivePrice((prev) => {
        const next = Number((prev + delta).toFixed(2));
        const diff = Number((next - (index.price - index.change)).toFixed(2));
        const pct = Number(((diff / (index.price - index.change)) * 100).toFixed(2));
        setLiveChange(diff);
        setLivePercent(pct);
        return next;
      });
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 400);
    }, 3500);

    return () => clearInterval(interval);
  }, [index]);

  const isPositive = livePercent >= 0;
  const indexInWatchlist = isWatchlisted(index.symbol);

  return (
    <div id="market-detail-view" className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs mb-12">
      {/* Index Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl ${index.badgeColor} flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0`}
          >
            {index.badgeNumber}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-gray-900">{index.name}</h3>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                {index.symbol}
              </span>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Market Open
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-xl">{index.description}</p>
          </div>
        </div>

        {/* Live Price Display & Watchlist Action */}
        <div className="flex items-center gap-4 justify-between lg:justify-end">
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span
                className={`text-3xl font-extrabold tracking-tight text-gray-900 transition-colors ${
                  isUpdating ? (isPositive ? 'text-emerald-600' : 'text-rose-600') : ''
                }`}
              >
                {livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-gray-400 font-mono">USD</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end text-sm font-semibold mt-0.5">
              <span
                className={`flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}
              >
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}
                {liveChange.toFixed(2)} ({isPositive ? '+' : ''}
                {livePercent.toFixed(2)}%)
              </span>
              <span className="text-gray-400 text-xs font-normal">Today</span>
            </div>
          </div>

          <button
            id={`watchlist-toggle-${index.symbol}`}
            onClick={() => onToggleWatchlist(index.symbol)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              indexInWatchlist
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300'
            }`}
            title={indexInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {indexInWatchlist ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Overview, Constituents, Sectors) */}
      <div className="flex items-center justify-between border-b border-gray-100 my-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Chart & Summary
          </button>
          <button
            onClick={() => setActiveTab('constituents')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'constituents'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Key Constituents ({index.constituents.length})
          </button>
          <button
            onClick={() => setActiveTab('sectors')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'sectors'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <PieChartIcon className="w-4 h-4" />
            Sector Weightings
          </button>
        </div>

        {/* Timeframe selector */}
        {activeTab === 'overview' && (
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  timeframe === tf ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Chart & Overview */}
      {activeTab === 'overview' && (
        <div>
          {/* Interactive Chart Canvas */}
          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="indexGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isPositive ? '#10b981' : '#f43f5e'}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? '#10b981' : '#f43f5e'}
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  dy={8}
                />
                <YAxis
                  domain={['dataMin - 10', 'dataMax + 10']}
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-gray-800">
                          <p className="font-mono text-gray-400 text-[11px]">{data.time}</p>
                          <p className="font-bold text-sm text-white mt-0.5">
                            {data.value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#10b981' : '#f43f5e'}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#indexGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-4 border-t border-gray-100 text-xs">
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">Open</span>
              <span className="font-bold text-gray-900 text-sm">{index.open.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">Day High</span>
              <span className="font-bold text-gray-900 text-sm">{index.high.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">Day Low</span>
              <span className="font-bold text-gray-900 text-sm">{index.low.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">Volume</span>
              <span className="font-bold text-gray-900 text-sm">{index.volume}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">52W Range</span>
              <span className="font-bold text-gray-900 text-sm">
                {(index.price * 0.8).toFixed(0)} - {(index.price * 1.05).toFixed(0)}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 block mb-1">Technical Rating</span>
              <span className="font-bold text-emerald-600 text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Strong Buy
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
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="pb-3">Company</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">24h Change</th>
                  <th className="pb-3 text-right">Market Cap</th>
                  <th className="pb-3 text-right">Volume</th>
                  <th className="pb-3 text-right">P/E Ratio</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {index.constituents.map((stock) => {
                  const stockPositive = stock.changePercent >= 0;
                  return (
                    <tr
                      key={stock.symbol}
                      onClick={() => onSelectStock(stock)}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {stock.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {stock.symbol}
                            </div>
                            <div className="text-gray-400 text-[11px] truncate max-w-[140px] sm:max-w-none">
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right font-bold text-gray-900">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                            stockPositive
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {stockPositive ? '+' : ''}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-gray-600">{stock.marketCap}</td>
                      <td className="py-3 text-right text-gray-500">{stock.volume}</td>
                      <td className="py-3 text-right text-gray-500">{stock.peRatio || '—'}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(stock.symbol);
                          }}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isWatchlisted(stock.symbol)
                              ? 'bg-blue-50 border-blue-200 text-blue-600'
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
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Composition Breakdown
            </h4>
            {index.sectorBreakdown.map((sec) => (
              <div key={sec.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sec.color }} />
                    {sec.name}
                  </span>
                  <span className="text-gray-900 font-bold">{sec.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-xs space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Index Methodology & Rebalancing</h4>
            <p className="text-gray-600 leading-relaxed">
              This index represents a diversified basket calculated using free-float market capitalization.
              Quarterly rebalancing occurs on the third Friday of March, June, September, and December.
            </p>
            <div className="pt-2 flex items-center gap-4 text-gray-500">
              <div>
                <span className="block text-[11px] text-gray-400">Total Constituents</span>
                <span className="font-bold text-gray-900 text-sm">{index.badgeNumber} Stocks</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="block text-[11px] text-gray-400">Calculation Type</span>
                <span className="font-bold text-gray-900 text-sm">Market-Cap Weighted</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
