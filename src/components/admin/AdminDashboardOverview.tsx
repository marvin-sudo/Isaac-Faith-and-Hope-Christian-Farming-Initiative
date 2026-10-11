import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  FileEdit,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Sparkles,
  Mail,
  ArrowRight,
  Plus,
  Clock,
  ShieldCheck,
  ExternalLink,
  Users,
  Sprout,
  DollarSign
} from 'lucide-react';
import {
  AdminProgramme,
  WebsiteUpdate,
  GalleryImage,
  UpcomingEvent,
  SuccessStory,
  ContactMessage,
  AdminActivityItem
} from '../../data/adminStore';

interface AdminDashboardOverviewProps {
  programmes: AdminProgramme[];
  updates: WebsiteUpdate[];
  gallery: GalleryImage[];
  events: UpcomingEvent[];
  stories: SuccessStory[];
  messages: ContactMessage[];
  activities: AdminActivityItem[];
  onNavigateModule: (module: any) => void;
  onOpenCreateProgramme: () => void;
  onOpenCreateUpdate: () => void;
  onOpenUploadGallery: () => void;
  onReturnToPublic: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  programmes,
  updates,
  gallery,
  events,
  stories,
  messages,
  activities,
  onNavigateModule,
  onOpenCreateProgramme,
  onOpenCreateUpdate,
  onOpenUploadGallery,
  onReturnToPublic,
}) => {
  const publishedProgrammes = programmes.filter(p => p.status === 'Published').length;
  const draftProgrammes = programmes.filter(p => p.status === 'Draft').length;
  const publishedUpdates = updates.filter(u => u.status === 'Published').length;
  const unreadMessages = messages.filter(m => m.status === 'New').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome & Command Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>National Central Coordination Portal · System Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            IFHCFI Executive Administration Command
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-3xl">
            Centralized portal to manage public programmes, publish news and field reports, manage high-res media galleries, review incoming community partnership inquiries, and oversee operations.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-2 font-mono">
            <span>Permit INDP0007369NB</span>
            <span aria-hidden="true">·</span>
            <span>Registration MIA/NB/2026/03/7369</span>
            <span aria-hidden="true">·</span>
            <span>Wakiso Central Coordination, Uganda</span>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCreateProgramme}
            className="px-4 py-2.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Programme</span>
          </button>
          <button
            onClick={onOpenCreateUpdate}
            className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Newspaper className="w-3.5 h-3.5 text-emerald-800" />
            <span>Post Update</span>
          </button>
          <button
            onClick={onReturnToPublic}
            className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#164E33] border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>
        </div>
      </div>

      {/* 8 Primary Website Overview Cards (Exact user requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total Programmes */}
        <div 
          onClick={() => onNavigateModule('programmes')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Programmes
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#164E33] flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900 group-hover:text-[#164E33] transition-colors">
              {programmes.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>Dynamic catalogue</span>
              <span className="text-[#164E33] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Manage <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* 2. Published Programmes */}
        <div 
          onClick={() => onNavigateModule('programmes')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Published
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-emerald-900">
              {publishedProgrammes}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>Live on public site</span>
              <span className="text-emerald-700 font-semibold font-mono text-[11px]">
                {Math.round((publishedProgrammes / (programmes.length || 1)) * 100)}% active
              </span>
            </div>
          </div>
        </div>

        {/* 3. Draft Programmes */}
        <div 
          onClick={() => onNavigateModule('programmes')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Draft Programmes
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {draftProgrammes}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>Work in progress</span>
              <span className="text-amber-700 font-semibold">Review</span>
            </div>
          </div>
        </div>

        {/* 4. Gallery Images */}
        <div 
          onClick={() => onNavigateModule('gallery')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Gallery Images
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {gallery.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>High-res assets</span>
              <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Gallery <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* 5. Updates / News */}
        <div 
          onClick={() => onNavigateModule('updates')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Updates / News
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {updates.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>{publishedUpdates} published</span>
              <span className="text-purple-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                News <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* 6. Upcoming Events */}
        <div 
          onClick={() => onNavigateModule('events')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Upcoming Events
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {events.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>Workshops &amp; missions</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Events <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* 7. Success Stories */}
        <div 
          onClick={() => onNavigateModule('events')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Success Stories
            </span>
            <div className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {stories.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>Transformation records</span>
              <span className="text-yellow-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Stories <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* 8. Contact Messages */}
        <div 
          onClick={() => onNavigateModule('messages')}
          className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative"
        >
          {unreadMessages > 0 && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold font-mono animate-pulse">
              {unreadMessages} New
            </span>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Contact Messages
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-stone-900">
              {messages.length}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 mt-1">
              <span>{unreadMessages} awaiting review</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Inbox <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Activity Feed + Quick Action Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity Section (Exact user requirement) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#164E33]" />
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 uppercase tracking-wider">
                Recent Activity
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">Live Audit Log</span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 7).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/40 border border-stone-200/80 transition-colors flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">• {item.action}</span>
                    <span className="px-1.5 py-0.2 rounded bg-stone-200/70 text-stone-700 text-[10px] uppercase font-mono">
                      {item.targetType}
                    </span>
                  </div>
                  <div className="text-stone-600 truncate font-medium">
                    "{item.targetTitle}"
                  </div>
                </div>
                <div className="text-right shrink-0 text-stone-400 font-mono text-[11px]">
                  <div>{item.timestamp}</div>
                  <div className="text-[10px] text-stone-500">{item.user}</div>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="p-8 text-center text-stone-400 text-xs">
                No recent activity recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Launchpad & Operational Integrations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
              Quick Admin Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
              <button
                onClick={onOpenCreateProgramme}
                className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#164E33] border border-emerald-200 transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Add New Programme</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenCreateUpdate}
                className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Publish Field Update</span>
                <Newspaper className="w-3.5 h-3.5 text-emerald-800" />
              </button>
              <button
                onClick={onOpenUploadGallery}
                className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Upload Gallery Photo</span>
                <ImageIcon className="w-3.5 h-3.5 text-blue-700" />
              </button>
              <button
                onClick={() => onNavigateModule('messages')}
                className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Review Inquiries</span>
                <Mail className="w-3.5 h-3.5 text-amber-700" />
              </button>
            </div>
          </div>

          {/* Operational Continuity Callout */}
          <div className="bg-[#0D281A] text-white rounded-3xl p-6 border border-emerald-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                Internal Operations Modules
              </span>
              <span className="text-[10px] font-mono bg-emerald-900/90 text-emerald-200 px-2 py-0.5 rounded">
                Wakiso Center
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Confidential beneficiary rosters, 12-month post-release prison caseloads, dome nursery seed batches, and prisoner biometrics are linked below.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                onClick={() => onNavigateModule('beneficiaries')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <Users className="w-3 h-3 text-emerald-400" />
                <span>Beneficiaries</span>
              </button>
              <button
                onClick={() => onNavigateModule('reintegration')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3 h-3 text-yellow-400" />
                <span>12-Mo Reentry</span>
              </button>
              <button
                onClick={() => onNavigateModule('agriculture')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <Sprout className="w-3 h-3 text-emerald-400" />
                <span>Dome &amp; Livestock</span>
              </button>
              <button
                onClick={() => onNavigateModule('prisoners')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <Users className="w-3 h-3 text-blue-400" />
                <span>Uganda Prisons</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
