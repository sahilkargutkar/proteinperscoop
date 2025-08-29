import Head from 'next/head';

export default function SEOHead({ 
  title = "Protein Per Scoop - Best Protein Supplement Deals & Fitness Nutrition",
  description = "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.",
  keywords = [],
  canonical = "/",
  ogImage = "/og-image.png",
  twitterImage = "/twitter-image.png",
  noindex = false,
  schemaData = null
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://proteinperscoop.com';
  const fullCanonical = `${baseUrl}${canonical}`;

  const defaultKeywords = [
    "protein supplements", "whey protein deals", "creatine supplements", "fitness nutrition", 
    "supplement discounts", "protein powder", "bodybuilding supplements", "fitness deals"
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={fullCanonical} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Protein Per Scoop" />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@proteinperscoop" />
      <meta name="twitter:creator" content="@proteinperscoop" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${twitterImage}`} />
      
      {/* Additional SEO tags */}
      <meta name="author" content="Protein Per Scoop Team" />
      <meta name="publisher" content="Protein Per Scoop" />
      <meta name="copyright" content="© 2024 Protein Per Scoop. All rights reserved." />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Schema.org structured data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
    </Head>
  );
}
