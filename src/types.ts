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
  recommendation?: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
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
  marketCap?: string;
  peRatio?: number;
  sector?: string;
  recommendation?: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
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

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20?: number;
  ema50?: number;
  rsi?: number;
  macd?: number;
  signal?: number;
  histogram?: number;
  bbUpper?: number;
  bbLower?: number;
  bbMiddle?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timeAgo: string;
  tickers: string[];
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentimentScore: number;
  category: 'Equities' | 'Crypto' | 'Macro' | 'Commodities' | 'Forex';
  url?: string;
}

export interface PaperPosition {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: string;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface SectorPerformance {
  name: string;
  changePercent: number;
  marketCapWeight: number;
  topContributor: string;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
}
