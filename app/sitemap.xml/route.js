import { NextResponse } from 'next/server';

// Function to fetch deals from your API
async function getDeals() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getDeals`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) {
      throw new Error('Failed to fetch deals');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching deals for sitemap:", error);
    return [];
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://proteinperscoop.com';
  
  // Define all the protein supplement categories
  const categories = [
    'whey-protein',
    'casein-protein',
    'plant-protein',
    'protein-bars',
    'creatine',
    'pre-workout',
    'post-workout',
    'bcaa',
    'vitamins',
    'mass-gainers',
    'fat-burners',
    'amino-acids'
  ];

  // Get deals for dynamic content
  const deals = await getDeals();
  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Category pages -->
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/category/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  
  <!-- Deal pages (if you have individual deal pages) -->
  ${deals.slice(0, 500).map(deal => `
  <url>
    <loc>${baseUrl}/deal/${deal.id}</loc>
    <lastmod>${deal.created_at ? new Date(deal.created_at).toISOString() : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Static pages -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
