import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight
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
      id: 'reintegration',
      label: 'Prison Justice & Reintegration',
    },
  ];

  const isProgrammesActive = ['programmes', 'starter-kits', 'reintegration'].includes(currentTab);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        viewMode === 'operations'
          ? 'bg-[#0D281A] border-b border-emerald-950/80 text-white'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-stone-200/60 shadow-xs'
      }`}
    >
      {/* Partnership Invitation Utility Ribbon */}
      <div 
        className={`py-1 sm:py-1.5 px-3 sm:px-8 border-b transition-colors duration-300 ${
          viewMode === 'operations'
            ? 'bg-black/40 backdrop-blur-sm text-stone-200 border-white/10'
            : 'bg-stone-50/75 backdrop-blur-xs text-stone-600 border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 overflow-hidden">
          {/* Partnership Message / Moving Ticker */}
          <div 
            className={`flex items-center gap-2 text-[11px] sm:text-xs font-medium min-w-0 flex-1 overflow-hidden relative ${
              viewMode === 'operations' ? 'text-stone-200' : 'text-stone-600'
            }`}
          >
            {/* Moving ticker: Right to Left animation */}
            <div className="overflow-hidden relative w-full flex items-center">
              <span className="animate-slide-left whitespace-nowrap">
                Empowering rural Ugandan smallholders, widows, youth &amp; reformed citizens through sustainable agriculture.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo - 3 consecutive clicks access the staff/admin sign-in page */}
        <div className="flex items-center">
          <a
            href="#home"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer py-0.5 select-none"
            aria-label="Home"
            title="IFHCFI Homepage"
          >
            <img
              src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
              alt="Isaac Faith and Hope Christian Farming Initiative"
              referrerPolicy="no-referrer"
              className="h-12 sm:h-14 md:h-15 w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105 active:scale-95 drop-shadow-xs"
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        {viewMode === 'public' ? (
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-medium text-stone-700">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-all whitespace-nowrap cursor-pointer py-1 ${
                currentTab === 'home'
                  ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                  : 'text-stone-700 hover:text-emerald-800'
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
                className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer py-1 ${
                  isAboutActive
                    ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                    : 'text-stone-700 hover:text-emerald-800'
                }`}
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                <span>About Us</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180 text-emerald-800' : 'text-stone-500'
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
                  <div className="w-64 bg-white border border-stone-200/90 rounded-2xl shadow-xl p-1.5 space-y-0.5">
                    {aboutSubItems.map((subItem) => {
                      const isItemActive = currentTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          role="menuitem"
                          onClick={() => handleNavClick(subItem.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isItemActive 
                              ? 'bg-emerald-50 text-emerald-950 font-bold' 
                              : 'hover:bg-stone-50 text-stone-700 hover:text-emerald-900'
                          }`}
                        >
                          <span className={`transition-colors ${isItemActive ? 'text-emerald-950 font-bold' : 'text-stone-800'}`}>
                            {subItem.label}
                          </span>
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
                className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer py-1 ${
                  isProgrammesActive
                    ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                    : 'text-stone-700 hover:text-emerald-800'
                }`}
                aria-expanded={programmesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Programmes</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    programmesDropdownOpen ? 'rotate-180 text-emerald-800' : 'text-stone-500'
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
                  <div className="w-68 bg-white border border-stone-200/90 rounded-2xl shadow-xl p-1.5 space-y-0.5">
                    {programmeSubItems.map((subItem) => {
                      const isItemActive = currentTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          role="menuitem"
                          onClick={() => handleNavClick(subItem.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isItemActive 
                              ? 'bg-emerald-50 text-emerald-950 font-bold' 
                              : 'hover:bg-stone-50 text-stone-700 hover:text-emerald-900'
                          }`}
                        >
                          <span className={`transition-colors ${isItemActive ? 'text-emerald-950 font-bold' : 'text-stone-800'}`}>
                            {subItem.label}
                          </span>
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
              className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer py-1 ${
                isAceHubActive
                  ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                  : 'text-stone-700 hover:text-emerald-800'
              }`}
            >
              <span>ACE Hub</span>
            </button>

            {/* Impact */}
            <button
              onClick={() => handleNavClick('impact')}
              className={`transition-all whitespace-nowrap cursor-pointer py-1 ${
                currentTab === 'impact'
                  ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                  : 'text-stone-700 hover:text-emerald-800'
              }`}
            >
              Impact
            </button>

            {/* Fact Sheet */}
            <button
              onClick={() => handleNavClick('fact-sheet')}
              className={`transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer py-1 ${
                currentTab === 'fact-sheet'
                  ? 'text-emerald-800 font-bold underline underline-offset-8 decoration-emerald-700 decoration-2'
                  : 'text-stone-700 hover:text-emerald-800'
              }`}
            >
              <span>Fact Sheet</span>
            </button>

            {/* Full CTA Button for Get Involved */}
            <button
              onClick={() => handleNavClick('get-involved')}
              className={`px-4.5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                currentTab === 'get-involved'
                  ? 'bg-[#0D281A] text-white ring-2 ring-emerald-600 ring-offset-2 ring-offset-white'
                  : 'bg-[#164E33] hover:bg-[#0D281A] text-white hover:text-white'
              }`}
            >
              <span>Get Involved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        ) : (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>Digital Operations &amp; Beneficiary Workspace</span>
          </div>
        )}

        {/* Mobile Toggle & Exit if in operations mode */}
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border cursor-pointer transition-colors ${
              viewMode === 'operations'
                ? 'text-white bg-emerald-900/80 border-emerald-700'
                : 'text-stone-800 hover:text-emerald-900 bg-stone-100/90 hover:bg-stone-200/90 border-stone-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu - Clean Vertical Layout */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 animate-in slide-in-from-top-2 duration-200 text-stone-800">
          <nav className="flex flex-col space-y-1.5">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'home'
                  ? 'bg-emerald-900 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
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
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
                }`}
                aria-expanded={mobileAboutExpanded}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    mobileAboutExpanded ? 'rotate-180 text-emerald-800' : ''
                  }`}
                />
              </button>

              {mobileAboutExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-stone-50/80 rounded-xl my-1 border-l-2 border-emerald-600 animate-in fade-in duration-150">
                  {aboutSubItems.map((subItem) => {
                    const isItemActive = currentTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isItemActive
                            ? 'text-emerald-900 font-bold bg-emerald-100/70'
                            : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
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
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
                }`}
                aria-expanded={mobileProgrammesExpanded}
              >
                <span>Programmes</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    mobileProgrammesExpanded ? 'rotate-180 text-emerald-800' : ''
                  }`}
                />
              </button>

              {mobileProgrammesExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-stone-50/80 rounded-xl my-1 border-l-2 border-emerald-600 animate-in fade-in duration-150">
                  {programmeSubItems.map((subItem) => {
                    const isItemActive = currentTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isItemActive
                            ? 'text-emerald-900 font-bold bg-emerald-100/70'
                            : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
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
                  ? 'bg-emerald-900 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
              }`}
            >
              <span>ACE Hub</span>
            </button>

            {/* 5. Impact */}
            <button
              onClick={() => handleNavClick('impact')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'impact'
                  ? 'bg-emerald-900 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
              }`}
            >
              <span>Impact</span>
            </button>

            {/* 6. Fact Sheet */}
            <button
              onClick={() => handleNavClick('fact-sheet')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                currentTab === 'fact-sheet'
                  ? 'bg-emerald-900 text-white font-bold shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100 hover:text-emerald-900'
              }`}
            >
              <span>Fact Sheet</span>
            </button>

            {/* 7. Get Involved CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('get-involved')}
                className={`w-full py-3.5 px-5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] ${
                  currentTab === 'get-involved'
                    ? 'bg-[#0D281A] text-white ring-2 ring-emerald-500'
                    : 'bg-[#164E33] hover:bg-[#0D281A] text-white'
                }`}
              >
                <span>Get Involved</span>
                <ArrowRight className="w-4 h-4" />
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

