"use client"
import Navbar from "@/components/LandingPageComponents/Navbar";
import JavaScriptBookSection from "./lib/JavaScriptBookSection";
import ProjectsBookSection from "./lib/ProjectsBookSection";
import HTMLCSS from "./lib/HTMLCSS";
import Bonus from "./lib/Bonus";
import FAQSection from "../30-days-Web/lib/FAQSection";
import UrgencyBadge from "@/components/LandingPageComponents/UrgencyBadge";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import StickyBuyNow from "@/components/LandingPageComponents/StickyBuyNow";
import { useState, useEffect } from "react";
import JSCheckout from "./lib/JSCheckout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { UrgencySection } from "../comman-components/UrgencySection";
import WhyAffordable from "../comman-components/WhyAffordable";
import BundleOfferBanner from "../comman-components/BundleOfferBanner";



export default function LandingLayout() {
  const [enrolled, setEnrolled] = useState(43);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChance = Math.random();
      if (randomChance < 0.05) { // 5% chance to increment
        setEnrolled((prev) => prev + 1);
      }
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const [checkoutOpen, setCheckoutOpen] = useState(false); // Control Checkout Form

  return (
    <>
      <title>30 days of Javascript mastery</title>

      <Navbar />
      {/* <UrgencyBadge /> */}

      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-inter">
        {/* Main Section */}
        <main className="flex-1 w-full max-w-7xl mx-auto  lg:flex lg:space-x-12 lg:py-20 py-5">
          {/* Left Column - Content */}
          <section className="lg:w-2/3 w-full flex flex-col justify-center">
            {/* ✅ JavaScript Pack Section */}
            <div className="mb-8 px-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                30-Day JavaScript Mastery Pack – ₹199
              </h2>
              <div className="w-16 h-1 bg-blue-600 mb-6" />

              <Image
                width={1200}
                height={700}
                src="/main-image.webp"
                alt="JavaScript Mastery Pack"
                className="w-full rounded-lg md:mb-6  mb-3"
                priority={true}
              />
              {/* ⭐ Rating Section - moved below image */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium text-gray-700">4.9/5</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">5,000+ students</span>
                </div>
              </div>
              {/* ------------------<MobileOfferCard/> */}
              <div className="md:hidden w-full  my-4">

                {/* Enrollment Stat */}
                <div className="bg-gray-100 border border-gray-300 rounded-xl p-2 text-sm text-gray-700 mb-3">

                  <p>
                    <span className="font-semibold">{enrolled} people</span> enrolled in the last 24 hours!
                  </p>
                </div>

                <button onClick={() => setCheckoutOpen(true)}
                  className="relative w-full bg-gradient-to-r from-teal-400 to-sky-400 text-white font-semibold text-[17px] py-2 rounded-2xl shadow-xl hover:from-teal-500 hover:to-sky-500 transition duration-300">
                    ENROLL NOW
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow">
                    BEST DEAL
                  </span>
                </button>


              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                These structured, hands-on JavaScript guides take you from beginner to advanced with real-world projects to make you job-ready. Whether you're starting from scratch or sharpening your skills, this pack has everything you need.
              </p>




              <h3 className="font-semibold text-lg text-gray-900 mb-2">What You’ll Get:</h3>

              <JavaScriptBookSection />
              <ProjectsBookSection />
              <HTMLCSS />
              <Bonus />
              <WhyAffordable />
              <BundleOfferBanner />
              <FAQSection />
            </div>

          </section>
          <JSCheckout isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />

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
                    alt="JavaScript Mastery Pack"
                    className="w-full rounded-lg shadow-lg mb-6"
                  />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Start Learning Today</h2>
                  <p className="text-sm text-gray-600">
                    Unlock premium Guides and grow your Javascript knowledge.
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
