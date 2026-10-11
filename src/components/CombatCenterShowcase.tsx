import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  Layers, 
  HeartHandshake, 
  Droplet, 
  Coins, 
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import domeImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';
import livestockImg from '../assets/images/livestock_husbandry_unit_1790193113014.jpg';
import { CORE_FACILITIES, FINANCIAL_TARGETS } from '../data/organizationData';
import { COMBAT_CENTER_SETUP_ITEMS } from '../data/operationsData';

interface CombatCenterShowcaseProps {
  onOpenDonateModal: () => void;
  onOpenDocModal: () => void;
}

export const CombatCenterShowcase: React.FC<CombatCenterShowcaseProps> = ({
  onOpenDonateModal,
  onOpenDocModal,
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('dome-farm');
  const [currencyMode, setCurrencyMode] = useState<'UGX' | 'USD'>('UGX');

  const facilityIcons: Record<string, typeof Building2> = {
    'training-hall': Building2,
    'dome-farm': Sprout,
    'stock-breeding-farm': Layers,
    'store-counseling': HeartHandshake,
    'water-sanitation': Droplet,
  };

  const facilityMedia: Record<string, { src: string; caption: string }> = {
    'dome-farm': {
      src: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
      caption: 'Dome Farm Unit · All-season climate-resilient germination nursery incubator',
    },
    'stock-breeding-farm': {
      src: livestockImg,
      caption: 'Livestock Husbandry Unit · Zero-grazing dairy goats & poultry breeding',
    },
    'training-hall': {
      src: '/src/assets/images/vocational_skills_training_1790273232078.jpg',
      caption: 'Main Vocational Hall · Practical technical trades & apprenticeship benches',
    },
    'store-counseling': {
      src: '/src/assets/images/prison_reintegration_1790277940920.jpg',
      caption: 'Store & Counseling Office · Trauma reconciliation & starter-kit distribution',
    },
    'water-sanitation': {
      src: '/src/assets/images/clean_water_well_1790277928820.jpg',
      caption: 'Integrated Water & Sanitation · Deep borehole pump & rainwater harvesting',
    },
  };

  const selectedFacility = CORE_FACILITIES.find(f => f.id === selectedFacilityId) || CORE_FACILITIES[1];
  const activeMedia = facilityMedia[selectedFacility.id];

  return (
    <section id="combat-center" className="py-16 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
              02. Flagship Infrastructure Project
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
              IFHCFI Combat Empowerment Center
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-600 mt-2">
              <span className="font-semibold text-stone-800">Wakiso District, Uganda</span>
              <span aria-hidden="true">·</span>
              <span>Regional Operational Hub</span>
              <span aria-hidden="true">·</span>
              <span>5 Core Integrated Facilities</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDocModal}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Download Center Concept Note</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenDonateModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#164E33] rounded-lg hover:bg-[#0D281A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Sponsor Initial Phase</span>
            </button>
          </div>
        </div>

        {/* Financial Transparency Alert Strip */}
        <div className="mb-10 p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <Coins className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Documented Financial Framework &amp; Phasing
                </h4>
                <p className="text-xs text-stone-500">
                  Strict accounting distinction between projected full costs, initial phase setup, and active fundraising.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs self-start md:self-auto">
              <button
                onClick={() => setCurrencyMode('UGX')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                  currencyMode === 'UGX' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                UGX (Uganda Shillings)
              </button>
              <button
                onClick={() => setCurrencyMode('USD')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                  currencyMode === 'USD' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-1">
              <div className="text-xs text-stone-500 uppercase font-semibold">
                Total Projected Project Cost
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                {currencyMode === 'UGX' ? 'UGX 11,250,000,000' : 'USD $3,000,000'}
              </div>
              <div className="text-[11px] text-stone-500">
                Full 5-facility master infrastructure over multi-year horizon
              </div>
            </div>

            <div className="space-y-1 sm:border-l sm:border-stone-200 sm:pl-6">
              <div className="text-xs text-[#164E33] uppercase font-semibold flex items-center gap-1">
                <span>Immediate Initial Phase Setup</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">Priority</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#164E33] tabular-nums">
                {currencyMode === 'UGX' ? 'UGX 105,000,000' : 'USD $28,000'}
              </div>
              <div className="text-[11px] text-stone-600">
                Land boundary, initial greenhouse dome, water tanks, baseline nursery
              </div>
            </div>

            <div className="space-y-1 sm:border-l sm:border-stone-200 sm:pl-6">
              <div className="text-xs text-amber-700 uppercase font-semibold">
                Current Funding Status
              </div>
              <div className="text-sm font-semibold text-stone-800 pt-1">
                Active Grant Applications &amp; Donor Mobilization
              </div>
              <div className="text-[11px] text-stone-500">
                Zero funds claimed as received until legally confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 5-Facility Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Facility Selector Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-semibold uppercase text-stone-500 tracking-wider mb-2">
              Select Center Facility
            </div>
            {CORE_FACILITIES.map((facility) => {
              const Icon = facilityIcons[facility.id] || Building2;
              const isSelected = facility.id === selectedFacilityId;
              return (
                <button
                  key={facility.id}
                  onClick={() => setSelectedFacilityId(facility.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-[#164E33] shadow-sm ring-1 ring-[#164E33]'
                      : 'bg-stone-50/70 border-stone-200 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-[#164E33] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-base text-stone-900">
                      {facility.name}
                    </div>
                    <div className="text-xs text-stone-500 line-clamp-1">
                      {facility.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Facility Detailed Inspection View */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold text-[#164E33] uppercase tracking-wider">
                  Facility Specification · {selectedFacility.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  {selectedFacility.name}
                </h3>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                Wakiso District Masterplan
              </div>
            </div>

            {/* Visual Media for facility */}
            {activeMedia && (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 group">
                <img
                  src={activeMedia.src}
                  alt={selectedFacility.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                    Wakiso Combat Empowerment Center
                  </div>
                  <div className="text-xs text-stone-200 mt-0.5">
                    {activeMedia.caption}
                  </div>
                </div>
              </div>
            )}

            {/* Purpose & Operational Role */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase font-semibold text-stone-500 tracking-wider">
                  Documented Purpose
                </h4>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed mt-1">
                  {selectedFacility.purpose}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-stone-500 tracking-wider">
                  Operational Role in the Community
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed mt-1">
                  {selectedFacility.operationalRole}
                </p>
              </div>

              {/* Key Components */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-stone-500 tracking-wider mb-2">
                  Core Structural Components
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedFacility.keyComponents.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#164E33] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Initial Phase Setup Budget Breakdown for this facility context */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Initial Phase Setup Budget Allocation (Total Phase: UGX 105,000,000)</span>
              </div>
              <div className="text-xs text-amber-950 leading-relaxed">
                Initial mobilization focuses on boundary fencing, the initial dome greenhouse framework, 20,000L rainwater storage tanks, and starter nursery beds to begin servicing the 300 vulnerable family target immediately.
              </div>
            </div>
          </div>
        </div>

        {/* Initial Phase Setup Cost Schedule Table */}
        <div className="mt-12 bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
            <div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Initial Phase Setup Expenditure Schedule
              </h4>
              <p className="text-xs text-stone-500">
                Target Setup Budget: UGX 105,000,000 (Approx. USD $28,000) · Wakiso District Site
              </p>
            </div>
            <span className="text-xs font-semibold text-[#164E33] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md self-start sm:self-auto">
              Fundraising Underway
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 text-xs uppercase">
                  <th className="py-2.5 font-semibold">Priority Infrastructure Item</th>
                  <th className="py-2.5 font-semibold">Technical Scope</th>
                  <th className="py-2.5 font-semibold text-right">Projected Cost (UGX)</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {COMBAT_CENTER_SETUP_ITEMS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60">
                    <td className="py-3 font-medium text-stone-900">{item.category}</td>
                    <td className="py-3 text-stone-500 max-w-xs">{item.description}</td>
                    <td className="py-3 text-right font-mono tabular-nums font-semibold text-stone-800">
                      UGX {item.costUGX.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-stone-600 text-xs">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="font-bold border-t-2 border-stone-300 text-stone-900 bg-stone-50/50">
                  <td className="py-3 text-sm" colSpan={2}>
                    Total Documented Initial Phase Requirement
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-sm text-[#164E33]">
                    UGX 105,000,000
                  </td>
                  <td className="py-3 text-right text-xs text-stone-500">
                    ~USD $28,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
