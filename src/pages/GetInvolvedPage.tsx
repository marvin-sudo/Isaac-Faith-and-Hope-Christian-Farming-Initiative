import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  FileText,
  Loader2 
} from 'lucide-react';
import { DonationExperience } from '../components/DonationExperience';
import { FutureCampaignsSection } from '../components/FutureCampaignsSection';
import { VolunteerAndPartnershipSection } from '../components/VolunteerAndPartnershipSection';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';
import starterKitImg from '../assets/images/family_starter_kit_1790277954367.jpg';

interface GetInvolvedPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ 
  onNavigate, 
  onOpenDocModal 
}) => {
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
    <div className="min-h-screen bg-[#FBF9F5] py-10 px-4 sm:px-6 lg:px-8 space-y-10">
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
          <span className="text-emerald-900 font-semibold">Give Toward Transformation &amp; Get Involved</span>
        </div>

        {/* Hero Header with Relevant Background Image */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-8 sm:p-12">
          {/* Background Image & Scrim */}
          <div className="absolute inset-0 z-0">
            <img 
              src={starterKitImg} 
              alt="Agricultural starter kits and family empowerment distribution in Uganda" 
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
            <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <HeartHandshake className="w-4 h-4 text-yellow-300" />
              <span>Direct Impact &amp; Transparent Giving Channels</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Give Toward Transformation &amp; Partner With IFHCFI
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Equip rural smallholders with drought-resilient seedlings, mentor ex-inmates toward self-reliance, and empower vulnerable widows to feed their families with dignity.
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
                <span>Download Fact Sheet (PDF)</span>
              </button>

              <button
                onClick={() => onNavigate('fact-sheet')}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-yellow-300" />
                <span>View Document Dossier</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. World-Class Give Toward Transformation Experience */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <DonationExperience onOpenDocModal={onOpenDocModal} />
        </div>

        {/* 2. Future Infrastructure Development Campaigns */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <FutureCampaignsSection onNavigate={onNavigate} onOpenDocModal={onOpenDocModal} />
        </div>

        {/* 3. Volunteer With Us & Strategic Institutional Partnerships */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <VolunteerAndPartnershipSection onNavigate={onNavigate} onOpenDocModal={onOpenDocModal} />
        </div>
      </div>
    </div>
  );
};
