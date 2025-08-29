import { Inter } from "next/font/google";
import "./globals.css";
import DonateButton from "./components/donate/DonateButton";
import StructuredData from "./components/seo/StructuredData";
import Analytics from "./components/seo/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Protein Per Scoop - Best Protein Supplement Deals & Fitness Nutrition",
    template: "%s | Protein Per Scoop"
  },
  description: "Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands. Save up to 60% on supplements.",
  keywords: [
    "protein supplements", "whey protein deals", "creatine supplements", "fitness nutrition", 
    "supplement discounts", "protein powder", "bodybuilding supplements", "fitness deals",
    "nutrition supplements", "protein bargains", "supplement savings", "gym supplements",
    "health supplements", "protein comparison", "supplement store", "fitness nutrition deals"
  ],
  authors: [{ name: 'Protein Per Scoop Team', url: 'https://proteinperscoop.com' }],
  creator: 'Protein Per Scoop',
  publisher: 'Protein Per Scoop',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://proteinperscoop.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Protein Per Scoop',
    title: 'Protein Per Scoop - Best Protein Supplement Deals & Fitness Nutrition',
    description: 'Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition from top brands.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Protein Per Scoop - Best Supplement Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proteinperscoop',
    creator: '@proteinperscoop',
    title: 'Protein Per Scoop - Best Protein Supplement Deals',
    description: 'Find the best protein supplement deals, discounts, and savings. Compare prices on whey protein, creatine, and fitness nutrition.',
    images: ['/twitter-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'fitness',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <Analytics />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://proteinperscoop.com'}`} />
        <meta name="theme-color" content="#dc2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Protein Per Scoop" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        {children}
        <DonateButton />
      </body>
    </html>
  );
}
