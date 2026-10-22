import React, { useRef } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Mail, 
  Share2 
} from 'lucide-react';

interface FooterProps {
  onOpenDocModal: () => void;
  onOpenDonateModal: () => void;
  onSelectNav: (tab: string) => void;
  onOpenOperationsPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDocModal,
  onOpenDonateModal,
  onSelectNav,
  onOpenOperationsPortal,
}) => {
  const logoClicksRef = useRef<number[]>([]);

  // 3 consecutive clicks on the logo accesses the Admin & Operations sign-in page
  const handleLogoClick = () => {
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

  return (
    <footer className="bg-[#0D281A] text-stone-300 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand & Mandate */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <img
                src="https://i.postimg.cc/LXQmgcGV/ifhcfi-modern-logo-hand-defined-(1).png"
                alt="Isaac Faith and Hope Christian Farming Initiative"
                referrerPolicy="no-referrer"
                onClick={handleLogoClick}
                className="h-14 sm:h-16 md:h-18 w-auto max-w-[220px] object-contain brightness-0 invert cursor-pointer hover:opacity-85 transition-opacity select-none active:scale-95"
                title="IFHCFI"
              />
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              <strong className="text-white">Isaac Faith and Hope Christian Farming Initiative</strong> is an indigenous, faith-based Ugandan NGO empowering vulnerable populations through sustainable agriculture, practical vocational skills, prison rehabilitation, and community transformation.
            </p>

            {/* Social Media Handles */}
            <div className="pt-2 space-y-2.5">
              <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>Connect With Us</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-300 hover:text-white border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  title="Facebook: @ifhcfi_uganda"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-300 hover:text-white border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  title="X (Twitter): @ifhcfi_uganda"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-300 hover:text-white border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  title="Instagram: @ifhcfi_uganda"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-300 hover:text-white border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  title="YouTube: @ifhcfi_uganda"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-300 hover:text-white border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs"
                  title="LinkedIn: @ifhcfi_uganda"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <div className="text-xs font-mono text-emerald-300/90 space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400">Socials:</span>
                  <span className="text-white font-medium">@ifhcfi_uganda</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>contact@ifhcfi.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Pages &amp; Directories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onSelectNav('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home &amp; Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium"
                >
                  About IFHCFI
                </button>
                <div className="pl-2 pt-1 space-y-1 text-[11px] text-stone-400">
                  <div>
                    <button
                      onClick={() => onSelectNav('who-we-are')}
                      className="hover:text-emerald-300 transition-colors cursor-pointer text-left"
                    >
                      • Who We Are
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSelectNav('vision-mission')}
                      className="hover:text-emerald-300 transition-colors cursor-pointer text-left"
                    >
                      • Vision, Mission &amp; Values
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSelectNav('founder')}
                      className="hover:text-emerald-300 transition-colors cursor-pointer text-left"
                    >
                      • About the Founder
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSelectNav('volunteers')}
                      className="hover:text-emerald-300 transition-colors cursor-pointer text-left"
                    >
                      • Volunteers
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSelectNav('ministry-profile')}
                      className="hover:text-emerald-300 transition-colors cursor-pointer text-left"
                    >
                      • Ministry Profile
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('programmes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  12 Core Programmes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('starter-kits')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Agricultural Starter Kit System
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('test-before-you-treat')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Test before you treat (Laboratory)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('combat-center')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Combat Center Masterplan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('reintegration')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  12-Month Justice Reintegration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('impact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Annual Targets &amp; Monitoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNav('fact-sheet')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-emerald-300"
                >
                  Fact Sheet &amp; PDF Library
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Flagship Facilities
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>Main Training Hall (Vocational)</li>
              <li>Dome Farm Unit (Greenhouse)</li>
              <li>Livestock Breeding Farm</li>
              <li>Store &amp; Counseling Office</li>
              <li>Integrated Rainwater Systems</li>
              <li className="pt-2 text-[11px] text-stone-400">
                Wakiso District Hub, Uganda
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Isaac Faith and Hope Christian Farming Initiative. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Copyright, rights reserved</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Uganda NGO Bureau Licensed</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-stone-400 hover:text-white transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
