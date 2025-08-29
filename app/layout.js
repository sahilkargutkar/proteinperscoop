import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DonateButton from "./components/donate/DonateButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Protein Per Scoop - Track Your Protein Intake",
  description: "The ultimate app for tracking your daily protein intake and finding the best protein deals. Achieve your fitness goals with Protein Per Scoop.",
  keywords: ["protein", "fitness", "nutrition", "supplements", "deals", "tracker", "calculator"],
  authors: [{ name: 'Protein Per Scoop' }],
  openGraph: {
    title: 'Protein Per Scoop - Track Your Protein Intake',
    description: 'The ultimate app for tracking your daily protein intake and finding the best protein deals.',
    url: 'https://proteinperscoop.com', // Replace with your actual domain
    siteName: 'Protein Per Scoop',
    images: [
      {
        url: '/og-image.png', // It's good practice to have an Open Graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Per Scoop - Track Your Protein Intake',
    description: 'The ultimate app for tracking your daily protein intake and finding the best protein deals.',
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['/twitter-image.png'], // It's good practice to have a Twitter image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <DonateButton />
      </body>
    </html>
  );
}
