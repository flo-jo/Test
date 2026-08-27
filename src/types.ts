export type MarketCategory = 
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  badgeNumber: string;
  badgeColor: string; // e.g. 'bg-red-600', 'bg-blue-500'
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: string;
  historicalData: { time: string; value: number; volume?: number }[];
  constituents: ConstituentStock[];
  description: string;
  sectorBreakdown: { name: string; percentage: number; color: string }[];
}

export interface ConstituentStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  peRatio?: number;
  sparkline: number[];
  sector: string;
  dayHigh: number;
  dayLow: number;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  unit?: string;
  high24h: number;
  low24h: number;
  volume: string;
  sparkline: number[];
  extraInfo?: string;
}

export interface EconomicIndicator {
  title: string;
  country: string;
  flag: string;
  current: string;
  previous: string;
  forecast: string;
  impact: 'high' | 'medium' | 'low';
  releaseDate: string;
  frequency: string;
  description: string;
}

export interface SearchResultItem {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  category: MarketCategory;
  price: number;
  changePercent: number;
}
