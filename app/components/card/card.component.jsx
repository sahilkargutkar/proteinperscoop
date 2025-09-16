import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { trackDealClick } from '../../lib/analytics';
import OptimizedImage from '../ui/OptimizedImage';

const CardComponent = ({
  id,
  title, 
  name,
  description, 
  summary,
  price,
  original_price,
  discount_percentage,
  category, 
  image_url, 
  image, 
  url, 
  link,
  rating,
  created_at,
  date,
  scraped_at,
  brand,
  website,
  stock_status,
  index = 0, // Add index prop for priority loading
  ...props
}) => {
   // State for dynamic freshness updates
   const [freshness, setFreshness] = useState({ percentage: 100, label: '🔥 Hot' });

   // Update freshness every minute
   useEffect(() => {
       const getDealFreshness = () => {
           const now = new Date();
           const currentHour = now.getHours();
           const currentMinutes = now.getMinutes();
           
           // Calculate total minutes since midnight
           const totalMinutesFromMidnight = currentHour * 60 + currentMinutes;
           
           // 11:59 PM is 23:59, which is 1439 minutes from midnight
           const maxMinutesInDay = 1439; // 23 * 60 + 59 = 1439
           
           // Calculate freshness percentage (inverted so it decreases over time)
           // At midnight (0 minutes): 100% fresh
           // At 11:59 PM (1439 minutes): ~0% fresh
           const freshnessPercentage = Math.max(0, Math.round(100 - (totalMinutesFromMidnight / maxMinutesInDay) * 100));
           
           return {
               percentage: freshnessPercentage,
               label: freshnessPercentage > 80 ? '🔥 Hot' : 
                      freshnessPercentage > 60 ? '🌟 Warm' : 
                      freshnessPercentage > 40 ? '⚡ Cooling' : 
                      freshnessPercentage > 20 ? '❄️ Cold' : '💤 Almost Expired'
           };
       };

       const updateFreshness = () => {
           setFreshness(getDealFreshness());
       };

       // Initial update
       updateFreshness();

       // Set interval to update every minute (60000ms)
       const interval = setInterval(updateFreshness, 60000);

       // Cleanup interval on component unmount
       return () => clearInterval(interval);
   }, []);

   // Handle different possible field names from API
   const dealTitle = title || name || 'Product Title';
   const dealDescription = description || summary || 'High-quality supplement for your fitness goals';
   const dealImage =image_url
   const dealUrl = url || link;
   const dealDate = created_at || date || scraped_at;
   const dealCategory = category || 'General';
   const dealPrice = price;
   const dealOriginalPrice = original_price;
   const dealRating = rating;
   const dealBrand = brand || website;

   // Calculate discount percentage based on original_price and price
   const calculateDiscount = () => {
     if (!dealOriginalPrice || !dealPrice) return null;
     
     // Parse prices to numbers, removing currency symbols and commas
     const originalPrice = parseFloat(dealOriginalPrice.toString().replace(/[^0-9.]/g, ''));
     const currentPrice = parseFloat(dealPrice.toString().replace(/[^0-9.]/g, ''));
     
     if (originalPrice <= 0 || currentPrice <= 0 || currentPrice >= originalPrice) return null;
     
     const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
     
     // Cap discount at 99% maximum
     return Math.min(discountPercent, 99);
   };
   
   const dealDiscount = calculateDiscount() || discount_percentage;

   const getStockImage = (category) => {
    console.log("Getting stock image for category:", category);

       const stockImages = {
           "Fish Oil": "https://media.istockphoto.com/id/654379506/photo/two-capsules-omega-3-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=fAM84_HDeY9sOnTEhIx2po15KCDnuqbpUpbYWO_RM88=",
           "Performance Supplements": "https://images.unsplash.com/photo-1693996045435-af7c48b9cafb??w=400&h=300&fit=crop&crop=center",
           "Protein": "https://via.placeholder.com/500?text=Main+Course",
       };
       return stockImages[category] || stockImages.main
   };

   const handleRouteChange = (url) => {
    if (url) {
        // Track deal click event
        trackDealClick(
            dealTitle || title || name,
            category,
            dealPrice || price || original_price
        );
        
        // Open external link in a new tab/window
        window.open(url, '_blank', 'noopener,noreferrer');
    }
   };

   const getDealDate = (date) => {
    if (!date) {
        return 'just now';
    }
    const dealDate = new Date(date);
    const now = new Date();
    const timeDiff = now.getTime() - dealDate.getTime(); // difference in milliseconds

    const minutes = Math.floor(timeDiff / (1000 * 60));
    if (minutes < 1) {
        return 'just now';
    }
    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
};


    return (
       <>
{/* 
    <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
            <svg className="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.005 455.005"
                style="enable-background:new 0 0 455.005 455.005;" xml:space="preserve">
                <g>
                    <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"> </path>
                    <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"> </path>
                    <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"> </path>
                    <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"> </path>
                    <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"> </path>
                    <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"> </path>
                    <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"> </path>
                </g>
            </svg>
            <Link href="#" className="font-semibold inline-block">Cooking Blog</Link>
        </div>
        <Link href="#">See All</Link>
    </div> */}


    

   
        <div 
          className="group relative rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-gray-200 bg-white backdrop-blur-sm cursor-pointer"
          onClick={() => handleRouteChange(dealUrl)}
          style={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            minHeight: '420px'
          }}
        >
            {/* Image Container with Enhanced Overlays */}
            <div className="relative h-56 overflow-hidden">
                <OptimizedImage
                    src={dealImage || getStockImage(dealCategory)}
                    alt={dealTitle || `${dealCategory} supplement deal`}
                    width={400}
                    height={224}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 3} // Prioritize first 3 images for faster loading
                    preload={index < 6} // Preload first 6 images
                    fallbackSrc={getStockImage(dealCategory)}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge - Top Right */}
                <div 
                  className="absolute top-4 right-4 px-3 py-1.5 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: 'rgba(205, 28, 24, 0.9)',
                    boxShadow: '0 4px 12px rgba(205, 28, 24, 0.3)'
                  }}
                >
                  {dealCategory.replace(' Supplements', '')}
                </div>
                
                {/* Discount Badge - Top Left */}
                {dealDiscount && dealDiscount > 0 && (
                    <div 
                      className="absolute top-4 left-4 px-3 py-1.5 font-black text-white text-sm rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-110 animate-pulse"
                      style={{ 
                        backgroundColor: '#CD1C18',
                        boxShadow: '0 4px 12px rgba(205, 28, 24, 0.4)'
                      }}
                    >
                      -{(dealDiscount)}% OFF
                    </div>
                )}
                
                {/* Price Badge - Bottom Left */}
                {dealPrice && (
                    <div 
                      className="absolute bottom-4 left-4 px-4 py-2 rounded-xl border-2 border-white backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div className="font-black text-xl text-white">{dealPrice}</div>
                      {dealOriginalPrice && (
                        <div className="line-through text-sm font-medium" style={{ color: '#FFA896' }}>
                          {dealOriginalPrice}
                        </div>
                      )}
                    </div>
                )}
                
                {/* Hover Effect Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Content Area */}
            <div className="px-6 py-5 flex-grow flex flex-col">
                {/* Brand Badge */}
                {dealBrand && (
                    <div className="inline-flex items-center mb-3">
                        <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full" 
                              style={{ 
                                color: '#9B1313', 
                                backgroundColor: 'rgba(155, 19, 19, 0.1)',
                                border: '1px solid rgba(155, 19, 19, 0.2)'
                              }}>
                            {dealBrand}
                        </span>
                    </div>
                )}
                
                {/* Title */}
                <h3 className="font-black text-xl mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300 leading-tight" 
                    style={{ color: '#1a1a1a' }}>
                    {dealTitle}
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-4 line-clamp-3 flex-grow leading-relaxed" 
                   style={{ color: '#6b7280' }}>
                   {dealDescription}
                </p>
                
                {/* Rating */}
                {dealRating && (
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(dealRating) ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`} 
                                         fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm font-semibold" style={{ color: '#4b5563' }}>
                                {dealRating}/5
                            </span>
                        </div>
                        
                        {/* Stock Status */}
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">In Stock</span>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Enhanced Footer */}
            <div className="px-6 py-4 border-t-2 transition-all duration-300" 
                 style={{ 
                   backgroundColor: 'rgba(0, 0, 0, 0.95)', 
                   borderColor: '#CD1C18',
                   background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
                 }}>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Added
                        </span>
                        <span className="text-sm text-white font-semibold">
                            {getDealDate(dealDate)}
                        </span>
                    </div>
                    
                    <button 
                      className="group relative text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center overflow-hidden border-2 border-white/20 hover:border-white/40"
                      style={{ 
                        background: 'linear-gradient(135deg, #CD1C18 0%, #9B1313 100%)',
                        boxShadow: '0 4px 12px rgba(205, 28, 24, 0.3)'
                      }}
                    >
                        <span className="relative z-10 flex items-center">
                            <svg className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            View Deal
                        </span>
                        
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </button>
                </div>
                
                {/* Progress bar for deal freshness */}
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Deal Freshness</span>
                        <span>{freshness.label}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                            className="h-1.5 rounded-full transition-all duration-1000" 
                            style={{ 
                                backgroundColor: freshness.percentage > 60 ? '#CD1C18' : 
                                               freshness.percentage > 30 ? '#FFA896' : 
                                               '#9B1313',
                                width: `${freshness.percentage}%`,
                                boxShadow: `0 0 10px rgba(205, 28, 24, ${freshness.percentage / 100})`
                            }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                        {freshness.percentage}% Fresh
                    </div>
                </div>
            </div>
        </div>


        
     

</>

    );
};

export default CardComponent;