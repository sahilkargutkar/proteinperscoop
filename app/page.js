"use client"

import Image from "next/image";
import CardComponent from "./components/card/card.component";
import { SkeletonGrid } from "./components/skeleton/skeleton.component";
import { useState, useEffect } from "react";
import { redirect,useRouter } from "next/navigation";
import { getCategorySlug } from "./utils/helpers";


export default function Home() {
  const [categorizedDeals, setCategorizedDeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Function to categorize deals
  const categorizeDeals = (deals) => {
    if (!deals) return {};
    const categorized = deals.reduce((acc, deal) => {
      const category = deal.category || 'Other'; // Fallback for items without a category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(deal);
      return acc;
    }, {});

    // Limit each category to 4 deals
    Object.keys(categorized).forEach(category => {
      categorized[category] = categorized[category].slice(0, 4);
    });

    return categorized;
  };

  // Function to handle API call
  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/getDeals');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
     
      let categorized = {};
      
      if (data.success && data.data && data.data.categories) {
        const categories = data.data.categories;
        
        Object.keys(categories).forEach(categoryName => {
          const categoryData = categories[categoryName];
          if (categoryData.deals && Array.isArray(categoryData.deals)) {
            // Limit to 4 deals per category
            categorized[categoryName] = categoryData.deals.slice(0, 4);
          }
        });
      } else if (data.data && data.data.deals) {
        // Fallback for old structure
        const deals = data.data.deals;
        categorized = categorizeDeals(deals);
      } else if (Array.isArray(data)) {
        // Fallback for array structure
        categorized = categorizeDeals(data);
      } else {
        console.log('Unexpected data structure:', data);
        categorized = {};
      }
      setCategorizedDeals(categorized);

    } catch (err) {
      setError(`Failed to fetch deals data: ${err.message}`);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDeals()
  },[])



  const handleRouteChange = (category) => {
    const route = getCategorySlug(category);
    router.push(`/category/${route}`);
  };  

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Catchy Title */}
        <div className="text-center mb-20 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #CD1C18 0%, transparent 70%)' }}></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFA896 0%, transparent 70%)' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="text-6xl md:text-7xl animate-pulse">💪</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-600 bg-clip-text text-transparent">
                Protein Per Scoop
              </span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl mb-4 text-white font-bold tracking-wide">
                Fuel Your Gains with the Best Deals!
              </p>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#FFA896' }}>
                Discover unbeatable prices on premium protein supplements and unlock your fitness potential
              </p>
            </div>
            
            {/* Stats or Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Updated</div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="space-y-20">
            {/* Skeleton sections */}
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-12 bg-gray-700 rounded-full animate-pulse"></div>
                    <div>
                      <div className="w-48 h-12 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
                      <div className="w-32 h-6 bg-gray-600 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-48 h-16 bg-gray-700 rounded-2xl animate-pulse"></div>
                </div>
                <SkeletonGrid count={4} />
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl border-2 shadow-2xl" 
               style={{ 
                 backgroundColor: 'rgba(155, 19, 19, 0.1)', 
                 borderColor: '#CD1C18',
                 backdropFilter: 'blur(10px)'
               }}>
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={fetchDeals}
              className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-white"
              style={{ backgroundColor: '#CD1C18' }}
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && Object.keys(categorizedDeals).length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-white mb-4">No deals found</h3>
            <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
              We're working hard to find the best deals for you. Check back soon!
            </p>
            <button 
              onClick={fetchDeals}
              className="text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-white"
              style={{ backgroundColor: '#CD1C18' }}
            >
              Refresh Deals
            </button>
          </div>
        )}
        
        {Object.keys(categorizedDeals).map((category, categoryIndex) => (
          <div key={category} className="mb-20">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 rounded-full" style={{ backgroundColor: '#CD1C18' }}></div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white capitalize leading-tight">
                    {category}
                  </h2>
                  <p className="text-gray-400 text-lg mt-1">
                    Top {categorizedDeals[category].length} amazing deals
                  </p>
                </div>
              </div>
              
              <button 
                className="group relative text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-transparent overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #CD1C18 0%, #FFA896 50%, #CD1C18 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite'
                }}
                onClick={() => {
                  handleRouteChange(category);
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All {category}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categorizedDeals[category].map((item, index) => (
                <div 
                  key={index}
                  className="transform transition-all duration-300 hover:scale-102"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <CardComponent {...item} />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Floating Action Button */}
        {/* {!loading && Object.keys(categorizedDeals).length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-red-500/25"
              style={{ boxShadow: '0 8px 25px rgba(205, 28, 24, 0.4)' }}
            >
              <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </button>
          </div>
        )} */}
        
        {/* Footer */}
        {!loading && Object.keys(categorizedDeals).length > 0 && (
          <footer className="mt-32 py-16 border-t border-gray-800">
            <div className="text-center">
              <div className="text-6xl mb-6">💪</div>
              <h3 className="text-3xl font-bold text-white mb-4">Stay Strong, Save More</h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Get the best protein supplement deals delivered to your inbox. Never miss out on incredible savings for your fitness journey.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email for deal alerts"
                  className="px-6 py-4 rounded-xl border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 w-full sm:w-80"
                />
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                  Get Deals 🔥
                </button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
