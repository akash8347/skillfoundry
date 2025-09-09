'use client'
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "@/components/LandingPageComponents/Navbar";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center"
        >
          {/* Brand Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.webp"
              alt="Skill Foundry Logo"
              className="h-8"
            />
          </div>

          {/* Success Icon */}
                    <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />


          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You for Your Purchase!
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            We’ve sent the access details to your email. Please check your inbox
            (and spam folder just in case) for further instructions.
          </p>

          {/* Email Note */}
          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 text-sm text-gray-700">
            <Mail className="text-gray-500 w-5 h-5" />
            <span>
              Didn’t receive the email? Contact us at
              <a
                href="mailto:support@skill-foudry.in"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                support@skill-foudry.in
              </a>
            </span>
          </div>
        </motion.div> 
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
