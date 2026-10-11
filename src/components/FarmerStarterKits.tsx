import React, { useState } from 'react';
import { 
  Sprout, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info,
  Clock,
  HeartHandshake
} from 'lucide-react';
import familyKitImg from '../assets/images/family_starter_kit_1790277954367.jpg';
import livestockImg from '../assets/images/livestock_husbandry_unit_1790193113014.jpg';
import agroImg from '../assets/images/hero_ugandan_farming_1790193085963.jpg';

export interface StarterKit {
  id: string;
  name: string;
  category: string;
  image: string;
  statusBadge: 'Current Core Model' | 'Planned Expansion' | 'Proposed Pilot';
  statusColor: string;
  headline: string;
  components: string[];
  eligibilityConditions: string[];
  impactGoal: string;
}

export const STARTER_KITS: StarterKit[] = [
  {
    id: 'poultry',
    name: 'Poultry Starter Kit',
    category: 'Micro-Livestock',
    image: livestockImg,
    statusBadge: 'Current Core Model',
    statusColor: 'bg-emerald-700 text-white',
    headline: 'Fast-Cycle Protein & Weekly Cashflow',
    components: [
      'Chicks after ~5 weeks of professional brooding',
      'Nutritional starter & grower feed ration',
      'Basic bio-secure poultry housing construction guide',
      'Veterinary vaccine schedule & monitoring visits'
    ],
    eligibilityConditions: [
      'Completion of the 4-week poultry husbandry course',
      'Verified predator-proof sheltered coop space',
      'Commitment to village peer-savings group'
    ],
    impactGoal: 'Enables widows, single mothers, and youth to generate initial egg and broiler revenue within 8 to 16 weeks.',
  },
  {
    id: 'coffee',
    name: 'Coffee Seedling Starter Kit',
    category: 'Perennial Cash Crop',
    image: agroImg,
    statusBadge: 'Current Core Model',
    statusColor: 'bg-emerald-700 text-white',
    headline: 'Generational Wealth & Long-Term Stability',
    components: [
      'Certified high-yield, wilt-tolerant clonal coffee seedlings',
      'Organic establishment guidance & shade-tree planting',
      'Soil mulching techniques & pruning masterclasses',
      'Collective harvest aggregation and cooperative linkage'
    ],
    eligibilityConditions: [
      'Verified smallholder farming plot access (minimum 0.5 acre)',
      'Completion of climate-resilient horticulture modules',
      'Agreement to practice organic mulching'
    ],
    impactGoal: 'Anchors families with dependable seasonal income, funding school fees and durable homestead investments.',
  },
  {
    id: 'pig-farming',
    name: 'Pig Farming Starter Kit',
    category: 'Livestock Multiplication',
    image: familyKitImg,
    statusBadge: 'Planned Expansion',
    statusColor: 'bg-blue-700 text-white',
    headline: 'High-Conversion Livestock Multiplication',
    components: [
      'Weaned, vaccinated starter piglets from certified breeding stock',
      'Comprehensive feeding and hygienic piggery management guidance',
      'Locally sourced feed formulation training',
      'Parasite prevention and veterinary oversight'
    ],
    eligibilityConditions: [
      'Concrete or raised slatted pen facility inspection',
      'Reliable access to water source and fodder biomass',
      'Passage of biosecurity and disease management exam'
    ],
    impactGoal: 'Provides high capital multiplication per litter to help former inmates rebuild dignified assets.',
  },
  {
    id: 'sheep-goats',
    name: 'Sheep & Dairy Goat Kit',
    category: 'Ruminant Husbandry',
    image: livestockImg,
    statusBadge: 'Current Core Model',
    statusColor: 'bg-emerald-700 text-white',
    headline: 'Zero-Grazing Milk & Offspring Sharing',
    components: [
      'Healthy starter dairy or meat goat / sheep pair',
      'Zero-grazing pen blueprint and fodder hedge establishment',
      'Breeding cycle management and kid care guidance',
      'Pass-on-the-gift commitment for first female offspring'
    ],
    eligibilityConditions: [
      'Established Napier / Brachiaria grass fodder plot',
      'Completion of zero-grazing smallholder workshop',
      'Vetted pastoral and community recommendation'
    ],
    impactGoal: 'Delivers daily nutritious dairy for growing children while building a resilient live asset portfolio.',
  },
  {
    id: 'cattle',
    name: 'Cattle Dairy Livelihood Kit',
    category: 'Major Livestock',
    image: agroImg,
    statusBadge: 'Proposed Pilot',
    statusColor: 'bg-purple-700 text-white',
    headline: 'High-Impact Anchor Asset for Cooperative Groups',
    components: [
      'Improved cross-breed dairy heifer allocated to cooperative clusters',
      'Advanced livestock health and artificial insemination linkage',
      'Pasture conservation, silage making & hay storage coaching',
      'Daily milk pooling and cold-chain marketing support'
    ],
    eligibilityConditions: [
      'Group cooperative qualification with shared paddock access',
      'Established perennial water catchment infrastructure',
      'Certified animal health worker designated in cluster'
    ],
    impactGoal: 'Forms community anchor enterprises capable of sustaining whole church fellowships and cooperative unions.',
  },
];

interface FarmerStarterKitsProps {
  onNavigate?: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const FarmerStarterKits: React.FC<FarmerStarterKitsProps> = ({ 
  onNavigate,
  onOpenDocModal 
}) => {
  const [selectedKitId, setSelectedKitId] = useState<string>('poultry');
  const activeKit = STARTER_KITS.find(k => k.id === selectedKitId) || STARTER_KITS[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>From Skills to Opportunity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Agricultural Starter Kit System
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            <strong className="text-stone-900 font-semibold">Training alone is not always enough.</strong> After participants acquire practical agricultural skills, IFHCFI seeks to provide tangible starter resources that empower them to begin productive farming immediately.
          </p>
        </div>

        {/* Ethical Notice Banner */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Transparent Assessment Model: </span>
            Eligible participants may receive starter support depending on individual assessment, verified housing or land readiness, and current programme funding availability. Starter kits are earned through training diligence, not guaranteed unconditionally.
          </div>
        </div>

        {/* 5-Kit Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {STARTER_KITS.map((kit) => {
            const isSelected = kit.id === selectedKitId;
            return (
              <button
                key={kit.id}
                onClick={() => setSelectedKitId(kit.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0D281A] text-white shadow-md scale-102 ring-2 ring-emerald-500/30'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <span>{kit.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${kit.statusColor}`}>
                  {kit.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Kit Feature Card (Bento Split) */}
        <div className="bg-[#FBF9F5] rounded-3xl border border-stone-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Image Header (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-stone-900 overflow-hidden">
              <img
                src={activeKit.image}
                alt={activeKit.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider shadow-sm ${activeKit.statusColor}`}>
                  {activeKit.statusBadge}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <div className="text-xs uppercase font-mono tracking-wider text-emerald-300">
                  {activeKit.category}
                </div>
                <h3 className="font-serif text-2xl font-bold leading-tight">
                  {activeKit.name}
                </h3>
              </div>
            </div>

            {/* Detailed Kit Content (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
                  {activeKit.headline}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed mt-2">
                  {activeKit.impactGoal}
                </p>
              </div>

              {/* Package Deliverables */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>Potential Starter Package Items:</span>
                </h5>
                <div className="space-y-2">
                  {activeKit.components.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Eligibility &amp; Readiness Standards:</span>
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {activeKit.eligibilityConditions.map((cond, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('get-involved')}
                  className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-yellow-300" />
                  <span>Sponsor a Starter Kit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('programmes')}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-xs sm:text-sm border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore All Programmes</span>
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
