'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookIndexModal from './BookIndexModal';
    import { FaEye } from 'react-icons/fa'; // import eye icon
export default function DataScience() {

    const [isModalOpen, setIsModalOpen] = useState(false);


  const indexData = [
    ['01', 'Introduction to Data Science'],
    ['02', 'Setting Up the Python Environment'],
    ['03', 'Python Programming Essentials for Data Science'],
    ['04', 'Data Cleaning and Preprocessing'],
    ['05', 'Exploratory Data Analysis (EDA)'],
    ['06', 'Feature Engineering'],
    ['07', 'Exploratory Data Analysis (EDA)'],
    ['08', 'Model Evaluation and Validation'],
    ['09', 'Model Deployment and Pipelines'],
    ['10', 'Model Evaluation and Metrics'],
    ['11', 'Time Series Analysis'],
    ['12', 'Natural Language Processing (NLP) in Data Science'],
    ['13', 'Time Series Analysis in Python'],
    ['14', 'Natural Language Processing in Python'],
    ['15', 'Advanced Topics and Real-World Applications in Data Science'],
  ];

  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          📘 Data Science in Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/py-data-science.webp"
            alt="Data Science with Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            A complete guide to mastering Data Science using Python — covering everything from
            environment setup and EDA to advanced machine learning, NLP, and deployment workflows.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Master Python for real-world data science tasks</li>
            <li>Perform in-depth data cleaning and feature engineering</li>
            <li>Build, validate, and deploy machine learning models</li>
            <li>Dive into NLP, time series, and practical automation</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
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
           title="Data Science with Python"
         />
    </section>
  );
}
