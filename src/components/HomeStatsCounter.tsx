import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Sprout, 
  Wheat, 
  Trees, 
  Bird,
  ArrowRight
} from 'lucide-react';

export interface MetricItem {
  id: string;
  targetNumber: number;
  suffix: string;
  prefix?: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeText: string;
}

export const METRICS: MetricItem[] = [
  {
    id: 'youth',
    targetNumber: 1000,
    suffix: '+',
    title: 'Youth Annually',
    subtitle: 'Climate-smart greenhouse agro-skills, tailoring & Christian discipleship',
    category: 'Vocation & Agro-Skills',
    icon: Sprout,
    accentColor: 'from-amber-400 to-yellow-500',
    badgeText: 'Skill Apprenticeships',
  },
  {
    id: 'families',
    targetNumber: 300,
    suffix: '+',
    title: 'Families Annually',
    subtitle: 'Certified farm starter kits, diagnostic soil testing & poultry brooding',
    category: 'Livelihood & Food Security',
    icon: Wheat,
    accentColor: 'from-emerald-400 to-teal-400',
    badgeText: 'Starter Kits & Welfare',
  },
  {
    id: 'churches',
    targetNumber: 500,
    suffix: '+',
    title: 'Rural Churches',
    subtitle: 'Mobilized community fellowships for pastoral counseling & grassroots outreach',
    category: 'Faith Fellowship',
    icon: Trees,
    accentColor: 'from-yellow-300 to-amber-400',
    badgeText: 'Grassroots Fellowship',
  },
  {
    id: 'prisons',
    targetNumber: 6,
    suffix: '',
    title: 'Partner Prison Facilities',
    subtitle: 'Active rehabilitation, Bible distribution & 12-month post-release accompaniment',
    category: 'Restorative Justice',
    icon: Bird,
    accentColor: 'from-emerald-300 to-green-400',
    badgeText: 'Wakiso, Luweero & Busia',
  },
];

interface HomeStatsCounterProps {
  onNavigate?: (page: string) => void;
}

export const HomeStatsCounter: React.FC<HomeStatsCounterProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => METRICS.map(() => 0));
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const runCountAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsCounting(true);
    setCounts(METRICS.map(() => 0));

    const duration = 5000; // 5-second counting animation
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease-out spanning the full 5 seconds:
      const easeOut = 1 - Math.pow(1 - progress, 2.5);

      const nextCounts = METRICS.map((metric) => {
        return Math.round(metric.targetNumber * easeOut);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setCounts(METRICS.map(m => m.targetNumber));
        setIsCounting(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    // Start counting animation immediately when website loads
    runCountAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [runCountAnimation]);

  return (
    <section 
      id="key-metrics"
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#0e3523] via-[#092417] to-[#0b271a] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-20"
      aria-label="Annual Impacts and Key Metrics"
    >
      {/* Background Ambience & Subtle Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-orange-900/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#297a55_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Verifiable Impact Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Annual Transformation Impacts
            </h2>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              Verifiable annual operational impacts guiding IFHCFI’s countrywide vocational apprenticeships, restorative justice, and community farming initiatives:
            </p>
          </div>

          <div className="text-xs text-amber-300 font-mono flex items-center gap-2 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Click any figure to replay 5s animation</span>
          </div>
        </div>

        {/* 4 Rounded Cards with Golden Numbers matching reference impact figures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const currentCount = counts[idx];
            const formattedCount = currentCount.toLocaleString('en-US');

            return (
              <div
                key={metric.id}
                onClick={runCountAnimation}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 group cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Category Header with Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 font-bold">
                      {metric.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Prominent Golden Counter Figures */}
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1 whitespace-nowrap">
                    <span className="text-yellow-400 drop-shadow-xs">
                      {formattedCount}
                    </span>
                    {metric.suffix && (
                      <span className="text-yellow-400 font-sans font-bold text-3xl sm:text-4xl lg:text-4xl">
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-yellow-300 transition-colors">
                    {metric.title}
                  </h3>
                </div>

                {/* Subtitle / Context description */}
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {metric.subtitle}
                </p>

                {/* Verification Tag */}
                <div className="pt-3 text-[11px] font-mono text-emerald-300/80 flex items-center gap-1.5 border-t border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{metric.badgeText}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Context Pill & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-emerald-100/90 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Impact outputs independently verified under IFHCFI’s 4-Tier Community Monitoring Standard.</span>
          </div>
          {onNavigate && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('impact')}
                className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <span>Explore Documented Impacts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
