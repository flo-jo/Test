import React, { useState } from 'react';
import { ConstituentStock, MarketAsset } from '../types';
import { generateCandlePoints, generateOrderBook } from '../data/marketData';
import { AdvancedProChart } from './AdvancedProChart';
import {
  X,
  TrendingUp,
  TrendingDown,
  Bookmark,
  Check,
  Zap,
  ShieldCheck,
  Layers2,
  BarChart3,
  Sliders,
  DollarSign,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StockDetailModalProps {
  item: ConstituentStock | MarketAsset | null;
  onClose: () => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: boolean;
  isDark?: boolean;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  item,
  onClose,
  onToggleWatchlist,
  isWatchlisted,
  isDark = false
}) => {
  const [modalTab, setModalTab] = useState<'chart' | 'orderbook' | 'fundamentals'>('chart');
  const [orderAmount, setOrderAmount] = useState<number>(10);
  const [orderSide, setOrderSide] = useState<'Buy' | 'Sell'>('Buy');
  const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Stop'>('Market');
  const [orderExecuted, setOrderExecuted] = useState(false);
  const [executionMessage, setExecutionMessage] = useState('');

  if (!item) return null;

  const isPositive = item.changePercent >= 0;
  const candleData = generateCandlePoints(item.price, '1D', 30);
  const orderBook = generateOrderBook(item.price);

  const handleSimulatedTrade = (side: 'Buy' | 'Sell') => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    setOrderSide(side);
    setExecutionMessage(
      `✓ Executed ${side.toUpperCase()} ${orderAmount} shares of ${item.symbol} @ $${item.price.toFixed(
        2
      )} (Total: $${(orderAmount * item.price).toLocaleString(undefined, {
        maximumFractionDigits: 2
      })})`
    );
    setOrderExecuted(true);
    setTimeout(() => setOrderExecuted(false), 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="stock-detail-modal"
        className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border p-6 z-10 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto ${
          isDark
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        {/* Modal Top Header Bar */}
        <div
          className={`flex items-start justify-between pb-4 border-b ${
            isDark ? 'border-[#2a2e39]' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md text-white ${
                isPositive ? 'bg-emerald-600' : 'bg-blue-600'
              }`}
            >
              {item.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {item.symbol}
                </h3>
                {'category' in item && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      isDark ? 'bg-[#131722] text-[#787b86]' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.category}
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  ● Realtime Live
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{item.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/40 dark:border-blue-600'
                  : isDark
                  ? 'border-[#2a2e39] text-[#787b86] hover:text-white'
                  : 'border-gray-200 text-gray-500 hover:text-blue-600'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {isWatchlisted ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDark
                  ? 'text-[#787b86] hover:text-white hover:bg-[#131722]'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Price Strip */}
        <div className="my-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div
              className={`text-3xl font-black font-mono tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div
              className={`flex items-center gap-1.5 text-xs font-mono font-bold mt-1 ${
                isPositive ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {isPositive ? '+' : ''}
              {item.changePercent.toFixed(2)}% Today
            </div>
          </div>

          {/* Modal Tab Switcher */}
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl text-xs font-semibold ${
              isDark ? 'bg-[#131722]' : 'bg-gray-100'
            }`}
          >
            <button
              onClick={() => setModalTab('chart')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                modalTab === 'chart'
                  ? isDark
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-white text-blue-600 shadow-2xs'
                  : isDark
                  ? 'text-[#787b86]'
                  : 'text-gray-600'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Pro Chart
            </button>
            <button
              onClick={() => setModalTab('orderbook')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                modalTab === 'orderbook'
                  ? isDark
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-white text-blue-600 shadow-2xs'
                  : isDark
                  ? 'text-[#787b86]'
                  : 'text-gray-600'
              }`}
            >
              <Layers2 className="w-3.5 h-3.5" /> Level 2 Depth
            </button>
            <button
              onClick={() => setModalTab('fundamentals')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                modalTab === 'fundamentals'
                  ? isDark
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-white text-blue-600 shadow-2xs'
                  : isDark
                  ? 'text-[#787b86]'
                  : 'text-gray-600'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Fundamentals
            </button>
          </div>
        </div>

        {/* Tab 1: Pro Chart Canvas */}
        {modalTab === 'chart' && (
          <AdvancedProChart
            data={candleData}
            symbol={item.symbol}
            price={item.price}
            isPositive={isPositive}
            isDark={isDark}
          />
        )}

        {/* Tab 2: Level 2 Depth Order Book */}
        {modalTab === 'orderbook' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex justify-between text-xs font-bold text-emerald-500 mb-2">
                <span>Bids (Buyers)</span>
                <span>Cumulative</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {orderBook.bids.slice(0, 7).map((b, i) => (
                  <div key={i} className="flex justify-between relative py-0.5 px-1.5">
                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-500/10 rounded"
                      style={{ width: `${(b.total / 1200) * 100}%` }}
                    />
                    <span className="font-bold text-emerald-500 relative z-10">${b.price.toFixed(2)}</span>
                    <span className="text-gray-400 relative z-10">{b.size} (Σ {b.total})</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex justify-between text-xs font-bold text-rose-500 mb-2">
                <span>Asks (Sellers)</span>
                <span>Cumulative</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {orderBook.asks.slice(0, 7).map((a, i) => (
                  <div key={i} className="flex justify-between relative py-0.5 px-1.5">
                    <div
                      className="absolute inset-y-0 right-0 bg-rose-500/10 rounded"
                      style={{ width: `${(a.total / 1200) * 100}%` }}
                    />
                    <span className="font-bold text-rose-500 relative z-10">${a.price.toFixed(2)}</span>
                    <span className="text-gray-400 relative z-10">{a.size} (Σ {a.total})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Key Fundamental Metrics */}
        {modalTab === 'fundamentals' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2 text-xs">
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1">Market Cap</span>
              <span className="font-bold font-mono text-sm">
                {'marketCap' in item ? item.marketCap : '$1.84T'}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1">P/E Ratio</span>
              <span className="font-bold font-mono text-sm">
                {'peRatio' in item ? item.peRatio : '28.4'}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1">24h Volume</span>
              <span className="font-bold font-mono text-sm">{item.volume}</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-[#131722] border-[#2a2e39]' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className="text-gray-400 block mb-1">Analyst Consensus</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1 text-sm">
                <Zap className="w-3.5 h-3.5" /> Strong Buy
              </span>
            </div>
          </div>
        )}

        {/* Paper Trading Execution Desk */}
        <div
          className={`mt-6 p-5 rounded-3xl border ${
            isDark
              ? 'bg-[#131722] border-[#2a2e39]'
              : 'bg-blue-50/60 border-blue-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Pro Paper Trading Execution Terminal
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              Virtual Margin Available: $100,000.00
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {/* Quantity Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-xs text-gray-400 font-medium">
                Shares:
              </span>
              <input
                type="number"
                min="1"
                max="10000"
                value={orderAmount}
                onChange={(e) => setOrderAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className={`w-full pl-16 pr-3 py-2.5 rounded-xl border text-xs font-bold font-mono focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? 'bg-[#1e222d] border-[#2a2e39] text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>

            {/* Buy Order Button */}
            <button
              onClick={() => handleSimulatedTrade('Buy')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <TrendingUp className="w-4 h-4" />
              Paper Buy ${(orderAmount * item.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </button>

            {/* Short Order Button */}
            <button
              onClick={() => handleSimulatedTrade('Sell')}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <TrendingDown className="w-4 h-4" />
              Paper Short ${(orderAmount * item.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </button>
          </div>

          {orderExecuted && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold text-center animate-in fade-in">
              {executionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
