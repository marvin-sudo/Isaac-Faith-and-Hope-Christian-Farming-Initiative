import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Target, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  RefreshCw, 
  Sprout, 
  Scale, 
  Users 
} from 'lucide-react';
import treeImg from '../assets/images/tree_agroforestry_1790277966958.jpg';

interface VisionMissionPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const VisionMissionPage: React.FC<VisionMissionPageProps> = ({ onNavigate, onOpenDocModal }) => {
  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
        {/* Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={treeImg} 
            alt="Agroforestry nursery seedlings and vision in Uganda" 
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
            <span className="text-white font-semibold">Vision, Mission &amp; Core Values</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <Compass className="w-4 h-4 text-yellow-300" />
              <span>Divine Mandate &amp; Strategic Purpose</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Vision, Mission &amp; Core Values
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Grounding our hands in agricultural labor and our hearts in Jesus Christ to bring food sovereignty, restorative justice, and eternal hope to Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Statement */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Target className="w-7 h-7 text-emerald-800" />
            </div>
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold block">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Thriving, Self-Reliant &amp; Christ-Centered Communities
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              &ldquo;To see transformed, self-reliant, Christ-centered rural communities across Uganda where ex-prisoners, vulnerable youth, widows, and smallholder farming families thrive in dignity, economic stability, and spiritual maturity.&rdquo;
            </p>
            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>Generational transformation through faith and practical mastery</span>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Compass className="w-7 h-7 text-amber-800" />
            </div>
            <span className="text-xs uppercase font-sans tracking-widest text-amber-800 font-bold block">
              Our Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Breaking Poverty Through Sustainable Empowerment
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              &ldquo;To empower vulnerable populations through hands-on climate-smart agriculture, market-ready vocational skills, holistic prison ministry rehabilitation, and Christian discipleship—equipping every household to break the chains of generational poverty.&rdquo;
            </p>
            <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Practical field intervention paired with moral discipleship</span>
            </div>
          </div>
        </div>

        {/* 6 Core Values */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              Our 6 Core Values
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              The unchanging biblical convictions that govern our field operations, financial transparency, and community relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  01 · INTEGRITY
                </span>
                <span className="text-xs text-stone-500 font-serif italic">Colossians 3:23</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Christ-Centered Integrity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We work as unto the Lord, maintaining uncompromising moral uprightness, honest bookkeeping, and transparent stewardship with every donor dollar and government permit.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  02 · COMPASSION
                </span>
                <span className="text-xs text-stone-500 font-serif italic">Matthew 25:36</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Restorative Compassion</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Extending Christ’s unconditional grace to the prisoner, the widow, and the ostracized youth—eradicating social stigma and restoring human dignity through second chances.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  03 · EXCELLENCE
                </span>
                <span className="text-xs text-stone-500 font-serif italic">Proverbs 24:27</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Practical Agronomic Mastery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Refusing to settle for mediocrity. We utilize scientific soil diagnosis, high-germination nursery domes, and tested animal husbandry methods so smallholders produce real harvests.
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  04 · ACCOUNTABILITY
                </span>
                <span className="text-xs text-stone-500 font-serif italic">2 Cor 8:21</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Strict Accountability</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Practicing verifiable reporting. We clearly distinguish documented organizational targets from past outputs, operating under active Uganda NGO Bureau permit oversight.
              </p>
            </div>

            {/* Value 5 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  05 · STEWARDSHIP
                </span>
                <span className="text-xs text-stone-500 font-serif italic">Genesis 2:15</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Climate Stewardship</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Honoring the Creator by stewarding Uganda’s rich soils and water resources with organic composting, agroforestry tree cover, and water-conserving drip irrigation.
              </p>
            </div>

            {/* Value 6 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  06 · MULTIPLICATION
                </span>
                <span className="text-xs text-stone-500 font-serif italic">2 Timothy 2:2</span>
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Generational Multiplication</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every graduate is trained to mentor another. Ex-inmates mentor youths, successful farmers share seed starter kits with widows, and local churches become community care hubs.
              </p>
            </div>
          </div>
        </div>

        {/* The Transformation Continuum */}
        <div className="bg-[#07170E] rounded-3xl p-8 sm:p-12 text-white border border-stone-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-yellow-300 font-bold tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-yellow-300" />
              <span>THE FAITH + ACTION CONTINUUM</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Putting Faith in Action: 8-Step Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              How our vision transforms from an initial community call into lasting generational self-reliance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2 text-center">
            {[
              { step: '01', label: 'TRAIN', desc: 'Practical hands-on field apprenticeship' },
              { step: '02', label: 'TEST', desc: 'Scientific lab soil & feed diagnostic analysis' },
              { step: '03', label: 'TREAT', desc: 'Agronomic correction and biosecurity fixes' },
              { step: '04', label: 'PRODUCE', desc: 'All-season greenhouse & livestock harvest' },
              { step: '05', label: 'ADD VALUE', desc: 'Agro-processing, drying & packaging' },
              { step: '06', label: 'MARKET', desc: 'Direct collective contracts without middlemen' },
              { step: '07', label: 'WEALTH', desc: 'Family savings, healthcare & education' },
              { step: '08', label: 'GIVE BACK', desc: 'Mentoring new peers & rural churches' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-yellow-300 font-bold block">{item.step}</span>
                <span className="text-xs font-bold text-white block">{item.label}</span>
                <span className="text-[10px] text-stone-300 block leading-tight">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <button
            onClick={() => onNavigate('who-we-are')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>← Previous: Who We Are</span>
          </button>
          <button
            onClick={() => onNavigate('founder')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next: About the Founder →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
