import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  Loader2
} from 'lucide-react';
import { 
  OFFICIAL_REGISTRATION, 
  FINANCIAL_TARGETS, 
  OFFICIAL_LEADERSHIP, 
  PARTNER_PRISONS,
  CORE_FACILITIES,
  ANNUAL_TARGETS 
} from '../data/organizationData';
import { generateAndDownloadPDF, DocType } from '../utils/pdfGenerator';

interface DocumentGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentGeneratorModal: React.FC<DocumentGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeDoc, setActiveDoc] = useState<'profile' | 'concept-note' | 'reintegration' | 'starter-kit'>('profile');
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = (type: DocType = activeDoc) => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF(type);
      } catch (err) {
        console.error('Failed to generate PDF:', err);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FBF9F5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
              alt="Organization Logo"
              referrerPolicy="no-referrer"
              className="h-10 sm:h-12 w-auto object-contain rounded-xl shadow-xs"
            />
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                Official Document &amp; Fact Sheet Portfolio
              </h3>
              <p className="text-xs text-stone-500">
                Isaac Faith and Hope Christian Farming Initiative (IFHCFI) · Verified Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadPDF(activeDoc)}
              disabled={isDownloading}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Download this fact sheet as an official PDF"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
              ) : (
                <Download className="w-3.5 h-3.5 text-emerald-700" />
              )}
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={() => handleDownloadPDF('all')}
              disabled={isDownloading}
              className="hidden sm:flex px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Download all institutional documents into a single PDF dossier"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Full Dossier (PDF)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Selection Tabs */}
        <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-100 p-2 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveDoc('profile')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeDoc === 'profile' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            01. Institutional NGO Profile
          </button>
          <button
            onClick={() => setActiveDoc('concept-note')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeDoc === 'concept-note' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            02. Combat Center Concept Note
          </button>
          <button
            onClick={() => setActiveDoc('reintegration')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeDoc === 'reintegration' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            03. 12-Month Reintegration Framework
          </button>
          <button
            onClick={() => setActiveDoc('starter-kit')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeDoc === 'starter-kit' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            04. 300 Family Starter-Kit Brief
          </button>
        </div>

        {/* Document Reading Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800 text-sm leading-relaxed font-serif bg-white selection:bg-[#164E33] selection:text-white">
          {activeDoc === 'profile' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center border-b border-stone-200 pb-6 space-y-2">
                <div className="flex justify-center mb-1">
                  <img
                    src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
                    alt="Organization Logo"
                    referrerPolicy="no-referrer"
                    className="h-20 sm:h-24 w-auto object-contain rounded-2xl shadow-xs"
                  />
                </div>
                <div className="text-xs uppercase font-sans tracking-widest text-[#164E33] font-bold">
                  Official Institutional Profile
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  Isaac Faith and Hope Christian Farming Initiative (IFHCFI)
                </h2>
                <div className="text-xs font-sans text-stone-500">
                  Government of Uganda Registered NGO · Authorized Countrywide
                </div>
              </div>

              {/* Legal Registry Box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-sans text-xs space-y-2">
                <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] text-[#164E33]">
                  Verified Legal Credentials (Fact Base)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  <div><strong>Legal Entity:</strong> {OFFICIAL_REGISTRATION.entityType}</div>
                  <div><strong>Registration File No:</strong> {OFFICIAL_REGISTRATION.registrationFileNo}</div>
                  <div><strong>Operating Permit No:</strong> {OFFICIAL_REGISTRATION.permitNo}</div>
                  <div><strong>Permit Duration:</strong> {OFFICIAL_REGISTRATION.permitDuration} from {OFFICIAL_REGISTRATION.commencementDate}</div>
                  <div><strong>Authorized Area:</strong> {OFFICIAL_REGISTRATION.operationalArea}</div>
                  <div><strong>Flagship Location:</strong> {OFFICIAL_REGISTRATION.flagshipLocation}</div>
                </div>
              </div>

              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                  1. Executive Mandate &amp; Holistic Model
                </h4>
                <p>
                  The Isaac Faith and Hope Christian Farming Initiative (IFHCFI) is an indigenous, faith-based non-governmental organisation officially registered in Uganda. IFHCFI operates at the intersection of Christian discipleship, climate-smart agriculture, vocational mastery, and prison rehabilitation.
                </p>
                <p className="mt-2">
                  Core Development Model: <strong className="font-sans text-stone-900">Faith + Skills + Agriculture + Livelihoods + Family Support + Rehabilitation + Community Development</strong>.
                </p>
              </div>

              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                  2. Official Leadership Roster
                </h4>
                <div className="font-sans text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {OFFICIAL_LEADERSHIP.map((m, i) => (
                    <div key={i} className="p-2 border border-stone-200 rounded-lg bg-stone-50 flex items-center gap-2.5">
                      {m.image && (
                        <img
                          src={m.image}
                          alt={m.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-lg object-cover shrink-0 border border-stone-200"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-stone-900 block truncate">{m.name}</span>
                        <span className="text-stone-500 block text-[11px]">{m.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDoc === 'concept-note' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center border-b border-stone-200 pb-6 space-y-1">
                <div className="text-xs uppercase font-sans tracking-widest text-[#164E33] font-bold">
                  Project Concept Note
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  IFHCFI Combat Empowerment Center
                </h2>
                <div className="text-xs font-sans text-stone-500">
                  Wakiso District, Uganda · 5-Facility Operational Hub
                </div>
              </div>

              <div className="font-sans text-xs p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
                <div><strong>Total Projected Masterplan Cost:</strong> USD 3,000,000 (UGX 11,250,000,000)</div>
                <div><strong>Initial Phase Setup Priority:</strong> UGX 105,000,000 (Approx. USD 28,000)</div>
                <div className="text-[11px] text-emerald-800">
                  *Transparently noted: Multi-year master budget vs immediate priority seed phase.
                </div>
              </div>

              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                  Integrated Facility Architecture
                </h4>
                <div className="space-y-3 font-sans text-xs">
                  {CORE_FACILITIES.map((f) => (
                    <div key={f.id} className="p-3 border border-stone-200 rounded-lg">
                      <div className="font-bold text-stone-900 text-sm">{f.name}</div>
                      <div className="text-stone-600 mt-1">{f.purpose}</div>
                      <div className="text-[#164E33] font-medium mt-1">Role: {f.operationalRole}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDoc === 'reintegration' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center border-b border-stone-200 pb-6 space-y-1">
                <div className="text-xs uppercase font-sans tracking-widest text-[#164E33] font-bold">
                  Methodology &amp; Standards
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  12-Month Post-Release Reintegration Framework
                </h2>
                <div className="text-xs font-sans text-stone-500">
                  Operating in Kasangati, Buwambo, Nyimbwa, Nakasongola M/W, Masafu &amp; Sentema
                </div>
              </div>

              <p>
                Ugandan correctional facilities face acute recidivism rates due to societal exclusion and lack of economic tools. IFHCFI operates a structured 6-stage pipeline:
              </p>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 1: Pre-Release Preparation (Months -3 to 0)</strong>
                  <p className="text-stone-600 mt-0.5">In-prison counseling, life-skills, Bible distribution, readiness intake.</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 2: Reception &amp; Family Dialogue (Month 1)</strong>
                  <p className="text-stone-600 mt-0.5">Emergency pack, counseling at Wakiso Store &amp; Counseling Office, mediator visits to home village.</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 3: Agro-Skills &amp; Fellowship (Months 2-3)</strong>
                  <p className="text-stone-600 mt-0.5">Dome farm nursery training, livestock husbandry (goats/poultry), discipleship cohort.</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 4: Starter-Kit Asset Deployment (Month 6)</strong>
                  <p className="text-stone-600 mt-0.5">Delivery of vegetable seedling kits or poultry breeding pair for independent breadwinning.</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 5: Church &amp; Savings Integration (Months 7-9)</strong>
                  <p className="text-stone-600 mt-0.5">Enrollment in local partner church fellowship and community micro-savings circle.</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg">
                  <strong>Stage 6: Graduation &amp; Alumni Peer Mentorship (Month 12)</strong>
                  <p className="text-stone-600 mt-0.5">Final livelihood sustainability audit, graduation certificate, zero recidivism verified.</p>
                </div>
              </div>
            </div>
          )}

          {activeDoc === 'starter-kit' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center border-b border-stone-200 pb-6 space-y-1">
                <div className="text-xs uppercase font-sans tracking-widest text-[#164E33] font-bold">
                  Programme Technical Specification
                </div>
                <h2 className="text-2xl font-bold text-stone-900">
                  Sustainable Farming Starter-Kit Distribution
                </h2>
                <div className="text-xs font-sans text-stone-500">
                  Annual Target: 300+ Vulnerable Families, Widows &amp; Single Mothers
                </div>
              </div>

              <div className="font-sans text-xs space-y-4">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="font-bold text-stone-900 mb-1">Kit Specifications per Household:</div>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>150 certified climate-resilient vegetable seedlings (Cabbage Gloria F1, Tomato Ansal F1, Collards)</li>
                    <li>Basic manual hand-tillage toolset (hoe, rake, watering can)</li>
                    <li>Biological organic compost inoculation pack</li>
                    <li>Simple gravity drip irrigation hose lines (15-meter length)</li>
                    <li>3 months of agronomist extension monitoring visits from IFHCFI field officers</li>
                  </ul>
                </div>
                <div>
                  <strong>Projected Unit Cost per Household:</strong> UGX 180,000 (Approx. USD $50)
                </div>
                <div>
                  <strong>Target Output:</strong> 300 Household homestead gardens established annually.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FBF9F5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Verified against Republic of Uganda NGO Bureau Permit INDP0007369NB</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadPDF(activeDoc)}
              disabled={isDownloading}
              className="px-3.5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <Download className="w-3.5 h-3.5 text-white" />
              )}
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={() => handleCopyText(document.querySelector('.overflow-y-auto')?.textContent || '')}
              className="px-4 py-2 font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
