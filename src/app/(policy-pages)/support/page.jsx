"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";

const faqs = [
  {
    question: "How can I access my already purchased course which I am unable to find?",
    answer: (
      <>
        If you purchased a course from Skill Foundry, you can access all your purchased content by visiting{" "}
        <a href="https://skill-foundry.in/dashboard" className="text-blue-600 underline">
          skill-foundry.in/dashboard
        </a>
        .
      </>
    ),
  },
  {
    question: "I am facing login issues",
    answer: (
      <>
        If you're having trouble logging in, please contact us directly at{" "}
        <a href="mailto:support@skill-foundry.in" className="text-blue-600 underline">
          support@skill-foundry.in
        </a>
        . We'll be happy to assist you as soon as possible.
      </>
    ),
  },
  {
    question: "I want to change my certificate name",
    answer: (
      <>
        If you need to change the name on your certificate, please email us at{" "}
        <a href="mailto:support@skill-foundry.in" className="text-blue-600 underline">
          support@skill-foundry.in
        </a>{" "}
        with your request and the correct name you want to appear on the certificate.
      </>
    ),
  },
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
                  <div className="px-4 py-3 text-gray-700 bg-white border-t">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <LandingFooter/>
    </>
  );
}
