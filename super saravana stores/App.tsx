import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { authService } from './services/mockApi';

// Pages
import Home from './pages/Home';
import { AboutUs, BranchesPage, CategoriesPage, NewsPage, ContactPage, NotFound } from './pages/InfoPages';
import { BranchDetail, ProductDetail, BlogDetail } from './pages/DetailsPages';
import { LoginPage } from './pages/AuthPages';
import { 
    AdminDashboardHome, 
    ProductManager, 
    CategoryManager, 
    BranchManager, 
    SubmissionManager, 
    BannerManager 
} from './pages/AdminPages';

// ScrollToTop component to ensure pages start at top on navigation
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);
    
    return authService.isAuthenticated() ? <>{children}</> : null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="branches/:id" element={<BranchDetail />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<BlogDetail />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="branches" element={<BranchManager />} />
            <Route path="inquiries" element={<SubmissionManager />} />
            <Route path="banners" element={<BannerManager />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;