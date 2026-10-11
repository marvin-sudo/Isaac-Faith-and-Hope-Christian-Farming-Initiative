import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Archive,
  Eye,
  ExternalLink,
  Sparkles,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Check,
  X,
  UploadCloud,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AdminProgramme, saveAdminProgrammes, logAdminActivity } from '../../data/adminStore';
import { ProgrammeContentEditor } from './ProgrammeContentEditor';

interface AdminProgrammeManagerProps {
  programmes: AdminProgramme[];
  onProgrammesUpdated: (updated: AdminProgramme[]) => void;
  onPreviewProgrammeOnSite: (progId: string) => void;
  initialCreateOpen?: boolean;
}

const CATEGORY_OPTIONS = [
  'Integrated Hub',
  'Agriculture & Food Security',
  'Vocational Skills & Livelihoods',
  'Youth Empowerment',
  'Vulnerable Family Support',
  'Women\'s Empowerment',
  'Justice & Prison Ministry',
  'Ex-Prisoner Reintegration',
  'Community Clean Water & Sanitation',
  'Christian Spiritual Development',
  'Rural Church & Leadership',
  'Agroforestry & Climate Resilience'
];

const PRESET_IMAGES = [
  'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
  'https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg',
  '/src/assets/images/vocational_skills_training_1790273232078.jpg',
  '/src/assets/images/prison_reintegration_1790277940920.jpg',
  '/src/assets/images/family_starter_kit_1790277954367.jpg',
  '/src/assets/images/clean_water_well_1790277928820.jpg',
  '/src/assets/images/tree_agroforestry_1790277966958.jpg',
  '/src/assets/images/women_village_savings_1790277977734.jpg',
  '/src/assets/images/dome_farm_greenhouse_1790193096683.jpg',
  '/src/assets/images/livestock_husbandry_unit_1790193113014.jpg'
];

export const AdminProgrammeManager: React.FC<AdminProgrammeManagerProps> = ({
  programmes,
  onProgrammesUpdated,
  onPreviewProgrammeOnSite,
  initialCreateOpen = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Form Modal State (Add or Edit)
  const [isFormOpen, setIsFormOpen] = useState(initialCreateOpen);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORY_OPTIONS[0]);
  const [formSummary, setFormSummary] = useState('');
  const [formFullDescription, setFormFullDescription] = useState('');
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0]);
  const [formAdditionalImages, setFormAdditionalImages] = useState<string[]>([]);
  const [formNewAdditionalImage, setFormNewAdditionalImage] = useState('');
  const [formLocation, setFormLocation] = useState('Wakiso District & Rural Centers');
  const [formBeneficiaries, setFormBeneficiaries] = useState('Rural Smallholders, Widows, Youth Trainees');
  const [formActivities, setFormActivities] = useState<string[]>([
    'Practical hands-on training workshops',
    'Demonstration farm plots inspection',
    'Starter-kit input distribution'
  ]);
  const [formNewActivity, setFormNewActivity] = useState('');
  const [formDevelopmentLink, setFormDevelopmentLink] = useState('Builds household self-sufficiency and daily food security.');
  const [formVerifiedScope, setFormVerifiedScope] = useState('Verified field mandate under Uganda NGO Registration INDP0007369NB.');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublishDate, setFormPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Open Form for Adding New Programme
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory(CATEGORY_OPTIONS[1]);
    setFormSummary('');
    setFormFullDescription(`## Programme Overview\n\nExplain the overarching purpose and scope of this programme.\n\n### Core Interventions\n• Practical agro-skills training\n• Diagnostic soil & veterinary testing\n• Starter-kit asset distribution\n\n### Impact Pathway\nDirectly empowers vulnerable rural households with sustainable livelihood assets.`);
    setFormImage(PRESET_IMAGES[0]);
    setFormAdditionalImages([]);
    setFormLocation('Wakiso District & Rural Outreach');
    setFormBeneficiaries('Rural Families, Unemployed Youth, Widows');
    setFormActivities([
      'Practical demonstration workshop',
      'Field officer follow-up visits',
      'Asset deployment and verification'
    ]);
    setFormDevelopmentLink('Builds intergenerational resilience and lifts families out of poverty.');
    setFormVerifiedScope('Approved under IFHCFI countrywide community empowerment mandate.');
    setFormFeatured(false);
    setFormPublishDate(new Date().toISOString().split('T')[0]);
    setFormStatus('Published');
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (prog: AdminProgramme) => {
    setEditingId(prog.id);
    setFormTitle(prog.title);
    setFormCategory(prog.category);
    setFormSummary(prog.summary);
    setFormFullDescription(prog.fullDescription);
    setFormImage(prog.image);
    setFormAdditionalImages(prog.additionalImages || []);
    setFormLocation(prog.location);
    setFormBeneficiaries(prog.targetBeneficiaries.join(', '));
    setFormActivities(prog.keyActivities || []);
    setFormDevelopmentLink(prog.developmentLink);
    setFormVerifiedScope(prog.verifiedScope);
    setFormFeatured(prog.featured);
    setFormPublishDate(prog.publishDate);
    setFormStatus(prog.status);
    setIsFormOpen(true);
  };

  // Save Programme (Draft or Published)
  const handleSaveProgramme = (targetStatus: 'Published' | 'Draft') => {
    if (!formTitle.trim()) {
      alert('Please enter a programme title.');
      return;
    }
    if (!formSummary.trim()) {
      alert('Please provide a short summary description.');
      return;
    }

    const beneficiariesArray = formBeneficiaries
      .split(',')
      .map(b => b.trim())
      .filter(Boolean);

    const now = new Date().toISOString();

    if (editingId) {
      // Update existing
      const updatedList = programmes.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            title: formTitle.trim(),
            category: formCategory,
            summary: formSummary.trim(),
            fullDescription: formFullDescription.trim(),
            image: formImage,
            additionalImages: formAdditionalImages,
            location: formLocation.trim(),
            targetBeneficiaries: beneficiariesArray,
            keyActivities: formActivities,
            developmentLink: formDevelopmentLink.trim(),
            verifiedScope: formVerifiedScope.trim(),
            featured: formFeatured,
            publishDate: formPublishDate,
            status: targetStatus,
            updatedAt: now,
          };
        }
        return p;
      });
      saveAdminProgrammes(updatedList);
      onProgrammesUpdated(updatedList);
      logAdminActivity('Updated Programme Profile', 'programme', formTitle, 'Administrator');
    } else {
      // Create brand new
      const newId = `prog-${Date.now()}`;
      const newRecord: AdminProgramme = {
        id: newId,
        title: formTitle.trim(),
        category: formCategory,
        summary: formSummary.trim(),
        fullDescription: formFullDescription.trim(),
        image: formImage,
        additionalImages: formAdditionalImages,
        location: formLocation.trim(),
        targetBeneficiaries: beneficiariesArray,
        keyActivities: formActivities,
        developmentLink: formDevelopmentLink.trim(),
        verifiedScope: formVerifiedScope.trim(),
        featured: formFeatured,
        publishDate: formPublishDate,
        status: targetStatus,
        createdAt: now,
        updatedAt: now,
        isCustom: true,
      };
      const updatedList = [newRecord, ...programmes];
      saveAdminProgrammes(updatedList);
      onProgrammesUpdated(updatedList);
      logAdminActivity(
        targetStatus === 'Published' ? 'Published New Programme' : 'Created Programme Draft',
        'programme',
        newRecord.title,
        'Administrator'
      );
    }

    setIsFormOpen(false);
  };

  // Toggle Instant Publish / Unpublish
  const handleTogglePublish = (prog: AdminProgramme) => {
    const nextStatus: 'Published' | 'Draft' = prog.status === 'Published' ? 'Draft' : 'Published';
    const updatedList: AdminProgramme[] = programmes.map(p => 
      p.id === prog.id ? { ...p, status: nextStatus, updatedAt: new Date().toISOString() } : p
    );
    saveAdminProgrammes(updatedList);
    onProgrammesUpdated(updatedList);
    logAdminActivity(
      nextStatus === 'Published' ? 'Published Programme' : 'Unpublished Programme to Draft',
      'programme',
      prog.title,
      'Administrator'
    );
  };

  // Archive / Delete
  const handleDeleteProgramme = (id: string) => {
    const target = programmes.find(p => p.id === id);
    const updatedList = programmes.filter(p => p.id !== id);
    saveAdminProgrammes(updatedList);
    onProgrammesUpdated(updatedList);
    setDeleteConfirmId(null);
    if (target) {
      logAdminActivity('Deleted Programme', 'programme', target.title, 'Administrator');
    }
  };

  // Filter programmes
  const filteredProgrammes = programmes.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle local image file upload preview
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#164E33]">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Dynamic Programme Management Suite</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Programmes &amp; Transformation Initiatives
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Create, edit, publish, or archive programmes. Newly published programmes automatically appear on the public website with dedicated full-page routes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#164E33] hover:bg-[#0D281A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Programme</span>
        </button>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programmes by name, category, or district..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 font-medium hidden sm:inline">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          >
            <option value="All">All Statuses ({programmes.length})</option>
            <option value="Published">Published ({programmes.filter(p => p.status === 'Published').length})</option>
            <option value="Draft">Draft ({programmes.filter(p => p.status === 'Draft').length})</option>
            <option value="Archived">Archived ({programmes.filter(p => p.status === 'Archived').length})</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 font-medium hidden sm:inline">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#164E33]"
          >
            <option value="All">All Categories</option>
            {CATEGORY_OPTIONS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Programmes List (Grid View) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Header Image with Badges */}
              <div className="relative h-48 bg-stone-900 overflow-hidden">
                <img
                  src={prog.image || PRESET_IMAGES[0]}
                  alt={prog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border ${
                      prog.status === 'Published'
                        ? 'bg-emerald-700/90 text-white border-emerald-400/40'
                        : prog.status === 'Draft'
                        ? 'bg-amber-600/90 text-white border-amber-300/40'
                        : 'bg-stone-700/90 text-stone-200 border-white/20'
                    }`}
                  >
                    {prog.status}
                  </span>
                  {prog.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-stone-900 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Category Pill Tag */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                  {prog.category}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight line-clamp-1 drop-shadow-xs">
                    {prog.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {prog.summary}
                </p>

                <div className="space-y-1.5 text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{prog.location || 'Wakiso & Rural Districts'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Published: {prog.publishDate}</span>
                  </div>
                </div>

                {/* Target Beneficiaries Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {prog.targetBeneficiaries.slice(0, 3).map((b, bi) => (
                    <span key={bi} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium">
                      {b}
                    </span>
                  ))}
                  {prog.targetBeneficiaries.length > 3 && (
                    <span className="text-[10px] text-stone-400 self-center">
                      +{prog.targetBeneficiaries.length - 3} more
                    </span>
                  )}
                </div>

                {/* Card Management Action Ribbon */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-1 text-xs">
                  {/* Public Preview Button */}
                  <button
                    onClick={() => onPreviewProgrammeOnSite(prog.id)}
                    className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                    title="View dedicated page on public website"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Page</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {/* Instant Publish / Unpublish Toggle */}
                    <button
                      onClick={() => handleTogglePublish(prog)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        prog.status === 'Published'
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                      title={prog.status === 'Published' ? 'Switch to Draft' : 'Publish Immediately'}
                    >
                      {prog.status === 'Published' ? 'Unpublish' : 'Publish'}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEdit(prog)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Edit Programme Profile"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirmId(prog.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Programme"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-100/80 text-stone-900 text-[11px] uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Programme Name</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3">Location</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProgrammes.map((prog) => (
                  <tr key={prog.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={prog.image || PRESET_IMAGES[0]}
                          alt={prog.title}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold">{prog.title}</div>
                          <div className="text-[11px] text-stone-500 font-normal line-clamp-1">{prog.summary}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">{prog.category}</td>
                    <td className="py-3 px-3 text-stone-600">{prog.location}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          prog.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : prog.status === 'Draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {prog.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-stone-500">{prog.publishDate}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onPreviewProgrammeOnSite(prog.id)}
                          className="p-1.5 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleTogglePublish(prog)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md font-medium text-[11px] cursor-pointer"
                        >
                          {prog.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(prog)}
                          className="p-1.5 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prog.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Confirm Programme Deletion
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Are you sure you want to remove this programme from the IFHCFI catalogue? This will immediately remove it from the public directory.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProgramme(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
              >
                Yes, Delete Programme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PROGRAMME FULL BUILDER MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full my-6 p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#164E33]">
                  {editingId ? 'Edit Programme Record' : 'Create New Programme'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                  {editingId ? `Edit: ${formTitle}` : 'Add New Public Programme'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-800 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-5 text-xs">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Programme Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Sustainable Coffee & Agroforestry Initiative"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33]"
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Short Summary Description */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-800 block">
                  Short Description / Summary (for programme cards &amp; overview) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="A concise 1-2 sentence overview of objectives and community beneficiaries..."
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#164E33]"
                />
              </div>

              {/* Featured Image Selector & Presets */}
              <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="font-semibold text-stone-800 block">
                  Featured Image <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0 shadow-xs">
                    <img
                      src={formImage || PRESET_IMAGES[0]}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Enter Image URL (e.g. https://... or /src/assets/...)"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg cursor-pointer flex items-center gap-1.5 font-medium transition-colors">
                        <UploadCloud className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Upload Local Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLocalImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-stone-400">or pick preset:</span>
                      <div className="flex items-center gap-1 overflow-x-auto max-w-xs py-1">
                        {PRESET_IMAGES.slice(0, 5).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Preset ${idx}`}
                            onClick={() => setFormImage(img)}
                            className="w-8 h-8 rounded-md object-cover border cursor-pointer hover:border-emerald-600 shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRAMME CONTENT BUILDER (Rich text editor) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-800 block">
                    Full Description &amp; Content Builder <span className="text-red-500">*</span>
                  </label>
                  <span className="text-stone-400 text-[11px]">
                    Supports Headings, Bullets, Quotes &amp; Photos
                  </span>
                </div>
                <ProgrammeContentEditor
                  value={formFullDescription}
                  onChange={setFormFullDescription}
                  minHeight="260px"
                />
              </div>

              {/* Objectives & Practical Activities */}
              <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="font-semibold text-stone-800 block">
                  Key Practical Activities / Objectives
                </label>
                <div className="space-y-1.5">
                  {formActivities.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-stone-700">{act}</span>
                      <button
                        type="button"
                        onClick={() => setFormActivities(formActivities.filter((_, i) => i !== idx))}
                        className="text-stone-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={formNewActivity}
                    onChange={(e) => setFormNewActivity(e.target.value)}
                    placeholder="Add an activity / objective item..."
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (formNewActivity.trim()) {
                          setFormActivities([...formActivities, formNewActivity.trim()]);
                          setFormNewActivity('');
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formNewActivity.trim()) {
                        setFormActivities([...formActivities, formNewActivity.trim()]);
                        setFormNewActivity('');
                      }
                    }}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Beneficiaries & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Target Beneficiaries (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formBeneficiaries}
                    onChange={(e) => setFormBeneficiaries(e.target.value)}
                    placeholder="e.g. Rural Smallholders, Widows, Youth Trainees"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Operating Location / District
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Wakiso District, Nakasongola & Countrywide"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              {/* Development Contribution & Verified Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Development Contribution Link
                  </label>
                  <input
                    type="text"
                    value={formDevelopmentLink}
                    onChange={(e) => setFormDevelopmentLink(e.target.value)}
                    placeholder="e.g. Boosts household food security and dependable income."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800 block">
                    Verified Operational Scope
                  </label>
                  <input
                    type="text"
                    value={formVerifiedScope}
                    onChange={(e) => setFormVerifiedScope(e.target.value)}
                    placeholder="e.g. Countrywide mandate with primary demonstration in Wakiso."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>
              </div>

              {/* Additional Images (Optional gallery) */}
              <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="font-semibold text-stone-800 block">
                  Additional Field Documentation Images (Optional)
                </label>
                {formAdditionalImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 py-1">
                    {formAdditionalImages.map((img, i) => (
                      <div key={i} className="relative w-16 h-14 rounded-lg overflow-hidden border group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormAdditionalImages(formAdditionalImages.filter((_, idx) => idx !== i))}
                          className="absolute top-0 right-0 bg-black/70 text-white p-0.5 text-[9px] hover:bg-red-600 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formNewAdditionalImage}
                    onChange={(e) => setFormNewAdditionalImage(e.target.value)}
                    placeholder="Paste image URL to append..."
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formNewAdditionalImage.trim()) {
                        setFormAdditionalImages([...formAdditionalImages, formNewAdditionalImage.trim()]);
                        setFormNewAdditionalImage('');
                      }
                    }}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg cursor-pointer"
                  >
                    Add Image
                  </button>
                </div>
              </div>

              {/* Options: Featured Toggle & Publish Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 cursor-pointer"
                  />
                  <span className="font-semibold text-stone-800">
                    Feature on Homepage Spotlight
                  </span>
                </label>

                <div className="flex items-center gap-2 justify-end">
                  <span className="font-semibold text-stone-700">Publish Date:</span>
                  <input
                    type="date"
                    value={formPublishDate}
                    onChange={(e) => setFormPublishDate(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons: Save Draft vs Publish */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveProgramme('Draft')}
                  className="px-5 py-2.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer border border-amber-300"
                >
                  SAVE DRAFT
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProgramme('Published')}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-xl transition-colors cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PUBLISH PROGRAMME</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
