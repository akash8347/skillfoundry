"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";

const faqs = [
  {
    question: "How can I access my already purchased course which I am unable to find?",
  },
  {
    question: "I am facing login issues",
  },
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success or error

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setMessage(null); // reset msg when switching
  };

  const handleVerify = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("/api/support-mail-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: "✅ Verification successful! Please check your inbox for the course links.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "❌ Email not found. Please double-check and try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "❌ Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Support</h1>

        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="mb-4">
          For any support inquiries or assistance, please feel free to contact us through the following channel:
        </p>
        <ul className="list-disc pl-6 mb-8">
          <li>
            Email:{" "}
            <Link href="mailto:support@skill-foundry.in" className="text-blue-600 underline">
              support@skill-foundry.in
            </Link>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border rounded-md">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-4 py-3 font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                {isOpen && (
                  <div className="px-4 py-3 text-gray-700 bg-white border-t space-y-3">
                    <p>
                      Please enter the <strong>email ID</strong> you used to purchase the course.  
                      We’ll verify it and instantly send you the course access mail.
                    </p>
                    <input
                      type="email"
                      placeholder="Enter your purchase email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleVerify}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify & Send Mail"}
                    </button>
                    {message && (
                      <p
                        className={`text-sm ${
                          message.type === "success" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {message.text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <LandingFooter />
    </>
  );
}
