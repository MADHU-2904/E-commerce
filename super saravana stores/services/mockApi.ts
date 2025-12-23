import { Product, Category, Branch, ContactSubmission, Banner, User, ContactSubmissionRequest } from '../types';
import { PRODUCTS, CATEGORIES, BRANCHES, MOCK_CONTACT_SUBMISSIONS } from '../constants';

// --- In-Memory State (Simulating Database) ---
// Initialize with constants, but allow mutation
let products = [...PRODUCTS];
let categories = [...CATEGORIES];
let branches = [...BRANCHES];
let submissions = [...MOCK_CONTACT_SUBMISSIONS];
let banners: Banner[] = [
    {
      id: '1',
      image: 'https://picsum.photos/id/401/1920/800',
      title: 'Grand Wedding Collections',
      subtitle: 'Timeless Elegance for Your Special Day',
      cta: 'Explore Wedding Store',
      link: '/categories/wedding',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
];

// Delay helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth Service ---
export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    await delay(800);
    if (username === 'admin@supersaravana.com' && password === 'admin123') {
      const user: User = {
        id: 'u1',
        name: 'Super Admin',
        email: username,
        role: 'admin',
        token: 'mock-jwt-token-' + Date.now()
      };
      localStorage.setItem('authToken', user.token!);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  
  logout: async () => {
    await delay(200);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// --- Public Service (New) ---
export const publicService = {
  submitContactForm: async (data: ContactSubmissionRequest) => {
    await delay(800); // Simulate network request
    
    const newSubmission: ContactSubmission = {
      id: 'sub-' + Date.now(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      date: new Date().toISOString().split('T')[0], // Current date YYYY-MM-DD
      isRead: false
    };
    
    // Add to the beginning of the list
    submissions.unshift(newSubmission);
    
    return { success: true };
  }
};

// --- Admin Data Services ---
export const adminService = {
  // Products
  getProducts: async () => {
    await delay(500);
    return products;
  },
  getProduct: async (id: string) => {
    await delay(300);
    return products.find(p => p.id === id);
  },
  saveProduct: async (product: Product) => {
    await delay(600);
    if (product.id) {
        products = products.map(p => p.id === product.id ? product : p);
    } else {
        product.id = 'p-' + Date.now();
        products.push(product);
    }
    return product;
  },
  deleteProduct: async (id: string) => {
    await delay(400);
    products = products.filter(p => p.id !== id);
    return true;
  },

  // Categories
  getCategories: async () => {
    await delay(400);
    // Calculate counts dynamically
    return categories.map(c => ({
        ...c,
        productCount: products.filter(p => p.category === c.name).length
    }));
  },
  saveCategory: async (category: Category) => {
    await delay(500);
    if (category.id) {
        categories = categories.map(c => c.id === category.id ? category : c);
    } else {
        category.id = 'c-' + Date.now();
        categories.push(category);
    }
    return category;
  },
  deleteCategory: async (id: string) => {
    await delay(400);
    const cat = categories.find(c => c.id === id);
    if (cat && products.some(p => p.category === cat.name)) {
        throw new Error('Cannot delete category with associated products.');
    }
    categories = categories.filter(c => c.id !== id);
    return true;
  },

  // Branches
  getBranches: async () => {
    await delay(400);
    return branches;
  },
  saveBranch: async (branch: Branch) => {
    await delay(500);
    if (branch.id) {
        branches = branches.map(b => b.id === branch.id ? branch : b);
    } else {
        branch.id = 'b-' + Date.now();
        branches.push(branch);
    }
    return branch;
  },
  deleteBranch: async (id: string) => {
    await delay(400);
    branches = branches.filter(b => b.id !== id);
    return true;
  },

  // Submissions
  getSubmissions: async () => {
    await delay(400);
    return submissions;
  },
  markAsRead: async (id: string) => {
    await delay(300);
    submissions = submissions.map(s => s.id === id ? { ...s, isRead: true } : s);
    return true;
  },

  // Banners
  getBanners: async () => {
    await delay(400);
    return banners;
  },
  saveBanner: async (banner: Banner) => {
    await delay(500);
    if (banner.id) {
        banners = banners.map(b => b.id === banner.id ? banner : b);
    } else {
        banner.id = 'ban-' + Date.now();
        banners.push(banner);
    }
    return banner;
  },
  deleteBanner: async (id: string) => {
    await delay(400);
    banners = banners.filter(b => b.id !== id);
    return true;
  }
};