import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BRANCHES, PRODUCTS, BLOG_POSTS, CATEGORIES } from '../constants';
import { MapPin, Phone, Clock, Mail, Share2, CheckCircle, ArrowLeft, Calendar, User } from 'lucide-react';
import { ProductCard } from '../components/SharedComponents';

// --- Helper to handle 404 in details ---
const NotFoundBanner = ({ type }: { type: string }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">{type} Not Found</h2>
    <p className="text-gray-600 mb-8">The {type.toLowerCase()} you are looking for does not exist or has been removed.</p>
    <Link to="/" className="bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-blue transition-colors">Go Home</Link>
  </div>
);

// --- Branch Detail Page ---
export const BranchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const branch = BRANCHES.find(b => b.id === id);

  if (!branch) return <NotFoundBanner type="Branch" />;

  return (
    <div className="bg-white">
      {/* Header Image */}
      <div className="h-[40vh] relative">
        <img src={branch.image} alt={branch.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">{branch.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-brand-blue mb-6 border-b pb-2">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-brand-gold mr-3 shrink-0 mt-1" />
                  <p className="text-gray-700">{branch.address}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
                  <p className="text-gray-700">{branch.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
                  <p className="text-gray-700">{branch.email}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
                  <p className="text-gray-700">{branch.hours}</p>
                </div>
              </div>
              <a 
                href={branch.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="block mt-6 w-full text-center border-2 border-brand-blue text-brand-blue py-2 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-brand-blue">About This Branch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Welcome to our {branch.name}. Located in the heart of {branch.location}, this store offers an unparalleled shopping experience. 
              Spanning multiple floors, we host an extensive collection of silk sarees, gold jewellery, textiles, household articles, and electronics. 
              Our dedicated staff is here to ensure you find exactly what you are looking for.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-brand-blue">Store Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <img key={i} src={`https://picsum.photos/id/${200+i}/300/300`} className="rounded-lg shadow-sm hover:shadow-md transition-shadow" alt="Store Interior" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Product Detail Page ---
export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  
  // Find related products (same category, not current product)
  const related = product ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3) : [];

  if (!product) return <NotFoundBanner type="Product" />;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="bg-gray-100 p-8 flex items-center justify-center">
               <img src={product.image} alt={product.name} className="max-w-full max-h-[500px] object-contain shadow-xl rounded-lg" />
            </div>

            {/* Info */}
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-bold text-brand-gold uppercase tracking-wider">{product.category}</span>
                 {product.isNew && <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">In Stock</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">{product.name}</h1>
              
              <div className="flex items-baseline mb-6 space-x-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="block text-xs text-gray-400 uppercase">{key}</span>
                    <span className="block font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-brand-blue text-white font-bold py-4 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center">
                   <CheckCircle className="w-5 h-5 mr-2" /> Buy Online
                </button>
                <button className="flex-1 border-2 border-brand-blue text-brand-blue font-bold py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                   <MapPin className="w-5 h-5 mr-2" /> Find at Branch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-brand-blue mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Blog Detail Page ---
export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(b => b.id === id);

  if (!post) return <NotFoundBanner type="Article" />;

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link to="/news" className="inline-flex items-center text-gray-500 hover:text-brand-blue mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-bold text-brand-blue mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 text-sm mb-8 space-x-6 border-b border-gray-100 pb-8">
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</div>
          <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author}</div>
          <button className="flex items-center hover:text-brand-gold ml-auto"><Share2 className="w-4 h-4 mr-2" /> Share</button>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-auto rounded-xl shadow-lg mb-10" />

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="leading-relaxed whitespace-pre-line">{post.content}</p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h3 className="text-2xl font-bold text-brand-blue mt-8 mb-4">Why Choose Super Saravana?</h3>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>
    </div>
  );
};
