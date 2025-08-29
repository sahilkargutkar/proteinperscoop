// app/sitemap.xml/route.js

// Function to fetch deals from your API
async function getDeals() {
  try {
    // This fetch is to your internal API route, which then calls the external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getDeals`);
    if (!res.ok) {
      throw new Error('Failed to fetch deals');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching deals for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  const baseUrl = 'https://proteinperscoop.com'; // Replace with your actual domain

  // Get all deals
  const deals = await getDeals();

  // Create sitemap entries for each deal
  const dealUrls = deals.map(deal => ({
    url: `${baseUrl}/deal/${deal.id}`, // Assuming you have a [dealId] page
    lastModified: new Date(deal.created_at).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // ... other static pages
    ...dealUrls,
  ];
}
