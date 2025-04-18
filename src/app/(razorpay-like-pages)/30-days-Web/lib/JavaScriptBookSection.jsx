'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaScriptBookSection() {
  const [showIndex, setShowIndex] = useState(false);

  const indexData = [
    ['01', 'Introduction'],
    ['02', 'Data Types'],
    ['03', 'Booleans, Operators, Date'],
    ['04', 'Conditionals'],
    ['05', 'Arrays'],
    ['06', 'Loops'],
    ['07', 'Functions'],
    ['08', 'Objects'],
    ['09', 'Higher Order Functions'],
    ['10', 'Sets and Maps'],
    ['11', 'Destructuring and Spreading'],
    ['12', 'Regular Expressions'],
    ['13', 'Console Object Methods'],
    ['14', 'Error Handling'],
    ['15', 'Classes'],
    ['16', 'JSON'],
    ['17', 'Web Storages'],
    ['18', 'Promises'],
    ['19', 'Closure'],
    ['20', 'Writing Clean Code'],
    ['21', 'DOM'],
    ['22', 'Manipulating DOM Object'],
    ['23', 'Event Listeners'],
    ['24', 'Mini Project: Solar System'],
    ['25', 'Mini Project: World Countries Data Visualization 1'],
    ['26', 'Mini Project: World Countries Data Visualization 2'],
    ['27', 'Mini Project: Portfolio'],
    ['28', 'Mini Project: Leaderboard'],
    ['29', 'Mini Project: Animating Characters'],
    ['30', 'Final Projects'],
  ];

  return (
    <section className="mt-5 md:mt-12">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          📘 30 Days of JavaScript Mastery Guide (280+ pages)
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/book-0.png"
            alt="30 Days of JavaScript"
            width={300}
            height={400}
            className="w-[100%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            covering ES6+ concepts like <strong>Data Types</strong>, <strong>Loops</strong>, <strong>Functions</strong>,
            <strong> Objects</strong>, <strong>Closures</strong>, <strong>Promises</strong>, and more.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Covers ALL modern JavaScript (ES6+) concepts:</li>
            <li>Data Types, Loops, Functions, Objects</li>
            <li>Higher-Order Functions, Closures, Promises, Classes</li>
            <li>DOM Manipulation, Event Listeners, Web Storage & more</li>
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
              Hide Book Index <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show Full Book Index <ChevronDown className="w-4 h-4" />
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
