"use client";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "@/components/LandingPageComponents/Navbar";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";

  
export default function Download1() {
  // const [hasPythonAccess, setHasPythonAccess] = useState(false);
  // const [hasJavaScriptAccess, setHasJavaScriptAccess] = useState(false);
  // const [loading, setLoading] = useState(true);

  // const [customer, setCustomer] = useState({ email: "", mobile: "" });


  //  useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedForm = localStorage.getItem("checkoutForm");
  //     if (savedForm) {
  //       setCustomer(JSON.parse(savedForm));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   const fetchAccess = async () => {
  //     try {
  //       console.log("Fetching course access...");
  //       const res = await fetch("/api/course-access");
  //       const data = await res.json();
  //       setHasPythonAccess(data.hasPythonAccess);
  //       setHasJavaScriptAccess(data.hasJavaScriptAccess);
  //     } catch (error) {
  //       console.error("Error fetching access:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAccess();
  // }, []);

//   useEffect(() => {
//     console.log("Customer:", customer);
//     console.log("Python Access:", hasPythonAccess);
//     console.log("JavaScript Access:", hasJavaScriptAccess);
//     console.log("First Time:", localStorage.getItem("firstTime"));
//   if (
//     // localStorage.getItem("firstTime") ==null && // ✅ Check if first time
//     customer.email &&  // ✅ Make sure customer is loaded
//     (hasPythonAccess || hasJavaScriptAccess) // ✅ Ensure access is loaded too
//   ) {
//     const sendEmail = async () => {
//       try {
//         console.log("Sending download link email to:", customer.email);
//         const res = await fetch("/api/send-download-link", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: customer.email,
//             hasPythonAccess,
//             hasJavaScriptAccess,
//           }),
//         });

//         const result = await res.json();
//         if (result.success) {
//           localStorage.setItem("firstTime", "false");
//         } else {
//         }
//       } catch (error) {
//         console.error("Email send error:", error);
//         alert("An error occurred while sending email.");
//       }
//     };

  
//     sendEmail();
//   }
// }, [customer, hasPythonAccess, hasJavaScriptAccess]);




  // const renderDownloadButton = (title, link) => (
  //   <div className="bg-white border rounded-2xl shadow hover:shadow-md transition p-4 flex items-center justify-between">
  //     <div className="flex items-center gap-3">
  //       <Download className="w-6 h-6 text-blue-600" />
  //       <span className="font-medium text-gray-800">{title}</span>
  //     </div>
  //     <a
  //       href={link}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
  //     >
  //       Download
  //     </a>
  //   </div>
  // );

  return (
    // <div className="p-6 max-w-3xl mx-auto space-y-10">
    //   <div className="text-center">
    //     <h2 className="text-4xl font-bold text-gray-800">📚 Downloadable Materials</h2>
    //     <p className="text-gray-600 mt-2">
    //       Access all the premium learning materials for this course below.
    //     </p>
    //   </div>

    //   {loading ? (
    //     <div className="flex justify-center items-center py-20">
    //       <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
    //       <span className="ml-3 text-gray-600 text-lg">Loading materials...</span>
    //     </div>
    //   ) : (
    //     <>
    //       {hasPythonAccess && (
    //         <div className="space-y-4">
    //           <h3 className="text-2xl font-semibold text-gray-700">🐍 Python Downloads</h3>
    //           {renderDownloadButton("Download Python Bundle", "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing")}
    //         </div>
    //       )}

    //       {hasJavaScriptAccess && (
    //         <div className="space-y-4">
    //           <h3 className="text-2xl font-semibold text-gray-700">🟨 JavaScript Downloads</h3>
    //           {renderDownloadButton("Download JavaScript Bundle", "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing")}
    //         </div>
    //       )}
    //     </>
    //   )}
    // </div>
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
            (and spam folder just in case).
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
