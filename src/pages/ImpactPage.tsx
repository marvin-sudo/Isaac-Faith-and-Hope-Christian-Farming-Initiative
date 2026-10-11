import React, { useState } from 'react';
import { 
  FileCheck2, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  Award, 
  TrendingUp,
  Loader2 
} from 'lucide-react';
import { ImpactTargets } from '../components/ImpactTargets';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import savingsImg from '../assets/images/women_village_savings_1790277977734.jpg';

interface ImpactPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF('profile');
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
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">Impact Targets &amp; Monitoring</span>
        </div>

        {/* Hero Header with Relevant Background Image */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={savingsImg} 
              alt="Village savings and loans group empowered in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <FileCheck2 className="w-4 h-4 text-yellow-300" />
              <span>Measurable Metrics &amp; 4-Tier Monitoring Standard</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Impact Targets &amp; Accountability
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              We practice strict transparency by clearly separating documented organizational targets from past outputs. Our 4-tier data monitoring standards ensure every seedling, toolset, and apprentice hour is verifiable.
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
                <span>Download Impact Standards (PDF)</span>
              </button>

              <PillCtaButton
                onClick={() => onNavigate('get-involved')}
                size="sm"
                label="Partner With Us"
              />
            </div>
          </div>
        </div>

        {/* The Impact Targets Component */}
        <ImpactTargets
          onExploreReintegration={() => onNavigate('reintegration')}
          onOpenDocModal={onOpenDocModal}
        />
      </div>
    </div>
  );
};
