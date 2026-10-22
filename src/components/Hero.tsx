import React, { useState, useEffect } from 'react';
import { ChevronDown, Sprout, Wheat, Leaf, SunMedium } from 'lucide-react';
import heroImg from '../assets/images/hero_ugandan_farming_1790193085963.jpg';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';
import livestockImg from '../assets/images/livestock_husbandry_unit_1790193113014.jpg';
import trainingImg from '../assets/images/vocational_skills_training_1790273232078.jpg';

interface HeroProps {
  onExploreProject: () => void;
  onOpenDocModal: () => void;
  onOpenDonateModal: () => void;
  onNavigate?: (page: string) => void;
}

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  tag: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  location: string;
  // Left-side dynamic text fields corresponding to the background image
  headingPrefix: string;
  headingKeyword: string;
  headingSuffix: string;
  narrativeLead: string;
  narrativeKeyword1: string;
  narrativeMid: string;
  narrativeKeyword2: string;
  narrativeClose: string;
  focusPoint: string;
  impactMetric: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'demo-hub',
    image: heroImg,
    alt: 'Lush agro-ecology demonstration crops and bio-intensive farming in Wakiso District, Uganda',
    tag: 'Flagship Demonstration Agro-Hub',
    badgeLabel: 'Agro-Ecology Demonstration Site',
    title: 'Wakiso Demonstration Agro-Hub',
    subtitle: 'Sustainable agro-ecology, vegetable gardens & bio-intensive regenerative farming.',
    location: 'Wakiso District, Uganda',
    headingPrefix: 'Restoring Dignity Through ',
    headingKeyword: 'Sustainable Agriculture',
    headingSuffix: ' & Christian Hope',
    narrativeLead: 'Empowering vulnerable rural families through ',
    narrativeKeyword1: 'bio-intensive farming',
    narrativeMid: ', ',
    narrativeKeyword2: 'food sovereignty',
    narrativeClose: ', and Christ-centered community stewardship.',
    focusPoint: 'Bio-Intensive Demonstration Crops · Wakiso District',
    impactMetric: '300+ Farm Families',
  },
  {
    id: 'greenhouse-dome',
    image: domeImg,
    alt: 'High-tech greenhouse dome nursery with seedling propagation trays and drip lines in Uganda',
    tag: 'Phase 1 Core Infrastructure',
    badgeLabel: 'Climate-Resilient Greenhouse',
    title: 'Climate-Resilient Dome Nursery',
    subtitle: 'High-germination seedling nursery multiplying quality vegetable inputs for rural farmers.',
    location: 'Wakiso Central Hub',
    headingPrefix: 'Multiplying Harvests with ',
    headingKeyword: 'High-Yield Propagation',
    headingSuffix: ' & Nursery Innovation',
    narrativeLead: 'Distributing high-germination seedlings and ',
    narrativeKeyword1: 'drought-tolerant inputs',
    narrativeMid: ' to shield smallholder farmers against ',
    narrativeKeyword2: 'climate vulnerability',
    narrativeClose: '.',
    focusPoint: 'Drip-Irrigated Seedling Propagation · Wakiso Central Hub',
    impactMetric: 'High-Yield Propagation Hub',
  },
  {
    id: 'livestock-unit',
    image: livestockImg,
    alt: 'Poultry and small animal husbandry training unit in Uganda',
    tag: 'Animal Husbandry & Micro-Enterprises',
    badgeLabel: 'Livestock & Husbandry Unit',
    title: 'Livestock & Micro-Husbandry Hub',
    subtitle: 'Zero-grazing goat breeding, poultry brooding & integrated biological compost systems.',
    location: 'Wakiso Demonstration Center',
    headingPrefix: 'Building Resilient Incomes with ',
    headingKeyword: 'Livestock Micro-Enterprises',
    headingSuffix: '',
    narrativeLead: 'Unlocking dependable household revenue for widows and youth through ',
    narrativeKeyword1: 'poultry brooding',
    narrativeMid: ' and ',
    narrativeKeyword2: 'zero-grazing goat husbandry',
    narrativeClose: '.',
    focusPoint: 'Integrated Husbandry & Biological Compost Systems',
    impactMetric: 'Zero-Grazing Enterprises',
  },
  {
    id: 'vocational-training',
    image: trainingImg,
    alt: 'Ugandan youth and community members participating in hands-on sustainable agriculture and vocational skills training',
    tag: 'Justice Ministry & Youth Mandate',
    badgeLabel: 'Restorative Justice & Skills',
    title: 'Vocational Skills & Reintegration',
    subtitle: 'Empowering ex-prisoners, vulnerable youth, and rural widows with life-changing farm mastery.',
    location: 'Countrywide Outreach & Wakiso HQ',
    headingPrefix: 'Transforming Lives Through ',
    headingKeyword: 'Vocational Mastery',
    headingSuffix: ' & Rehabilitation',
    narrativeLead: 'Equipping ex-prisoners and vulnerable youth with ',
    narrativeKeyword1: 'certified technical trades',
    narrativeMid: ', ',
    narrativeKeyword2: 'moral discipleship',
    narrativeClose: ', and purposeful economic beginnings.',
    focusPoint: '12-Month Justice Pipeline · Certified Apprenticeships',
    impactMetric: '1,000+ Trained Annually',
  },
];

const SLIDE_DURATION_MS = 6800;

export const Hero: React.FC<HeroProps> = ({
  onExploreProject,
  onOpenDocModal,
  onOpenDonateModal,
  onNavigate,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autonomous, continuous slideshow timer - transitions smoothly in sync with text
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[currentSlide];

  return (
    <section 
      className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 text-white min-h-[92vh] lg:min-h-[95vh] flex items-center justify-center bg-stone-950"
      aria-roledescription="carousel"
      aria-label="IFHCFI Visual Project Showcase Slideshow"
    >
      {/* 
        ========================================================================
        1. VISUAL IMAGE SLIDESHOW (Auto-play loop with smooth 1500ms cross-fade & Ken Burns zoom)
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black select-none">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center hero-kenburns-image ${
                  isActive ? 'is-active' : 'is-inactive'
                }`}
              />
            </div>
          );
        })}

        {/* 
          ========================================================================
          2. BALANCED OVERLAYS: Center-focused scrim allowing images to shine while keeping text legible
          ========================================================================
        */}
        <div 
          className="absolute inset-0 z-15 pointer-events-none bg-stone-950/70"
          aria-hidden="true"
        />

        {/* Subtle top & bottom edge blend for uninterrupted header and footer integration */}
        <div 
          className="absolute inset-x-0 top-0 h-32 z-15 pointer-events-none bg-gradient-to-b from-stone-950/90 to-transparent" 
          aria-hidden="true"
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-32 z-15 pointer-events-none bg-gradient-to-t from-stone-950 to-transparent" 
          aria-hidden="true"
        />
      </div>

      {/* 
        ========================================================================
        3. CENTER-ALIGNED HERO CONTENT
        ========================================================================
      */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-8 w-full text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* 
            DYNAMIC TEXT BLOCK:
            Keyed to currentSlide so that text smoothly transitions in unison with background images
          */}
          <div 
            key={currentSlide}
            className="space-y-4 max-w-3xl mx-auto text-center"
          >
            {/* Dominant Main Heading with Strong Visual Hierarchy & Bold Gold Keyword Accent */}
            <h1 className="animate-hero-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.18] tracking-tight [text-wrap:balance] text-center">
              {activeSlide.headingPrefix}
              <span className="font-extrabold text-yellow-400">
                {activeSlide.headingKeyword}
              </span>
              {activeSlide.headingSuffix}
            </h1>

            {/* Concise, Powerful Copy with Warm Highlights */}
            <p className="animate-hero-subtext text-sm sm:text-base lg:text-lg text-stone-200 leading-relaxed font-light max-w-2xl mx-auto text-center">
              {activeSlide.narrativeLead}
              <strong className="font-bold text-yellow-300">
                {activeSlide.narrativeKeyword1}
              </strong>
              {activeSlide.narrativeMid}
              <strong className="font-bold text-yellow-300">
                {activeSlide.narrativeKeyword2}
              </strong>
              {activeSlide.narrativeClose}
            </p>
          </div>

          {/* Action Buttons: Primary & Secondary centered */}
          <div className="animate-hero-actions flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* Primary 1: DONATE NOW */}
            <button
              type="button"
              onClick={onOpenDonateModal}
              className="btn-micro px-5 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-yellow-400/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-stone-950" />
              <span>DONATE NOW</span>
            </button>

            {/* Primary 2: Explore Our Programmes */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('programmes');
                else onExploreProject();
              }}
              className="btn-micro px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm tracking-wide border border-white/25 shadow-md hover:shadow-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Wheat className="w-4 h-4 text-emerald-300" />
              <span>Explore Our Programmes</span>
            </button>

            {/* Secondary 1: Our Story */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('about');
                else onOpenDocModal();
              }}
              className="btn-micro px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Leaf className="w-3.5 h-3.5 text-yellow-300" />
              <span>Our Story</span>
            </button>

            {/* Secondary 2: Volunteer With Us */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('volunteers');
              }}
              className="btn-micro px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <SunMedium className="w-3.5 h-3.5 text-amber-300" />
              <span>Volunteer With Us</span>
            </button>
          </div>

          {/* Slide dots centered */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Jump to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Quick scroll indicator to key metrics figures */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('key-metrics');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="pt-1 text-stone-300 hover:text-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono tracking-wider group"
          >
            <span>ANNUAL TARGETS</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce group-hover:text-yellow-300 text-yellow-400" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
