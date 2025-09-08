import { Inter } from "next/font/google";
import "./globals.css";
import DonateButton from "./components/donate/DonateButton";
import StructuredData from "./components/seo/StructuredData";
import Analytics from "./components/seo/Analytics";
import GoogleAnalytics from "./lib/analytics";

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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'your-yandex-verification-code',
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || 'your-yahoo-verification-code',
  },
  category: 'fitness',
  manifest: '/manifest.json',
  themeColor: '#dc2626',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Protein Per Scoop',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#dc2626',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData />
        <Analytics />
        <GoogleAnalytics />
        {children}
        <DonateButton />
      </body>
    </html>
  );
}
