/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DocumentGeneratorModal } from './components/DocumentGeneratorModal';
import { OperationsPortal } from './components/OperationsPortal';
import { OperationsLoginModal } from './components/OperationsLoginModal';

// Dedicated Page Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { FounderPage } from './pages/FounderPage';
import { VolunteersPage } from './pages/VolunteersPage';
import { MinistryProfilePage } from './pages/MinistryProfilePage';
import { CombatCenterPage } from './pages/CombatCenterPage';
import { AceHubPage } from './pages/AceHubPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { StarterKitsPage } from './pages/StarterKitsPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { ReintegrationPage } from './pages/ReintegrationPage';
import { TestBeforeYouTreatPage } from './pages/TestBeforeYouTreatPage';
import { ImpactPage } from './pages/ImpactPage';
import { FactSheetPage } from './pages/FactSheetPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';

// Admin Store Access
import { getAdminProgrammes, AdminProgramme } from './data/adminStore';
import { initScrollReveal } from './utils/scrollReveal';

export type PageId = 
  | 'home' 
  | 'about' 
  | 'who-we-are'
  | 'vision-mission'
  | 'founder'
  | 'volunteers'
  | 'ministry-profile'
  | 'ace-hub'
  | 'combat-center' 
  | 'programmes' 
  | 'starter-kits'
  | 'test-before-you-treat'
  | 'programme-detail'
  | 'reintegration' 
  | 'impact' 
  | 'fact-sheet' 
  | 'get-involved';

interface RouteParseResult {
  page: PageId;
  programmeId?: string;
}

function parseRoute(hash: string): RouteParseResult {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'ace-hub' || clean === 'ace' || clean === 'hub' || clean === 'combat-center') {
    return { page: 'ace-hub' };
  }

  // Aliases for About subpages
  if (clean === 'who-we-are' || clean === 'whoweare') {
    return { page: 'who-we-are' };
  }
  if (clean === 'vision-mission' || clean === 'vision' || clean === 'mission' || clean === 'values') {
    return { page: 'vision-mission' };
  }
  if (clean === 'founder' || clean === 'about-founder' || clean === 'titus' || clean === 'leadership') {
    return { page: 'founder' };
  }
  if (clean === 'volunteers' || clean === 'volunteer' || clean === 'voluteers') {
    return { page: 'volunteers' };
  }
  if (clean === 'ministry-profile' || clean === 'ministry' || clean === 'profile') {
    return { page: 'ministry-profile' };
  }
  if (clean === 'starter-kits' || clean === 'starter-kit' || clean === 'agricultural-starter-kits' || clean === 'farmer-starter-kits' || clean === 'kits') {
    return { page: 'starter-kits' };
  }
  if (
    clean === 'test-before-you-treat' ||
    clean === 'test-before-treat' ||
    clean === 'testbeforeyoutreat' ||
    clean === 'diagnostic-lab' ||
    clean === 'lab' ||
    clean === 'testing'
  ) {
    return { page: 'test-before-you-treat' };
  }

  // Check for dynamic programme routes (e.g. #programme-prog-1 or #programme-prog-1712... or #programmes/...)
  if (clean.startsWith('programme-') || clean.startsWith('programmes/')) {
    const rawId = hash.replace(/^#\/?/, '').replace(/^programme[s]?[/-]/, '');
    if (rawId === 'combat-center' || rawId === 'ace-hub') {
      return { page: 'ace-hub' };
    }
    return { page: 'programme-detail', programmeId: rawId };
  }

  const validPages: PageId[] = [
    'home',
    'about',
    'who-we-are',
    'vision-mission',
    'founder',
    'volunteers',
    'ministry-profile',
    'ace-hub',
    'combat-center',
    'programmes',
    'starter-kits',
    'test-before-you-treat',
    'reintegration',
    'impact',
    'fact-sheet',
    'get-involved',
  ];
  if (validPages.includes(clean as PageId)) {
    return { page: clean as PageId };
  }
  return { page: 'home' };
}

export default function App() {
  const [viewMode, setViewMode] = useState<'public' | 'operations'>('public');
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseRoute(window.location.hash).page;
    }
    return 'home';
  });
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseRoute(window.location.hash).programmeId || null;
    }
    return null;
  });

  const [showDocModal, setShowDocModal] = useState<boolean>(false);
  const [showOpsLoginModal, setShowOpsLoginModal] = useState<boolean>(false);
  const [isOpsAuthenticated, setIsOpsAuthenticated] = useState<boolean>(false);

  // Sync hash routing on window back/forward events
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRoute(window.location.hash);
      setCurrentPage(route.page);
      setSelectedProgrammeId(route.programmeId || null);
      setViewMode('public');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize premium scroll-reveal observer across all pages
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, [currentPage]);

  // Smooth page navigation helper
  const navigateTo = (target: string) => {
    const route = parseRoute(target);
    setCurrentPage(route.page);
    setSelectedProgrammeId(route.programmeId || null);
    setViewMode('public');

    const cleanHash = target.replace(/^#/, '');
    window.location.hash = cleanHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Operations Portal with password authentication (default 1234)
  const handleOpenOperationsPortal = () => {
    if (isOpsAuthenticated) {
      setViewMode('operations');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowOpsLoginModal(true);
    }
  };

  const handleOpsLoginSuccess = () => {
    setIsOpsAuthenticated(true);
    setShowOpsLoginModal(false);
    setViewMode('operations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve current active programme if in programme-detail view
  const currentProgramme: AdminProgramme | undefined = (() => {
    if (!selectedProgrammeId) return undefined;
    const allProgs = getAdminProgrammes();
    return allProgs.find(
      p => p.id === selectedProgrammeId || p.id.toLowerCase() === selectedProgrammeId.toLowerCase()
    );
  })();

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans">
      {/* Top Primary Bar & Utility Ribbon */}
      <Navbar
        currentTab={currentPage === 'programme-detail' ? 'programmes' : currentPage}
        setCurrentTab={navigateTo}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenDocModal={() => setShowDocModal(true)}
        onOpenDonateModal={() => navigateTo('get-involved')}
        onOpenOperationsPortal={handleOpenOperationsPortal}
      />

      {/* Main View Area */}
      <main className={`flex-1 ${currentPage === 'home' && viewMode === 'public' ? 'pt-0' : 'pt-20 sm:pt-24'}`}>
        {viewMode === 'operations' ? (
          /* Internal Operations & Upgraded Admin Workspace */
          <OperationsPortal
            onReturnToPublic={() => setViewMode('public')}
            onOpenDocModal={() => setShowDocModal(true)}
            onPreviewProgrammeOnSite={(progId) => navigateTo(`programme-${progId}`)}
          />
        ) : (
          /* Multi-Page Public View Routing */
          <>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
                onOpenOperationsPortal={handleOpenOperationsPortal}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'who-we-are' && (
              <WhoWeArePage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'vision-mission' && (
              <VisionMissionPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'founder' && (
              <FounderPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'volunteers' && (
              <VolunteersPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'ministry-profile' && (
              <MinistryProfilePage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {(currentPage === 'ace-hub' || currentPage === 'combat-center') && (
              <AceHubPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'programmes' && (
              <ProgrammesPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'starter-kits' && (
              <StarterKitsPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'test-before-you-treat' && (
              <TestBeforeYouTreatPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {/* Reusable Automatic Dedicated Programme Page */}
            {currentPage === 'programme-detail' && currentProgramme && (
              <ProgrammeDetailPage
                programme={currentProgramme}
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'programme-detail' && !currentProgramme && (
              <ProgrammesPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'reintegration' && (
              <ReintegrationPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'impact' && (
              <ImpactPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}

            {currentPage === 'fact-sheet' && (
              <FactSheetPage
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'get-involved' && (
              <GetInvolvedPage
                onNavigate={navigateTo}
                onOpenDocModal={() => setShowDocModal(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Document Portfolio & Concept Note Generator Modal */}
      <DocumentGeneratorModal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
      />

      {/* Restricted Operations Portal Login Modal */}
      <OperationsLoginModal
        isOpen={showOpsLoginModal}
        onClose={() => setShowOpsLoginModal(false)}
        onSuccess={handleOpsLoginSuccess}
      />

      {/* Institutional Footer */}
      <Footer
        onOpenDocModal={() => setShowDocModal(true)}
        onOpenDonateModal={() => navigateTo('get-involved')}
        onSelectNav={navigateTo}
        onOpenOperationsPortal={handleOpenOperationsPortal}
      />
    </div>
  );
}
