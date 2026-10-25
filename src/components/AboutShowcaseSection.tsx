import React, { useState } from 'react';
import { 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  Sun,
  Wheat,
  Trees,
  Bird,
  Leaf,
  Flower2,
  ChevronDown, 
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

interface AboutShowcaseSectionProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const AboutShowcaseSection: React.FC<AboutShowcaseSectionProps> = ({
  onNavigate,
  onOpenDocModal
}) => {
  const [showAllPillars, setShowAllPillars] = useState(false);

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        {/* 
          Warm Cream Editorial Showcase Container:
          Directly reproducing the "Who We Are" cream editorial panel from the reference screenshot
        */}
        <div className="bg-[#FAF4EB] border border-[#F0E6D8] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 shadow-sm relative overflow-hidden">
          
          {/* Subtle decorative background circle */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* ======================================================== */}
            {/* LEFT COLUMN: Layered Dual Image Composition with Emblem  */}
            {/* ======================================================== */}
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                
                {/* 1. Main Primary Photo (Ugandan Farming Community) */}
                <div className="relative rounded-[28px] overflow-hidden shadow-xl border-4 border-white bg-stone-900 group">
                  <img
                    src="https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg"
                    alt="Ugandan agricultural community empowerment and harvest"
                    referrerPolicy="no-referrer"
                    className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* 2. Secondary Overlapping Photo (Seedling Nursery & Greenhouse Dome) */}
                <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-40 sm:w-56 lg:w-60 h-40 sm:h-56 lg:h-60 rounded-[24px] overflow-hidden border-4 sm:border-6 border-white shadow-2xl z-20 bg-emerald-950 group">
                  <img
                    src="https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg"
                    alt="Modern dome greenhouse and seedling nursery in Wakiso"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-serif font-bold text-amber-300 drop-shadow-xs">
                    Wakiso Seedling Hub
                  </span>
                </div>

                {/* 3. Circular Institutional Stamp Badge (Reference Archetype) */}
                <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0D281A] border-4 border-white shadow-xl flex flex-col items-center justify-center text-amber-300 z-30 group hover:rotate-6 transition-transform">
                  <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                  <span className="text-[9px] font-mono tracking-wider uppercase text-white font-bold">IFHCFI</span>
                </div>

              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: Crafted Content, Headings, Features & CTA */}
            {/* ======================================================== */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Reference Kicker with Orange Dot */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>Who We Are</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-stone-900 tracking-tight leading-[1.2]">
                About Isaac Faith &amp; Hope Christian Farming Initiative
              </h2>

              {/* Narrative Paragraph */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Isaac Faith and Hope Christian Farming Initiative (IFHCFI) is an indigenous, faith-grounded non-governmental organization dedicated to breaking cycles of rural poverty and criminal recidivism across Uganda. Rooted in Wakiso District, we unite climate-smart agriculture, vocational trade masteries, and Christian discipleship to guide vulnerable youth, widows, and ex-inmates into sustainable livelihoods and dignified self-reliance.
              </p>

              {/* Two Distinct Feature Cards with Circular Pastel Icon Badges */}
              <div className="space-y-3.5 pt-1">
                
                {/* Feature 1: Climate-Smart Agribusiness */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60 shadow-xs">
                    <Sprout className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      Climate-Smart Agribusiness &amp; Starter-Kits
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Deploying high-yield dome greenhouses, seedling propagation nurseries, and direct seed &amp; tool starter-packs distributed to 300+ vulnerable households and smallholder farmers.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Vocational Mastery & Restorative Justice */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60 shadow-xs">
                    <Wheat className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      Vocational Mastery &amp; Restorative Justice
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Equipping 1,000+ youth with certified trade apprenticeships, paired with a 12-month post-release reintegration pipeline across 6 partner prisons to eliminate reoffending.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Row: CTA Button + Leadership/Contact Details + Non-profit badge */}
              <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-[#E8DFCE]">
                
                {/* Primary CTA Button - Reference Warm Orange Pill */}
                <button
                  onClick={() => onNavigate('about')}
                  className="px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
                >
                  <span>Discover More About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Director / Coordinator Seal & Contact */}
                <div className="flex items-center gap-3.5 pl-2 sm:border-l sm:border-[#DECDB5]">
                  <img
                    src="https://www.image2url.com/r2/default/images/1787083335187-812b61ee-6fd4-486e-b8e0-f9d374ef19fb.png"
                    alt="Mukaga Titus Joshua"
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40 shadow-xs"
                  />
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Mukaga Titus Joshua
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      Country Coordinator · IFHCFI
                    </div>
                    <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>NGO Permit: INDP0007369NB</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Subtle Expansion: View All 6 Holistic Pillars Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowAllPillars(!showAllPillars)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <Trees className="w-3.5 h-3.5 text-orange-600" />
                  <span>{showAllPillars ? 'Hide 6 Development Pillars' : 'Explore All 6 Strategic Development Pillars'}</span>
                  {showAllPillars ? (
                    <ChevronUp className="w-3.5 h-3.5 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-orange-600" />
                  )}
                </button>

                {showAllPillars && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#DECDB5] animate-in fade-in duration-300">
                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                        1. Christian Faith &amp; Discipleship
                      </span>
                      <p className="text-stone-500 text-[11px]">Ethical integrity, biblical stewardship, and moral leadership.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        2. Climate-Smart Agro-Ecology
                      </span>
                      <p className="text-stone-500 text-[11px]">Greenhouse nursery propagation, composting, and drip irrigation.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Wheat className="w-3.5 h-3.5 text-amber-700" />
                        3. Vocational Trades Mastery
                      </span>
                      <p className="text-stone-500 text-[11px]">Carpentry, masonry, tailoring, and equipment maintenance.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Bird className="w-3.5 h-3.5 text-blue-600" />
                        4. Restorative Prison Reintegration
                      </span>
                      <p className="text-stone-500 text-[11px]">6 partner prisons with 12-month post-release accompaniment.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                        5. Family Starter-Kit Packs
                      </span>
                      <p className="text-stone-500 text-[11px]">Direct agricultural inputs and agronomist mentoring for 300+ households.</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E8DFCE] text-xs space-y-1">
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        <Flower2 className="w-3.5 h-3.5 text-yellow-600" />
                        6. Rural Church Uplift
                      </span>
                      <p className="text-stone-500 text-[11px]">Equipping 500+ churches as local community welfare anchors.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
