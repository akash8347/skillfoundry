'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CyberBook() {
  const [showIndex, setShowIndex] = useState(false);

  const indexData = [
    ['01', 'Introduction to Ethical Hacking'],
    ['02', 'Why Python for Cybersecurity'],
    ['03', 'Reconnaissance and Footprinting'],
    ['04', 'Password Cracking and Hashing'],
    ['05', 'Network Scanning and Packet Sniffing'],
    ['06', 'Scanning Networks with Python'],
    ['07', 'Exploitation Techniques with Python'],
    ['08', 'Post-Exploitation Techniques with Python'],
    ['09', 'Defensive Programming and Detection Techniques'],
    ['10', 'Cryptography with Python'],
    ['11', 'Web Application Hacking with Python'],
    ['12', 'Wireless Hacking and Sniffing with Python'],
    ['13', 'Building a Penetration Testing Toolkit in Python'],
  ];

  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          🛡️ Cybersecurity with Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/py-cyber-security.webp"
            alt="Cybersecurity with Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            Learn how to use Python to automate and enhance cybersecurity workflows — from ethical
            hacking and reconnaissance to exploitation, defense, and penetration testing.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Master ethical hacking techniques with Python</li>
            <li>Conduct scanning, sniffing, and exploitation tasks</li>
            <li>Automate cybersecurity with custom Python tools</li>
            <li>Secure applications using cryptography and detection methods</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setShowIndex(!showIndex)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-md hover:from-rose-600 hover:to-pink-700 transition"
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
