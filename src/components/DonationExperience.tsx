import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Info, 
  Building2, 
  Phone, 
  Mail, 
  ArrowRight,
  Lock,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { logAdminActivity } from '../data/adminStore';

export const GIVING_CATEGORIES = [
  { id: 'general', name: 'General Support / Where Most Needed', focus: 'Enables flexible response to acute field and prison needs.' },
  { id: 'prison-ministry', name: 'Prison Ministry & Visitation', focus: 'Funds outreach bibles, pastoral visits, and transport to 6 partner prisons.' },
  { id: 'rehabilitation', name: 'Rehabilitation & Trauma Counseling', focus: 'Underwrites life-skills, mediation, and pre-release guidance.' },
  { id: 'skills-training', name: 'Vocational & Apprenticeship Skills', focus: 'Supports practical joinery, construction, and technical coaching.' },
  { id: 'starter-kits', name: 'Agricultural Starter Kits Fund', focus: 'Supplies eligible reformed beneficiaries with seeds, tools & feed rations.' },
  { id: 'coffee-seedlings', name: 'Coffee Seedlings & Agroforestry', focus: 'Provides certified perennial cash crop seedlings for rural families.' },
  { id: 'poultry', name: 'Poultry & Micro-Husbandry', focus: 'Funds 5-week brooded chicks, coops, and vaccination schedules.' },
  { id: 'livestock', name: 'Zero-Grazing Goats & Livestock', focus: 'Purchases healthy starter ruminants under pass-on-the-gift agreements.' },
  { id: 'agricultural-equipment', name: 'Agricultural Equipment & Machinery', focus: 'Contributes to tillage machinery, drip irrigation, and borehole pumps.' },
  { id: 'rehab-centers', name: 'Transitional Rehabilitation Centers', focus: 'Supports residential transitional housing development in Kampala & Wakiso.' },
  { id: 'bible-institution', name: 'Bible & Leadership Institution', focus: 'Assists construction of the Christian training campus for rural pastors.' },
  { id: 'aquaculture', name: 'Aquaculture & Fish Hatchery Systems', focus: 'Funds fish rearing tanks and fingerling distribution for youth.' },
  { id: 'apiculture', name: 'Apiculture & Honey Production', focus: 'Supplies modern beehives and extraction centrifuges to village women.' },
  { id: 'feed-processing', name: 'Community Feed Milling Plant', focus: 'Helps install feed hammer mills to reduce input costs for smallholders.' },
  { id: 'transport', name: 'Transport for Prison Outreach', focus: 'Assists with utility vehicle maintenance, fuel, and outreach travel.' },
];

export const SUGGESTED_AMOUNTS = [
  { label: 'UGX 50,000', usdApprox: '~$14 USD' },
  { label: 'UGX 150,000', usdApprox: '~$40 USD' },
  { label: 'UGX 350,000', usdApprox: '~$95 USD' },
  { label: 'UGX 1,000,000', usdApprox: '~$270 USD' },
  { label: 'Custom Amount', usdApprox: 'Any Currency' },
];

interface DonationExperienceProps {
  onOpenDocModal?: () => void;
}

export const DonationExperience: React.FC<DonationExperienceProps> = ({ onOpenDocModal }) => {
  const [frequency, setFrequency] = useState<'one-time' | 'recurring'>('one-time');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [selectedAmount, setSelectedAmount] = useState<string>('UGX 150,000');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showPledgeModal, setShowPledgeModal] = useState<boolean>(false);

  const activeCategoryObj = GIVING_CATEGORIES.find(c => c.id === selectedCategory) || GIVING_CATEGORIES[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logAdminActivity(
      'Donation pledge registered',
      'message',
      `${donorName || 'Anonymous'} registered a ${frequency} gift intent for ${activeCategoryObj.name} (${customAmount || selectedAmount})`,
      'Website Supporter'
    );
    setShowPledgeModal(true);
  };

  return (
    <section id="give" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-emerald-700" />
            <span>Give Toward Transformation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Invest in Real Livelihoods, Not Dependency
          </h2>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Every contribution directly equips an incarcerated soul with hope, trains a young person in sustainable agriculture, or provides a starter asset to help a widow support her children with dignity.
          </p>
        </div>

        {/* Payment Gateway Status Badge */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-start gap-3.5 text-xs sm:text-sm text-emerald-950">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Official Giving Channels &amp; Transparent Processing</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Online card payment gateway integration is currently in progress. Donations are handled directly through official IFHCFI registered institutional bank wire transfers and verified Ugandan mobile money numbers, ensuring 100% transparency with zero third-party processing deductions.
            </p>
          </div>
        </div>

        {/* Giving Interactive Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Choice of Category, Amount & Frequency (7 cols) */}
          <div className="lg:col-span-7 bg-[#FBF9F5] p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <form onSubmit={handlePledgeSubmit} className="space-y-6">
              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Giving Frequency:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      frequency === 'one-time'
                        ? 'bg-[#0D281A] text-white shadow-md'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span>One-Time Gift</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('recurring')}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      frequency === 'recurring'
                        ? 'bg-[#0D281A] text-white shadow-md'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-yellow-300" />
                    <span>Monthly Partner</span>
                  </button>
                </div>
              </div>

              {/* Giving Category Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Direct My Support Toward:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {GIVING_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-emerald-800 font-medium mt-1.5 pl-1">
                  Focus: {activeCategoryObj.focus}
                </p>
              </div>

              {/* Suggested Amounts */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Select Giving Level:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SUGGESTED_AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt.label;
                    return (
                      <button
                        key={amt.label}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt.label);
                          if (amt.label !== 'Custom Amount') setCustomAmount('');
                        }}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-900 text-white border-emerald-500 shadow-sm'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm">{amt.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                          {amt.usdApprox}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedAmount === 'Custom Amount' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter amount (e.g. $500 USD or UGX 2,000,000)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* Donor Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Individual or Church Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (For Acknowledgement)
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-sm tracking-wide shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-stone-950 text-stone-950" />
                <span>Confirm Gift Intent &amp; View Transfer Details</span>
              </button>
            </form>
          </div>

          {/* Right Panel: Official Verified Giving Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Bank Wire Details Card */}
            <div className="bg-[#0A2618] text-white p-6 sm:p-8 rounded-3xl border border-emerald-700/50 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-300">
                  Institutional Bank Transfer
                </span>
                <Building2 className="w-5 h-5 text-yellow-300" />
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-white/10 space-y-1">
                  <div className="text-[10px] text-stone-400 font-mono">ACCOUNT NAME</div>
                  <div className="font-bold text-stone-100 text-sm">
                    Isaac Faith and Hope Christian Farming Initiative
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-stone-400 font-mono">REGISTRATION FILE NO.</div>
                    <div className="font-mono font-bold text-yellow-300 text-xs">
                      MIA/NB/2026/03/7369
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('MIA/NB/2026/03/7369', 'reg')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    title="Copy Registration Number"
                  >
                    {copiedKey === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-stone-400 font-mono">OPERATIONAL PERMIT NO.</div>
                    <div className="font-mono font-bold text-yellow-300 text-xs">
                      INDP0007369NB
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('INDP0007369NB', 'permit')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    title="Copy Permit Number"
                  >
                    {copiedKey === 'permit' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-stone-300 leading-relaxed border-t border-white/15 pt-3">
                For international SWIFT wiring instructions, project-earmarked agreements, or donor tax receipts, please contact the Executive Office directly.
              </p>
            </div>

            {/* Direct Giving Contacts Card */}
            <div className="p-6 rounded-3xl bg-[#FBF9F5] border border-stone-200 space-y-3">
              <h4 className="font-serif font-bold text-base text-stone-900">
                Official Giving Inquiries &amp; Verification
              </h4>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Executive Coordination: +256 772 000 000 / +256 700 000 000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>giving@ifhcfi.org / coordination@ifhcfi.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Thank You Modal */}
      {showPledgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Thank You for Your Generous Heart
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Your pledge of <strong className="text-stone-900">{customAmount || selectedAmount}</strong> toward <strong className="text-emerald-800">{activeCategoryObj.name}</strong> has been received by our coordination office.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="font-bold text-stone-800">Next Steps:</div>
              <p className="text-stone-600">
                Please complete your transfer referencing Permit <span className="font-mono font-bold text-emerald-800">INDP0007369NB</span>. You may notify our finance office via WhatsApp or email with your transfer reference so we can issue your official acknowledgement receipt.
              </p>
            </div>

            <button
              onClick={() => setShowPledgeModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
