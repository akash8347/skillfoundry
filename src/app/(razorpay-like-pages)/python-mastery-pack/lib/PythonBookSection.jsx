'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaEye } from 'react-icons/fa'; // import eye icon
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookIndexModal from './BookIndexModal'; // import reusable modal

export default function PythonBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

       <div className="flex justify-center mt-6">
  <motion.button
    onClick={() => setIsModalOpen(true)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-md hover:from-teal-500 hover:to-teal-600 transition"
  >
    View Book Content <FaEye className="w-4 h-4" />
  </motion.button>
</div>

     

       {/* Reusable Modal */}
            <BookIndexModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              indexData={indexData}
              title="30 Days of Python"
            />
    </section>
  );
}
