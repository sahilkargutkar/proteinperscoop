export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://proteinperscoop.com/#website",
        "url": "https://proteinperscoop.com/",
        "name": "Protein Per Scoop",
        "description": "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.",
        "publisher": {
          "@id": "https://proteinperscoop.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://proteinperscoop.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://proteinperscoop.com/#organization",
        "name": "Protein Per Scoop",
        "url": "https://proteinperscoop.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://proteinperscoop.com/#/schema/logo/image/",
          "url": "https://proteinperscoop.com/logo.png",
          "contentUrl": "https://proteinperscoop.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "Protein Per Scoop"
        },
        "image": {
          "@id": "https://proteinperscoop.com/#/schema/logo/image/"
        },
        "sameAs": [
          "https://www.facebook.com/proteinperscoop",
          "https://twitter.com/proteinperscoop",
          "https://www.instagram.com/proteinperscoop"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://proteinperscoop.com/#webpage",
        "url": "https://proteinperscoop.com/",
        "name": "Protein Per Scoop - Best Protein Supplement Deals & Fitness Nutrition",
        "isPartOf": {
          "@id": "https://proteinperscoop.com/#website"
        },
        "about": {
          "@id": "https://proteinperscoop.com/#organization"
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "description": "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.",
        "breadcrumb": {
          "@id": "https://proteinperscoop.com/#breadcrumb"
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": ["https://proteinperscoop.com/"]
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://proteinperscoop.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://proteinperscoop.com/"
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
