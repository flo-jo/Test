import React, { useState } from 'react';
import { BREAKING_NEWS_ITEMS } from '../data/marketData';
import { NewsItem } from '../types';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface FinancialNewsFeedProps {
  onSelectTicker: (symbol: string) => void;
  isDark?: boolean;
}

export const FinancialNewsFeed: React.FC<FinancialNewsFeedProps> = ({
  onSelectTicker,
  isDark = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Equities', 'Crypto', 'Macro', 'Commodities', 'Forex'];

  const filteredNews =
    selectedCategory === 'All'
      ? BREAKING_NEWS_ITEMS
      : BREAKING_NEWS_ITEMS.filter((n) => n.category === selectedCategory);

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Institutional News Wire
            </h2>
            <p className={`text-xs ${isDark ? 'text-[#787b86]' : 'text-gray-500'}`}>
              Real-time breaking market catalysts, regulatory filings, and AI sentiment scoring
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-[#1e222d] text-[#787b86] hover:text-[#d1d4dc]'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.map((news) => {
          const isBull = news.sentiment === 'Bullish';
          const isBear = news.sentiment === 'Bearish';

          return (
            <div
              key={news.id}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] hover:border-blue-500/50'
                  : 'bg-white border-gray-100 shadow-xs hover:border-blue-200 hover:shadow-md'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-500">{news.source}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {news.timeAgo}
                    </span>
                  </div>

                  {/* Sentiment Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      isBull
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : isBear
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    {news.sentiment} {news.sentimentScore}%
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`font-bold text-sm line-clamp-2 leading-snug mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {news.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              {/* Footer with Affected Ticker Badges */}
              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-[#2a2e39]' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 mr-0.5">Impact:</span>
                  {news.tickers.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => onSelectTicker(sym)}
                      className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-[#131722] text-blue-400 hover:bg-[#2962ff] hover:text-white'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      ${sym}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-gray-400 hover:text-blue-500 cursor-pointer flex items-center gap-0.5">
                  Wire <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
