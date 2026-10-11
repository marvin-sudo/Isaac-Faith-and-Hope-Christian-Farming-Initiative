import React from 'react';
import { ShieldCheck, UserCheck, Info } from 'lucide-react';
import { OFFICIAL_LEADERSHIP, OFFICIAL_REGISTRATION } from '../data/organizationData';

export const LeadershipGovernance: React.FC = () => {
  return (
    <section id="leadership" className="py-16 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            06. Organizational Governance &amp; Roster
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Official Organisational Leadership
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            The operational leadership of the Isaac Faith and Hope Christian Farming Initiative comprises dedicated Ugandan ministers, educators, agricultural specialists, and board governance stewards.
          </p>
        </div>

        {/* Fact Base Verification Callout */}
        <div className="mb-10 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3 text-xs text-stone-600">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-stone-900">Official Roster Compliance:</strong>{' '}
            Names and designations shown reflect the official personnel documentation submitted under Registration Certificate{' '}
            <span className="font-mono text-stone-800 font-semibold">{OFFICIAL_REGISTRATION.registrationFileNo}</span> and Operating Permit{' '}
            <span className="font-mono text-stone-800 font-semibold">{OFFICIAL_REGISTRATION.permitNo}</span>.
          </div>
        </div>

        {/* Roster Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_LEADERSHIP.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Official Portrait */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-stone-100 border-2 border-emerald-900/10 shrink-0 shadow-2xs group-hover:border-emerald-600/30 transition-colors">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
                      <UserCheck className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="font-mono text-[10px] text-stone-400 block">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-800">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{member.status}</span>
                </span>
                <span className="text-[10px] text-stone-400 font-sans">
                  IFHCFI Roster
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
