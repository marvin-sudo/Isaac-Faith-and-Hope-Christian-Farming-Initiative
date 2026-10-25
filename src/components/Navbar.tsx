import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Mail,
  MapPin,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'public' | 'operations';
  setViewMode: (mode: 'public' | 'operations') => void;
  onOpenDocModal?: () => void;
  onOpenDonateModal?: () => void;
  onOpenOperationsPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  viewMode,
  setViewMode,
  onOpenDocModal,
  onOpenDonateModal,
  onOpenOperationsPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileProgrammesExpanded, setMobileProgrammesExpanded] = useState(false);
  const [programmesDropdownOpen, setProgrammesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const logoClicksRef = useRef<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProgrammesDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setViewMode('public');
    setCurrentTab(id);
    setMobileMenuOpen(false);
    setProgrammesDropdownOpen(false);
    setAboutDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3 consecutive clicks on the brand logo accesses the Staff/Admin Sign-in Page
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavClick('home');

    const now = Date.now();
    const recent = [...logoClicksRef.current.filter((t) => now - t < 2000), now];
    logoClicksRef.current = recent;

    if (recent.length >= 3) {
      logoClicksRef.current = [];
      if (onOpenOperationsPortal) {
        onOpenOperationsPortal();
      }
    }
  };

  // About Us dropdown items
  const aboutSubItems = [
    {
      id: 'who-we-are',
      label: 'Who We Are',
    },
    {
      id: 'vision-mission',
      label: 'Vision, Mission & Core Values',
    },
    {
      id: 'founder',
      label: 'About the Founder',
    },
    {
      id: 'volunteers',
      label: 'Volunteers',
    },
    {
      id: 'ministry-profile',
      label: 'Ministry Profile',
    },
  ];

  const isAboutActive = ['about', 'who-we-are', 'vision-mission', 'founder', 'volunteers', 'ministry-profile'].includes(currentTab);
  const isAceHubActive = ['ace-hub', 'combat-center'].includes(currentTab);

  // Programmes dropdown items (core initiatives)
  const programmeSubItems = [
    {
      id: 'programmes',
      label: 'All Programmes Directory',
    },
    {
      id: 'starter-kits',
      label: 'Agricultural Starter Kit System',
    },
    {
      id: 'test-before-you-treat',
      label: 'Test before you treat',
    },
    {
      id: 'reintegration',
      label: 'Prison Justice & Reintegration',
    },
  ];

  const isProgrammesActive = ['programmes', 'starter-kits', 'test-before-you-treat', 'reintegration'].includes(currentTab);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        viewMode === 'operations'
          ? 'bg-[#0D281A] border-b border-emerald-950/80 text-white'
          : isScrolled
          ? 'bg-[#0B251A]/95 backdrop-blur-md shadow-md py-1'
          : 'bg-[#0B251A] py-1.5'
      }`}
    >
      {/* 
        Top Slim Utility Strip (Reference Design Header Top Bar)
      */}
      {viewMode === 'public' && (
        <div className="hidden sm:block border-b border-emerald-950/70 text-[12px] text-stone-300 px-4 sm:px-8 py-1">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-300/90">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Wakiso District, Uganda</span>
              </span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>contact@ifhcfi.org</span>
              </span>
              <span className="hidden lg:inline text-stone-400 font-mono text-[11px]">
                Permit: INDP0007369NB • NGO Reg: MIA/NB/2026/03/7369
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-[11px]">Follow us:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <Facebook className="w-3 h-3" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <Twitter className="w-3 h-3" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <Instagram className="w-3 h-3" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <Youtube className="w-3 h-3" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        Main Navigation Bar:
        Vibrant Warm Orange Pill Navigation Container matching Reference Screenshot
      */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1">
        <div
          className={`transition-all duration-300 ${
            viewMode === 'operations'
              ? 'flex items-center justify-between py-2 px-4 bg-emerald-950/60 rounded-xl'
              : 'bg-gradient-to-r from-[#ea580c] via-[#f05a22] to-[#f97316] text-white shadow-lg shadow-orange-950/20 rounded-2xl lg:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3'
          }`}
        >
          {/* Brand Logo - 3 consecutive clicks access the staff/admin sign-in page */}
          <div className="flex items-center shrink-0">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="flex items-center group cursor-pointer select-none py-0.5"
              aria-label="Home"
              title="IFHCFI Homepage"
            >
              <div className="bg-white/95 px-3 py-1 rounded-full shadow-xs flex items-center group-hover:bg-white transition-all">
                <img
                  src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
                  alt="Isaac Faith and Hope Christian Farming Initiative"
                  referrerPolicy="no-referrer"
                  className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-transform group-hover:scale-105 active:scale-95"
                />
              </div>
            </a>
          </div>

          {/* 
            Desktop Navigation Links:
            Font size noticeably increased to text-sm lg:text-[15px] font-semibold text-white
            for high clarity and visibility on desktop site
          */}
          {viewMode === 'public' ? (
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-[15px] font-semibold text-white tracking-wide">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-all whitespace-nowrap cursor-pointer px-3 py-1.5 rounded-full ${
                  currentTab === 'home'
                    ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                    : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                }`}
              >
                Home
              </button>

              {/* About Us Dropdown */}
              <div 
                ref={aboutDropdownRef}
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full ${
                    isAboutActive
                      ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                      : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                  }`}
                  aria-expanded={aboutDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>About Us</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      aboutDropdownOpen ? 'rotate-180 text-amber-200' : 'text-white/80'
                    }`} 
                  />
                </button>

                {/* Dropdown Menu Panel - Clean Vertical Styling */}
                {aboutDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                    aria-label="About Us"
                  >
                    <div className="w-68 bg-white border border-stone-200 rounded-2xl shadow-2xl p-2 space-y-1 text-stone-800">
                      {aboutSubItems.map((subItem) => {
                        const isItemActive = currentTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            role="menuitem"
                            onClick={() => handleNavClick(subItem.id)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                              isItemActive 
                                ? 'bg-orange-50 text-orange-950 font-bold border-l-3 border-orange-600' 
                                : 'hover:bg-stone-50 text-stone-700 hover:text-orange-700'
                            }`}
                          >
                            <span>{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Programmes Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setProgrammesDropdownOpen(true)}
                onMouseLeave={() => setProgrammesDropdownOpen(false)}
              >
                <button
                  onClick={() => setProgrammesDropdownOpen(!programmesDropdownOpen)}
                  className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full ${
                    isProgrammesActive
                      ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                      : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                  }`}
                  aria-expanded={programmesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Programmes</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      programmesDropdownOpen ? 'rotate-180 text-amber-200' : 'text-white/80'
                    }`} 
                  />
                </button>

                {/* Dropdown Menu Panel - Clean Vertical Styling */}
                {programmesDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                    aria-label="Programmes and Facilities"
                  >
                    <div className="w-72 bg-white border border-stone-200 rounded-2xl shadow-2xl p-2 space-y-1 text-stone-800">
                      {programmeSubItems.map((subItem) => {
                        const isItemActive = currentTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            role="menuitem"
                            onClick={() => handleNavClick(subItem.id)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                              isItemActive 
                                ? 'bg-orange-50 text-orange-950 font-bold border-l-3 border-orange-600' 
                                : 'hover:bg-stone-50 text-stone-700 hover:text-orange-700'
                            }`}
                          >
                            <span>{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Dedicated ACE Hub Nav Item */}
              <button
                onClick={() => handleNavClick('ace-hub')}
                className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full ${
                  isAceHubActive
                    ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                    : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                }`}
              >
                <span>ACE Hub</span>
              </button>

              {/* Impact */}
              <button
                onClick={() => handleNavClick('impact')}
                className={`transition-all whitespace-nowrap cursor-pointer px-3 py-1.5 rounded-full ${
                  currentTab === 'impact'
                    ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                    : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                }`}
              >
                Impact
              </button>

              {/* Fact Sheet */}
              <button
                onClick={() => handleNavClick('fact-sheet')}
                className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full ${
                  currentTab === 'fact-sheet'
                    ? 'bg-white/25 text-white font-bold shadow-inner ring-1 ring-white/30'
                    : 'text-white/90 hover:text-amber-200 hover:bg-white/10'
                }`}
              >
                <span>Fact Sheet</span>
              </button>

              {/* Full High-Contrast Pill CTA Button for DONATE NOW */}
              <button
                onClick={() => handleNavClick('get-involved')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs lg:text-sm tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  currentTab === 'get-involved'
                    ? 'bg-yellow-400 text-stone-950 ring-2 ring-yellow-400 ring-offset-2 ring-offset-orange-600'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-stone-950'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current text-stone-950" />
                <span>DONATE NOW</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            </nav>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>Digital Operations &amp; Beneficiary Workspace</span>
            </div>
          )}

          {/* Right Action Cluster: Tablet Donate Button + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {viewMode === 'operations' && (
              <button
                onClick={() => setViewMode('public')}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-900 text-white border border-emerald-700 cursor-pointer flex items-center gap-1.5 hover:bg-emerald-800"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Exit to Public Site</span>
              </button>
            )}

            {/* Tablet Donate Button - Visible on tablet viewports directly in the top nav bar as requested */}
            {viewMode === 'public' && (
              <button
                onClick={() => handleNavClick('get-involved')}
                className={`hidden sm:inline-flex lg:hidden px-4 py-2 rounded-full font-bold text-xs tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer items-center gap-1.5 active:scale-95 ${
                  currentTab === 'get-involved'
                    ? 'bg-yellow-400 text-stone-950 ring-2 ring-yellow-400'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-stone-950'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current text-stone-950" />
                <span>DONATE NOW</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl cursor-pointer transition-colors ${
                viewMode === 'operations'
                  ? 'text-white bg-emerald-900/80 border border-emerald-700'
                  : 'text-white hover:text-amber-200 bg-white/20 hover:bg-white/30 border border-white/30'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu - Clean Vertical Layout */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 animate-in slide-in-from-top-2 duration-200 text-stone-800">
          <nav className="flex flex-col space-y-1.5">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'home'
                  ? 'bg-orange-600 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
              }`}
            >
              <span>Home</span>
            </button>

            {/* 2. About Us - Vertical Dropdown Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  isAboutActive && !mobileAboutExpanded
                    ? 'bg-orange-50 text-orange-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
                }`}
                aria-expanded={mobileAboutExpanded}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    mobileAboutExpanded ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {mobileAboutExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-stone-50/80 rounded-xl my-1 border-l-2 border-orange-500 animate-in fade-in duration-150">
                  {aboutSubItems.map((subItem) => {
                    const isItemActive = currentTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isItemActive
                            ? 'text-orange-950 font-bold bg-orange-100/70'
                            : 'text-stone-700 hover:text-orange-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Programmes - Vertical Dropdown Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileProgrammesExpanded(!mobileProgrammesExpanded)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  isProgrammesActive && !mobileProgrammesExpanded
                    ? 'bg-orange-50 text-orange-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
                }`}
                aria-expanded={mobileProgrammesExpanded}
              >
                <span>Programmes</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    mobileProgrammesExpanded ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {mobileProgrammesExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-stone-50/80 rounded-xl my-1 border-l-2 border-orange-500 animate-in fade-in duration-150">
                  {programmeSubItems.map((subItem) => {
                    const isItemActive = currentTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isItemActive
                            ? 'text-orange-950 font-bold bg-orange-100/70'
                            : 'text-stone-700 hover:text-orange-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. ACE Hub */}
            <button
              onClick={() => handleNavClick('ace-hub')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                isAceHubActive
                  ? 'bg-orange-600 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
              }`}
            >
              <span>ACE Hub</span>
            </button>

            {/* 5. Impact */}
            <button
              onClick={() => handleNavClick('impact')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'impact'
                  ? 'bg-orange-600 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
              }`}
            >
              <span>Impact</span>
            </button>

            {/* 6. Fact Sheet */}
            <button
              onClick={() => handleNavClick('fact-sheet')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'fact-sheet'
                  ? 'bg-orange-600 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-orange-600'
              }`}
            >
              <span>Fact Sheet</span>
            </button>

            {/* 7. DONATE NOW CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('get-involved')}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] ${
                  currentTab === 'get-involved'
                    ? 'bg-yellow-400 text-stone-950 ring-2 ring-yellow-500'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-stone-950'
                }`}
              >
                <Heart className="w-4 h-4 fill-current text-stone-950" />
                <span>DONATE NOW</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>
            </div>
          </nav>

          {/* Institutional Credibility Badge & Operations Link */}
          <div className="pt-4 mt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Reg: 80034969248231 • Non-Profit Christian Initiative • Wakiso District, Uganda</span>
            </div>

            {viewMode === 'operations' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setViewMode('public');
                }}
                className="w-full sm:w-auto py-1.5 px-3 rounded-lg bg-emerald-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Return to Public Site</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
