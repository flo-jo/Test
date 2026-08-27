import React from 'react';
import { ALL_SEARCH_ITEMS, MAJOR_INDICES } from '../data/marketData';
import { SearchResultItem } from '../types';
import { X, Trash2, ArrowUpRight, TrendingUp, TrendingDown, Bookmark, ShieldCheck } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onRemove: (symbol: string) => void;
  onSelectItem: (item: SearchResultItem) => void;
  isDark?: boolean;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onSelectItem,
  isDark = false
}) => {
  if (!isOpen) return null;

  const watchlistItems = ALL_SEARCH_ITEMS.filter((item) => watchlist.includes(item.symbol));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="watchlist-drawer"
        className={`relative w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 ${
          isDark ? 'bg-[#1e222d] text-[#d1d4dc]' : 'bg-white text-gray-900'
        }`}
      >
        <div>
          {/* Header */}
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isDark ? 'border-[#2a2e39]' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-500" />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                My Pro Watchlist
              </h3>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {watchlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'text-[#787b86] hover:text-white hover:bg-[#131722]'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1 no-scrollbar">
            {watchlistItems.length > 0 ? (
              watchlistItems.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <div
                    key={item.symbol}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isDark
                        ? 'bg-[#131722]/80 border-[#2a2e39] hover:border-blue-500/50 hover:bg-[#131722]'
                        : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-extrabold text-sm transition-colors ${
                            isDark
                              ? 'text-white group-hover:text-blue-400'
                              : 'text-gray-900 group-hover:text-blue-600'
                          }`}
                        >
                          {item.symbol}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            isDark ? 'bg-[#2a2e39] text-[#787b86]' : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[170px] mt-0.5">
                        {item.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div
                          className={`text-sm font-bold font-mono ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-xs font-mono font-semibold flex items-center justify-end ${
                            isPositive ? 'text-emerald-500' : 'text-rose-500'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {item.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.symbol);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-gray-500 hover:text-rose-400 hover:bg-rose-950/40'
                            : 'text-gray-300 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Bookmark className="w-10 h-10 mx-auto mb-3 opacity-30 text-gray-400" />
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your Watchlist is empty
                </p>
                <p className="text-xs text-gray-400 mt-1 max-w-[220px] mx-auto">
                  Click the bookmark icon on any index or stock to track it here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`pt-4 border-t ${
            isDark ? 'border-[#2a2e39]' : 'border-gray-100'
          }`}
        >
          <div
            className={`rounded-2xl p-3.5 text-xs flex items-center justify-between ${
              isDark ? 'bg-[#131722] text-[#787b86]' : 'bg-gray-50 text-gray-500'
            }`}
          >
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Real-time synchronization active
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
