import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Send, 
  CheckCircle, 
  Coins, 
  Building, 
  Users, 
  ShieldCheck, 
  Lock,
  Mail,
  MapPin,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { OFFICIAL_REGISTRATION, FINANCIAL_TARGETS } from '../data/organizationData';
import { addContactMessage } from '../data/adminStore';

interface GetInvolvedProps {
  onOpenDocModal: () => void;
}

export const GetInvolved: React.FC<GetInvolvedProps> = ({ onOpenDocModal }) => {
  const [activeTab, setActiveTab] = useState<'donate' | 'partner' | 'volunteer'>('donate');

  // Donation intent state
  const [donationCategory, setDonationCategory] = useState<string>('initial-phase');
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [customAmount, setCustomAmount] = useState<string>('350000');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [pledgeSubmitted, setPledgeSubmitted] = useState<boolean>(false);

  // Partnership state
  const [orgName, setOrgName] = useState<string>('');
  const [orgType, setOrgType] = useState<string>('Agricultural Institution');
  const [partnerMessage, setPartnerMessage] = useState<string>('');
  const [partnerSubmitted, setPartnerSubmitted] = useState<boolean>(false);

  // Volunteer state
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [volunteerSkill, setVolunteerSkill] = useState<string>('Agricultural Mentorship');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState<boolean>(false);

  const donationTiers = [
    {
      id: 'initial-phase',
      title: 'Combat Center Initial Phase Setup',
      description: 'Supports Wakiso site fencing, dome nursery frame, and rainwater harvest tanks.',
      suggestedUGX: '350,000',
      suggestedUSD: '100',
    },
    {
      id: 'starter-kit',
      title: 'Family Farming Starter Kit (300 Target)',
      description: 'Provides high-yield seedling trays, compost, drip lines, and mentoring for 1 vulnerable household.',
      suggestedUGX: '180,000',
      suggestedUSD: '50',
    },
    {
      id: 'youth-training',
      title: 'Youth Vocational & Agro Apprentice',
      description: 'Sponsors practical tools, protective wear, and discipleship curriculum for 1 unemployed youth.',
      suggestedUGX: '250,000',
      suggestedUSD: '70',
    },
    {
      id: 'prison-reintegration',
      title: 'Prison Ministry & 12-Month Reintegration',
      description: 'Supports Bible distribution, life skills workshops, and ex-prisoner family reconciliation visits.',
      suggestedUGX: '150,000',
      suggestedUSD: '40',
    },
  ];

  return (
    <section id="get-involved" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-semibold text-[#164E33] tracking-wider mb-2">
            07. Partnership &amp; Support
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight [text-wrap:balance]">
            Partner with IFHCFI to Transform Ugandan Communities
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Whether you represent a church, developmental agency, agricultural foundation, or an individual supporter, your partnership directly equips rural families, vulnerable youth, and former inmates with dignified self-sufficiency.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl max-w-md mb-8">
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'donate' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Transparent Support Intent
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'partner' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Institutional Partnership
          </button>
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'volunteer' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Volunteer &amp; Skills
          </button>
        </div>

        {/* Tab 1: Transparent Giving Intent */}
        {activeTab === 'donate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Select Focus Area
                </h3>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg text-xs border border-stone-200">
                  <button
                    onClick={() => setCurrency('UGX')}
                    className={`px-2.5 py-0.5 rounded font-semibold cursor-pointer ${
                      currency === 'UGX' ? 'bg-[#164E33] text-white' : 'text-stone-600'
                    }`}
                  >
                    UGX
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-0.5 rounded font-semibold cursor-pointer ${
                      currency === 'USD' ? 'bg-[#164E33] text-white' : 'text-stone-600'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Tiers List */}
              <div className="space-y-3">
                {donationTiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setDonationCategory(tier.id);
                      setCustomAmount(currency === 'UGX' ? tier.suggestedUGX.replace(/,/g, '') : tier.suggestedUSD);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      donationCategory === tier.id
                        ? 'bg-white border-[#164E33] ring-1 ring-[#164E33] shadow-xs'
                        : 'bg-white/60 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="font-serif font-bold text-sm text-stone-900">
                          {tier.title}
                        </div>
                        <p className="text-xs text-stone-600">
                          {tier.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono font-bold text-sm text-[#164E33] tabular-nums">
                          {currency} {currency === 'UGX' ? tier.suggestedUGX : tier.suggestedUSD}
                        </div>
                        <span className="text-[10px] text-stone-400">Target Unit</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donor Contact Form */}
              {pledgeSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#164E33]">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Support Intent Successfully Logged</span>
                  </div>
                  <p>
                    Thank you, <strong className="font-semibold">{donorName || 'Partner'}</strong>. Your statement of intent to support{' '}
                    <strong className="font-semibold">{donationCategory}</strong> with {currency} {customAmount} has been registered with the Country Coordinator desk.
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Our team will send official bank transfer and mobile money documentation matching Registration No. MIA/NB/2026/03/7369.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPledgeSubmitted(true);
                  }}
                  className="space-y-4 pt-2"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Full Name / Organisation
                      </label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Grace Nakato / Hope Foundation"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address for Official Receipting
                      </label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Intended Amount ({currency})
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33] font-mono tabular-nums"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2.5 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <HeartHandshake className="w-4 h-4 text-emerald-200" />
                        <span>Submit Support Intent</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Information & Compliance Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-[#164E33]" />
                  <span>Financial Accountability Guarantee</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  IFHCFI operates under the supervision of the Uganda NGO Bureau. In strict alignment with our Christian stewardship ethics:
                </p>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Every shilling is tied directly to designated programme budgets.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Regular programmatic verification reports are issued to partners.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Zero administrative inflation or hidden charges.</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-800">Operational Gateway Notice:</span>{' '}
                  Payment settlement will route strictly through official IFHCFI registered bank and merchant accounts once certified by the board.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Need an Official Grant Proposal or Tax Receipt?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Foundations and institutional donors can generate formal concept notes and compliance portfolios directly.
                </p>
                <button
                  onClick={onOpenDocModal}
                  className="w-full py-2 text-xs font-semibold text-[#164E33] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Generate Institutional Concept Note</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Institutional Partnership Proposal */}
        {activeTab === 'partner' && (
          <div className="max-w-2xl bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Institutional &amp; Church Partnership Inquiry
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                We welcome collaboration with agricultural research agencies, rural church networks, correctional authorities, and funding bodies.
              </p>
            </div>

            {partnerSubmitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#164E33]">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Partnership Proposal Received</span>
                </div>
                <p>
                  Thank you, <strong className="font-semibold">{orgName}</strong>. Country Coordinator Mukaga Titus Joshua and the board committee have been notified of your proposal.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addContactMessage({
                    name: orgName,
                    email: 'inquiry@organization.org',
                    organization: `${orgName} (${orgType})`,
                    category: 'Partnership Inquiry',
                    subject: `Partnership: ${orgName} - ${orgType}`,
                    message: partnerMessage,
                  });
                  setPartnerSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Organization / Church Name
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Uganda Agro Network"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Organization Type
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    >
                      <option>Agricultural Institution</option>
                      <option>Rural Church Network</option>
                      <option>Development Foundation / Donor</option>
                      <option>Vocational Training Center</option>
                      <option>Community Based Organization</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Proposed Area of Collaboration
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={partnerMessage}
                    onChange={(e) => setPartnerMessage(e.target.value)}
                    placeholder="Describe how your organization would like to partner (e.g. providing seedling supply, vocational carpentry tooling, joint prison outreach in Luweero or Wakiso)..."
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Partnership Inquiry</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Volunteer & Skills */}
        {activeTab === 'volunteer' && (
          <div className="max-w-2xl bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Volunteer Skills &amp; Fellowship Service
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Contribute your time, agronomist expertise, vocational teaching skills, or intercessory prayer fellowship.
              </p>
            </div>

            {volunteerSubmitted ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#164E33]">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Volunteer Profile Registered</span>
                </div>
                <p>
                  God bless you, <strong className="font-semibold">{volunteerName}</strong>. Our volunteer coordinator will reach out when the next regional workshop in your specialty is scheduled.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVolunteerSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      placeholder="e.g. Joshua Musoke"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Primary Skill Offering
                    </label>
                    <select
                      value={volunteerSkill}
                      onChange={(e) => setVolunteerSkill(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164E33]"
                    >
                      <option>Agricultural Mentorship (Crops/Greenhouse)</option>
                      <option>Livestock Care (Goats/Poultry/Pigs)</option>
                      <option>Vocational Instructor (Carpentry/Tailoring)</option>
                      <option>Spiritual Discipleship &amp; Counseling</option>
                      <option>Prison Ministry Volunteer</option>
                      <option>Intercessory Prayer Partner</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#164E33] hover:bg-[#0D281A] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Register Volunteer Availability</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Operational Inquiries & In-Person Presence Notice */}
        <div className="mt-12 p-5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>In-Person Operational Headquarters</span>
            </div>
            <p>
              Wakiso District, Uganda · In-person inquiries, church delegations, and site visits coordinated through the Country Coordinator desk.
            </p>
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            [Official IFHCFI digital contact accounts will be published upon board confirmation]
          </div>
        </div>
      </div>
    </section>
  );
};
