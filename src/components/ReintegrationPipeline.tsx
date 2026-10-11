import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Heart, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { PARTNER_PRISONS, REINTEGRATION_PIPELINE_STEPS } from '../data/organizationData';

interface ReintegrationPipelineProps {
  onOpenDonateModal: () => void;
}

export const ReintegrationPipeline: React.FC<ReintegrationPipelineProps> = ({
  onOpenDonateModal,
}) => {
  const [selectedPrisonIndex, setSelectedPrisonIndex] = useState<number>(0);
  const activePrison = PARTNER_PRISONS[selectedPrisonIndex];

  return (
    <section id="reintegration" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            05. Justice Ministry &amp; Restoration
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            The 12-Month Post-Release Reintegration Pathway
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Ugandan correctional facilities release thousands of individuals into society who face acute social stigma, immediate family alienation, and lack of productive employment. IFHCFI bridges this vulnerable period through an intensive, holistic 12-month accompaniment model.
          </p>
        </div>

        {/* Confidentiality Commitment Banner */}
        <div className="mb-10 p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-start sm:items-center gap-3 text-xs text-stone-700">
          <Lock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong className="font-semibold text-stone-900">Beneficiary Protection &amp; Confidentiality Protocol:</strong>{' '}
            To protect human dignity and community reconciliation, IFHCFI adheres to strict data privacy principles. Individual case details, trauma counselling records, and names of ex-offenders are never made public.
          </div>
        </div>

        {/* The 6 Phased Milestone Steps */}
        <div className="mb-16">
          <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider mb-6">
            Chronological 12-Month Progression
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REINTEGRATION_PIPELINE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-stone-200 bg-[#FBF9F5] hover:border-stone-300 transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#164E33] font-mono">
                      {step.timeframe}
                    </span>
                    <span className="text-stone-400 font-mono">Step 0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                    {step.stage}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{step.focusArea}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Prisons Interactive Network */}
        <div className="bg-[#F5F1E8] rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-300/80">
            <div>
              <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider">
                Partner Correctional Facilities Network
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Documented Partner Prison Stations
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold text-stone-800">6 Partner Facilities</span>
              <span aria-hidden="true">·</span>
              <span>Central &amp; Eastern Uganda</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Prison Facility Selector Buttons */}
            <div className="lg:col-span-4 space-y-2">
              {PARTNER_PRISONS.map((prison, idx) => (
                <button
                  key={prison.name}
                  onClick={() => setSelectedPrisonIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedPrisonIndex === idx
                      ? 'bg-white border-[#164E33] shadow-xs ring-1 ring-[#164E33]'
                      : 'bg-white/60 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-serif font-semibold text-sm text-stone-900">
                      {prison.name}
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{prison.district}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-stone-400">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Selected Prison Detail Card */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-xs font-semibold text-[#164E33] uppercase tracking-wider">
                    {activePrison.district}
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                    {activePrison.name}
                  </h4>
                </div>
                <span className="text-xs bg-emerald-50 border border-emerald-200 text-[#164E33] font-semibold px-2.5 py-1 rounded-md self-start sm:self-auto">
                  Active Partnership Scope
                </span>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider mb-2">
                  Documented Ministry &amp; Training Focus
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePrison.ministryFocus.map((focus, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-800 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider mb-1">
                  Post-Release Follow-Up Integration
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Upon completion of sentence at {activePrison.name}, eligible candidates transition to the Combat Center's Store &amp; Counseling Office for reception, emergency clothing, pastoral counseling, and starter asset allocation.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">
                  Framework: {activePrison.reintegrationFollowUp}
                </span>
                <button
                  onClick={onOpenDonateModal}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors cursor-pointer"
                >
                  Sponsor Bibles &amp; Reintegration Kits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
