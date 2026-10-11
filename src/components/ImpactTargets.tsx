import React from 'react';
import { 
  Users, 
  Sprout, 
  Church, 
  ShieldCheck, 
  HelpCircle,
  FileCheck2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ANNUAL_TARGETS } from '../data/organizationData';

interface ImpactTargetsProps {
  onExploreReintegration: () => void;
  onOpenDocModal: () => void;
}

export const ImpactTargets: React.FC<ImpactTargetsProps> = ({
  onExploreReintegration,
  onOpenDocModal,
}) => {
  return (
    <section id="impact" className="py-16 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            04. Documented Operational Targets
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Measurable Targets &amp; Accountability Framework
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            In compliance with our commitment to transparency, IFHCFI clearly demarcates planned targets from verified historical outputs. The following figures represent documented annual operational targets.
          </p>
        </div>

        {/* 4 Annual Target Cards with Tabular Numerals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ANNUAL_TARGETS.map((target, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold uppercase tracking-wider text-[#164E33]">
                    {target.category}
                  </span>
                  <span className="font-mono">0{idx + 1}</span>
                </div>
                <div className="text-3xl font-serif font-bold text-stone-900 tabular-nums">
                  {target.target}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {target.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg font-medium">
                <FileCheck2 className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
                <span>{target.verificationStatus}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Target vs Output vs Outcome vs Impact Educational Framework Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="mb-6 pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider">
                Monitoring &amp; Evaluation Standard
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Our 4-Tier Reporting Framework
              </h3>
            </div>
            <button
              onClick={onOpenDocModal}
              className="text-xs font-semibold text-[#164E33] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>View Measurement Protocols</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 1. Target */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                <span className="w-2 h-2 rounded-full bg-stone-600" />
                <span>1. Target</span>
              </div>
              <div className="text-xs font-semibold text-stone-900">
                What IFHCFI intends to achieve
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                e.g., "Aim to provide sustainable farming starter kits to 300+ vulnerable families annually."
              </p>
            </div>

            {/* 2. Output */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>2. Output</span>
              </div>
              <div className="text-xs font-semibold text-stone-900">
                What activities were delivered
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                e.g., Number of seed trays germinated, seedling kits transported, training hours completed.
              </p>
            </div>

            {/* 3. Outcome */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span>3. Outcome</span>
              </div>
              <div className="text-xs font-semibold text-stone-900">
                What changed for beneficiaries
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                e.g., Improved daily household vegetable nutrition, secondary income from surplus crop sales.
              </p>
            </div>

            {/* 4. Impact */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-[#164E33]" />
                <span>4. Impact</span>
              </div>
              <div className="text-xs font-semibold text-stone-900">
                Long-term verifiable transformation
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                e.g., Sustained exit from extreme poverty, zero recidivism among ex-prisoners, autonomous rural churches.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-stone-400" />
              <span>Strict compliance: We never present prospective targets as achieved historical data.</span>
            </div>
            <button
              onClick={onExploreReintegration}
              className="text-[#164E33] font-semibold hover:underline cursor-pointer"
            >
              Explore 12-Month Reintegration Tracking &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
