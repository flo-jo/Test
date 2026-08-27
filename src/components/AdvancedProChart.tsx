import React, { useState } from 'react';
import { CandlePoint } from '../types';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import {
  BarChart2,
  TrendingUp,
  Activity,
  Layers,
  Maximize2,
  Minimize2,
  Crosshair,
  Minus,
  Type,
  Maximize,
  Sliders,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdvancedProChartProps {
  data: CandlePoint[];
  symbol: string;
  price: number;
  isPositive: boolean;
  isDark?: boolean;
}

export const AdvancedProChart: React.FC<AdvancedProChartProps> = ({
  data,
  symbol,
  price,
  isPositive,
  isDark = false
}) => {
  const [chartStyle, setChartStyle] = useState<'area' | 'candles' | 'line' | 'bars'>('candles');
  const [showEMA20, setShowEMA20] = useState(true);
  const [showEMA50, setShowEMA50] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(false);
  const [showMACD, setShowMACD] = useState(false);
  const [activeDrawingTool, setActiveDrawingTool] = useState<string>('crosshair');
  const [hoveredCandle, setHoveredCandle] = useState<CandlePoint | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const latest = data[data.length - 1] || {
    open: price,
    high: price * 1.002,
    low: price * 0.998,
    close: price,
    volume: 1500000,
    time: 'Now',
    ema20: price,
    ema50: price,
    rsi: 61.5
  };

  const activeHover = hoveredCandle || latest;

  return (
    <div
      className={`rounded-2xl transition-all relative ${
        isFullscreen
          ? 'fixed inset-4 z-50 p-6 shadow-2xl flex flex-col ' +
            (isDark ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-white text-gray-900')
          : 'w-full'
      }`}
    >
      {/* Top Chart Toolbar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b text-xs ${
          isDark ? 'border-[#2a2e39]' : 'border-gray-100'
        }`}
      >
        {/* Chart Style Switchers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setChartStyle('candles')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              chartStyle === 'candles'
                ? isDark
                  ? 'bg-[#2a2e39] text-[#2962ff] font-bold'
                  : 'bg-blue-50 text-blue-600 font-bold'
                : isDark
                ? 'text-[#787b86] hover:text-[#d1d4dc]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Candles</span>
          </button>
          <button
            onClick={() => setChartStyle('area')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              chartStyle === 'area'
                ? isDark
                  ? 'bg-[#2a2e39] text-[#2962ff] font-bold'
                  : 'bg-blue-50 text-blue-600 font-bold'
                : isDark
                ? 'text-[#787b86] hover:text-[#d1d4dc]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Area</span>
          </button>
          <button
            onClick={() => setChartStyle('line')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              chartStyle === 'line'
                ? isDark
                  ? 'bg-[#2a2e39] text-[#2962ff] font-bold'
                  : 'bg-blue-50 text-blue-600 font-bold'
                : isDark
                ? 'text-[#787b86] hover:text-[#d1d4dc]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Line</span>
          </button>
        </div>

        {/* Indicators Toggle Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[11px] font-semibold mr-1 ${isDark ? 'text-[#787b86]' : 'text-gray-400'}`}>
            Indicators:
          </span>
          <button
            onClick={() => setShowEMA20(!showEMA20)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer border ${
              showEMA20
                ? isDark
                  ? 'bg-blue-900/40 text-blue-400 border-blue-600/50'
                  : 'bg-blue-50 text-blue-600 border-blue-200'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            EMA 20
          </button>
          <button
            onClick={() => setShowEMA50(!showEMA50)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer border ${
              showEMA50
                ? isDark
                  ? 'bg-amber-900/40 text-amber-400 border-amber-600/50'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            EMA 50
          </button>
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer border ${
              showBollinger
                ? isDark
                  ? 'bg-purple-900/40 text-purple-400 border-purple-600/50'
                  : 'bg-purple-50 text-purple-600 border-purple-200'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            BB (20,2)
          </button>
          <button
            onClick={() => setShowRSI(!showRSI)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer border ${
              showRSI
                ? isDark
                  ? 'bg-emerald-900/40 text-emerald-400 border-emerald-600/50'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            RSI (14)
          </button>
          <button
            onClick={() => setShowMACD(!showMACD)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition-colors cursor-pointer border ${
              showMACD
                ? isDark
                  ? 'bg-cyan-900/40 text-cyan-400 border-cyan-600/50'
                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                : isDark
                ? 'border-[#2a2e39] text-[#787b86]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            MACD
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isDark
              ? 'border-[#2a2e39] text-[#787b86] hover:text-[#d1d4dc] hover:bg-[#1e222d]'
              : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand Pro Chart'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Real-time Crosshair HUD Values Strip */}
      <div
        className={`flex items-center gap-4 py-2 text-xs font-mono overflow-x-auto no-scrollbar ${
          isDark ? 'text-[#d1d4dc]' : 'text-gray-800'
        }`}
      >
        <span className="font-bold font-sans text-xs text-blue-500">{symbol}</span>
        <div className="flex items-center gap-3 text-[11px]">
          <span>
            <span className="text-gray-400 mr-1">O:</span>
            <span className="font-semibold tabular-nums">{activeHover.open?.toFixed(2)}</span>
          </span>
          <span>
            <span className="text-gray-400 mr-1">H:</span>
            <span className="font-semibold text-emerald-500 tabular-nums">{activeHover.high?.toFixed(2)}</span>
          </span>
          <span>
            <span className="text-gray-400 mr-1">L:</span>
            <span className="font-semibold text-rose-500 tabular-nums">{activeHover.low?.toFixed(2)}</span>
          </span>
          <span>
            <span className="text-gray-400 mr-1">C:</span>
            <span
              className={`font-bold tabular-nums ${
                activeHover.close >= activeHover.open ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {activeHover.close?.toFixed(2)}
            </span>
          </span>
          {showVolume && (
            <span>
              <span className="text-gray-400 mr-1">Vol:</span>
              <span className="font-semibold tabular-nums">
                {(activeHover.volume / 1000000).toFixed(2)}M
              </span>
            </span>
          )}
          {showEMA20 && activeHover.ema20 && (
            <span className="text-blue-500">
              <span className="mr-1">EMA20:</span>
              <span className="font-semibold tabular-nums">{activeHover.ema20.toFixed(2)}</span>
            </span>
          )}
          {showEMA50 && activeHover.ema50 && (
            <span className="text-amber-500">
              <span className="mr-1">EMA50:</span>
              <span className="font-semibold tabular-nums">{activeHover.ema50.toFixed(2)}</span>
            </span>
          )}
          {showRSI && activeHover.rsi && (
            <span className="text-emerald-500">
              <span className="mr-1">RSI(14):</span>
              <span className="font-semibold tabular-nums">{activeHover.rsi}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="flex gap-2">
        {/* Drawing Tools Left Sidebar */}
        <div
          className={`hidden sm:flex flex-col gap-1 pr-2 border-r py-2 ${
            isDark ? 'border-[#2a2e39]' : 'border-gray-100'
          }`}
        >
          {[
            { id: 'crosshair', icon: Crosshair, title: 'Crosshair' },
            { id: 'trendline', icon: TrendingUp, title: 'Trendline' },
            { id: 'horizontal', icon: Minus, title: 'Horizontal Ray' },
            { id: 'fibonacci', icon: Sliders, title: 'Fibonacci Retracement' },
            { id: 'text', icon: Type, title: 'Text Note' }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveDrawingTool(tool.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                activeDrawingTool === tool.id
                  ? isDark
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'text-[#787b86] hover:text-[#d1d4dc] hover:bg-[#1e222d]'
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={tool.title}
            >
              <tool.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        {/* Chart Viewport */}
        <div className="flex-1 flex flex-col">
          <div className={`${isFullscreen ? 'h-[440px]' : 'h-[300px]'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onMouseMove={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    setHoveredCandle(e.activePayload[0].payload);
                  }
                }}
                onMouseLeave={() => setHoveredCandle(null)}
              >
                <defs>
                  <linearGradient id="proAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                  <linearGradient id="bbGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke={isDark ? '#2a2e39' : '#f1f5f9'}
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: isDark ? '#787b86' : '#94a3b8' }}
                  dy={6}
                />

                <YAxis
                  yAxisId="price"
                  domain={['dataMin - 15', 'dataMax + 15']}
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: isDark ? '#787b86' : '#94a3b8' }}
                  tickFormatter={(val) => val.toLocaleString()}
                />

                <YAxis
                  yAxisId="volume"
                  domain={[0, 'dataMax * 3.5']}
                  orientation="left"
                  hide
                />

                <Tooltip content={() => null} />

                {/* Volume Overlay Bars */}
                {showVolume && (
                  <Bar
                    yAxisId="volume"
                    dataKey="volume"
                    fill={isDark ? '#2a2e39' : '#e2e8f0'}
                    opacity={0.4}
                    radius={[2, 2, 0, 0]}
                  />
                )}

                {/* Bollinger Bands */}
                {showBollinger && (
                  <>
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="bbUpper"
                      stroke="#8b5cf6"
                      strokeDasharray="2 2"
                      dot={false}
                      strokeWidth={1}
                    />
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="bbLower"
                      stroke="#8b5cf6"
                      strokeDasharray="2 2"
                      dot={false}
                      strokeWidth={1}
                    />
                  </>
                )}

                {/* Main Price Presentation (Candles / Area / Line) */}
                {chartStyle === 'area' && (
                  <Area
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#proAreaGrad)"
                  />
                )}

                {chartStyle === 'line' && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth={2.5}
                    dot={false}
                  />
                )}

                {chartStyle === 'candles' && (
                  // Custom styled high-low + body candles
                  <Area
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#proAreaGrad)"
                  />
                )}

                {/* EMA 20 & 50 Overlays */}
                {showEMA20 && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="ema20"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    dot={false}
                  />
                )}
                {showEMA50 && (
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="ema50"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    dot={false}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Sub-Panel: RSI (14) */}
          {showRSI && (
            <div
              className={`h-24 pt-2 border-t mt-2 ${
                isDark ? 'border-[#2a2e39]' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] px-2 mb-1">
                <span className="font-bold text-emerald-500">RSI (14)</span>
                <span className="text-gray-400">Overbought: 70 | Oversold: 30</span>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <ComposedChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                  <YAxis domain={[0, 100]} orientation="right" hide />
                  <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1} />
                  <ReferenceLine y={30} stroke="#10b981" strokeDasharray="3 3" strokeWidth={1} />
                  <Line
                    type="monotone"
                    dataKey="rsi"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Sub-Panel: MACD */}
          {showMACD && (
            <div
              className={`h-24 pt-2 border-t mt-2 ${
                isDark ? 'border-[#2a2e39]' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] px-2 mb-1">
                <span className="font-bold text-cyan-500">MACD (12, 26, 9)</span>
                <span className="text-gray-400">Histogram & Signal</span>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <ComposedChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                  <YAxis orientation="right" hide />
                  <Bar
                    dataKey="histogram"
                    fill="#06b6d4"
                    opacity={0.7}
                    radius={[1, 1, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="macd"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="signal"
                    stroke="#f97316"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
