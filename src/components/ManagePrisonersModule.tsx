import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Plus,
  Search,
  FileText,
  Download,
  Edit3,
  Trash2,
  X,
  Check,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  BookOpen,
  Printer,
  Sparkles,
  Camera,
  Layers,
  HeartHandshake
} from 'lucide-react';
import {
  RegisteredPrison,
  PrisonerRecord,
  INITIAL_PRISONS,
  INITIAL_PRISONERS
} from '../data/prisonersData';
import { generatePrisonerPdf } from '../utils/generatePrisonerPdf';

interface ManagePrisonersModuleProps {
  onOpenDocModal?: () => void;
}

const STORAGE_KEY_PRISONS = 'ifhcfi_registered_prisons_v1';
const STORAGE_KEY_PRISONERS = 'ifhcfi_registered_prisoners_v1';

export const ManagePrisonersModule: React.FC<ManagePrisonersModuleProps> = () => {
  // 1. Data State with LocalStorage Persistence
  const [prisons, setPrisons] = useState<RegisteredPrison[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRISONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading prisons from localStorage', e);
    }
    return INITIAL_PRISONS;
  });

  const [prisoners, setPrisoners] = useState<PrisonerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRISONERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading prisoners from localStorage', e);
    }
    return INITIAL_PRISONERS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRISONS, JSON.stringify(prisons));
    } catch (e) {
      console.error('Error saving prisons to localStorage', e);
    }
  }, [prisons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRISONERS, JSON.stringify(prisoners));
    } catch (e) {
      console.error('Error saving prisoners to localStorage', e);
    }
  }, [prisoners]);

  // 2. Navigation View State
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  // Search & Filter State
  const [prisonSearch, setPrisonSearch] = useState<string>('');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [prisonerSearch, setPrisonerSearch] = useState<string>('');
  const [religionFilter, setReligionFilter] = useState<string>('All');
  const [skillFilter, setSkillFilter] = useState<string>('All');

  // Modals State
  const [showRegisterPrisonModal, setShowRegisterPrisonModal] = useState<boolean>(false);
  const [showAddPrisonerModal, setShowAddPrisonerModal] = useState<boolean>(false);
  const [selectedPrisoner, setSelectedPrisoner] = useState<PrisonerRecord | null>(null);
  const [isEditingPrisoner, setIsEditingPrisoner] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<PrisonerRecord | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Form State: Register New Prison
  const [newPrisonName, setNewPrisonName] = useState<string>('');
  const [newPrisonDistrict, setNewPrisonDistrict] = useState<string>('Wakiso District');
  const [newPrisonRegion, setNewPrisonRegion] = useState<string>('Central Uganda');
  const [newPrisonSecurity, setNewPrisonSecurity] = useState<RegisteredPrison['securityLevel']>('Medium Security');
  const [newPrisonCapacity, setNewPrisonCapacity] = useState<number>(350);
  const [newPrisonWarden, setNewPrisonWarden] = useState<string>('');
  const [newPrisonPhone, setNewPrisonPhone] = useState<string>('+256 ');
  const [newPrisonFocus, setNewPrisonFocus] = useState<string>('Vocational Skills, Agro-Ecology, Counseling');
  const [newPrisonNotes, setNewPrisonNotes] = useState<string>('');

  // Form State: Add New Prisoner
  const [newPrisFullName, setNewPrisFullName] = useState<string>('');
  const [newPrisId, setNewPrisId] = useState<string>('');
  const [newPrisFacilityId, setNewPrisFacilityId] = useState<string>('');
  const [newPrisPhotoUrl, setNewPrisPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
  );
  const [newPrisPhone, setNewPrisPhone] = useState<string>('+256 ');
  const [newPrisReligion, setNewPrisReligion] = useState<PrisonerRecord['religion']>('Christian (Born-Again / Pentecostal)');
  const [newPrisReleaseDate, setNewPrisReleaseDate] = useState<string>('2026-12-15');
  const [newPrisEducation, setNewPrisEducation] = useState<string>('Uganda Certificate of Education (UCE)');
  const [newPrisSkillNeeds, setNewPrisSkillNeeds] = useState<string>('Bio-Intensive Horticulture & Vegetable Farming');
  const [newPrisSupportRequired, setNewPrisSupportRequired] = useState<string>('Horticulture Starter Kit, Seedlings, Land Rental Support');
  const [newPrisReentryGoals, setNewPrisReentryGoals] = useState<string>('Establish a high-yield commercial vegetable plot; restore family ties.');
  const [newPrisFamilyContact, setNewPrisFamilyContact] = useState<string>('');
  const [newPrisFamilyPhone, setNewPrisFamilyPhone] = useState<string>('+256 ');
  const [newPrisOfficer, setNewPrisOfficer] = useState<string>('Pastor Egolet Peter');
  const [newPrisStage, setNewPrisStage] = useState<PrisonerRecord['reentryStage']>('Pre-Release Preparation');
  const [newPrisDiscipleship, setNewPrisDiscipleship] = useState<boolean>(true);
  const [newPrisNotes, setNewPrisNotes] = useState<string>('');

  // Helper: Selected Facility Object
  const selectedFacility = prisons.find((p) => p.id === selectedFacilityId);

  // Helper: Count Prisoners per Facility
  const getPrisonerCount = (facilityId: string) => {
    return prisoners.filter((p) => p.facilityId === facilityId).length;
  };

  // Helper: Calculate Days Remaining to Release
  const getReleaseCountdown = (dateString: string) => {
    const target = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Released / Post-Discharge';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days remaining`;
  };

  // Helper: Format Date for Display
  const formatDisplayDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Handlers: Register Prison
  const handleRegisterPrison = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrisonName.trim()) return;

    const newId = `prison-${Date.now()}`;
    const newFacility: RegisteredPrison = {
      id: newId,
      name: newPrisonName.trim(),
      district: newPrisonDistrict.trim(),
      region: newPrisonRegion.trim(),
      securityLevel: newPrisonSecurity,
      capacity: Number(newPrisonCapacity) || 300,
      wardenName: newPrisonWarden.trim() || 'Welfare & Corrections Command',
      contactPhone: newPrisonPhone.trim() || '+256 414 000 000',
      ministryFocus: newPrisonFocus
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      reintegrationPipeline: '12-Month Post-Release Support Pipeline',
      notes: newPrisonNotes.trim() || 'Accredited correctional facility in the IFHCFI justice partnership.',
      establishedYear: new Date().getFullYear(),
    };

    setPrisons([newFacility, ...prisons]);
    setShowRegisterPrisonModal(false);
    // Reset form
    setNewPrisonName('');
    setNewPrisonWarden('');
    setNewPrisonNotes('');
    triggerToast(`Successfully registered ${newFacility.name} into the system.`);
  };

  // Handlers: Add New Prisoner
  const handleOpenAddPrisoner = (preselectedFacilityId?: string) => {
    const targetFacility = preselectedFacilityId || selectedFacilityId || prisons[0]?.id || '';
    setNewPrisFacilityId(targetFacility);
    const prefix = targetFacility.replace('prison-', '').substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    setNewPrisId(`PR-${prefix}-2026-${randomNum}`);
    setShowAddPrisonerModal(true);
  };

  const handleAddPrisoner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrisFullName.trim()) return;

    const facility = prisons.find((p) => p.id === newPrisFacilityId) || prisons[0];
    const newRecord: PrisonerRecord = {
      id: `prs-${Date.now()}`,
      prisonerId: newPrisId.trim() || `PR-UG-${Date.now().toString().slice(-4)}`,
      facilityId: facility.id,
      facilityName: facility.name,
      fullName: newPrisFullName.trim(),
      photoUrl: newPrisPhotoUrl.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
      phoneNumber: newPrisPhone.trim() || '+256 700 000 000',
      religion: newPrisReligion,
      dateOfRelease: newPrisReleaseDate || '2026-12-31',
      education: newPrisEducation.trim() || 'Uganda Certificate of Education (UCE)',
      programSkillNeeds: newPrisSkillNeeds.trim(),
      supportRequired: newPrisSupportRequired.trim(),
      reentryGoals: newPrisReentryGoals.trim(),
      familyContactName: newPrisFamilyContact.trim(),
      familyContactPhone: newPrisFamilyPhone.trim(),
      discipleshipEnrolled: newPrisDiscipleship,
      assignedOfficer: newPrisOfficer.trim() || 'Pastor Egolet Peter',
      reentryStage: newPrisStage,
      intakeDate: new Date().toISOString().split('T')[0],
      confidentialNotes: newPrisNotes.trim() || 'Enrolled into 12-Month restorative justice pipeline.',
    };

    setPrisoners([newRecord, ...prisoners]);
    setShowAddPrisonerModal(false);
    // Reset form
    setNewPrisFullName('');
    setNewPrisNotes('');
    triggerToast(`Added ${newRecord.fullName} (${newRecord.prisonerId}) to ${facility.name}.`);
  };

  // Handlers: Open Detail Modal
  const handleOpenDetailModal = (prisoner: PrisonerRecord) => {
    setSelectedPrisoner(prisoner);
    setEditForm({ ...prisoner });
    setIsEditingPrisoner(false);
    setShowDeleteConfirm(false);
  };

  // Handlers: Save Edited Prisoner
  const handleSavePrisonerEdit = () => {
    if (!editForm) return;

    const updatedList = prisoners.map((p) => (p.id === editForm.id ? editForm : p));
    setPrisoners(updatedList);
    setSelectedPrisoner(editForm);
    setIsEditingPrisoner(false);
    triggerToast(`Updated profile for ${editForm.fullName}.`);
  };

  // Handlers: Delete Prisoner
  const handleDeletePrisoner = () => {
    if (!selectedPrisoner) return;

    const name = selectedPrisoner.fullName;
    const updatedList = prisoners.filter((p) => p.id !== selectedPrisoner.id);
    setPrisoners(updatedList);
    setSelectedPrisoner(null);
    setShowDeleteConfirm(false);
    setIsEditingPrisoner(false);
    triggerToast(`Removed ${name}'s record from the system.`);
  };

  // Handlers: Download PDF
  const handleDownloadPdf = (prisoner: PrisonerRecord) => {
    const fac = prisons.find((p) => p.id === prisoner.facilityId);
    try {
      generatePrisonerPdf(prisoner, fac);
      triggerToast(`Downloaded official PDF Dossier for ${prisoner.fullName}`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    }
  };

  // Filtered Prisons List
  const filteredPrisons = prisons.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(prisonSearch.toLowerCase()) ||
      p.district.toLowerCase().includes(prisonSearch.toLowerCase()) ||
      p.wardenName.toLowerCase().includes(prisonSearch.toLowerCase()) ||
      p.ministryFocus.some((m) => m.toLowerCase().includes(prisonSearch.toLowerCase()));

    const matchesDistrict = districtFilter === 'All' || p.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  // Filtered Prisoners List for Active Facility
  const facilityPrisoners = prisoners.filter((p) => {
    if (selectedFacilityId && p.facilityId !== selectedFacilityId) {
      return false;
    }

    const matchesSearch =
      p.fullName.toLowerCase().includes(prisonerSearch.toLowerCase()) ||
      p.prisonerId.toLowerCase().includes(prisonerSearch.toLowerCase()) ||
      p.phoneNumber.toLowerCase().includes(prisonerSearch.toLowerCase()) ||
      p.programSkillNeeds.toLowerCase().includes(prisonerSearch.toLowerCase()) ||
      p.education.toLowerCase().includes(prisonerSearch.toLowerCase());

    const matchesReligion = religionFilter === 'All' || p.religion === religionFilter;
    const matchesSkill =
      skillFilter === 'All' ||
      p.programSkillNeeds.toLowerCase().includes(skillFilter.toLowerCase());

    return matchesSearch && matchesReligion && matchesSkill;
  });

  // Distinct Districts for Filter
  const districtOptions = ['All', ...Array.from(new Set(prisons.map((p) => p.district)))];

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#164E33] text-white px-4 py-3 rounded-xl shadow-xl border border-emerald-400/40 flex items-center gap-3 animate-fade-in text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW 1: REGISTERED PRISONS LIST (When no facility selected) */}
      {!selectedFacilityId ? (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                  Uganda Correctional Justice Ministry
                </span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  {prisons.length} Accredited Facilities
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Registered Prisons &amp; Facility Network
              </h2>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl">
                Partner correctional facilities in Uganda participating in the 12-Month Restorative Rehabilitation and Agricultural Apprenticeship Pipeline.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setShowRegisterPrisonModal(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Register Prison</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Partner Facilities
              </div>
              <div className="text-2xl font-serif font-bold text-[#164E33] mt-1">
                {prisons.length}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Wakiso, Luweero, Nakasongola &amp; Busia
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Enrolled Inmates
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {prisoners.length}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                Active in 12-Month pipeline
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Vocational Tracks
              </div>
              <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
                4 Specialized
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Horticulture, Carpentry, Livestock, Tailoring
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Spiritual Discipleship
              </div>
              <div className="text-2xl font-serif font-bold text-[#164E33] mt-1">
                100%
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Voluntary pastoral care &amp; counseling
              </div>
            </div>
          </div>

          {/* Search & District Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs">
              {districtOptions.map((district) => (
                <button
                  key={district}
                  onClick={() => setDistrictFilter(district)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    districtFilter === district
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={prisonSearch}
                onChange={(e) => setPrisonSearch(e.target.value)}
                placeholder="Search facility name, warden, district..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#164E33]"
              />
            </div>
          </div>

          {/* Registered Prisons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrisons.map((facility) => {
              const count = getPrisonerCount(facility.id);
              return (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Facility Header Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#164E33] shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#164E33] transition-colors">
                            {facility.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{facility.district}</span>
                            <span aria-hidden="true">·</span>
                            <span>{facility.region}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-700 border border-stone-200">
                        {facility.securityLevel}
                      </span>
                    </div>

                    {/* Facility Attributes */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                          Enrolled Inmates
                        </span>
                        <span className="font-bold text-stone-900 text-sm">
                          {count} Inmates
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                          Holding Capacity
                        </span>
                        <span className="font-medium text-stone-800">
                          {facility.capacity} beds
                        </span>
                      </div>
                    </div>

                    {/* Warden & Contact */}
                    <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-stone-200/70 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="font-medium text-stone-700">Welfare / Warden:</span>
                        <span className="text-stone-900">{facility.wardenName}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="font-medium text-stone-700">Phone:</span>
                        <span className="font-mono text-emerald-800">{facility.contactPhone}</span>
                      </div>
                    </div>

                    {/* Ministry Focus Tags */}
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block mb-1.5">
                        Rehabilitation Focus:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {facility.ministryFocus.map((focus, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium border border-emerald-100"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Open Facility Roster Button */}
                  <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedFacilityId(facility.id)}
                      className="w-full px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Open Inmates Roster ({count}) &rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPrisons.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-3">
              <Building2 className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
              <div className="font-semibold text-sm text-stone-800">No Correctional Facilities Found</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No registered prisons matched your search query or district filter. Try adjusting your search term.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: PRISONERS CARD GRID FOR SELECTED FACILITY */
        <div className="space-y-6">
          {/* Facility Context Header with Breadcrumb Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <div className="space-y-1">
              <button
                onClick={() => setSelectedFacilityId(null)}
                className="text-xs font-semibold text-[#164E33] hover:underline flex items-center gap-1 cursor-pointer mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Registered Prisons</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                  Facility Roster Command
                </span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  {selectedFacility?.securityLevel}
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {selectedFacility?.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span>Location: {selectedFacility?.district}</span>
                <span aria-hidden="true">·</span>
                <span>Warden: {selectedFacility?.wardenName}</span>
                <span aria-hidden="true">·</span>
                <span>Contact: {selectedFacility?.contactPhone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => handleOpenAddPrisoner(selectedFacilityId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Register Inmate to Facility</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs">
              {['All', 'Horticulture', 'Poultry', 'Carpentry', 'Goats', 'Tailoring', 'Electrical'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSkillFilter(tag)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    skillFilter === tag
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tag === 'All' ? 'All Skills' : tag}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={prisonerSearch}
                onChange={(e) => setPrisonerSearch(e.target.value)}
                placeholder="Search inmate name, ID, phone..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#164E33]"
              />
            </div>
          </div>

          {/* RESPONSIVE GRID OF PRISONER CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {facilityPrisoners.map((prisoner) => {
              const countdown = getReleaseCountdown(prisoner.dateOfRelease);
              return (
                <div
                  key={prisoner.id}
                  onClick={() => handleOpenDetailModal(prisoner)}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group border-hover:border-emerald-600"
                >
                  <div>
                    {/* Card Top: Photo & Identification Badge */}
                    <div className="relative h-44 bg-stone-100 overflow-hidden">
                      <img
                        src={prisoner.photoUrl}
                        alt={prisoner.fullName}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to neutral avatar
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top ID Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[11px] font-bold bg-[#164E33]/90 text-white px-2 py-0.5 rounded shadow-sm border border-emerald-400/30">
                          {prisoner.prisonerId}
                        </span>
                      </div>

                      {/* Countdown Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-medium bg-black/60 text-emerald-300 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                          {countdown}
                        </span>
                      </div>

                      {/* Inmate Name on Photo Scrim */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h4 className="font-serif font-bold text-base leading-tight drop-shadow-sm">
                          {prisoner.fullName}
                        </h4>
                        <div className="text-[11px] text-stone-200 flex items-center gap-1 font-light">
                          <span>{prisoner.facilityName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body: Phone, Religion, Date of Release, Skill Tag */}
                    <div className="p-4 space-y-3">
                      {/* Contact & Religion Row */}
                      <div className="space-y-1.5 text-xs text-stone-600">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>Phone:</span>
                          </span>
                          <span className="font-mono font-medium text-stone-800 text-[11px]">
                            {prisoner.phoneNumber}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-600" />
                            <span>Religion:</span>
                          </span>
                          <span className="font-medium text-stone-800 text-[11px] truncate max-w-[150px]">
                            {prisoner.religion}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-emerald-700" />
                            <span>Release Date:</span>
                          </span>
                          <span className="font-semibold text-emerald-900 text-[11px]">
                            {formatDisplayDate(prisoner.dateOfRelease)}
                          </span>
                        </div>
                      </div>

                      {/* Skill / Program Tag */}
                      <div className="pt-2 border-t border-stone-100">
                        <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block mb-1">
                          Assigned Vocational Skill:
                        </span>
                        <div className="text-xs font-semibold text-[#164E33] bg-emerald-50/80 border border-emerald-200/60 p-2 rounded-lg line-clamp-2">
                          {prisoner.programSkillNeeds}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: View Details Trigger */}
                  <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-[#164E33] transition-colors">
                    <span>View Dossier &amp; Actions</span>
                    <span className="font-bold">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {facilityPrisoners.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-3">
              <Users className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
              <div className="font-semibold text-sm text-stone-800">No Prisoner Records Found</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No inmates currently match this filter in {selectedFacility?.name}. Click below to register an inmate.
              </p>
              <button
                onClick={() => handleOpenAddPrisoner(selectedFacilityId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Register Inmate Now</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: PRISONER DETAIL MODAL (FULL CRUD + PDF) */}
      {selectedPrisoner && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0D281A] text-white px-6 py-4 flex items-center justify-between border-b border-emerald-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400">
                    Restorative Justice Prisoner Profile
                  </div>
                  <div className="text-base font-serif font-bold text-stone-100 flex items-center gap-2">
                    <span>{selectedPrisoner.fullName}</span>
                    <span className="font-mono text-xs text-stone-300 font-normal">
                      ({selectedPrisoner.prisonerId})
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPrisoner(null);
                  setIsEditingPrisoner(false);
                  setShowDeleteConfirm(false);
                }}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-stone-800">
              {/* Delete Confirmation Alert Banner */}
              {showDeleteConfirm && (
                <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-xl space-y-3 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-rose-900">
                        Confirm Permanent Deletion
                      </h4>
                      <p className="text-xs text-rose-700 mt-1">
                        Are you sure you want to remove <strong>{selectedPrisoner.fullName}</strong> ({selectedPrisoner.prisonerId}) from the system? This record and associated reintegration dossier will be permanently deleted from state.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeletePrisoner}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Delete</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW MODE vs EDIT MODE */}
              {!isEditingPrisoner ? (
                /* VIEW MODE */
                <div className="space-y-6">
                  {/* Top Profile Summary Card */}
                  <div className="flex flex-col sm:flex-row gap-5 bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <img
                      src={selectedPrisoner.photoUrl}
                      alt={selectedPrisoner.fullName}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-stone-300 shadow-sm shrink-0 self-center sm:self-start"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces';
                      }}
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#164E33] bg-emerald-100/80 px-2 py-0.5 rounded">
                            {selectedPrisoner.prisonerId}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                            {selectedPrisoner.fullName}
                          </h3>
                        </div>

                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                          {getReleaseCountdown(selectedPrisoner.dateOfRelease)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs pt-1 text-stone-600">
                        <div>
                          <span className="text-stone-400 font-medium">Facility: </span>
                          <span className="font-semibold text-stone-800">{selectedPrisoner.facilityName}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Phone: </span>
                          <span className="font-mono font-semibold text-stone-800">{selectedPrisoner.phoneNumber}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Religion: </span>
                          <span className="font-semibold text-stone-800">{selectedPrisoner.religion}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Release Date: </span>
                          <span className="font-semibold text-emerald-900">{formatDisplayDate(selectedPrisoner.dateOfRelease)}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Education: </span>
                          <span className="font-semibold text-stone-800">{selectedPrisoner.education}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-medium">Pipeline Stage: </span>
                          <span className="font-semibold text-stone-800">{selectedPrisoner.reentryStage}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Fields Grid */}
                  <div className="space-y-4">
                    {/* Program & Skill Needs */}
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#164E33]">
                        1. Program &amp; Skill Development Needs
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedPrisoner.programSkillNeeds}
                      </p>
                    </div>

                    {/* Support Required */}
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#164E33]">
                        2. Post-Release Support Required &amp; Starter Kit
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedPrisoner.supportRequired}
                      </p>
                    </div>

                    {/* Re-entry Goals */}
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#164E33]">
                        3. Long-Term Re-entry &amp; Livelihood Goals
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedPrisoner.reentryGoals}
                      </p>
                    </div>

                    {/* Family Contact & Case Officer Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                        <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
                          Family / Guardian Contact
                        </span>
                        <div className="font-medium text-stone-900">
                          {selectedPrisoner.familyContactName || 'None Listed'}
                        </div>
                        <div className="font-mono text-emerald-800">
                          {selectedPrisoner.familyContactPhone || 'No Phone Registered'}
                        </div>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                        <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
                          Assigned Reintegration Counselor
                        </span>
                        <div className="font-medium text-stone-900">
                          {selectedPrisoner.assignedOfficer}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {selectedPrisoner.discipleshipEnrolled
                            ? 'Enrolled in Christian Discipleship'
                            : 'Pending Discipleship Allocation'}
                        </div>
                      </div>
                    </div>

                    {/* Confidential Notes */}
                    <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
                        Confidential Welfare Assessment &amp; Case Notes
                      </span>
                      <p className="text-stone-700 italic">
                        &ldquo;{selectedPrisoner.confidentialNotes}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* EDIT MODE */
                editForm && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2 text-amber-800 text-xs">
                      <Edit3 className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>
                        Editing Prisoner Record: Modifying fields will save directly to local state.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Prisoner ID Code *
                        </label>
                        <input
                          type="text"
                          value={editForm.prisonerId}
                          onChange={(e) => setEditForm({ ...editForm, prisonerId: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Photo URL
                        </label>
                        <input
                          type="text"
                          value={editForm.photoUrl}
                          onChange={(e) => setEditForm({ ...editForm, photoUrl: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          value={editForm.phoneNumber}
                          onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Religion *
                        </label>
                        <select
                          value={editForm.religion}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              religion: e.target.value as PrisonerRecord['religion']
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        >
                          <option>Christian (Anglican)</option>
                          <option>Christian (Born-Again / Pentecostal)</option>
                          <option>Christian (Catholic)</option>
                          <option>Christian (Seventh-day Adventist)</option>
                          <option>Muslim (Sunni)</option>
                          <option>Other / None</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Date of Release *
                        </label>
                        <input
                          type="date"
                          value={editForm.dateOfRelease}
                          onChange={(e) => setEditForm({ ...editForm, dateOfRelease: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Education Background
                        </label>
                        <input
                          type="text"
                          value={editForm.education}
                          onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Re-entry Pipeline Stage
                        </label>
                        <select
                          value={editForm.reentryStage}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              reentryStage: e.target.value as PrisonerRecord['reentryStage']
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        >
                          <option>Pre-Release Preparation</option>
                          <option>Reception &amp; Family Mediation</option>
                          <option>Vocational Apprenticeship</option>
                          <option>Independent Livelihood Graduation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Program &amp; Skill Development Needs *
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.programSkillNeeds}
                        onChange={(e) => setEditForm({ ...editForm, programSkillNeeds: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Support Required &amp; Starter Kit Allocation *
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.supportRequired}
                        onChange={(e) => setEditForm({ ...editForm, supportRequired: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Long-Term Re-entry &amp; Livelihood Goals *
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.reentryGoals}
                        onChange={(e) => setEditForm({ ...editForm, reentryGoals: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Family Contact / Guardian Name
                        </label>
                        <input
                          type="text"
                          value={editForm.familyContactName || ''}
                          onChange={(e) => setEditForm({ ...editForm, familyContactName: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Family Contact Phone
                        </label>
                        <input
                          type="text"
                          value={editForm.familyContactPhone || ''}
                          onChange={(e) => setEditForm({ ...editForm, familyContactPhone: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Case Officer Notes &amp; Behavior
                      </label>
                      <textarea
                        rows={2}
                        value={editForm.confidentialNotes}
                        onChange={(e) => setEditForm({ ...editForm, confidentialNotes: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* 3 WORKING ACTION BUTTONS INSIDE THE MODAL (CRITICAL REQUIREMENT) */}
            <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {/* 1. Edit Action Button */}
                {!isEditingPrisoner ? (
                  <button
                    onClick={() => setIsEditingPrisoner(true)}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSavePrisonerEdit}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingPrisoner(false);
                        setEditForm({ ...selectedPrisoner });
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* 2. Delete Action Button */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={showDeleteConfirm}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              </div>

              {/* 3. Download PDF Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPdf(selectedPrisoner)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Download PDF Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTER NEW PRISON FACILITY */}
      {showRegisterPrisonModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#164E33] text-white p-5 flex items-center justify-between border-b border-emerald-950 shrink-0">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-serif font-bold text-base">Register Correctional Facility</h3>
                  <p className="text-xs text-stone-200">Add partner prison to national justice pipeline</p>
                </div>
              </div>
              <button
                onClick={() => setShowRegisterPrisonModal(false)}
                className="text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterPrison} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Facility Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kigo Women's Prison"
                  value={newPrisonName}
                  onChange={(e) => setNewPrisonName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPrisonDistrict}
                    onChange={(e) => setNewPrisonDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Region
                  </label>
                  <input
                    type="text"
                    value={newPrisonRegion}
                    onChange={(e) => setNewPrisonRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Classification / Level
                  </label>
                  <select
                    value={newPrisonSecurity}
                    onChange={(e) =>
                      setNewPrisonSecurity(
                        e.target.value as RegisteredPrison['securityLevel']
                      )
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  >
                    <option>Medium Security</option>
                    <option>Maximum Security</option>
                    <option>Open Farm / Low</option>
                    <option>Remand &amp; Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Holding Capacity (Beds)
                  </label>
                  <input
                    type="number"
                    value={newPrisonCapacity}
                    onChange={(e) => setNewPrisonCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Warden / Welfare Lead
                  </label>
                  <input
                    type="text"
                    placeholder="Supt. John Doe"
                    value={newPrisonWarden}
                    onChange={(e) => setNewPrisonWarden(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Official Contact Phone
                  </label>
                  <input
                    type="text"
                    value={newPrisonPhone}
                    onChange={(e) => setNewPrisonPhone(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Rehabilitation / Ministry Focus (Comma separated)
                </label>
                <input
                  type="text"
                  value={newPrisonFocus}
                  onChange={(e) => setNewPrisonFocus(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Facility Notes / Context
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes on facilities, agricultural plots, or training spaces..."
                  value={newPrisonNotes}
                  onChange={(e) => setNewPrisonNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterPrisonModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#164E33] hover:bg-[#0D281A] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Register Facility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW PRISONER TO FACILITY */}
      {showAddPrisonerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#164E33] text-white p-5 flex items-center justify-between border-b border-emerald-950 shrink-0">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-serif font-bold text-base">Register Inmate to Facility</h3>
                  <p className="text-xs text-stone-200">
                    Enroll inmate into 12-Month Justice &amp; Vocational Pipeline
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddPrisonerModal(false)}
                className="text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPrisoner} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Assigned Facility *
                  </label>
                  <select
                    value={newPrisFacilityId}
                    onChange={(e) => setNewPrisFacilityId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  >
                    {prisons.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name} ({fac.district})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Prisoner ID Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPrisId}
                    onChange={(e) => setNewPrisId(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ronald Ssempijja"
                    value={newPrisFullName}
                    onChange={(e) => setNewPrisFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPrisPhone}
                    onChange={(e) => setNewPrisPhone(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Religion *
                  </label>
                  <select
                    value={newPrisReligion}
                    onChange={(e) =>
                      setNewPrisReligion(
                        e.target.value as PrisonerRecord['religion']
                      )
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  >
                    <option>Christian (Born-Again / Pentecostal)</option>
                    <option>Christian (Anglican)</option>
                    <option>Christian (Catholic)</option>
                    <option>Christian (Seventh-day Adventist)</option>
                    <option>Muslim (Sunni)</option>
                    <option>Other / None</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Expected Release Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newPrisReleaseDate}
                    onChange={(e) => setNewPrisReleaseDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={newPrisPhotoUrl}
                  onChange={(e) => setNewPrisPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Educational Background
                </label>
                <input
                  type="text"
                  value={newPrisEducation}
                  onChange={(e) => setNewPrisEducation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Assigned Vocational Skill / Program Need *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bio-Intensive Horticulture & Greenhouse Nursery"
                  value={newPrisSkillNeeds}
                  onChange={(e) => setNewPrisSkillNeeds(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Post-Release Starter Kit &amp; Support Required *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newPrisSupportRequired}
                  onChange={(e) => setNewPrisSupportRequired(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Re-entry &amp; Livelihood Goals *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newPrisReentryGoals}
                  onChange={(e) => setNewPrisReentryGoals(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Family Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sister / Guardian"
                    value={newPrisFamilyContact}
                    onChange={(e) => setNewPrisFamilyContact(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Family Contact Phone
                  </label>
                  <input
                    type="text"
                    value={newPrisFamilyPhone}
                    onChange={(e) => setNewPrisFamilyPhone(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPrisonerModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#164E33] hover:bg-[#0D281A] text-white font-semibold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Inmate Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
