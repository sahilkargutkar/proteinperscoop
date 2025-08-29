export default function Analytics() {
  return (
    <>
      {/* Google Analytics - replace with your GA4 tracking ID */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
            }}
          />
        </>
      )}

      {/* Google Search Console verification */}
      <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
      
      {/* Bing Webmaster Tools verification */}
      <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
      
      {/* Pinterest verification */}
      <meta name="p:domain_verify" content={process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION} />
      
      {/* Facebook domain verification */}
      <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION} />
    </>
  );
}
