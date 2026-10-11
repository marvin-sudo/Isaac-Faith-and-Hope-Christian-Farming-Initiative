import React, { useState } from 'react';
import { 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import trainingImg from '../assets/images/vocational_skills_training_1790273232078.jpg';
import prisonImg from '../assets/images/prison_reintegration_1790277940920.jpg';

export interface TransformationStory {
  id: string;
  beneficiaryIdentifier: string;
  focusRole: string;
  location: string;
  verificationBadge: 'Verified Field Case Study' | 'Documented Programme Profile';
  headline: string;
  image: string;
  stages: {
    before: string;
    encounter: string;
    transformation: string;
    opportunity: string;
    starterSupport: string;
    after: string;
  };
  keyQuote: string;
}

export const CASE_STORIES: TransformationStory[] = [
  {
    id: 'case-1',
    beneficiaryIdentifier: 'Beneficiary Case Profile #KS-2025-01',
    focusRole: 'Former Inmate & Agro-Apprentice',
    location: 'Kasangati Correctional Area & Wakiso District',
    verificationBadge: 'Verified Field Case Study',
    headline: 'From 4 Years of Incarceration to Thriving Horticulture Entrepreneurship',
    image: trainingImg,
    stages: {
      before: 'Spent 4 years serving a sentence with no marketable trade, severe family estrangement, and bleak economic prospects upon eventual release.',
      encounter: 'Attended weekly IFHCFI prison discipleship meetings in Kasangati. Received a Luganda Bible and enrolled in pre-release counseling 6 months prior to discharge.',
      transformation: 'Experienced personal spiritual reconciliation, forgave past grievances, and reconciled with immediate family during mediated prison visits.',
      opportunity: 'Upon release, was received at the IFHCFI center and completed the 6-week intensive bio-intensive vegetable production and composting curriculum.',
      starterSupport: 'Assessed and qualified for an agricultural starter kit: nursery seed trays, watering cans, and certified high-germination cabbage and tomato seeds.',
      after: 'Currently manages an active 1-acre leased vegetable plot supplying fresh produce to the local market, maintaining full self-sufficiency with zero police contact.'
    },
    keyQuote: 'IFHCFI did not just visit me in prison and wave goodbye. They met me at the gate and walked with me until my garden was bearing fruit.',
  },
  {
    id: 'case-2',
    beneficiaryIdentifier: 'Beneficiary Case Profile #BW-2025-04',
    focusRole: 'Widow & Micro-Husbandry Cooperative Leader',
    location: 'Buwambo Parish, Wakiso District',
    verificationBadge: 'Documented Programme Profile',
    headline: 'Restoring Household Food Sovereignty Through Zero-Grazing Goats',
    image: prisonImg,
    stages: {
      before: 'Widowed mother of four facing chronic crop failures due to seasonal droughts and high commercial fertilizer prices, struggling to pay basic school fees.',
      encounter: 'Joined an IFHCFI village community meeting organized in coordination with her local rural church pastor in Buwambo.',
      transformation: 'Received training in organic soil mulching, water harvesting, and cooperative group savings management with fellow village mothers.',
      opportunity: 'Elected as a micro-husbandry lead for her peer-group cluster after completing the zero-grazing goat husbandry module.',
      starterSupport: 'Awarded a healthy zero-grazing dairy goat pair and veterinary starter supplies under the community pass-on-the-gift agreement.',
      after: 'Now produces 2 liters of nutritious fresh milk daily for her household and has successfully passed on the first female kid to another vulnerable widow in her village.'
    },
    keyQuote: 'We went from begging for commercial seeds to producing our own bio-organic compost and harvesting enough vegetables to feed our church fellowship.',
  },
];

interface TransformationStoriesSectionProps {
  onNavigate?: (page: string) => void;
}

export const TransformationStoriesSection: React.FC<TransformationStoriesSectionProps> = ({ onNavigate }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = CASE_STORIES[activeStoryIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-emerald-700" />
            <span>Documented Transformation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Stories of Transformation
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Every life transformed follows our structured pathway: <strong className="text-stone-900 font-semibold">Before → Encounter → Transformation → Opportunity → Starter Support → After.</strong>
          </p>
        </div>

        {/* Ethical Storytelling Banner */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Commitment to Dignity &amp; Privacy: </span>
            In strict compliance with international safeguarding standards, case profiles are documented responsibly with protective identification codes to preserve the dignity, safety, and community reintegration of reformed citizens and vulnerable families.
          </div>
        </div>

        {/* Case Toggle Buttons */}
        <div className="flex justify-center gap-3">
          {CASE_STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                idx === activeStoryIndex
                  ? 'bg-[#0D281A] text-white shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <User className="w-3.5 h-3.5 text-yellow-300" />
              <span>{story.focusRole}</span>
            </button>
          ))}
        </div>

        {/* 6-Stage Case Journey Card (Bento Style) */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Top Banner with Image and Headline */}
          <div className="p-6 sm:p-10 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-stone-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
                  {activeStory.beneficiaryIdentifier}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {activeStory.location}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {activeStory.headline}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-serif italic max-w-sm shrink-0">
              &ldquo;{activeStory.keyQuote}&rdquo;
            </div>
          </div>

          {/* 6 Stages Timeline Grid */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stage 1: Before */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-rose-700">
                  STAGE 1 · BEFORE
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Initial Hardship &amp; Isolation
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeStory.stages.before}
                </p>
              </div>

              {/* Stage 2: Encounter */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-700">
                  STAGE 2 · ENCOUNTER
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Faith &amp; Ministry Contact
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeStory.stages.encounter}
                </p>
              </div>

              {/* Stage 3: Transformation */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-purple-700">
                  STAGE 3 · TRANSFORMATION
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Inner Healing &amp; Character
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeStory.stages.transformation}
                </p>
              </div>

              {/* Stage 4: Opportunity */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-700">
                  STAGE 4 · OPPORTUNITY
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Hands-On Practical Training
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeStory.stages.opportunity}
                </p>
              </div>

              {/* Stage 5: Starter Support */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-700">
                  STAGE 5 · STARTER SUPPORT
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Agricultural Assets &amp; Tools
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeStory.stages.starterSupport}
                </p>
              </div>

              {/* Stage 6: After */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-2">
                <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-800">
                  STAGE 6 · AFTER (TODAY)
                </div>
                <h4 className="font-serif font-bold text-emerald-950 text-sm">
                  Dignified Self-Reliance
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {activeStory.stages.after}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
