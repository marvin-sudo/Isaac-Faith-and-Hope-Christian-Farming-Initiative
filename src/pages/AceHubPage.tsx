import React from 'react';
import { ChevronRight, Sprout, Wheat, Download, ShieldCheck, MapPin } from 'lucide-react';
import { AceHubProgramme } from '../components/AceHubProgramme';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';

interface AceHubPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const AceHubPage: React.FC<AceHubPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
}) => {
  const handleDownloadDossier = () => {
    generateAndDownloadPDF('concept-note');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
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
          <span className="text-emerald-900 font-semibold">
            ACE Hub · Combat Empowerment Center
          </span>
        </div>

        {/* Dedicated Page Hero Header (Borderless, Premium Architecture) */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Ambient Gradient */}
          <div className="absolute inset-0 z-0">
            <img 
              src={domeImg} 
              alt="ACE Hub Flagship Demonstration Complex in Wakiso District, Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Flagship Regional Complex · Wakiso District, Uganda</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Aid Combat Empowerment Center (ACE Hub)
            </h1>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Our 5-facility integrated regional hub anchoring sustainable farming, laboratory diagnostics, vocational trades, and post-release restorative justice. Serving as a living blueprint for rural economic self-sufficiency across East Africa.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadDossier}
                className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>Download ACE Hub Concept Note (PDF)</span>
              </button>

              <button
                onClick={() => onNavigate('get-involved')}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-white/25 flex items-center gap-2 cursor-pointer"
              >
                <Wheat className="w-4 h-4 text-yellow-300" />
                <span>Partner With the Hub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated ACE Hub Comprehensive Programme Showcase */}
        <AceHubProgramme
          onNavigate={onNavigate}
          onOpenDonateModal={() => onNavigate('get-involved')}
          onOpenDocModal={onOpenDocModal}
        />
      </div>
    </div>
  );
};
