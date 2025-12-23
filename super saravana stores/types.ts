export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  isNew?: boolean;
  rating: number;
  sku?: string; // Added for Admin
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  mapUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  productCount?: number; // Added for Admin
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface ContactSubmissionRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token?: string;
}