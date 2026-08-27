import React from 'react';
import { MarketCategory } from '../types';

interface HeroSectionProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
  onToggleRegionDropdown: () => void;
  currentRegion: string;
  isRegionDropdownOpen: boolean;
  isDark?: boolean;
}

const CATEGORIES: MarketCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onToggleRegionDropdown,
  currentRegion,
  isRegionDropdownOpen,
  isDark = false
}) => {
  return (
    <section className="text-center mb-10 md:mb-14" data-purpose="hero-section">
      {/* Hero Title with Chevron Dropdown Trigger */}
      <div className="relative inline-block mb-6 md:mb-8">
        <h1
          id="hero-markets-title"
          onClick={onToggleRegionDropdown}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight flex items-center justify-center gap-2 md:gap-3 cursor-pointer group select-none transition-colors ${
            isDark
              ? 'text-white hover:text-blue-400'
              : 'text-gray-900 hover:text-blue-600'
          }`}
        >
          <span>{currentRegion === 'United States' ? 'Markets, everywhere' : `Markets, ${currentRegion}`}</span>
          <svg
            className={`w-7 h-7 md:w-9 md:h-9 transition-all duration-200 ${
              isRegionDropdownOpen
                ? 'rotate-180 text-blue-500'
                : isDark
                ? 'text-white group-hover:text-blue-400'
                : 'text-gray-900 group-hover:text-blue-600'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </h1>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3.5 text-sm font-medium">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-150 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap ${
                isSelected
                  ? isDark
                    ? 'bg-[#2a2e39] text-white font-bold ring-1 ring-[#2962ff]'
                    : 'bg-gray-100 text-gray-900 font-bold shadow-2xs'
                  : isDark
                  ? 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};
