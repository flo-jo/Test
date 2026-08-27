import React, { useState } from 'react';
import { X, CheckCircle2, Zap, Shield, Globe2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="get-started-modal"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-10 animate-in zoom-in-95 duration-150"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">Start tracking markets</h3>
          <p className="text-sm text-gray-500 mt-1">
            Access institutional-grade market data, custom watchlists, and live alerts.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-lg font-bold text-gray-900">Welcome to Markets Pro!</h4>
            <p className="text-xs text-gray-500">Your personalized trader workstation is now active.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Work or Personal Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-gray-50/50"
              />
            </div>

            <div className="space-y-2.5 py-2">
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited custom real-time watchlists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100+ global equity, crypto, forex, & bond feeds</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero latency simulated paper trading</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 text-white text-sm font-semibold rounded-2xl transition-all shadow-md hover:opacity-95 cursor-pointer"
              style={{ background: 'linear-gradient(90deg, #2962ff, #7c4dff)' }}
            >
              Get Started Free
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              No credit card required. Free tier with full market access.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
