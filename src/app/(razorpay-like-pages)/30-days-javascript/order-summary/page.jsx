"use client"
import Navbar from "@/components/LandingPageComponents/Navbar";
import OrderSummary from "../lib/OrderSummary";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import { useSearchParams } from "next/navigation";

export default function OrderSummaryPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const name = searchParams.get("name");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h1>
            <p className="text-gray-600">Review your order before proceeding to payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary Card */}
            <div className="lg:col-span-2">
              <OrderSummary />
            </div>

            {/* Customer Details Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{phone}</p>
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