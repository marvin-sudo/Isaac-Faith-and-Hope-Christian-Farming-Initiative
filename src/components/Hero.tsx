import React, { useState, useEffect } from 'react';
import { ChevronDown, Sprout, Wheat, Leaf, SunMedium, Heart, ArrowRight } from 'lucide-react';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[currentSlide];
  const secondarySlide = SLIDES[(currentSlide + 1) % SLIDES.length];

  return (
    <section 
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 text-white min-h-[92vh] lg:min-h-[95vh] flex items-center justify-center bg-[#0e3523]"
      aria-roledescription="carousel"
      aria-label="IFHCFI Visual Project Showcase Slideshow"
    >
      {/* 
        ========================================================================
        1. RELEVANT BACKGROUND PICTURE WITH LOW TRANSPARENCY
        Photographic background of Ugandan agriculture with subtle dark green overlay
        ========================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {SLIDES.map((slide, index) => (
          <img
            key={`bg-${slide.id}`}
            src={slide.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out hero-kenburns-image ${
              index === currentSlide ? 'opacity-20 is-active' : 'opacity-0 is-inactive'
            }`}
          />
        ))}

        {/* Deep forest green gradient overlays ensuring high-contrast text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e3523]/95 via-[#0e3523]/85 to-[#0e3523]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e3523] via-transparent to-[#0e3523]/90" />

        {/* Decorative organic curved shapes from reference design */}
        <div className="absolute -top-32 -left-48 w-[580px] sm:w-[720px] h-[580px] sm:h-[720px] rounded-full bg-[#154631] opacity-60 blur-xs" />
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-[#1b533b] opacity-35 blur-xl" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#123e2b] opacity-50" />
        {/* Subtle radial dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#297a55_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      {/* 
        ========================================================================
        2. HERO CONTENT GRID: 2-Column Responsive Layout Matching Reference
        ========================================================================
      */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Narrative & Headline & Action Buttons      */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Kicker Badge: Reference Style with Warm Dot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#184834] border border-[#2d7353]/60 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Give a Helping Hand • {activeSlide.tag}</span>
            </div>

            {/* Dominant Main Heading with Strong Hierarchy & Yellow Keyword Accent */}
            <div key={currentSlide} className="space-y-4">
              <h1 className="animate-hero-headline text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.14] tracking-tight [text-wrap:balance]">
                {activeSlide.headingPrefix}
                <span className="font-extrabold text-yellow-400">
                  {activeSlide.headingKeyword}
                </span>
                {activeSlide.headingSuffix}
              </h1>

              {/* Concise, Powerful Copy with Warm Highlights */}
              <p className="animate-hero-subtext text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-light max-w-2xl">
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

            {/* Action Buttons: Primary Orange & Secondary Frosted Pills */}
            <div className="animate-hero-actions flex flex-wrap items-center gap-3 pt-2">
              {/* Primary 1: DONATE NOW (Reference Vibrant Orange Button) */}
              <button
                type="button"
                onClick={onOpenDonateModal}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-950/30 hover:shadow-orange-500/25 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>DONATE NOW</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* Primary 2: Explore Our Programmes */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('programmes');
                  else onExploreProject();
                }}
                className="px-5 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm tracking-wide border border-white/25 shadow-md hover:shadow-white/10 transition-all cursor-pointer flex items-center gap-2"
              >
                <Wheat className="w-4 h-4 text-amber-300" />
                <span>Explore Our Programmes</span>
              </button>

              {/* Secondary 1: Our Story */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('about');
                  else onOpenDocModal();
                }}
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
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
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <SunMedium className="w-3.5 h-3.5 text-amber-300" />
                <span>Volunteer With Us</span>
              </button>
            </div>

            {/* Slide dots and Annual Targets indicator */}
            <div className="flex items-center gap-5 pt-3">
              <div className="flex items-center gap-2">
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Jump to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
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
                className="text-stone-300 hover:text-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono tracking-wider group"
              >
                <span>ANNUAL TARGETS</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce group-hover:text-yellow-300 text-yellow-400" />
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Stadium Arch Layered Photography           */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none flex items-center justify-center">
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl -z-10" />

              {/* 
                Primary Stadium Arch Photo:
                Distinctive rounded-t-[100px] rounded-b-[100px] stadium pill frame
              */}
              <div className="relative w-64 sm:w-72 lg:w-80 h-[380px] sm:h-[450px] lg:h-[490px] rounded-[90px] sm:rounded-[110px] overflow-hidden border-4 border-white/20 shadow-2xl bg-stone-900 z-10 group">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Pill Badge at the bottom of the main frame */}
                <div className="absolute bottom-5 inset-x-4 bg-[#0a2318]/90 backdrop-blur-md border border-emerald-700/60 rounded-2xl p-3 text-left">
                  <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-semibold">
                    {activeSlide.badgeLabel}
                  </div>
                  <div className="text-xs text-stone-200 line-clamp-1 font-medium">
                    {activeSlide.location}
                  </div>
                </div>
              </div>

              {/* 
                Secondary Overlapping Stadium Arch Photo:
                Golden-Yellow outline frame matching the reference screenshot exactly
              */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 lg:-right-6 w-44 sm:w-52 lg:w-56 h-[270px] sm:h-[330px] lg:h-[360px] rounded-[70px] sm:rounded-[85px] overflow-hidden border-4 border-yellow-400 shadow-2xl bg-stone-900 z-20 group">
                <img
                  src={secondarySlide.image}
                  alt={secondarySlide.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 inset-x-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-stone-950 text-[10px] sm:text-[11px] font-bold shadow-md">
                    {secondarySlide.impactMetric}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
