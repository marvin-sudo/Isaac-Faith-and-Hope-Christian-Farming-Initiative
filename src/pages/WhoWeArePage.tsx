import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Heart, 
  MapPin, 
  Building2, 
  Copy, 
  Check, 
  BookOpen, 
  Wheat, 
  Scale, 
  Users, 
  Cross, 
  Clock, 
  Send, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Lock, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  HandHeart 
} from 'lucide-react';
import { logAdminActivity } from '../data/adminStore';

// Authentic imagery imports
import heroFarmingImg from '../assets/images/hero_ugandan_farming_1790193085963.jpg';
import greenhouseImg from '../assets/images/dome_farm_greenhouse_1790193096683.jpg';
import starterKitImg from '../assets/images/family_starter_kit_1790277954367.jpg';
import prisonOutreachImg from '../assets/images/prison_reintegration_1790277940920.jpg';
import vocationalImg from '../assets/images/vocational_skills_training_1790273232078.jpg';
import womenSavingsImg from '../assets/images/women_village_savings_1790277977734.jpg';

interface WhoWeArePageProps {
  onNavigate: (page: string) => void;
  onOpenDocModal?: () => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ onNavigate, onOpenDocModal }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);

  // Working enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryTopic, setEnquiryTopic] = useState('general');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryMessage) return;

    logAdminActivity(
      'Who We Are Enquiry Received',
      'message',
      `Enquiry from ${enquiryName} (${enquiryEmail}) regarding ${enquiryTopic}: "${enquiryMessage.substring(0, 100)}..."`,
      'Public Visitor'
    );

    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquiryName('');
      setEnquiryEmail('');
      setEnquiryMessage('');
      setEnquirySubmitted(false);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Eight Groups Defined by Brief
  const eightGroups = [
    {
      id: 'widows',
      title: 'Widows',
      context: 'Rural Uganda',
      description: 'Equipping widowed mothers with backyard silage garden systems, high-germination seed rations, and cooperative savings circles to sustain their homes with dignity.',
      icon: HandHeart,
    },
    {
      id: 'orphans',
      title: 'Orphans',
      context: 'Vulnerable Households',
      description: 'Providing nutritional stability, child-headed household agricultural mentoring, and safe communal fellowship linkages rooted in Christian compassion.',
      icon: Heart,
    },
    {
      id: 'youth',
      title: 'Youth',
      context: 'Unemployed & Out-of-School',
      description: 'Hands-on agro-technical apprenticeships, bio-intensive greenhouse cultivation training, and moral mentorship to reverse rural-urban despair.',
      icon: Sparkles,
    },
    {
      id: 'inmates',
      title: 'Prison Inmates',
      context: 'Correctional Facilities',
      description: 'Regular correctional visitation delivering Gospel hope, spiritual literature, pastoral counselling, personal hygiene supplies, and pre-release mindset readiness.',
      icon: Lock,
    },
    {
      id: 'former-prisoners',
      title: 'Former Prisoners',
      context: 'Reintegration Pipeline',
      description: 'Structured 12-month post-release accompaniment, family reconciliation dialogue, and agricultural starter packages to prevent recidivism.',
      icon: Scale,
    },
    {
      id: 'rural-pastors',
      title: 'Rural Pastors',
      context: 'Village Ministry Leaders',
      description: 'Practical theological strengthening, self-supporting bi-vocational farming skills, and leadership fellowship for underserved pastors in remote outposts.',
      icon: BookOpen,
    },
    {
      id: 'village-churches',
      title: 'Poor Rural & Pentecostal Village Churches',
      context: 'Grassroots Fellowships',
      description: 'Mobilizing rural churches as community hubs for compassion, community seed distribution, mutual aid, and uncompromised biblical discipleship.',
      icon: Cross,
    },
    {
      id: 'elderly-families',
      title: 'Elderly People & Poor Families',
      context: 'Rural Villages',
      description: 'Nutritional food security interventions, emergency staple supplies, and low-labor home gardening kits for aging grandparents raising orphaned grandchildren.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800">
      {/* =========================================================================
          HERO SECTION — A MISSION ROOTED IN SCRIPTURE
          Headline: "From Isaac’s Fields to Joseph’s Prison"
          Supporting headline: "Two Biblical Stories. One Mission of Faith, Hope and Transformation."
          Primary CTA: "Discover Our Mission" -> #our-mission
          Secondary CTA: "Our Programmes" -> #our-programmes
          ========================================================================= */}
      <section className="relative w-full overflow-hidden text-white bg-stone-950 py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroFarmingImg} 
            alt="Agricultural cultivation and community empowerment in rural Uganda" 
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-950/50" />
          <div className="absolute inset-0 bg-[#0D281A]/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-300 font-medium">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-300">About</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-white font-semibold">Who We Are</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight text-balance">
              From Isaac’s Fields to Joseph’s Prison
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-medium text-yellow-200/90 leading-snug">
              Two Biblical Stories. One Mission of Faith, Hope and Transformation.
            </p>

            <blockquote className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl border-l-2 border-yellow-400 pl-4 italic">
              “Inspired by Isaac, who sowed in the land, and Joseph, whose faith endured even in prison, IFHCFI ACE Hub puts faith into action through farming creativity, community empowerment and Gospel outreach.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Main Content Flow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 lg:space-y-28">

        {/* =========================================================================
            SECTION 1: WHO WE ARE
            Heading: "Faith That Moves Beyond Words"
            Two dimensions:
            1. Reaching poor and vulnerable people in rural communities through farming creativity and practical empowerment.
            2. Reaching prisoners and former prisoners through Gospel outreach, counselling, donations, and follow-up support.
            ========================================================================= */}
        <section id="who-we-are" className="space-y-8 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Identity &amp; Dual Focus
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
                Faith That Moves Beyond Words
              </h2>
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-stone-900">IFHCFI ACE Hub</strong> (Aid Combat Empowerment Center Hub) is a faith-inspired humanitarian and community empowerment initiative built on the firm conviction that authentic Christian faith must be demonstrated through practical action that transforms lives.
                </p>
                <p>
                  We believe that the Gospel is demonstrated not only through preaching, but also through tangible works of service that support vulnerable families, address rural poverty, restore human dignity, and bring hope to individuals in prison and those returning to their communities after release.
                </p>
                <p>
                  To fulfill this holistic mandate, the organisation carries forward two complementary dimensions of ministry:
                </p>
              </div>

              {/* Two Complementary Dimensions Cards */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Wheat className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                    1. Rural Communities &amp; Farming Creativity
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Reaching poor and vulnerable people in rural communities through climate-smart farming creativity, household nutrition gardens, and practical livelihood empowerment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4 text-amber-700" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                    2. Inmates, Former Prisoners &amp; Gospel Outreach
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Reaching prisoners and former prisoners through Gospel outreach, trauma-informed counselling, humanitarian donations to facilities, and structured rehabilitation follow-up.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-600 leading-relaxed">
                <strong className="text-stone-800">Operational Integrity:</strong> Operating in Uganda under official NGO registration permit <span className="font-mono font-bold text-stone-900">IND0007369NB</span>, we uphold compassion, dignity, faithfulness, restoration, and community transformation without commercial or political compromise.
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 aspect-4/3 sm:aspect-5/4 lg:aspect-auto lg:h-[480px]">
                <img
                  src={womenSavingsImg}
                  alt="Rural Ugandan women in village fellowship and practical community empowerment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white text-xs space-y-1.5">
                  <span className="px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-[10px] uppercase tracking-wider">
                    Practical Faith
                  </span>
                  <div className="font-serif font-bold text-base text-stone-100">Restoration, Dignity &amp; Community Fellowship</div>
                  <p className="text-[11px] text-stone-300 leading-snug">
                    Mobilizing vulnerable households, widows, and rural families into productive community circles that cultivate sustainable self-reliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE BIBLICAL INSPIRATION (SIGNATURE SECTION)
            Concept:
            ISAAC — THE FARMER. JOSEPH — THE PRISONER. ONE MISSION: PUTTING FAITH IN ACTION TO BRING CHANGE.
            Panel A: Isaac — The Faith of a Farmer (Genesis 26:12–14; "Sowing Seeds of Hope")
            Panel B: Joseph — Faith in Captivity (Genesis 39:20–23, Genesis 41:39–41; "Hope Beyond the Prison Walls")
            Connecting Statement: "In the villages, we seek out the poor. In the prisons, we reach the captives."
            ========================================================================= */}
        <section id="biblical-inspiration" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Signature Biblical Metaphor
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              The Biblical Inspiration
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs sm:text-sm font-bold tracking-wide">
              ISAAC — THE FARMER. JOSEPH — THE PRISONER. ONE MISSION: PUTTING FAITH IN ACTION TO BRING CHANGE.
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto pt-1">
              The biblical accounts of Isaac and Joseph provide the theological inspiration for our two complementary ministry fields: sowing seeds of agricultural renewal in impoverished villages, and bringing the light of Christ to those confined within prison walls.
            </p>
          </div>

          {/* Two Complementary Story Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Panel A: ISAAC — THE FAITH OF A FARMER */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                  <img
                    src={greenhouseImg}
                    alt="Isaac's inspiration: Agricultural cultivation and greenhouse seedling nursery in Uganda"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D281A] text-yellow-300 text-xs font-mono font-bold">
                    PANEL A · THE FARMER
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-yellow-300 uppercase tracking-widest">Genesis 26:12–14</span>
                    <h3 className="font-serif font-bold text-xl text-white">Isaac — The Faith of a Farmer</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-2">
                    <div className="text-xs uppercase font-sans tracking-wider text-emerald-800 font-bold">
                      Heading: “Sowing Seeds of Hope”
                    </div>
                    <blockquote className="p-4 rounded-xl bg-amber-50/70 border-l-4 border-amber-600 font-serif italic text-stone-800 text-xs sm:text-sm leading-relaxed">
                      “Isaac planted crops in that land and the same year reaped a hundredfold, because the Lord blessed him. The man became rich, and his wealth continued to grow until he became very wealthy.”
                      <span className="block not-italic font-mono text-[11px] text-stone-500 font-normal mt-1">— Genesis 26:12–14</span>
                    </blockquote>
                  </div>

                  <div className="space-y-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                    <p>
                      In a time of famine and uncertainty, Isaac obeyed God, stayed in the land, worked the ground, and sowed seed in faith. God honoured his diligence with a hundredfold harvest. His story inspires faith, diligence, perseverance, cultivation, and fruitfulness.
                    </p>
                    <p>
                      We connect Isaac’s biblical journey directly to IFHCFI ACE Hub’s community work:
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside text-stone-700 pl-1">
                      <li><strong>Farming creativity:</strong> Climate-smart technologies suited for smallholder plots.</li>
                      <li><strong>Village gardens:</strong> Practical nutrition for widows, orphans, and vulnerable homes.</li>
                      <li><strong>Household food security:</strong> Creating lasting avenues for greater self-reliance.</li>
                      <li><strong>Poverty alleviation:</strong> Community-based models that honor dignity and stewardship.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Supporting Statement */}
              <div className="p-6 bg-stone-50 border-t border-stone-200">
                <div className="text-xs text-stone-700 leading-relaxed italic border-l-2 border-emerald-600 pl-3">
                  “Isaac’s story inspires us to believe in the value of sowing, cultivating and persevering in faith. Through practical farming initiatives, we seek to help vulnerable families cultivate hope and work toward more sustainable livelihoods.”
                </div>
              </div>
            </div>

            {/* Panel B: JOSEPH — FAITH IN CAPTIVITY */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                  <img
                    src={prisonOutreachImg}
                    alt="Joseph's inspiration: Compassionate prison ministry and restorative reintegration in Uganda"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D281A] text-yellow-300 text-xs font-mono font-bold">
                    PANEL B · THE PRISONER
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-yellow-300 uppercase tracking-widest">Genesis 39:20–23 &amp; 41:39–41</span>
                    <h3 className="font-serif font-bold text-xl text-white">Joseph — Faith in Captivity</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-2">
                    <div className="text-xs uppercase font-sans tracking-wider text-emerald-800 font-bold">
                      Heading: “Hope Beyond the Prison Walls”
                    </div>
                    <blockquote className="p-4 rounded-xl bg-emerald-50/70 border-l-4 border-emerald-700 font-serif italic text-stone-800 text-xs sm:text-sm leading-relaxed">
                      “Joseph’s master took him and put him in prison... But while Joseph was there in the prison, the Lord was with him; he showed him kindness and granted him favor in the eyes of the prison warden.”
                      <span className="block not-italic font-mono text-[11px] text-stone-500 font-normal mt-1">— Genesis 39:20–21</span>
                    </blockquote>
                  </div>

                  <div className="space-y-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                    <p>
                      Falsely accused and cast into an Egyptian dungeon, Joseph remained faithful to God. Even in the gloom of confinement, God was with him, showing him steadfast love and granting him favor. Joseph demonstrated integrity, service, and leadership until God brought him out into freedom, restoration, and national service.
                    </p>
                    <p>
                      We connect Joseph’s biblical experience directly to our correctional and reintegration outreach:
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside text-stone-700 pl-1">
                      <li><strong>Correctional visitation:</strong> Carrying the living Gospel into detention facilities.</li>
                      <li><strong>Pastoral counselling:</strong> Restoring self-worth, emotional healing, and moral clarity.</li>
                      <li><strong>Practical donations:</strong> Sanitary items, soap, blankets, and copies of Scripture.</li>
                      <li><strong>Post-release accompaniment:</strong> Family reconciliation and vocational enterprise packages.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Supporting Statement */}
              <div className="p-6 bg-stone-50 border-t border-stone-200">
                <div className="text-xs text-stone-700 leading-relaxed italic border-l-2 border-amber-600 pl-3">
                  “Joseph’s story reminds us that no person is beyond God’s presence, care or purpose. Even behind prison walls, there is room for faith, dignity, repentance and transformation. Through Gospel outreach, counselling and reintegration support, we seek to extend hope to those in captivity and walk with them as they return to their families and communities.”
                </div>
              </div>
            </div>

          </div>

          {/* Signature Connecting Statement Banner */}
          <div className="bg-[#0D281A] text-white rounded-3xl p-8 sm:p-12 border border-emerald-950 text-center space-y-4 shadow-md">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-yellow-300 font-bold">
              <Compass className="w-4 h-4 text-yellow-300" />
              <span>The Connecting Mandate</span>
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight max-w-3xl mx-auto leading-snug text-balance">
              “In the villages, we seek out the poor. In the prisons, we reach the captives.”
            </blockquote>

            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Isaac’s perseverance in cultivating the earth and Joseph’s unyielding faith within confinement unite in one mission. We refuse to separate physical bread from spiritual life: where poverty grips the soil, we teach productive cultivation; where incarceration imprisons the soul, we extend redemption, forgiveness, and new beginnings.
            </p>

            <div className="pt-2 text-[11px] text-stone-400 italic max-w-xl mx-auto border-t border-white/10">
              * The historical and biblical accounts of Isaac and Joseph serve as theological inspiration for the ministry’s vision, rather than historical claims of institutional continuity.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: OUR BIBLICAL FOUNDATION
            Heading: "A Calling Rooted in the Word of God"
            Scriptures: Luke 4:18–19, Isaiah 61:1, Isaiah 30:23
            ========================================================================= */}
        <section id="biblical-foundation" className="space-y-8 scroll-mt-24">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Scriptural Authority &amp; Divine Mandate
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              A Calling Rooted in the Word of God
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our ministry mandate does not originate in human ambition, but in the enduring counsel of Scripture. The Word of God explicitly joins the relief of physical poverty with the release and restoration of those in captivity.
            </p>
          </div>

          {/* Scripture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Luke 4:18-19 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-emerald-800 text-xs font-mono font-bold">
                  <span>LUKE 4:18–19</span>
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                </div>
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 leading-relaxed">
                  “The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord’s favor.”
                </blockquote>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                <strong className="text-stone-800">Christ’s Mission Manifesto:</strong> Proclaiming Good News to the impoverished and freedom to prisoners are foundational pillars of Jesus' earthly ministry.
              </div>
            </div>

            {/* Isaiah 61:1 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-emerald-800 text-xs font-mono font-bold">
                  <span>ISAIAH 61:1</span>
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                </div>
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 leading-relaxed">
                  “The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.”
                </blockquote>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
                <strong className="text-stone-800">The Prophetic Calling:</strong> Healing broken hearts, setting captives free, and bringing those sitting in confinement into light and hope.
              </div>
            </div>
          </div>

          {/* Foundational Reference: Isaiah 30:23 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-900 font-bold">
              <Wheat className="w-4 h-4 text-amber-800" />
              <span>Foundational Reference · Isaiah 30:23</span>
            </div>
            <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 leading-relaxed">
              “Then He will give you rain for the seed you sow in the ground, and the food that comes from the land will be rich and plentiful.”
            </blockquote>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-2">
              <strong className="text-stone-900">Connecting Sowing and Spiritual Renewal:</strong> God provides rain for the seed sown in the earth, and the harvest brings plentiful bread. When we teach a former inmate how to nurture crops, or supply vegetable starter kits to a widowed grandmother, the natural seed in the soil reflects the spiritual seed of God's Word in the heart.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: OUR MISSION
            Heading: "Our Mission: Preaching Good News, Empowering Lives"
            Preserve verbatim:
            “Preaching Good News to Poor and Captives through Farming Creativity and Gospel Outreach.”
            ========================================================================= */}
        <section id="our-mission" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Sovereign Purpose
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Our Mission: Preaching Good News, Empowering Lives
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our institutional compass is defined by a single, unvarnished mandate that guides every programme and village engagement.
            </p>
          </div>

          {/* Verbatim Mission Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-200 shadow-sm text-center space-y-6 relative overflow-hidden">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0D281A] text-yellow-300 flex items-center justify-center shadow-xs">
              <Cross className="w-7 h-7 text-yellow-300" />
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Official Verbatim Mission Statement
              </div>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-snug text-balance">
                “Preaching Good News to Poor and Captives through Farming Creativity and Gospel Outreach.”
              </blockquote>
            </div>

            <div className="pt-4 border-t border-stone-100 max-w-2xl mx-auto text-xs sm:text-sm text-stone-600 leading-relaxed">
              This statement captures our dual heartbeat: declaring the transformative truth of Jesus Christ while equipping communities with practical agrarian knowledge to overcome poverty with dignity.
            </div>

            {/* Two Practical Expressions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Wheat className="w-4 h-4 text-emerald-700" />
                  <span>1. Community Empowerment</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tackling household malnutrition and poverty through sustainable micro-farming, drought-tolerant seed rations, and village artisan skills.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>2. Gospel Outreach &amp; Reintegration</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ministering to incarcerated individuals with biblical truth, personal counselling, physical donations, and post-release restoration circles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: OUR PROGRAMMES
            Heading: "Faith Expressed Through Practical Action"
            Programmes:
            1. Farming Creativity
            2. Silage Chain Garden to Vulnerables
            3. Hof Manufacturing Circles in Villages
            4. Gospel Outreach (Demonstrating Gospel, Counselling, Donations, Rehab follow-up)
            Preserve exact titles, flag terminology for institutional confirmation.
            ========================================================================= */}
        <section id="our-programmes" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
                Programmatic Framework
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
                Faith Expressed Through Practical Action
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Our active initiatives translate biblical love into tangible, sustainable services for rural households and correctional communities.
              </p>
            </div>

            <div className="text-xs text-stone-500 max-w-xs bg-stone-100 p-3 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-700">Programme Integrity:</span> Official programme titles are preserved as supplied, with ongoing field verification.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Programme 1: Farming Creativity */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={greenhouseImg}
                    alt="Farming Creativity greenhouse nursery and bio-intensive farming in Uganda"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-950/75 text-yellow-300 text-[11px] font-mono">
                    Agriculture
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Farming Creativity
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Practical agrarian innovation introducing climate-adapted nursery domes, high-efficiency drip irrigation, organic composting, and micro-plot cultivation to convert subsistence farming into dignified productivity.
                  </p>
                  
                  <div className="space-y-1.5 pt-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-900">Key Components:</div>
                    <ul className="space-y-1 list-disc list-inside text-stone-600">
                      <li>Greenhouse dome nursery propagation</li>
                      <li>Water conservation &amp; drip systems</li>
                      <li>Resilient, drought-tolerant seed banks</li>
                      <li>Agro-apprentice practical training</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-4 text-[11px] text-stone-500">
                Hub demonstration located in Wakiso District with rural field deployments.
              </div>
            </div>

            {/* Programme 2: Silage Chain Garden to Vulnerables */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={starterKitImg}
                    alt="Silage Chain Garden to Vulnerables starter vegetable garden distributions"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-950/75 text-emerald-300 text-[11px] font-mono">
                    Vulnerabilities
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Silage Chain Garden to Vulnerables
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    A targeted food security system delivering doorstep nutrition gardens, forage management, and vegetable starter kits to widowed mothers, orphaned households, and frail elders.
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-900">Operational Focus:</div>
                    <ul className="space-y-1 list-disc list-inside text-stone-600">
                      <li>Fast-yielding vegetable seed kits</li>
                      <li>Backyard home silage &amp; forage care</li>
                      <li>Direct nutrition for vulnerable homes</li>
                      <li>Regular village monitoring visits</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terminology Notice */}
              <div className="p-3.5 mx-5 mb-5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Terminology Confirmation</span>
                </div>
                <p className="leading-tight text-stone-600 text-[10px]">
                  Programme title preserved as supplied. Full silage chain technical specifications remain subject to institutional confirmation.
                </p>
              </div>
            </div>

            {/* Programme 3: Hof Manufacturing Circles in Villages */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={vocationalImg}
                    alt="Hof Manufacturing Circles in Villages practical tools and vocational apprenticeship"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-950/75 text-yellow-300 text-[11px] font-mono">
                    Vocational
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Hof Manufacturing Circles in Villages
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Village-based vocational and artisan circles allowing youths, ex-inmates, and rural artisans to assemble farm tools, repair equipment, and establish micro-enterprises.
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-900">Key Pillars:</div>
                    <ul className="space-y-1 list-disc list-inside text-stone-600">
                      <li>Carpentry, metalcraft &amp; tailoring</li>
                      <li>Village tool maintenance &amp; fabrication</li>
                      <li>Cooperative production circles</li>
                      <li>Market access for village crafts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Terminology Notice */}
              <div className="p-3.5 mx-5 mb-5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Terminology Confirmation</span>
                </div>
                <p className="leading-tight text-stone-600 text-[10px]">
                  Specific institutional etymology of "Hof" is preserved as supplied, with ongoing clarification from leadership.
                </p>
              </div>
            </div>

            {/* Programme 4: Gospel Outreach */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={prisonOutreachImg}
                    alt="Gospel Outreach and prison accompaniment in Uganda"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-950/75 text-amber-300 text-[11px] font-mono">
                    Restoration
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Gospel Outreach &amp; Prison Ministry
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Comprehensive spiritual and practical outreach connecting correctional centers and village congregations through four dedicated ministry channels.
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-900">4 Core Dimensions:</div>
                    <ul className="space-y-1 text-stone-600">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Demonstrating the Gospel in deed</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Pastoral &amp; trauma counselling</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Humanitarian donations to prisons</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>12-month post-release follow-up</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-4 text-[11px] text-stone-500">
                Rebuilding hope and reducing recidivism through restorative fellowship.
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 6: THE PEOPLE WE SERVE
            Heading: "Eight Groups. One Commitment to Compassion."
            Eight Groups: Widows, Orphans, Youth, Inmates, Former Prisoners, Rural Pastors,
            Poor Rural / Pentecostal Village Churches, Elderly People and Poor Families in Rural Villages.
            ========================================================================= */}
        <section id="eight-groups" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Target Beneficiaries &amp; Priority Populations
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Eight Groups. One Commitment to Compassion.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our interventions focus intentionally on populations often overlooked or marginalized, providing each with Christ-centred dignity, practical empowerment, and long-term hope.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eightGroups.map((group, index) => {
              const IconComponent = group.icon;
              return (
                <div 
                  key={group.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-emerald-700 hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-[11px] text-stone-500 font-sans">
                        {group.context}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif font-bold text-stone-900 text-base">
                        {group.title}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Field Support</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: OUR COMMITMENT
            Heading: "Faith in Action. Hope in Practice."
            6 Core Commitments
            Concluding verbatim quote:
            “Our desire is to see faith demonstrated through meaningful service, vulnerable communities strengthened, and people facing difficult circumstances encouraged to discover hope and pursue a better future.”
            ========================================================================= */}
        <section id="our-commitment" className="space-y-8 bg-stone-100/70 rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-200 scroll-mt-24">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Ethical &amp; Operational Standards
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Faith in Action. Hope in Practice.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We hold ourselves accountable to God, our partners, and the communities we serve through six foundational operational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {/* 1. Faith in Action */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-emerald-700">01. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Faith in Action</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Believing that genuine faith produces physical works of mercy, agricultural diligence, and loving care for our neighbors (James 2:17).
              </p>
            </div>

            {/* 2. Dignity */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-amber-700">02. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Human Dignity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Affirming the intrinsic value of every person created in God’s image, regardless of background, economic hardship, or past imprisonment.
              </p>
            </div>

            {/* 3. Hope */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-emerald-700">03. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Living Hope</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Proclaiming that no life is beyond the redeeming love of Jesus Christ, and no community is too destitute to experience moral and economic renewal.
              </p>
            </div>

            {/* 4. Practical Support */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-amber-700">04. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Practical Support</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Providing tangible inputs: reliable seeds, micro-irrigation tools, vocational apprenticeships, prison care packages, and faithful pastoral presence.
              </p>
            </div>

            {/* 5. Sustainable Community Change */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-emerald-700">05. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Sustainable Community Change</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Designing initiatives that foster long-term self-reliance rather than perpetual dependency, building local capacity that endures for generations.
              </p>
            </div>

            {/* 6. Faithful Stewardship */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 shadow-xs">
              <div className="text-xs font-mono font-bold text-amber-700">06. COMMITMENT</div>
              <h3 className="font-serif font-bold text-stone-900 text-base">Faithful Stewardship</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Managing every donation, prayer, and partnership with strict statutory compliance, transparent accounting, and deep reverence before God.
              </p>
            </div>
          </div>

          {/* Exact Verbatim Concluding Quote */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 text-center space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
              Our Heartfelt Aspiration
            </div>
            <blockquote className="text-base sm:text-lg lg:text-xl font-serif italic text-stone-900 max-w-3xl mx-auto leading-relaxed">
              “Our desire is to see faith demonstrated through meaningful service, vulnerable communities strengthened, and people facing difficult circumstances encouraged to discover hope and pursue a better future.”
            </blockquote>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: CALL TO ACTION
            Heading: "Join Us in Putting Faith Into Action"
            Yellow DONATE NOW button as requested
            Working navigation and scroll destinations
            ========================================================================= */}
        <section id="call-to-action" className="bg-[#0D281A] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-950 relative overflow-hidden scroll-mt-24">
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-yellow-300 font-semibold">
              <Heart className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>Partner In God's Harvest</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight text-balance">
              Join Us in Putting Faith Into Action
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Whether you are an individual prayer partner, a church congregation, an agricultural supporter, or a volunteer, your partnership directly brings nutritional stability to rural households and Gospel transformation to prisoners.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {/* Yellow DONATE NOW Button as explicitly requested */}
              <button
                onClick={() => onNavigate('get-involved')}
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-bold text-sm tracking-wide rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-stone-950 text-stone-950" />
                <span>DONATE NOW</span>
              </button>

              <button
                onClick={() => onNavigate('programmes')}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Learn About Our Programmes</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact-registration')}
                className="px-6 py-4 bg-transparent hover:bg-white/10 text-stone-200 border border-white/15 font-semibold text-sm rounded-2xl transition-colors cursor-pointer"
              >
                <span>Contact the Organisation</span>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: CONTACT AND REGISTRATION
            Address: P.O. Box 177030, Kampala, Kigoogwa, Wakiso
            Permit number: IND0007369NB
            Bank details: Bank of Africa, Kawempe branch (Account: 08654280006)
            Handled discreetly with verification notes before public publication/transfer
            ========================================================================= */}
        <section id="contact-registration" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold">
              Institutional Compliance &amp; Verification
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
              Contact &amp; Registration
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Official statutory registration details, headquarters address, and verified banking channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Official Registration & Address Card (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Statutory Registration Information
                  </h3>
                  <div className="text-xs text-stone-500">Government of the Republic of Uganda · NGO Bureau</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Licensed NGO</span>
                </div>
              </div>

              {/* Verified Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-medium">Registered Organisation Name</span>
                  <div className="font-bold text-stone-900">IFHCFI ACE Hub</div>
                  <div className="text-[11px] text-stone-500">Aid Combat Empowerment Center Hub</div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-medium">NGO Permit Number</span>
                  <div className="font-mono font-bold text-stone-900 text-sm flex items-center justify-between">
                    <span>IND0007369NB</span>
                    <button
                      onClick={() => handleCopy('IND0007369NB', 'permit')}
                      className="p-1 rounded bg-stone-200/80 hover:bg-stone-300 text-stone-700 cursor-pointer"
                      title="Copy Permit Number"
                    >
                      {copiedKey === 'permit' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-stone-500">National Bureau for Non-Governmental Organisations</div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1 sm:col-span-2">
                  <span className="text-stone-500 font-medium">Official Postal &amp; Physical Address</span>
                  <div className="font-bold text-stone-900 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>P.O. Box 177030, Kampala, Kigoogwa, Wakiso, Uganda</span>
                  </div>
                  <div className="text-[11px] text-stone-500 pl-6">Operations centered in Wakiso District with countrywide outreach.</div>
                </div>
              </div>

              {/* Working Contact & Enquiry Form */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    Official Message &amp; Partnership Enquiry
                  </h4>
                  <span className="text-xs text-stone-500">Direct response from Wakiso desk</span>
                </div>

                {enquirySubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Enquiry Submitted Successfully</span>
                    </div>
                    <p>Your message has been registered with our team in Wakiso. We will respond promptly to your provided email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={enquiryName}
                          onChange={(e) => setEnquiryName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={enquiryEmail}
                          onChange={(e) => setEnquiryEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Area of Interest</label>
                      <select
                        value={enquiryTopic}
                        onChange={(e) => setEnquiryTopic(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                      >
                        <option value="general">General Enquiries &amp; Welcome</option>
                        <option value="partnership">Church &amp; Institutional Partnership</option>
                        <option value="prison-ministry">Prison Ministry &amp; Reintegration</option>
                        <option value="farming-creativity">Farming Creativity &amp; Seed Support</option>
                        <option value="financial">Financial Details &amp; Giving Verification</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Message *</label>
                      <textarea
                        required
                        rows={3}
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        placeholder="How can we assist or partner together in the Gospel?"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0D281A] hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Enquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Discreet Bank of Africa Kawempe Details Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#0D281A] text-white p-6 sm:p-8 rounded-3xl border border-emerald-950 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase text-yellow-300 font-bold">
                    Official Bank Details
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Bank of Africa, Kawempe Branch
                  </h3>
                </div>
                <Building2 className="w-5 h-5 text-yellow-300" />
              </div>

              {/* Discreet Information Notice */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2 text-stone-300 leading-relaxed">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Lock className="w-4 h-4 text-yellow-300" />
                  <span>Security &amp; Discreet Disclosure</span>
                </div>
                <p>
                  To prevent unauthorized diversion, please verify financial details directly with the IFHCFI ACE Hub administration before executing direct wire or mobile transfers.
                </p>
              </div>

              {/* Bank Details Container */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
                  <div className="text-[10px] text-stone-400 font-mono uppercase">Banking Institution</div>
                  <div className="font-bold text-stone-100 text-sm">Bank of Africa</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
                  <div className="text-[10px] text-stone-400 font-mono uppercase">Branch</div>
                  <div className="font-bold text-stone-100 text-sm">Kawempe Branch, Kampala</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
                  <div className="text-[10px] text-stone-400 font-mono uppercase">Account Name</div>
                  <div className="font-bold text-yellow-300 text-xs">
                    Aid Combat Empowerment Center Hub (IFHCFI ACE Hub)
                  </div>
                </div>

                {/* Account Number Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 border border-white/20 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {showBankDetails ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Hide Bank Account Digits</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Reveal Bank Account Digits</span>
                      </>
                    )}
                  </button>

                  {showBankDetails && (
                    <div className="mt-3 p-4 rounded-2xl bg-white/15 border border-yellow-300/30 text-xs space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-stone-300 font-mono uppercase">Account Number</span>
                        <button
                          onClick={() => handleCopy('08654280006', 'bank-acc')}
                          className="px-2 py-0.5 rounded bg-yellow-400 text-stone-950 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'bank-acc' ? <Check className="w-3 h-3 text-stone-950" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === 'bank-acc' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="font-mono text-base font-bold text-white tracking-wider">
                        08654280006
                      </div>
                      <p className="text-[11px] text-stone-300 italic pt-1 border-t border-white/10">
                        * Please verify these details with the organisation before executing any transfer.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Protocol Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-[11px] text-stone-300 space-y-2">
                <div className="font-semibold text-emerald-300">Donor Verification Protocol:</div>
                <p className="leading-relaxed">
                  Financial details are presented for transparent governance. All prospective donors and institutional partners are encouraged to confirm with the administrative desk prior to sending remittances.
                </p>
                <div className="pt-1 text-stone-400">
                  Headquarters: P.O. Box 177030, Kampala, Kigoogwa, Wakiso, Uganda
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
