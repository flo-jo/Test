import React, { useState, useEffect } from 'react';
import {
  Globe,
  User,
  Bookmark,
  ChevronDown,
  Check,
  Moon,
  Sun,
  Zap,
  Briefcase,
  Search
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  onOpenWatchlist,
  watchlistCount,
  activeNav,
  setActiveNav,
  isDark,
  onToggleTheme
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const languages = [
    'EN - English',
    'ES - Español',
    'DE - Deutsch',
    'FR - Français',
    'JA - 日本語',
    'ZH - 中文'
  ];

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
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-[#131722]/95 border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-white/95 border-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Global Search */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          {/* TradingView Logo Replica */}
          <a
            id="tradingview-logo-link"
            aria-label="TradingView Logo"
            className="shrink-0 flex items-center hover:opacity-85 transition-opacity"
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
              className={isDark ? 'text-white' : 'text-gray-900'}
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
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input
              readOnly
              className={`block w-full pl-10 pr-10 py-2 border rounded-full leading-5 text-sm cursor-pointer transition-all shadow-xs ${
                isDark
                  ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc] placeholder-[#787b86] group-hover:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 group-hover:bg-white group-hover:border-blue-400'
              }`}
              placeholder="Search symbols, indices, forex (Ctrl+K)"
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd
                className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded shadow-xs border ${
                  isDark
                    ? 'bg-[#131722] text-[#787b86] border-[#2a2e39]'
                    : 'bg-white text-gray-400 border-gray-200'
                }`}
              >
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 justify-center flex-1">
          {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                id={`nav-link-${item.toLowerCase()}`}
                onClick={() => setActiveNav(item)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-blue-500 font-bold'
                    : isDark
                    ? 'text-[#787b86] hover:text-white'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Theme, Language & User */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 flex-1 shrink-0">
          {/* Mobile Search Button */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className={`md:hidden p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#1e222d] border-[#2a2e39] text-amber-400 hover:bg-[#2a2e39]'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Pro Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Watchlist Quick Button */}
          <button
            id="header-watchlist-btn"
            onClick={onOpenWatchlist}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-full transition-colors relative ${
              isDark
                ? 'hover:bg-[#1e222d] text-[#d1d4dc]'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="My Watchlist"
          >
            <Bookmark className="w-4 h-4 text-blue-500" />
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
              className={`hidden sm:flex items-center gap-1.5 text-sm font-medium px-2 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-[#1e222d] text-[#d1d4dc]'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Globe className="w-4 h-4 text-gray-400" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {langMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-44 rounded-2xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                  isDark ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-gray-100'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang.substring(0, 2));
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      isDark
                        ? 'hover:bg-[#131722] text-[#d1d4dc]'
                        : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700'
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLang === lang.substring(0, 2) && <Check className="w-3.5 h-3.5 text-blue-500" />}
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
              className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                isDark
                  ? 'hover:bg-[#1e222d] text-[#d1d4dc]'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border py-2 z-50 text-sm ${
                  isDark ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]' : 'bg-white border-gray-100'
                }`}
              >
                <div
                  className={`px-4 py-2 border-b ${
                    isDark ? 'border-[#2a2e39]' : 'border-gray-100'
                  }`}
                >
                  <p className="font-bold text-xs">Institutional Terminal</p>
                  <p className="text-[11px] text-emerald-500 font-mono flex items-center gap-1 mt-0.5">
                    ● Pro Paper Account Active
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenWatchlist();
                  }}
                  className={`w-full text-left px-4 py-2 text-xs ${
                    isDark ? 'hover:bg-[#131722]' : 'hover:bg-gray-50'
                  }`}
                >
                  My Watchlists ({watchlistCount})
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className={`w-full text-left px-4 py-2 text-xs ${
                    isDark ? 'hover:bg-[#131722]' : 'hover:bg-gray-50'
                  }`}
                >
                  Terminal Settings
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-blue-500 font-bold hover:bg-blue-500/10"
                >
                  TradingView Pro Plan
                </button>
              </div>
            )}
          </div>

          {/* Get Started Button */}
          <button
            id="get-started-cta-btn"
            onClick={onOpenGetStarted}
            className="text-white text-xs sm:text-sm font-bold py-2 px-4 sm:px-5 rounded-full transition-all shadow-md hover:opacity-95 active:scale-98 cursor-pointer"
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
