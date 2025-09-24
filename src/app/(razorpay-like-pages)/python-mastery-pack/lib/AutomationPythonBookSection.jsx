'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookIndexModal from './BookIndexModal'; // import reusable modal
 import { FaEye } from 'react-icons/fa'; // import eye icon

export default function AutomationPythonBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const indexData = [
    ['01', 'Introduction'],
    ['02', 'Your First Python Automation Script'],
    ['03', 'WhatsApp Message Automation'],
    ['04', 'Automating Instagram'],
    ['05', 'Telegram Bot Creation'],
    ['06', 'Email Automation with Python'],
    ['07', 'PDF and Document Automation'],
  ];

  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-4 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          ⚙️ Automation Using Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/automation.webp"
            alt="Automation Using Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            Learn how to automate real-world tasks using Python — from messaging and social media to 
            <strong> email automation</strong>, <strong>Telegram bots</strong>, and <strong>document handling</strong>.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Build scripts to automate <strong>WhatsApp</strong> and <strong>Instagram</strong> tasks</li>
            <li>Create Telegram bots and schedule email actions</li>
            <li>Automate PDF creation, modification, and more</li>
            <li>No prior experience with APIs or automation required</li>
          </ul>
        </div>
      </div>

      {/* Show Modal Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-md hover:from-teal-500 hover:to-teal-600 transition"
        >
View Book Content <FaEye className="w-4 h-4" />        </motion.button>
      </div>

      {/* Reusable Modal */}
      <BookIndexModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        indexData={indexData}
        title="Automation Using Python"
      />
    </section>
  );
}
