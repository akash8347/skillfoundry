"use client"
import Navbar from "@/components/LandingPageComponents/Navbar";
import PythonBookSection from "./lib/PythonBookSection";
// import ProjectsBookSection from "./lib/ProjectsBookSection";
import HTMLCSS from "./lib/HTMLCSS";
// import Bonus from "./lib/Bonus";
import FAQSection from "../30-days-Web/lib/FAQSection";
import UrgencyBadge from "@/components/LandingPageComponents/UrgencyBadge";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import StickyBuyNow from "@/components/LandingPageComponents/StickyBuyNow";
import { useState } from "react";
import PYCheckout from "./lib/PYCheckout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import WhyAffordable from "../comman-components/WhyAffordable";
import BundleOfferBanner from "../comman-components/BundleOfferBanner";
import AIBookSection from "./lib/AIBookSection";
import AutomationPythonBookSection from "./lib/AutomationPythonBookSection";
import WebDevPythonBookSection from "./lib/WebDevPythonBookSection";
import { useRouter } from "next/navigation";
import DataScience from "./lib/DataScience";
import Cheatsheet from "./lib/Cheatsheet";

export default function LandingLayout() {

  const [checkoutOpen, setCheckoutOpen] = useState(false); // Control Checkout Form
  const router = useRouter();

  return (
    <>
      <title>30days of Python mastery</title>

      <Navbar />
      <UrgencyBadge price={249} />

      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-inter">
        {/* Main Section */}
        <main className="flex-1 w-full max-w-7xl mx-auto  lg:flex lg:space-x-12 lg:py-20 py-3">
          {/* Left Column - Content */}
          <section className="lg:w-2/3 w-full flex flex-col justify-center">
            {/* ✅ JavaScript Pack Section */}
            <div className="mb-8 px-6">
              {/* <h2 className="font-sans text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                30-days of Python Mastery 6+ Expert Guides Collection
                & 150+ advanced Python projects

              </h2> */}
{/* font removed like font-sans removed and instead of text-2xl set text-[1.6rem] */}
              <h2 className=" sm:mt-0 text-[1.6rem] lg:text-3xl font-bold text-gray-800 mb-2">
                30-days of Python Mastery
                <div className="pl-[0.1rem] text-[1.2rem] lg:text-xl  font-normal text-gray-600">
                  6+ Expert Guides Collection
                  & 100+ advanced Python projects
                </div>
              </h2>
              <div className="w-16 h-1 bg-blue-600 mb-3 md:mb-6" />

              <Image
                width={1200}
                height={700}
                src="/last.webp"
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
                  <span className="text-gray-500">1,200+ students</span>
                </div>
              </div>
              {/* <MobileOfferCard/> */}

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Boost Your Career, Deepen Your Knowledge, and Build Job-Ready Skills in Automation, AI, Web Development, Data Science, and Project Development.

              </p>

              {/* <div className="md:hidden mb-8 pt-5 pb-6 px-4 bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] relative">
               
                <div className="absolute -top-3 left-4 bg-white px-2 py-1 border border-gray-200 rounded-md shadow-sm">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Guides Include</span>
                </div>

                <ul className="space-y-3 mt-2">
                  {[
                    "Day-by-Day structured Python learning",
                    "Artificial Intelligence in Python",
                    "Data Science with Python",
                    "Automation using Python",
                    "Web development using Python",
                    "150+ Total (core + game) Projects",
                    "Python code cheatsheet",
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className="relative mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                      </div>
                      <span className="text-gray-800 text-[0.92rem] font-medium leading-tight group-hover:text-gray-900 transition-colors">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}
<div className="md:hidden mb-6 mt-8 bg-white rounded-lg border border-gray-200 relative">
  {/* Colored badge title */}
  <div className="absolute -top-3 left-3">
    <div className="bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
      COMPLETE COLLECTION
    </div>
  </div>

  <ul className="p-4 pt-5 space-y-2.5">
    {[
      "Day-by-Day structured Python learning",
      "Artificial Intelligence in Python", 
      "Data Science with Python",
      "Automation using Python",
      "Web development using Python",
      "150+ Total (core + game) Projects",
      "Python code cheatsheet",
    ].map((benefit, idx) => (
      <li key={idx} className="flex items-start">
        {/* Clean check icon */}
        <svg
          className="w-4 h-4 mt-0.5 mr-2 text-emerald-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-gray-800 text-sm">
          {benefit}
        </span>
      </li>
    ))}
  </ul>
</div>


              <h3 className="font-semibold text-lg text-gray-900 mb-2">What You’ll Get:</h3>

              <PythonBookSection />
              <AIBookSection />
              <DataScience></DataScience>
              <AutomationPythonBookSection />
              <WebDevPythonBookSection />
              <HTMLCSS />
              <Cheatsheet />
              <WhyAffordable />
              <BundleOfferBanner />
              <FAQSection />
            </div>

          </section>
          <PYCheckout isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />

          {/* Right Column - Sticky Card */}
          <aside className="lg:w-1/3 hidden lg:block relative">
            <div className="sticky top-22">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-6 rounded-2xl shadow-xl flex flex-col">
                <div className="mb-6">
                  {/* <div className="bg-gray-200 h-40 rounded-lg mb-6" /> */}
                  <Image
                    width={200}
                    height={300}
                    src="/book-bundle.webp"
                    alt="JavaScript Mastery Pack"
                    className="w-full rounded-lg shadow-lg mb-6"
                  />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Start Learning Today</h2>
                  <p className="text-sm text-gray-600">
                    Unlock premium Guides and grow your Javascript knowledge.
                  </p>
                </div>
                <Button className="w-full  text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  // onClick={() => router.push("/30-days-of-python/py-checkout")}
                  onClick={()=>setCheckoutOpen(true)}

                >
                  Buy Now
                </Button>
              </div>
            </div>
          </aside>
        </main>
        <LandingFooter />
        <StickyBuyNow upsell={true} setCheckoutOpen={setCheckoutOpen} />


      </div>





    </>
  );
}
