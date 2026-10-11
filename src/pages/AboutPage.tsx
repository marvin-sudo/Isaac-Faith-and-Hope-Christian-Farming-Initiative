import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  Download, 
  Sprout, 
  Award, 
  Building, 
  Calendar, 
  Scale, 
  CheckCircle2,
  Loader2,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DevelopmentModel } from '../components/DevelopmentModel';
import { LeadershipGovernance } from '../components/LeadershipGovernance';
import { SpiritualFoundationSection } from '../components/SpiritualFoundationSection';
import { OFFICIAL_REGISTRATION, OFFICIAL_LEADERSHIP } from '../data/organizationData';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import heroFarmingImg from '../assets/images/hero_ugandan_farming_1790193085963.jpg';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenDocModal }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadPDF('profile');
      } catch (e) {
        console.error(e);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">About Us &amp; Governance</span>
        </div>

        {/* Hero Banner with Relevant Background Image */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroFarmingImg} 
              alt="IFHCFI agricultural stewardship and rural community in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>Incorporated &amp; Permitted NGO · Republic of Uganda</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              About Isaac Faith &amp; Hope Christian Farming Initiative
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              We are an indigenous Ugandan non-governmental organization operating at the intersection of Christian discipleship, climate-smart farming, vocational youth empowerment, and prison rehabilitation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                ) : (
                  <Download className="w-4 h-4 text-stone-950" />
                )}
                <span>Download Institutional Profile (PDF)</span>
              </button>

              <PillCtaButton
                onClick={() => onNavigate('get-involved')}
                size="sm"
                label="Partner With Us"
              />
            </div>
          </div>
        </div>

        {/* Dedicated About Sections Hub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Dedicated Sections
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Explore About Us By Topic
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              5 In-Depth Dossiers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <button
              onClick={() => onNavigate('who-we-are')}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-800 uppercase tracking-wide font-semibold">Identity</div>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Who We Are
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  Our origin, statutory credentials and calling across Uganda.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>Read Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('vision-mission')}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-amber-700 uppercase tracking-wide font-semibold">Mandate</div>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-amber-700 transition-colors">
                  Vision, Mission &amp; Values
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  Biblical grounding, core mission statement, and 6 organizational values.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform">
                <span>View Principles</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('founder')}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-800 uppercase tracking-wide font-semibold">Leadership</div>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                  About the Founder
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  Mukaga Titus Joshua's divine journey, ministry background and calling.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('volunteers')}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-blue-700 uppercase tracking-wide font-semibold">Serve</div>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">
                  Volunteers
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  Join agricultural outreach, prison ministry, mentoring and youth training.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform">
                <span>Join Hands</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('ministry-profile')}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-800 uppercase tracking-wide font-semibold">Dossier</div>
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Ministry Profile
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  7-pillar model, facilities, 5-year targets and institutional structure.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>Open Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          </div>
        </div>

        {/* Verified Statutory Registration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Government Verified Credentials
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Statutory Registration &amp; Operating License
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status: Active &amp; Good Standing</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Registration File Number</div>
              <div className="text-sm font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.registrationFileNo}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Operating Permit Number</div>
              <div className="text-sm font-mono font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitNo}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Permit Duration &amp; Date</div>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.permitDuration} from {OFFICIAL_REGISTRATION.commencementDate}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Approved Geographical Scope</div>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.operationalArea}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Headquarters &amp; Flagship Hub</div>
              <div className="text-sm font-bold text-stone-900">{OFFICIAL_REGISTRATION.flagshipLocation}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="text-stone-500 font-medium">Primary Focus Beneficiaries</div>
              <div className="text-sm font-bold text-stone-900">Smallholders, Widows, Youth &amp; Ex-Inmates</div>
            </div>
          </div>
        </div>

        {/* 7-Pillars Development Model */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Core Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              The 7-Pillar Holistic Development Architecture
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              How faith, technical skills, agriculture, and justice ministry interact to create self-sustaining rural communities.
            </p>
          </div>
          <DevelopmentModel />
        </div>

        {/* Christian Faith & Spiritual Foundation */}
        <SpiritualFoundationSection onNavigate={onNavigate} />

        {/* Leadership & Governance Council */}
        <div className="space-y-6 pt-6">
          <LeadershipGovernance />
        </div>
      </div>
    </div>
  );
};
