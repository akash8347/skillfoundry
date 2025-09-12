"use client"
import Navbar from "@/components/LandingPageComponents/Navbar";
import OrderSummary from "./OrderSummary";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import { useState, useEffect } from "react";

export default function OrderSummaryPage() {
  const [customer, setCustomer] = useState({ email: "", mobile: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedForm = localStorage.getItem("checkoutForm");
      if (savedForm) {
        setCustomer(JSON.parse(savedForm));
      }
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Order Summary Card */}
            <div className="lg:col-span-2">
                <OrderSummary />
            </div>

            {/* Customer Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 h-fit border border-gray-100">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Details
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <>
                    <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
                      <div className="h-3 w-20 bg-gray-300 rounded mb-2" />
                      <div className="h-5 w-40 bg-gray-300 rounded" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
                      <div className="h-3 w-20 bg-gray-300 rounded mb-2" />
                      <div className="h-5 w-32 bg-gray-300 rounded" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                      <p className="font-medium text-gray-900">{customer.email}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                      <p className="font-medium text-gray-900">{customer.mobile}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Your information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </>
  );
}