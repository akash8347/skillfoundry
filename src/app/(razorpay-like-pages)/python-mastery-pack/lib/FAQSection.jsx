"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "1. What happens after I make the payment?",
    answer:
      "After a successful payment, please do not refresh the page. You will receive an email with access to your purchased materials.",
  },
  {
    question: "2. How can I access the product?",
    answer:
      "You will receive an email with all the course materials. You can also log in to your dashboard anytime to access your content.",
  },
  {
    question: "3. What if I don’t get redirected?",
    answer:
      "If you're not redirected after payment, try clicking the back button. If the download link still doesn't appear, please visit the contact us page where you can put your email ID. Our system will verify your payment and send you the access link directly.",
  },
  {
    question: "4. What if I lose access to the course?",
    answer:
      "No worries! Just visit Contact Us page and put your email ID. Our system will verify your payment and send you the access link directly.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Helper to replace "Contact Us" text with link
  const renderAnswer = (answer) => {
    return answer.split(/(Contact Us|contact us)/gi).map((part, i) =>
      part.toLowerCase() === "contact us" ? (
        <Link
          key={i}
          href="/Contact-us"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Contact Us
        </Link>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <section className="px-4 pt-10 mb-0 md:py-10 bg-gray-50" id="faq">
      <h2 className="text-xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl pb-5 mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 bg-white text-left"
            >
              <span className="text-base font-medium">{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-3 bg-white text-gray-700 text-sm leading-relaxed"
                >
                  {renderAnswer(faq.answer)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
