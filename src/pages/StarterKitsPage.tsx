import React, { useState } from 'react';
import { 
  Sprout, 
  ChevronRight, 
  Download, 
  Loader2, 
  ShieldCheck, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { FarmerStarterKits } from '../components/FarmerStarterKits';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import familyKitImg from '../assets/images/family_starter_kit_1790277954367.jpg';

interface StarterKitsPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const StarterKitsPage: React.FC<StarterKitsPageProps> = ({
  onNavigate,
  onOpenDocModal,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF('starter-kit');
      } catch (e) {
        console.error(e);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button 
            onClick={() => onNavigate('programmes')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Programmes
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">Agricultural Starter Kit System</span>
        </div>

        {/* Hero Header Banner */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={familyKitImg} 
              alt="Agricultural starter kit distribution and family farming empowerment in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <Sprout className="w-4 h-4 text-yellow-300" />
              <span>Core Field Programme · 300+ Annual Family Target</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Agricultural Starter Kit System
            </h1>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Equipping reformed citizens, single mothers, widows, and vulnerable rural smallholders with climate-resilient farming inputs, certified seed varieties, bio-secure livestock rations, and 12-month post-distribution agronomic supervision.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                ) : (
                  <Download className="w-4 h-4 text-stone-950" />
                )}
                <span>Download Starter Kit Guide (PDF)</span>
              </button>

              <button
                onClick={() => onNavigate('programmes')}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-white/25 flex items-center gap-2 cursor-pointer"
              >
                <span>All 12 Programmes Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <PillCtaButton
                onClick={() => onNavigate('get-involved')}
                size="sm"
                label="Fund a Starter Kit"
              />
            </div>
          </div>
        </div>

        {/* Agricultural Starter Kit System Showcase */}
        <FarmerStarterKits
          onNavigate={onNavigate}
          onOpenDocModal={onOpenDocModal}
        />
      </div>
    </div>
  );
};
