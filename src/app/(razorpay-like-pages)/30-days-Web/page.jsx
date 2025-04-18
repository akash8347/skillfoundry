"use client"
import Navbar from "@/components/LandingPageComponents/Navbar";
import JavaScriptBookSection from "./lib/JavaScriptBookSection";
import ProjectsBookSection from "./lib/ProjectsBookSection";
import HTMLCSS from "./lib/HTMLCSS";
import Bonus from "./lib/Bonus";
import FAQSection from "./lib/FAQSection";
import UrgencyBadge from "@/components/LandingPageComponents/UrgencyBadge";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import StickyBuyNow from "@/components/LandingPageComponents/StickyBuyNow";
import { useState } from "react";
import WebCheckout from "./lib/WebCheckout";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingLayout() {

  const [checkoutOpen, setCheckoutOpen] = useState(false); // Control Checkout Form

  return (
    <>
      <Navbar />
      <UrgencyBadge />

      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-inter">
        {/* Main Section */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:flex lg:space-x-12 lg:py-20 py-5">
          {/* Left Column - Content */}
          <section className="lg:w-2/3 w-full flex flex-col justify-center">
            {/* ✅ Web Pack Section */}
            <div className="mb-8 ">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                30-Day Web design Mastery Pack – ₹199
              </h2>
              <div className="w-16 h-1 bg-blue-600 mb-6" />

              <Image
                width={1200}
                height={700}
                src="/main-image.webp"
                alt="web design Mastery Pack"
                className="w-full rounded-lg  mb-6"
                priority={true}
              />

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                These structured, hands-on web design guides take you from beginner to advanced with real-world projects to make you job-ready. Whether you're starting from scratch or sharpening your skills, this pack has everything you need.
              </p>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">What You’ll Get:</h3>

              <JavaScriptBookSection />
              <ProjectsBookSection />
              <HTMLCSS />
              <Bonus />
              <FAQSection />
            </div>

          </section>
          <WebCheckout isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />

          {/* Right Column - Sticky Card */}
          <aside className="lg:w-1/3 hidden lg:block relative">
            <div className="sticky top-22">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-6 rounded-2xl shadow-xl flex flex-col">
                <div className="mb-6">
                  {/* <div className="bg-gray-200 h-40 rounded-lg mb-6" /> */}
                  <Image
                    width={200}
                    height={300}
                    src="/main-image.webp"
                    alt="web design Mastery Pack"
                    className="w-full rounded-lg shadow-lg mb-6"
                  />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Start Learning Today</h2>
                  <p className="text-sm text-gray-600">
                    Unlock premium Guides and grow your web design knowledge.
                  </p>
                </div>
                <Button className="w-full  text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  onClick={() => setCheckoutOpen(true)}

                >
                  Buy Now
                </Button>
              </div>
            </div>
          </aside>
        </main>
        <LandingFooter />
        <StickyBuyNow setCheckoutOpen={setCheckoutOpen} />

      </div>
    </>
  );
}
