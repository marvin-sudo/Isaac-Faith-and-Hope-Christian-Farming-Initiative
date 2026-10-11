import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  Phone, 
  Building2, 
  FileText,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';
import { saveContactMessages, getContactMessages, logAdminActivity } from '../data/adminStore';

interface VolunteerAndPartnershipSectionProps {
  onNavigate?: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const PARTNERSHIP_CATEGORIES = [
  {
    name: 'Financial Partnership',
    description: 'Provide core grants, project co-funding, or monthly institutional support to expand field operations.',
  },
  {
    name: 'Technical Partnership',
    description: 'Share specialized agronomy, veterinary science, diagnostic laboratory, or monitoring & evaluation expertise.',
  },
  {
    name: 'Agricultural Partnership',
    description: 'Supply certified seeds, greenhouse technology, solar pumps, or biological pest control solutions.',
  },
  {
    name: 'Training Partnership',
    description: 'Collaborate on vocational curriculum, certified apprenticeships, and trade qualification standards.',
  },
  {
    name: 'Faith & Ministry Partnership',
    description: 'Unite with rural and urban churches for prison visits, Bible distribution, and congregational mentorship.',
  },
  {
    name: 'Equipment Partnership',
    description: 'Donate or subsidize tractors, seed planters, feed pelletizers, joinery tools, or utility transport.',
  },
  {
    name: 'Infrastructure Partnership',
    description: 'Partner on capital construction for the Combat Center, Bible Institution, or urban transitional housing.',
  },
];

export const VOLUNTEER_ROLES = [
  'Prison Ministry Visitation',
  'One-on-One Mentorship',
  'Bible Distribution & Discipleship',
  'Agricultural & Farm Training',
  'Vocational Skills Coaching',
  'Community Health & Outreach',
  'Grant Writing & Fundraising',
  'Professional Legal / Medical Advice',
  'Administration & Database Support',
  'Media, Photography & Communications',
  'Event Logistics & Field Support',
];

export const VolunteerAndPartnershipSection: React.FC<VolunteerAndPartnershipSectionProps> = ({
  onNavigate,
  onOpenDocModal,
}) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner'>('volunteer');

  // Volunteer Form State
  const [vName, setVName] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vRole, setVRole] = useState(VOLUNTEER_ROLES[0]);
  const [vBackground, setVBackground] = useState('');
  const [vSafeguardingAgreed, setVSafeguardingAgreed] = useState(false);
  const [vSubmitted, setVSubmitted] = useState(false);

  // Partner Form State
  const [pOrg, setPOrg] = useState('');
  const [pContact, setPContact] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pCategory, setPCategory] = useState(PARTNERSHIP_CATEGORIES[0].name);
  const [pMessage, setPMessage] = useState('');
  const [pSubmitted, setPSubmitted] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vSafeguardingAgreed) return;

    try {
      const messages = getContactMessages();
      const newMsg = {
        id: `vol-${Date.now()}`,
        name: vName,
        email: vEmail,
        phone: vPhone,
        category: 'Volunteer Service' as const,
        subject: `Volunteer Application: ${vRole}`,
        message: `Role: ${vRole}\nBackground & Experience:\n${vBackground}\n\nAgreed to safeguarding and conduct guidelines: Yes`,
        status: 'New' as const,
        date: new Date().toISOString().split('T')[0],
      };
      saveContactMessages([newMsg, ...messages]);
      logAdminActivity('Volunteer application submitted', 'message', `${vName} applied for ${vRole}`, 'Website Volunteer');
      setVSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const messages = getContactMessages();
      const newMsg = {
        id: `part-${Date.now()}`,
        name: pContact,
        email: pEmail,
        organization: pOrg,
        category: 'Partnership Inquiry' as const,
        subject: `Partnership Inquiry: ${pCategory}`,
        message: `Organization: ${pOrg}\nPartnership Category: ${pCategory}\nProposal / Message:\n${pMessage}`,
        status: 'New' as const,
        date: new Date().toISOString().split('T')[0],
      };
      saveContactMessages([newMsg, ...messages]);
      logAdminActivity('Partnership inquiry received', 'message', `${pOrg} submitted proposal for ${pCategory}`, 'Institutional Partner');
      setPSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            <span>Join Our Mission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Ways to Get Involved
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Whether volunteering your gifts and time in prison visitation, or forging an institutional partnership to multiply rural prosperity, your collaboration transforms lives.
          </p>

          {/* Toggle Tab Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'volunteer'
                  ? 'bg-[#0D281A] text-white shadow-lg ring-2 ring-emerald-500/30'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Users className="w-4 h-4 text-yellow-300" />
              <span>Volunteer With Us</span>
            </button>

            <button
              onClick={() => setActiveTab('partner')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'partner'
                  ? 'bg-[#0D281A] text-white shadow-lg ring-2 ring-emerald-500/30'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Partner With IFHCFI</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Volunteer With Us */}
        {activeTab === 'volunteer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Context & Roles (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Serve Alongside Our Field Teams
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  We welcome committed volunteers of good character to join our prison outreach, agricultural mentorship, youth discipleship, and administrative operations.
                </p>
              </div>

              {/* Roles Pills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Available Service Areas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {VOLUNTEER_ROLES.map((r, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safeguarding Commitment */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
                <div className="font-bold flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Safeguarding &amp; Ethical Conduct Policy</span>
                </div>
                <p className="leading-relaxed text-stone-700">
                  All volunteers must respect the dignity, privacy, and confidentiality of incarcerated individuals, former prisoners, and vulnerable youth. Background references and ethical commitments are verified before facility visits.
                </p>
              </div>
            </div>

            {/* Right Application Form (6 cols) */}
            <div className="lg:col-span-6 bg-[#FBF9F5] p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
              {vSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Application Received
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-stone-900">{vName}</strong>. Your volunteer application for <strong className="text-stone-900">{vRole}</strong> has been securely logged into our administrative system. Our coordinator will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setVSubmitted(false);
                      setVName('');
                      setVEmail('');
                      setVPhone('');
                      setVBackground('');
                    }}
                    className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    Volunteer Application Form
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={vName}
                        onChange={(e) => setVName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={vEmail}
                        onChange={(e) => setVEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={vPhone}
                        onChange={(e) => setVPhone(e.target.value)}
                        placeholder="+256..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Preferred Service Role *
                      </label>
                      <select
                        value={vRole}
                        onChange={(e) => setVRole(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {VOLUNTEER_ROLES.map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Brief Background &amp; Motivation
                    </label>
                    <textarea
                      rows={3}
                      value={vBackground}
                      onChange={(e) => setVBackground(e.target.value)}
                      placeholder="Tell us briefly about your experience, faith journey, or skills you wish to share..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="safeguard"
                      required
                      checked={vSafeguardingAgreed}
                      onChange={(e) => setVSafeguardingAgreed(e.target.checked)}
                      className="mt-1 rounded text-emerald-700 focus:ring-emerald-500"
                    />
                    <label htmlFor="safeguard" className="text-xs text-stone-600 leading-snug cursor-pointer">
                      I agree to uphold IFHCFI safeguarding principles, dignity standards, and safe conduct guidelines in all interactions with beneficiaries.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!vSafeguardingAgreed}
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-yellow-300" />
                    <span>Submit Volunteer Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Partner With IFHCFI */}
        {activeTab === 'partner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Categories (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Strategic Institutional Partnerships
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  We collaborate with churches, agricultural universities, international development donors, foundations, and businesses to scale evidence-based rural transformation.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Partnership Categories:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {PARTNERSHIP_CATEGORIES.map((cat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1"
                    >
                      <div className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{cat.name}</span>
                      </div>
                      <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Partnership Inquiry Form (6 cols) */}
            <div className="lg:col-span-6 bg-[#FBF9F5] p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
              {pSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">
                    Partnership Inquiry Logged
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                    Thank you. Your proposal on behalf of <strong className="text-stone-900">{pOrg}</strong> has been routed to the IFHCFI Executive Office and Board. We will review and provide our official concept dossier.
                  </p>
                  <button
                    onClick={() => {
                      setPSubmitted(false);
                      setPOrg('');
                      setPContact('');
                      setPEmail('');
                      setPMessage('');
                    }}
                    className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    Institutional Partnership Proposal
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Organization / Church / Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={pOrg}
                      onChange={(e) => setPOrg(e.target.value)}
                      placeholder="e.g. Grace Fellowship, AgroTech Foundation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={pContact}
                        onChange={(e) => setPContact(e.target.value)}
                        placeholder="Representative name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={pEmail}
                        onChange={(e) => setPEmail(e.target.value)}
                        placeholder="contact@org.org"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Partnership Category *
                    </label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {PARTNERSHIP_CATEGORIES.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Partnership Objectives &amp; Focus Area
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={pMessage}
                      onChange={(e) => setPMessage(e.target.value)}
                      placeholder="Outline your organization's goals, geographic interest, proposed timeline, or resources to contribute..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#0A2618] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-yellow-300" />
                    <span>Submit Partnership Proposal</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
