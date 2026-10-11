import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Download, 
  Sprout, 
  ShieldCheck, 
  Users,
  Loader2,
  Scale 
} from 'lucide-react';
import { ProgrammesDirectory } from '../components/ProgrammesDirectory';
import { FarmerStarterKits } from '../components/FarmerStarterKits';
import { PrisonMinistrySection } from '../components/PrisonMinistrySection';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';

interface ProgrammesPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
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
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">12 Core Programmes Directory</span>
        </div>

        {/* Hero Header with Relevant Background Image */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={domeImg} 
              alt="High-yield greenhouse dome nursery and seedling propagation in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-yellow-300" />
              <span>Institutional Portfolio · 12 Structured Initiatives</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Community &amp; Agricultural Programmes
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Explore our 12 verifiable field programmes spanning sustainable climate-smart agriculture, youth vocational skills, prison rehabilitation, and family starter-kit distributions.
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
                <span>Download Programmes Directory (PDF)</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('starter-kits');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('starter-kits');
                }}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-white/25 flex items-center gap-2 cursor-pointer"
              >
                <Sprout className="w-4 h-4 text-yellow-300" />
                <span>Agricultural Starter Kits</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('prison-ministry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('reintegration');
                }}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-white/25 flex items-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Prison Ministry &amp; Reintegration</span>
              </button>

              <PillCtaButton
                onClick={() => onNavigate('get-involved')}
                size="sm"
                label="Partner With Us"
              />
            </div>
          </div>
        </div>

        {/* Programmes Directory Component */}
        <ProgrammesDirectory
          onOpenDonateModal={() => onNavigate('get-involved')}
          onNavigate={onNavigate}
        />

        {/* ==================================================
            AGRICULTURAL STARTER KIT SYSTEM UNDER PROGRAMMES
            ================================================== */}
        <div id="starter-kits" className="pt-6">
          <FarmerStarterKits
            onNavigate={onNavigate}
            onOpenDocModal={onOpenDocModal}
          />
        </div>

        {/* ==================================================
            PRISON MINISTRY, REHABILITATION & REINTEGRATION UNDER PROGRAMMES
            ================================================== */}
        <div id="prison-ministry" className="pt-6 rounded-3xl overflow-hidden shadow-sm">
          <PrisonMinistrySection
            onNavigate={onNavigate}
            onOpenDocModal={onOpenDocModal}
          />
        </div>
      </div>
    </div>
  );
};
