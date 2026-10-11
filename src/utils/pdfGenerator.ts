import jsPDF from 'jspdf';
import { 
  OFFICIAL_REGISTRATION, 
  FINANCIAL_TARGETS, 
  OFFICIAL_LEADERSHIP, 
  PARTNER_PRISONS,
  CORE_FACILITIES,
  ANNUAL_TARGETS,
  CORE_PROGRAMMES
} from '../data/organizationData';

export type DocType = 'profile' | 'concept-note' | 'reintegration' | 'starter-kit' | 'all';

export function generateAndDownloadPDF(docType: DocType = 'all') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryColor: [number, number, number] = [6, 78, 59]; // Dark Forest Green / Teal
  const accentGold: [number, number, number] = [180, 130, 20]; // Gold/Ochre
  const textDark: [number, number, number] = [30, 41, 59]; // Slate 800
  const textMuted: [number, number, number] = [100, 116, 139]; // Slate 500
  const bgLight: [number, number, number] = [248, 250, 252];
  const borderLight: [number, number, number] = [226, 232, 240];

  let currentY = margin;

  const addHeader = (title: string, subheader: string) => {
    // Top colored banner
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('ISAAC FAITH AND HOPE CHRISTIAN FARMING INITIATIVE (IFHCFI)', margin, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('REPUBLIC OF UGANDA REG. NO: MIA/NB/2026/03/7369 · PERMIT NO: INDP0007369NB', margin, 18);

    // Document Title Box
    currentY = 32;
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(title, margin, currentY);

    currentY += 6;
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(subheader, margin, currentY);

    currentY += 4;
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 6;
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('Official Verified Institutional Record · Authorized Countrywide across Uganda', margin, pageHeight - 8);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 18, pageHeight - 8);
  };

  const checkPageBreak = (neededHeight: number, titleForNewPage?: string) => {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      if (titleForNewPage) {
        addHeader(titleForNewPage, 'Official Institutional Fact Sheet & Portfolio Record');
      } else {
        currentY = margin + 10;
      }
    }
  };

  // Section 1: Institutional Profile & Legal Verification Box
  if (docType === 'profile' || docType === 'all') {
    addHeader('OFFICIAL INSTITUTIONAL FACT SHEET', 'Government Registered Non-Governmental Organization (NGO)');

    // Official Verification Card
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.roundedRect(margin, currentY, contentWidth, 34, 2, 2, 'F');
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(margin, currentY, contentWidth, 34, 2, 2, 'S');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('VERIFIED LEGAL CREDENTIALS & STATUTORY STATUS', margin + 4, currentY + 6);

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);

    const col1X = margin + 4;
    const col2X = margin + 88;

    doc.text(`Entity Type: ${OFFICIAL_REGISTRATION.entityType}`, col1X, currentY + 12);
    doc.text(`Registration File No: ${OFFICIAL_REGISTRATION.registrationFileNo}`, col1X, currentY + 17);
    doc.text(`Permit Number: ${OFFICIAL_REGISTRATION.permitNo}`, col1X, currentY + 22);
    doc.text(`Permit Duration: ${OFFICIAL_REGISTRATION.permitDuration} (From ${OFFICIAL_REGISTRATION.commencementDate})`, col1X, currentY + 27);

    doc.text(`Operational Scope: ${OFFICIAL_REGISTRATION.operationalArea}`, col2X, currentY + 12);
    doc.text(`Flagship Center: ${OFFICIAL_REGISTRATION.flagshipLocation}`, col2X, currentY + 17);
    doc.text(`Legal Status: ${OFFICIAL_REGISTRATION.status}`, col2X, currentY + 22);
    doc.text(`Target Focus: Smallholders, Youth, Widows & Ex-Inmates`, col2X, currentY + 27);

    currentY += 40;

    // Executive Mandate & Development Model
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('1. Executive Mandate & Core Development Model', margin, currentY);
    currentY += 5;

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    const mandateText = 
      'The Isaac Faith and Hope Christian Farming Initiative (IFHCFI) is an indigenous, faith-based ' +
      'non-governmental organisation incorporated and officially registered in the Republic of Uganda. ' +
      'IFHCFI works at the intersection of climate-smart agriculture, practical vocational training, prison ministry ' +
      'rehabilitation, and community economic resilience.\n\n' +
      'Holistic Development Model: Faith + Skills + Agriculture + Livelihoods + Family Support + Rehabilitation + Community Development.';

    const splitMandate = doc.splitTextToSize(mandateText, contentWidth);
    doc.text(splitMandate, margin, currentY);
    currentY += splitMandate.length * 4.5 + 4;

    // Annual Targets Matrix
    checkPageBreak(45);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('2. Documented Annual Operational Targets', margin, currentY);
    currentY += 5;

    // 4 Metric cards in a 2x2 grid
    const cardW = (contentWidth - 6) / 2;
    const cardH = 18;

    ANNUAL_TARGETS.forEach((target, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const x = margin + col * (cardW + 6);
      const y = currentY + row * (cardH + 4);

      doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
      doc.roundedRect(x, y, cardW, cardH, 1.5, 1.5, 'F');
      doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
      doc.roundedRect(x, y, cardW, cardH, 1.5, 1.5, 'S');

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(target.target, x + 3, y + 5);

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(target.category, x + 3, y + 10);

      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      const shortDesc = doc.splitTextToSize(target.description, cardW - 6)[0] || '';
      doc.text(shortDesc, x + 3, y + 15);
    });

    currentY += (Math.ceil(ANNUAL_TARGETS.length / 2)) * (cardH + 4) + 6;

    // Leadership Roster
    checkPageBreak(50);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('3. Verified Leadership & Governance Roster', margin, currentY);
    currentY += 5;

    const leaderColW = (contentWidth - 6) / 2;
    OFFICIAL_LEADERSHIP.forEach((member, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = margin + col * (leaderColW + 6);
      const y = currentY + row * 13;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
      doc.roundedRect(x, y, leaderColW, 11, 1, 1, 'S');

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(member.name, x + 3, y + 4.5);

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(member.role, x + 3, y + 8.5);
    });

    currentY += Math.ceil(OFFICIAL_LEADERSHIP.length / 2) * 13 + 6;
  }

  // Section 2: Combat Center Concept Note
  if (docType === 'concept-note' || docType === 'all') {
    if (docType === 'all') {
      doc.addPage();
    }
    addHeader('COMBAT EMPOWERMENT CENTER CONCEPT NOTE', 'Flagship Multi-Purpose Hub · Wakiso District, Uganda');

    // Budget Box
    doc.setFillColor(236, 253, 245); // Emerald 50
    doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'F');
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'S');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('FINANCIAL ARCHITECTURE & BUDGET TIERS', margin + 4, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Total Projected 5-Year Masterplan Cost: USD $3,000,000 (UGX 11,250,000,000)`, margin + 4, currentY + 11.5);
    doc.text(`Initial Phase Setup Priority (Seed Capital): UGX 105,000,000 (Approx. USD $28,000)`, margin + 4, currentY + 16.5);

    currentY += 28;

    // Integrated Facilities
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Integrated 5-Facility Operational Architecture', margin, currentY);
    currentY += 5;

    CORE_FACILITIES.forEach((fac) => {
      checkPageBreak(25);
      doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
      doc.roundedRect(margin, currentY, contentWidth, 20, 1.5, 1.5, 'F');
      doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
      doc.roundedRect(margin, currentY, contentWidth, 20, 1.5, 1.5, 'S');

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(fac.name, margin + 4, currentY + 5);

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      const splitPurpose = doc.splitTextToSize(`Purpose: ${fac.purpose}`, contentWidth - 8);
      doc.text(splitPurpose[0] || '', margin + 4, currentY + 10);

      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.8);
      doc.text(`Role: ${fac.operationalRole}`, margin + 4, currentY + 15.5);

      currentY += 23;
    });
  }

  // Section 3: 12-Month Reintegration Framework
  if (docType === 'reintegration' || docType === 'all') {
    if (docType === 'all') {
      doc.addPage();
    }
    addHeader('12-MONTH POST-RELEASE REINTEGRATION FRAMEWORK', 'Justice Ministry, Ex-Inmate Rehabilitation & Anti-Recidivism Protocol');

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const reintIntro = 
      'Ugandan correctional facilities face acute recidivism rates due to stigma, family breakdown, and ' +
      'lack of viable income. IFHCFI bridges institutional release and independent community living via a ' +
      'structured 6-stage pipeline across 6 partner prison facilities:';
    const splitReintIntro = doc.splitTextToSize(reintIntro, contentWidth);
    doc.text(splitReintIntro, margin, currentY);
    currentY += splitReintIntro.length * 4.5 + 4;

    const stages = [
      { num: 'Stage 1', time: 'Months -3 to 0', title: 'Pre-Release Preparation', desc: 'In-prison counseling, life-skills, vocational readiness intake, Bible and spiritual discipleship.' },
      { num: 'Stage 2', time: 'Month 1', title: 'Reception & Family Reconciliation', desc: 'Emergency clothing and hygiene pack, counseling at Wakiso Office, community mediator visits to home village.' },
      { num: 'Stage 3', time: 'Months 2 to 3', title: 'Agro-Skills & Fellowship Immersion', desc: 'Hands-on greenhouse nursery cultivation, livestock husbandry apprenticeships, weekly peer fellowship.' },
      { num: 'Stage 4', time: 'Month 6', title: 'Starter-Kit Asset Deployment', desc: 'Delivery of 150 vegetable seedlings or poultry breeding pairs for independent home livelihood generation.' },
      { num: 'Stage 5', time: 'Months 7 to 9', title: 'Local Church & Savings Integration', desc: 'Full integration into local partner church and enrollment into community village savings (VSLA) circle.' },
      { num: 'Stage 6', time: 'Month 12', title: 'Graduation & Alumni Mentorship', desc: 'Comprehensive livelihood sustainability audit, graduation certificate, zero recidivism benchmark verified.' }
    ];

    stages.forEach((stage) => {
      checkPageBreak(18);
      doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
      doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'F');
      doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
      doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'S');

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.text(`${stage.num} (${stage.time}): ${stage.title}`, margin + 4, currentY + 5);

      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text(stage.desc, margin + 4, currentY + 10);

      currentY += 17;
    });

    // Partner Prisons List
    currentY += 2;
    checkPageBreak(25);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Partner Correctional Facilities (6 Institutions):', margin, currentY);
    currentY += 5;

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);

    PARTNER_PRISONS.forEach((prison, i) => {
      const pCol = i % 2;
      const pRow = Math.floor(i / 2);
      const px = margin + pCol * (contentWidth / 2);
      const py = currentY + pRow * 5;
      doc.text(`• ${prison.name} (${prison.district} District)`, px, py);
    });

    currentY += Math.ceil(PARTNER_PRISONS.length / 2) * 5 + 8;
  }

  // Section 4: 300-Family Starter Kit Specification & 12 Core Programmes
  if (docType === 'starter-kit' || docType === 'all') {
    if (docType === 'all') {
      doc.addPage();
    }
    addHeader('SUSTAINABLE STARTER-KIT BRIEF & PROGRAMMES DIRECTORY', 'Direct Household Interventions & Institutional Specifications');

    // Starter Kit Box
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.roundedRect(margin, currentY, contentWidth, 42, 2, 2, 'F');
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(margin, currentY, contentWidth, 42, 2, 2, 'S');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('300-FAMILY SUSTAINABLE FARMING STARTER-KIT SPECIFICATION', margin + 4, currentY + 6);

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);

    const kitItems = [
      '• 150 certified climate-resilient seedlings (Cabbage Gloria F1, Tomato Ansal F1, Collards)',
      '• Manual hand-tillage toolset (quality hoe, garden rake, and calibrated watering can)',
      '• Inoculated biological organic compost & pest repellent booster pack',
      '• Simple gravity drip irrigation kit with 15-meter flexible distribution lines',
      '• 3 months of assigned agronomist extension home visits and mentorship'
    ];

    kitItems.forEach((item, ki) => {
      doc.text(item, margin + 4, currentY + 12 + ki * 4.5);
    });

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('Target Unit Cost: UGX 180,000 (~USD $50) / household · Target Reach: 300+ Households / Year', margin + 4, currentY + 38);

    currentY += 48;

    // 12 Core Programmes Index Table
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Directory of 12 Institutional Programmes', margin, currentY);
    currentY += 5;

    CORE_PROGRAMMES.forEach((p, idx) => {
      checkPageBreak(12);
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(margin, currentY, contentWidth, 9, 'F');
      doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
      doc.rect(margin, currentY, contentWidth, 9, 'S');

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`${idx + 1}. ${p.title}`, margin + 3, currentY + 6);

      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(`[${p.category.toUpperCase()}]`, margin + 65, currentY + 6);

      const shortSummary = doc.splitTextToSize(p.summary, contentWidth - 95)[0] || '';
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(shortSummary, margin + 92, currentY + 6);

      currentY += 10;
    });

    // Verification End Note
    currentY += 4;
    checkPageBreak(20);
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'S');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('OFFICIAL VERIFICATION STATEMENT', margin + 4, currentY + 5);

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.text('This document constitutes the verified public institutional profile and operational fact sheet of IFHCFI under Uganda NGO laws. For partnership, grants, or audit inquiries: contact@ifhcfi.org | Wakiso District, Uganda.', margin + 4, currentY + 10);
  }

  // Add footers with total page count
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  // File naming
  const fileMap: Record<DocType, string> = {
    profile: 'IFHCFI-Institutional-Fact-Sheet.pdf',
    'concept-note': 'IFHCFI-Combat-Center-Concept-Note.pdf',
    reintegration: 'IFHCFI-12-Month-Reintegration-Framework.pdf',
    'starter-kit': 'IFHCFI-Starter-Kit-Specification.pdf',
    all: 'IFHCFI-Official-Complete-Fact-Sheet-Dossier.pdf',
  };

  const fileName = fileMap[docType] || 'IFHCFI-Official-Fact-Sheet.pdf';
  doc.save(fileName);
}
