import React from 'react';
import { 
  BookOpen, 
  ChevronRight,
  TestTube,
  ArrowRight
} from 'lucide-react';
import { ProgrammesDirectory } from '../components/ProgrammesDirectory';
import { FarmerStarterKits } from '../components/FarmerStarterKits';
import { PrisonMinistrySection } from '../components/PrisonMinistrySection';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';

interface ProgrammesPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({ 
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
            src={domeImg} 
            alt="High-yield greenhouse dome nursery and seedling propagation in Uganda" 
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
            <span className="text-white font-semibold">12 Core Programmes Directory</span>
          </div>

          <div className="max-w-3xl space-y-4">
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
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">

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
            FEATURED INITIATIVE: TEST BEFORE YOU TREAT LABORATORY
            ================================================== */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <TestTube className="w-3.5 h-3.5 text-yellow-300" />
              <span>Scientific Agronomic Foundation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Test before you treat
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Eliminating agricultural guesswork in rural communities. Accessible soil chemistry, seed germination testing, feed toxin screening, and plant pathology to prevent devastating farm losses before they occur.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('test-before-you-treat')}
              className="px-5 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Diagnostic Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
