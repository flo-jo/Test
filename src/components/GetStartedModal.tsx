import React, { useState } from 'react';
import { X, CheckCircle2, Zap, Shield, Globe2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isDark = false
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="get-started-modal"
        className={`relative w-full max-w-lg rounded-3xl shadow-2xl border p-8 z-10 animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors ${
            isDark
              ? 'text-[#787b86] hover:text-white hover:bg-[#131722]'
              : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs ${
              isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <h3
            className={`text-2xl font-extrabold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Start tracking markets like a Pro
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Access institutional-grade market data, custom watchlists, technical charts, and simulated paper execution.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Welcome to Markets Pro Terminal!
            </h4>
            <p className="text-xs text-gray-400">
              Your personalized institutional workstation is now activated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block text-xs font-semibold mb-1.5 ${
                  isDark ? 'text-[#d1d4dc]' : 'text-gray-700'
                }`}
              >
                Work or Personal Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@institution.com"
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:border-blue-500 transition-all ${
                  isDark
                    ? 'bg-[#131722] border-[#2a2e39] text-white placeholder-gray-500'
                    : 'bg-gray-50/50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div className="space-y-2.5 py-2">
              <div
                className={`flex items-center gap-2.5 text-xs ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited custom real-time watchlists with cloud sync</span>
              </div>
              <div
                className={`flex items-center gap-2.5 text-xs ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>TradingView style multi-indicator charting (EMA, RSI, BB, MACD)</span>
              </div>
              <div
                className={`flex items-center gap-2.5 text-xs ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero latency simulated paper trading with $100k demo margin</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 text-white text-sm font-semibold rounded-2xl transition-all shadow-md hover:opacity-95 cursor-pointer"
              style={{ background: 'linear-gradient(90deg, #2962ff, #7c4dff)' }}
            >
              Launch Terminal Free
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              No credit card required. Free tier with full real-time market access.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
