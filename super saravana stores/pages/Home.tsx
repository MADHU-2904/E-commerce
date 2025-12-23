import React from 'react';
import { Link } from 'react-router-dom';
import { BannerCarousel, Section, BranchCard, CategoryCard, ProductCard, BlogCard } from '../components/SharedComponents';
import { BRANCHES, CATEGORIES, PRODUCTS, BLOG_POSTS, TESTIMONIALS } from '../constants';
import { Quote, Instagram } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const featuredBranches = BRANCHES.slice(0, 3);
  const recentNews = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <BannerCarousel />

      {/* Categories */}
      <Section title="Shop By Category" subtitle="Explore our wide range of premium collections">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </Section>

      {/* Offers & Savings (Product Showcase) */}
      <Section title="Offers & Savings" subtitle="Exclusive deals picked just for you" className="bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/categories" className="inline-block border-2 border-brand-blue text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-brand-blue hover:text-white transition-colors">
            View All Offers
          </Link>
        </div>
      </Section>

      {/* Branches */}
      <Section title="Our Branches" subtitle="Find the nearest Super Saravana Stores">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBranches.map(branch => <BranchCard key={branch.id} branch={branch} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/branches" className="text-brand-blue font-bold hover:text-brand-gold underline decoration-2 underline-offset-4">
            See All Locations
          </Link>
        </div>
      </Section>

      {/* Testimonials */}
      <Section title="Customer Love" dark>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10 relative">
              <Quote className="w-10 h-10 text-brand-gold opacity-50 absolute top-4 left-4" />
              <p className="text-gray-200 italic mb-6 relative z-10 pt-4">"{t.quote}"</p>
              <div className="flex items-center">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-gold mr-4" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <span className="text-xs text-brand-gold">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section title="News & Media">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentNews.map(news => <BlogCard key={news.id} post={news} />)}
        </div>
      </Section>

      {/* Instagram Feed Placeholder */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center text-brand-blue font-bold text-xl">
               <Instagram className="mr-2" /> @SuperSaravanaStores
             </div>
             <a href="#" className="text-sm font-semibold text-brand-gold hover:underline">Follow Us</a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-gray-300 relative group overflow-hidden cursor-pointer">
                <img src={`https://picsum.photos/id/${60+i}/300/300`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;