import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Download,
  HeartHandshake,
  Share2,
  BookOpen,
  ShieldCheck,
  Check,
  Building2,
  Tag
} from 'lucide-react';
import { AdminProgramme } from '../data/adminStore';
import { PillCtaButton } from '../components/PillCtaButton';
import { generateAndDownloadPDF } from '../utils/pdfGenerator';

interface ProgrammeDetailPageProps {
  programme: AdminProgramme;
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  programme,
  onNavigate,
  onOpenDocModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    generateAndDownloadPDF('all');
  };

  // Render markdown-like full description cleanly
  const renderFormattedDescription = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: number) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="space-y-2 my-4 pl-2">
            {listBuffer.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-stone-700 text-sm sm:text-base leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const renderInline = (str: string): React.ReactNode => {
      const parts: React.ReactNode[] = [];
      let current = str;
      let counter = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      let lastIndex = 0;

      while ((match = boldRegex.exec(current)) !== null) {
        if (match.index > lastIndex) {
          parts.push(current.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`b-${counter++}`} className="font-semibold text-stone-900">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < current.length) {
        parts.push(current.substring(lastIndex));
      }

      return parts.length > 0 ? parts : str;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        listBuffer.push(trimmed.substring(2));
        return;
      }

      flushList(idx);

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-8 mb-3 border-b border-stone-200/80 pb-2">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-xl font-serif font-bold text-[#164E33] mt-6 mb-2">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={idx} className="border-l-4 border-emerald-600 bg-emerald-50/80 p-4 my-4 rounded-r-2xl text-stone-800 text-sm sm:text-base italic font-serif">
            "{trimmed.substring(2)}"
          </blockquote>
        );
      } else if (trimmed.startsWith('![') && trimmed.includes('](')) {
        const altMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (altMatch) {
          elements.push(
            <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img src={altMatch[2]} alt={altMatch[1]} className="w-full max-h-96 object-cover" />
              {altMatch[1] && (
                <div className="p-2.5 text-xs text-stone-500 bg-stone-50 border-t border-stone-200 text-center italic">
                  {altMatch[1]}
                </div>
              )}
            </div>
          );
        }
      } else if (trimmed === '') {
        // spacing
      } else {
        elements.push(
          <p key={idx} className="text-stone-700 text-sm sm:text-base leading-relaxed my-3">
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);

    return <div className="space-y-2">{elements}</div>;
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <button
              onClick={() => onNavigate('programmes')}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Programmes
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-emerald-950 font-semibold truncate max-w-xs sm:max-w-md">
              {programme.title}
            </span>
          </div>

          <button
            onClick={() => onNavigate('programmes')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-900 bg-white hover:bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Programmes Directory</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl bg-stone-950 p-6 sm:p-10 lg:p-12">
          {/* Subtle Background Ambience using Programme Image */}
          {programme.image && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={programme.image} 
                alt="" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.1] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-950/60" />
            </div>
          )}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{programme.category}</span>
                </span>
                {programme.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-semibold">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>Featured Flagship</span>
                  </span>
                )}
                <span className="text-xs text-stone-300 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>Published {programme.publishDate}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {programme.title}
              </h1>

              <p className="text-emerald-100/95 text-sm sm:text-base leading-relaxed">
                {programme.summary}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <PillCtaButton
                  onClick={() => onNavigate('get-involved')}
                  label="Partner / Support This Programme"
                  size="md"
                />

                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Official PDF Dossier</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/15 text-stone-200 hover:text-white border border-white/15 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy Page Link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Featured Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 group aspect-4/3 max-h-80 sm:max-h-96">
                <img
                  src={programme.image || 'https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg'}
                  alt={programme.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{programme.location || 'Wakiso District & Countrywide'}</span>
                  </span>
                  <span className="bg-black/60 px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-mono">
                    VERIFIED INITIATIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Main Article Column + Metadata Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Full Description & Objectives */}
          <div className="lg:col-span-8 space-y-8">
            {/* Rich Text Full Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#164E33]">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Comprehensive Programme Document</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Status: {programme.status}
                </span>
              </div>

              {renderFormattedDescription(programme.fullDescription)}
            </div>

            {/* Core Objectives & Key Practical Activities */}
            {programme.keyActivities && programme.keyActivities.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Core Practical Activities &amp; Interventions</span>
                </h3>
                <p className="text-xs text-stone-600">
                  Structured interventions executed by IFHCFI field agronomists, trainers, and counseling teams:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {programme.keyActivities.map((act, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-200 transition-colors flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                        {index + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-stone-800 font-medium">
                        {act}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Gallery Photos (if uploaded) */}
            {programme.additionalImages && programme.additionalImages.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Field Photo Documentation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {programme.additionalImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-stone-200 aspect-4/3 bg-stone-100 group shadow-2xs"
                    >
                      <img
                        src={imgUrl}
                        alt={`Documentation ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info & Verification */}
          <div className="lg:col-span-4 space-y-6">
            {/* Programme Vital Information Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-2">
                Programme Profile
              </h4>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-stone-400 uppercase text-[10px] font-semibold tracking-wider block mb-1">
                    Category
                  </span>
                  <span className="font-semibold text-stone-800 text-sm bg-stone-100 px-2.5 py-1 rounded-md inline-block">
                    {programme.category}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 uppercase text-[10px] font-semibold tracking-wider block mb-1">
                    Operating Location
                  </span>
                  <div className="flex items-center gap-1.5 font-medium text-stone-800 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{programme.location || 'Wakiso District & Rural Centers'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 uppercase text-[10px] font-semibold tracking-wider block mb-1">
                    Target Beneficiaries
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {programme.targetBeneficiaries.map((b, bi) => (
                      <span
                        key={bi}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-100"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {programme.developmentLink && (
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] font-semibold tracking-wider block mb-1">
                      Development Contribution
                    </span>
                    <p className="text-stone-700 leading-snug">
                      {programme.developmentLink}
                    </p>
                  </div>
                )}

                {programme.verifiedScope && (
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-[11px]">
                    <span className="font-semibold text-stone-900 block mb-0.5">
                      Verified Mandate Scope:
                    </span>
                    {programme.verifiedScope}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <button
                  onClick={() => onNavigate('get-involved')}
                  className="w-full py-2.5 px-4 bg-[#164E33] hover:bg-[#0D281A] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-300" />
                  <span>Support / Fund This Initiative</span>
                </button>

                {onOpenDocModal && (
                  <button
                    onClick={onOpenDocModal}
                    className="w-full py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Request Concept Note &amp; Budget
                  </button>
                )}
              </div>
            </div>

            {/* Official Registration Callout Box */}
            <div className="bg-[#0D281A] text-white rounded-3xl p-6 border border-emerald-950 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Institutional Governance</span>
              </div>
              <h5 className="font-serif font-bold text-base text-stone-100">
                Interdenominational Faith Healing Churches Fellowship International
              </h5>
              <div className="space-y-1.5 text-xs text-stone-300 pt-1 font-mono">
                <div>Permit: <strong className="text-white">INDP0007369NB</strong></div>
                <div>Reg: <strong className="text-white">MIA/NB/2026/03/7369</strong></div>
                <div>Wakiso District, Uganda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
