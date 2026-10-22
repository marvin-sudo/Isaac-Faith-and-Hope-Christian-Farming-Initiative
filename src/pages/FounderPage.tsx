import React from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Award, 
  MapPin, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  BookOpen, 
  Quote
} from 'lucide-react';
import { OFFICIAL_LEADERSHIP } from '../data/organizationData';
import vocationalImg from '../assets/images/vocational_skills_training_1790273232078.jpg';

interface FounderPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({ onNavigate, onOpenDocModal }) => {
  const founder = OFFICIAL_LEADERSHIP[0]; // Mukaga Titus Joshua

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
        {/* Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={vocationalImg} 
            alt="Youth skills training and empowerment in Uganda" 
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
          <div className="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-white font-semibold">About the Founder</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>Servant Leadership &amp; Ministry Stewardship</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              About the Founder: Mukaga Titus Joshua
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Discover the divine calling, life journey, and vision of Mukaga Titus Joshua, Founder and Country Coordinator of Isaac Faith &amp; Hope Christian Farming Initiative.
            </p>
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Founder In-Depth Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Photo & Key Credentials */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-stone-900 aspect-3/4 max-h-[460px]">
                <img
                  src="https://www.image2url.com/r2/default/images/1787083335187-812b61ee-6fd4-486e-b8e0-f9d374ef19fb.png"
                  alt="Mukaga Titus Joshua"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="text-xl font-serif font-bold leading-tight">
                    Mukaga Titus Joshua
                  </div>
                  <div className="text-xs text-yellow-300 font-medium">
                    Founder &amp; Country Coordinator · IFHCFI
                  </div>
                  <div className="text-[11px] text-stone-300 font-mono flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>NGO Permit: INDP0007369NB</span>
                  </div>
                </div>
              </div>

              {/* Fast Facts Card */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-stone-500 font-medium">Nationality &amp; Base</span>
                  <span className="font-bold text-stone-900">Ugandan · Wakiso District</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-stone-500 font-medium">Core Specialization</span>
                  <span className="font-bold text-stone-900">Agro-Ecology &amp; Pastoral Ministry</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-stone-500 font-medium">Prison Ministry Scope</span>
                  <span className="font-bold text-stone-900">6 Partner Prisons Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Operational Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Active Field Leadership
                  </span>
                </div>
              </div>
            </div>

            {/* Right Story, Calling & Personal Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                  The Founder’s Journey
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  A Burden Turned Into a Generational Movement
                </h2>
              </div>

              {/* Founder's Personal Words Box */}
              <div className="p-5 rounded-2xl bg-[#0D281A] text-white border border-emerald-800 space-y-3 relative">
                <Quote className="w-8 h-8 text-emerald-400/30 absolute top-4 right-4" />
                <p className="font-serif italic text-sm sm:text-base text-emerald-100 leading-relaxed">
                  &ldquo;For years, I watched our rural youth wander without direction, brilliant men and women leaving prison gates only to return to crime because nobody would offer them a seed or an honest apprenticeship, and widows struggling to feed their children on dry lands. God gave me a mandate: combine the healing power of the Gospel of Jesus Christ with practical farming mastery. When people can feed themselves and know their Saviour, dignity is restored forever.&rdquo;
                </p>
                <div className="text-xs font-semibold text-yellow-300">
                  — Mukaga Titus Joshua
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <p>
                  Mukaga Titus Joshua founded Isaac Faith and Hope Christian Farming Initiative with a burning conviction that true charity must equip, not disable. Born and raised with an intimate understanding of Uganda’s agrarian landscape and social challenges, Titus dedicated his life to bridging the chasm between spiritual discipleship and socio-economic self-reliance.
                </p>
                <p>
                  Under his tireless coordination, IFHCFI progressed from humble community prayer circles and small seedling nursery beds in Wakiso into a fully incorporated and licensed national NGO authorized under Uganda Ministry of Internal Affairs Permit <strong>INDP0007369NB</strong>.
                </p>
                <p>
                  Today, Titus spearheads the flagship Aid Combat Empowerment Center (ACE Hub) in Wakiso, travels regularly into partner correctional facilities including Kasangati, Buwambo, Nyimbwa, Nakasongola, Masafu, and Sentema prisons, and coordinates an extensive leadership council of pastors, agronomists, and community workers.
                </p>
              </div>

              {/* 3 Pillars of Leadership Philosophy */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                  Titus’s 3 Pillars of Servant Leadership
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-emerald-900 block">1. Field-First Presence</span>
                    <p className="text-[11px] text-stone-500 mt-1">Leading with boots on the ground in the greenhouses and prison wards, not from behind an ivory-tower desk.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-emerald-900 block">2. Radical Grace</span>
                    <p className="text-[11px] text-stone-500 mt-1">Believing that no ex-inmate or broken youth is beyond the redeeming love of Jesus Christ and a second chance.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs font-bold text-emerald-900 block">3. Strict Stewardship</span>
                    <p className="text-[11px] text-stone-500 mt-1">Total financial integrity, verifiable targets, and accountability before God, donors, and the Republic of Uganda.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Executive Governance Council */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Leadership Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              The Dedicated IFHCFI Governance Team
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Working alongside Titus, our verified official roster of pastors, agronomists, teachers, and council members.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {OFFICIAL_LEADERSHIP.slice(1).map((member, idx) => (
              <div 
                key={idx} 
                tabIndex={0}
                className="relative aspect-3/4 rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-900"
              >
                {/* Full-card image */}
                <img
                  src={member.image || 'https://www.image2url.com/r2/default/images/1787082762900-placeholder.png'}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle bottom gradient always present to indicate member name gently */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0 sm:group-hover:opacity-0 pointer-events-none">
                  <h4 className="font-serif font-bold text-white text-xs sm:text-sm drop-shadow-xs line-clamp-1">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-emerald-300 font-medium line-clamp-1">
                    {member.role}
                  </p>
                </div>

                {/* Hover overlay covering entire card with complete details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-stone-950/80 to-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-end text-left backdrop-blur-2xs">
                  <div className="transform translate-y-3 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300 space-y-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium tracking-wide border border-emerald-400/30">
                      Verified Roster
                    </span>
                    <h4 className="font-serif font-bold text-white text-sm sm:text-base leading-snug">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-300">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-stone-300 line-clamp-3 leading-relaxed pt-1">
                      {member.biographyNote && member.biographyNote !== '[Full biography to be supplied by IFHCFI]'
                        ? member.biographyNote
                        : `Dedicated member of the IFHCFI leadership roster supporting community agricultural development & outreach.`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <button
            onClick={() => onNavigate('vision-mission')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>← Previous: Vision &amp; Values</span>
          </button>
          <button
            onClick={() => onNavigate('volunteers')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next: Volunteers →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
