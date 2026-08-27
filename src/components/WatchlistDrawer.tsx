import React from 'react';
import { ALL_SEARCH_ITEMS, MAJOR_INDICES } from '../data/marketData';
import { SearchResultItem } from '../types';
import { X, Trash2, ArrowUpRight, TrendingUp, TrendingDown, Bookmark } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onRemove: (symbol: string) => void;
  onSelectItem: (item: SearchResultItem) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onSelectItem
}) => {
  if (!isOpen) return null;

  const watchlistItems = ALL_SEARCH_ITEMS.filter((item) => watchlist.includes(item.symbol));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="watchlist-drawer"
        className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">My Watchlist</h3>
              <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                {watchlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
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
                    className="p-3.5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded font-semibold">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[170px] mt-0.5">
                        {item.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-xs font-semibold flex items-center justify-end ${
                            isPositive ? 'text-emerald-600' : 'text-rose-600'
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
                        className="p-1.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
                <p className="text-sm font-medium text-gray-600">Your Watchlist is empty</p>
                <p className="text-xs text-gray-400 mt-1 max-w-[220px] mx-auto">
                  Click the bookmark icon on any index or stock to track it here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-3.5 text-xs text-gray-500 flex items-center justify-between">
            <span>Real-time cloud sync active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
