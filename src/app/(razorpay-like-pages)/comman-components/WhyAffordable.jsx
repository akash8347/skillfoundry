"use client";
import { CheckCircle } from "lucide-react";

export default function WhyAffordable() {
  return (
    <section className="bg-white text-gray-800 p-6 md:p-12 mt-8 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-xl md:text-3xl font-bold">
          Why Is This Bundle So Affordable?
        </h2>
        <span className="bg-green-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
          INCREDIBLE VALUE
        </span>
      </div>

      <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
        We believe that quality technical education should be accessible to{" "}
        <span className="font-semibold text-gray-900">every Indian</span>, regardless of financial background.
        Our mission is to democratize tech education in India.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side */}
        <div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg mb-4">
            <div className="bg-green-600 p-2 rounded-full mr-3">
              <CheckCircle className="text-white" size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                Massive Content Library
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">1000+ pages of premium guide content</p>
            </div>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              No compromise on quality despite low price
            </li>
            <li className="flex items-center text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              Volume-based business model instead of high margins
            </li>
            <li className="flex items-center text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              Made for Indians by Indians – lower production costs
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between h-full">
          <h3 className="text-base font-semibold mb-4 text-gray-900">The Numbers Speak For Themselves</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-100 rounded-lg p-3 text-center">
              <p className="text-lg md:text-2xl font-bold text-green-800">1000+</p>
              <p className="text-gray-700 text-xs md:text-sm">Pages of Content</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3 text-center">
              <p className="text-lg md:text-2xl font-bold text-green-800">100+</p>
              <p className="text-gray-700 text-xs md:text-sm">Complete Projects</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3 text-center">
              <p className="text-lg md:text-2xl font-bold text-green-800">Life Time</p>
              <p className="text-gray-700 text-xs md:text-sm">Content Access</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3 text-center">
              <p className="text-lg md:text-2xl font-bold text-green-800">5K+</p>
              <p className="text-gray-700 text-xs md:text-sm">Happy Students</p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 p-3 rounded-lg text-gray-600 text-xs md:text-sm leading-relaxed">
            "We could charge 10x more, but our mission is to make tech education
            accessible to every Indian who wants to learn, not just those who can
            afford it."
          </div>
        </div>
      </div>
    </section>
  );
}
