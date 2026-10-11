import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Sprout, 
  Layers, 
  Lock, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Search,
  Filter,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Mail,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  OFFICIAL_REGISTRATION, 
  FINANCIAL_TARGETS, 
  CORE_FACILITIES,
  PARTNER_PRISONS 
} from '../data/organizationData';
import { 
  BeneficiaryRecord, 
  ReintegrationCase, 
  DomeNurseryBatch, 
  LivestockRecord,
  INITIAL_BENEFICIARIES, 
  INITIAL_REINTEGRATION_CASES, 
  INITIAL_DOME_BATCHES, 
  INITIAL_LIVESTOCK,
  COMBAT_CENTER_SETUP_ITEMS 
} from '../data/operationsData';
import { ManagePrisonersModule } from './ManagePrisonersModule';

// Upgraded Admin Content Management Components & Store
import {
  AdminProgramme,
  WebsiteUpdate,
  GalleryImage,
  UpcomingEvent,
  SuccessStory,
  ContactMessage,
  AdminActivityItem,
  getAdminProgrammes,
  getWebsiteUpdates,
  getGalleryImages,
  getUpcomingEvents,
  getSuccessStories,
  getContactMessages,
  getActivityLog
} from '../data/adminStore';
import { AdminDashboardOverview } from './admin/AdminDashboardOverview';
import { AdminProgrammeManager } from './admin/AdminProgrammeManager';
import { AdminUpdatesManager } from './admin/AdminUpdatesManager';
import { AdminGalleryManager } from './admin/AdminGalleryManager';
import { AdminEventsAndStories } from './admin/AdminEventsAndStories';
import { AdminMessagesManager } from './admin/AdminMessagesManager';
import { AdminSettingsBackup } from './admin/AdminSettingsBackup';

export type AdminActiveModule =
  | 'overview'
  | 'programmes'
  | 'updates'
  | 'gallery'
  | 'events-stories'
  | 'messages'
  | 'beneficiaries'
  | 'reintegration'
  | 'agriculture'
  | 'finance'
  | 'prisoners'
  | 'backup';

interface OperationsPortalProps {
  onReturnToPublic: () => void;
  onOpenDocModal: () => void;
  onPreviewProgrammeOnSite?: (progId: string) => void;
}

export const OperationsPortal: React.FC<OperationsPortalProps> = ({
  onReturnToPublic,
  onOpenDocModal,
  onPreviewProgrammeOnSite,
}) => {
  // Current active role in system
  const [activeRole, setActiveRole] = useState<string>('Country Coordinator (Mukaga Titus Joshua)');
  const [activeModule, setActiveModule] = useState<AdminActiveModule>('overview');

  // Dynamic state for Admin Content Management
  const [programmes, setProgrammes] = useState<AdminProgramme[]>(getAdminProgrammes);
  const [updates, setUpdates] = useState<WebsiteUpdate[]>(getWebsiteUpdates);
  const [gallery, setGallery] = useState<GalleryImage[]>(getGalleryImages);
  const [events, setEvents] = useState<UpcomingEvent[]>(getUpcomingEvents);
  const [stories, setStories] = useState<SuccessStory[]>(getSuccessStories);
  const [messages, setMessages] = useState<ContactMessage[]>(getContactMessages);
  const [activities, setActivities] = useState<AdminActivityItem[]>(getActivityLog);

  // Sync state when any admin store dispatches update events
  useEffect(() => {
    const refreshAll = () => {
      setProgrammes(getAdminProgrammes());
      setUpdates(getWebsiteUpdates());
      setGallery(getGalleryImages());
      setEvents(getUpcomingEvents());
      setStories(getSuccessStories());
      setMessages(getContactMessages());
      setActivities(getActivityLog());
    };

    window.addEventListener('ifhcfi_programmes_updated', refreshAll);
    window.addEventListener('ifhcfi_updates_updated', refreshAll);
    window.addEventListener('ifhcfi_gallery_updated', refreshAll);
    window.addEventListener('ifhcfi_events_updated', refreshAll);
    window.addEventListener('ifhcfi_stories_updated', refreshAll);
    window.addEventListener('ifhcfi_messages_updated', refreshAll);
    window.addEventListener('ifhcfi_activity_updated', refreshAll);

    return () => {
      window.removeEventListener('ifhcfi_programmes_updated', refreshAll);
      window.removeEventListener('ifhcfi_updates_updated', refreshAll);
      window.removeEventListener('ifhcfi_gallery_updated', refreshAll);
      window.removeEventListener('ifhcfi_events_updated', refreshAll);
      window.removeEventListener('ifhcfi_stories_updated', refreshAll);
      window.removeEventListener('ifhcfi_messages_updated', refreshAll);
      window.removeEventListener('ifhcfi_activity_updated', refreshAll);
    };
  }, []);

  // Dynamic state for Beneficiaries
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryRecord[]>(INITIAL_BENEFICIARIES);
  const [beneficiarySearch, setBeneficiarySearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState<boolean>(false);

  // New beneficiary form
  const [newBenCategory, setNewBenCategory] = useState<BeneficiaryRecord['category']>('Vulnerable Family');
  const [newBenDistrict, setNewBenDistrict] = useState<string>('Wakiso District');
  const [newBenSubCounty, setNewBenSubCounty] = useState<string>('Kasangati');
  const [newBenKit, setNewBenKit] = useState<BeneficiaryRecord['starterKitType']>('Horticulture Seedling Kit');
  const [newBenNotes, setNewBenNotes] = useState<string>('');

  // Reintegration cases state
  const [cases, setCases] = useState<ReintegrationCase[]>(INITIAL_REINTEGRATION_CASES);
  const [selectedCase, setSelectedCase] = useState<ReintegrationCase | null>(INITIAL_REINTEGRATION_CASES[0]);

  // Agricultural records state
  const [batches, setBatches] = useState<DomeNurseryBatch[]>(INITIAL_DOME_BATCHES);
  const [livestock, setLivestock] = useState<LivestockRecord[]>(INITIAL_LIVESTOCK);

  // Financial tracking (UGX)
  const initialPhaseTargetUGX = 105000000;
  const fundsRaisedUGX = 18500000; // Tracked mobilization pledges
  const fundingGapUGX = initialPhaseTargetUGX - fundsRaisedUGX;

  // Add beneficiary handler
  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: BeneficiaryRecord = {
      id: `b-${Date.now()}`,
      code: `IFH-BEN-0${beneficiaries.length + 101}`,
      category: newBenCategory,
      district: newBenDistrict,
      subCounty: newBenSubCounty,
      enrolledDate: new Date().toISOString().split('T')[0],
      programmeId: newBenCategory === 'Ex-Prisoner' ? 'prog-9' : 'prog-4',
      programmeName: newBenCategory === 'Ex-Prisoner' ? 'Ex-Prisoner Rehabilitation & Reintegration' : 'Vulnerable Family Support',
      starterKitDelivered: false,
      starterKitType: newBenKit,
      followUpStatus: 'Active - On Track',
      discipleshipEnrolled: true,
      confidentialNotes: newBenNotes || 'Intake completed; pending initial field visit.',
    };

    setBeneficiaries([newRecord, ...beneficiaries]);
    setShowAddBeneficiaryModal(false);
    setNewBenNotes('');
  };

  // Toggle kit delivery status
  const handleToggleKit = (id: string) => {
    setBeneficiaries(
      beneficiaries.map((b) =>
        b.id === id ? { ...b, starterKitDelivered: !b.starterKitDelivered } : b
      )
    );
  };

  // Advance reintegration milestone
  const handleAdvanceMilestone = (caseId: string) => {
    setCases(
      cases.map((c) => {
        if (c.id === caseId) {
          const newProgress = Math.min(100, c.progressPercent + 15);
          return {
            ...c,
            progressPercent: newProgress,
            counselingSessionsCompleted: c.counselingSessionsCompleted + 1,
            currentMilestone:
              newProgress >= 100
                ? 'Phase 6: Independent Livelihood Graduation'
                : newProgress >= 75
                ? 'Phase 5: Community & Church Integration'
                : newProgress >= 50
                ? 'Phase 4: Starter-Kit Asset Deployment'
                : 'Phase 3: Practical Skills & Discipleship',
          };
        }
        return c;
      })
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase(prev => prev ? {
        ...prev,
        progressPercent: Math.min(100, prev.progressPercent + 15),
        counselingSessionsCompleted: prev.counselingSessionsCompleted + 1,
      } : null);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const matchesSearch =
      b.code.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
      b.district.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
      b.subCounty.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
      b.starterKitType.toLowerCase().includes(beneficiarySearch.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const unreadMessagesCount = messages.filter(m => m.status === 'New').length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-16">
      {/* Top Operations Management Bar */}
      <div className="bg-[#0D281A] text-white px-4 sm:px-8 py-3 border-b border-emerald-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
            alt="Organization Logo"
            referrerPolicy="no-referrer"
            className="h-11 w-auto object-contain bg-white/95 rounded-xl p-1 shadow-xs"
          />
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              IFHCFI Executive Administration &amp; Operations Portal
            </div>
            <div className="text-sm font-bold font-serif text-stone-100">
              National Command Center · Wakiso District
            </div>
          </div>
        </div>

        {/* Role Switcher & Lock Return to Public */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-stone-400 hidden sm:inline">Active Operating Role:</span>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
            className="bg-emerald-950/80 border border-emerald-700/60 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
          >
            <option>Country Coordinator (Mukaga Titus Joshua)</option>
            <option>Super Administrator</option>
            <option>Agricultural Officer (Kabasomi Lydia / Field Team)</option>
            <option>Training Officer (Anyango Sarah)</option>
            <option>Counselor &amp; Reintegration Officer (Pastor Egolet Peter)</option>
          </select>

          <button
            onClick={onReturnToPublic}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lock &amp; Return to Public Website</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Ribbon */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-2 text-xs font-semibold">
          {/* 1. Overview */}
          <button
            onClick={() => setActiveModule('overview')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'overview'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>01. Dashboard Overview</span>
          </button>

          {/* 2. Programmes */}
          <button
            onClick={() => setActiveModule('programmes')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'programmes'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>02. Programmes Manager</span>
            <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
              {programmes.length}
            </span>
          </button>

          {/* 3. Updates */}
          <button
            onClick={() => setActiveModule('updates')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'updates'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-purple-600" />
            <span>03. Updates &amp; News</span>
            <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
              {updates.length}
            </span>
          </button>

          {/* 4. Gallery */}
          <button
            onClick={() => setActiveModule('gallery')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'gallery'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>04. Media Gallery</span>
            <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
              {gallery.length}
            </span>
          </button>

          {/* 5. Events & Stories */}
          <button
            onClick={() => setActiveModule('events-stories')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'events-stories'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>05. Events &amp; Stories</span>
          </button>

          {/* 6. Messages / Inquiries */}
          <button
            onClick={() => setActiveModule('messages')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'messages'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>06. Contact Inquiries</span>
            {unreadMessagesCount > 0 ? (
              <span className="font-mono bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {unreadMessagesCount}
              </span>
            ) : (
              <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
                {messages.length}
              </span>
            )}
          </button>

          <span className="w-px h-5 bg-stone-300 mx-1 shrink-0" />

          {/* 7. Beneficiaries */}
          <button
            onClick={() => setActiveModule('beneficiaries')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'beneficiaries'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>07. Beneficiaries &amp; Kits</span>
            <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
              {beneficiaries.length}
            </span>
          </button>

          {/* 8. Reintegration */}
          <button
            onClick={() => setActiveModule('reintegration')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'reintegration'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Lock className="w-3 h-3 text-amber-500" />
            <span>08. Prison Reintegration</span>
            <span className="font-mono bg-stone-200/80 text-stone-700 text-[10px] px-1.5 py-0.2 rounded-full">
              {cases.length}
            </span>
          </button>

          {/* 9. Agriculture */}
          <button
            onClick={() => setActiveModule('agriculture')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'agriculture'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>09. Dome Farm Hub</span>
          </button>

          {/* 10. Finance */}
          <button
            onClick={() => setActiveModule('finance')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'finance'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
            <span>10. Phase Accounting</span>
          </button>

          {/* 11. Prisoners Module */}
          <button
            onClick={() => setActiveModule('prisoners')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'prisoners'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>11. Manage Prisoners</span>
          </button>

          {/* 12. Backup */}
          <button
            onClick={() => setActiveModule('backup')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeModule === 'backup'
                ? 'bg-[#164E33] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span>12. Backup &amp; Reset</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {/* Module 1: Dashboard Overview (Includes the 8 cards + activity + operations target metrics) */}
        {activeModule === 'overview' && (
          <div className="space-y-8">
            <AdminDashboardOverview
              programmes={programmes}
              updates={updates}
              gallery={gallery}
              events={events}
              stories={stories}
              messages={messages}
              activities={activities}
              onNavigateModule={(mod) => setActiveModule(mod)}
              onOpenCreateProgramme={() => setActiveModule('programmes')}
              onOpenCreateUpdate={() => setActiveModule('updates')}
              onOpenUploadGallery={() => setActiveModule('gallery')}
              onReturnToPublic={onReturnToPublic}
            />

            {/* Operations Summary Bar (Preserved from existing portal) */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                    Institutional Delivery Verification
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Field Target Commitments &amp; Facility Infrastructure
                  </h3>
                </div>
                <button
                  onClick={onOpenDocModal}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Compliance Portfolio</span>
                </button>
              </div>

              {/* Target Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold uppercase text-[10px]">Youth Apprentices</span>
                    <Users className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-stone-900">1,000+</div>
                  <div className="text-[11px] text-stone-600">Annual trade apprenticeships</div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold uppercase text-[10px]">Starter Kits</span>
                    <Sprout className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#164E33]">300 Kits</div>
                  <div className="text-[11px] text-stone-600">Widows &amp; smallholder families</div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold uppercase text-[10px]">Correctional Facilities</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-stone-900">6 Facilities</div>
                  <div className="text-[11px] text-stone-600">12-Month restorative pipeline</div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold uppercase text-[10px]">Initial Phase Target</span>
                    <DollarSign className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-xl font-serif font-bold text-amber-800">UGX 105,000,000</div>
                  <div className="text-[11px] text-stone-600">Priority civil &amp; dome setup</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Programme Management */}
        {activeModule === 'programmes' && (
          <AdminProgrammeManager
            programmes={programmes}
            onProgrammesUpdated={setProgrammes}
            onPreviewProgrammeOnSite={(progId) => {
              if (onPreviewProgrammeOnSite) {
                onPreviewProgrammeOnSite(progId);
              } else {
                window.location.hash = `programme-${progId}`;
                onReturnToPublic();
              }
            }}
          />
        )}

        {/* Module 3: Website Updates & News */}
        {activeModule === 'updates' && (
          <AdminUpdatesManager
            updates={updates}
            onUpdatesUpdated={setUpdates}
          />
        )}

        {/* Module 4: Media Gallery */}
        {activeModule === 'gallery' && (
          <AdminGalleryManager
            gallery={gallery}
            onGalleryUpdated={setGallery}
          />
        )}

        {/* Module 5: Events & Stories */}
        {activeModule === 'events-stories' && (
          <AdminEventsAndStories
            events={events}
            stories={stories}
            onEventsUpdated={setEvents}
            onStoriesUpdated={setStories}
          />
        )}

        {/* Module 6: Inquiries & Contact Messages */}
        {activeModule === 'messages' && (
          <AdminMessagesManager
            messages={messages}
            onMessagesUpdated={setMessages}
          />
        )}

        {/* Module 7: Beneficiaries & Starter Kits (Preserved) */}
        {activeModule === 'beneficiaries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                  Target Group Protection Framework
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Beneficiary Registry &amp; Asset Distribution
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Privacy-first records: Identification codes used to protect human dignity while tracking starter kit accountability.
                </p>
              </div>

              <button
                onClick={() => setShowAddBeneficiaryModal(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Beneficiary</span>
              </button>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs">
                {['All', 'Vulnerable Family', 'Ex-Prisoner', 'Youth Trainee', 'Widow / Single Mother', 'Rural Church Leader'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                      categoryFilter === cat ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={beneficiarySearch}
                  onChange={(e) => setBeneficiarySearch(e.target.value)}
                  placeholder="Search code, district, sub-county..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>
            </div>

            {/* Beneficiaries Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 font-semibold">Beneficiary Code</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Location</th>
                      <th className="py-3 px-4 font-semibold">Programme</th>
                      <th className="py-3 px-4 font-semibold">Starter Kit Status</th>
                      <th className="py-3 px-4 font-semibold">Discipleship</th>
                      <th className="py-3 px-4 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredBeneficiaries.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">
                          {b.code}
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-800">
                          {b.category}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {b.district} ({b.subCounty})
                        </td>
                        <td className="py-3 px-4 text-stone-600 max-w-xs truncate">
                          {b.programmeName}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleKit(b.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                              b.starterKitDelivered
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                            }`}
                            title="Click to toggle delivered status"
                          >
                            <CheckCircle className={`w-3 h-3 ${b.starterKitDelivered ? 'text-emerald-600' : 'text-amber-500'}`} />
                            <span>{b.starterKitType} · {b.starterKitDelivered ? 'Delivered' : 'Pending Delivery'}</span>
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-700 font-semibold">Enrolled</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-[11px] text-stone-400 font-mono">
                            {b.enrolledDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Module 8: Prison & 12-Month Reintegration (Preserved) */}
        {activeModule === 'reintegration' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-xs uppercase font-semibold text-amber-800 tracking-wider flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confidential Case Management</span>
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  12-Month Post-Release Reintegration Tracker
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Tracking ex-inmates across Kasangati, Buwambo, Nyimbwa, Nakasongola M/W, Masafu, and Sentema facilities.
                </p>
              </div>

              <div className="text-xs text-stone-500 font-mono">
                Counsellor Desk: Pastor Egolet Peter
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Active Cases List */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-semibold uppercase text-stone-500 tracking-wider">
                  Active Reintegration Cases ({cases.length})
                </div>
                {cases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      selectedCase?.id === c.id
                        ? 'bg-white border-[#164E33] ring-1 ring-[#164E33] shadow-xs'
                        : 'bg-white/80 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-stone-900">{c.caseCode}</span>
                      <span className="text-stone-500">{c.prisonFacility}</span>
                    </div>

                    <div className="text-xs font-medium text-stone-800">
                      {c.currentMilestone}
                    </div>

                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#164E33] h-full"
                        style={{ width: `${c.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                      <span>Recidivism Risk: <strong className="text-emerald-700">{c.riskOfRecidivism}</strong></span>
                      <span>Progress: <strong className="text-stone-900 tabular-nums">{c.progressPercent}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Case Deep-Dive */}
              {selectedCase && (
                <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
                    <div>
                      <span className="text-xs font-mono text-stone-400">
                        Confidential Case Record
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">
                        {selectedCase.caseCode}
                      </h3>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Facility of Origin: <strong className="text-stone-800">{selectedCase.prisonFacility}</strong> · Released: {selectedCase.releaseDate}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdvanceMilestone(selectedCase.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
                    >
                      + Log Milestone &amp; Session
                    </button>
                  </div>

                  {/* Milestone Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-stone-700">12-Month Progression Level</span>
                      <span className="text-[#164E33] font-mono tabular-nums">{selectedCase.progressPercent}% Complete</span>
                    </div>
                    <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-[#164E33] h-full transition-all duration-300"
                        style={{ width: `${selectedCase.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      Current Milestone: <span className="text-stone-900">{selectedCase.currentMilestone}</span>
                    </div>
                  </div>

                  {/* Case Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 uppercase font-semibold text-[10px]">
                        Counselling Sessions Completed
                      </span>
                      <div className="text-lg font-serif font-bold text-stone-900">
                        {selectedCase.counselingSessionsCompleted} Sessions
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Assigned to: {selectedCase.counselorAssigned}
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 uppercase font-semibold text-[10px]">
                        Family Reconciliation Status
                      </span>
                      <div className="text-lg font-serif font-bold text-emerald-800">
                        {selectedCase.familyReconciliationStatus}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Next field visit: {selectedCase.nextFollowUpDate}
                      </div>
                    </div>
                  </div>

                  {/* Livelihood Activity */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="font-bold text-[#164E33]">
                      Assigned Sustainable Livelihood Activity:
                    </div>
                    <p className="text-emerald-900">
                      {selectedCase.livelihoodActivity}
                    </p>
                    <p className="text-[11px] text-emerald-700 pt-1">
                      Starter kit assets provided under supervision of Agricultural Officer and local church leader.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Module 9: Dome Farm & Livestock Hub (Preserved) */}
        {activeModule === 'agriculture' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                  Combat Center Production Laboratory
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Dome Farm Nursery &amp; Livestock Stock Hub
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  All-season germination trays, starter-kit distribution batches, and livestock breeding husbandry records.
                </p>
              </div>

              <div className="text-xs text-stone-500 font-mono">
                Agriculturist Roster: Lydia Kabasomi / Josephant Hamala
              </div>
            </div>

            {/* Dome Nursery Seedling Batches */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Dome Farm Unit Nursery Germination Batches
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  All-Season Climate-Resilient Stock
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3 font-semibold">Batch Code</th>
                      <th className="py-2.5 px-3 font-semibold">Crop &amp; Variety</th>
                      <th className="py-2.5 px-3 font-semibold">Seedling Trays</th>
                      <th className="py-2.5 px-3 font-semibold">Germination %</th>
                      <th className="py-2.5 px-3 font-semibold">Target Purpose</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {batches.map((batch) => (
                      <tr key={batch.batchId} className="hover:bg-stone-50/60">
                        <td className="py-3 px-3 font-mono font-bold text-stone-900">{batch.batchId}</td>
                        <td className="py-3 px-3">
                          <strong className="text-stone-900">{batch.cropName}</strong>
                          <span className="text-stone-500 block text-[11px]">{batch.variety}</span>
                        </td>
                        <td className="py-3 px-3 font-mono tabular-nums">{batch.seedlingTrays} trays (~12,000 plants)</td>
                        <td className="py-3 px-3 font-mono font-semibold text-emerald-800 tabular-nums">
                          {batch.germinationRatePercent}%
                        </td>
                        <td className="py-3 px-3 text-stone-600 max-w-xs">{batch.purpose}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                            {batch.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Livestock Husbandry Units */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-700" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Laboratory, Stock &amp; Breeding Farm (Goats, Chickens, Pigs)
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  Breeding &amp; Training Focus
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {livestock.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-stone-200 bg-[#FBF9F5] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-lg text-stone-900">
                        {item.type}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#164E33]">
                        {item.headCount} Head
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 space-y-1">
                      <div><strong>Breed:</strong> {item.breed}</div>
                      <div><strong>Breeding Pairs:</strong> {item.breedingPairs} pairs</div>
                      <div><strong>Purpose:</strong> {item.purpose}</div>
                      <div><strong>Veterinary Check:</strong> {item.lastVeterinaryCheck}</div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 text-[11px] text-emerald-800 font-medium">
                      Status: {item.healthStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module 10: Phase Financial Accounting (Preserved) */}
        {activeModule === 'finance' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-xs uppercase font-semibold text-amber-800 tracking-wider">
                  Transparent Accountability Ledger
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Financial Phasing &amp; Allocation Integrity
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Clear distinction: Multi-year master budget (UGX 11.25B / $3M) vs immediate priority Initial Phase (UGX 105M / $28k).
                </p>
              </div>

              <button
                onClick={onOpenDocModal}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Financial Brief</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs uppercase font-semibold text-stone-500">
                  Initial Phase Target (UGX)
                </span>
                <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  UGX 105,000,000
                </div>
                <div className="text-xs text-stone-500">
                  Wakiso site civil setup, dome frame, tanks &amp; nursery beds
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs uppercase font-semibold text-[#164E33]">
                  Pledges / Mobilization In Progress
                </span>
                <div className="text-2xl font-serif font-bold text-[#164E33] tabular-nums">
                  UGX {fundsRaisedUGX.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500">
                  Individual giving &amp; partner church pledges
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs uppercase font-semibold text-amber-700">
                  Current Funding Gap (UGX)
                </span>
                <div className="text-2xl font-serif font-bold text-amber-800 tabular-nums">
                  UGX {fundingGapUGX.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500">
                  Active grant proposals with development partners
                </div>
              </div>
            </div>

            {/* Phased Setup Allocation Details */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Detailed Initial Phase Setup Schedule (UGX 105,000,000)
              </h3>
              <div className="space-y-3">
                {COMBAT_CENTER_SETUP_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-[#FBF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-stone-900 text-sm">
                        {item.category}
                      </div>
                      <div className="text-stone-600 max-w-xl">{item.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-stone-900 tabular-nums text-sm">
                        UGX {item.costUGX.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {((item.costUGX / initialPhaseTargetUGX) * 100).toFixed(1)}% of phase
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module 11: Manage Prisoners (Preserved) */}
        {activeModule === 'prisoners' && (
          <ManagePrisonersModule onOpenDocModal={onOpenDocModal} />
        )}

        {/* Module 12: Backup & System Reset */}
        {activeModule === 'backup' && (
          <AdminSettingsBackup onRefreshAll={() => {
            setProgrammes(getAdminProgrammes());
            setUpdates(getWebsiteUpdates());
            setGallery(getGalleryImages());
            setEvents(getUpcomingEvents());
            setStories(getSuccessStories());
            setMessages(getContactMessages());
            setActivities(getActivityLog());
          }} />
        )}
      </main>

      {/* Add Beneficiary Modal (Preserved) */}
      {showAddBeneficiaryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Register New Beneficiary
              </h3>
              <button
                onClick={() => setShowAddBeneficiaryModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBeneficiary} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Target Beneficiary Category
                </label>
                <select
                  value={newBenCategory}
                  onChange={(e) => setNewBenCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                >
                  <option>Vulnerable Family</option>
                  <option>Ex-Prisoner</option>
                  <option>Youth Trainee</option>
                  <option>Widow / Single Mother</option>
                  <option>Rural Church Leader</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={newBenDistrict}
                    onChange={(e) => setNewBenDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Sub-County</label>
                  <input
                    type="text"
                    required
                    value={newBenSubCounty}
                    onChange={(e) => setNewBenSubCounty(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Intended Starter Kit Asset
                </label>
                <select
                  value={newBenKit}
                  onChange={(e) => setNewBenKit(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                >
                  <option>Horticulture Seedling Kit</option>
                  <option>Poultry Starter Kit</option>
                  <option>Carpentry Toolset</option>
                  <option>Goat Breeding Pair</option>
                  <option>Tailoring Unit</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Confidential Assessment Notes
                </label>
                <textarea
                  rows={3}
                  value={newBenNotes}
                  onChange={(e) => setNewBenNotes(e.target.value)}
                  placeholder="Intake assessment notes (e.g. number of household dependents, initial garden condition)..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBeneficiaryModal(false)}
                  className="px-4 py-2 font-medium text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
