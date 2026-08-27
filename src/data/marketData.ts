import { MarketIndex, MarketAsset, EconomicIndicator, SearchResultItem } from '../types';

export const MAJOR_INDICES: MarketIndex[] = [
  {
    id: 'sp500',
    name: 'S&P 500',
    symbol: 'SPX',
    badgeNumber: '500',
    badgeColor: 'bg-red-600',
    price: 5984.75,
    change: 32.40,
    changePercent: 0.54,
    high: 5998.20,
    low: 5952.10,
    open: 5960.00,
    volume: '2.45B',
    description: 'Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.',
    sectorBreakdown: [
      { name: 'Information Technology', percentage: 31.5, color: '#2563eb' },
      { name: 'Financials', percentage: 13.2, color: '#3b82f6' },
      { name: 'Healthcare', percentage: 11.8, color: '#10b981' },
      { name: 'Consumer Discretionary', percentage: 10.4, color: '#f59e0b' },
      { name: 'Communication Services', percentage: 9.1, color: '#8b5cf6' },
      { name: 'Industrials', percentage: 8.6, color: '#ec4899' },
      { name: 'Others', percentage: 15.4, color: '#64748b' }
    ],
    constituents: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.25, change: 4.15, changePercent: 3.09, marketCap: '$3.39T', volume: '48.2M', peRatio: 52.4, sparkline: [132, 134, 133, 135, 137, 138.25], sector: 'Technology', dayHigh: 139.10, dayLow: 133.50 },
      { symbol: 'AAPL', name: 'Apple Inc', price: 232.80, change: 1.65, changePercent: 0.71, marketCap: '$3.52T', volume: '36.8M', peRatio: 34.1, sparkline: [230, 231, 230.5, 232, 231.8, 232.8], sector: 'Technology', dayHigh: 234.00, dayLow: 229.80 },
      { symbol: 'MSFT', name: 'Microsoft Corp', price: 428.15, change: 2.90, changePercent: 0.68, marketCap: '$3.18T', volume: '21.4M', peRatio: 33.6, sparkline: [424, 425, 426, 427, 426.5, 428.15], sector: 'Technology', dayHigh: 430.50, dayLow: 423.20 },
      { symbol: 'AMZN', name: 'Amazon.com Inc', price: 214.60, change: 3.20, changePercent: 1.51, marketCap: '$2.26T', volume: '28.1M', peRatio: 42.8, sparkline: [210, 211, 212, 213.5, 214, 214.6], sector: 'Consumer Discretionary', dayHigh: 215.80, dayLow: 209.50 },
      { symbol: 'GOOGL', name: 'Alphabet Inc Cl A', price: 179.40, change: -0.85, changePercent: -0.47, marketCap: '$2.21T', volume: '19.3M', peRatio: 22.9, sparkline: [181, 180.5, 179.8, 179.1, 179.9, 179.4], sector: 'Communication Services', dayHigh: 181.60, dayLow: 178.50 },
      { symbol: 'META', name: 'Meta Platforms Inc', price: 652.30, change: 8.70, changePercent: 1.35, marketCap: '$1.65T', volume: '12.6M', peRatio: 27.5, sparkline: [640, 642, 646, 648, 650, 652.3], sector: 'Communication Services', dayHigh: 656.00, dayLow: 639.40 },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 468.90, change: 1.10, changePercent: 0.24, marketCap: '$1.02T', volume: '3.1M', peRatio: 19.8, sparkline: [466, 467, 468, 467.5, 468.2, 468.9], sector: 'Financials', dayHigh: 470.20, dayLow: 465.80 },
      { symbol: 'TSLA', name: 'Tesla Inc', price: 345.50, change: -5.20, changePercent: -1.48, marketCap: '$1.11T', volume: '62.5M', peRatio: 98.2, sparkline: [352, 350, 347, 349, 344, 345.5], sector: 'Consumer Discretionary', dayHigh: 355.00, dayLow: 341.20 }
    ],
    historicalData: [
      { time: '09:30', value: 5958.2 },
      { time: '10:30', value: 5964.5 },
      { time: '11:30', value: 5972.1 },
      { time: '12:30', value: 5969.8 },
      { time: '13:30', value: 5978.4 },
      { time: '14:30', value: 5982.0 },
      { time: '15:30', value: 5988.6 },
      { time: '16:00', value: 5984.75 }
    ]
  },
  {
    id: 'nasdaq100',
    name: 'Nasdaq 100',
    symbol: 'NDX',
    badgeNumber: '100',
    badgeColor: 'bg-blue-500',
    price: 21120.40,
    change: 185.30,
    changePercent: 0.88,
    high: 21185.00,
    low: 20950.20,
    open: 20990.00,
    volume: '3.89B',
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq stock market.',
    sectorBreakdown: [
      { name: 'Technology', percentage: 58.4, color: '#2563eb' },
      { name: 'Consumer Services', percentage: 18.2, color: '#f59e0b' },
      { name: 'Healthcare', percentage: 6.5, color: '#10b981' },
      { name: 'Industrials', percentage: 5.1, color: '#ec4899' },
      { name: 'Telecommunications', percentage: 4.8, color: '#8b5cf6' },
      { name: 'Others', percentage: 7.0, color: '#64748b' }
    ],
    constituents: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.25, change: 4.15, changePercent: 3.09, marketCap: '$3.39T', volume: '48.2M', peRatio: 52.4, sparkline: [132, 134, 133, 135, 137, 138.25], sector: 'Technology', dayHigh: 139.10, dayLow: 133.50 },
      { symbol: 'AAPL', name: 'Apple Inc', price: 232.80, change: 1.65, changePercent: 0.71, marketCap: '$3.52T', volume: '36.8M', peRatio: 34.1, sparkline: [230, 231, 230.5, 232, 231.8, 232.8], sector: 'Technology', dayHigh: 234.00, dayLow: 229.80 },
      { symbol: 'MSFT', name: 'Microsoft Corp', price: 428.15, change: 2.90, changePercent: 0.68, marketCap: '$3.18T', volume: '21.4M', peRatio: 33.6, sparkline: [424, 425, 426, 427, 426.5, 428.15], sector: 'Technology', dayHigh: 430.50, dayLow: 423.20 },
      { symbol: 'AVGO', name: 'Broadcom Inc', price: 188.40, change: 5.20, changePercent: 2.84, marketCap: '$880B', volume: '14.2M', peRatio: 46.1, sparkline: [181, 183, 185, 186, 187.5, 188.4], sector: 'Technology', dayHigh: 189.60, dayLow: 181.00 },
      { symbol: 'COST', name: 'Costco Wholesale', price: 978.20, change: 6.80, changePercent: 0.70, marketCap: '$434B', volume: '2.1M', peRatio: 54.2, sparkline: [970, 972, 974, 976, 975, 978.2], sector: 'Consumer Services', dayHigh: 982.00, dayLow: 969.50 },
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: 122.50, change: 2.80, changePercent: 2.34, marketCap: '$198B', volume: '34.6M', peRatio: 88.0, sparkline: [118, 119.5, 121, 120.8, 121.9, 122.5], sector: 'Technology', dayHigh: 124.00, dayLow: 117.80 }
    ],
    historicalData: [
      { time: '09:30', value: 20980.0 },
      { time: '10:30', value: 21020.4 },
      { time: '11:30', value: 21065.8 },
      { time: '12:30', value: 21040.2 },
      { time: '13:30', value: 21095.0 },
      { time: '14:30', value: 21110.5 },
      { time: '15:30', value: 21135.0 },
      { time: '16:00', value: 21120.4 }
    ]
  },
  {
    id: 'dow30',
    name: 'Dow 30',
    symbol: 'DJI',
    badgeNumber: '30',
    badgeColor: 'bg-blue-500',
    price: 43910.80,
    change: 142.10,
    changePercent: 0.32,
    high: 44020.50,
    low: 43780.10,
    open: 43810.00,
    volume: '412M',
    description: 'The Dow Jones Industrial Average is a price-weighted stock market index of 30 prominent companies listed on stock exchanges in the United States.',
    sectorBreakdown: [
      { name: 'Financial Services', percentage: 24.1, color: '#3b82f6' },
      { name: 'Healthcare', percentage: 19.4, color: '#10b981' },
      { name: 'Technology', percentage: 18.8, color: '#2563eb' },
      { name: 'Industrials', percentage: 14.2, color: '#ec4899' },
      { name: 'Consumer Goods', percentage: 13.5, color: '#f59e0b' },
      { name: 'Others', percentage: 10.0, color: '#64748b' }
    ],
    constituents: [
      { symbol: 'UNH', name: 'UnitedHealth Group', price: 588.40, change: 3.10, changePercent: 0.53, marketCap: '$542B', volume: '2.8M', peRatio: 28.4, sparkline: [584, 585, 586, 587, 588.4], sector: 'Healthcare', dayHigh: 591.00, dayLow: 582.50 },
      { symbol: 'GS', name: 'Goldman Sachs Group', price: 574.90, change: 6.20, changePercent: 1.09, marketCap: '$186B', volume: '1.9M', peRatio: 16.2, sparkline: [568, 570, 572, 573.5, 574.9], sector: 'Financials', dayHigh: 577.00, dayLow: 566.20 },
      { symbol: 'HD', name: 'Home Depot Inc', price: 412.30, change: 1.80, changePercent: 0.44, marketCap: '$408B', volume: '3.4M', peRatio: 26.8, sparkline: [409, 410, 411, 411.5, 412.3], sector: 'Consumer Services', dayHigh: 414.50, dayLow: 408.00 },
      { symbol: 'CAT', name: 'Caterpillar Inc', price: 389.70, change: -1.40, changePercent: -0.36, marketCap: '$189B', volume: '2.2M', peRatio: 17.9, sparkline: [392, 391, 390, 389.2, 389.7], sector: 'Industrials', dayHigh: 393.50, dayLow: 388.10 },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co', price: 245.80, change: 2.10, changePercent: 0.86, marketCap: '$698B', volume: '8.4M', peRatio: 12.8, sparkline: [243, 244, 244.5, 245, 245.8], sector: 'Financials', dayHigh: 247.00, dayLow: 242.60 }
    ],
    historicalData: [
      { time: '09:30', value: 43810.0 },
      { time: '10:30', value: 43860.2 },
      { time: '11:30', value: 43895.5 },
      { time: '12:30', value: 43870.0 },
      { time: '13:30', value: 43925.1 },
      { time: '14:30', value: 43940.0 },
      { time: '15:30', value: 43930.5 },
      { time: '16:00', value: 43910.8 }
    ]
  }
];

export const CATEGORY_ASSETS: Record<string, MarketAsset[]> = {
  'US stocks': [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', category: 'US stocks', price: 138.25, change: 4.15, changePercent: 3.09, high24h: 139.10, low24h: 133.50, volume: '48.2M', sparkline: [132, 134, 133, 135, 137, 138.25], extraInfo: 'Semiconductors • AI leader' },
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'US stocks', price: 232.80, change: 1.65, changePercent: 0.71, high24h: 234.00, low24h: 229.80, volume: '36.8M', sparkline: [230, 231, 230.5, 232, 231.8, 232.8], extraInfo: 'Consumer Electronics' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', category: 'US stocks', price: 428.15, change: 2.90, changePercent: 0.68, high24h: 430.50, low24h: 423.20, volume: '21.4M', sparkline: [424, 425, 426, 427, 426.5, 428.15], extraInfo: 'Software & Cloud' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', category: 'US stocks', price: 214.60, change: 3.20, changePercent: 1.51, high24h: 215.80, low24h: 209.50, volume: '28.1M', sparkline: [210, 211, 212, 213.5, 214, 214.6], extraInfo: 'E-Commerce & AWS' },
    { symbol: 'TSLA', name: 'Tesla Inc.', category: 'US stocks', price: 345.50, change: -5.20, changePercent: -1.48, high24h: 355.00, low24h: 341.20, volume: '62.5M', sparkline: [352, 350, 347, 349, 344, 345.5], extraInfo: 'Electric Vehicles & Robotics' },
    { symbol: 'META', name: 'Meta Platforms Inc.', category: 'US stocks', price: 652.30, change: 8.70, changePercent: 1.35, high24h: 656.00, low24h: 639.40, volume: '12.6M', sparkline: [640, 642, 646, 648, 650, 652.3], extraInfo: 'Social Media & AI' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', category: 'US stocks', price: 122.50, change: 2.80, changePercent: 2.34, high24h: 124.00, low24h: 117.80, volume: '34.6M', sparkline: [118, 119.5, 121, 120.8, 121.9, 122.5], extraInfo: 'Semiconductors' },
    { symbol: 'PLTR', name: 'Palantir Technologies', category: 'US stocks', price: 68.40, change: 3.10, changePercent: 4.75, high24h: 69.20, low24h: 64.80, volume: '54.1M', sparkline: [63, 64.5, 66, 65.8, 67.2, 68.4], extraInfo: 'Enterprise AI & Defense' }
  ],
  'World stocks': [
    { symbol: 'TSM', name: 'Taiwan Semiconductor', category: 'World stocks', price: 198.40, change: 3.80, changePercent: 1.95, high24h: 200.50, low24h: 194.20, volume: '18.4M', sparkline: [193, 194.5, 196, 197, 198.4], extraInfo: 'Taiwan • Foundry leader' },
    { symbol: 'ASML', name: 'ASML Holding N.V.', category: 'World stocks', price: 742.60, change: 11.20, changePercent: 1.53, high24h: 748.00, low24h: 729.00, volume: '2.1M', sparkline: [728, 732, 735, 739, 742.6], extraInfo: 'Netherlands • Lithography' },
    { symbol: 'NVO', name: 'Novo Nordisk A/S', category: 'World stocks', price: 112.30, change: -0.90, changePercent: -0.80, high24h: 114.50, low24h: 111.80, volume: '5.6M', sparkline: [114, 113.5, 113, 112.8, 112.3], extraInfo: 'Denmark • Pharmaceuticals' },
    { symbol: 'MC.PA', name: 'LVMH Moët Hennessy', category: 'World stocks', price: 635.00, change: 4.50, changePercent: 0.71, high24h: 640.20, low24h: 628.00, volume: '940K', sparkline: [628, 630, 632, 633, 635], extraInfo: 'France • Luxury Goods' },
    { symbol: '7203.T', name: 'Toyota Motor Corp', category: 'World stocks', price: 2740.00, change: 35.00, changePercent: 1.29, high24h: 2760.00, low24h: 2700.00, volume: '14.2M', sparkline: [2690, 2710, 2725, 2730, 2740], extraInfo: 'Japan • Automotive' },
    { symbol: '005930.KS', name: 'Samsung Electronics', category: 'World stocks', price: 58200.00, change: 1100.00, changePercent: 1.93, high24h: 58600.00, low24h: 57100.00, volume: '22.8M', sparkline: [56800, 57200, 57800, 58200], extraInfo: 'South Korea • Memory & Tech' }
  ],
  'Crypto': [
    { symbol: 'BTC/USD', name: 'Bitcoin', category: 'Crypto', price: 96420.00, change: 1840.00, changePercent: 1.95, high24h: 97850.00, low24h: 94200.00, volume: '$34.2B', sparkline: [93800, 94600, 95200, 96000, 96420], extraInfo: 'Market Cap: $1.90T • 58.4% Dom' },
    { symbol: 'ETH/USD', name: 'Ethereum', category: 'Crypto', price: 2745.50, change: 65.20, changePercent: 2.43, high24h: 2780.00, low24h: 2660.00, volume: '$16.8B', sparkline: [2650, 2690, 2710, 2730, 2745.5], extraInfo: 'Market Cap: $330B • Smart Contracts' },
    { symbol: 'SOL/USD', name: 'Solana', category: 'Crypto', price: 188.90, change: 7.40, changePercent: 4.08, high24h: 192.40, low24h: 179.80, volume: '$6.4B', sparkline: [178, 182, 184, 186.5, 188.9], extraInfo: 'High-Throughput L1' },
    { symbol: 'XRP/USD', name: 'XRP', category: 'Crypto', price: 2.34, change: 0.12, changePercent: 5.41, high24h: 2.42, low24h: 2.18, volume: '$8.2B', sparkline: [2.15, 2.20, 2.26, 2.30, 2.34], extraInfo: 'Cross-Border Payments' },
    { symbol: 'BNB/USD', name: 'BNB', category: 'Crypto', price: 642.10, change: 8.50, changePercent: 1.34, high24h: 648.00, low24h: 631.50, volume: '$1.4B', sparkline: [630, 634, 638, 640, 642.1], extraInfo: 'BNB Chain Ecosystem' },
    { symbol: 'ADA/USD', name: 'Cardano', category: 'Crypto', price: 0.82, change: 0.03, changePercent: 3.80, high24h: 0.84, low24h: 0.78, volume: '$920M', sparkline: [0.77, 0.79, 0.80, 0.81, 0.82], extraInfo: 'PoS Blockchain' }
  ],
  'Futures': [
    { symbol: 'CL1!', name: 'Crude Oil WTI', category: 'Futures', price: 71.45, change: 0.82, changePercent: 1.16, unit: 'USD/bbl', high24h: 72.10, low24h: 70.30, volume: '345K', sparkline: [70.2, 70.8, 71.0, 71.3, 71.45], extraInfo: 'NYMEX • Energy' },
    { symbol: 'GC1!', name: 'Gold Futures', category: 'Futures', price: 2912.80, change: 14.30, changePercent: 0.49, unit: 'USD/t oz', high24h: 2925.00, low24h: 2894.20, volume: '198K', sparkline: [2890, 2900, 2905, 2910, 2912.8], extraInfo: 'COMEX • Precious Metals' },
    { symbol: 'SI1!', name: 'Silver Futures', category: 'Futures', price: 32.85, change: 0.45, changePercent: 1.39, unit: 'USD/t oz', high24h: 33.15, low24h: 32.20, volume: '88K', sparkline: [32.1, 32.4, 32.6, 32.75, 32.85], extraInfo: 'COMEX • Precious Metals' },
    { symbol: 'NG1!', name: 'Natural Gas', category: 'Futures', price: 3.42, change: -0.08, changePercent: -2.29, unit: 'USD/MMBtu', high24h: 3.56, low24h: 3.39, volume: '142K', sparkline: [3.55, 3.50, 3.46, 3.44, 3.42], extraInfo: 'NYMEX • Energy' },
    { symbol: 'ES1!', name: 'E-mini S&P 500', category: 'Futures', price: 5992.50, change: 34.25, changePercent: 0.57, unit: 'Index Pts', high24h: 6005.00, low24h: 5958.00, volume: '1.2M', sparkline: [5960, 5972, 5980, 5988, 5992.5], extraInfo: 'CME • Equity Index' },
    { symbol: 'NQ1!', name: 'E-mini Nasdaq 100', category: 'Futures', price: 21160.00, change: 192.50, changePercent: 0.92, unit: 'Index Pts', high24h: 21220.00, low24h: 20980.00, volume: '640K', sparkline: [20990, 21050, 21100, 21140, 21160], extraInfo: 'CME • Tech Index' }
  ],
  'Forex': [
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'Forex', price: 1.0482, change: 0.0024, changePercent: 0.23, high24h: 1.0510, low24h: 1.0445, volume: '$124B', sparkline: [1.045, 1.046, 1.0475, 1.048, 1.0482], extraInfo: 'Major Currency Pair' },
    { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', category: 'Forex', price: 153.20, change: -0.45, changePercent: -0.29, high24h: 154.10, low24h: 152.80, volume: '$98B', sparkline: [153.9, 153.6, 153.4, 153.1, 153.2], extraInfo: 'Major Currency Pair' },
    { symbol: 'GBP/USD', name: 'British Pound / US Dollar', category: 'Forex', price: 1.2615, change: 0.0035, changePercent: 0.28, high24h: 1.2650, low24h: 1.2570, volume: '$62B', sparkline: [1.258, 1.259, 1.2605, 1.261, 1.2615], extraInfo: 'Cable' },
    { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', category: 'Forex', price: 0.8995, change: -0.0018, changePercent: -0.20, high24h: 0.9025, low24h: 0.8980, volume: '$34B', sparkline: [0.902, 0.901, 0.9002, 0.8996, 0.8995], extraInfo: 'Swissie' },
    { symbol: 'AUD/USD', name: 'Australian Dollar / USD', category: 'Forex', price: 0.6380, change: 0.0042, changePercent: 0.66, high24h: 0.6405, low24h: 0.6330, volume: '$41B', sparkline: [0.6335, 0.635, 0.6365, 0.6375, 0.638], extraInfo: 'Aussie' }
  ],
  'Government bonds': [
    { symbol: 'US10Y', name: 'US 10 Year Benchmark Yield', category: 'Government bonds', price: 4.42, change: -0.03, changePercent: -0.67, unit: '%', high24h: 4.46, low24h: 4.40, volume: 'Overnight', sparkline: [4.46, 4.45, 4.43, 4.41, 4.42], extraInfo: 'US Treasury Benchmark' },
    { symbol: 'US02Y', name: 'US 2 Year Benchmark Yield', category: 'Government bonds', price: 4.18, change: -0.02, changePercent: -0.48, unit: '%', high24h: 4.22, low24h: 4.16, volume: 'Overnight', sparkline: [4.21, 4.20, 4.19, 4.17, 4.18], extraInfo: 'Short-term Rate Proxy' },
    { symbol: 'US30Y', name: 'US 30 Year Benchmark Yield', category: 'Government bonds', price: 4.65, change: -0.04, changePercent: -0.85, unit: '%', high24h: 4.70, low24h: 4.63, volume: 'Overnight', sparkline: [4.69, 4.68, 4.66, 4.64, 4.65], extraInfo: 'Long-term Sovereign' },
    { symbol: 'DE10Y', name: 'Germany 10Y Bund Yield', category: 'Government bonds', price: 2.38, change: 0.01, changePercent: 0.42, unit: '%', high24h: 2.41, low24h: 2.36, volume: 'EU Sovereign', sparkline: [2.36, 2.37, 2.38, 2.375, 2.38], extraInfo: 'Eurozone Benchmark' },
    { symbol: 'GB10Y', name: 'UK 10Y Gilt Yield', category: 'Government bonds', price: 4.31, change: -0.02, changePercent: -0.46, unit: '%', high24h: 4.35, low24h: 4.29, volume: 'UK Debt', sparkline: [4.34, 4.33, 4.32, 4.30, 4.31], extraInfo: 'HM Treasury' }
  ],
  'Corporate bonds': [
    { symbol: 'HYG', name: 'iShares High Yield Corporate Bond', category: 'Corporate bonds', price: 79.85, change: 0.22, changePercent: 0.28, high24h: 80.05, low24h: 79.60, volume: '24.1M', sparkline: [79.5, 79.65, 79.75, 79.8, 79.85], extraInfo: 'US High Yield / Junk' },
    { symbol: 'LQD', name: 'iShares Investment Grade Bond', category: 'Corporate bonds', price: 108.40, change: 0.48, changePercent: 0.45, high24h: 108.70, low24h: 107.80, volume: '16.5M', sparkline: [107.8, 108.0, 108.2, 108.35, 108.4], extraInfo: 'Investment Grade Debt' },
    { symbol: 'EMB', name: 'JPMorgan USD Emerging Markets Bond', category: 'Corporate bonds', price: 92.15, change: 0.35, changePercent: 0.38, high24h: 92.40, low24h: 91.70, volume: '6.8M', sparkline: [91.6, 91.8, 92.0, 92.1, 92.15], extraInfo: 'Emerging Market Sovereign & Corp' }
  ],
  'ETFs': [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', category: 'ETFs', price: 597.40, change: 3.20, changePercent: 0.54, high24h: 598.80, low24h: 594.10, volume: '58.2M', sparkline: [594, 595.5, 596.5, 597, 597.4], extraInfo: 'AUM: $612B • US Large Cap' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', category: 'ETFs', price: 512.60, change: 4.45, changePercent: 0.88, high24h: 514.50, low24h: 508.20, volume: '41.3M', sparkline: [508, 510, 511.5, 512, 512.6], extraInfo: 'AUM: $305B • Nasdaq 100' },
    { symbol: 'IWM', name: 'iShares Russell 2000 ETF', category: 'ETFs', price: 226.80, change: 2.10, changePercent: 0.93, high24h: 228.00, low24h: 224.20, volume: '22.8M', sparkline: [224, 225.2, 226, 226.5, 226.8], extraInfo: 'US Small Cap Benchmark' },
    { symbol: 'SMH', name: 'VanEck Semiconductor ETF', category: 'ETFs', price: 264.30, change: 6.80, changePercent: 2.64, high24h: 266.00, low24h: 257.50, volume: '8.9M', sparkline: [257, 260, 262, 263.5, 264.3], extraInfo: 'Semiconductor Industry' },
    { symbol: 'XLF', name: 'Financial Select Sector SPDR', category: 'ETFs', price: 49.20, change: 0.35, changePercent: 0.72, high24h: 49.45, low24h: 48.80, volume: '31.4M', sparkline: [48.8, 49.0, 49.1, 49.15, 49.2], extraInfo: 'Banking & Financials' }
  ],
  'Economy': [
    { symbol: 'FEDFUNDS', name: 'Federal Funds Effective Rate', category: 'Economy', price: 4.58, change: 0.00, changePercent: 0.00, unit: '%', high24h: 4.58, low24h: 4.58, volume: 'Monthly', sparkline: [5.33, 5.08, 4.83, 4.58, 4.58], extraInfo: 'Target Range: 4.25% - 4.50%' },
    { symbol: 'USCPI', name: 'US Consumer Price Index (YoY)', category: 'Economy', price: 2.70, change: -0.10, changePercent: -3.57, unit: '%', high24h: 2.80, low24h: 2.60, volume: 'Monthly', sparkline: [3.4, 3.1, 2.9, 2.8, 2.7], extraInfo: 'Headline Inflation' },
    { symbol: 'USGDP', name: 'US GDP Growth Annualized', category: 'Economy', price: 2.80, change: 0.20, changePercent: 7.69, unit: '%', high24h: 3.00, low24h: 2.50, volume: 'Quarterly', sparkline: [1.6, 2.8, 3.0, 2.8, 2.8], extraInfo: 'Real Economic Expansion' },
    { symbol: 'USUR', name: 'US Unemployment Rate', category: 'Economy', price: 4.10, change: 0.00, changePercent: 0.00, unit: '%', high24h: 4.20, low24h: 4.00, volume: 'Monthly', sparkline: [3.8, 4.0, 4.1, 4.2, 4.1], extraInfo: 'Labor Market Health' }
  ]
};

export const ECONOMIC_CALENDAR: EconomicIndicator[] = [
  { title: 'Core PCE Price Index (MoM)', country: 'United States', flag: '🇺🇸', current: '0.2%', previous: '0.2%', forecast: '0.2%', impact: 'high', releaseDate: 'Tomorrow, 08:30 AM', frequency: 'Monthly', description: 'Federal Reserve favorite inflation gauge measuring price changes in goods and services purchased by consumers.' },
  { title: 'Non-Farm Payrolls', country: 'United States', flag: '🇺🇸', current: '227K', previous: '12K', forecast: '200K', impact: 'high', releaseDate: 'Friday, 08:30 AM', frequency: 'Monthly', description: 'Measures the change in the number of employed people during the previous month, excluding the farming industry.' },
  { title: 'ECB Interest Rate Decision', country: 'Eurozone', flag: '🇪🇺', current: '3.00%', previous: '3.25%', forecast: '3.00%', impact: 'high', releaseDate: 'Next Thu, 13:15 CET', frequency: '6 Weeks', description: 'European Central Bank main refinancing operations rate.' },
  { title: 'S&P Global Flash Manufacturing PMI', country: 'United States', flag: '🇺🇸', current: '49.7', previous: '48.5', forecast: '49.2', impact: 'medium', releaseDate: 'In 3 days', frequency: 'Monthly', description: 'Indicator of economic health for the manufacturing sector.' }
];

export const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  { symbol: 'SPX', name: 'S&P 500 Index', type: 'Index', exchange: 'CBOE', category: 'US stocks', price: 5984.75, changePercent: 0.54 },
  { symbol: 'NDX', name: 'Nasdaq 100 Index', type: 'Index', exchange: 'NASDAQ', category: 'US stocks', price: 21120.40, changePercent: 0.88 },
  { symbol: 'DJI', name: 'Dow Jones Industrial Average', type: 'Index', exchange: 'DJI', category: 'US stocks', price: 43910.80, changePercent: 0.32 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 138.25, changePercent: 3.09 },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 232.80, changePercent: 0.71 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 428.15, changePercent: 0.68 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 214.60, changePercent: 1.51 },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 345.50, changePercent: -1.48 },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Stock', exchange: 'NASDAQ', category: 'US stocks', price: 652.30, changePercent: 1.35 },
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', type: 'Crypto', exchange: 'Coinbase', category: 'Crypto', price: 96420.00, changePercent: 1.95 },
  { symbol: 'ETH/USD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'Binance', category: 'Crypto', price: 2745.50, changePercent: 2.43 },
  { symbol: 'SOL/USD', name: 'Solana / US Dollar', type: 'Crypto', exchange: 'Kraken', category: 'Crypto', price: 188.90, changePercent: 4.08 },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'Forex', exchange: 'FXCM', category: 'Forex', price: 1.0482, changePercent: 0.23 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', type: 'Forex', exchange: 'OANDA', category: 'Forex', price: 153.20, changePercent: -0.29 },
  { symbol: 'CL1!', name: 'Crude Oil WTI', type: 'Futures', exchange: 'NYMEX', category: 'Futures', price: 71.45, changePercent: 1.16 },
  { symbol: 'GC1!', name: 'Gold Futures', type: 'Futures', exchange: 'COMEX', category: 'Futures', price: 2912.80, changePercent: 0.49 },
  { symbol: 'US10Y', name: 'US 10-Year Bond Yield', type: 'Bond', exchange: 'Treasury', category: 'Government bonds', price: 4.42, changePercent: -0.67 },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'ETF', exchange: 'NYSE Arca', category: 'ETFs', price: 597.40, changePercent: 0.54 },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', exchange: 'NASDAQ', category: 'ETFs', price: 512.60, changePercent: 0.88 }
];

export function generateChartPoints(basePrice: number, timeframe: string, count = 30) {
  const points = [];
  let current = basePrice * (timeframe === '1Y' ? 0.82 : timeframe === '5Y' ? 0.48 : 0.98);
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const randomDelta = (Math.random() - 0.47) * (basePrice * 0.015);
    current = Math.max(current + randomDelta, basePrice * 0.4);
    
    let label = '';
    if (timeframe === '1D') {
      const d = new Date(now.getTime() - (count - i) * 12 * 60 * 1000);
      label = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '5D') {
      const d = new Date(now.getTime() - (count - i) * 4 * 3600 * 1000);
      label = d.toLocaleDateString([], { weekday: 'short', hour: 'numeric' });
    } else if (timeframe === '1M') {
      const d = new Date(now.getTime() - (count - i) * 24 * 3600 * 1000);
      label = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else if (timeframe === '6M' || timeframe === 'YTD') {
      const d = new Date(now.getTime() - (count - i) * 6 * 24 * 3600 * 1000);
      label = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      const d = new Date(now.getTime() - (count - i) * 30 * 24 * 3600 * 1000);
      label = d.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    points.push({
      time: label,
      value: Number(current.toFixed(2)),
      volume: Math.floor(Math.random() * 800000) + 200000
    });
  }

  // Ensure last point hits roughly basePrice
  points[points.length - 1].value = basePrice;
  return points;
}
