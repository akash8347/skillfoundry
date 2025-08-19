"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      "If you're not redirected after payment, try clicking the back button. If the download link still doesn't appear, please email us at skill.foundry365@gmail.com. We'll verify your payment and send you the access link directly.",
  },
  {
    question: "4. What if I lose access to the course?",
    answer:
      "No worries! You can always log in to your dashboard to regain access to your course materials. If you still can't find the link, email us at skill.foundry365@gmail.com, and we'll resend it after verifying your payment.",
  },
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
