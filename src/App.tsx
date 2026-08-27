import React, { useState, useEffect } from 'react';
import { MarketCategory, MarketIndex, ConstituentStock, MarketAsset, SearchResultItem } from './types';
import { MAJOR_INDICES, CATEGORY_ASSETS, ALL_SEARCH_ITEMS } from './data/marketData';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { MarketDetailView } from './components/MarketDetailView';
import { MarketBreadthSection } from './components/MarketBreadthSection';
import { MarketMoversScreener } from './components/MarketMoversScreener';
import { FinancialNewsFeed } from './components/FinancialNewsFeed';
import { CategoryContent } from './components/CategoryContent';
import { SearchModal } from './components/SearchModal';
import { RegionDropdown } from './components/RegionDropdown';
import { StockDetailModal } from './components/StockDetailModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import {
  TrendingUp,
  BarChart3,
  Flame,
  Zap,
  Globe2,
  Layers,
  ShieldCheck,
  Award,
  Users,
  Code2,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedIndexId, setSelectedIndexId] = useState<string>('sp500');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [currentRegion, setCurrentRegion] = useState<string>('United States');
  const [activeNav, setActiveNav] = useState<string>('Markets');

  // Pro Dark / Light Mode Toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tv_theme');
      return saved ? saved === 'dark' : true; // Default to sleek Pro Dark
    } catch {
      return true;
    }
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('tv_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Selected Stock or Asset for detailed inspection modal
  const [selectedItemForModal, setSelectedItemForModal] = useState<ConstituentStock | MarketAsset | null>(null);

  // Watchlist state with localStorage persistence
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_markets_watchlist');
      return saved ? JSON.parse(saved) : ['SPX', 'NVDA', 'AAPL', 'BTC/USD', 'TSLA'];
    } catch {
      return ['SPX', 'NVDA', 'AAPL', 'BTC/USD', 'TSLA'];
    }
  });

  const handleToggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol];
      localStorage.setItem('tv_markets_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const isWatchlisted = (symbol: string) => watchlist.includes(symbol);

  const selectedIndex = MAJOR_INDICES.find((i) => i.id === selectedIndexId) || MAJOR_INDICES[0];

  const handleSelectSearchResult = (item: SearchResultItem) => {
    // Check if it's an index
    const matchingIndex = MAJOR_INDICES.find((idx) => idx.symbol === item.symbol);
    if (matchingIndex) {
      setSelectedIndexId(matchingIndex.id);
      setSelectedCategory('US stocks');
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    // Check if it's in category assets
    for (const [cat, assets] of Object.entries(CATEGORY_ASSETS)) {
      const match = assets.find((a) => a.symbol === item.symbol);
      if (match) {
        setSelectedCategory(cat as MarketCategory);
        setSelectedItemForModal(match);
        return;
      }
    }

    // Check in constituents
    for (const idx of MAJOR_INDICES) {
      const match = idx.constituents.find((c) => c.symbol === item.symbol);
      if (match) {
        setSelectedItemForModal(match);
        return;
      }
    }

    // Fallback pseudo asset
    setSelectedItemForModal({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: (item.price * item.changePercent) / 100,
      changePercent: item.changePercent,
      high24h: item.price * 1.015,
      low24h: item.price * 0.985,
      volume: '1.2M',
      category: item.category || 'US stocks'
    });
  };

  const handleSelectNewsTicker = (symbol: string) => {
    const found = ALL_SEARCH_ITEMS.find((s) => s.symbol === symbol);
    if (found) {
      handleSelectSearchResult(found);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors flex flex-col justify-between selection:bg-blue-600 selection:text-white ${
        isDark ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-[#f8fafd] text-gray-900'
      }`}
    >
      {/* Top Pro Streaming Ticker Tape */}
      <TickerTape onSelectItem={handleSelectSearchResult} isDark={isDark} />

      {/* Main TradingView Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Navigation View Routing */}
      {activeNav === 'Markets' && (
        <main className="max-w-[1440px] mx-auto px-4 py-8 md:py-12 flex-1 w-full animate-in fade-in duration-200">
          {/* Hero Section with Regional Selector & Category Tabs */}
          <HeroSection
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onToggleRegionDropdown={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
            currentRegion={currentRegion}
            isRegionDropdownOpen={isRegionDropdownOpen}
            isDark={isDark}
          />

          {/* Indices Section (S&P 500, Nasdaq 100, Dow 30) */}
          <IndicesSection
            indices={MAJOR_INDICES}
            selectedIndexId={selectedIndexId}
            onSelectIndex={(id) => setSelectedIndexId(id)}
            onViewAllIndices={() => setSelectedCategory('US stocks')}
            isDark={isDark}
          />

          {/* Pro Interactive Charting Canvas, Order Book & Technicals */}
          <MarketDetailView
            index={selectedIndex}
            onSelectStock={(stock) => setSelectedItemForModal(stock)}
            onToggleWatchlist={handleToggleWatchlist}
            isWatchlisted={isWatchlisted}
            isDark={isDark}
          />

          {/* Institutional Market Breadth, Sentiment & Sector Heatmap */}
          <MarketBreadthSection isDark={isDark} />

          {/* Market Movers Screener (Gainers, Losers, Most Active, Mega-Caps) */}
          <MarketMoversScreener
            onSelectStock={(stock) => setSelectedItemForModal(stock as any)}
            onToggleWatchlist={handleToggleWatchlist}
            isWatchlisted={isWatchlisted}
            isDark={isDark}
          />

          {/* Breaking Financial News Wire with AI Sentiment Badges */}
          <FinancialNewsFeed
            onSelectTicker={handleSelectNewsTicker}
            isDark={isDark}
          />

          {/* Category Data & Content Section */}
          <CategoryContent
            category={selectedCategory}
            onSelectAsset={(asset) => setSelectedItemForModal(asset)}
            onToggleWatchlist={handleToggleWatchlist}
            isWatchlisted={isWatchlisted}
            isDark={isDark}
          />
        </main>
      )}

      {/* Secondary Nav: Products Pro Suite */}
      {activeNav === 'Products' && (
        <main className="max-w-[1440px] mx-auto px-4 py-12 flex-1 w-full animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              TradingView Pro Suite
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Next-generation charting technology, algorithmic Pine Script, and institutional execution modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'SuperCharts™ Engine',
                desc: 'Unmatched 100k+ historical bars, multi-timeframe synchronization, 15+ chart types, and 100+ native technical indicators.',
                icon: BarChart3,
                tag: 'Flagship'
              },
              {
                title: 'Pine Script® v6 IDE',
                desc: 'Write custom trading indicators and algorithmic strategies in browser with sub-millisecond backtesting engine.',
                icon: Code2,
                tag: 'Algorithmic'
              },
              {
                title: 'Multi-Asset Screener 2.0',
                desc: 'Filter 70,000+ equities, crypto tokens, forex pairs, and bond yields with 120+ financial criteria.',
                icon: Cpu,
                tag: 'Intelligence'
              }
            ].map((prod) => (
              <div
                key={prod.title}
                className={`rounded-3xl p-6 border transition-all ${
                  isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                    <prod.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                    {prod.tag}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {prod.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">{prod.desc}</p>
                <button
                  onClick={() => setIsGetStartedOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Explore in Terminal
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Secondary Nav: Community & Ideas */}
      {activeNav === 'Community' && (
        <main className="max-w-[1440px] mx-auto px-4 py-12 flex-1 w-full animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Top Community Trading Ideas
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Over 50 million active traders sharing technical setups, macro forecasts, and algorithmic scripts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                author: 'MacroMaster_Pro',
                title: 'S&P 500: Elliott Wave 5 Target at 6,150 Before Q3 Retest',
                symbol: 'SPX',
                sentiment: 'Long',
                likes: '1,420',
                time: '2h ago'
              },
              {
                author: 'SiliconTrader',
                title: 'NVIDIA: Consolidation Breakout Above $140 Fibonacci Level',
                symbol: 'NVDA',
                sentiment: 'Long',
                likes: '2,890',
                time: '4h ago'
              },
              {
                author: 'CryptoWhale_AI',
                title: 'Bitcoin: Halving Cycle Projection Towards $110,000 Milestone',
                symbol: 'BTC/USD',
                sentiment: 'Long',
                likes: '3,110',
                time: '6h ago'
              }
            ].map((idea, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 border transition-all ${
                  isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-blue-500">{idea.author}</span>
                  <span className="text-gray-400">{idea.time}</span>
                </div>
                <h4 className={`font-bold text-sm mb-3 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {idea.title}
                </h4>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#2a2e39] text-xs">
                  <span className="font-mono font-bold text-blue-400">${idea.symbol}</span>
                  <span className="font-bold text-emerald-500">● {idea.sentiment}</span>
                  <span className="text-gray-400">{idea.likes} Likes</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Secondary Nav: Brokers Integration */}
      {activeNav === 'Brokers' && (
        <main className="max-w-[1440px] mx-auto px-4 py-12 flex-1 w-full animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Direct Broker Execution
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Execute trades directly from TradingView charts with globally regulated partner brokerages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Interactive Brokers', rating: '4.9 ★', assets: 'Global Equities, Futures, FX', status: 'Direct API' },
              { name: 'TradeStation', rating: '4.8 ★', assets: 'Equities, Options, Crypto', status: 'Direct API' },
              { name: 'Alpaca Trading', rating: '4.8 ★', assets: 'Commission-Free US Stocks', status: 'Direct API' },
              { name: 'Saxo Bank', rating: '4.7 ★', assets: 'Multi-Asset Prime', status: 'Direct API' }
            ].map((broker) => (
              <div
                key={broker.name}
                className={`rounded-3xl p-6 border text-center transition-all ${
                  isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {broker.name.slice(0, 2)}
                </div>
                <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {broker.name}
                </h3>
                <div className="text-xs text-amber-500 font-bold mt-1">{broker.rating}</div>
                <p className="text-xs text-gray-400 mt-2">{broker.assets}</p>
                <button
                  onClick={() => setIsGetStartedOpen(true)}
                  className="mt-5 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Connect Account
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Secondary Nav: More */}
      {activeNav === 'More' && (
        <main className="max-w-[1440px] mx-auto px-4 py-12 flex-1 w-full animate-in fade-in duration-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h1 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Financial Terminal Platform
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Delivering sub-second latency across 100+ global financial venues
            </p>
          </div>
          <div
            className={`rounded-3xl p-8 border max-w-2xl mx-auto text-xs space-y-4 ${
              isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-sm">Regulatory Compliance & Data Integrity</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Quotes and charts are provided for educational and analytical purposes. All paper trading executions are simulated in real time with continuous liquidity matching algorithms.
            </p>
            <div className="pt-4 border-t border-gray-100 dark:border-[#2a2e39] flex justify-between items-center text-gray-400">
              <span>Terminal Version: 4.8.0-pro</span>
              <span>Data latency: 0.04 ms</span>
            </div>
          </div>
        </main>
      )}

      {/* Interactive Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSelectSearchResult}
        isDark={isDark}
      />

      <RegionDropdown
        isOpen={isRegionDropdownOpen}
        onClose={() => setIsRegionDropdownOpen(false)}
        currentRegion={currentRegion}
        onSelectRegion={(reg) => setCurrentRegion(reg)}
        isDark={isDark}
      />

      <StockDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onToggleWatchlist={handleToggleWatchlist}
        isWatchlisted={selectedItemForModal ? isWatchlisted(selectedItemForModal.symbol) : false}
        isDark={isDark}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={handleToggleWatchlist}
        onSelectItem={handleSelectSearchResult}
        isDark={isDark}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        isDark={isDark}
      />

      {/* Pro Financial Terminal Footer */}
      <footer
        className={`border-t py-8 px-4 mt-16 text-xs transition-colors ${
          isDark ? 'border-[#2a2e39] bg-[#131722] text-[#787b86]' : 'border-gray-100 bg-white text-gray-500'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              TradingView Markets Pro
            </span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span>Real-time market analytics, charting engine & institutional breadth</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-gray-400 flex-wrap justify-center">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Feeds Active
            </span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>API Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
