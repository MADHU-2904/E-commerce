// --- Generic API Responses ---

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLinks {
  self: string;
  first: string;
  prev: string | null;
  next: string | null;
  last: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
}

// --- Domain Entities ---

export interface Category {
  category_id: string;
  name: string;
  slug: string;
  icon_url: string;
  product_count?: number;
}

export interface ProductVariant {
  variant_id: string;
  attributes: Record<string, string>; // e.g., { "Color": "Red", "Size": "XL" }
  stock_quantity: number;
  additional_price: number;
}

export interface ProductImage {
  image_id: string;
  url: string;
  sort_order: number;
}

export interface Product {
  product_id: string;
  name: string;
  sku: string;
  category_id: string;
  price: number;
  original_price?: number;
  main_image_url: string;
  rating: number;
  is_new?: boolean;
  description?: string;
  specs?: Record<string, string>;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface Branch {
  branch_id: string;
  name: string;
  location: string; // City/State
  address: string;
  phone_number: string;
  email: string;
  map_url: string;
  operating_hours: string;
  image_url: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Banner {
  banner_id: string;
  image_url: string;
  title: string;
  subtitle: string;
  cta_text: string;
  link_url: string;
}

export interface BlogPost {
  post_id: string;
  title: string;
  slug: string;
  snippet: string;
  content?: string; // HTML or Markdown
  author: string;
  publish_date: string; // ISO Date String
  thumbnail_url: string;
  image_url?: string;
}

export interface Testimonial {
  testimonial_id: string;
  customer_name: string;
  location: string;
  quote: string;
  rating: number;
  image_url: string;
}

export interface ContactSubmissionRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
