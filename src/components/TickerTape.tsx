import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Flame, Pause, Play } from 'lucide-react';
import { SearchResultItem } from '../types';

interface TickerTapeProps {
  onSelectItem: (item: SearchResultItem) => void;
  isDark?: boolean;
}

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: string;
  category: any;
  exchange: string;
  lastTickDirection?: 'up' | 'down';
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectItem, isDark = false }) => {
  const [tickers, setTickers] = useState<TickerItem[]>([
    { symbol: 'SPX', name: 'S&P 500', price: 5984.75, change: 32.40, changePercent: 0.54, type: 'Index', category: 'US stocks', exchange: 'CBOE' },
    { symbol: 'NDX', name: 'Nasdaq 100', price: 21120.40, change: 185.30, changePercent: 0.88, type: 'Index', category: 'US stocks', exchange: 'NASDAQ' },
    { symbol: 'DJI', name: 'Dow 30', price: 43910.80, change: 142.10, changePercent: 0.32, type: 'Index', category: 'US stocks', exchange: 'DJI' },
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 96420.00, change: 1840.00, changePercent: 1.95, type: 'Crypto', category: 'Crypto', exchange: 'Coinbase' },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 2745.50, change: 65.20, changePercent: 2.43, type: 'Crypto', category: 'Crypto', exchange: 'Binance' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 138.25, change: 4.15, changePercent: 3.09, type: 'Stock', category: 'US stocks', exchange: 'NASDAQ' },
    { symbol: 'AAPL', name: 'Apple', price: 232.80, change: 1.65, changePercent: 0.71, type: 'Stock', category: 'US stocks', exchange: 'NASDAQ' },
    { symbol: 'TSLA', name: 'Tesla', price: 345.50, change: -5.20, changePercent: -1.48, type: 'Stock', category: 'US stocks', exchange: 'NASDAQ' },
    { symbol: 'EUR/USD', name: 'EUR / USD', price: 1.0482, change: 0.0024, changePercent: 0.23, type: 'Forex', category: 'Forex', exchange: 'FXCM' },
    { symbol: 'CL1!', name: 'Crude Oil', price: 71.45, change: 0.82, changePercent: 1.16, type: 'Futures', category: 'Futures', exchange: 'NYMEX' },
    { symbol: 'GC1!', name: 'Gold', price: 2912.80, change: 14.30, changePercent: 0.49, type: 'Futures', category: 'Futures', exchange: 'COMEX' },
    { symbol: 'US10Y', name: 'US 10Y Yield', price: 4.42, change: -0.03, changePercent: -0.67, type: 'Bond', category: 'Government bonds', exchange: 'Treasury' }
  ]);

  const [isPaused, setIsPaused] = useState(false);
  const [activeTickSymbol, setActiveTickSymbol] = useState<string | null>(null);

  // Micro real-time price fluctuations with visual pulse
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTickers((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        const delta = (Math.random() - 0.48) * (item.price * 0.001);
        const nextPrice = Number((item.price + delta).toFixed(item.price < 10 ? 4 : 2));
        const dir = delta >= 0 ? 'up' : 'down';
        
        setActiveTickSymbol(item.symbol);
        setTimeout(() => setActiveTickSymbol(null), 800);

        return prev.map((t, idx) => {
          if (idx === randomIndex) {
            return {
              ...t,
              price: nextPrice,
              lastTickDirection: dir
            };
          }
          return t;
        });
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className={`border-b text-xs select-none transition-colors overflow-hidden relative ${
        isDark
          ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-gray-50 border-gray-100 text-gray-700'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 h-9 flex items-center justify-between">
        {/* Left Live Pulse Marker */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-gray-200/50 dark:border-gray-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline text-gray-500 dark:text-gray-400">
            Live Tape
          </span>
        </div>

        {/* Scrolling Tickers Strip */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 px-3 flex-1">
          {tickers.map((ticker) => {
            const isPositive = ticker.changePercent >= 0;
            const isFlashing = activeTickSymbol === ticker.symbol;

            return (
              <button
                key={ticker.symbol}
                onClick={() =>
                  onSelectItem({
                    symbol: ticker.symbol,
                    name: ticker.name,
                    type: ticker.type,
                    exchange: ticker.exchange,
                    category: ticker.category,
                    price: ticker.price,
                    changePercent: ticker.changePercent
                  })
                }
                className={`flex items-center gap-2 shrink-0 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  isFlashing
                    ? isPositive
                      ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                    : isDark
                    ? 'hover:bg-[#1e222d]'
                    : 'hover:bg-white shadow-2xs'
                }`}
              >
                <span className="font-bold text-[11px]">{ticker.symbol}</span>
                <span className="font-mono text-[11px] tabular-nums font-medium">
                  {ticker.price < 10
                    ? ticker.price.toFixed(4)
                    : ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`flex items-center text-[10px] font-bold tabular-nums ${
                    isPositive ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {ticker.changePercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Pause / Play control */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 pl-2 shrink-0 p-1"
          title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
        >
          {isPaused ? <Play className="w-3 h-3 text-emerald-500" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
