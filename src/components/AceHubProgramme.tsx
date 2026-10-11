import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  Layers, 
  HeartHandshake, 
  Droplet, 
  TestTube, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  ShieldAlert, 
  GraduationCap, 
  Wrench, 
  TrendingUp, 
  ChevronRight, 
  Download, 
  Loader2, 
  Clock, 
  AlertTriangle, 
  Compass, 
  Maximize2,
  RefreshCw,
  Sparkles,
  Info,
  Scale,
  Users,
  Search,
  ExternalLink,
  Trees,
  Wheat,
  Leaf,
  Flower2,
  Bird,
  Sunrise,
  SunMedium,
  Apple
} from 'lucide-react';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from './PillCtaButton';
import { CORE_FACILITIES } from '../data/organizationData';
import livestockImg from '../assets/images/livestock_husbandry_unit_1790193113014.jpg';

interface AceHubProgrammeProps {
  onNavigate: (page: string) => void;
  onOpenDonateModal: () => void;
  onOpenDocModal: () => void;
}

// 11-step Transformation Model
const TRANSFORMATION_STEPS = [
  {
    step: '01',
    name: 'IDENTIFY',
    tag: 'Community Mobilization',
    summary: 'Identify vulnerable families, smallholder farmers, out-of-school youth, and reformed ex-prisoners through village leaders and prison social workers.',
    impact: 'Targeted vulnerability mapping across Wakiso, Nakasongola, and Busia.',
    icon: Compass,
  },
  {
    step: '02',
    name: 'TRAIN',
    tag: 'Practical Apprenticeship',
    summary: 'Hands-on practical training in agro-ecological crop farming, livestock husbandry, greenhouse management, and market-ready vocational trades.',
    impact: 'Hands-on experiential learning at Wakiso demonstration facilities.',
    icon: Trees,
  },
  {
    step: '03',
    name: 'TEST',
    tag: 'Agricultural Lab Services',
    summary: 'Diagnostic laboratory soil testing, animal feed analysis, pathogen screenings, and water quality testing before planting or stocking.',
    impact: 'Evidence-based agronomic insights to prevent catastrophic losses.',
    icon: Droplet,
  },
  {
    step: '04',
    name: 'TREAT',
    tag: 'Agronomic Correction',
    summary: 'Correct soil acidity with lime/organic nutrients, formulate safe feed rations, treat livestock biosecurity risks, and remediate crop pests.',
    impact: 'Direct corrective interventions before planting or stocking cycles.',
    icon: Leaf,
  },
  {
    step: '05',
    name: 'GRADUATE',
    tag: 'Certification & Readiness',
    summary: 'Trainees complete intensive field modules, demonstrate practical production skills, and complete life-skills and financial literacy.',
    impact: 'Certified readiness for independent and cooperative farming.',
    icon: SunMedium,
  },
  {
    step: '06',
    name: 'EQUIP',
    tag: 'Starter-Kit Capital',
    summary: 'Graduates receive seed starter-kits: high-germination seedlings, breeding stock pairs, basic farm tools, and organic bio-inputs.',
    impact: 'Direct capital hurdle elimination for 300+ vulnerable households.',
    icon: Wheat,
  },
  {
    step: '07',
    name: 'PRODUCE',
    tag: 'Yield Generation',
    summary: 'Graduates deploy skills on family land, parish demo farms, and outgrower plots using climate-smart drip irrigation and greenhouse dome practices.',
    impact: 'Consistent, all-season household food harvest and bulk commodities.',
    icon: Sprout,
  },
  {
    step: '08',
    name: 'ADD VALUE',
    tag: 'Post-Harvest Processing',
    summary: 'Primary agro-processing, grain milling, solar dehydration, honey extraction, and hygienic packaging to eliminate post-harvest wastage.',
    impact: 'Up to 3x price premium over raw farm-gate produce.',
    icon: Apple,
  },
  {
    step: '09',
    name: 'MARKET',
    tag: 'Collective Aggregation',
    summary: 'Collective bargaining, regional retail off-taker contracts, cooperative bulk aggregation, and direct urban market transportation.',
    impact: 'Fair pricing power without exploitative middlemen.',
    icon: Sunrise,
  },
  {
    step: '10',
    name: 'CREATE WEALTH',
    tag: 'Economic Resilience',
    summary: 'Sustainable family income generation, personal savings, enterprise expansion, and reinvestment into education and healthcare.',
    impact: 'Dignified transition from chronic dependency to self-reliance.',
    icon: Flower2,
  },
  {
    step: '11',
    name: 'GIVE BACK',
    tag: 'Multiplication & Ministry',
    summary: 'Successful farmers mentor newly released ex-prisoners, donate seed to impoverished widows, support rural churches, and expand outreach.',
    impact: 'Self-replicating cycle of faith, community compassion, and generational change.',
    icon: Bird,
  },
];

// 12 Challenges Ace Hub Solves
const WHY_ACE_EXISTS_CHALLENGES = [
  {
    title: 'Severe Rural Poverty',
    desc: 'Chronic generational poverty and food insecurity leaving vulnerable households unable to afford basic meals or healthcare.',
  },
  {
    title: 'Agricultural Barriers',
    desc: 'Unpredictable drought cycles, lack of modern irrigation, and degraded topsoils limiting smallholder yield.',
  },
  {
    title: 'Substandard Animal Feeds',
    desc: 'Widespread adulterated, toxin-laden animal feeds leading to devastating livestock mortality and wasted farmer investment.',
  },
  {
    title: 'Crop & Livestock Diseases',
    desc: 'Pest outbreaks and livestock infections striking without early diagnosis, wiping out entire farm stocks overnight.',
  },
  {
    title: 'Limited Laboratory Access',
    desc: 'Rural farmers operate completely blind without access to affordable soil, feed, and pathogen diagnostic laboratories.',
  },
  {
    title: 'Youth Unemployment',
    desc: 'Widespread rural youth underemployment and out-of-school despair with zero access to practical technical trades.',
  },
  {
    title: 'Traditional Farming Gaps',
    desc: 'Reliance on outdated, low-yielding manual techniques without access to greenhouse and climate-smart agronomy.',
  },
  {
    title: 'Predatory Market Barriers',
    desc: 'Exploitative middlemen paying distress prices at farm gates while producers absorb all production risks.',
  },
  {
    title: 'Youth & Adult Illiteracy',
    desc: 'Functional illiteracy hindering access to technical manuals, business books, and formal financial services.',
  },
  {
    title: 'Vulnerable & Orphan Families',
    desc: 'Widows and child-headed households carrying domestic burdens without physical inputs or supportive safety nets.',
  },
  {
    title: 'Ex-Prisoner Rejection',
    desc: 'Released individuals face stigma, lack tools or land, and suffer high recidivism without restorative post-prison support.',
  },
  {
    title: 'Rural Church Economic Distress',
    desc: 'Rural pastors and congregations struggle with empty tithe plates and lack enterprise capital to sustain ministry.',
  },
];

// Breaking 3 Chains Data
const CHAINS_DATA = [
  {
    number: '01',
    chain: 'POVERTY',
    tag: 'Economic Dependency',
    problem: 'Extreme financial distress, zero savings, debt bondage, and perpetual reliance on temporary emergency handouts.',
    response: 'Enterprise incubation, starter-kit distributions, cooperative value addition, and direct market linkage that turns vulnerable families into wealth producers.',
    color: 'border-red-200 bg-red-50/50 text-red-800',
    iconBg: 'bg-red-100 text-red-700',
  },
  {
    number: '02',
    chain: 'AGRICULTURAL BARRIERS',
    tag: 'Production Collapse',
    problem: 'Poor quality feeds, undetected diseases, lack of inputs, soil exhaustion, zero testing, and severe crop failure.',
    response: 'Climate-resilient greenhouse dome farming, high-germination seedling nursery, diagnostic lab screening ("Test Before You Treat"), and bio-secure livestock systems.',
    color: 'border-amber-200 bg-amber-50/50 text-amber-800',
    iconBg: 'bg-amber-100 text-amber-700',
  },
  {
    number: '03',
    chain: 'LIMITED KNOWLEDGE & OPPORTUNITY',
    tag: 'Social & Skills Exclusion',
    problem: 'Functional illiteracy, technical skill deficiencies, youth unemployment, and harsh ex-prisoner reintegration barriers.',
    response: 'Hands-on vocational trades, 12-month post-prison restorative reintegration pipeline, farmer business mentoring, and rural church leadership development.',
    color: 'border-blue-200 bg-blue-50/50 text-blue-800',
    iconBg: 'bg-blue-100 text-blue-700',
  },
];

// Lab Testing Capabilities
const LAB_CAPABILITIES = [
  {
    area: 'Soil Testing & Nutrient Profiling',
    status: 'Developing',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: 'Analysis of soil pH, nitrogen, phosphorus, potassium, organic matter, and micro-nutrients to formulate precise organic corrections before seeding.',
    importance: 'Prevents expensive fertilizer wastage and stops crop failure caused by acidic soils.',
  },
  {
    area: 'Livestock Feed Quality & Toxin Screening',
    status: 'Developing',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: 'Nutritional testing for crude protein, moisture, aflatoxin presence, and adulteration in poultry mashes, pig rations, and dairy concentrates.',
    importance: 'Eliminates deadly feed toxicity that routinely decimates rural poultry and piggery flocks.',
  },
  {
    area: 'Agricultural Diagnostic Support',
    status: 'Planned',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: 'Rapid identification of bacterial, fungal, and viral pathogens affecting horticultural crops, cassava mosaic, and livestock infections.',
    importance: 'Enables targeted organic or clinical remedies before blight spreads across the entire community.',
  },
  {
    area: 'Water Quality & Irrigation Testing',
    status: 'Planned',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: 'Testing borehole and harvested rainwater for heavy metals, salinity, biological pathogens, and chemical contaminants.',
    importance: 'Safeguards greenhouse hydroponics, fish fingerling aquaculture, and livestock health.',
  },
  {
    area: 'Seed Germination & Viability Verification',
    status: 'Future Capacity',
    statusColor: 'bg-stone-100 text-stone-700 border-stone-200',
    desc: 'Pre-distribution batch testing of seeds to guarantee 90%+ germination rates for community starter-packs.',
    importance: 'Ensures poor families never invest labor into sterile, dead seeds.',
  },
];

// Agricultural Production System Sectors
const PRODUCTION_SECTORS = [
  {
    title: 'High-Value Crop Production',
    desc: 'Greenhouse tomatoes, sweet peppers, cabbages, leafy greens, and open-field staple cassava and maize for food security.',
    icon: Sprout,
    tag: 'All-Season Harvest',
  },
  {
    title: 'Dairy & Meat Goats',
    desc: 'Zero-grazing crossed Boer and indigenous goats engineered for high milk output and accelerated kid growth rates.',
    icon: Layers,
    tag: 'Breeding Multiplication',
  },
  {
    title: 'Commercial Poultry Unit',
    desc: 'Brooding systems, dual-purpose Kuroiler breeds, and high-yielding layers producing eggs and day-old chicks.',
    icon: Building2,
    tag: 'Egg & Broiler Demo',
  },
  {
    title: 'Biosecure Piggery Unit',
    desc: 'Modern slatted floor pens, artificial insemination demo, strict biosecurity protocols, and clean waste biogas conversion.',
    icon: ShieldAlert,
    tag: 'High-Fecundity Breeding',
  },
  {
    title: 'Cattle & Dairy Demonstration',
    desc: 'Improved dairy heifers and pasture silaging models designed to maximize daily milk yield on small acreage.',
    icon: Sparkles,
    tag: 'Silage & Zero-Grazing',
  },
  {
    title: 'Aquaculture & Fish Ponds',
    desc: 'High-density catfish and tilapia earthen and tank systems utilizing recycled greenhouse overflow water.',
    icon: Droplet,
    tag: 'Protein & Water Cycling',
  },
  {
    title: 'Quality Fish Fingerlings',
    desc: 'Hatchery production supplying healthy fingerlings to outgrower youth farmers across central and eastern districts.',
    icon: RefreshCw,
    tag: 'Hatchery Supply',
  },
  {
    title: 'Seedling Nursery Dome',
    desc: 'Protected germination nursery producing over 100,000 disease-free seedlings annually for community starter kits.',
    icon: Sprout,
    tag: 'Greenhouse Propagation',
  },
  {
    title: 'On-Farm Feed Compounding',
    desc: 'Formulation of balanced, tested feeds using locally grown maize bran, soy cake, moringa, and black soldier fly larvae.',
    icon: TestTube,
    tag: 'Cost Reduction',
  },
  {
    title: 'Agro-Processing & Value Addition',
    desc: 'Solar drying units, hygienic packaging, and cold-store staging to maximize shelf-life and commanding premium urban retail prices.',
    icon: Layers,
    tag: 'Wealth Creation',
  },
];

// 3 Locations
const NETWORK_LOCATIONS = [
  {
    id: 'wakiso',
    name: 'WAKISO — HEADQUARTERS & MAIN BRANCH',
    shortName: 'Wakiso Headquarters',
    tag: 'Operational Flagship',
    status: 'Active Headquarters',
    location: 'Kigogwa, Wakiso District, Central Uganda',
    coordinates: '0.3944° N, 32.4797° E',
    mapX: 47, // % from left on Uganda SVG
    mapY: 68, // % from top on Uganda SVG
    acreage: 'Flagship Intensive Campus',
    description: 'The operational nerve center of IFHCFI. Coordinates all national administration, community programmes, prison ministry reintegration, greenhouse seedling germination, and diagnostic lab coordination.',
    keyRoles: [
      'National administration, governance & donor compliance',
      'Greenhouse dome seedling propagation & all-season demonstration',
      'Livestock husbandry unit (Goats, Poultry, Piggery)',
      'Vocational training hall & youth apprenticeships',
      'Confidential counseling, prison chaplaincy & family reintegration office',
      'Agricultural diagnostic laboratory development & coordination hub',
      'Central M&E data synthesis and starter-kit logistics',
    ],
    image: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
  },
  {
    id: 'nakasongola',
    name: 'NAKASONGOLA — 300-ACRE AGRICULTURAL CENTER',
    shortName: 'Nakasongola 300-Acre Hub',
    tag: 'Planned / Developing Major Hub',
    status: 'Phased Development',
    location: 'Nakasongola District, Central Savannah Corridor, Uganda',
    coordinates: '1.3089° N, 32.4564° E',
    mapX: 48,
    mapY: 48,
    acreage: '300 Total Acres',
    description: 'A planned massive agricultural production and vocational training center designed for commercial scale crop multiplication, beef and dairy cattle ranching, large-scale aquaculture, and regional farmer apprenticeships.',
    keyRoles: [
      'Large-scale grain and drought-tolerant crop production',
      'Broad-acre demonstration farming & mechanized agronomy',
      'Extensive beef cattle, goat, and sheep pastoral ranching',
      'Commercial-scale aquaculture fish ponds & fingerling breeding',
      'High-capacity seedling nursery and agro-forestry tree nurseries',
      'Residential agricultural academy & vocational campus',
      'Regional agro-processing, warehousing & value addition facility',
    ],
    image: '/src/assets/images/hero_ugandan_farming_1790193085963.jpg',
  },
  {
    id: 'busia',
    name: 'BUSIA — EASTERN UGANDA OUTREACH',
    shortName: 'Busia Regional Outreach',
    tag: 'Regional Outreach Point',
    status: 'Operational Outreach',
    location: 'Busia District, Eastern Uganda Border Corridor',
    coordinates: '0.4688° N, 34.0906° E',
    mapX: 74,
    mapY: 66,
    acreage: 'Regional Mobilization Base',
    description: 'Strategic eastern regional outreach point connecting Ugandan farmers with cooperative mobilization, cross-border commercial trade, rural church partnerships, and youth startup incubation.',
    keyRoles: [
      'Eastern smallholder farmer mobilization & cooperative formation',
      'Practical agro-ecology workshops & field demonstration days',
      'Community empowerment & vulnerable household starter kits',
      'Cross-border market linkage & fair-price commodity off-take',
      'Youth agribusiness startup incubation & mentoring',
      'Rural church economic empowerment & pastoral fellowship',
    ],
    image: '/src/assets/images/tree_agroforestry_1790277966958.jpg',
  },
];

export const AceHubProgramme: React.FC<AceHubProgrammeProps> = ({
  onNavigate,
  onOpenDonateModal,
  onOpenDocModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('wakiso');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('dome-farm');

  const selectedLocation = NETWORK_LOCATIONS.find(l => l.id === selectedLocationId) || NETWORK_LOCATIONS[0];
  const activeStepData = TRANSFORMATION_STEPS[activeStep];

  const handleDownloadPDF = (type: 'concept-note' | 'starter-kit') => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF(type);
      } catch (e) {
        console.error(e);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  const selectedFacility = CORE_FACILITIES.find(f => f.id === selectedFacilityId) || CORE_FACILITIES[1];

  const facilityMedia: Record<string, { src: string; caption: string }> = {
    'dome-farm': {
      src: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
      caption: 'Dome Farm Unit · All-season climate-resilient germination nursery incubator',
    },
    'stock-breeding-farm': {
      src: livestockImg,
      caption: 'Livestock Husbandry Unit · Zero-grazing dairy goats & poultry breeding',
    },
    'training-hall': {
      src: '/src/assets/images/vocational_skills_training_1790273232078.jpg',
      caption: 'Main Vocational Hall · Practical technical trades & apprenticeship benches',
    },
    'store-counseling': {
      src: '/src/assets/images/prison_reintegration_1790277940920.jpg',
      caption: 'Store & Counseling Office · Trauma reconciliation & starter-kit distribution',
    },
    'water-sanitation': {
      src: '/src/assets/images/clean_water_well_1790277928820.jpg',
      caption: 'Integrated Water & Sanitation · Deep borehole pump & rainwater harvesting',
    },
  };

  return (
    <div className="space-y-16 lg:space-y-24 font-sans text-stone-800">
      {/* ==================================================
          SECTION 4: HERO SECTION
          ================================================== */}
      <section className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-6 sm:p-10 lg:p-14">
        {/* Relevant Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg" 
            alt="Aid Combat Empowerment Center (ACE Hub) demonstration greenhouse and nursery facilities" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
          <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Header pill badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-yellow-300" />
              <span>Flagship Strategic Hub · Wakiso, Nakasongola &amp; Busia</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Integrated Rural Transformation</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              AID COMBAT EMPOWERMENT CENTER
            </h1>
            <p className="text-yellow-300 font-serif italic text-lg sm:text-2xl font-medium tracking-wide">
              &ldquo;Putting Faith in Action to Break the Chains of Poverty&rdquo;
            </p>
          </div>

          {/* Supporting Text */}
          <p className="text-stone-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            The IFHCFI Aid Combat Empowerment Center is an integrated rural transformation programme designed to strengthen farming, develop practical skills, support rehabilitation, create livelihoods, connect producers to markets and empower rural communities.
          </p>

          {/* Core Philosophy Continuum (Clean cardless typography) */}
          <div className="pt-1 space-y-1.5 border-t border-white/15">
            <div className="text-[11px] font-mono uppercase text-yellow-300 font-bold tracking-wider flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-yellow-300" />
              <span>Core Transformation Continuum:</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 font-mono tracking-tight leading-relaxed">
              Train <span className="text-yellow-400">→</span> Test <span className="text-yellow-400">→</span> Treat <span className="text-yellow-400">→</span> Produce <span className="text-yellow-400">→</span> Add Value <span className="text-yellow-400">→</span> Market <span className="text-yellow-400">→</span> Create Wealth <span className="text-yellow-400">→</span> Give Back
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#transformation-model"
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Our Model</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </a>

            <button
              onClick={onOpenDonateModal}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-yellow-300" />
              <span>Support the ACE Hub</span>
            </button>

            <button
              onClick={() => handleDownloadPDF('concept-note')}
              disabled={isDownloading}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 font-medium text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
              ) : (
                <Download className="w-4 h-4 text-yellow-300" />
              )}
              <span>Download Concept Note (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: POSITIONING HIGHLIGHT
          ================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
            Holistic Definition &amp; Mandate
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            An Integrated Rural Transformation Center
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            The ACE Hub is not simply a farm, church project, laboratory, rehabilitation centre, or charity programme. It integrates 12 essential community pillars into a cohesive, self-reinforcing engine for sustainable prosperity:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          {[
            { label: 'Sustainable Agriculture', icon: Sprout },
            { label: 'Agricultural Lab Services', icon: TestTube },
            { label: 'Practical Skills Training', icon: Wrench },
            { label: 'Functional Education', icon: GraduationCap },
            { label: 'Trauma Rehabilitation', icon: HeartHandshake },
            { label: 'Prison Ministry Reentry', icon: Scale },
            { label: 'Enterprise Incubation', icon: TrendingUp },
            { label: 'Agro Value Addition', icon: Layers },
            { label: 'Collective Marketing', icon: Users },
            { label: 'Rural Church Empowerment', icon: Building2 },
            { label: 'Community Development', icon: MapPin },
            { label: 'Youth Startup Support', icon: Sparkles },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/70 hover:border-emerald-300 transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#164E33] flex items-center justify-center shrink-0 group-hover:bg-[#164E33] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-stone-800 leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 5: WHY THE ACE HUB EXISTS
          ================================================== */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
            Root Cause Diagnosis
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            WHY THE ACE HUB EXISTS
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Rural Uganda faces interwoven, compounding bottlenecks that trap hard-working households in poverty. The ACE Hub addresses all twelve structural challenges under one unified roof:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WHY_ACE_EXISTS_CHALLENGES.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Challenge {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 pt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 6: BREAKING THE THREE CHAINS
          ================================================== */}
      <section className="space-y-8 bg-stone-900 text-white p-6 sm:p-10 lg:p-12 rounded-3xl shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
            Strategic Liberation Model
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            BREAKING THE 3 CHAINS
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            By addressing root causes simultaneously, the ACE Hub operates as an integrated antidote to the three crushing chains keeping rural Ugandan families dependent:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHAINS_DATA.map((chain) => (
            <div
              key={chain.number}
              className="rounded-2xl border border-stone-700 bg-stone-800/80 p-6 flex flex-col justify-between space-y-6 hover:border-emerald-400/60 transition-all shadow-md group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-emerald-400 font-mono">
                    CHAIN {chain.number}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-stone-700 text-stone-200 border border-stone-600">
                    {chain.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                    {chain.chain}
                  </h3>
                  <div className="mt-2 p-3 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-200 leading-relaxed">
                    <span className="font-bold text-red-300 block mb-0.5">The Problem:</span>
                    {chain.problem}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-100 leading-relaxed space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ACE Hub Integrated Response:</span>
                </span>
                <p className="text-emerald-100/90">{chain.response}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 7: OUR TRANSFORMATION MODEL
          ================================================== */}
      <section id="transformation-model" className="space-y-8 scroll-mt-24">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
            11-Step Interactive Pathway
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            OUR TRANSFORMATION MODEL
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Every trainee and participating household journeys through eleven disciplined milestones—from initial vulnerability identification to wealth generation and giving back:
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="p-2 bg-stone-100 rounded-2xl border border-stone-200 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {TRANSFORMATION_STEPS.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#164E33] text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-200 text-stone-700'}`}>
                    {s.step}
                  </span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-gradient-to-br from-white to-stone-50 rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Step {activeStepData.step} of 11
                </span>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {activeStepData.tag}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                {activeStepData.name}
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {activeStepData.summary}
              </p>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold">Demonstrated Field Impact: </span>
                  {activeStepData.impact}
                </div>
              </div>
            </div>

            {/* Stepper Navigator Controls */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : TRANSFORMATION_STEPS.length - 1))}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(prev => (prev < TRANSFORMATION_STEPS.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-2.5 rounded-xl bg-[#164E33] hover:bg-[#0D281A] text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] font-mono text-stone-400">
                Click any milestone in the continuum ribbon above
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 & 9: AGRICULTURAL LABORATORY ("TEST BEFORE YOU TREAT")
          ================================================== */}
      <section className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl border border-emerald-800/60 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <TestTube className="w-3.5 h-3.5" />
              <span>Scientific Agronomic Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              TEST BEFORE YOU TREAT
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              The laboratory is intended to strengthen the farming sector by making appropriate agricultural testing more accessible and helping farmers make better decisions before losses become severe.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-200 max-w-sm space-y-1">
            <div className="font-bold text-yellow-300 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
              <Info className="w-3.5 h-3.5 text-yellow-300" />
              <span>Institutional Status Note</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed text-[11px]">
              Services are currently undergoing phased development and capacity acquisition. Facilities are labeled transparently below as Planned, Developing, or Future Capacity.
            </p>
          </div>
        </div>

        {/* Flowchart Concept */}
        <div className="space-y-4">
          <div className="text-xs uppercase font-mono text-emerald-400 font-bold tracking-wider">
            Diagnostic Logic Loop
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            {[
              { step: 'PROBLEM', sub: 'Disease / Uncertainty', desc: 'Unexplained crop stunting, livestock fever, or feed refusal.', color: 'border-red-400/40 bg-red-950/40 text-red-200' },
              { step: 'TEST', sub: 'Laboratory Analysis', desc: 'Sample collected & diagnostic assay executed.', color: 'border-amber-400/40 bg-amber-950/40 text-amber-200' },
              { step: 'RESULT', sub: 'Evidence-Based Data', desc: 'Precise quantitative metrics (pH, bacteria, aflatoxins).', color: 'border-blue-400/40 bg-blue-950/40 text-blue-200' },
              { step: 'ACTION', sub: 'Professional Guidance', desc: 'Exact agronomic lime, organic biocontrol, or veterinary remedy.', color: 'border-emerald-400/40 bg-emerald-950/60 text-emerald-200' },
              { step: 'PROTECTION', sub: 'Avoid Avoidable Loss', desc: 'Preserves capital, ensures yields, and stabilizes income.', color: 'border-yellow-400/40 bg-yellow-950/40 text-yellow-200' },
            ].map((flow, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${flow.color} flex flex-col justify-between space-y-2`}>
                <div className="text-[10px] font-mono font-bold tracking-wider opacity-80">
                  STAGE 0{i + 1}
                </div>
                <div className="text-base font-serif font-bold text-white">
                  {flow.step}
                </div>
                <div className="text-xs font-semibold text-emerald-300">
                  {flow.sub}
                </div>
                <p className="text-[11px] text-stone-300 leading-tight">
                  {flow.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why the Lab Matters Explanation Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-4">
          <div className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>Why the Lab Matters</span>
            <span className="text-xs font-mono text-emerald-400 font-normal px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700">
              Core Principle
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Farmers can experience sudden losses when diseases or agricultural problems are not identified early. The ACE Hub aims to improve self-reliance by developing accessible testing capacity and connecting test results with appropriate agricultural action.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-yellow-300">
            <span>TEST</span> <span>→</span> <span>UNDERSTAND</span> <span>→</span> <span>ACT</span> <span>→</span> <span>PROTECT</span> <span>→</span> <span>PRODUCE</span>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-4">
          <div className="text-xs uppercase font-mono text-emerald-400 font-bold tracking-wider">
            Potential Lab Capacities (Phased Roadmap)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAB_CAPABILITIES.map((cap, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-emerald-800/80 bg-emerald-900/40 hover:border-emerald-500/60 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400">
                      Cap #{i + 1}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${cap.statusColor}`}>
                      {cap.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-white">
                    {cap.area}
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-800/60 text-[11px] text-emerald-300">
                  <span className="font-bold">Protection Factor: </span>
                  {cap.importance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: AGRICULTURAL PRODUCTION
          ================================================== */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
            Integrated Enterprises
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            BUILDING A PRODUCTIVE FARMING SYSTEM
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Practical production provides both commercial revenue for institutional sustainability and an immersive hands-on platform for training, youth apprenticeships, and starter-kit seed multiplication:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTION_SECTORS.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#164E33] flex items-center justify-center group-hover:bg-[#164E33] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {sec.tag}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Demonstration &amp; Multiplied</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTIONS 11, 12, 13 & 14: OUR THREE HUBS & INTERACTIVE MAP
          ================================================== */}
      <section id="impact-network" className="space-y-10 scroll-mt-24">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
            Tri-Regional Footprint
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            OUR IMPACT NETWORK
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            The IFHCFI Aid Combat Empowerment Center operates across three complementary hubs spanning central administration, major 300-acre agricultural production, and eastern border outreach:
          </p>
        </div>

        {/* Location Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NETWORK_LOCATIONS.map((loc) => {
            const isSelected = selectedLocationId === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono font-bold text-emerald-900">
                    {loc.shortName}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                    loc.id === 'wakiso' 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : loc.id === 'nakasongola' 
                      ? 'bg-amber-100 text-amber-800 border-amber-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {loc.tag}
                  </span>
                </div>
                <div className="text-xs text-stone-500 font-medium line-clamp-1">
                  {loc.location}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Live Map Display */}
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl text-white space-y-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Visual Map Canvas / Vector Representation of Uganda */}
            <div className="w-full lg:w-1/2 bg-stone-950 rounded-2xl p-6 border border-stone-800 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-300">
                    Uganda Operational Corridor Map
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Interactive GIS Model
                </span>
              </div>

              {/* Simplified stylized SVG Uganda Map with geographic pins */}
              <div className="relative w-full h-72 my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full max-h-72 drop-shadow-lg"
                  aria-label="Map of Uganda showing Wakiso, Nakasongola, and Busia locations"
                >
                  {/* Uganda approximate border outline */}
                  <path
                    d="M 120 40 L 260 30 L 320 70 L 340 160 L 330 250 L 290 280 L 240 320 L 190 320 L 140 340 L 90 280 L 70 200 L 90 120 Z"
                    fill="#1C2E24"
                    stroke="#2D5A42"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Lake Victoria Representation */}
                  <path
                    d="M 190 320 C 230 310, 270 300, 310 330 C 290 360, 220 370, 190 320 Z"
                    fill="#0F2B3E"
                    stroke="#1D587A"
                    strokeWidth="1.5"
                  />
                  <text x="225" y="340" fill="#4B86A9" fontSize="9" fontFamily="monospace">Lake Victoria</text>

                  {/* Corridor Connector Lines between hubs */}
                  <line
                    x1="188"
                    y1="250"
                    x2="192"
                    y2="185"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />
                  <line
                    x1="188"
                    y1="250"
                    x2="295"
                    y2="245"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />

                  {/* Pin 1: Nakasongola */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedLocationId('nakasongola')}
                  >
                    <circle cx="192" cy="185" r={selectedLocationId === 'nakasongola' ? '10' : '6'} fill="#F59E0B" className="transition-all" />
                    <circle cx="192" cy="185" r="16" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                    <text x="206" y="188" fill="#FDE68A" fontSize="11" fontWeight="bold">Nakasongola (300 Acres)</text>
                  </g>

                  {/* Pin 2: Wakiso */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedLocationId('wakiso')}
                  >
                    <circle cx="188" cy="250" r={selectedLocationId === 'wakiso' ? '11' : '7'} fill="#10B981" className="transition-all" />
                    <circle cx="188" cy="250" r="18" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.7" className="animate-ping" />
                    <text x="120" y="254" fill="#6EE7B7" fontSize="11" fontWeight="bold">Wakiso (HQ)</text>
                  </g>

                  {/* Pin 3: Busia */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedLocationId('busia')}
                  >
                    <circle cx="295" cy="245" r={selectedLocationId === 'busia' ? '10' : '6'} fill="#3B82F6" className="transition-all" />
                    <circle cx="295" cy="245" r="15" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                    <text x="245" y="235" fill="#93C5FD" fontSize="11" fontWeight="bold">Busia (Outreach)</text>
                  </g>
                </svg>
              </div>

              <div className="text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-800 pt-2">
                <span>Click any pin or tab to view station specs</span>
                <span className="font-mono text-emerald-400">Uganda Corridor</span>
              </div>
            </div>

            {/* Selected Location Profile Card */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    selectedLocation.id === 'wakiso' 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                      : selectedLocation.id === 'nakasongola' 
                      ? 'bg-amber-950 text-amber-300 border-amber-700' 
                      : 'bg-blue-950 text-blue-300 border-blue-700'
                  }`}>
                    {selectedLocation.status}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    {selectedLocation.coordinates}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {selectedLocation.name}
                </h3>

                <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedLocation.location}</span>
                  <span className="text-stone-500">·</span>
                  <span className="text-stone-300 font-mono">{selectedLocation.acreage}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedLocation.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Primary Mandate &amp; Core Functions:
                </div>
                <div className="space-y-1.5">
                  {selectedLocation.keyRoles.map((role, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLocation.id === 'nakasongola' && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                  <span className="font-bold text-amber-300 block mb-0.5">Development Notice:</span>
                  Nakasongola 300-Acre Agricultural Center is a planned/developing facility currently in land demarcation and phased zoning. Commercial facilities are slated for progressive capital rollout.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 15: WAKISO FLAGSHIP OPERATIONAL FACILITIES
          ================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
              Wakiso Headquarters Operational Units
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Five Operational Campus Facilities
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore the five integrated infrastructure structures currently powering daily agricultural demonstrations, vocational trades, and counseling at our Wakiso headquarters:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadPDF('concept-note')}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Full Center Dossier</span>
            </button>
          </div>
        </div>

        {/* Facility Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {CORE_FACILITIES.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFacilityId(f.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedFacilityId === f.id
                  ? 'bg-[#164E33] text-white shadow-xs font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Selected Facility Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200">
          <div className="relative rounded-xl overflow-hidden border border-stone-200 h-64 sm:h-72 bg-stone-900 shadow-sm">
            <img
              src={facilityMedia[selectedFacility.id]?.src || 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg'}
              alt={selectedFacility.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium">
              {facilityMedia[selectedFacility.id]?.caption}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {selectedFacility.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {selectedFacility.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {selectedFacility.purpose}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold uppercase text-stone-700">
                Key Components:
              </span>
              {selectedFacility.keyComponents.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-stone-500 italic">
              Operational Role: {selectedFacility.operationalRole}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 16: CALL TO ACTION BANNER
          ================================================== */}
      <section className="bg-gradient-to-br from-[#0B3D2E] to-[#042419] rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6 border border-emerald-800/40">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Partner With the ACE Hub Today
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Whether through agricultural equipment sponsorship, laboratory instrumentation, starter-kit seed funds, or expert mentorship, your involvement transforms lives across Uganda.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenDonateModal}
            className="px-6 py-3 bg-yellow-300 hover:bg-yellow-200 text-[#064E3B] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-[#064E3B]" />
            <span>Support the ACE Hub</span>
          </button>

          <PillCtaButton
            onClick={() => onNavigate('get-involved')}
            label="Get Involved & Volunteer"
            size="md"
          />

          <button
            onClick={() => handleDownloadPDF('starter-kit')}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 font-medium text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>Download Starter-Kit Guidelines</span>
          </button>
        </div>
      </section>
    </div>
  );
};
