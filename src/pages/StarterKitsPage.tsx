import React from 'react';
import { 
  Sprout, 
  ChevronRight
} from 'lucide-react';
import { FarmerStarterKits } from '../components/FarmerStarterKits';
import familyKitImg from '../assets/images/family_starter_kit_1790277954367.jpg';

interface StarterKitsPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const StarterKitsPage: React.FC<StarterKitsPageProps> = ({
  onNavigate,
  onOpenDocModal,
}) => {
  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
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
            <span className="text-white font-semibold">Agricultural Starter Kit System</span>
          </div>

          <div className="max-w-3xl space-y-4">
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
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">

        {/* Agricultural Starter Kit System Showcase */}
        <FarmerStarterKits
          onNavigate={onNavigate}
          onOpenDocModal={onOpenDocModal}
        />
      </div>
    </div>
  );
};
