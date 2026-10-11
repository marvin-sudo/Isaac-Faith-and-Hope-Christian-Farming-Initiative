import { jsPDF } from 'jspdf';
import { PrisonerRecord, RegisteredPrison } from '../data/prisonersData';
import { OFFICIAL_REGISTRATION } from '../data/organizationData';

export const generatePrisonerPdf = (
  prisoner: PrisonerRecord,
  facility?: RegisteredPrison
): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // 1. Header Top Accent Bar
  doc.setFillColor(22, 78, 51); // #164E33 Forest Green
  doc.rect(0, 0, pageWidth, 24, 'F');

  // Decorative gold/emerald line
  doc.setFillColor(52, 211, 153); // Emerald-400
  doc.rect(0, 24, pageWidth, 1.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(
    OFFICIAL_REGISTRATION.organizationName.toUpperCase(),
    margin,
    11
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(209, 250, 229);
  doc.text(
    `UGANDA NGO PERMIT: ${OFFICIAL_REGISTRATION.permitNo}  |  REG NO: ${OFFICIAL_REGISTRATION.registrationFileNo}  |  WAKISO HEADQUARTERS`,
    margin,
    18
  );

  // 2. Dossier Sub-Banner
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, 29, contentWidth, 18, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, 29, contentWidth, 18, 2, 2, 'S');

  doc.setTextColor(22, 78, 51);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('OFFICIAL PRISONER RE-ENTRY & REHABILITATION DOSSIER', margin + 4, 38);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const genDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.text(
    `CONFIDENTIAL RECORD  |  PRINTED: ${genDate}  |  STATUS: RESTORATIVE JUSTICE PIPELINE`,
    margin + 4,
    44
  );

  let currentY = 52;

  // 3. Identification & Custodial Card
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, currentY, contentWidth, 48, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 48, 2, 2, 'S');

  // Inmate Name & ID Header strip inside card
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 12, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, currentY + 12, margin + contentWidth, currentY + 12);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(prisoner.fullName, margin + 5, currentY + 8);

  doc.setFillColor(22, 78, 51);
  doc.roundedRect(pageWidth - margin - 42, currentY + 2.5, 38, 7, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(prisoner.prisonerId, pageWidth - margin - 23, currentY + 7.2, { align: 'center' });

  // Two columns of Biodata
  const col1X = margin + 5;
  const col2X = margin + contentWidth / 2 + 2;
  const rowStart = currentY + 18;

  const renderField = (x: number, y: number, label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(label.toUpperCase(), x, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(value || 'N/A', x, y + 4.5);
  };

  renderField(col1X, rowStart, 'Correctional Facility', prisoner.facilityName);
  renderField(col2X, rowStart, 'Official Release Date', prisoner.dateOfRelease);

  renderField(col1X, rowStart + 11, 'Phone / Mobile Contact', prisoner.phoneNumber);
  renderField(col2X, rowStart + 11, 'Religious Affiliation', prisoner.religion);

  renderField(col1X, rowStart + 21, 'Education Background', prisoner.education);
  renderField(
    col2X,
    rowStart + 21,
    'Re-entry Pipeline Stage',
    prisoner.reentryStage
  );

  currentY += 54;

  // 4. Detailed Rehabilitation & Support Matrix Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, currentY, contentWidth, 80, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 80, 2, 2, 'S');

  // Section Header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 9, 'F');
  doc.line(margin, currentY + 9, margin + contentWidth, currentY + 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 78, 51);
  doc.text('VOCATIONAL SKILLS, STARTER KIT ALLOCATION & RE-ENTRY TARGETS', margin + 5, currentY + 6.5);

  let innerY = currentY + 15;

  const renderLongBlock = (title: string, content: string, maxH: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 78, 51);
    doc.text(title.toUpperCase(), margin + 5, innerY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const splitLines = doc.splitTextToSize(content, contentWidth - 10);
    doc.text(splitLines, margin + 5, innerY + 4.5);
    innerY += maxH;
  };

  renderLongBlock('1. Enrolled Program & Skill Development Needs', prisoner.programSkillNeeds, 16);
  renderLongBlock('2. Post-Release Support Required & Starter Kit Allocation', prisoner.supportRequired, 18);
  renderLongBlock('3. Long-Term Re-entry & Community Livelihood Goals', prisoner.reentryGoals, 18);
  renderLongBlock('4. Confidential Case Officer Notes & Behavioral Assessment', prisoner.confidentialNotes, 16);

  currentY += 86;

  // 5. Custodial & Family Contact Card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'S');

  renderField(
    col1X,
    currentY + 5,
    'Family Contact / Guardian',
    `${prisoner.familyContactName || 'None Listed'} (${prisoner.familyContactPhone || 'No Phone'})`
  );
  renderField(
    col2X,
    currentY + 5,
    'Assigned Reintegration Officer',
    prisoner.assignedOfficer
  );
  renderField(
    col1X,
    currentY + 15,
    'Christian Discipleship Status',
    prisoner.discipleshipEnrolled ? 'Enrolled & Active in Spiritual Mentorship' : 'Pending / Not Enrolled'
  );
  renderField(
    col2X,
    currentY + 15,
    'Facility Classification & Contact',
    facility ? `${facility.securityLevel} - ${facility.contactPhone}` : 'Partner Correctional Facility'
  );

  currentY += 32;

  // 6. Sign-off & Verification Section
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, currentY, contentWidth, 34, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 34, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('OFFICIAL VERIFICATION & AUTHORIZATION', margin + 5, currentY + 6);

  // Sign slot 1
  const sig1X = margin + 5;
  const sigWidth = (contentWidth - 20) / 3;
  doc.setDrawColor(148, 163, 184);
  doc.line(sig1X, currentY + 22, sig1X + sigWidth, currentY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Reintegration Counselor Signature', sig1X, currentY + 26);
  doc.text(`Date: ____________________`, sig1X, currentY + 30);

  // Sign slot 2
  const sig2X = sig1X + sigWidth + 5;
  doc.line(sig2X, currentY + 22, sig2X + sigWidth, currentY + 22);
  doc.text('Prison Welfare / Warden Endorsement', sig2X, currentY + 26);
  doc.text(`Official Stamp: ___________`, sig2X, currentY + 30);

  // Sign slot 3
  const sig3X = sig2X + sigWidth + 5;
  doc.line(sig3X, currentY + 22, sig3X + sigWidth, currentY + 22);
  doc.text('Country Coordinator Sign-off', sig3X, currentY + 26);
  doc.text('IFHCFI Central Office', sig3X, currentY + 30);

  currentY += 38;

  // 7. Footer Notice
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'This document contains protected case data managed under the IFHCFI Human Dignity Framework and Uganda NGO Act guidelines.',
    pageWidth / 2,
    286,
    { align: 'center' }
  );

  // Save the PDF
  const sanitizedId = prisoner.prisonerId.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`IFHCFI-Prisoner-Dossier-${sanitizedId}.pdf`);
};
