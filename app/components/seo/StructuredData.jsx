export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": `${baseUrl}/`,
        "name": "Protein Per Scoop",
        "description": "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Protein Per Scoop",
        "url": `${baseUrl}/`,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": `${baseUrl}/#/schema/logo/image/`,
          "url": `${baseUrl}/logo.png`,
          "contentUrl": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512,
          "caption": "Protein Per Scoop"
        },
        "image": {
          "@id": `${baseUrl}/#/schema/logo/image/`
        },
        "sameAs": [
          "https://www.facebook.com/proteinperscoop",
          "https://twitter.com/proteinperscoop",
          "https://www.instagram.com/proteinperscoop"
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": `${baseUrl}/`,
        "name": "Protein Per Scoop - Best Protein Supplement Deals & Fitness Nutrition",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#organization`
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "description": "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.",
        "breadcrumb": {
          "@id": `${baseUrl}/#breadcrumb`
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [`${baseUrl}/`]
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
