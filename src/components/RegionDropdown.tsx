import React from 'react';
import { Check, Globe, MapPin, Sparkles, TrendingUp } from 'lucide-react';

interface RegionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: string;
  onSelectRegion: (region: string) => void;
}

const REGIONS = [
  { name: 'United States', sub: 'Wall St, NASDAQ, NYSE, CME', icon: '🇺🇸', defaultTitle: 'Markets, everywhere' },
  { name: 'Global Overview', sub: 'Worldwide 24h market coverage', icon: '🌍' },
  { name: 'Europe', sub: 'LSE, Euronext, Frankfurt, SIX', icon: '🇪🇺' },
  { name: 'Asia-Pacific', sub: 'Tokyo, Hong Kong, Shanghai, Sydney', icon: '🌏' },
  { name: 'Americas', sub: 'TSX Canada, BM&F Bovespa, BMV', icon: '🌎' },
  { name: 'Emerging Markets', sub: 'India (NSE), Brazil, Mexico, SA', icon: '🚀' }
];

export const RegionDropdown: React.FC<RegionDropdownProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onSelectRegion
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 sm:pt-40 px-4 bg-gray-900/30 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="region-dropdown-card"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-10 animate-in zoom-in-95 duration-100"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 px-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-gray-900">Select Market Region</h4>
          </div>
          <span className="text-[11px] text-gray-400">All financial exchanges</span>
        </div>

        <div className="divide-y divide-gray-50 mt-1">
          {REGIONS.map((reg) => {
            const isSelected = currentRegion === reg.name;
            return (
              <button
                key={reg.name}
                onClick={() => {
                  onSelectRegion(reg.name);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50/80 text-blue-900' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{reg.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                      <span>{reg.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{reg.sub}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
