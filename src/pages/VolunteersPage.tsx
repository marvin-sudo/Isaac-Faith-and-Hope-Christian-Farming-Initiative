import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  HeartHandshake, 
  CheckCircle2, 
  Scale, 
  Heart, 
  Sparkles, 
  HelpCircle,
  Sprout,
  BookOpen,
  Send
} from 'lucide-react';
import savingsImg from '../assets/images/women_village_savings_1790277977734.jpg';

interface VolunteersPageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const VolunteersPage: React.FC<VolunteersPageProps> = ({ onNavigate, onOpenDocModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    serviceArea: 'agronomy',
    availability: 'weekends',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Full-width Hero Section (Not a card, edge-to-edge) */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-16 sm:py-20 lg:py-24">
        {/* Background Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={savingsImg} 
            alt="Community volunteers and women savings group in Uganda" 
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
            <span className="text-white font-semibold">Volunteers</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-stone-100 text-xs font-semibold backdrop-blur-md">
              <Users className="w-4 h-4 text-yellow-300" />
              <span>Community Mobilization &amp; Hands-On Service</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Join Our Volunteer Community
            </h1>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Put your faith, skills, and compassion into action alongside rural smallholders, vulnerable youth, and reformed ex-prisoners across Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* 6 Core Volunteer Opportunities */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Service Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Where You Can Make a Tangible Impact
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Whether you are an experienced farmer, an artisan, a teacher, a healthcare worker, or simply have a willing heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Track 1 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Agronomy &amp; Nursery Propagation</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Work alongside our farm teams in Wakiso: dome greenhouse seedling trays, bio-intensive composting, drip line installation, and goat/poultry husbandry care.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-semibold pt-1">Wakiso Campus Demo Site</div>
            </div>

            {/* Track 2 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Vocational Trades Mentorship</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Coach youth and apprentices in carpentry, tailoring, welding, small engine repair, basic financial bookkeeping, and cooperative sales.
              </p>
              <div className="text-[11px] font-mono text-blue-800 font-semibold pt-1">Training Hall &amp; Workshops</div>
            </div>

            {/* Track 3 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Scale className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Prison Outreach &amp; Reentry Fellowship</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Join our chaplaincy teams inside Kasangati, Buwambo, and Sentema prisons. Assist in literacy, Bible studies, and post-release family reconciliation.
              </p>
              <div className="text-[11px] font-mono text-amber-800 font-semibold pt-1">Partner Prisons &amp; Counseling Office</div>
            </div>

            {/* Track 4 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6 text-rose-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">WASH &amp; Community Health</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Support village hygiene drives, rainwater harvesting maintenance, basic medical triage camps, and wellness education for rural mothers and children.
              </p>
              <div className="text-[11px] font-mono text-rose-800 font-semibold pt-1">Parish Outreaches</div>
            </div>

            {/* Track 5 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Media, Storytelling &amp; Tech</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Capture high-resolution photography, video testimonials, write field progress reports, and assist with data entry for our 12-programme tracking portal.
              </p>
              <div className="text-[11px] font-mono text-purple-800 font-semibold pt-1">Digital &amp; Field Documentation</div>
            </div>

            {/* Track 6 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Prayer &amp; Intercession Cohort</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Commit to praying weekly for our 1,000 targeted youth, prison superintendents, ex-inmates navigating reentry, and rural smallholders facing dry spells.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-semibold pt-1">Global &amp; Local Prayer Network</div>
            </div>
          </div>
        </div>

        {/* Volunteer Application Form */}
        <div id="apply-volunteer" className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Apply Today
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Volunteer Registration &amp; Interest Form
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Fill in your details below and our Country Coordination team will reach out with placement details.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-xl">
                  Thank You for Your Heart to Serve!
                </h3>
                <p className="text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
                  Your volunteer application has been received. Our team will contact you via email or phone with orientation dates and service details.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs transition-colors hover:bg-emerald-700 cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Nakato"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. grace@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Current Location / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wakiso / Kampala / International"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Preferred Service Area *</label>
                    <select
                      value={formData.serviceArea}
                      onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    >
                      <option value="agronomy">Agronomy &amp; Greenhouse Nursery</option>
                      <option value="vocational">Vocational Trades &amp; Apprenticeship</option>
                      <option value="prison">Prison Outreach &amp; Reentry Fellowship</option>
                      <option value="wash">WASH &amp; Community Wellness</option>
                      <option value="media">Media, Photography &amp; Storytelling</option>
                      <option value="prayer">Prayer &amp; Intercession Cohort</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1 text-xs">Availability *</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                    >
                      <option value="weekends">Weekends Only</option>
                      <option value="part-time">Part-Time (1-2 days/week)</option>
                      <option value="full-time">Full-Time Intensive</option>
                      <option value="short-term">Short-term Mission (1-4 weeks)</option>
                      <option value="remote">Remote / Digital Volunteer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1 text-xs">Tell Us About Yourself &amp; Your Calling</label>
                  <textarea
                    rows={3}
                    placeholder="Share any relevant skills, experiences, or what inspires you to serve with IFHCFI..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Volunteer Application'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Volunteer FAQ Box */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Volunteer Frequently Asked Questions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
              <span className="font-bold text-stone-900 block">Do I need prior agricultural training?</span>
              <p className="text-stone-600 leading-relaxed">No. Our agronomists provide hands-on training for all volunteers on dome greenhouses, drip irrigation, and nursery trays.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
              <span className="font-bold text-stone-900 block">Can international volunteers join?</span>
              <p className="text-stone-600 leading-relaxed">Yes. We welcome international ministry teams and interns. We assist with local logistics and field orientation in Wakiso.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
              <span className="font-bold text-stone-900 block">Is lodging available on campus?</span>
              <p className="text-stone-600 leading-relaxed">Basic guest lodging and pastoral hospitality can be arranged for full-time or intensive mission volunteers upon booking.</p>
            </div>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <button
            onClick={() => onNavigate('founder')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>← Previous: About the Founder</span>
          </button>
          <button
            onClick={() => onNavigate('ministry-profile')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next: Ministry Profile →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
