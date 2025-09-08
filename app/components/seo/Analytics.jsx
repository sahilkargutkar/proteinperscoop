export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <>
      {/* Google Analytics GA4 or Google Tag Manager */}
      {gaId && (
        <>
          {gaId.startsWith('GTM-') ? (
            // Google Tag Manager
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${gaId}');
                  `,
                }}
              />
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            </>
          ) : (
            // Google Analytics GA4
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', {
                      page_title: document.title,
                      page_location: window.location.href,
                      send_page_view: true
                    });
                  `,
                }}
              />
            </>
          )}
        </>
      )}

      {/* Google Search Console verification */}
      {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
      )}
      
      {/* Bing Webmaster Tools verification */}
      {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
      )}
      
      {/* Pinterest verification */}
      {process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION && (
        <meta name="p:domain_verify" content={process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION} />
      )}
      
      {/* Facebook domain verification */}
      {process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION && (
        <meta name="facebook-domain-verification" content={process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION} />
      )}
    </>
  );
}
