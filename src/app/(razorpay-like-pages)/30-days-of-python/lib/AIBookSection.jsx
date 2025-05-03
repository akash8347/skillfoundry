'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIBookSection() {
  const [showIndex, setShowIndex] = useState(false);

  const indexData = [
    ['01', 'Introduction'],
    ['02', 'Setting Up AI Development Environment with Python'],
    ['03', 'Understanding Machine Learning — The Heart of AI'],
    ['04', 'Supervised Learning — Regression and Classification Models'],
    ['05', 'Unsupervised Learning — Discovering Hidden Patterns'],
    ['06', 'Neural Networks — Building Brains for AI'],
    ['07', 'Project: Build a Neural Network to Classify Handwritten Digits'],
    ['08', 'CNNs — Deep Learning for Image Classification'],
    ['09', 'Advanced Image Classification — Transfer Learning'],
    ['10', 'NLP Basics with Python'],
    ['11', 'Spam Detection Using Machine Learning'],
    ['12', 'Text Classification with Deep Learning (NLP)'],
    ['13', 'Computer Vision & Image Classification Basics'],
    ['14', 'AI for Automation: Files, Web, and Emails'],
    ['15', 'AI Chatbots and Virtual Assistants'],
  ];

  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          🤖 Artificial Intelligence with Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/ai-python.webp"
            alt="AI with Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            This hands-on guide introduces you to core AI techniques using Python —
            from <strong>machine learning</strong>, <strong>neural networks</strong>, and <strong>deep learning</strong> to 
            <strong> NLP</strong>, <strong>computer vision</strong>, and real-world automation.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Get started with AI concepts and Python-based ML workflows</li>
            <li>Work on image recognition, spam detection & text classification</li>
            <li>Build your own neural network project from scratch</li>
            <li>Explore AI-powered automation: emails, web scraping, chatbots</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setShowIndex(!showIndex)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-400 to-indigo-500 text-white font-semibold shadow-md hover:from-indigo-500 hover:to-indigo-600 transition"
        >
          {showIndex ? (
            <>
              Hide Book Content <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show Content of Book <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Index Table */}
      <AnimatePresence>
        {showIndex && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-4"
          >
            <div className="border rounded-lg overflow-hidden shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-3 border">#</th>
                    <th className="p-3 border text-left">Topics</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 bg-white">
                  {indexData.map(([day, topic], i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 border text-center">{day}</td>
                      <td className="p-3 border">{topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
