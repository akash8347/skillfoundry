import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/LandingPageComponents/Navbar";
import Head from 'next/head'; // optional, but not used in App Router. Metadata goes directly inside <head>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillFoundry — Learn Programming & Upgrade Your Skills",
  description: "SkillFoundry is a leading platform offering high-quality programming and tech courses to help you level up your career.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>SkillFoundry — Learn Programming & Upgrade Your Skills</title>
        <meta name="title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta name="description" content="SkillFoundry is a leading platform offering high-quality programming and tech courses to help you level up your career." />
        <meta name="keywords" content="SkillFoundry, programming courses, web development, learn coding, JavaScript, HTML, CSS, Next.js, tech courses, online learning" />
        <meta name="author" content="SkillFoundry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Favicon */}
        <link rel="icon" href="public/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skillfoundry.in/" />
        <meta property="og:title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta property="og:description" content="Join SkillFoundry and master programming with expert-led courses on JavaScript, Web Design, and more." />
        <meta property="og:image" content="https://skillfoundry.in/title-logo.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://skillfoundry.in/" />
        <meta property="twitter:title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta property="twitter:description" content="Join SkillFoundry and master programming with expert-led courses on JavaScript, Web Design, and more." />
        <meta property="twitter:image" content="https://skillfoundry.in/title-logo.jpg" />

        

        {/* Razorpay Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
