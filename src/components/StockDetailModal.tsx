import React, { useState } from 'react';
import { ConstituentStock, MarketAsset } from '../types';
import { generateChartPoints } from '../data/marketData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  X,
  TrendingUp,
  TrendingDown,
  Bookmark,
  Check,
  Zap,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StockDetailModalProps {
  item: ConstituentStock | MarketAsset | null;
  onClose: () => void;
  onToggleWatchlist: (symbol: string) => void;
  isWatchlisted: boolean;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  item,
  onClose,
  onToggleWatchlist,
  isWatchlisted
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1M' | '1Y'>('1D');
  const [orderAmount, setOrderAmount] = useState<number>(10);
  const [orderExecuted, setOrderExecuted] = useState(false);

  if (!item) return null;

  const isPositive = item.changePercent >= 0;
  const chartData = generateChartPoints(item.price, timeframe, 20);

  const handleSimulatedTrade = (type: 'Buy' | 'Sell') => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setOrderExecuted(true);
    setTimeout(() => setOrderExecuted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="stock-detail-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
              {item.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900">{item.symbol}</h3>
                {'category' in item && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{item.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'border-gray-200 text-gray-500 hover:text-blue-600'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {isWatchlisted ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price & Chart */}
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-extrabold text-gray-900">
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-semibold mt-0.5 ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}
              {item.changePercent.toFixed(2)}%
            </div>
          </div>

          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            {(['1D', '1M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeframe === tf ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-44 w-full mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold">
                        ${payload[0].value}
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
                strokeWidth={2}
                fill="url(#modalGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
          <div className="p-3 bg-gray-50 rounded-2xl">
            <span className="text-gray-400 block mb-1">Volume</span>
            <span className="font-bold text-gray-900">{item.volume}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl">
            <span className="text-gray-400 block mb-1">
              {'dayHigh' in item ? 'Day Range' : '24h Range'}
            </span>
            <span className="font-bold text-gray-900">
              {'dayLow' in item ? `${item.dayLow} - ${item.dayHigh}` : `${item.low24h} - ${item.high24h}`}
            </span>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl">
            <span className="text-gray-400 block mb-1">Market Sentiment</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-emerald-500" /> Bullish 74%
            </span>
          </div>
        </div>

        {/* Simulated Paper Trading Action */}
        <div className="mt-5 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-gray-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Instant Paper Trade Simulator
            </span>
            <span className="text-gray-500">Zero Risk Demo</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-xs text-gray-400">Qty:</span>
              <input
                type="number"
                min="1"
                max="1000"
                value={orderAmount}
                onChange={(e) => setOrderAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full pl-12 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => handleSimulatedTrade('Buy')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Paper Buy ${(orderAmount * item.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </button>
            <button
              onClick={() => handleSimulatedTrade('Sell')}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Paper Short
            </button>
          </div>

          {orderExecuted && (
            <div className="mt-2 text-center text-xs font-bold text-emerald-600 animate-in fade-in">
              ✓ Order executed successfully in Simulated Paper Portfolio!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
