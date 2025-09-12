'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function PythonBookSection() {
  const [showIndex, setShowIndex] = useState(false);

  const indexData = [
    ['01', 'Introduction and Setup'],
    ['02', 'Variables and Functions'],
    ['03', 'Operators'],
    ['04', 'Strings'],
    ['05', 'Lists'],
    ['06', 'Tuples'],
    ['07', 'Sets'],
    ['08', 'Dictionaries'],
    ['09', 'Conditionals'],
    ['10', 'Loops'],
    ['11', 'Functions'],
    ['12', 'Modules'],
    ['13', 'List Comprehension'],
    ['14', 'Higher Order Functions'],
    ['15', 'Python Type Errors'],
    ['16', 'Python Date Time'],
    ['17', 'Exception Handling'],
    ['18', 'Regular Expressions'],
    ['19', 'File Handling'],
    ['20', 'PIP'],
    ['21', 'Classes and Objects'],
    ['22', 'Python Web Scraping'],
    ['23', 'Virtual Environment'],
    ['24', 'Statistics'],
    ['25', 'Pandas'],
    ['26', 'Python for Web'],
    ['27', 'Python with MongoDB'],
    ['28', 'API'],
    ['29', 'Building API'],
    ['30', 'Conclusions'],
  ];

  return (
    <section className="mt-5 md:mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-0 md:gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          📘 30 Days of Python with AI Guide (280+ pages)
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/main-python.webp"
            alt="30 Days of Python"
            width={300}
            height={400}
            className="w-[88%] my-5 md:my-0 mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
     30 structured lessons covering everything from basics to building real-world projects using <strong>functions</strong>, <strong>loops</strong>, <strong>file handling</strong>, <strong>OOP</strong>, <strong>web scraping</strong>, and more.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
  
            <li>Day-by-day breakdown for consistent progress</li>
            <li>Covers key topics like Lists, Tuples, Dictionaries, Modules, APIs</li>
            <li>Includes project-ready tools like Pandas, Web Scraping, and MongoDB</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button stays fixed in flow */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setShowIndex(!showIndex)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-md hover:from-yellow-500 hover:to-yellow-600 transition"
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

      {/* Index Table with AnimatePresence */}
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
                    <th className="p-3 border">Day</th>
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
