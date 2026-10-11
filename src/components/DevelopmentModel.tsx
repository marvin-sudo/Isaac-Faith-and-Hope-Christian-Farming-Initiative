import React, { useState } from 'react';
import { 
  Sprout, 
  BookOpen, 
  Cross, 
  Users, 
  ShieldAlert, 
  Sparkles, 
  HeartHandshake,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const DevelopmentModel: React.FC = () => {
  const [activePerspective, setActivePerspective] = useState<number>(0);

  const pillars = [
    {
      title: 'Christian Faith & Spiritual Foundation',
      icon: Cross,
      description: 'Rooting personal integrity, hope, and ethical stewardship in Jesus Christ without coercive or aggressive doctrine.',
      color: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      title: 'Sustainable Agriculture & Climate Smart Farming',
      icon: Sprout,
      description: 'Nursery seedling production, soil restoration, drip irrigation, and all-season horticulture in the Dome Farm Unit.',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Vocational Mastery & Practical Skills',
      icon: BookOpen,
      description: 'Carpentry, tailoring, equipment maintenance, and small business financial management for direct livelihood creation.',
      color: 'text-blue-800 bg-blue-50 border-blue-200',
    },
    {
      title: 'Prison Ministry & 12-Month Reintegration',
      icon: ShieldAlert,
      description: 'Active ministry across 6 partner prison facilities followed by structured 12-month post-release reintegration and counselling.',
      color: 'text-stone-800 bg-stone-100 border-stone-200',
    },
    {
      title: 'Family & Vulnerable Women Support',
      icon: HeartHandshake,
      description: 'Sustainable farming starter kits for 300+ vulnerable families, widows, and single mothers living in rural poverty.',
      color: 'text-rose-800 bg-rose-50 border-rose-200',
    },
    {
      title: 'Rural Church & Community Uplift',
      icon: Users,
      description: 'Strengthening 500+ rural churches to act as local community anchors of fellowship, welfare, and mutual aid.',
      color: 'text-purple-800 bg-purple-50 border-purple-200',
    },
  ];

  const comparisons = [
    {
      narrowLabel: 'Not Merely a Church',
      holisticLabel: 'A Faith-Rooted Development Initiative',
      detail: 'While grounded in Christian faith and discipleship, IFHCFI provides rigorous technical vocational training, agricultural infrastructure, and tangible economic livelihood assets.',
    },
    {
      narrowLabel: 'Not Merely a Commercial Farm',
      holisticLabel: 'A Community Demonstration & Training Incubator',
      detail: 'Our agriculture is not run for commercial corporate profit, but as an open demonstration laboratory and seedling nursery to equip vulnerable families and youth.',
    },
    {
      narrowLabel: 'Not Merely a Short-Term Charity Handout',
      holisticLabel: 'Long-Term Dignity & Self-Sufficiency',
      detail: 'Rather than breeding aid dependency, we provide the skills, tools, seedlings, and mentorship for individuals and households to become self-reliant breadwinners.',
    },
    {
      narrowLabel: 'Not Just an In-Prison Preaching Group',
      holisticLabel: 'A 12-Month Post-Release Reintegration Partner',
      detail: 'True rehabilitation extends beyond prison walls. We walk alongside former inmates through 12 months of reconciliation, counselling, starter-kit assets, and community integration.',
    },
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            01. Organisational Purpose &amp; Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            The Holistic Empowerment Model: Beyond Fragmented Aid
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Poverty, recidivism, and youth unemployment cannot be resolved through isolated interventions. IFHCFI operates through a multi-dimensional development framework uniting faith, practical skills, climate-smart agriculture, and family restoration.
          </p>
        </div>

        {/* 6 Integrated Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-stone-200 bg-[#FBF9F5] hover:border-stone-300 transition-colors space-y-3"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${pillar.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-stone-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clarity of Identity: Comparison Matrix */}
        <div className="bg-[#F5F1E8] rounded-2xl p-6 sm:p-8 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-300/80">
            <div>
              <div className="text-xs uppercase font-semibold text-stone-500 tracking-wider">
                Identity Distinction
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Understanding IFHCFI's Unique Mandate
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-lg border border-stone-200 text-xs">
              {comparisons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePerspective(idx)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activePerspective === idx
                      ? 'bg-[#164E33] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Perspective 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Narrow Definition */}
            <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-semibold text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>What IFHCFI is NOT limited to:</span>
              </div>
              <div className="font-serif text-lg font-bold text-stone-800">
                {comparisons[activePerspective].narrowLabel}
              </div>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed pt-1">
                Viewing the initiative through a single lens misinterprets our mandate. Single-sector interventions frequently fail in rural communities due to interconnected challenges.
              </p>
            </div>

            {/* True Holistic Scope */}
            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-[#164E33] font-semibold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>The True IFHCFI Mandate:</span>
              </div>
              <div className="font-serif text-lg font-bold text-[#0D281A]">
                {comparisons[activePerspective].holisticLabel}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                {comparisons[activePerspective].detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
