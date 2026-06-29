export interface Treatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  tag?: string;
  image: string;
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
  treatment: string;
  preferredTime?: string;
  submittedAt: string;
}
