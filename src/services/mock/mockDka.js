/**
 * TruckMitr One — Driver Ki Awaaz Mock Service
 * 
 * Community media platform, audio stories, road alerts & driver welfare broadcasts.
 * Canonical Slug: 'driver-ki-awaaz'
 */

export const INITIAL_DKA_POSTS = [
  {
    id: 'dka-101',
    title: 'Monsoon Highway Waterlogging Alert on Mumbai-Goa NH66',
    authorName: 'Rameshwar Yadav',
    authorTmid: 'TM2609001',
    category: 'Road Alert',
    audioDuration: '2m 15s',
    listensCount: 1420,
    likesCount: 384,
    status: 'APPROVED',
    createdAt: '2026-09-14 08:30',
    description: 'Heavy waterlogging near Chiplun Ghat section. Single lane movement open for heavy commercial multi-axle trailers. Maintain low gear.',
    tags: ['NH66', 'Monsoon', 'SafetyAlert']
  },
  {
    id: 'dka-102',
    title: '15 Years on the Golden Quadrilateral: Lessons for Rookie Drivers',
    authorName: 'Balwinder Singh',
    authorTmid: 'TM2609004',
    category: 'Driver Stories',
    audioDuration: '5m 40s',
    listensCount: 3290,
    likesCount: 892,
    status: 'APPROVED',
    createdAt: '2026-09-13 19:20',
    description: 'Balwinder paaji shares his golden rules of cabin ergonomics, night fatigue management, and managing tire heat during summer Rajasthan transits.',
    tags: ['LifeOnRoad', 'Inspiration', 'Experience']
  },
  {
    id: 'dka-103',
    title: 'New FASTag & Toll Plaza KYC Guidelines Explained in Simple Hindi',
    authorName: 'TruckMitr Editorial Desk',
    authorTmid: 'STAFF',
    category: 'Safety & Welfare',
    audioDuration: '3m 10s',
    listensCount: 2850,
    likesCount: 640,
    status: 'APPROVED',
    createdAt: '2026-09-12 11:00',
    description: 'NHAI update on dual FASTag deactivation and quick vehicle registration number sync steps.',
    tags: ['FASTag', 'GovtPolicy', 'TollGuide']
  },
  {
    id: 'dka-104',
    title: 'Best 24/7 Dhabas with Clean Washrooms between Jaipur and Ahmedabad',
    authorName: 'Sunil Gurjar',
    authorTmid: 'TM2609006',
    category: 'Amenities & Dhabas',
    audioDuration: '4m 05s',
    listensCount: 1980,
    likesCount: 512,
    status: 'APPROVED',
    createdAt: '2026-09-11 21:40',
    description: 'Review of 4 top roadside rest stops with secured heavy truck parking, mechanic bays, and subsidized healthy meals for drivers.',
    tags: ['DhabaGuide', 'NH48', 'RestStops']
  },
  {
    id: 'dka-105',
    title: 'Diesel Theft Incident Warning at Vadodara Bypass Layby',
    authorName: 'Deepak Chauhan',
    authorTmid: 'TM2609003',
    category: 'Road Alert',
    audioDuration: '1m 50s',
    listensCount: 890,
    likesCount: 210,
    status: 'PENDING_REVIEW',
    createdAt: '2026-09-14 10:15',
    description: 'Unidentified gang operating around 2 AM near km-stone 84. Park only inside well-lit petrol pumps or authorized dhabas.',
    tags: ['SecurityWarning', 'Vadodara', 'NightAlert']
  }
];

const STORAGE_KEY = 'tm_one_dka_posts_v1';

export const getDkaPosts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse DKA posts', err);
  }
  return INITIAL_DKA_POSTS;
};

export const saveDkaPosts = (posts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event('tm_dka_updated'));
  } catch (err) {
    console.error('Failed to save DKA posts', err);
  }
};

export const addDkaPost = (post) => {
  const current = getDkaPosts();
  const newPost = {
    ...post,
    id: `dka-${Date.now()}`,
    likesCount: 0,
    listensCount: 0,
    status: 'PENDING_REVIEW',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  const updated = [newPost, ...current];
  saveDkaPosts(updated);
  return newPost;
};
