import React from 'react';
import { ChevronRight, Sprout } from 'lucide-react';
import { AceHubProgramme } from '../components/AceHubProgramme';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';

interface AceHubPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const AceHubPage: React.FC<AceHubPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
}) => {

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <button 
              onClick={() => onNavigate('programmes')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Programmes
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-white font-semibold">
              ACE Hub · Combat Empowerment Center
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
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
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
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
