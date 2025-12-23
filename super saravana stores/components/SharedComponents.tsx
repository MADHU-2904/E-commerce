import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Phone, Star } from 'lucide-react';
import { Branch, Product, BlogPost, Category } from '../types';

// --- Branch Card ---
export const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col h-full border border-gray-100">
    <div className="relative h-48 overflow-hidden">
      <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 right-4 bg-brand-gold text-brand-blue font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
        Open
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-brand-blue mb-2">{branch.name}</h3>
      <div className="space-y-2 text-sm text-gray-600 mb-6 flex-grow">
        <div className="flex items-start">
          <MapPin className="w-4 h-4 mr-2 mt-1 text-brand-gold shrink-0" />
          <span>{branch.address}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-brand-gold shrink-0" />
          <span>{branch.phone}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-brand-gold shrink-0" />
          <span>{branch.hours}</span>
        </div>
      </div>
      <Link 
        to={`/branches/${branch.id}`} 
        className="block w-full text-center bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-gold hover:text-brand-blue transition-colors"
      >
        Visit Branch
      </Link>
    </div>
  </div>
);

// --- Product Card ---
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100">
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-gray-100">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      {product.isNew && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">NEW</span>
      )}
      {product.originalPrice && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </span>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Link to={`/products/${product.id}`} className="bg-white text-brand-blue font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
          View Details
        </Link>
      </div>
    </div>
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
      <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-brand-blue">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

// --- Category Card ---
export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <Link to={`/categories?filter=${category.slug}`} className="group block relative overflow-hidden rounded-xl h-64 md:h-80">
    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
      <h3 className="text-2xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">{category.name}</h3>
      <span className="text-brand-gold text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center">
        Shop Collection <ArrowRight className="w-4 h-4 ml-2" />
      </span>
    </div>
  </Link>
);

// --- Blog Card ---
export const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="h-48 overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <span className="text-xs font-bold text-brand-gold uppercase mb-2">{post.date}</span>
      <h3 className="text-lg font-bold text-brand-blue mb-3 leading-tight hover:text-brand-gold transition-colors">
        <Link to={`/news/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{post.snippet}</p>
      <Link to={`/news/${post.id}`} className="text-brand-blue text-sm font-semibold flex items-center hover:text-brand-gold">
        Read More <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </div>
);

// --- Hero Banner Carousel ---
export const BannerCarousel: React.FC = () => {
  const banners = [
    {
      id: 1,
      image: 'https://picsum.photos/id/401/1920/800',
      title: 'Grand Wedding Collections',
      subtitle: 'Timeless Elegance for Your Special Day',
      cta: 'Explore Wedding Store'
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/402/1920/800',
      title: 'Aadi Mega Sale',
      subtitle: 'Up to 50% Off on Silk Sarees',
      cta: 'View Offers'
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/403/1920/800',
      title: 'Gold Jewellery Festival',
      subtitle: 'Zero Making Charges on Selected Items',
      cta: 'Shop Gold'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gray-900">
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight transform translate-y-0 transition-transform duration-700 animate-fade-in-up">
              {banner.title}
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              {banner.subtitle}
            </p>
            <button className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 shadow-xl transform hover:scale-105">
              {banner.cta}
            </button>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Section Helper ---
export const Section: React.FC<{ 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode; 
  className?: string; 
  dark?: boolean 
}> = ({ title, subtitle, children, className = '', dark = false }) => (
  <section className={`py-16 ${dark ? 'bg-brand-blue text-white' : 'bg-transparent text-gray-900'} ${className}`}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-brand-blue'}`}>{title}</h2>
        {subtitle && <p className={`text-lg ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
      </div>
      {children}
    </div>
  </section>
);
