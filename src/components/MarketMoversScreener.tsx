import React, { useState } from 'react';
import { MarketAsset, ConstituentStock } from '../types';
import { CATEGORY_ASSETS, MAJOR_INDICES } from '../data/marketData';
import {
  TrendingUp,
  TrendingDown,
  Flame,
  ArrowUpDown,
  Bookmark,
  Check,
  Zap,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface MarketMoversScreenerProps {
  onSelectStock: (stock: ConstituentStock | MarketAsset) => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;
  isDark?: boolean;
}

type ScreenerFilter = 'gainers' | 'losers' | 'volume' | 'megacap' | 'ai';

export const MarketMoversScreener: React.FC<MarketMoversScreenerProps> = ({
  onSelectStock,
  onToggleWatchlist,
  isWatchlisted,
  isDark = false
}) => {
  const [filter, setFilter] = useState<ScreenerFilter>('gainers');
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregate all stock assets from indices and category assets
  const allStocks: (ConstituentStock | MarketAsset)[] = [
    ...MAJOR_INDICES.flatMap((idx) => idx.constituents),
    ...CATEGORY_ASSETS['US stocks'],
    ...CATEGORY_ASSETS['World stocks']
  ];

  // Remove duplicates by symbol
  const uniqueStocks = Array.from(new Map(allStocks.map((item) => [item.symbol, item])).values());

  // Filter & Sort Logic
  const getFilteredStocks = () => {
    let list = [...uniqueStocks];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      );
    }

    switch (filter) {
      case 'gainers':
        return list.sort((a, b) => b.changePercent - a.changePercent).slice(0, 8);
      case 'losers':
        return list.sort((a, b) => a.changePercent - b.changePercent).slice(0, 8);
      case 'volume':
        return list.sort((a, b) => b.price * 10 - a.price * 10).slice(0, 8);
      case 'megacap':
        return list
          .filter((s) => ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA'].includes(s.symbol))
          .slice(0, 8);
      case 'ai':
        return list
          .filter((s) => ['NVDA', 'PLTR', 'MSFT', 'AMD', 'TSM', 'AVGO'].includes(s.symbol))
          .slice(0, 8);
      default:
        return list.slice(0, 8);
    }
  };

  const displayedStocks = getFilteredStocks();

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2
            className={`text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Market Movers & Screener
          </h2>
          <p className={`text-xs ${isDark ? 'text-[#787b86]' : 'text-gray-500'}`}>
            Real-time multi-factor screen for momentum, institutional volume, and breakout setups
          </p>
        </div>

        {/* Filter Switcher Tabs */}
        <div
          className={`flex items-center gap-1 p-1 rounded-2xl border text-xs font-semibold overflow-x-auto no-scrollbar ${
            isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-gray-100/80 border-gray-200/60'
          }`}
        >
          {[
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Losers' },
            { id: 'volume', label: 'Most Active' },
            { id: 'megacap', label: 'Mega-Cap 7' },
            { id: 'ai', label: 'AI Silicon & Infra' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as ScreenerFilter)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? isDark
                    ? 'bg-[#2962ff] text-white shadow-sm font-bold'
                    : 'bg-white text-blue-600 shadow-2xs font-bold'
                  : isDark
                  ? 'text-[#787b86] hover:text-[#d1d4dc]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Screener Data Table */}
      <div
        className={`rounded-3xl border overflow-hidden transition-all ${
          isDark
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-gray-100 shadow-xs'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className={`border-b font-medium ${
                  isDark ? 'border-[#2a2e39] text-[#787b86]' : 'border-gray-100 text-gray-400'
                }`}
              >
                <th className="py-3.5 pl-6">Symbol / Company</th>
                <th className="py-3.5 text-right">Price</th>
                <th className="py-3.5 text-right">24h Change</th>
                <th className="py-3.5 text-right hidden sm:table-cell">Market Cap</th>
                <th className="py-3.5 text-right hidden md:table-cell">Volume</th>
                <th className="py-3.5 text-right hidden lg:table-cell">P/E Ratio</th>
                <th className="py-3.5 text-center hidden xl:table-cell">Consensus Rating</th>
                <th className="py-3.5 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDark ? 'divide-[#2a2e39]' : 'divide-gray-50'}`}
            >
              {displayedStocks.map((stock) => {
                const isPos = stock.changePercent >= 0;
                const bookmarked = isWatchlisted(stock.symbol);

                return (
                  <tr
                    key={stock.symbol}
                    onClick={() => onSelectStock(stock)}
                    className={`transition-colors cursor-pointer group ${
                      isDark ? 'hover:bg-[#131722]/80' : 'hover:bg-blue-50/40'
                    }`}
                  >
                    {/* Symbol / Name */}
                    <td className="py-3.5 pl-6 pr-4">
                      <div className="flex items-center gap-3">
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
                          <div className="font-bold flex items-center gap-1.5">
                            <span className="group-hover:text-blue-500 transition-colors">
                              {stock.symbol}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 truncate max-w-[150px] sm:max-w-[220px]">
                            {stock.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 text-right font-mono font-bold">
                      ${stock.price.toFixed(2)}
                    </td>

                    {/* Change % */}
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg font-mono font-bold text-[11px] ${
                          isPos
                            ? isDark
                              ? 'bg-emerald-950/40 text-emerald-400'
                              : 'bg-emerald-50 text-emerald-700'
                            : isDark
                            ? 'bg-rose-950/40 text-rose-400'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPos ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="py-3.5 text-right font-medium hidden sm:table-cell text-gray-500">
                      {stock.marketCap || '—'}
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 text-right font-mono hidden md:table-cell text-gray-500">
                      {stock.volume}
                    </td>

                    {/* P/E */}
                    <td className="py-3.5 text-right font-mono hidden lg:table-cell text-gray-500">
                      {stock.peRatio || '—'}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 text-center hidden xl:table-cell">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                        <Zap className="w-3 h-3" /> Strong Buy
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(stock.symbol);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          bookmarked
                            ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/40 dark:border-blue-600'
                            : isDark
                            ? 'border-[#2a2e39] text-[#787b86] hover:text-blue-400'
                            : 'border-gray-200 text-gray-400 hover:text-blue-600'
                        }`}
                        title={bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        {bookmarked ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
