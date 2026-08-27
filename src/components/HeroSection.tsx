import React from 'react';
import { MarketCategory } from '../types';

interface HeroSectionProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
  onToggleRegionDropdown: () => void;
  currentRegion: string;
  isRegionDropdownOpen: boolean;
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
  isRegionDropdownOpen
}) => {
  return (
    <section className="text-center mb-12 md:mb-16" data-purpose="hero-section">
      {/* Hero Title with Chevron Dropdown Trigger */}
      <div className="relative inline-block mb-8">
        <h1
          id="hero-markets-title"
          onClick={onToggleRegionDropdown}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-2 md:gap-3 cursor-pointer group select-none hover:text-blue-600 transition-colors"
        >
          <span>{currentRegion === 'United States' ? 'Markets, everywhere' : `Markets, ${currentRegion}`}</span>
          <svg
            className={`w-8 h-8 md:w-10 md:h-10 text-gray-900 group-hover:text-blue-600 transition-all duration-200 ${
              isRegionDropdownOpen ? 'rotate-180 text-blue-600' : ''
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
      <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-4 text-sm font-medium text-gray-500">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-150 cursor-pointer text-sm font-medium whitespace-nowrap ${
                isSelected
                  ? 'bg-gray-100 text-gray-900 font-semibold shadow-2xs'
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
