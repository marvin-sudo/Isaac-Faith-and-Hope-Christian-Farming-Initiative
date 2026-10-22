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
    <div className="space-y-0 text-stone-900">
      {/* ==================================================
          HERO SECTION (Cinematic Ken Burns Slideshow & 4 CTA Buttons)
          ================================================== */}
      <Hero
        onExploreProject={() => onNavigate('ace-hub')}
        onOpenDocModal={onOpenDocModal}
        onOpenDonateModal={() => onNavigate('get-involved')}
        onNavigate={onNavigate}
      />

      {/* ==================================================
          SECTION 1.5: KEY METRICS COUNTER (Animated Figures)
          1,000+ Youth Annually | 300+ Families Annually
          500+ Rural Churches | 6 Partner Prison Facilities
          ================================================== */}
      <HomeStatsCounter onNavigate={onNavigate} />

      {/* ==================================================
          SECTION 2: ABOUT US (With Rich Photographic Showcase)
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
          ================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
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
                className="px-5 py-3 rounded-none bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs sm:text-sm tracking-wide transition-all border border-emerald-300 flex items-center cursor-pointer"
              >
                <span>Agricultural Starter Kits</span>
              </button>

              <button
                onClick={() => onNavigate('programmes')}
                className="px-6 py-3 rounded-none bg-[#0D281A] hover:bg-[#164E33] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center cursor-pointer"
              >
                <span>All 12 Programmes Directory</span>
              </button>
            </div>
          </div>

          {/* Alternating Programme Showcase: Zero Border Radius, No Cards, No Icons */}
          <div className="space-y-16 lg:space-y-24">
            {/* Row 1: Image Left, Explanation Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-none">
                <img
                  src="https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg"
                  alt="Agricultural Empowerment"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[420px] object-cover rounded-none"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {agriculturalProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {agriculturalProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('programmes')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer rounded-none"
                  >
                    Inspect Scope
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Opposite Sides - Explanation Left, Image Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-none">
                <img
                  src={vocationalImg}
                  alt="Vocational Skills Development"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[420px] object-cover rounded-none"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {vocationalProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {vocationalProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('programmes')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer rounded-none"
                  >
                    Inspect Scope
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Opposite Sides - Image Left, Explanation Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-none">
                <img
                  src={prisonImg}
                  alt="Prison Ministry & Reintegration"
                  className="w-full h-72 sm:h-88 md:h-96 lg:h-[420px] object-cover rounded-none"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {prisonProg.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {prisonProg.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('reintegration')}
                    className="px-6 py-3 bg-[#0D281A] hover:bg-[#164E33] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer rounded-none"
                  >
                    View 12-Month Pipeline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          REAL TESTIMONIALS (Sliding Carousel - 6 Beneficiaries - Changes Every 5 Seconds)
          ================================================== */}
      <TestimonialsCarousel onNavigate={onNavigate} />

      {/* ==================================================
          PUBLIC MEDIA GALLERY (Photo Evidence & Field Proof)
          ================================================== */}
      <PublicGallerySection />
    </div>
  );
};


