import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Download, 
  Sprout, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Scale, 
  Users, 
  HeartHandshake, 
  Loader2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_REGISTRATION } from '../data/organizationData';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import { PillCtaButton } from '../components/PillCtaButton';
import heroFarmingImg from '../assets/images/hero_ugandan_farming_1790193085963.jpg';

interface WhoWeArePageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ onNavigate, onOpenDocModal }) => {
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
          <button 
            onClick={() => onNavigate('about')} 
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            About Us
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-900 font-semibold">Who We Are</span>
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
              Who We Are: Faith, Farming &amp; Transformation
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Isaac Faith and Hope Christian Farming Initiative (IFHCFI) is an indigenous, faith-grounded Ugandan non-governmental organization dedicated to breaking cycles of rural poverty, youth unemployment, and criminal recidivism.
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

        {/* Story & Origin Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Our Origin &amp; Calling
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Born to Restore Dignity to the Forgotten
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Rooted in Wakiso District and extending countrywide, IFHCFI arose from a heartbreaking reality across Uganda: millions of smallholder families face chronic poverty driven by climate shocks and lack of farm inputs, while thousands of ex-prisoners leave correctional facilities with zero savings, social stigma, and no marketable trade.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We believe that preaching the Gospel without practical livelihood empowerment leaves vulnerable families exposed, while secular aid without Christ lacks eternal transformation. By marrying bio-intensive agriculture, certified vocational trades, and restorative pastoral ministry, we build a self-sustaining engine of physical food and spiritual life.
            </p>
          </div>

          {/* 4 Pillars of Distinction */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Climate-Smart Farming</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Greenhouse dome propagation, seedling nurseries, and drip irrigation guaranteeing all-season harvest.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Youth Vocational Trades</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hands-on certified apprenticeships in carpentry, tailoring, welding, and farm machinery maintenance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Prison Reintegration</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Partnering with 6 correctional institutions across Uganda with a 12-month post-release accompaniment pipeline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Christ-Centered Hope</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Uncompromising biblical discipleship, trauma healing counseling, and partnership with over 500 rural churches.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Statutory Registration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
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

        {/* Navigation Quick Links to other About Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <button
            onClick={() => onNavigate('vision-mission')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="text-xs font-mono uppercase text-emerald-800 font-bold">Next</div>
            <div className="font-serif font-bold text-stone-900 text-base mt-1 group-hover:text-emerald-800 flex items-center justify-between">
              <span>Vision &amp; Values</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-stone-500 mt-1">Our divine mandate and 6 foundational values</p>
          </button>

          <button
            onClick={() => onNavigate('founder')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="text-xs font-mono uppercase text-emerald-800 font-bold">Leadership</div>
            <div className="font-serif font-bold text-stone-900 text-base mt-1 group-hover:text-emerald-800 flex items-center justify-between">
              <span>About the Founder</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-stone-500 mt-1">Mukaga Titus Joshua’s journey and calling</p>
          </button>

          <button
            onClick={() => onNavigate('volunteers')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="text-xs font-mono uppercase text-emerald-800 font-bold">Community</div>
            <div className="font-serif font-bold text-stone-900 text-base mt-1 group-hover:text-emerald-800 flex items-center justify-between">
              <span>Volunteers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-stone-500 mt-1">Join our hands-on field volunteer community</p>
          </button>

          <button
            onClick={() => onNavigate('ministry-profile')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="text-xs font-mono uppercase text-emerald-800 font-bold">Architecture</div>
            <div className="font-serif font-bold text-stone-900 text-base mt-1 group-hover:text-emerald-800 flex items-center justify-between">
              <span>Ministry Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-stone-500 mt-1">7-pillar model, facilities &amp; compliance</p>
          </button>
        </div>
      </div>
    </div>
  );
};
