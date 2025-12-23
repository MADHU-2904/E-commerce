import React, { useState } from 'react';
import { Section, BranchCard, ProductCard, CategoryCard, BlogCard } from '../components/SharedComponents';
import { BRANCHES, CATEGORIES, PRODUCTS, BLOG_POSTS } from '../constants';
import { publicService } from '../services/mockApi';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

// --- About Us ---
export const AboutUs: React.FC = () => (
  <div className="bg-white">
    <div className="bg-brand-blue py-20 text-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
      <p className="text-xl text-brand-gold max-w-2xl mx-auto">A Legacy of Tradition, Trust, and Quality since 1970.</p>
    </div>
    
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Super Saravana Stores has been a household name in South India for decades. What started as a small textile shop has now grown into a retail giant, catering to the diverse needs of millions of customers.
          </p>
          <p className="text-gray-600 leading-relaxed">
             Our journey is defined by our commitment to offering high-quality products at affordable prices. From silk sarees woven by master artisans to the latest electronics, we ensure every customer walks out with a smile.
          </p>
        </div>
        <div>
          <img src="https://picsum.photos/id/405/600/400" alt="Founder" className="rounded-xl shadow-lg" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-8 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-bold text-brand-blue mb-4">Our Mission</h3>
          <p className="text-gray-600">To provide the best shopping experience with a vast variety of products under one roof.</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-xl">
           <h3 className="text-xl font-bold text-brand-blue mb-4">Our Vision</h3>
           <p className="text-gray-600">To be the most preferred retail destination in India, known for value and trust.</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-xl">
           <h3 className="text-xl font-bold text-brand-blue mb-4">Our Values</h3>
           <p className="text-gray-600">Integrity, Customer Satisfaction, Quality, and Innovation.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Branches List Page ---
export const BranchesPage: React.FC = () => (
  <div className="bg-gray-50 min-h-screen">
    <Section title="Our Locations" subtitle="Visit us at a store near you">
      {/* Placeholder Map */}
      <div className="w-full h-96 bg-gray-200 rounded-xl mb-12 flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
           <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
           <p className="text-lg">Interactive Map Component Placeholder</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRANCHES.map(branch => <BranchCard key={branch.id} branch={branch} />)}
      </div>
    </Section>
  </div>
);

// --- Categories Page (Product Listing) ---
export const CategoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white min-h-screen">
       <div className="bg-gray-100 py-12 text-center">
         <h1 className="text-4xl font-bold text-brand-blue">Shop Categories</h1>
       </div>

       <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
         {/* Sidebar */}
         <div className="w-full md:w-1/4 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveFilter('All')}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${activeFilter === 'All' ? 'bg-brand-blue text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  All Products
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.name)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${activeFilter === cat.name ? 'bg-brand-blue text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
         </div>

         {/* Grid */}
         <div className="flex-grow">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
           {filteredProducts.length === 0 && (
             <div className="text-center py-20 text-gray-500">
               No products found in this category.
             </div>
           )}
           
           {/* Pagination */}
           <div className="mt-12 flex justify-center space-x-2">
             <button className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
             <button className="px-4 py-2 bg-brand-blue text-white rounded">1</button>
             <button className="px-4 py-2 border rounded hover:bg-gray-50">2</button>
             <button className="px-4 py-2 border rounded hover:bg-gray-50">3</button>
             <button className="px-4 py-2 border rounded hover:bg-gray-50">Next</button>
           </div>
         </div>
       </div>
    </div>
  );
};

// --- News List Page ---
export const NewsPage: React.FC = () => (
  <div className="bg-gray-50 min-h-screen">
    <Section title="News & Media" subtitle="Updates from Super Saravana Stores">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => <BlogCard key={post.id} post={post} />)}
        {/* Repeating posts to simulate more content */}
        {BLOG_POSTS.map(post => <BlogCard key={`${post.id}-dup`} post={{...post, id: `${post.id}-dup`, title: `Archive: ${post.title}`}} />)}
      </div>
    </Section>
  </div>
);

// --- Contact Us Page ---
export const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
        await publicService.submitContactForm(formData);
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); // Reset form
    } catch (error) {
        console.error('Error submitting form:', error);
        setFormStatus('idle');
        alert('There was a problem sending your message. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-brand-blue py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-brand-gold">We'd love to hear from you.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-brand-blue mb-6">Get in Touch</h2>
            <div className="flex items-start">
               <div className="bg-blue-50 p-3 rounded-full mr-4"><MapPin className="text-brand-blue w-6 h-6" /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Head Office</h4>
                 <p className="text-gray-600">No. 45, Ranganathan Street,<br/>T. Nagar, Chennai - 600017</p>
               </div>
            </div>
            <div className="flex items-start">
               <div className="bg-blue-50 p-3 rounded-full mr-4"><Phone className="text-brand-blue w-6 h-6" /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Customer Support</h4>
                 <p className="text-gray-600">+91 44 1234 5678</p>
                 <p className="text-gray-600">+91 98 7654 3210</p>
               </div>
            </div>
            <div className="flex items-start">
               <div className="bg-blue-50 p-3 rounded-full mr-4"><Mail className="text-brand-blue w-6 h-6" /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Email</h4>
                 <p className="text-gray-600">support@supersaravana.com</p>
                 <p className="text-gray-600">careers@supersaravana.com</p>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-inner border border-gray-100">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-green-600 animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-brand-blue font-bold underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Feedback</option>
                    <option>Careers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
    <h1 className="text-9xl font-bold text-gray-200">404</h1>
    <h2 className="text-3xl font-bold text-brand-blue mt-4">Page Not Found</h2>
    <p className="text-gray-500 mt-2 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
    <a href="/" className="bg-brand-gold text-brand-blue font-bold px-8 py-3 rounded-full hover:bg-white border-2 border-brand-gold hover:shadow-md transition-all">Go Home</a>
  </div>
);