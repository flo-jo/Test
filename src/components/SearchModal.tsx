import React, { useState, useEffect, useRef } from 'react';
import { ALL_SEARCH_ITEMS } from '../data/marketData';
import { SearchResultItem } from '../types';
import { Search, X, TrendingUp, TrendingDown, ArrowRight, History } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: SearchResultItem) => void;
  isDark?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  isDark = false
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_recent_searches');
      return saved ? JSON.parse(saved) : ['SPX', 'NVDA', 'BTC/USD', 'AAPL'];
    } catch {
      return ['SPX', 'NVDA', 'BTC/USD', 'AAPL'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = ALL_SEARCH_ITEMS.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesQuery && matchesType;
  });

  const handleSelect = (item: SearchResultItem) => {
    const nextRecents = [item.symbol, ...recentSearches.filter((s) => s !== item.symbol)].slice(0, 6);
    setRecentSearches(nextRecents);
    localStorage.setItem('tv_recent_searches', JSON.stringify(nextRecents));
    onSelectItem(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        id="search-modal-container"
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden z-10 animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center px-4 py-3.5 border-b gap-3 ${
            isDark ? 'border-[#2a2e39]' : 'border-gray-100'
          }`}
        >
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbols, indices, crypto, forex, bonds..."
            className={`w-full text-base font-medium placeholder-gray-400 bg-transparent focus:outline-none ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
              isDark
                ? 'bg-[#131722] text-[#787b86] border-[#2a2e39]'
                : 'bg-gray-100 text-gray-400 border-gray-200'
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 border-b text-xs overflow-x-auto no-scrollbar ${
            isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50/70 border-gray-100'
          }`}
        >
          {['All', 'Index', 'Stock', 'Crypto', 'Futures', 'Forex', 'ETF', 'Bond'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterType === tab
                  ? isDark
                    ? 'bg-[#2962ff] text-white shadow-sm'
                    : 'bg-blue-600 text-white shadow-2xs'
                  : isDark
                  ? 'text-[#787b86] hover:text-white'
                  : 'text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y p-2 no-scrollbar">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer group ${
                    isDark ? 'hover:bg-[#131722]' : 'hover:bg-blue-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                        isDark
                          ? 'bg-[#131722] text-blue-400 group-hover:bg-[#2962ff] group-hover:text-white'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm transition-colors ${
                            isDark
                              ? 'text-white group-hover:text-blue-400'
                              : 'text-gray-900 group-hover:text-blue-600'
                          }`}
                        >
                          {item.symbol}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                            isDark ? 'bg-[#131722] text-[#787b86]' : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[240px] sm:max-w-xs">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-sm font-mono font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-mono font-semibold flex items-center justify-end gap-0.5 ${
                        isPositive ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No market results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try searching SPX, NVDA, AAPL, BTC or EUR/USD</p>
            </div>
          )}
        </div>

        {/* Quick Recent Badges */}
        <div
          className={`px-4 py-2.5 border-t flex items-center gap-2 text-xs ${
            isDark
              ? 'bg-[#131722] border-[#2a2e39] text-[#787b86]'
              : 'bg-gray-50 border-gray-100 text-gray-500'
          }`}
        >
          <History className="w-3.5 h-3.5 text-gray-400" />
          <span>Recent:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {recentSearches.map((symbol) => (
              <button
                key={symbol}
                onClick={() => setQuery(symbol)}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-colors border cursor-pointer ${
                  isDark
                    ? 'bg-[#1e222d] border-[#2a2e39] text-gray-300 hover:border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-400 text-gray-700'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
