import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  X, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

// Development administrator password credential (customizable via env in production)
const ADMIN_CREDENTIAL_DEV = import.meta.env.VITE_ADMIN_PASSWORD || '1234';

interface OperationsLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OperationsLoginModal: React.FC<OperationsLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_CREDENTIAL_DEV) {
      setError(null);
      setPassword('');
      onSuccess();
    } else {
      setError('Incorrect administrator access code. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ops-modal-title"
    >
      <div 
        className="bg-[#0A2216] border border-emerald-500/30 text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Glow */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header Icon & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Restricted Staff Area</span>
              </div>
              <h3 id="ops-modal-title" className="text-xl font-serif font-bold text-white tracking-tight">
                Executive Admin &amp; Operations Portal
              </h3>
            </div>
          </div>

          {/* Description & Context */}
          <p className="text-xs text-stone-300 leading-relaxed">
            Authorized administrator access to manage website programmes, publish updates &amp; news, organize media galleries, review inquiries, and oversee operations.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="ops-password" className="block text-xs font-medium text-stone-200">
                Administrator Access Code
              </label>
              
              <div className="relative">
                <input
                  id="ops-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter administrator access code"
                  autoFocus
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/20 rounded-xl text-white placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent font-mono tracking-wider pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-300 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-xs font-bold text-[#064E3B] bg-yellow-300 hover:bg-yellow-200 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unlock Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1 border-t border-white/10">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Authorized for IFHCFI Board &amp; Field Operations</span>
          </div>
        </div>
      </div>
    </div>
  );
};
