"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why only ₹499 for this much?",
    answer:
      "We believe high-quality education shouldn't be out of reach. ₹499 isn't the value of this course — it's just the access fee. Our mission is to empower as many aspiring designers as possible, not gatekeep knowledge behind hefty price tags. Think of it as our way of giving back to the community and helping beginners start their journey without financial pressure.",
  },
  {
    question: "What is included in this course?",
    answer:
      "You'll get structured learning path dashboard with materials, practical exercises, live coding, 100+ hands-on projects, and in-depth guides covering HTML, CSS, JavaScript, and more.",
  },
  {
    question: "How do I receive the course content?",
    answer:
      "After successful enrollment, you will receive access to dashboard and all course materials from the dashboard. You can directly learn and download it and learn from that.",
  },
  {
    question: "Is this course suitable for beginners?",
    answer:
      "Absolutely! This course starts from the basics and gradually progresses to advanced topics, making it perfect for beginners as well as those looking to refine their skills.",
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "No prior experience is required! We start from scratch and guide you step-by-step through web design and JavaScript concepts.",
  },
  {
    question: "Will I be building real-world projects?",
    answer:
      "Yes! This course includes over 100 practical projects that help you apply your knowledge and build an impressive portfolio.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes! The course is structured for self-paced learning, so you can go through the content at a speed that suits you best.",
  },
  {
    question: "What if I need help during the course?",
    answer:
      "We provide full support to ensure you have a smooth learning experience. If you have any questions, you can reach out to us anytime.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
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
