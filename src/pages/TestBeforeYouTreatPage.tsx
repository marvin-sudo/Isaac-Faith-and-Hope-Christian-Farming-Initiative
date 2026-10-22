import React, { useState } from 'react';
import {
  TestTube,
  ChevronRight,
  ShieldCheck,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Info,
  Droplets,
  Microscope,
  Wheat,
  Activity,
  Download,
  Share2,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import domeFarmImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';
import livestockImg from '../assets/images/livestock_husbandry_unit_1790193113014.jpg';

interface TestBeforeYouTreatPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const TestBeforeYouTreatPage: React.FC<TestBeforeYouTreatPageProps> = ({
  onNavigate,
  onOpenDocModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'capacities' | 'case-studies' | 'equipment'>('overview');

  const diagnosticStages = [
    {
      num: '01',
      title: 'Problem Detection',
      sub: 'Field Uncertainty',
      desc: 'Yellowing leaves, stunted crop growth, feed refusal, or unexpected livestock lethargy.',
      color: 'border-red-300 bg-red-50 text-red-900',
      badge: 'Symptoms Occur',
    },
    {
      num: '02',
      title: 'Diagnostic Test',
      sub: 'Scientific Assay',
      desc: 'Soil core, leaf tissue, grain batch, or water sample analyzed using standardized diagnostic tools.',
      color: 'border-amber-300 bg-amber-50 text-amber-900',
      badge: 'Targeted Screening',
    },
    {
      num: '03',
      title: 'Evidence-Based Result',
      sub: 'Quantitative Data',
      desc: 'Exact parameters reported: e.g. soil pH 4.8 (high acidity), N-deficiency, or 18ppb aflatoxin contamination.',
      color: 'border-blue-300 bg-blue-50 text-blue-900',
      badge: 'Lab Validation',
    },
    {
      num: '04',
      title: 'Precision Action',
      sub: 'Targeted Remedy',
      desc: 'Agronomic prescription applied: agricultural lime application, organic bio-control, or feed ration change.',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-900',
      badge: 'Correct Remedy',
    },
    {
      num: '05',
      title: 'Capital & Yield Protection',
      sub: 'Guaranteed Fruitfulness',
      desc: 'Farmer avoids wasted chemical purchase, rescues harvest yield, and safeguards household investment.',
      color: 'border-yellow-300 bg-yellow-50 text-yellow-950',
      badge: 'Poverty Prevented',
    },
  ];

  const labCapacities = [
    {
      id: 'soil',
      icon: Sprout,
      area: 'Soil Testing & Nutrient Profiling',
      status: 'Developing',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Comprehensive analysis of soil pH, electrical conductivity (EC), active nitrogen (N), available phosphorus (P), exchangeable potassium (K), and organic matter percentage.',
      protectionImpact: 'Prevents wasteful expenditure on synthetic fertilizers that cannot work in acidic soil, restoring balanced soil ecology before planting.',
      parameters: ['Soil pH & Acidity', 'NPK Primary Nutrients', 'Organic Matter & Carbon', 'Salinity (EC)', 'Lime Requirement Calculation'],
      turnaround: '24–48 Hours',
    },
    {
      id: 'crop',
      icon: Microscope,
      area: 'Crop Pathology & Disease Diagnosis',
      status: 'Developing',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Microscopic and symptom-specific examination of plant foliage, roots, and vascular bundles to differentiate between bacterial wilts, fungal blights, viral infections, and micro-nutrient deficiencies.',
      protectionImpact: 'Halts the widespread misapplication of expensive insecticides on fungal diseases, saving smallholder working capital.',
      parameters: ['Fungal Blight Identification', 'Bacterial Wilt Screening', 'Root Knot Nematode Analysis', 'Viral Vector Damage Assessment'],
      turnaround: 'Same Day to 24 Hours',
    },
    {
      id: 'seed',
      icon: Wheat,
      area: 'Seed Viability & Germination Assurance',
      status: 'Developing',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Controlled germination trials, vigor indexing, and seed-borne disease screening for indigenous and improved maize, bean, vegetable, and pasture seed lots.',
      protectionImpact: 'Guarantees that seeds provided in our 300+ Family Starter Kits achieve >90% field emergence, safeguarding planting season labor.',
      parameters: ['Germination Rate %', 'Seedling Vigor Score', 'Physical Purity %', 'Seed-Borne Fungal Spores', 'Moisture Content %'],
      turnaround: '3–7 Days',
    },
    {
      id: 'feed',
      icon: Activity,
      area: 'Livestock Feed Quality & Toxin Screening',
      status: 'Phased Capacity',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Screening of maize bran, sunflower meal, silage, and poultry formulations for moisture thresholds, mold infestation, and dangerous aflatoxin/mycotoxin levels.',
      protectionImpact: 'Protects pigs and poultry from sudden mortality, organ failure, and stunted growth caused by spoiled commercial or farm-mixed feeds.',
      parameters: ['Aflatoxin Rapid Strips (B1/Total)', 'Crude Protein Content', 'Moisture Level %', 'Mold & Spore Inspection'],
      turnaround: '24–48 Hours',
    },
    {
      id: 'water',
      icon: Droplets,
      area: 'Agricultural Water Quality Analysis',
      status: 'Developing',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Testing borehole, pond, and rainwater sources used for greenhouse dome drip irrigation and livestock drinking troughs.',
      protectionImpact: 'Prevents salt accumulation in dome farm drip emitters and protects breeding goats and pigs from waterborne bacterial outbreaks.',
      parameters: ['pH Level', 'Total Dissolved Solids (TDS)', 'Salinity & Conductivity', 'Microbial Coliform Screen', 'Heavy Sediments'],
      turnaround: 'Same Day',
    },
    {
      id: 'livestock',
      icon: TestTube,
      area: 'Livestock Biosecurity & Parasite Screening',
      status: 'Planned Capacity',
      statusColor: 'bg-stone-100 text-stone-700 border-stone-300',
      description: 'Simple coprological examinations (fecal egg counts) for goats, sheep, and pigs to identify internal worm burdens and coccidiosis before clinical disease strikes.',
      protectionImpact: 'Allows targeted deworming only when necessary, preventing drug resistance and lowering veterinary costs for rural households.',
      parameters: ['Fecal Egg Count (EPG)', 'Coccidia Oocyst Detection', 'Ectoparasite Identification', 'Herd Biosecurity Audit'],
      turnaround: '24 Hours',
    },
  ];

  const caseStudies = [
    {
      title: 'The Acidic Soil Dilemma in Wakiso District',
      beneficiary: 'Widow & Smallholder Maize Grower',
      problem: 'Spent UGX 180,000 on synthetic chemical fertilizer for two consecutive seasons with yellowing maize and near-total yield failure.',
      diagnosticResult: 'Diagnostic soil test revealed an extreme soil pH of 4.7 (highly acidic), which chemically bound phosphorus and rendered standard fertilizers useless.',
      prescription: 'Prescribed 400kg of localized agricultural lime alongside seasoned livestock compost. No expensive synthetic fertilizers needed.',
      outcome: 'Soil pH stabilized to 6.2; harvested 1.4 metric tons of healthy maize on 1 acre, returning 4.5x the family investment in food and school fees.',
    },
    {
      title: 'Poultry Flock Aflatoxin Prevention',
      beneficiary: 'Youth Poultry Apprenticeship Group',
      problem: 'Sudden loss of 38 chicks over 72 hours with symptoms resembling Newcastle disease or infectious bronchitis.',
      diagnosticResult: 'Diagnostic screening of maize bran feed revealed severe Aspergillus mold contamination with aflatoxin exceeding 35 parts per billion (ppb).',
      prescription: 'Immediate disposal of contaminated feed batch, thorough bin sterilization, and switch to lab-verified dry grain rations with toxin binders.',
      outcome: 'Mortality ceased within 24 hours. Remaining 360 birds reached mature slaughter weight with zero antibiotic overuse.',
    },
    {
      title: 'Pre-Distribution Starter Kit Germination Validation',
      beneficiary: 'IFHCFI 300+ Vulnerable Family Outreach Pipeline',
      problem: 'Unregulated local seed vendors frequently sell grain-market maize as "certified seed" with low germination rates below 50%.',
      diagnosticResult: 'Every batch of seed purchased for the IFHCFI Agricultural Starter Kit program undergoes standardized petri-dish and nursery tray germination testing.',
      prescription: 'Only seed lots demonstrating ≥92% germination and zero seed-borne anthracnose are bagged into beneficiary starter kits.',
      outcome: 'Vulnerable families receive certified-reliable seeds, eliminating early-season disappointment and securing immediate food security.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900">
      {/* ==================================================
          1. HERO SECTION - SCIENTIFIC & DIGNIFIED
          ================================================== */}
      <section className="relative w-full overflow-hidden text-white bg-emerald-950 py-16 sm:py-20 lg:py-24 border-b border-emerald-900/60">
        {/* Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={domeFarmImg}
            alt="Agricultural testing laboratory and climate-smart dome farm in Uganda"
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/70" />
          <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-emerald-200/80 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <button
              onClick={() => onNavigate('programmes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Programmes
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-semibold">Test Before You Treat</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold backdrop-blur-md">
              <TestTube className="w-4 h-4 text-yellow-300" />
              <span>Scientific Agronomic Foundation · Phased Laboratory Facility</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Test Before You Treat
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-sans font-normal">
              Eliminating agricultural guesswork in rural Uganda. IFHCFI ACE Hub’s diagnostic laboratory provides accessible soil chemistry, crop pathology, seed germination, and feed safety testing—empowering vulnerable smallholders to make evidence-based decisions before losses become catastrophic.
            </p>

            {/* Quick Action Ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('capacities-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Lab Capacities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDocModal}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all border border-white/20 backdrop-blur-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                <span>Laboratory Fact Sheet</span>
              </button>

              <button
                onClick={() => onNavigate('get-involved')}
                className="px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs tracking-wider uppercase transition-all border border-emerald-600 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-yellow-300" />
                <span>Support Lab Equipment</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. THE DIAGNOSTIC LOGIC LOOP (5-STAGE RIBBON)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="text-xs uppercase font-mono font-bold text-emerald-800 tracking-wider">
                The Core Agronomic Philosophy
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                The 5-Stage Diagnostic Logic Loop
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Evidence Over Guesswork</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {diagnosticStages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${stage.color} flex flex-col justify-between space-y-3 transition-all hover:shadow-md`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold opacity-75">
                      STAGE {stage.num}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-black/10">
                      {stage.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {stage.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-800">
                    {stage.sub}
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-black/5">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#0D281A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-stone-950 font-bold flex items-center justify-center shrink-0">
                !
              </div>
              <p className="text-emerald-100/90 leading-relaxed">
                <span className="font-bold text-white">Why "Test Before You Treat" Matters: </span>
                Blind chemical application in Uganda causes widespread soil degradation and severe financial debt. Testing first ensures every shilling invested brings real return.
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-300 font-mono font-bold text-xs shrink-0">
              <span>TEST</span> → <span>UNDERSTAND</span> → <span>ACT</span> → <span>PROTECT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. SIX CORE LABORATORY CAPACITIES
          ================================================== */}
      <section id="capacities-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Diagnostic Scope &amp; Facilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Six Core Laboratory Testing Capacities
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Designed specifically for the realities of rural Ugandan farming, our phased laboratory capacities address the highest risk factors in smallholder cultivation, livestock keeping, and post-harvest storage:
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs max-w-sm space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Phased Infrastructure Status</span>
            </div>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              Equipment is phased transparently as funding and partnerships are acquired. Modules labeled 'Developing' are actively taking samples via portable test kits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labCapacities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & Status */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${cap.statusColor}`}>
                      {cap.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                      {cap.area}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  {/* Parameters Measured */}
                  <div className="space-y-1.5 pt-3 border-t border-stone-100">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400">
                      Key Diagnostic Parameters
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.parameters.map((param, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Turnaround & Protection Link */}
                <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">Turnaround:</span>
                    <span className="font-mono text-emerald-800 font-bold">{cap.turnaround}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 leading-tight">
                    <span className="font-bold">Protection Impact: </span>
                    {cap.protectionImpact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          4. REAL-WORLD CASE STUDIES (EVIDENCE OF IMPACT)
          ================================================== */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
              Field Impact &amp; Practical Application
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              How Diagnostic Testing Rescues Smallholders
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Real-world scenarios from our rural Wakiso and Luweero outreach zones illustrating how testing before treating stops catastrophic farm loss:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{cs.beneficiary}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {cs.title}
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-1">
                      <span className="font-bold uppercase text-[10px] tracking-wider text-red-800 block">
                        Problem Faced:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{cs.problem}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                      <span className="font-bold uppercase text-[10px] tracking-wider text-blue-800 block">
                        Diagnostic Lab Finding:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{cs.diagnosticResult}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                      <span className="font-bold uppercase text-[10px] tracking-wider text-emerald-800 block">
                        Evidence-Based Prescription:
                      </span>
                      <p className="text-stone-700 leading-relaxed">{cs.prescription}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 bg-stone-50/80 p-3 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">
                    Verified Outcome:
                  </span>
                  <p className="text-xs font-semibold text-emerald-900 leading-relaxed">
                    {cs.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. INTEGRATION WITH ACE HUB ECOSYSTEM
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="bg-[#0D281A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden space-y-8">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Layers className="w-3.5 h-3.5 text-yellow-300" />
              <span>Holistic Institutional Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              How the Diagnostic Lab Powers All IFHCFI Programmes
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              The laboratory does not operate in isolation—it acts as the scientific backbone connecting our greenhouses, livestock breeding pens, 300+ vulnerable family distributions, and prison reintegration pipelines:
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-yellow-300" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                Greenhouse Dome Farm
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Nursery germination and nutrient solution monitoring ensure vigorous all-season vegetable and seedling production.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center">
                <Wheat className="w-5 h-5 text-yellow-300" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                300+ Family Starter Kits
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Prior to distribution, seeds and planting soils are pre-screened so widows and youth farmers never plant non-viable inputs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center">
                <Activity className="w-5 h-5 text-yellow-300" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                Stock &amp; Breeding Pens
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Regular feed toxin and fecal screening protect improved Boer/indigenous goat and poultry breeding lines from outbreaks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-yellow-300" />
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                Prison Reintegration
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Reformed ex-inmates receive practical diagnostic vocational training in soil sampling and organic pest management.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800/80 text-xs">
            <span className="text-emerald-200">
              Mandate: Registered Non-Profit Indigenous Initiative · Reg. 80034969248231 · Permit IND0007369NB
            </span>
            <button
              onClick={() => onNavigate('combat-center')}
              className="text-yellow-300 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Combat Center Masterplan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. CALL TO ACTION & PARTNERSHIP
          ================================================== */}
      <section className="bg-white py-16 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
            <TestTube className="w-8 h-8 text-emerald-700" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Partner With Our Diagnostic Laboratory
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We welcome academic collaborations, diagnostic equipment donations (digital refractometers, microscopes, rapid soil testers), and philanthropic partnerships to scale testing accessibility across 500+ rural church networks in Uganda.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('get-involved')}
              className="px-6 py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Donate Equipment or Funds</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDocModal}
              className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs tracking-wider uppercase transition-all border border-stone-300 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-800" />
              <span>Download Lab Technical Brief</span>
            </button>

            <button
              onClick={() => onNavigate('programmes')}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-emerald-800 font-semibold text-xs tracking-wider uppercase transition-all border border-emerald-300 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>View All 12 Programmes</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
