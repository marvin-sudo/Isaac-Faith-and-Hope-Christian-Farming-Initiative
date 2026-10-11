/**
 * Centralized Administrative Data Store & LocalStorage Persistence for IFHCFI
 * 
 * Manages:
 * - Dynamic Programmes & Automatic Dedicated Programme Pages
 * - Website Updates & News
 * - Media Gallery Management
 * - Upcoming Events & Workshops
 * - Beneficiary Success Stories
 * - Contact & Partnership Inquiries
 * - Activity Audit Trail
 */

import { CORE_PROGRAMMES } from './organizationData';

export interface AdminProgramme {
  id: string;
  title: string;
  category: string;
  image: string;
  additionalImages?: string[];
  summary: string;
  fullDescription: string;
  targetBeneficiaries: string[];
  keyActivities: string[];
  developmentLink: string;
  verifiedScope: string;
  location: string;
  status: 'Published' | 'Draft' | 'Archived';
  featured: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  isCustom?: boolean;
}

export interface WebsiteUpdate {
  id: string;
  title: string;
  summary: string;
  fullArticle: string;
  featuredImage: string;
  category: 'Field Mission' | 'Agricultural Harvest' | 'Prison Outreach' | 'Training Graduation' | 'Institutional Announcement' | 'ACE Hub Progress';
  author: string;
  date: string;
  status: 'Published' | 'Draft';
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'Agriculture' | 'Community' | 'Education' | 'Training' | 'Events' | 'Outreach' | 'ACE Hub' | 'Church' | 'General';
  isFeatured: boolean;
  isVisible: boolean;
  uploadedDate: string;
  order: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Agricultural Workshop' | 'Prison Ministry Outreach' | 'Youth Leadership Summit' | 'Starter Kit Distribution' | 'Church Conference';
  status: 'Published' | 'Draft';
  registeredCount?: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  beneficiaryName: string;
  category: string;
  quote: string;
  narrative: string;
  photoUrl: string;
  impactMetric: string;
  location: string;
  date: string;
  status: 'Published' | 'Draft';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  category: 'Partnership Inquiry' | 'Support & Donation' | 'Volunteer Service' | 'General Inquiry';
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived';
  adminNotes?: string;
}

export interface AdminActivityItem {
  id: string;
  action: string;
  targetType: 'programme' | 'update' | 'gallery' | 'event' | 'story' | 'message' | 'system';
  targetTitle: string;
  timestamp: string;
  user: string;
}

// Storage Keys
const KEY_PROGRAMMES = 'ifhcfi_admin_programmes_v2';
const KEY_UPDATES = 'ifhcfi_admin_updates_v2';
const KEY_GALLERY = 'ifhcfi_admin_gallery_v2';
const KEY_EVENTS = 'ifhcfi_admin_events_v2';
const KEY_STORIES = 'ifhcfi_admin_stories_v2';
const KEY_MESSAGES = 'ifhcfi_admin_messages_v2';
const KEY_ACTIVITIES = 'ifhcfi_admin_activities_v2';

// Initial Seed Programmes (includes the 12 core programmes + ACE Hub Flagship)
const INITIAL_SEED_PROGRAMMES: AdminProgramme[] = [
  {
    id: 'combat-center',
    title: 'Aid Combat Empowerment Center (ACE Hub)',
    category: 'Integrated Hub',
    image: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
    additionalImages: [
      'https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg',
      '/src/assets/images/dome_farm_greenhouse_1790193096683.jpg',
      '/src/assets/images/livestock_husbandry_unit_1790193113014.jpg'
    ],
    summary: 'An integrated rural transformation hub combining agriculture, laboratory services, skills training, rehabilitation, enterprise development and market access.',
    fullDescription: `## Putting Faith in Action to Break the Chains of Poverty

The IFHCFI Aid Combat Empowerment Center is an integrated rural transformation programme designed to strengthen farming, develop practical skills, support rehabilitation, create livelihoods, connect producers to markets and empower rural communities.

### Core Transformation Philosophy
Our systematic pathway operates on a disciplined cycle:
**Train → Test → Treat → Produce → Add Value → Market → Create Wealth → Give Back**

### Breaking the Three Chains of Hardship
1. **Poverty**: Breaking dependency, persistent youth joblessness, and fragile household income through dignified, market-tested enterprise.
2. **Agricultural Barriers**: Eliminating substandard feeds, uncertified seeds, soil depletion, and devastating livestock infections through on-site diagnostic testing.
3. **Spiritual & Social Hopelessness**: Restoring identity, family harmony, and ethical stewardship through Christ-centered discipleship and restorative justice.

### Demonstration & Value-Addition Enterprises
• Greenhouse nursery dome producing 50,000+ disease-free vegetable seedlings per cycle
• Biosecure livestock husbandry unit with improved breeding stock
• Agricultural soil and veterinary diagnostic laboratory
• Solar food processing and post-harvest grain storage facility`,
    targetBeneficiaries: ['Rural Smallholders', 'Ex-Prisoners', 'Vulnerable Youth', 'Widows', 'Rural Churches'],
    keyActivities: [
      'Agricultural diagnostic testing & treatment protocols',
      'Hands-on vocational trades & agro-ecology apprenticeships',
      '12-Month post-release reintegration coaching',
      'Value addition processing & collective market aggregation'
    ],
    developmentLink: 'Operates as the core regional engine driving sustainable rural transformation across Uganda.',
    verifiedScope: 'Wakiso Headquarters, Nakasongola Regional Center, and Busia Eastern Outreach.',
    location: 'Wakiso Headquarters & Regional Centers',
    status: 'Published',
    featured: true,
    publishDate: '2026-04-01',
    createdAt: '2026-04-01T08:00:00Z',
    updatedAt: '2026-04-10T12:00:00Z',
    isCustom: false,
  },
  ...CORE_PROGRAMMES.map((p, idx) => ({
    id: p.id,
    title: p.title,
    category: p.category.charAt(0).toUpperCase() + p.category.slice(1),
    image: p.image || '/src/assets/images/hero_ugandan_farming_1790193085963.jpg',
    additionalImages: [],
    summary: p.summary,
    fullDescription: `## Overview of ${p.title}

${p.summary}

### Strategic Objectives
The programme equips participants with practical tools, structured mentoring, and market linkages to transition from chronic vulnerability to dignified self-sufficiency.

### Core Interventions
${p.keyActivities.map(a => `• **${a}**: Conducted with rigorous field supervision and practical demonstration.`).join('\n')}

### Sustainable Impact
${p.developmentLink}

### Geographic Coverage & Verification
${p.verifiedScope}`,
    targetBeneficiaries: p.targetBeneficiaries,
    keyActivities: p.keyActivities,
    developmentLink: p.developmentLink,
    verifiedScope: p.verifiedScope,
    location: 'Wakiso District & Countrywide',
    status: 'Published' as const,
    featured: idx < 3,
    publishDate: '2026-03-15',
    createdAt: '2026-03-15T00:00:00Z',
    updatedAt: '2026-04-02T00:00:00Z',
    isCustom: false,
  }))
];

// Seed Updates
const INITIAL_SEED_UPDATES: WebsiteUpdate[] = [
  {
    id: 'upd-1',
    title: 'Aid Combat Empowerment Center (ACE Hub) Field Infrastructure Progress',
    summary: 'Wakiso demonstration greenhouse dome and soil testing benches enter practical training commissioning.',
    fullArticle: `## Significant Progress at the Wakiso Demonstration Facility

We are grateful to report steady operational progress on the **Aid Combat Empowerment Center** located in Wakiso District. The greenhouse seedling nursery dome is now propagating high-yield, disease-tolerant tomato, cabbage, and passion fruit seedlings.

### Key Milestones Completed:
• Assembly of high-capacity nursery nursery beds with micro-drip irrigation.
• Commissioning of on-site veterinary and soil pH diagnostic benches.
• Intake of the first cohort of 25 youth agro-ecology apprentices.
• Delivery of clean bio-secure feed storage containers.

This milestone ensures that rural smallholders and former inmates have access to tested, verified agricultural inputs before planting season.`,
    featuredImage: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
    category: 'ACE Hub Progress',
    author: 'Mukaga Titus Joshua (Country Coordinator)',
    date: '2026-04-08',
    status: 'Published',
    featured: true,
  },
  {
    id: 'upd-2',
    title: 'Kasangati Prison Pre-Release Class Completes Agro-Skills Module',
    summary: '28 inmates in their final 90 days of sentencing complete intensive horticulture training and restorative discipleship.',
    fullArticle: `## Preparing Inmates for Productive Community Reentry

Through our continuous partnership with the Uganda Prisons Service at Kasangati Prison, 28 inmates successfully completed their 6-week intensive pre-release practical training in organic horticulture and small-animal husbandry.

The training included:
• Seedling propagation and nursery bed management
• Budgeting and daily farm ledger bookkeeping
• Restorative conflict resolution and family reconciliation counseling

Upon release, each candidate is enrolled into our confidential 12-Month Post-Release Support Pipeline with verified starter kits.`,
    featuredImage: '/src/assets/images/prison_reintegration_1790277940920.jpg',
    category: 'Prison Outreach',
    author: 'Pastor Egolet Peter (Reintegration Officer)',
    date: '2026-04-04',
    status: 'Published',
    featured: true,
  },
  {
    id: 'upd-3',
    title: 'Distribution of 85 Family Starter-Kits to Rural Widows in Nangabo',
    summary: 'Certified drought-tolerant vegetable seeds, hand tools, and poultry starter kits deployed with field agronomist follow-up.',
    fullArticle: `## Direct Household Food Security in Wakiso District

Eighty-five vulnerable households headed by widows and grandmothers received certified agricultural starter-kits in Nangabo sub-county. 

Each kit package included:
• 200 hardened vegetable seedlings (cabbage, sukuma wiki, tomato)
• Quality hand hoes, watering cans, and organic soil conditioner
• Direct enrollment into our local weekly village savings and prayer fellowship

Initial germination checks conducted by Field Officer Kabasomi Lydia show a 94% seedling establishment rate across target homesteads.`,
    featuredImage: '/src/assets/images/family_starter_kit_1790277954367.jpg',
    category: 'Field Mission',
    author: 'Kabasomi Lydia (Agricultural Field Team)',
    date: '2026-03-29',
    status: 'Published',
    featured: false,
  }
];

// Seed Gallery Images
const INITIAL_SEED_GALLERY: GalleryImage[] = [
  {
    id: 'gal-1',
    url: 'https://i.postimg.cc/GhC5NVNJ/Gemini-Generated-Image-8y9pg68y9pg68y9p.jpg',
    caption: 'Smallholder farmers inspecting organic vegetable cultivation in Wakiso District',
    category: 'Agriculture',
    isFeatured: true,
    isVisible: true,
    uploadedDate: '2026-04-01',
    order: 1,
  },
  {
    id: 'gal-2',
    url: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg',
    caption: 'Greenhouse dome nursery unit propagating resilient crop seedlings at the ACE Hub',
    category: 'ACE Hub',
    isFeatured: true,
    isVisible: true,
    uploadedDate: '2026-04-02',
    order: 2,
  },
  {
    id: 'gal-3',
    url: '/src/assets/images/vocational_skills_training_1790273232078.jpg',
    caption: 'Youth apprentices practicing precision joinery in the vocational skills workshop',
    category: 'Training',
    isFeatured: true,
    isVisible: true,
    uploadedDate: '2026-04-03',
    order: 3,
  },
  {
    id: 'gal-4',
    url: '/src/assets/images/prison_reintegration_1790277940920.jpg',
    caption: 'Restorative justice counseling and pre-release training session with prison partners',
    category: 'Outreach',
    isFeatured: false,
    isVisible: true,
    uploadedDate: '2026-04-04',
    order: 4,
  },
  {
    id: 'gal-5',
    url: '/src/assets/images/family_starter_kit_1790277954367.jpg',
    caption: 'Beneficiary family receiving verified vegetable seedling starter-kit materials',
    category: 'Community',
    isFeatured: false,
    isVisible: true,
    uploadedDate: '2026-04-05',
    order: 5,
  },
  {
    id: 'gal-6',
    url: '/src/assets/images/clean_water_well_1790277928820.jpg',
    caption: 'Community safe drinking water pump and sanitation demonstration point',
    category: 'Community',
    isFeatured: false,
    isVisible: true,
    uploadedDate: '2026-04-06',
    order: 6,
  },
  {
    id: 'gal-7',
    url: '/src/assets/images/livestock_husbandry_unit_1790193113014.jpg',
    caption: 'Biosecure livestock husbandry and breeding stock demonstration pens',
    category: 'Agriculture',
    isFeatured: false,
    isVisible: true,
    uploadedDate: '2026-04-07',
    order: 7,
  },
  {
    id: 'gal-8',
    url: '/src/assets/images/women_village_savings_1790277977734.jpg',
    caption: 'Rural mothers fellowship group meeting for village savings and financial literacy',
    category: 'Church',
    isFeatured: false,
    isVisible: true,
    uploadedDate: '2026-04-08',
    order: 8,
  }
];

// Seed Upcoming Events
const INITIAL_SEED_EVENTS: UpcomingEvent[] = [
  {
    id: 'evt-1',
    title: 'Rural Smallholder Agro-Diagnostic & Soil Testing Workshop',
    date: '2026-04-24',
    time: '09:00 AM - 03:30 PM',
    location: 'Wakiso ACE Hub Main Training Hall',
    description: 'Free soil testing, pH diagnostics, organic composting demonstration, and seed quality screening for 80 registered smallholders.',
    category: 'Agricultural Workshop',
    status: 'Published',
    registeredCount: 42,
  },
  {
    id: 'evt-2',
    title: 'Buwambo & Sentema Prison Ministry Quarterly Bible Distribution',
    date: '2026-05-08',
    time: '10:00 AM - 01:00 PM',
    location: 'Buwambo & Sentema Correctional Facilities',
    description: 'Distribution of 150 Luganda and English Bibles, personal hygiene soap packs, and pre-release counseling sessions.',
    category: 'Prison Ministry Outreach',
    status: 'Published',
    registeredCount: 18,
  },
  {
    id: 'evt-3',
    title: 'Phase II Starter Kit Asset Deployment (Widows & Single Mothers)',
    date: '2026-05-20',
    time: '08:30 AM - 02:00 PM',
    location: 'Kasangati Community Center Grounds',
    description: 'Deployment of 100 poultry and horticulture starter kits to validated beneficiary families across Wakiso District.',
    category: 'Starter Kit Distribution',
    status: 'Published',
    registeredCount: 65,
  }
];

// Seed Success Stories
const INITIAL_SEED_STORIES: SuccessStory[] = [
  {
    id: 'sty-1',
    title: 'From Prisoner to Thriving Poultry Farmer & Breadwinner',
    beneficiaryName: 'Gerald K. (Kasangati Rehabilitation Cohort)',
    category: 'Justice & Reintegration',
    quote: 'When I stepped out of prison, people turned away. IFHCFI gave me counseling, 25 kuroiler chickens, and taught me how to budget. Today I pay my children’s school fees.',
    narrative: 'Gerald completed a 14-month sentence at Kasangati. Upon release, he enrolled in the 12-month reintegration pipeline, completed family reconciliation sessions with his wife, and received a poultry starter kit. He now manages a flock of 120 layers.',
    photoUrl: '/src/assets/images/prison_reintegration_1790277940920.jpg',
    impactMetric: '100% Recidivism-Free & Self-Sustaining',
    location: 'Wakiso District',
    date: '2026-03-20',
    status: 'Published',
  },
  {
    id: 'sty-2',
    title: 'Widowed Mother of Four Reclaims Food Security',
    beneficiaryName: 'Mama Nalubega Florence (Nangabo Homestead)',
    category: 'Vulnerable Family Support',
    quote: 'Before the seed kit, my children ate once a day. Now we have fresh greens every evening and extra cabbage to sell at the local market.',
    narrative: 'After losing her husband, Florence struggled to provide for four young children. Through the IFHCFI Family Support Programme, she established an eco-friendly raised vegetable garden. Her surplus harvest provides steady weekly income.',
    photoUrl: '/src/assets/images/women_village_savings_1790277977734.jpg',
    impactMetric: '3 Meals/Day & 45,000 UGX Weekly Savings',
    location: 'Nangabo Sub-county',
    date: '2026-03-25',
    status: 'Published',
  }
];

// Seed Contact Messages
const INITIAL_SEED_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Dr. Arthur Ssemakula',
    email: 'arthur.s@uganda-agro-allies.org',
    phone: '+256 772 458 910',
    organization: 'Uganda Agro Allies Foundation',
    category: 'Partnership Inquiry',
    subject: 'Collaboration on Nursery Seedling Quality Testing & Distribution',
    message: 'We have reviewed your Aid Combat Empowerment Center concept note and would like to explore supplying certified drought-resistant horticultural seeds for your Wakiso and Nakasongola outreach.',
    date: '2026-04-07',
    status: 'New',
    adminNotes: 'Field Coordinator Mukaga to schedule a discovery call next Monday.',
  },
  {
    id: 'msg-2',
    name: 'Sister Grace Mbabazi',
    email: 'grace.mbabazi@fellowshipchurches.ug',
    phone: '+256 701 889 231',
    organization: 'Kasangati Community Baptist Fellowship',
    category: 'Volunteer Service',
    subject: 'Volunteer Teachers for Weekend Youth Carpentry & Discipleship',
    message: 'Our church has 3 licensed master carpenters willing to offer free Saturday morning apprentice classes for reformed youths enrolled at the ACE Hub.',
    date: '2026-04-05',
    status: 'Read',
    adminNotes: 'Forwarded to Anyango Sarah (Training Officer).',
  }
];

// Seed Activity Log
const INITIAL_SEED_ACTIVITIES: AdminActivityItem[] = [
  {
    id: 'act-1',
    action: 'Updated Flagship Programme Profile',
    targetType: 'programme',
    targetTitle: 'Aid Combat Empowerment Center (ACE Hub)',
    timestamp: '2026-04-08 14:22',
    user: 'Mukaga Titus Joshua',
  },
  {
    id: 'act-2',
    action: 'Published Field News Article',
    targetType: 'update',
    targetTitle: 'Wakiso Greenhouse Dome Progress',
    timestamp: '2026-04-08 11:05',
    user: 'Super Administrator',
  },
  {
    id: 'act-3',
    action: 'Added New Beneficiary Testimony',
    targetType: 'story',
    targetTitle: 'Gerald K. Poultry Farming Story',
    timestamp: '2026-04-07 16:45',
    user: 'Pastor Egolet Peter',
  },
  {
    id: 'act-4',
    action: 'Uploaded High-Res Gallery Image',
    targetType: 'gallery',
    targetTitle: 'ACE Hub Seedling Nursery Unit',
    timestamp: '2026-04-06 09:30',
    user: 'Kabasomi Lydia',
  },
  {
    id: 'act-5',
    action: 'Scheduled Upcoming Event',
    targetType: 'event',
    targetTitle: 'Agro-Diagnostic Workshop',
    timestamp: '2026-04-05 13:10',
    user: 'Super Administrator',
  }
];

// ==========================================
// STORAGE ACCESSORS WITH FAILSAFES
// ==========================================

export function getAdminProgrammes(): AdminProgramme[] {
  if (typeof window === 'undefined') return INITIAL_SEED_PROGRAMMES;
  try {
    const raw = localStorage.getItem(KEY_PROGRAMMES);
    if (!raw) {
      localStorage.setItem(KEY_PROGRAMMES, JSON.stringify(INITIAL_SEED_PROGRAMMES));
      return INITIAL_SEED_PROGRAMMES;
    }
    const parsed: AdminProgramme[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Auto-migrate any cached older combat center image reference
      const migrated = parsed.map(p => {
        if (p.id === 'combat-center' && (p.image?.includes('seedling-nursery-hero-realistic') || !p.image)) {
          return { ...p, image: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg' };
        }
        return p;
      });
      return migrated;
    }
    return INITIAL_SEED_PROGRAMMES;
  } catch (e) {
    console.error('Error reading programmes from storage:', e);
    return INITIAL_SEED_PROGRAMMES;
  }
}

export function saveAdminProgrammes(programmes: AdminProgramme[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_PROGRAMMES, JSON.stringify(programmes));
    // Dispatch custom event so listeners update immediately
    window.dispatchEvent(new Event('ifhcfi_programmes_updated'));
  } catch (e) {
    console.error('Error saving programmes to storage:', e);
  }
}

export function getWebsiteUpdates(): WebsiteUpdate[] {
  if (typeof window === 'undefined') return INITIAL_SEED_UPDATES;
  try {
    const raw = localStorage.getItem(KEY_UPDATES);
    if (!raw) {
      localStorage.setItem(KEY_UPDATES, JSON.stringify(INITIAL_SEED_UPDATES));
      return INITIAL_SEED_UPDATES;
    }
    const parsed: WebsiteUpdate[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(u => {
        if (u.featuredImage?.includes('seedling-nursery-hero-realistic')) {
          return { ...u, featuredImage: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg' };
        }
        return u;
      });
    }
    return INITIAL_SEED_UPDATES;
  } catch (e) {
    console.error('Error reading updates from storage:', e);
    return INITIAL_SEED_UPDATES;
  }
}

export function saveWebsiteUpdates(updates: WebsiteUpdate[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_UPDATES, JSON.stringify(updates));
    window.dispatchEvent(new Event('ifhcfi_updates_updated'));
  } catch (e) {
    console.error('Error saving updates to storage:', e);
  }
}

export function getGalleryImages(): GalleryImage[] {
  if (typeof window === 'undefined') return INITIAL_SEED_GALLERY;
  try {
    const raw = localStorage.getItem(KEY_GALLERY);
    if (!raw) {
      localStorage.setItem(KEY_GALLERY, JSON.stringify(INITIAL_SEED_GALLERY));
      return INITIAL_SEED_GALLERY;
    }
    const parsed: GalleryImage[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(img => {
        if (img.url?.includes('seedling-nursery-hero-realistic')) {
          return { ...img, url: 'https://i.postimg.cc/C1qp29XX/Gemini-Generated-Image-1ppnm1ppnm1ppnm1.jpg' };
        }
        return img;
      });
    }
    return INITIAL_SEED_GALLERY;
  } catch (e) {
    console.error('Error reading gallery from storage:', e);
    return INITIAL_SEED_GALLERY;
  }
}

export function saveGalleryImages(images: GalleryImage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_GALLERY, JSON.stringify(images));
    window.dispatchEvent(new Event('ifhcfi_gallery_updated'));
  } catch (e) {
    console.error('Error saving gallery to storage:', e);
  }
}

export function getUpcomingEvents(): UpcomingEvent[] {
  if (typeof window === 'undefined') return INITIAL_SEED_EVENTS;
  try {
    const raw = localStorage.getItem(KEY_EVENTS);
    if (!raw) {
      localStorage.setItem(KEY_EVENTS, JSON.stringify(INITIAL_SEED_EVENTS));
      return INITIAL_SEED_EVENTS;
    }
    const parsed: UpcomingEvent[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEED_EVENTS;
  } catch (e) {
    console.error('Error reading events from storage:', e);
    return INITIAL_SEED_EVENTS;
  }
}

export function saveUpcomingEvents(events: UpcomingEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_EVENTS, JSON.stringify(events));
    window.dispatchEvent(new Event('ifhcfi_events_updated'));
  } catch (e) {
    console.error('Error saving events to storage:', e);
  }
}

export function getSuccessStories(): SuccessStory[] {
  if (typeof window === 'undefined') return INITIAL_SEED_STORIES;
  try {
    const raw = localStorage.getItem(KEY_STORIES);
    if (!raw) {
      localStorage.setItem(KEY_STORIES, JSON.stringify(INITIAL_SEED_STORIES));
      return INITIAL_SEED_STORIES;
    }
    const parsed: SuccessStory[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEED_STORIES;
  } catch (e) {
    console.error('Error reading stories from storage:', e);
    return INITIAL_SEED_STORIES;
  }
}

export function saveSuccessStories(stories: SuccessStory[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_STORIES, JSON.stringify(stories));
    window.dispatchEvent(new Event('ifhcfi_stories_updated'));
  } catch (e) {
    console.error('Error saving stories to storage:', e);
  }
}

export function getContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return INITIAL_SEED_MESSAGES;
  try {
    const raw = localStorage.getItem(KEY_MESSAGES);
    if (!raw) {
      localStorage.setItem(KEY_MESSAGES, JSON.stringify(INITIAL_SEED_MESSAGES));
      return INITIAL_SEED_MESSAGES;
    }
    const parsed: ContactMessage[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEED_MESSAGES;
  } catch (e) {
    console.error('Error reading messages from storage:', e);
    return INITIAL_SEED_MESSAGES;
  }
}

export function saveContactMessages(messages: ContactMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_MESSAGES, JSON.stringify(messages));
    window.dispatchEvent(new Event('ifhcfi_messages_updated'));
  } catch (e) {
    console.error('Error saving messages to storage:', e);
  }
}

export function addContactMessage(message: Omit<ContactMessage, 'id' | 'date' | 'status'>): void {
  const current = getContactMessages();
  const newMsg: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'New',
  };
  saveContactMessages([newMsg, ...current]);
  logAdminActivity('Received New Contact Inquiry', 'message', newMsg.subject, 'Website Visitor');
}

export function getActivityLog(): AdminActivityItem[] {
  if (typeof window === 'undefined') return INITIAL_SEED_ACTIVITIES;
  try {
    const raw = localStorage.getItem(KEY_ACTIVITIES);
    if (!raw) {
      localStorage.setItem(KEY_ACTIVITIES, JSON.stringify(INITIAL_SEED_ACTIVITIES));
      return INITIAL_SEED_ACTIVITIES;
    }
    const parsed: AdminActivityItem[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEED_ACTIVITIES;
  } catch (e) {
    console.error('Error reading activity log:', e);
    return INITIAL_SEED_ACTIVITIES;
  }
}

export function logAdminActivity(
  action: string,
  targetType: AdminActivityItem['targetType'],
  targetTitle: string,
  user: string = 'Super Administrator'
): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getActivityLog();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    const newItem: AdminActivityItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      targetType,
      targetTitle,
      timestamp,
      user,
    };
    const updated = [newItem, ...current].slice(0, 50); // Keep last 50 activities
    localStorage.setItem(KEY_ACTIVITIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('ifhcfi_activity_updated'));
  } catch (e) {
    console.error('Error logging activity:', e);
  }
}

// Reset to defaults
export function resetToOfficialDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY_PROGRAMMES, JSON.stringify(INITIAL_SEED_PROGRAMMES));
  localStorage.setItem(KEY_UPDATES, JSON.stringify(INITIAL_SEED_UPDATES));
  localStorage.setItem(KEY_GALLERY, JSON.stringify(INITIAL_SEED_GALLERY));
  localStorage.setItem(KEY_EVENTS, JSON.stringify(INITIAL_SEED_EVENTS));
  localStorage.setItem(KEY_STORIES, JSON.stringify(INITIAL_SEED_STORIES));
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(INITIAL_SEED_MESSAGES));
  localStorage.setItem(KEY_ACTIVITIES, JSON.stringify(INITIAL_SEED_ACTIVITIES));
  
  window.dispatchEvent(new Event('ifhcfi_programmes_updated'));
  window.dispatchEvent(new Event('ifhcfi_updates_updated'));
  window.dispatchEvent(new Event('ifhcfi_gallery_updated'));
  window.dispatchEvent(new Event('ifhcfi_events_updated'));
  window.dispatchEvent(new Event('ifhcfi_stories_updated'));
  window.dispatchEvent(new Event('ifhcfi_messages_updated'));
  window.dispatchEvent(new Event('ifhcfi_activity_updated'));
}

// Export / Import
export function exportAllAdminData(): string {
  return JSON.stringify({
    version: '2.0',
    exportedAt: new Date().toISOString(),
    programmes: getAdminProgrammes(),
    updates: getWebsiteUpdates(),
    gallery: getGalleryImages(),
    events: getUpcomingEvents(),
    stories: getSuccessStories(),
    messages: getContactMessages(),
    activities: getActivityLog(),
  }, null, 2);
}

export function importAllAdminData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.programmes && Array.isArray(data.programmes)) saveAdminProgrammes(data.programmes);
    if (data.updates && Array.isArray(data.updates)) saveWebsiteUpdates(data.updates);
    if (data.gallery && Array.isArray(data.gallery)) saveGalleryImages(data.gallery);
    if (data.events && Array.isArray(data.events)) saveUpcomingEvents(data.events);
    if (data.stories && Array.isArray(data.stories)) saveSuccessStories(data.stories);
    if (data.messages && Array.isArray(data.messages)) saveContactMessages(data.messages);
    logAdminActivity('Imported System Data Backup', 'system', 'Full Database Backup Restore', 'Super Administrator');
    return true;
  } catch (e) {
    console.error('Import failed:', e);
    return false;
  }
}
