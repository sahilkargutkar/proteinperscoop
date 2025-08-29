import CategoryClient from './CategoryClient';

// Metadata for category pages - this runs on the server
export async function generateMetadata({ params }) {
  const category = await params?.category;

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

// Server component that renders the client component
export default function CategoryPage({ params }) {
  return <CategoryClient params={params} />;
}