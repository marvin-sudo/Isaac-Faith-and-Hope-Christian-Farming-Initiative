/**
 * Operational Data and Mock Registry for IFHCFI Internal Management
 * 
 * Strict Privacy & Confidentiality Rules Applied:
 * - Beneficiary identities are pseudo-anonymized (e.g. BEN-WAK-2026-001)
 * - Prison records protect real identities
 * - Transparent Financial Accounting distinguishing budgets, targets, and gaps
 */

export interface BeneficiaryRecord {
  id: string;
  code: string;
  category: 'Vulnerable Family' | 'Youth Trainee' | 'Ex-Prisoner' | 'Widow / Single Mother' | 'Rural Church Leader';
  district: string;
  subCounty: string;
  enrolledDate: string;
  programmeId: string;
  programmeName: string;
  starterKitDelivered: boolean;
  starterKitType: 'Horticulture Seedling Kit' | 'Poultry Starter Kit' | 'Carpentry Toolset' | 'Goat Breeding Pair' | 'Tailoring Unit' | 'Pending Allocation';
  followUpStatus: 'Active - On Track' | 'Milestone 3 Complete' | 'Graduation Complete' | 'Follow-up Due';
  discipleshipEnrolled: boolean;
  confidentialNotes: string;
}

export interface ReintegrationCase {
  id: string;
  caseCode: string;
  prisonFacility: string;
  releaseDate: string;
  currentMilestone: string;
  progressPercent: number;
  counselingSessionsCompleted: number;
  familyReconciliationStatus: 'Completed & Restored' | 'Ongoing Mediation' | 'Initial Stage';
  livelihoodActivity: string;
  counselorAssigned: string;
  nextFollowUpDate: string;
  riskOfRecidivism: 'Low' | 'Moderate' | 'Resolved / Self-Sustaining';
}

export interface DomeNurseryBatch {
  batchId: string;
  cropName: string;
  variety: string;
  seedlingTrays: number;
  germinationRatePercent: number;
  seedingDate: string;
  expectedDistributionDate: string;
  purpose: 'Vulnerable Family Starter Kits (300 Target)' | 'Demonstration Farming' | 'Community Nursery Sales';
  status: 'Germinating' | 'Hardening Off' | 'Ready for Distribution';
}

export interface LivestockRecord {
  id: string;
  type: 'Goats' | 'Chickens' | 'Pigs';
  breed: string;
  headCount: number;
  breedingPairs: number;
  healthStatus: 'Excellent - Vaccinated' | 'Scheduled for De-worming' | 'Quarantine Inspection';
  purpose: 'Breeding Stock & Training' | 'Starter Kit Progeny' | 'Organic Demonstration';
  lastVeterinaryCheck: string;
}

export const INITIAL_BENEFICIARIES: BeneficiaryRecord[] = [
  {
    id: 'b-1',
    code: 'IFH-BEN-0101',
    category: 'Vulnerable Family',
    district: 'Wakiso District',
    subCounty: 'Kasangati',
    enrolledDate: '2026-04-02',
    programmeId: 'prog-4',
    programmeName: 'Vulnerable Family Support',
    starterKitDelivered: true,
    starterKitType: 'Horticulture Seedling Kit',
    followUpStatus: 'Active - On Track',
    discipleshipEnrolled: true,
    confidentialNotes: 'Homestead garden established; cabbage and tomato seedlings planted. 4 household dependents.',
  },
  {
    id: 'b-2',
    code: 'IFH-BEN-0102',
    category: 'Ex-Prisoner',
    district: 'Wakiso District',
    subCounty: 'Nangabo',
    enrolledDate: '2026-04-10',
    programmeId: 'prog-9',
    programmeName: 'Ex-Prisoner Rehabilitation & Reintegration',
    starterKitDelivered: true,
    starterKitType: 'Poultry Starter Kit',
    followUpStatus: 'Milestone 3 Complete',
    discipleshipEnrolled: true,
    confidentialNotes: 'Released from Kasangati facility. Completed anger management & family reconciliation session. 25 local kuroiler birds provided.',
  },
  {
    id: 'b-3',
    code: 'IFH-BEN-0103',
    category: 'Youth Trainee',
    district: 'Wakiso District',
    subCounty: 'Wakiso Town Council',
    enrolledDate: '2026-04-15',
    programmeId: 'prog-3',
    programmeName: 'Youth Empowerment',
    starterKitDelivered: false,
    starterKitType: 'Carpentry Toolset',
    followUpStatus: 'Active - On Track',
    discipleshipEnrolled: true,
    confidentialNotes: 'Completed month 1 of vocational woodworking theory. Attending weekly Christian discipleship fellowship.',
  },
  {
    id: 'b-4',
    code: 'IFH-BEN-0104',
    category: 'Widow / Single Mother',
    district: 'Luweero District',
    subCounty: 'Nyimbwa',
    enrolledDate: '2026-04-18',
    programmeId: 'prog-5',
    programmeName: "Women's Empowerment",
    starterKitDelivered: true,
    starterKitType: 'Goat Breeding Pair',
    followUpStatus: 'Active - On Track',
    discipleshipEnrolled: true,
    confidentialNotes: 'Received improved Boer/indigenous cross pair. Pasture fencing verified by Agricultural Officer.',
  },
  {
    id: 'b-5',
    code: 'IFH-BEN-0105',
    category: 'Ex-Prisoner',
    district: 'Nakasongola District',
    subCounty: 'Wabinyonyi',
    enrolledDate: '2026-04-20',
    programmeId: 'prog-9',
    programmeName: 'Ex-Prisoner Rehabilitation & Reintegration',
    starterKitDelivered: true,
    starterKitType: 'Horticulture Seedling Kit',
    followUpStatus: 'Milestone 3 Complete',
    discipleshipEnrolled: true,
    confidentialNotes: 'Transferred to rural farmstead with family. Weekly mentor check-ins through local rural pastor.',
  },
  {
    id: 'b-6',
    code: 'IFH-BEN-0106',
    category: 'Rural Church Leader',
    district: 'Busia District',
    subCounty: 'Masafu',
    enrolledDate: '2026-04-25',
    programmeId: 'prog-7',
    programmeName: 'Church Support & Outreach',
    starterKitDelivered: false,
    starterKitType: 'Pending Allocation',
    followUpStatus: 'Active - On Track',
    discipleshipEnrolled: true,
    confidentialNotes: 'Leading local community farming demonstration plot with 35 congregation families participating.',
  },
];

export const INITIAL_REINTEGRATION_CASES: ReintegrationCase[] = [
  {
    id: 'reint-1',
    caseCode: 'CAS-KAS-2026-01',
    prisonFacility: 'Kasangati Prison',
    releaseDate: '2026-04-01',
    currentMilestone: 'Phase 3: Practical Skills & Discipleship',
    progressPercent: 45,
    counselingSessionsCompleted: 4,
    familyReconciliationStatus: 'Completed & Restored',
    livelihoodActivity: 'Poultry brooding & kitchen horticulture',
    counselorAssigned: 'Pastor Egolet Peter / titus Joshua',
    nextFollowUpDate: '2026-10-04',
    riskOfRecidivism: 'Low',
  },
  {
    id: 'reint-2',
    caseCode: 'CAS-NYI-2026-02',
    prisonFacility: 'Nyimbwa Prison',
    releaseDate: '2026-04-12',
    currentMilestone: 'Phase 2: Immediate Reception & Family Dialogue',
    progressPercent: 25,
    counselingSessionsCompleted: 2,
    familyReconciliationStatus: 'Ongoing Mediation',
    livelihoodActivity: 'Vocational Carpentry apprentice',
    counselorAssigned: 'Store & Counseling Team',
    nextFollowUpDate: '2026-09-30',
    riskOfRecidivism: 'Moderate',
  },
  {
    id: 'reint-3',
    caseCode: 'CAS-NAK-2026-03',
    prisonFacility: 'Nakasongola M/W Prison',
    releaseDate: '2026-03-31',
    currentMilestone: 'Phase 4: Starter-Kit Asset Deployment',
    progressPercent: 60,
    counselingSessionsCompleted: 6,
    familyReconciliationStatus: 'Completed & Restored',
    livelihoodActivity: 'Smallholder goat breeding & cassava demo',
    counselorAssigned: 'Kabasomi Lydia & Field Team',
    nextFollowUpDate: '2026-10-12',
    riskOfRecidivism: 'Low',
  },
  {
    id: 'reint-4',
    caseCode: 'CAS-SEN-2026-04',
    prisonFacility: 'Sentema Prison',
    releaseDate: '2026-04-20',
    currentMilestone: 'Phase 2: Immediate Reception & Family Dialogue',
    progressPercent: 20,
    counselingSessionsCompleted: 3,
    familyReconciliationStatus: 'Ongoing Mediation',
    livelihoodActivity: 'Horticulture seedlings management',
    counselorAssigned: 'Evangelist Aine Jessica Birungi',
    nextFollowUpDate: '2026-10-01',
    riskOfRecidivism: 'Moderate',
  },
];

export const INITIAL_DOME_BATCHES: DomeNurseryBatch[] = [
  {
    batchId: 'BATCH-DOM-26-01',
    cropName: 'Tomato',
    variety: 'Ansal F1 (Determinate, High-yield)',
    seedlingTrays: 120,
    germinationRatePercent: 94,
    seedingDate: '2026-04-05',
    expectedDistributionDate: '2026-05-02',
    purpose: 'Vulnerable Family Starter Kits (300 Target)',
    status: 'Ready for Distribution',
  },
  {
    batchId: 'BATCH-DOM-26-02',
    cropName: 'Cabbage',
    variety: 'Gloria F1 (Climate-resilient)',
    seedlingTrays: 95,
    germinationRatePercent: 91,
    seedingDate: '2026-04-12',
    expectedDistributionDate: '2026-05-10',
    purpose: 'Vulnerable Family Starter Kits (300 Target)',
    status: 'Hardening Off',
  },
  {
    batchId: 'BATCH-DOM-26-03',
    cropName: 'Collard Greens (Sukuma Wiki)',
    variety: 'Maji ya Chumvi',
    seedlingTrays: 80,
    germinationRatePercent: 96,
    seedingDate: '2026-04-18',
    expectedDistributionDate: '2026-05-15',
    purpose: 'Demonstration Farming',
    status: 'Germinating',
  },
  {
    batchId: 'BATCH-DOM-26-04',
    cropName: 'Green Bell Pepper',
    variety: 'California Wonder Improved',
    seedlingTrays: 60,
    germinationRatePercent: 88,
    seedingDate: '2026-04-22',
    expectedDistributionDate: '2026-05-20',
    purpose: 'Vulnerable Family Starter Kits (300 Target)',
    status: 'Germinating',
  },
];

export const INITIAL_LIVESTOCK: LivestockRecord[] = [
  {
    id: 'live-1',
    type: 'Goats',
    breed: 'Indigenous Mubende crossed with Boer',
    headCount: 24,
    breedingPairs: 8,
    healthStatus: 'Excellent - Vaccinated',
    purpose: 'Breeding Stock & Training',
    lastVeterinaryCheck: '2026-04-15',
  },
  {
    id: 'live-2',
    type: 'Chickens',
    breed: 'Dual-purpose Kuroiler & Local Kuroiler cross',
    headCount: 150,
    breedingPairs: 20,
    healthStatus: 'Excellent - Vaccinated',
    purpose: 'Starter Kit Progeny',
    lastVeterinaryCheck: '2026-04-20',
  },
  {
    id: 'live-3',
    type: 'Pigs',
    breed: 'Large White & Camborough cross',
    headCount: 16,
    breedingPairs: 4,
    healthStatus: 'Scheduled for De-worming',
    purpose: 'Breeding Stock & Training',
    lastVeterinaryCheck: '2026-04-18',
  },
];

export const COMBAT_CENTER_SETUP_ITEMS = [
  {
    category: 'Site Preparation & Civil Earthworks',
    costUGX: 25000000,
    status: 'In Progress / Mobilizing',
    description: 'Boundary fencing, site grading, access road clearance, environmental soil baseline.',
  },
  {
    category: 'Dome Farm Nursery Greenhouse Frame & Irrigation',
    costUGX: 32000000,
    status: 'Planned Initial Phase',
    description: 'Galvanized greenhouse dome structure, shade netting, solar-assisted drip lines, initial nursery trays.',
  },
  {
    category: 'Water Harvesting & Integrated Tanks',
    costUGX: 20000000,
    status: 'Planned Initial Phase',
    description: 'Two 10,000L heavy-duty plastic rainwater harvest tanks, piping, filtration and sanitation stations.',
  },
  {
    category: 'Store & Counseling Office Initial Structure',
    costUGX: 18000000,
    status: 'Planned Initial Phase',
    description: 'Secure lockable store for tools, counseling private room, desks, Bible storage shelves.',
  },
  {
    category: 'Livestock Demonstration Starter Pens',
    costUGX: 10000000,
    status: 'Planned Initial Phase',
    description: 'Raised-floor goat demonstration shelter and bio-secure poultry brooding pen.',
  },
];
