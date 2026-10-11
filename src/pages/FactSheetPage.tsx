import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Check, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar,
  Building,
  Scale,
  Award,
  Loader2
} from 'lucide-react';
import { 
  OFFICIAL_REGISTRATION, 
  FINANCIAL_TARGETS, 
  OFFICIAL_LEADERSHIP, 
  PARTNER_PRISONS,
  CORE_FACILITIES,
  ANNUAL_TARGETS,
  CORE_PROGRAMMES
} from '../data/organizationData';
import { generateAndDownloadPDF, DocType } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import treeAgroforestryImg from '../assets/images/tree_agroforestry_1790277966958.jpg';

interface FactSheetPageProps {
  onNavigate: (page: string) => void;
}

export const FactSheetPage: React.FC<FactSheetPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<DocType>('profile');
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = (type: DocType = activeTab) => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF(type);
      } catch (err) {
        console.error('PDF error:', err);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">Institutional Fact Sheet &amp; PDF Dossier</span>
        </div>

        {/* Page Header Banner with Relevant Background Image */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-6 sm:p-10">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={treeAgroforestryImg} 
              alt="Agroforestry nursery seedlings and institutional governance in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-yellow-300" />
                <span>Republic of Uganda Registered NGO · Verified Fact Base</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                Official Institutional Fact Sheet
              </h1>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                Download verified statutory filings, project concept notes, leadership rosters, and financial frameworks certified under Uganda NGO Bureau Permit <span className="font-mono font-semibold text-yellow-300">INDP0007369NB</span>.
              </p>
            </div>

            {/* Quick Action Download Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleDownload(activeTab)}
                disabled={isDownloading}
                className="px-5 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                ) : (
                  <Download className="w-4 h-4 text-stone-950" />
                )}
                <span>Download Current Section (PDF)</span>
              </button>

              <button
                onClick={() => handleDownload('all')}
                disabled={isDownloading}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-xs rounded-xl backdrop-blur-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-yellow-300" />
                <span>Download Complete Dossier (4-in-1 PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified Statutory Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Reg File No</div>
              <div className="text-xs font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.registrationFileNo}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Operating Permit</div>
              <div className="text-xs font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitNo}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Permit Duration</div>
              <div className="text-xs font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitDuration} (from 2026)</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Scope of Operations</div>
              <div className="text-xs font-bold text-stone-900">{OFFICIAL_REGISTRATION.operationalArea}</div>
            </div>
          </div>
        </div>

        {/* Document Tabs & Main Viewer */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          {/* Navigation Bar */}
          <div className="bg-stone-50 p-3 sm:p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex overflow-x-auto gap-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                01. Institutional Profile
              </button>
              <button
                onClick={() => setActiveTab('concept-note')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'concept-note'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                02. Combat Center Concept Note
              </button>
              <button
                onClick={() => setActiveTab('reintegration')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'reintegration'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                03. 12-Month Reintegration
              </button>
              <button
                onClick={() => setActiveTab('starter-kit')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'starter-kit'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                04. 300-Family Starter Kit
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => handleDownload(activeTab)}
                disabled={isDownloading}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isDownloading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-white" />
                )}
                <span>Download as PDF</span>
              </button>
            </div>
          </div>

          {/* Document Content Paper */}
          <div className="p-6 sm:p-12 font-serif text-stone-800 max-w-4xl mx-auto space-y-8 leading-relaxed">
            {/* Tab 1: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="text-center pb-6 border-b border-stone-200 space-y-3">
                  <img
                    src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
                    alt="Isaac Faith and Hope Christian Farming Initiative Emblem"
                    referrerPolicy="no-referrer"
                    className="h-24 sm:h-28 w-auto mx-auto object-contain rounded-2xl shadow-sm"
                  />
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-emerald-800 block">
                    Official Institutional Fact Sheet
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-950">
                    Isaac Faith and Hope Christian Farming Initiative (IFHCFI)
                  </h2>
                  <p className="text-xs font-sans text-stone-500">
                    Registered Indigenous Faith-Based Non-Governmental Organization in Uganda
                  </p>
                </div>

                {/* Legal Table */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 font-sans text-xs space-y-3">
                  <div className="font-bold text-emerald-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Statutory Registration &amp; Accreditation Record</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                    <div><strong>Legal Entity:</strong> {OFFICIAL_REGISTRATION.entityType}</div>
                    <div><strong>Registration File No:</strong> {OFFICIAL_REGISTRATION.registrationFileNo}</div>
                    <div><strong>Operating Permit:</strong> {OFFICIAL_REGISTRATION.permitNo}</div>
                    <div><strong>Permit Duration:</strong> {OFFICIAL_REGISTRATION.permitDuration} from {OFFICIAL_REGISTRATION.commencementDate}</div>
                    <div><strong>Geographic Authorization:</strong> {OFFICIAL_REGISTRATION.operationalArea}</div>
                    <div><strong>National Headquarters:</strong> {OFFICIAL_REGISTRATION.flagshipLocation}</div>
                  </div>
                </div>

                {/* Mandate & Holistic Model */}
                <div className="space-y-3">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-600">
                    1. Executive Mandate &amp; Core Model
                  </h3>
                  <p className="text-sm text-stone-700">
                    The Isaac Faith and Hope Christian Farming Initiative (IFHCFI) is an indigenous, faith-based non-governmental organization registered in Uganda. IFHCFI was established to transform vulnerable rural lives through an integrated, self-sustaining paradigm uniting gospel discipleship with climate-smart farming, youth vocational apprenticeships, and justice-system post-release rehabilitation.
                  </p>
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs font-sans font-semibold text-emerald-950">
                    Holistic Formula: Faith + Skills + Agriculture + Livelihoods + Family Support + Rehabilitation + Community Development
                  </div>
                </div>

                {/* Annual Targets */}
                <div className="space-y-3">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-600">
                    2. Documented Annual Operational Targets
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                    {ANNUAL_TARGETS.map((target, idx) => (
                      <div key={idx} className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
                        <div className="text-emerald-800 font-bold text-sm">{target.target}</div>
                        <div className="text-stone-900 font-semibold mt-0.5">{target.category}</div>
                        <p className="text-stone-500 text-[11px] mt-1">{target.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Leadership */}
                <div className="space-y-3">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-600">
                    3. Official Leadership &amp; Board of Trustees
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                    {OFFICIAL_LEADERSHIP.map((m, i) => (
                      <div key={i} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3">
                        {m.image && (
                          <img
                            src={m.image}
                            alt={m.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                            loading="lazy"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-stone-900 truncate">{m.name}</div>
                          <div className="text-emerald-700 font-semibold text-[11px]">{m.role}</div>
                          <div className="text-stone-400 text-[10px] mt-0.5">Verified Roster</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Concept Note */}
            {activeTab === 'concept-note' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="text-center pb-6 border-b border-stone-200 space-y-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-emerald-800 block">
                    Flagship Capital Project
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-950">
                    IFHCFI Combat Empowerment Center Concept Note
                  </h2>
                  <p className="text-xs font-sans text-stone-500">
                    Wakiso District, Uganda · 5-Facility Integrated Demonstration &amp; Vocational Hub
                  </p>
                </div>

                {/* Financial Summary */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 font-sans text-xs space-y-2 text-emerald-950">
                  <div className="font-bold text-xs uppercase tracking-wider text-emerald-900">
                    Financial Architecture &amp; Budget Tiers
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                    <div><strong>Projected Total Masterplan Cost:</strong> USD $3,000,000 (UGX 11,250,000,000)</div>
                    <div><strong>Initial Phase Setup Priority:</strong> UGX 105,000,000 (~USD $28,000)</div>
                  </div>
                  <p className="text-[11px] text-emerald-800 pt-1">
                    *IFHCFI maintains a strict distinction between the long-term 5-year capital masterplan and the immediate Phase 1 seed startup priorities.
                  </p>
                </div>

                {/* 5 Core Facilities */}
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-600">
                    5-Facility Architecture
                  </h3>
                  <div className="space-y-3 font-sans text-xs">
                    {CORE_FACILITIES.map((fac) => (
                      <div key={fac.id} className="p-4 border border-stone-200 rounded-xl bg-stone-50/50">
                        <div className="font-bold text-stone-900 text-sm">{fac.name}</div>
                        <p className="text-stone-600 mt-1 text-xs">{fac.purpose}</p>
                        <div className="text-emerald-800 font-semibold mt-1 text-[11px]">
                          Operational Role: {fac.operationalRole}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reintegration */}
            {activeTab === 'reintegration' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="text-center pb-6 border-b border-stone-200 space-y-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-emerald-800 block">
                    Correctional &amp; Post-Release Justice Standard
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-950">
                    12-Month Post-Release Reintegration Framework
                  </h2>
                  <p className="text-xs font-sans text-stone-500">
                    Serving 6 Correctional Institutions across Uganda
                  </p>
                </div>

                <p className="text-sm text-stone-700">
                  Ugandan correctional facilities face acute recidivism rates due to deep societal exclusion, broken family trust, and the absence of independent economic tools. IFHCFI operates a verified 6-stage post-release rehabilitation protocol bridging prison discharge to independent community stewardship.
                </p>

                {/* Partner Prisons */}
                <div className="bg-stone-50 p-4 border border-stone-200 rounded-2xl font-sans text-xs space-y-2">
                  <div className="font-bold text-stone-900 uppercase text-xs text-emerald-900">
                    6 Partner Prison Facilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                    {PARTNER_PRISONS.map((prison, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span><strong>{prison.name}</strong> ({prison.district} District)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stages */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 1: Pre-Release Preparation (Months -3 to 0)</strong>
                    <p className="text-stone-600 mt-1">In-prison counseling, life skills coaching, Bible distribution, and readiness intake.</p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 2: Reception &amp; Family Dialogue (Month 1)</strong>
                    <p className="text-stone-600 mt-1">Emergency clothing &amp; hygiene pack, trauma counseling at Wakiso Office, mediator visits to home village.</p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 3: Agro-Skills &amp; Fellowship (Months 2-3)</strong>
                    <p className="text-stone-600 mt-1">Dome nursery seedling propagation, zero-grazing goat husbandry, discipleship cohorts.</p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 4: Starter-Kit Asset Deployment (Month 6)</strong>
                    <p className="text-stone-600 mt-1">Delivery of 150 seedling starter kits or livestock breeding pair for independent homestead farming.</p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 5: Local Church &amp; Savings Circle (Months 7-9)</strong>
                    <p className="text-stone-600 mt-1">Integration into a local partner church community and village savings and loan association (VSLA).</p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-xl bg-white">
                    <strong className="text-emerald-800">Stage 6: Graduation &amp; Alumni Mentorship (Month 12)</strong>
                    <p className="text-stone-600 mt-1">Full economic independence audit, formal graduation certificate, and assignment as peer mentors.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Starter Kit */}
            {activeTab === 'starter-kit' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="text-center pb-6 border-b border-stone-200 space-y-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-emerald-800 block">
                    Direct Household Distribution
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-950">
                    Sustainable Farming Starter-Kit Brief
                  </h2>
                  <p className="text-xs font-sans text-stone-500">
                    Documented Annual Target: 300+ Vulnerable Rural Households
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 font-sans text-xs space-y-3">
                  <div className="font-bold text-stone-900 uppercase text-xs text-emerald-900">
                    Standard Kit Components per Family
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
                    <li>150 certified climate-resilient seedlings (Cabbage Gloria F1, Tomato Ansal F1, Collards)</li>
                    <li>Manual hand-tillage toolset (quality steel hoe, garden rake, and calibrated watering can)</li>
                    <li>Inoculated biological organic compost &amp; pest repellent booster pack</li>
                    <li>Simple gravity drip irrigation hose lines (15-meter flexible distribution lines)</li>
                    <li>3 months of agronomist extension home visits and mentorship by IFHCFI field staff</li>
                  </ul>
                  <div className="pt-2 border-t border-stone-200 text-stone-800 font-semibold">
                    Target Unit Cost: UGX 180,000 (Approx. USD $50) per Household
                  </div>
                </div>

                {/* Core Programmes Summary Table */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="font-bold text-stone-900 uppercase text-xs text-stone-600">
                    Related 12 Core Programmes Index
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CORE_PROGRAMMES.map((p, idx) => (
                      <div key={p.id} className="p-2.5 border border-stone-200 rounded-lg bg-white">
                        <span className="font-bold text-emerald-900">{idx + 1}. {p.title}</span>
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">{p.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-[#FBF9F5] p-5 sm:p-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center gap-2 text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Government Registered · Uganda NGO Bureau Permit INDP0007369NB</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDownload('all')}
                disabled={isDownloading}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl border border-stone-300 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-stone-700" />
                <span>Download Full Dossier (PDF)</span>
              </button>

              <PillCtaButton
                onClick={() => onNavigate('get-involved')}
                size="sm"
                label="Partner With Us"
                ariaLabel="Partner with IFHCFI"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
