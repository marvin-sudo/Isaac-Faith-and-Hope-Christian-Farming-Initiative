import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  BookOpen, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { PARTNER_PRISONS } from '../data/organizationData';
import prisonImg from '../assets/images/prison_reintegration_1790277940920.jpg';

interface PrisonMinistrySectionProps {
  onNavigate?: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const PrisonMinistrySection: React.FC<PrisonMinistrySectionProps> = ({ 
  onNavigate,
  onOpenDocModal 
}) => {
  const [selectedPrisonName, setSelectedPrisonName] = useState<string>(PARTNER_PRISONS[0].name);
  const activePrison = PARTNER_PRISONS.find(p => p.name === selectedPrisonName) || PARTNER_PRISONS[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#07190F] text-white border-b border-emerald-950 relative overflow-hidden">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Restorative Justice &amp; Discipleship</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Prison Ministry, Rehabilitation &amp; Reintegration
          </h2>

          <div className="pt-1">
            <blockquote className="text-lg sm:text-xl font-serif italic text-yellow-300">
              &ldquo;Our relationship with a person does not end at the prison gate.&rdquo;
            </blockquote>
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            We journey with incarcerated men and women from their earliest prison days through spiritual discipleship, emotional rehabilitation, and practical agro-skills—continuing with an intentional 12-month post-release reintegration runway.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Photo (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-stone-950 overflow-hidden">
              <img
                src={prisonImg}
                alt="Ugandan inmates and reformed citizens engaged in restorative discipleship and skills training"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[11px] font-mono font-bold uppercase text-yellow-400">
                  Documented Justice Focus
                </div>
                <div className="text-base sm:text-lg font-serif font-bold">
                  Restorative Counseling &amp; Pre-Release Transition
                </div>
              </div>
            </div>

            {/* Core Programme Pillars (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                An Integrated Continuum of Care
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Gospel &amp; Spiritual Formation</span>
                  </div>
                  <p className="text-stone-300 text-xs">
                    Bible distribution in native languages, weekly prison church fellowships, and moral discipleship.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Trauma &amp; Reconciliation</span>
                  </div>
                  <p className="text-stone-300 text-xs">
                    Pastoral counseling, restorative dialogue with offended families, and preparation for community acceptance.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>Apprenticeship &amp; Trades</span>
                  </div>
                  <p className="text-stone-300 text-xs">
                    Bio-intensive farming, carpentry, tailoring, and micro-livestock brooding inside training modules.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>12-Month Post-Release Follow-Up</span>
                  </div>
                  <p className="text-stone-300 text-xs">
                    Monthly field check-ins, starter-kit asset oversight, and community accountability to prevent recidivism.
                  </p>
                </div>
              </div>

              {/* Responsible Transparency Disclaimer */}
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-stone-300">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-emerald-200">Programme Target Information: </strong>
                  The facilities below represent partner and target prison ministry locations identified in the organisation’s approved programme documentation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Prison Facilities Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400">
                Operational Reach
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Partner &amp; Target Prison Ministry Locations
              </h3>
            </div>

            <div className="text-xs text-stone-400">
              Select any facility to inspect documented activities
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_PRISONS.map((prison) => {
              const isSelected = prison.name === selectedPrisonName;

              return (
                <div
                  key={prison.name}
                  onClick={() => setSelectedPrisonName(prison.name)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-900/60 border-emerald-400 shadow-lg ring-2 ring-emerald-400/30'
                      : 'bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-white/8'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/40 text-emerald-300 border border-emerald-500/30">
                        {prison.district}
                      </span>
                      <Building2 className={`w-4 h-4 ${isSelected ? 'text-yellow-300' : 'text-stone-400'}`} />
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white">
                      {prison.name}
                    </h4>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                        Documented Ministry Focus:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {prison.ministryFocus.map((focus, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-stone-200"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                    <span className="font-mono text-[11px] text-emerald-300">
                      {prison.reintegrationFollowUp}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-yellow-300 translate-x-1' : 'text-stone-400'} transition-transform`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Prison Deep-Dive Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0C2417] border border-emerald-600/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-yellow-300 font-bold uppercase tracking-wider">
              Active Focus Facility: {activePrison.name} ({activePrison.district})
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Volunteers conduct pastoral discipleship, provide life skills coaching, and begin pre-release family mediation so returning citizens are met with hope rather than isolation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('reintegration')}
              className="px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Explore 12-Month Pipeline
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('get-involved')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors cursor-pointer"
            >
              Volunteer in Prison Ministry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
