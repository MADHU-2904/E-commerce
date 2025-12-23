import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, MapPin, Facebook, Instagram, Twitter, Youtube, Phone, Mail } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Simple check for login state based on localStorage
  const isLoggedIn = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-blue shadow-lg py-2' : 'bg-brand-blue/95 py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold tracking-wider text-brand-gold uppercase">Super</span>
          <span className="text-xl font-semibold tracking-wide">Saravana Stores</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium items-center">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
          <Link to="/categories" className="hover:text-brand-gold transition-colors">Shop</Link>
          <Link to="/branches" className="hover:text-brand-gold transition-colors">Branches</Link>
          <Link to="/news" className="hover:text-brand-gold transition-colors">News</Link>
          <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </nav>

        {/* Utilities */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/10 border border-white/20 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-brand-gold w-48 transition-all"
            />
            <Search className="w-4 h-4 absolute right-3 top-2 text-gray-300 pointer-events-none" />
          </div>
          
          <Link 
            to={isLoggedIn ? "/admin" : "/login"} 
            className={`hover:text-brand-gold transition-colors ${isLoggedIn ? 'text-brand-gold' : ''}`}
            title={isLoggedIn ? "Go to Dashboard" : "Login"}
          >
            <User className="w-5 h-5" />
          </Link>

          <button className="hover:text-brand-gold relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-blue text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6 text-brand-gold" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-brand-blue border-t border-white/10 absolute w-full transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 space-y-4 text-white">
          <Link to="/" className="block py-2 border-b border-white/10">Home</Link>
          <Link to="/categories" className="block py-2 border-b border-white/10">Shop Categories</Link>
          <Link to="/branches" className="block py-2 border-b border-white/10">Branches</Link>
          <Link to="/about" className="block py-2 border-b border-white/10">About Us</Link>
          <Link to="/news" className="block py-2 border-b border-white/10">News & Blog</Link>
          <Link to="/contact" className="block py-2 border-b border-white/10">Contact Us</Link>
          <Link to={isLoggedIn ? "/admin" : "/login"} className="block py-2 border-b border-white/10 text-brand-gold font-semibold">
            {isLoggedIn ? "Admin Dashboard" : "Login"}
          </Link>
          <div className="pt-2">
            <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-white text-gray-900 rounded p-2 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Col */}
        <div>
          <div className="mb-6">
             <span className="text-2xl font-bold text-brand-gold uppercase block">Super</span>
             <span className="text-xl font-semibold text-white">Saravana Stores</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            The ultimate shopping destination for the entire family. Tradition meets quality in every aisle.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-blue transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            Quick Links
            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-gold"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link to="/branches" className="hover:text-brand-gold transition-colors">Locate Stores</Link></li>
            <li><Link to="/news" className="hover:text-brand-gold transition-colors">Latest News</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            Categories
            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-gold"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/categories" className="hover:text-brand-gold transition-colors">Silk Sarees</Link></li>
            <li><Link to="/categories" className="hover:text-brand-gold transition-colors">Gold Jewellery</Link></li>
            <li><Link to="/categories" className="hover:text-brand-gold transition-colors">Men's Wear</Link></li>
            <li><Link to="/categories" className="hover:text-brand-gold transition-colors">Electronics</Link></li>
            <li><Link to="/categories" className="hover:text-brand-gold transition-colors">Home Appliances</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            Contact Us
            <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-brand-gold"></span>
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
              <span>No. 45, Ranganathan Street, T. Nagar, Chennai - 600017</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
              <span>+91 44 1234 5678</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
              <span>support@supersaravana.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 mt-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Super Saravana Stores. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};