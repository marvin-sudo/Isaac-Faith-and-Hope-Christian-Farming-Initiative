import React from 'react';
import { 
  FileCheck2, 
  ChevronRight
} from 'lucide-react';
import { ImpactTargets } from '../components/ImpactTargets';
import savingsImg from '../assets/images/women_village_savings_1790277977734.jpg';

interface ImpactPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
}) => {

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-white font-semibold">Impact Targets &amp; Monitoring</span>
          </div>

          <div className="max-w-3xl space-y-4">
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
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* The Impact Targets Component */}

        {/* The Impact Targets Component */}
        <ImpactTargets
          onExploreReintegration={() => onNavigate('reintegration')}
          onOpenDocModal={onOpenDocModal}
        />
      </div>
    </div>
  );
};
