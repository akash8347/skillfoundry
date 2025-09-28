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
  ['01', 'Introduction', [
    "What is automation and why use Python?",
    "Popular use cases of automation",
    "Libraries and tools for automation",
    "Setting up Python environment for automation"
  ]],
  ['02', 'Your First Python Automation Script', [
    "Writing a simple script",
    "Automating repetitive tasks",
    "Scheduling scripts with cron/Task Scheduler",
    "Best practices for automation scripts"
  ]],
  ['03', 'WhatsApp Message Automation', [
    "Installing and using pywhatkit library",
    "Sending scheduled WhatsApp messages",
    "Handling message formatting",
    "Limitations and safety considerations"
  ]],
  ['04', 'Automating Instagram', [
    "Introduction to Selenium for automation",
    "Logging in automatically",
    "Liking and commenting on posts",
    "Automating follow/unfollow tasks responsibly"
  ]],
  ['05', 'Telegram Bot Creation', [
    "Setting up a Telegram bot with BotFather",
    "Using python-telegram-bot library",
    "Handling user commands",
    "Sending automated responses and media"
  ]],
  ['06', 'Email Automation with Python', [
    "Setting up SMTP with Python",
    "Sending automated emails with attachments",
    "Reading and filtering incoming emails",
    "Using automation for reminders and alerts"
  ]],
  ['07', 'PDF and Document Automation', [
    "Extracting text from PDFs",
    "Merging and splitting PDF files",
    "Generating PDF reports with Python",
    "Working with Word/Excel files"
  ]],
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
            src="/polished/auto-poli.webp"
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
