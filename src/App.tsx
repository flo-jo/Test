import React, { useState } from 'react';
import { MarketCategory, MarketIndex, ConstituentStock, MarketAsset, SearchResultItem } from './types';
import { MAJOR_INDICES, CATEGORY_ASSETS, ALL_SEARCH_ITEMS } from './data/marketData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { MarketDetailView } from './components/MarketDetailView';
import { CategoryContent } from './components/CategoryContent';
import { SearchModal } from './components/SearchModal';
import { RegionDropdown } from './components/RegionDropdown';
import { StockDetailModal } from './components/StockDetailModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedIndexId, setSelectedIndexId] = useState<string>('sp500');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [currentRegion, setCurrentRegion] = useState<string>('United States');
  const [activeNav, setActiveNav] = useState<string>('Markets');

  // Selected Stock or Asset for detailed inspection modal
  const [selectedItemForModal, setSelectedItemForModal] = useState<ConstituentStock | MarketAsset | null>(null);

  // Watchlist state with localStorage persistence
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_markets_watchlist');
      return saved ? JSON.parse(saved) : ['SPX', 'NVDA', 'AAPL', 'BTC/USD'];
    } catch {
      return ['SPX', 'NVDA', 'AAPL', 'BTC/USD'];
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
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
      {/* Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Container */}
      <main className="max-w-[1440px] mx-auto px-4 py-10 md:py-14 flex-1 w-full">
        {/* Hero Title and Category Filter Pills */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onToggleRegionDropdown={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
          currentRegion={currentRegion}
          isRegionDropdownOpen={isRegionDropdownOpen}
        />

        {/* Indices Section (S&P 500, Nasdaq 100, Dow 30) */}
        <IndicesSection
          indices={MAJOR_INDICES}
          selectedIndexId={selectedIndexId}
          onSelectIndex={(id) => setSelectedIndexId(id)}
          onViewAllIndices={() => setSelectedCategory('US stocks')}
        />

        {/* Selected Index Interactive Chart, Constituents & Metrics */}
        <MarketDetailView
          index={selectedIndex}
          onSelectStock={(stock) => setSelectedItemForModal(stock)}
          onToggleWatchlist={handleToggleWatchlist}
          isWatchlisted={isWatchlisted}
        />

        {/* Category Data & Content Section */}
        <CategoryContent
          category={selectedCategory}
          onSelectAsset={(asset) => setSelectedItemForModal(asset)}
          onToggleWatchlist={handleToggleWatchlist}
          isWatchlisted={isWatchlisted}
        />
      </main>

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSelectSearchResult}
      />

      <RegionDropdown
        isOpen={isRegionDropdownOpen}
        onClose={() => setIsRegionDropdownOpen(false)}
        currentRegion={currentRegion}
        onSelectRegion={(reg) => setCurrentRegion(reg)}
      />

      <StockDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onToggleWatchlist={handleToggleWatchlist}
        isWatchlisted={selectedItemForModal ? isWatchlisted(selectedItemForModal.symbol) : false}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={handleToggleWatchlist}
        onSelectItem={handleSelectSearchResult}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 px-4 mt-16 text-xs text-gray-500">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-gray-800">Markets Global Overview</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>Real-time feeds powered by TradingView style architecture</span>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <span>Market Data delayed by 0s (Live Simulation)</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
