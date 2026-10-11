import React, { useState } from 'react';
import { 
  Sun,
  Sunrise, 
  Trees, 
  Flower2, 
  Bird, 
  Sprout, 
  Wheat, 
  Leaf, 
  Droplets, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export interface JourneyStep {
  step: number;
  title: string;
  shortTag: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  description: string;
  deliverables: string[];
  responsibleNote?: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: 'Reach',
    shortTag: 'Prison & Community Entry',
    icon: Sun,
    headline: 'Meeting People Where They Are',
    description: 'Trained volunteers and ministry workers reach directly into correctional facilities and marginalized rural communities, establishing compassionate personal contact.',
    deliverables: [
      'Weekly visitation to partner correctional facilities',
      'Community outreach in remote sub-counties',
      'Safe, respectful listening environments'
    ],
  },
  {
    step: 2,
    title: 'Encourage',
    shortTag: 'Hope & Dignity',
    icon: Sunrise,
    headline: 'Restoring Human Dignity & Hope',
    description: 'We provide personal encouragement, emotional reassurance, free Bibles, and practical life guidance to men and women feeling isolated or forgotten.',
    deliverables: [
      'Personal counseling and emotional reassurance',
      'Free Bible distribution in local languages',
      'Basic hygiene and emergency welfare supplies'
    ],
  },
  {
    step: 3,
    title: 'Preach & Disciple',
    shortTag: 'Spiritual Growth',
    icon: Sprout,
    headline: 'Sharing the Gospel with Grace',
    description: 'Sharing the transformative Gospel of Jesus Christ and fostering voluntary spiritual growth. Ministry is delivered respectfully, compassionately, and without coercion.',
    deliverables: [
      'Scripture fellowship and pastoral prayer',
      'Character transformation and ethical formation',
      'Christ-centered forgiveness and reconciliation'
    ],
  },
  {
    step: 4,
    title: 'Mentor',
    shortTag: 'Consistent Presence',
    icon: Trees,
    headline: 'Walking Side-by-Side Over Time',
    description: 'Mentorship is not a one-off event. Dedicated mentors maintain consistent relationships with incarcerated individuals throughout their sentences, building trust.',
    deliverables: [
      'One-on-one mentorship pairings',
      'Continuous behavioral coaching and letters',
      'Pre-release readiness assessments'
    ],
  },
  {
    step: 5,
    title: 'Rehabilitate',
    shortTag: 'Life Skills & Healing',
    icon: Flower2,
    headline: 'Preparing the Heart & Mind for Freedom',
    description: 'Intensive rehabilitation combines trauma-informed counseling, dispute resolution, vocational orientation, and family mediation to prepare for responsible citizenship.',
    deliverables: [
      'Trauma-informed counseling and grief processing',
      'Restorative mediation with home families',
      'Foundational work ethics and civic responsibility'
    ],
  },
  {
    step: 6,
    title: 'Release & Reintegration',
    shortTag: 'Gate-Side Reception',
    icon: Bird,
    headline: 'Our Relationship Does Not End at the Gate',
    description: 'Upon sentence completion, IFHCFI welcomes participants at the prison gate. Rather than returning to vulnerability, they transition into an intentional pathway.',
    deliverables: [
      'Reception upon release and emergency shelter assistance',
      'Immediate pastoral guidance and clothing support',
      'Enrollment in IFHCFI community programmes'
    ],
  },
  {
    step: 7,
    title: 'Skills Development',
    shortTag: 'Practical Apprenticeship',
    icon: Sprout,
    headline: 'Hands-on Agricultural & Vocational Mastery',
    description: 'Participants enroll in practical training at our demonstration facilities: bio-intensive farming, seedling nurseries, livestock husbandry, joinery, and entrepreneurship.',
    deliverables: [
      'Climate-smart horticulture & soil biology',
      'Poultry, goat, and piggery husbandry training',
      'Financial literacy, record-keeping & micro-enterprise'
    ],
  },
  {
    step: 8,
    title: 'Start-Up Support',
    shortTag: 'Farmer Starter Kits',
    icon: Wheat,
    headline: 'From Skills to Real-World Opportunity',
    description: 'Training alone is not always enough. Eligible participants who complete modules and pass assessments may receive productive agricultural starter packages.',
    deliverables: [
      'Chicks after brooding (~5 weeks) + starter feeds',
      'High-germination vegetable seeds & coffee seedlings',
      'Weaned piglets or zero-grazing starter dairy goats',
      'Basic garden tools and bio-secure inputs'
    ],
    responsibleNote: 'Starter support is subject to individual readiness assessments, verified land or housing access, and programme availability. Resources are distributed responsibly based on eligibility.',
  },
  {
    step: 9,
    title: 'Livelihood',
    shortTag: 'Economic Independence',
    icon: Leaf,
    headline: 'Dignity, Self-Reliance & Giving Back',
    description: 'Graduates harvest crops, multiply livestock, generate dependable household revenue, feed their children, pay school fees, and contribute positively to society.',
    deliverables: [
      'Reliable household food security and income',
      'Reconciliation and leadership within village communities',
      'Support for children’s education and nutrition'
    ],
  },
  {
    step: 10,
    title: 'Continued Follow-Up',
    shortTag: '12-Month Pipeline',
    icon: Droplets,
    headline: '12 Months of Structured Accompaniment',
    description: 'Reintegration is an ongoing process. IFHCFI field officers conduct scheduled monthly visits over 12 months to monitor enterprise health, offer pastoral prayer, and prevent relapse.',
    deliverables: [
      'Monthly field visits by agricultural & pastoral officers',
      'Peer support groups and alumni fellowships',
      'Continuous veterinary and agronomic troubleshooting'
    ],
  },
];

interface TransformationJourneyProps {
  onNavigate?: (page: string) => void;
}

export const TransformationJourney: React.FC<TransformationJourneyProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            The Transformation Journey
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            From isolation inside correctional walls to sustainable rural livelihoods. Our work is not temporary relief—it is a disciplined, Christ-centered, 10-step pathway toward lifelong dignity.
          </p>
        </div>

        {/* 10-Step Stepper Bar (Horizontal Scroll on Mobile, Full Row on Large Screens) */}
        <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-10 gap-2 min-w-[760px] sm:min-w-0">
            {JOURNEY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0D281A] text-white border-emerald-500 shadow-lg scale-102 ring-2 ring-emerald-500/30'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                  aria-label={`Step ${step.step}: ${step.title}`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                      isActive
                        ? 'bg-yellow-400 text-stone-950 shadow-sm'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-wider opacity-70">
                    STEP {step.step < 10 ? `0${step.step}` : step.step}
                  </span>

                  <span className="text-xs font-bold leading-tight mt-0.5 line-clamp-1">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Showcase Card (Bento Style) */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Details (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
                  STEP {activeStep.step} OF 10
                </span>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {activeStep.shortTag}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                  {activeStep.headline}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
                  {activeStep.description}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Key Programme Components:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-snug"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsible Note (if applicable) */}
              {activeStep.responsibleNote && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <span className="font-bold">Programme Integrity Notice: </span>
                  {activeStep.responsibleNote}
                </div>
              )}

              {/* Navigation within Stepper */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Previous Step
                </button>

                <div className="flex items-center gap-1.5">
                  {JOURNEY_STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStepIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        i === activeStepIndex ? 'w-6 bg-emerald-600' : 'bg-stone-300'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Summary Box / Philosophy Highlight (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#064E3B] to-[#0A2618] text-white p-7 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-yellow-300">
                <activeStep.icon className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-300">
                  Guiding Philosophy
                </div>
                <blockquote className="font-serif italic text-lg sm:text-xl text-stone-100 leading-snug">
                  &ldquo;Our relationship with a person does not end at the prison gate.&rdquo;
                </blockquote>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light">
                True rehabilitation requires ongoing companionship, moral formation, real agricultural and trade skills, and an authentic economic starter runway that allows families to become self-reliant.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('reintegration')}
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Reintegration Model</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
