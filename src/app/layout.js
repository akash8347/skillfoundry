import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from "@/components/LandingPageComponents/Navbar";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'react-hot-toast';
import ClarityScript from './ClarityScript'
import { CurrencyProvider } from "./Context/CurrencyContext";
import { getInitialCurrency } from "@/lib/getInitialCurrency";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const { currency, encryptedCode, courses, symbol } = await getInitialCurrency(); // server call

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0f172a" />

        {/* SEO Meta Tags */}
        <title>SkillFoundry — Learn Programming & Upgrade Your Skills</title>
        <meta name="title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta name="description" content="SkillFoundry is a leading platform offering high-quality programming and tech courses to help you level up your career." />
        <meta name="keywords" content="SkillFoundry, programming courses, web development, learn coding, JavaScript, HTML, CSS, Next.js, tech courses, online learning" />
        <meta name="author" content="SkillFoundry" />
        <link rel="canonical" href="https://skillfoundry.in/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skillfoundry.in/" />
        <meta property="og:title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta property="og:description" content="Join SkillFoundry and master programming with expert-led courses on JavaScript, Web Design, and more." />
        <meta property="og:image" content="https://skillfoundry.in/logo.webp" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://skillfoundry.in/" />
        <meta property="twitter:title" content="SkillFoundry — Learn Programming & Upgrade Your Skills" />
        <meta property="twitter:description" content="Join SkillFoundry and master programming with expert-led courses on JavaScript, Web Design, and more." />
        <meta property="twitter:image" content="https://skillfoundry.in/logo.webp" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data (JSON-LD for Branding) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SkillFoundry",
              url: "https://skillfoundry.in",
              logo: "https://skillfoundry.in/logo.webp",
              sameAs: [
                "https://www.instagram.com/skillfoundry",
                "https://www.linkedin.com/company/skillfoundry",
                "https://twitter.com/skillfoundry"
              ]
            }),
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0ZH0MENPZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0ZH0MENPZ');
          `}
        </Script>

        {/* Razorpay */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <CurrencyProvider 
      initialCurrency={currency} 
      initialEncrypted={encryptedCode}
      courses={courses}
      symbol={symbol}
    >
          <Toaster position="top-center" />
          <ClarityScript />
          {children}
          <Analytics />
          <SpeedInsights />
        </CurrencyProvider>

      </body>
    </html>
  );
}
