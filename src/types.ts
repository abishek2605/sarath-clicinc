export interface Treatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  tag?: string;
  image: string;
  price?: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  treatment: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  email?: string;
  treatment?: string;
  preferredTime?: string;
  consultationType?: 'ONLINE' | 'IN-CLINIC';
  submittedAt: string;
}

export interface BeforeAfterCardItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'hair' | 'skin';
  beforeImg?: string;
  afterImg?: string;
  fullImg?: string;
  sessionsBadge: string;
  treatmentTag: string;
}

export interface VideoReelItem {
  id: string;
  profileName: string;
  coBrand: string;
  profilePic: string;
  thumbnail: string;
  caption: string;
  likes: string;
  comments: string;
  instagramUrl: string;
}

