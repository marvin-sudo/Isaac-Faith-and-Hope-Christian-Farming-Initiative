import React from 'react';
import { 
  Building2, 
  ChevronRight, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { DevelopmentModel } from '../components/DevelopmentModel';
import { 
  OFFICIAL_REGISTRATION, 
  ANNUAL_TARGETS, 
  CORE_FACILITIES
} from '../data/organizationData';
import treeImg from '../assets/images/tree_agroforestry_1790277966958.jpg';

interface MinistryProfilePageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const MinistryProfilePage: React.FC<MinistryProfilePageProps> = ({ 
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
            src={treeImg} 
            alt="Ministry profile and institutional governance in Uganda" 
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
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-white font-semibold">Ministry Profile</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <FileText className="w-4 h-4 text-yellow-300" />
              <span>Institutional Portfolio &amp; Technical Dossier</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Official Ministry Profile
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Complete institutional summary of IFHCFI’s statutory registration, countrywide operating license, 7-pillar development model, and 5-year strategic targets.
            </p>
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Statutory Registration Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Statutory Credentials
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Legal Status &amp; Regulatory Filings
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified by Uganda NGO Bureau</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs font-sans">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Full Legal Name</span>
              <div className="text-sm font-serif font-bold text-stone-900">{OFFICIAL_REGISTRATION.organizationName}</div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Registration File Number</span>
              <div className="text-sm font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.registrationFileNo}</div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Operating Permit Number</span>
              <div className="text-sm font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitNo}</div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Permit Duration</span>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitDuration} (Active from {OFFICIAL_REGISTRATION.commencementDate})</div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Jurisdictional Mandate</span>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.operationalArea}</div>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-stone-500 font-medium">Headquarters &amp; Flagship Hub</span>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.flagshipLocation}</div>
            </div>
          </div>
        </div>

        {/* 7-Pillars Development Architecture */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Development Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              The 7-Pillar Holistic Development Architecture
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              How faith, technical skills, agriculture, and justice ministry interact to create self-sustaining rural communities.
            </p>
          </div>
          <DevelopmentModel />
        </div>

        {/* Core Infrastructure & Physical Facilities Network */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              5 Core Physical Facilities at Wakiso Campus
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Built to demonstrate practical sustainability and host ongoing vocational apprentice cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_FACILITIES.map((facility) => (
              <div key={facility.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {facility.category}
                  </span>
                  <Building2 className="w-4 h-4 text-stone-400" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">{facility.name}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{facility.purpose}</p>
                <div className="pt-2 border-t border-stone-200/60 space-y-1">
                  <span className="text-[10px] uppercase font-mono font-semibold text-stone-500">Key Components:</span>
                  <ul className="text-[11px] text-stone-700 space-y-0.5 list-disc list-inside">
                    {facility.keyComponents.slice(0, 2).map((comp, idx) => (
                      <li key={idx} className="line-clamp-1">{comp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Documented Targets Overview */}
        <div className="bg-[#07170E] rounded-3xl p-8 sm:p-10 text-white border border-stone-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-yellow-300 font-bold tracking-wider">
              QUANTIFIABLE MEASURES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Verified Annual Institutional Targets
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Operating with strict transparency: these reflect documented targets authorized under our national charter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {ANNUAL_TARGETS.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-bold text-yellow-300">
                  {item.target}
                </div>
                <div className="text-xs font-semibold text-white">{item.category}</div>
                <p className="text-[11px] text-stone-400 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <button
            onClick={() => onNavigate('volunteers')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>← Previous: Volunteers</span>
          </button>
          <button
            onClick={() => onNavigate('who-we-are')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Return to: Who We Are →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
