import React, { useState } from 'react';
import { 
  Building2, 
  Wrench, 
  Layers, 
  HeartHandshake, 
  Sparkles, 
  Sprout, 
  Fish, 
  Truck, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export interface InfrastructureCampaign {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: 'Core Capital Goal' | 'Specialized Agro-Venture' | 'Operational Logistics' | 'Rehabilitation Expansion';
  tagColor: string;
  description: string;
  keyAssets: string[];
  strategicImpact: string;
}

export const CAMPAIGNS: InfrastructureCampaign[] = [
  {
    id: 'bible-institution',
    title: 'Bible & Christian Leadership Institution',
    category: 'Spiritual Formation',
    icon: BookOpen,
    tag: 'Core Capital Goal',
    tagColor: 'bg-emerald-800 text-emerald-100',
    description: 'Support construction and equipping of a dedicated Christian leadership institute to train rural pastors, prison chaplains, and community disciples.',
    keyAssets: [
      'Lecture hall & pastoral library facilities',
      'Chapel for community discipleship gatherings',
      'Residential dormitories for rural ministry trainees'
    ],
    strategicImpact: 'Equips 500+ rural pastors with theological grounding, integrity coaching, and community development skills.',
  },
  {
    id: 'rehabilitation-centers',
    title: 'Urban & Regional Rehabilitation Centers',
    category: 'Restorative Care',
    icon: Building2,
    tag: 'Rehabilitation Expansion',
    tagColor: 'bg-blue-800 text-blue-100',
    description: 'Establish specialized rehabilitation and transitional living facilities, including planned site development in Kampala for post-release reception and residential trauma recovery.',
    keyAssets: [
      'Safe transitional housing for released inmates',
      'Confidential trauma and psychological counseling suites',
      'Job placement & family mediation offices'
    ],
    strategicImpact: 'Prevents immediate homelessness and eliminates recidivism risk during the vulnerable first 90 days after release.',
  },
  {
    id: 'agricultural-infrastructure',
    title: 'Agricultural Machinery & Irrigation Infrastructure',
    category: 'Agro-Mechanization',
    icon: Wrench,
    tag: 'Core Capital Goal',
    tagColor: 'bg-emerald-800 text-emerald-100',
    description: 'Fund tractors, soil preparation equipment, commercial animal cages, solar-powered deep borehole water pumps, and micro-drip irrigation arrays across demonstration acreage.',
    keyAssets: [
      'Multi-purpose farm tractors & tillage implements',
      'Solar-powered high-capacity water pumping arrays',
      'Commercial galvanized poultry & rabbit cages'
    ],
    strategicImpact: 'Multiplies cropping cycles from 2 to 4 harvests per year, unaffected by regional droughts.',
  },
  {
    id: 'livestock-breeding',
    title: 'Livestock Breeding & Genetic Improvement Infrastructure',
    category: 'Animal Genetics',
    icon: Layers,
    tag: 'Specialized Agro-Venture',
    tagColor: 'bg-purple-800 text-purple-100',
    description: 'Construct modern veterinary diagnostics and genetic improvement facilities (including planned artificial insemination and cryogenic semen storage) to upgrade indigenous goat and cattle genetics.',
    keyAssets: [
      'Cryogenic nitrogen storage tanks & breeding flasks',
      'Sterile veterinary artificial insemination laboratory',
      'Pedigree zero-grazing goat bucks & parent stock'
    ],
    strategicImpact: 'Triples milk yield and accelerates meat growth rates across smallholder herds without high capital cost.',
  },
  {
    id: 'apiculture',
    title: 'Apiculture — Beekeeping & Honey Processing',
    category: 'Agro-Forestry',
    icon: Sprout,
    tag: 'Specialized Agro-Venture',
    tagColor: 'bg-amber-800 text-amber-100',
    description: 'Launch commercial beekeeping arrays, Langstroth modern beehives, protective gear, and certified honey extraction/refining equipment for rural women and youth apiaries.',
    keyAssets: [
      'Modern Langstroth beehives with supers',
      'Centrifugal stainless-steel honey extractors',
      'Protective bee suits, smokers & wax foundation presses'
    ],
    strategicImpact: 'Produces high-value organic honey and beeswax on marginal lands while pollinating agroforestry tree nurseries.',
  },
  {
    id: 'aquaculture',
    title: 'Aquaculture — Fish Farming & Hatchery Systems',
    category: 'Aquatic Agriculture',
    icon: Fish,
    tag: 'Specialized Agro-Venture',
    tagColor: 'bg-cyan-800 text-cyan-100',
    description: 'Construct recirculating aquaculture tanks, earthen breeding ponds, and fingerling hatchery systems to supply affordable tilapia and catfish fingerlings to rural youth cooperatives.',
    keyAssets: [
      'Concrete recirculating aquaculture nursery tanks',
      'Fingerling hatching jars & oxygenation aerators',
      'Water quality monitoring diagnostic meters'
    ],
    strategicImpact: 'Supplies high-protein food to local markets and equips youth groups with fast-cashflow aquaculture ponds.',
  },
  {
    id: 'feed-processing',
    title: 'On-Site Feed Processing & Milling Plant',
    category: 'Value Addition',
    icon: TrendingUp,
    tag: 'Core Capital Goal',
    tagColor: 'bg-emerald-800 text-emerald-100',
    description: 'Establish a community feed-milling facility with hammer mills, pelletizers, and mixing silos to produce affordable, quality animal and poultry feeds from locally grown grains.',
    keyAssets: [
      'Commercial grain hammer mills & micro-pelletizers',
      'Rotary dry feed mixers & moisture meters',
      'Bio-secure grain storage silos & bagging scales'
    ],
    strategicImpact: 'Cuts livestock feed costs by up to 45% for smallholders, making poultry and piggery projects vastly more profitable.',
  },
  {
    id: 'prison-transport',
    title: 'Prison Ministry Logistical Fleet & Transport',
    category: 'Field Operations',
    icon: Truck,
    tag: 'Operational Logistics',
    tagColor: 'bg-stone-800 text-stone-100',
    description: 'Acquire dedicated outreach utility vehicles to transport ministry volunteers, pastoral counselors, emergency welfare kits, and training tools to remote prison facilities countrywide.',
    keyAssets: [
      'Heavy-duty 4WD outreach utility vehicle',
      'Equipment transport trailer for agricultural tools',
      'Fuel, maintenance & insurance operating endowment'
    ],
    strategicImpact: 'Enables consistent, reliable weekly visits to 6+ correctional facilities across Wakiso, Luweero, Nakasongola, and Busia.',
  },
];

interface FutureCampaignsSectionProps {
  onNavigate?: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const FutureCampaignsSection: React.FC<FutureCampaignsSectionProps> = ({ 
  onNavigate,
  onOpenDocModal 
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('bible-institution');
  const activeCampaign = CAMPAIGNS.find(c => c.id === selectedCampaignId) || CAMPAIGNS[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Infrastructure Development &amp; Campaigns</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Help Build the Infrastructure Behind Transformation
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Sustainable transformation requires robust institutional tools. Your philanthropic gifts and capital partnerships help IFHCFI <strong className="text-stone-900 font-semibold">reach more people, more consistently, and continue supporting them far beyond release.</strong>
          </p>
        </div>

        {/* 8 Campaigns Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGNS.map((c) => {
            const Icon = c.icon;
            const isSelected = c.id === selectedCampaignId;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCampaignId(c.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-xl ring-2 ring-emerald-500/20 scale-102'
                    : 'bg-white/70 border-stone-200 hover:border-emerald-400 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${c.tagColor}`}>
                      {c.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-2 line-clamp-3">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 group-hover:text-emerald-950 flex items-center gap-1">
                    <span>Inspect Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">Target</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Campaign Feature Detail */}
        <div className="bg-gradient-to-br from-[#064E3B] to-[#0A2618] text-white rounded-3xl p-6 sm:p-10 border border-emerald-700/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-yellow-400 text-stone-950 text-xs font-bold font-mono">
                  ACTIVE CAMPAIGN
                </span>
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                  {activeCampaign.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {activeCampaign.title}
              </h3>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                {activeCampaign.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-300">
                  Target Infrastructure Assets:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeCampaign.keyAssets.map((asset, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-white/10 text-xs text-stone-100 border border-white/15"
                    >
                      <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                      <span>{asset}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 text-xs text-emerald-200">
                <span className="font-bold text-yellow-300">Impact Horizon: </span>
                {activeCampaign.strategicImpact}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('get-involved')}
                className="w-full py-4 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-sm tracking-wide shadow-lg transition-all text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sponsor This Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenDocModal}
                className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-colors text-center cursor-pointer"
              >
                Request Technical Concept Note (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
