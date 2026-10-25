import React from 'react';
import { Hero } from '../components/Hero';
import { HomeStatsCounter } from '../components/HomeStatsCounter';
import { AboutShowcaseSection } from '../components/AboutShowcaseSection';
import { TransformationJourney } from '../components/TransformationJourney';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { PublicGallerySection } from '../components/PublicGallerySection';
import { 
  CORE_PROGRAMMES
} from '../data/organizationData';
import { 
  Sprout, 
  Wheat, 
  Bird, 
  FlaskConical, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Landmark,
  BadgeCheck
} from 'lucide-react';
import vocationalImg from '../assets/images/vocational_skills_training_1790273232078.jpg';
import prisonImg from '../assets/images/prison_reintegration_1790277940920.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
  onOpenOperationsPortal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenDocModal,
  onOpenOperationsPortal,
}) => {
  // Featured programmes
  const agriculturalProg = CORE_PROGRAMMES.find(p => p.id === 'prog-1') || CORE_PROGRAMMES[0];
  const vocationalProg = CORE_PROGRAMMES.find(p => p.id === 'prog-2') || CORE_PROGRAMMES[1];
  const prisonProg = CORE_PROGRAMMES.find(p => p.id === 'prog-8') || CORE_PROGRAMMES.find(p => p.id === 'prog-9') || CORE_PROGRAMMES[3];

  return (
    <div className="space-y-0 text-stone-900 font-sans">
      {/* ==================================================
          HERO SECTION (Cinematic Ken Burns Slideshow & CTA Buttons)
          ================================================== */}
      <Hero
        onExploreProject={() => onNavigate('ace-hub')}
        onOpenDocModal={onOpenDocModal}
        onOpenDonateModal={() => onNavigate('get-involved')}
        onNavigate={onNavigate}
      />

      {/* ==================================================
          PARTNER & TRUST STRIP (Reference Design Archetype)
          Clean horizontal supporter ribbon on pure white
          ================================================== */}
      <div className="bg-white border-b border-stone-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold shrink-0">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>Institutional Registrations &amp; Alliances</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 text-xs sm:text-sm font-serif font-bold text-stone-700 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 hover:text-orange-600 transition-colors">
              <Landmark className="w-4 h-4 text-orange-500" />
              <span>Ministry of Internal Affairs</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-600 transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Uganda Prisons Service</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-600 transition-colors">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Wakiso District LG</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-600 transition-colors">
              <Sprout className="w-4 h-4 text-teal-600" />
              <span>NARO Agro-Ecology Alliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          "WHAT WE DO" - 4-COLUMN CARDS WITH CIRCULAR BADGES
          Directly reproducing the reference design 4-card row
          ================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50/50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              A Trusted Charity Focused on Sustainable Community Dignity
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Grounding rural Ugandan households, youth, and reformed citizens through integrated agronomic science, vocational mastery, and Christian hope.
            </p>
          </div>

          {/* 4 Rounded Cards with Soft Tinted Circular Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Sustainable Agro-Ecology (Soft Coral / Orange Badge) */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto text-orange-600 group-hover:scale-110 transition-transform shadow-xs">
                  <Sprout className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                  Sustainable Agro-Ecology
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Bio-intensive demonstration crops, climate-resilient greenhouse dome nurseries, and certified seed inputs for rural smallholders.
                </p>
              </div>
              <button
                onClick={() => onNavigate('programmes')}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 pt-2 cursor-pointer"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Soil & Crop Diagnostics (Soft Yellow Badge) */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600 group-hover:scale-110 transition-transform shadow-xs">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                  Test Before You Treat
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Diagnostic soil nutrient profiling and plant pathology testing to prevent agricultural losses and maximize smallholder crop yields.
                </p>
              </div>
              <button
                onClick={() => onNavigate('test-before-you-treat')}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2 cursor-pointer"
              >
                <span>View Lab Testing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Vocational Trades & Apprenticeship (Soft Cyan / Teal Badge) */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 group-hover:scale-110 transition-transform shadow-xs">
                  <Wheat className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Vocational Apprenticeships
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Hands-on certified trades in carpentry, tailoring, welding, and animal husbandry, paired with foundational Christian discipleship.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ace-hub')}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 cursor-pointer"
              >
                <span>Explore Training</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: Restorative Prison Reintegration (Soft Green Badge) */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto text-teal-600 group-hover:scale-110 transition-transform shadow-xs">
                  <Bird className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                  Prison Reintegration
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Structured 12-month post-release accompaniment across 6 partner prisons, providing family reconciliation and farm starter packages.
                </p>
              </div>
              <button
                onClick={() => onNavigate('reintegration')}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 pt-2 cursor-pointer"
              >
                <span>12-Month Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 1.5: KEY METRICS COUNTER (Animated Figures)
          1,000+ Youth Annually | 300+ Families Annually
          500+ Rural Churches | 6 Partner Prison Facilities
          ================================================== */}
      <HomeStatsCounter onNavigate={onNavigate} />

      {/* ==================================================
          SECTION 2: ABOUT US (With Cream Editorial Container & Photo Collage)
          ================================================== */}
      <AboutShowcaseSection
        onNavigate={onNavigate}
        onOpenDocModal={onOpenDocModal}
      />

      {/* ==================================================
          SECTION 4: THE TRANSFORMATION JOURNEY (10 Steps)
          ================================================== */}
      <TransformationJourney onNavigate={onNavigate} />

      {/* ==================================================
          SECTION 5: OUR PROGRAMMES (12 Core Field Programmes Overview)
          Refined with Rounded-3xl Cards & Reference Action Buttons
          ================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Featured Campaigns</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Structured Programmes from Seed to Livelihood
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Explore our documented initiatives spanning agriculture, vocational apprenticeships, restorative justice, and community support:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => onNavigate('starter-kits')}
                className="px-5 py-3 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-900 font-bold text-xs sm:text-sm tracking-wide transition-all border border-orange-200 flex items-center cursor-pointer shadow-xs"
              >
                <span>Agricultural Starter Kits</span>
              </button>

              <button
                onClick={() => onNavigate('programmes')}
                className="px-6 py-3 rounded-full bg-[#0D281A] hover:bg-[#164E33] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center cursor-pointer active:scale-95"
              >
                <span>All 12 Programmes Directory</span>
              </button>
            </div>
          </div>

          {/* Alternating Programme Showcase: Beautiful Rounded-3xl Cards matching reference */}
          <div className="space-y-12 lg:space-y-16">
            {/* Row 1: Image Left, Explanation Right */}
            <div className="bg-[#FAF4EB]/50 border border-stone-200/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 lg:gap-14 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg"
                  alt="Agricultural Empowerment"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[400px] object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-orange-600">
                  Agro-Ecology &amp; Food Security
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {agriculturalProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {agriculturalProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('programmes')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer rounded-full shadow-md flex items-center gap-2"
                  >
                    <span>Inspect Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Opposite Sides - Explanation Left, Image Right */}
            <div className="bg-[#FAF4EB]/50 border border-stone-200/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-14 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={vocationalImg}
                  alt="Vocational Skills Development"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[400px] object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-600">
                  Vocational Trades &amp; Discipleship
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {vocationalProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {vocationalProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('programmes')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer rounded-full shadow-md flex items-center gap-2"
                  >
                    <span>Inspect Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Opposite Sides - Image Left, Explanation Right */}
            <div className="bg-[#FAF4EB]/50 border border-stone-200/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 lg:gap-14 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={prisonImg}
                  alt="Prison Ministry & Reintegration"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[400px] object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-teal-600">
                  Restorative Justice Pipeline
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {prisonProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {prisonProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('reintegration')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer rounded-full shadow-md flex items-center gap-2"
                  >
                    <span>View 12-Month Pipeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          REAL TESTIMONIALS (Sliding Carousel - 6 Beneficiaries)
          ================================================== */}
      <TestimonialsCarousel onNavigate={onNavigate} />

      {/* ==================================================
          PUBLIC MEDIA GALLERY (Photo Evidence & Field Proof)
          ================================================== */}
      <PublicGallerySection />
    </div>
  );
};
