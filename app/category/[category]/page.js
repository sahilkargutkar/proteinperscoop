"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardComponent from '../../components/card/card.component';
import { SkeletonGrid } from '../../components/skeleton/skeleton.component';
import { getAllDeals, getDBCategory } from '@/app/utils/helpers';
import { useParams } from 'next/navigation'

// Metadata for category pages
export async function generateMetadata({ params }) {
  const category = params?.category;
  const formatCategoryName = (category) => {
    return category ? category.replace(/-/g, ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ') : 'Category';
  };

  const categoryName = formatCategoryName(category);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://proteinperscoop.com';

  return {
    title: `${categoryName} Deals - Best Protein Supplement Discounts | Protein Per Scoop`,
    description: `Find the best ${categoryName.toLowerCase()} deals and discounts. Compare prices, save up to 60% on top brands. Updated daily with the latest protein supplement offers.`,
    keywords: [
      `${categoryName.toLowerCase()} deals`,
      `${categoryName.toLowerCase()} discounts`,
      `${categoryName.toLowerCase()} supplements`,
      `best ${categoryName.toLowerCase()}`,
      `cheap ${categoryName.toLowerCase()}`,
      `${categoryName.toLowerCase()} offers`,
      'protein supplements',
      'fitness nutrition',
      'supplement deals'
    ],
    openGraph: {
      title: `${categoryName} Deals - Best Protein Supplement Discounts`,
      description: `Find the best ${categoryName.toLowerCase()} deals and discounts. Save up to 60% on top brands.`,
      url: `/category/${category}`,
      type: 'website',
      images: [
        {
          url: `/og-${category}.png`,
          width: 1200,
          height: 630,
          alt: `${categoryName} Deals - Protein Per Scoop`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Deals - Best Protein Supplement Discounts`,
      description: `Find the best ${categoryName.toLowerCase()} deals and discounts. Save up to 60% on top brands.`,
      images: [`/twitter-${category}.png`],
    },
    alternates: {
      canonical: `${baseUrl}/category/${category}`,
    },
  };
}

const CategoryPage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const params = useParams()
    const categoryFromDB = getDBCategory(params?.category)
    
    // Format category name for display
    const formatCategoryName = (category) => {
        return category ? category.replace(/%20/g, ' ').split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ') : 'Category';
    };

    const fetchCategoryDeals = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/getDealByCategory?category=${categoryFromDB}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const allConcatDeals = data?.data?.deals;
            setDeals(allConcatDeals);

        } catch (err) {
            console.error('Error fetching deals:', err);
            setError('Failed to fetch deals');
        } finally {
            setLoading(false);
        }
    }, [categoryFromDB]);

    useEffect(() => {
        if (categoryFromDB) {
            fetchCategoryDeals();
        }
    }, [categoryFromDB, fetchCategoryDeals]);

    if (loading) {
        return (
            <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
                    </div>
                    <SkeletonGrid />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center"style={{ 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" 
                         style={{ backgroundColor: 'rgba(205, 28, 24, 0.1)' }}>
                        <svg className="w-12 h-12" style={{ color: '#CD1C18' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-1.734-.833-2.504 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>Oops! Something went wrong</h2>
                    <p className="text-white mb-6">{error}</p>
                    <button 
                        onClick={fetchCategoryDeals}
                        className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                        style={{ backgroundColor: '#CD1C18' }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
    }}>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-4 text-white" >
                        {formatCategoryName(categoryFromDB)} Deals
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto" style={{ color: '#FFA896' }}> 
                        Discover amazing {formatCategoryName(categoryFromDB).toLowerCase()} deals with unbeatable prices and quality you can trust.
                    </p>
                    <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#CD1C18' }}></div>
                </div>

                {/* Deals Grid */}
                {deals.length > 0 ? (
                    <>
                        <div className="mb-6">
                             <div className="flex items-center gap-4">
                           <div className="w-2 h-12 rounded-full" style={{ backgroundColor: '#CD1C18' }}></div>
                            <p className="text-lg font-semibold text-gray-200" >
                                Found {deals.length} deal{deals.length !== 1 ? 's' : ''} in {formatCategoryName(categoryFromDB)}
                            </p>
                        </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {deals.map((deal, index) => (
                                <CardComponent key={deal.id || index} {...deal} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center" 
                             style={{ backgroundColor: 'rgba(205, 28, 24, 0.1)' }}>
                            <svg className="w-16 h-16" style={{ color: '#CD1C18' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
                            No deals found
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                            We couldn&apos;t find any deals in the {formatCategoryName(categoryFromDB)} category right now.
                        </p>
                        <button 
                            onClick={() => router.push('/')}
                            className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg text-lg"
                            style={{ backgroundColor: '#CD1C18' }}
                        >
                            Browse All Deals
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;