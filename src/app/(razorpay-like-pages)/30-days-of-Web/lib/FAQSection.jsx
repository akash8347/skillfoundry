"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "1. What happens after I make the payment?",
    answer:
      "After a successful payment, please do not refresh the page, you will be automatically redirected to the product download page.",
  },
  {
    question: "2. How can I access the product?",
    answer:
      "You will see the download link on the redirected page. Additionally you can always access the course material by login to dashboard",
  },
  {
    question: "3. What if I don’t get redirected?",
    answer:
      "Please do not refresh the page after payment. If you are not redirected, click the back button, or cannot find the download link, mail us at skill.foundry365@gmail.com, and we will send you a direct download link after verifying your payment.",
  },
  {
    question: "4. What if I loose the download link",
    answer:
      "Don't  Worry if you loose Download Link, you can Always access you course Material by Login into Dashboard. If you still cannot find the download link, mail us at skill.foundry365@gmail.com, and we will send you a direct download link after verifying your payment.",
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-4 pt-10 mb-0 md:py-10 bg-gray-50">
      <h2 className="text-xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl mx-auto space-y-4">
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
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
