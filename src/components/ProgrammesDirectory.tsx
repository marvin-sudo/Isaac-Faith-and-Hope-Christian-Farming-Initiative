import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Wrench, 
  Users, 
  HeartHandshake, 
  Cross, 
  ShieldAlert, 
  Sun, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Eye,
  Tag
} from 'lucide-react';
import { getAdminProgrammes, AdminProgramme } from '../data/adminStore';

interface ProgrammesDirectoryProps {
  onSelectProgramme?: (prog: AdminProgramme) => void;
  onOpenDonateModal: () => void;
  onNavigate?: (page: string) => void;
}

export const ProgrammesDirectory: React.FC<ProgrammesDirectoryProps> = ({
  onOpenDonateModal,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProg, setActiveModalProg] = useState<AdminProgramme | null>(null);

  // Load published programmes dynamically from the Admin Store
  const [adminProgrammes, setAdminProgrammes] = useState<AdminProgramme[]>(getAdminProgrammes);

  useEffect(() => {
    const handleUpdate = () => {
      setAdminProgrammes(getAdminProgrammes());
    };
    window.addEventListener('ifhcfi_programmes_updated', handleUpdate);
    return () => window.removeEventListener('ifhcfi_programmes_updated', handleUpdate);
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Programmes' },
    { id: 'agriculture', label: 'Agriculture & Climate' },
    { id: 'vocational', label: 'Vocational & Youth' },
    { id: 'community', label: 'Vulnerable Families' },
    { id: 'justice', label: 'Prison Ministry & Justice' },
    { id: 'spiritual', label: 'Spiritual & Church' },
  ];

  const categoryIcons: Record<string, typeof Sprout> = {
    agriculture: Sprout,
    vocational: Wrench,
    community: Users,
    justice: ShieldAlert,
    spiritual: Cross,
    livelihood: TrendingUp,
  };

  // ACE Hub Flagship Card display check
  const showAceHubCard =
    (selectedFilter === 'all' ||
     selectedFilter === 'agriculture' ||
     selectedFilter === 'vocational' ||
     selectedFilter === 'justice') &&
    (searchQuery === '' ||
     'aid combat empowerment center ace hub transformation agriculture laboratory skills rehabilitation enterprise'.toLowerCase().includes(searchQuery.toLowerCase()) ||
     'integrated rural transformation hub combining agriculture laboratory services'.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filter only Published programmes (excluding the flagship ACE Hub which is rendered uniquely at front)
  const combatProg = adminProgrammes.find(p => p.id === 'combat-center');
  const publishedProgrammes = adminProgrammes.filter(p => p.status === 'Published' && p.id !== 'combat-center');

  const filteredProgrammes = publishedProgrammes.filter((prog) => {
    const catLower = prog.category.toLowerCase();
    const matchesFilter =
      selectedFilter === 'all' ||
      catLower.includes(selectedFilter) ||
      (selectedFilter === 'agriculture' && (catLower.includes('agri') || catLower.includes('farm') || catLower.includes('climate'))) ||
      (selectedFilter === 'vocational' && (catLower.includes('vocat') || catLower.includes('skill') || catLower.includes('youth') || catLower.includes('livelihood'))) ||
      (selectedFilter === 'community' && (catLower.includes('family') || catLower.includes('communit') || catLower.includes('women') || catLower.includes('water'))) ||
      (selectedFilter === 'justice' && (catLower.includes('prison') || catLower.includes('reintegrat') || catLower.includes('justice'))) ||
      (selectedFilter === 'spiritual' && (catLower.includes('spiritual') || catLower.includes('church') || catLower.includes('christian')));

    const matchesSearch =
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prog.targetBeneficiaries && prog.targetBeneficiaries.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesFilter && matchesSearch;
  });

  const handleOpenAceHub = () => {
    if (onNavigate) {
      onNavigate('combat-center');
    } else {
      window.location.hash = 'combat-center';
    }
  };

  const handleOpenProgrammePage = (progId: string) => {
    if (onNavigate) {
      onNavigate(`programme-${progId}`);
    } else {
      window.location.hash = `programme-${progId}`;
    }
  };

  return (
    <section id="programmes" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            03. Core Programme Areas
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Pathways of Sustainable Transformation
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            IFHCFI organizes its operations around documented field initiatives and strategic transformation hubs designed to bring vulnerable individuals and households from emergency dependency to resilient, faith-rooted self-sufficiency.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programmes or beneficiaries..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#164E33] focus:border-[#164E33]"
            />
          </div>
        </div>

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ==================================================
              FLAGSHIP PROGRAMME CARD: AID COMBAT EMPOWERMENT CENTER
              ================================================== */}
          {showAceHubCard && (
            <div className="rounded-2xl border-2 border-emerald-600/40 bg-white hover:border-emerald-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group relative">
              {/* Visual Image Header */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-stone-900">
                <img
                  src={combatProg?.image || "https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg"}
                  alt="AID COMBAT EMPOWERMENT CENTER"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-700/95 backdrop-blur-md text-emerald-100 text-[10px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>INTEGRATED HUB</span>
                  </span>
                </div>

                <span className="absolute top-3 right-3 text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                  FLAGSHIP
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight drop-shadow-xs">
                    AID COMBAT<br />EMPOWERMENT CENTER
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 leading-snug line-clamp-3">
                  An integrated rural transformation hub combining agriculture, laboratory services, skills training, rehabilitation, enterprise development and market access.
                </p>

                {/* Target Beneficiaries as Mini Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                    Agriculture &amp; Lab
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                    Skills &amp; Enterprise
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                    Rehabilitation
                  </span>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={handleOpenAceHub}
                    className="text-[#164E33] font-bold hover:text-[#0D281A] transition-colors flex items-center gap-1.5 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs"
                  >
                    <span>Explore Programme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-stone-400 text-[10px] font-medium font-mono">
                    Wakiso · Nakasongola · Busia
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Catalog of Published Programmes */}
          {filteredProgrammes.map((prog, index) => {
            const Icon = categoryIcons[prog.category.toLowerCase()] || Sprout;
            return (
              <div
                key={prog.id}
                className="rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Image Header */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-stone-900">
                  <img
                    src={prog.image || '/src/assets/images/hero_ugandan_farming_1790193085963.jpg'}
                    alt={prog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xs">
                      <Icon className="w-3 h-3 text-emerald-400" />
                      <span>{prog.category}</span>
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 text-[11px] font-mono font-semibold text-white/80 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
                    #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-tight drop-shadow-xs line-clamp-1">
                      {prog.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-stone-600 leading-snug line-clamp-2">
                    {prog.summary}
                  </p>

                  {/* Target Beneficiaries as Mini Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prog.targetBeneficiaries.slice(0, 3).map((target, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium"
                      >
                        {target}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom CTA: Direct link to dedicated automatic programme page */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleOpenProgrammePage(prog.id)}
                      className="text-[#164E33] font-bold hover:text-[#0D281A] transition-colors flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200"
                    >
                      <span>Explore Programme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveModalProg(prog)}
                      className="text-stone-400 hover:text-stone-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                      title="Quick summary modal"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Summary</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProgrammes.length === 0 && !showAceHubCard && (
          <div className="py-12 text-center text-stone-500 text-sm bg-stone-50 rounded-xl border border-stone-200">
            No programmes found matching "{searchQuery}". Clear your search or filter.
          </div>
        )}

        {/* Modal for Quick Summary View */}
        {activeModalProg && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-stone-200 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#164E33] tracking-wider">
                    Programme Profile
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    {activeModalProg.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProg(null)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {activeModalProg.image && (
                <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
                  <img
                    src={activeModalProg.image}
                    alt={activeModalProg.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                    {activeModalProg.category}
                  </span>
                </div>
              )}

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div>
                  <div className="font-semibold text-stone-900 uppercase text-xs tracking-wider mb-1">
                    Intervention Summary
                  </div>
                  <p className="leading-relaxed text-stone-600">
                    {activeModalProg.summary}
                  </p>
                </div>

                {activeModalProg.keyActivities && activeModalProg.keyActivities.length > 0 && (
                  <div>
                    <div className="font-semibold text-stone-900 uppercase text-xs tracking-wider mb-1">
                      Key Practical Activities
                    </div>
                    <div className="space-y-1.5">
                      {activeModalProg.keyActivities.map((act, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalProg.developmentLink && (
                  <div>
                    <div className="font-semibold text-stone-900 uppercase text-xs tracking-wider mb-1">
                      Contribution to Community Development
                    </div>
                    <p className="leading-relaxed text-stone-600">
                      {activeModalProg.developmentLink}
                    </p>
                  </div>
                )}

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                  <span className="font-semibold text-stone-800">Operational Location:</span>{' '}
                  {activeModalProg.location || 'Wakiso District & Countrywide'}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const id = activeModalProg.id;
                    setActiveModalProg(null);
                    handleOpenProgrammePage(id);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalProg(null)}
                    className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setActiveModalProg(null);
                      onOpenDonateModal();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-yellow-300 hover:bg-yellow-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Partner / Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
