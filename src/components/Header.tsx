import React, { useState, useEffect } from 'react';
import { Globe, User, Bookmark, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  onOpenWatchlist,
  watchlistCount,
  activeNav,
  setActiveNav
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const languages = ['EN - English', 'ES - Español', 'DE - Deutsch', 'FR - Français', 'JA - 日本語', 'ZH - 中文'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          {/* TradingView Logo Replica */}
          <a
            id="tradingview-logo-link"
            aria-label="TradingView Logo"
            className="shrink-0 flex items-center text-gray-900 hover:opacity-85 transition-opacity"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('Markets');
            }}
          >
            <svg
              fill="none"
              height="28"
              viewBox="0 0 36 28"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-900"
            >
              <path d="M14 22H7V11H0V4H14V22Z" fill="currentColor" />
              <path d="M18 22H25V4H18V22Z" fill="currentColor" />
              <path d="M36 22H29V11H22V4H36V22Z" fill="currentColor" />
            </svg>
          </a>

          {/* Search Bar with interactive trigger */}
          <div
            id="global-search-bar"
            onClick={onOpenSearch}
            className="hidden md:flex relative max-w-sm w-full group cursor-pointer"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-600 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <input
              readOnly
              className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-sm text-gray-800 placeholder-gray-500 cursor-pointer group-hover:bg-white group-hover:border-blue-400 focus:outline-none transition-all shadow-xs"
              placeholder="Search (Ctrl+K)"
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-white border border-gray-200 rounded shadow-xs">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 justify-center flex-1">
          {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                id={`nav-link-${item.toLowerCase()}`}
                onClick={() => setActiveNav(item)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: User Actions */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1 shrink-0">
          {/* Mobile Search Button */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Watchlist Quick Button */}
          <button
            id="header-watchlist-btn"
            onClick={onOpenWatchlist}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors relative"
            title="My Watchlist"
          >
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang.substring(0, 2));
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between transition-colors"
                  >
                    <span>{lang}</span>
                    {currentLang === lang.substring(0, 2) && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              id="user-profile-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="User Menu"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center justify-center"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-sm">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 text-xs">Guest Trader</p>
                  <p className="text-[11px] text-gray-500">Live Paper Mode</p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenWatchlist();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                >
                  My Watchlists ({watchlistCount})
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-blue-600 font-semibold hover:bg-blue-50"
                >
                  Upgrade to Pro
                </button>
              </div>
            )}
          </div>

          {/* Get Started Button */}
          <button
            id="get-started-cta-btn"
            onClick={onOpenGetStarted}
            className="text-white text-sm font-semibold py-2 px-5 rounded-full transition-all shadow-xs hover:shadow-md hover:opacity-95 active:scale-98 cursor-pointer"
            style={{
              background: 'linear-gradient(90deg, #2962ff, #7c4dff)'
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
