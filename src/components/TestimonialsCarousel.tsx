import React, { useState, useEffect, useRef } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Heart,
  Calendar,
  Building2,
  Sprout
} from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  programme: string;
  quote: string;
  fullStory: string;
  verifiedMetric: string;
  avatar: string;
  storyImage: string;
  date: string;
  badge: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ronald Kisekka',
    role: 'Former Inmate & Greenhouse Nursery Lead',
    location: 'Kasangati Correctional Area & Wakiso District',
    programme: 'Prison Reintegration & 12-Month Pipeline',
    quote: 'IFHCFI did not just visit me in prison and wave goodbye. They met me at the gate on release day, walked with me through family reconciliation, and handed me certified seeds. Today, my garden is bearing fruit.',
    fullStory: 'After serving a 4-year sentence, Ronald faced severe social alienation. Through weekly prison discipleship and post-release nursery apprenticeship at the ACE Hub, he now leases a 1.2-acre horticulture plot producing cabbage, bell peppers, and nursery seedlings for the local market with zero police re-arrest.',
    verifiedMetric: '1.2 Acres Cultivated · Zero Recidivism',
    avatar: 'https://i.postimg.cc/L6fNBW26/download-(11).jpg',
    storyImage: 'https://i.postimg.cc/L6fNBW26/download-(11).jpg',
    date: 'Enrolled Nov 2024 · Active Beneficiary',
    badge: 'Restorative Justice Graduate'
  },
  {
    id: 'test-2',
    name: 'Grace Nabatanzi',
    role: 'Widow & Micro-Husbandry Cooperative Leader',
    location: 'Buwambo Parish, Wakiso District',
    programme: 'Agricultural Starter Kit System',
    quote: 'Losing my husband left me with four young children and depleted soil. The starter kit gave us certified soil lime, nursery trays, and a healthy zero-grazing goat pair. We went from begging for food to producing milk and fresh spinach daily.',
    fullStory: 'Grace participated in diagnostic soil testing, which identified high soil acidity on her family land. Following organic lime remediation and receiving dairy breeding stock, Grace’s household has passed on a female kid to another struggling widow in Buwambo under our community gift covenant.',
    verifiedMetric: '2 Liters Fresh Milk / Day · Goat Pass-On Complete',
    avatar: 'https://i.postimg.cc/BvyKzqCS/download-(9).jpg',
    storyImage: 'https://i.postimg.cc/BvyKzqCS/download-(9).jpg',
    date: 'Cohort 2025 · Cooperative Lead',
    badge: 'Starter-Kit Recipient'
  },
  {
    id: 'test-3',
    name: 'Pastor Emmanuel Ssemakula',
    role: 'Rural Church Pastor & Parish Mobilizer',
    location: 'Wobulenzi, Luweero District',
    programme: 'Rural Church Outreach & Discipleship',
    quote: 'In rural Uganda, spiritual ministry cannot be separated from daily sustenance. Partnering with IFHCFI brought solar drip training and quality seeds to 80 families in our fellowship. Our church parish plot is now a beacon of Gospel hope.',
    fullStory: 'Pastor Emmanuel mobilized 80 struggling smallholders into a cooperative agricultural fellowship. The parish demonstration plot now provides supplementary nutrition for Sunday school children and generates emergency welfare funds for village orphans.',
    verifiedMetric: '80 Rural Families Mobilized · Parish Demo Hub',
    avatar: 'https://i.postimg.cc/Z5SjfL5p/download-(10).jpg',
    storyImage: 'https://i.postimg.cc/Z5SjfL5p/download-(10).jpg',
    date: 'Partner Church Network #LC-034',
    badge: 'Pastoral Partner'
  },
  {
    id: 'test-4',
    name: 'Joan Namusoke',
    role: 'Youth Agro-Apprentice & Grafting Specialist',
    location: 'Matugga, Wakiso District',
    programme: 'Youth Livelihoods & Agro-Apprenticeship',
    quote: 'As an out-of-school youth, I felt invisible. The 6-month hands-on apprenticeship at the Combat Center taught me precision greenhouse management and hybrid nursery propagation. I now manage my own commercial seedling nursery.',
    fullStory: 'Joan mastered climate-smart seedling propagation in the ACE Hub dome farm. She supplies certified disease-free tomato and chili seedlings to over 40 smallholders each planting season, providing an independent income that funds her tertiary accounting studies.',
    verifiedMetric: '15,000+ Seedlings / Mo · Certified Nursery Specialist',
    avatar: 'https://i.postimg.cc/ZRddt1fq/Five-reasons-life-is-hard-for-women-in-2017-(and-ways-you-can-help).jpg',
    storyImage: 'https://i.postimg.cc/ZRddt1fq/Five-reasons-life-is-hard-for-women-in-2017-(and-ways-you-can-help).jpg',
    date: 'Graduated Aug 2025 · Youth Cohort',
    badge: 'ACE Hub Graduate'
  },
  {
    id: 'test-5',
    name: 'David Ochen',
    role: 'Reformed Citizen & Master Carpenter',
    location: 'Busia Border Corridor & Eastern Region',
    programme: 'Prison Restorative Justice Protocol',
    quote: 'While incarcerated at Busia, Pastor Titus taught us that God’s grace is bigger than our mistakes. Upon discharge, IFHCFI mediated my return home to my clan and provided a carpentry kit. I now train three younger boys in our village.',
    fullStory: 'David completed restorative counseling while serving time and was reconciled with his family upon release through an IFHCFI facilitated village elder session. His carpentry workshop builds classroom desks for local schools and poultry brooders for smallholder farmers.',
    verifiedMetric: '3 Local Youths Employed · Reconciled Clan Standing',
    avatar: 'https://i.postimg.cc/pTszBD16/download-(12).jpg',
    storyImage: 'https://i.postimg.cc/pTszBD16/download-(12).jpg',
    date: 'Busia Correctional Facility Re-Entry #BS-11',
    badge: 'Community Restored'
  },
  {
    id: 'test-6',
    name: 'Sarah Auma',
    role: 'Smallholder Farmer & Bio-Inputs Champion',
    location: 'Nakasongola Drylands, Central Region',
    programme: 'Climate-Resilient Crops & Bio-Security',
    quote: 'Drought and cassava mosaic disease wiped out our harvests two years in a row. IFHCFI tested our soil, introduced clean mosaic-resistant stems, and trained us in mulch moisture retention. We harvested a 4-ton surplus this dry season.',
    fullStory: 'Sarah leads a cluster of 15 women farmers in Nakasongola utilizing organic bio-inputs and zero-chemical pest controls taught during IFHCFI field days. Her surplus cassava provides staple flour for her family and generates school fees for her daughters.',
    verifiedMetric: '4-Ton Surplus Harvest · 15 Farmers Co-op Leader',
    avatar: 'https://i.postimg.cc/hjTf3Vjj/download-(8).jpg',
    storyImage: 'https://i.postimg.cc/hjTf3Vjj/download-(8).jpg',
    date: 'Central Drylands Outgrower #NK-08',
    badge: 'Climate-Smart Farmer'
  }
];

interface TestimonialsCarouselProps {
  onNavigate?: (page: string) => void;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide to the left every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection('left');
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5] border-b border-stone-200 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Real Lives Changed From Seed to Harvest
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Read first-hand accounts from reformed citizens, widowed mothers, parish pastors, and youth apprentices actively empowered across Uganda.
            </p>
          </div>

          {/* Autoplay Controls & Manual Navigation */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full bg-white border border-stone-200 hover:border-emerald-400 text-stone-700 hover:text-emerald-900 shadow-xs transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title={isPaused ? "Resume auto-sliding (5s)" : "Pause auto-sliding"}
              aria-label={isPaused ? "Play slider" : "Pause slider"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-700" /> : <Pause className="w-3.5 h-3.5 text-stone-600" />}
              <span className="hidden sm:inline font-mono text-[11px]">
                {isPaused ? 'Paused' : 'Auto 5s'}
              </span>
            </button>

            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-stone-200 hover:border-orange-500 hover:bg-orange-50 text-stone-800 hover:text-orange-950 shadow-xs transition-all cursor-pointer active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#0D281A] hover:bg-orange-600 text-white shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Testimonial Card with Slide-To-Left Animation */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl">
          {/* Subtle Top 5-second Progress Bar */}
          <div className="h-1.5 w-full bg-stone-100 overflow-hidden">
            <div 
              key={`${currentIndex}-${isPaused}`}
              className={`h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 ${
                isPaused ? 'w-full opacity-60' : 'animate-progress-5s'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Visual Photography Column (5 cols) */}
            <div className="lg:col-span-5 relative bg-stone-950 overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-full">
              <img
                src={current.storyImage}
                alt={`${current.name} field activity and training in Uganda`}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              {/* Verified Badge on Photo */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-[10px] tracking-wider uppercase backdrop-blur-md shadow-sm border border-emerald-400/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-200" />
                  <span>{current.badge}</span>
                </span>
              </div>

              {/* Bottom Photo Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-yellow-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Verified Field Metric</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {current.verifiedMetric}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote & Person Profile (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              {/* Header: Programme & Location */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                    {current.programme}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    Story {currentIndex + 1} of {TESTIMONIALS.length}
                  </span>
                </div>

                {/* Big Quote */}
                <div className="relative pt-2">
                  <Quote className="w-10 h-10 text-emerald-600/20 absolute -top-3 -left-3 -z-0" />
                  <blockquote className="relative z-10 text-lg sm:text-xl lg:text-2xl font-serif text-stone-900 leading-snug font-medium italic">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Full Context Story */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-1">
                  {current.fullStory}
                </p>
              </div>

              {/* Person Bio and Details */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs font-medium text-emerald-800">
                      {current.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{current.location}</span>
                    </div>
                  </div>
                </div>

                {/* Explore Related Programme Button */}
                {onNavigate && (
                  <button
                    onClick={() => {
                      if (current.id === 'test-1' || current.id === 'test-5') {
                        onNavigate('reintegration');
                      } else if (current.id === 'test-2') {
                        onNavigate('starter-kits');
                      } else if (current.id === 'test-4') {
                        onNavigate('ace-hub');
                      } else {
                        onNavigate('programmes');
                      }
                    }}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-emerald-100 hover:text-emerald-950 text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>View Programme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Thumbnail Selector Dots / Avatars Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono px-1">
            <span>Select Any Testimonial (Changes every 5s):</span>
            <span>Slide {currentIndex + 1} / 6</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TESTIMONIALS.map((t, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isActive
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                      : 'bg-white/60 hover:bg-white border-stone-200 text-stone-600 hover:border-emerald-300'
                  }`}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className={`w-9 h-9 rounded-full object-cover shrink-0 transition-transform ${
                      isActive ? 'ring-2 ring-emerald-600 scale-105' : 'grayscale-30'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-bold truncate ${isActive ? 'text-emerald-950 font-serif' : 'text-stone-800'}`}>
                      {t.name}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {t.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
