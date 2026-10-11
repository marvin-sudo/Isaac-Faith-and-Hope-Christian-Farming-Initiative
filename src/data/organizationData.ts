/**
 * Official and Verified Data Base for
 * Isaac Faith and Hope Christian Farming Initiative (IFHCFI)
 * 
 * Strict Data Integrity:
 * - VERIFIED: Official government registration and documentation data.
 * - TARGET: Documented organizational targets (NOT past achievements).
 * - PLACEHOLDER: Marked for information required from IFHCFI.
 */

export interface Facility {
  id: string;
  name: string;
  category: string;
  purpose: string;
  keyComponents: string[];
  operationalRole: string;
  imagePath?: string;
}

export interface Programme {
  id: string;
  title: string;
  category: 'agriculture' | 'vocational' | 'spiritual' | 'justice' | 'community' | 'livelihood';
  image?: string;
  summary: string;
  targetBeneficiaries: string[];
  keyActivities: string[];
  developmentLink: string;
  verifiedScope: string;
}

export interface StaffMember {
  name: string;
  role: string;
  status: 'Verified Official Roster';
  biographyNote: string;
  image?: string;
}

export interface PrisonPartner {
  name: string;
  district: string;
  ministryFocus: string[];
  reintegrationFollowUp: string;
}

export const OFFICIAL_REGISTRATION = {
  organizationName: 'Isaac Faith and Hope Christian Farming Initiative',
  acronym: 'IFHCFI',
  entityType: 'Indigenous, Faith-Based Non-Governmental Organization (NGO)',
  country: 'Uganda',
  registrationFileNo: 'MIA/NB/2026/03/7369',
  permitNo: 'INDP0007369NB',
  operationalArea: 'Countrywide in Uganda',
  permitDuration: '60 months',
  commencementDate: '31 March 2026',
  flagshipLocation: 'Wakiso District, Uganda',
  status: 'Officially Registered & Licensed',
} as const;

export const FINANCIAL_TARGETS = {
  projectedTotalCostUSD: 3000000,
  projectedTotalCostUGX: 11250000000,
  initialPhaseSetupUGX: 105000000,
  initialPhaseSetupUSD: 28000,
  confirmedFundingUSD: 0,
  fundingStatus: 'Active Fundraising & Grant Applications Stage',
  note: 'Distinction strictly maintained between total projected cost, initial phase setup, and confirmed funding.',
} as const;

export const ANNUAL_TARGETS = [
  {
    category: 'Youth Empowerment',
    target: '1,000+ Youth Annually',
    description: 'Practical vocational skills, climate-smart farming apprenticeships, and spiritual discipleship.',
    verificationStatus: 'Documented Annual Target (Not past achievement)',
    metricType: 'Annual Target',
    targetNumber: 1000,
  },
  {
    category: 'Vulnerable Family Support',
    target: '300+ Families Annually',
    description: 'Sustainable farming starter kits, seeds, tools, and agricultural mentoring for rural households.',
    verificationStatus: 'Documented Annual Target (Not past achievement)',
    metricType: 'Annual Target',
    targetNumber: 300,
  },
  {
    category: 'Rural Church Strengthening',
    target: '500+ Rural Churches',
    description: 'Infrastructure assistance, community outreach coordination, and fellowship empowerment.',
    verificationStatus: 'Documented Target (Not past achievement)',
    metricType: 'Institutional Target',
    targetNumber: 500,
  },
  {
    category: 'Prison Justice Ministry',
    target: '6 Partner Prison Facilities',
    description: 'Life skills, Bibles, rehabilitation, and 12-month post-release reintegration follow-up.',
    verificationStatus: 'Documented Operational Target',
    metricType: 'Facility Network',
    targetNumber: 6,
  },
] as const;

export const PARTNER_PRISONS: PrisonPartner[] = [
  {
    name: 'Kasangati Prison',
    district: 'Wakiso District',
    ministryFocus: ['Life Skills', 'Bible Distribution', 'Pre-Release Counseling', 'Vocational Readiness'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
  {
    name: 'Buwambo Prison',
    district: 'Wakiso District',
    ministryFocus: ['Agricultural Training', 'Spiritual Guidance', 'Family Reconciliation'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
  {
    name: 'Nyimbwa Prison',
    district: 'Luweero District',
    ministryFocus: ['Vocational Carpentry & Tailoring', 'Counseling', 'Spiritual Mentorship'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
  {
    name: 'Nakasongola M/W Prison',
    district: 'Nakasongola District',
    ministryFocus: ['Men & Women Rehabilitation', 'Agro-Skills', 'Bible Discipleship'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
  {
    name: 'Masafu Prison',
    district: 'Busia District',
    ministryFocus: ['Pre-release Farming Skills', 'Counseling', 'Community Linkage'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
  {
    name: 'Sentema Prison',
    district: 'Wakiso District',
    ministryFocus: ['Life-Skills Development', 'Restorative Dialogue', 'Pastoral Care'],
    reintegrationFollowUp: '12-Month Post-Release Support Pipeline',
  },
];

export const CORE_FACILITIES: Facility[] = [
  {
    id: 'training-hall',
    name: 'Main Training Hall',
    category: 'Skills & Evangelism',
    purpose: 'Vocational training, skills development, Gospel evangelism, community training, and empowerment activities.',
    keyComponents: [
      'Multi-purpose training & seminar hall',
      'Vocational practical stations',
      'Gospel outreach & community gathering space',
      'Audio-visual training equipment slots',
    ],
    operationalRole: 'Central hub for youth vocational workshops, leadership training, and church community conferences.',
  },
  {
    id: 'dome-farm',
    name: 'Dome Farm Unit',
    category: 'Climate-Smart Agriculture',
    purpose: 'Climate-smart agriculture, all-season farming, seedling nursery management, agricultural training, and practical farming demonstrations.',
    keyComponents: [
      'Protected dome greenhouse structure',
      'High-yield seedling germination nursery',
      'Drip irrigation demonstration beds',
      'All-season organic vegetable production',
    ],
    operationalRole: 'Training ground for smallholder farmers and incubator for 300+ family starter kit seedling distribution.',
  },
  {
    id: 'stock-breeding-farm',
    name: 'Laboratory, Stock & Breeding Farm',
    category: 'Livestock Husbandry',
    purpose: 'Livestock husbandry, stock management, breeding activities, and agricultural training focusing on Goats, Chickens, and Pigs.',
    keyComponents: [
      'Indigenous & improved goat breeding pens',
      'Poultry brooding & layer demonstration unit',
      'Biosecure pig breeding pens',
      'Diagnostic & stock record-keeping office',
    ],
    operationalRole: 'Hands-on practical training in disease control, animal nutrition, breeding stock improvement, and value addition.',
  },
  {
    id: 'store-counseling',
    name: 'Store & Counseling Office',
    category: 'Rehabilitation & Logistics',
    purpose: 'Resource management, confidential counselling, rehabilitation support, and reintegration follow-up.',
    keyComponents: [
      'Private, confidential counselling room',
      'Reintegration follow-up tracking station',
      'Agricultural tool & starter-kit secure store',
      'Bible & literature distribution depot',
    ],
    operationalRole: 'Safe space for ex-prisoner reintegration case management, trauma healing, and vulnerable family support.',
  },
  {
    id: 'water-sanitation',
    name: 'Water & Sanitation System',
    category: 'Infrastructure & Health',
    purpose: 'Safe water access, rainwater harvesting storage, hygiene, and community sanitation facilities.',
    keyComponents: [
      'High-capacity integrated rainwater harvesting tanks',
      'Potable water filtration setup',
      'Eco-sanitation demonstration blocks',
      'Hygiene & clean water training points',
    ],
    operationalRole: 'Ensures year-round water security for dome irrigation, livestock care, trainees, and neighboring community members.',
  },
];

export const CORE_PROGRAMMES: Programme[] = [
  {
    id: 'prog-1',
    title: 'Agricultural Empowerment',
    category: 'agriculture',
    image: 'https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg',
    summary: 'Equipping rural smallholders and vulnerable families with modern, sustainable agro-ecological practices.',
    targetBeneficiaries: ['Rural families', 'Widows', 'Youth farmers'],
    keyActivities: ['Soil conservation methods', 'Crop rotation training', 'High-value horticulture', 'Post-harvest handling'],
    developmentLink: 'Boosts rural household food security and reliable daily income streams.',
    verifiedScope: 'Countrywide mandate with primary demonstration in Wakiso District.',
  },
  {
    id: 'prog-2',
    title: 'Vocational Skills Development',
    category: 'vocational',
    image: '/src/assets/images/vocational_skills_training_1790273232078.jpg',
    summary: 'Practical hands-on courses in carpentry, masonry, tailoring, and equipment mechanics.',
    targetBeneficiaries: ['Unemployed youth', 'Single mothers', 'Ex-prisoners'],
    keyActivities: ['Carpentry & joinery', 'Tailoring & garment design', 'Agribusiness management', 'Basic equipment maintenance'],
    developmentLink: 'Bridges the gap between raw labor and market-ready vocational competencies.',
    verifiedScope: 'Conducted at Combat Empowerment Center and regional partner workshops.',
  },
  {
    id: 'prog-3',
    title: 'Youth Empowerment',
    category: 'vocational',
    image: '/src/assets/images/tree_agroforestry_1790277966958.jpg',
    summary: 'Annual leadership, agribusiness, and technical trade apprenticeships reaching 1,000+ youth.',
    targetBeneficiaries: ['Unemployed youth', 'Out-of-school youth'],
    keyActivities: ['Mentorship academies', 'Entrepreneurship starter bootcamps', 'Leadership workshops', 'Apprenticeships'],
    developmentLink: 'Transforms unemployed rural youth into productive community change agents.',
    verifiedScope: 'Annual organizational target of 1,000+ youth across Ugandan districts.',
  },
  {
    id: 'prog-4',
    title: 'Vulnerable Family Support',
    category: 'community',
    image: '/src/assets/images/family_starter_kit_1790277954367.jpg',
    summary: 'Distributing farming starter kits, certified seedlings, and tools to 300+ vulnerable households.',
    targetBeneficiaries: ['Widows', 'Single mothers', 'Child-headed households'],
    keyActivities: ['300+ starter kit distributions', 'Emergency nutritional support', 'Home garden establishment', 'Ongoing social visits'],
    developmentLink: 'Prevents acute poverty collapse and builds intergenerational stability.',
    verifiedScope: 'Targeting 300+ families annually with verified follow-up.',
  },
  {
    id: 'prog-5',
    title: "Women's Empowerment",
    category: 'livelihood',
    image: '/src/assets/images/women_village_savings_1790277977734.jpg',
    summary: 'Village savings groups, poultry starter packs, and micro-business literacy for rural mothers.',
    targetBeneficiaries: ['Widows', 'Single mothers', 'Rural women'],
    keyActivities: ['Poultry & kitchen garden kits', 'Village savings & loan literacy', 'Rights awareness', 'Maternal wellness'],
    developmentLink: 'Directly improves child nutrition and school retention in rural households.',
    verifiedScope: 'Integrated across all agricultural and vocational center modules.',
  },
  {
    id: 'prog-6',
    title: 'Christian Spiritual Development',
    category: 'spiritual',
    image: '/src/assets/images/hero_ugandan_farming_1790193085963.jpg',
    summary: 'Character building, pastoral counseling, and moral discipleship rooted in Christian faith.',
    targetBeneficiaries: ['Youth', 'Families', 'Community members'],
    keyActivities: ['Biblical discipleship classes', 'Prayer & fellowship groups', 'Moral leadership seminars', 'Pastoral counseling'],
    developmentLink: 'Cultivates integrity, hope, and ethical stewardship in community leadership.',
    verifiedScope: 'Faith-based foundation integrated respectfully into all programmes.',
  },
  {
    id: 'prog-7',
    title: 'Church Support & Outreach',
    category: 'spiritual',
    image: '/src/assets/images/hero_ugandan_farming_1790193085963.jpg',
    summary: 'Partnering with 500+ rural churches as fellowship anchors and welfare distribution hubs.',
    targetBeneficiaries: ['Pastors', 'Church elders', 'Rural congregations'],
    keyActivities: ['Pastoral leadership training', 'Church infrastructure assistance', 'Community outreach coordination', 'Agricultural evangelism'],
    developmentLink: 'Empowers local churches to serve as self-reliant community anchors.',
    verifiedScope: 'Documented target network of 500+ rural churches across Uganda.',
  },
  {
    id: 'prog-8',
    title: 'Prison Ministry',
    category: 'justice',
    image: '/src/assets/images/prison_reintegration_1790277940920.jpg',
    summary: 'Counseling, Bible study, and vocational readiness across 6 Ugandan correctional facilities.',
    targetBeneficiaries: ['Incarcerated men & women', 'Detainees'],
    keyActivities: ['Spiritual services & Bible study', 'Life-skills workshops', 'Pre-release preparation', 'Donation of basic essentials'],
    developmentLink: 'Instills human dignity, repentance, and hope before release.',
    verifiedScope: 'Active across Kasangati, Buwambo, Nyimbwa, Nakasongola M/W, Masafu, and Sentema.',
  },
  {
    id: 'prog-9',
    title: 'Ex-Prisoner Reintegration',
    category: 'justice',
    image: '/src/assets/images/prison_reintegration_1790277940920.jpg',
    summary: '12-month post-release continuum providing family reconciliation, starter kits, and peer mentorship.',
    targetBeneficiaries: ['Reformed ex-inmates', 'Reunited families'],
    keyActivities: ['Trauma healing & counseling', 'Family reconciliation visits', 'Agricultural starter kits & livestock', '12-month milestone monitoring'],
    developmentLink: 'Protects communities by turning former inmates into productive breadwinners.',
    verifiedScope: 'Documented 12-month post-release framework with confidential records.',
  },
  {
    id: 'prog-10',
    title: 'Community Clean Water & Sanitation',
    category: 'community',
    image: '/src/assets/images/clean_water_well_1790277928820.jpg',
    summary: 'Installing community borehole pumps, rainwater harvesting, and hygiene awareness.',
    targetBeneficiaries: ['Rural village residents', 'Local schools'],
    keyActivities: ['Safe water point access', 'Sanitation awareness campaigns', 'Community tree planting', 'Village development committees'],
    developmentLink: 'Creates healthy, disease-resilient village environments.',
    verifiedScope: 'Centered around the Combat Center and outreach zones.',
  },
  {
    id: 'prog-11',
    title: 'Climate-Smart Agroforestry',
    category: 'agriculture',
    image: '/src/assets/images/tree_agroforestry_1790277966958.jpg',
    summary: 'Greenhouse dome propagation, organic soil mulching, and indigenous tree planting.',
    targetBeneficiaries: ['Smallholder farmers', 'Youth apprentices'],
    keyActivities: ['Drip irrigation demonstrations', 'Organic mulching & composting', 'Drought-tolerant crop varieties', 'Dome greenhouse nursery'],
    developmentLink: 'Ensures steady harvests regardless of climate shocks.',
    verifiedScope: 'Demonstrated in the Combat Empowerment Center Dome Farm Unit.',
  },
  {
    id: 'prog-12',
    title: 'Livestock & Micro-Husbandry',
    category: 'livelihood',
    image: '/src/assets/images/livestock_husbandry_unit_1790193113014.jpg',
    summary: 'Zero-grazing dairy goat breeding, poultry brooding, and compost value-addition.',
    targetBeneficiaries: ['Graduates of training', 'Farming families'],
    keyActivities: ['Produce aggregation', 'Packaging & basic processing', 'Market linkage coaching', 'Cooperative savings management'],
    developmentLink: 'Converts subsistence cultivation into sustainable commercial livelihoods.',
    verifiedScope: 'Countrywide linkage strategy for graduate beneficiaries.',
  },
];

export const OFFICIAL_LEADERSHIP: StaffMember[] = [
  {
    name: 'Mukaga Titus Joshua',
    role: 'Country Coordinator',
    status: 'Verified Official Roster',
    image: 'https://www.image2url.com/r2/default/images/1787083335187-812b61ee-6fd4-486e-b8e0-f9d374ef19fb.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Pastor Egolet Peter',
    role: 'Pastor',
    status: 'Verified Official Roster',
    image: 'https://i.postimg.cc/fR6QPmmV/Chat-GPT-Image-Oct-11-2026-02-37-30-PM.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Anyango Sarah',
    role: 'Teacher',
    status: 'Verified Official Roster',
    image: 'https://www.image2url.com/r2/default/images/1787082907025-27baa22d-15a4-4ad1-9e5d-58bb8df42c2f.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Musiimenta Anita',
    role: 'Team Member',
    status: 'Verified Official Roster',
    image: 'https://www.image2url.com/r2/default/images/1787082636973-86b7b105-fda1-4558-97fa-829261cc749f.jpg',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Kabasomi Lydia',
    role: 'Agriculturist',
    status: 'Verified Official Roster',
    image: 'https://i.postimg.cc/nzhjwyvn/Chat-GPT-Image-Oct-11-2026-02-34-15-PM.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Evangelist Aine Jessica Birungi',
    role: 'Evangelist',
    status: 'Verified Official Roster',
    image: 'https://www.image2url.com/r2/default/images/1787083439042-cde18d91-1f17-4d86-967b-ffdef1e5c39a.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Hamala Josephant Efumbi',
    role: 'Agriculturist',
    status: 'Verified Official Roster',
    image: 'https://www.image2url.com/r2/default/images/1787082801658-cb5fcfd0-f19b-448d-a047-accb2597d682.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Nafula Naume Lucy',
    role: 'Agriculturist',
    status: 'Verified Official Roster',
    image: 'https://i.postimg.cc/Kjrt6PR9/image.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
  {
    name: 'Kangume Joanah Jonathan',
    role: 'Board Member',
    status: 'Verified Official Roster',
    image: 'https://i.postimg.cc/zBnLvTTT/image.png',
    biographyNote: '[Full biography to be supplied by IFHCFI]',
  },
];

export const REINTEGRATION_PIPELINE_STEPS = [
  {
    stage: 'Phase 1: Pre-Release Preparation',
    timeframe: 'Months -3 to 0',
    description: 'In-prison pastoral counseling, life-skills instruction, and vocational readiness assessment.',
    focusArea: 'Kasangati, Buwambo, Nyimbwa, Nakasongola, Masafu, Sentema prisons.',
  },
  {
    stage: 'Phase 2: Immediate Reception & Family Dialogue',
    timeframe: 'Month 1',
    description: 'Emergency clothing/care pack, confidential intake, trauma counseling, and mediation with family/village leaders.',
    focusArea: 'Wakiso Counseling Office & beneficiary home community.',
  },
  {
    stage: 'Phase 3: Practical Skills & Discipleship',
    timeframe: 'Months 2 to 3',
    description: 'Attendance at the Combat Training Hall or Dome Farm for agro-skills, poultry/livestock care, and discipleship fellowship.',
    focusArea: 'Combat Empowerment Center.',
  },
  {
    stage: 'Phase 4: Starter-Kit Asset Deployment',
    timeframe: 'Month 6',
    description: 'Provision of farming starter kit (seeds, equipment) or livestock unit (goats/poultry) for income generation.',
    focusArea: 'Beneficiary household homestead.',
  },
  {
    stage: 'Phase 5: Community & Church Integration',
    timeframe: 'Months 7 to 9',
    description: 'Active integration into local partner church fellowship and community savings & loan group.',
    focusArea: 'Local rural church network.',
  },
  {
    stage: 'Phase 6: Independent Livelihood Graduation',
    timeframe: 'Month 12',
    description: 'Comprehensive exit audit: food self-sufficiency, sustainable livelihood, healthy family relationship, zero recidivism.',
    focusArea: 'Formal certification and alumni peer mentorship role.',
  },
];
