'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaEye } from 'react-icons/fa'; // import eye icon
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookIndexModal from './BookIndexModal'; // import reusable modal
import PremiumBadge from '@/lib/myComponents/PremiumBadge ';

export default function PythonBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

const indexData = [
  ['01', 'Introduction and Setup', [
    "Overview of Python and its applications",
    "Installing Python on your system",
    "Setting up IDE (VS Code, PyCharm, or IDLE)",
    "Running your first Python program"
  ]],
  ['02', 'Variables and Functions', [
    "Declaring and assigning variables",
    "Understanding data types",
    "Defining and calling functions",
    "Function parameters and return values"
  ]],
  ['03', 'Operators', [
    "Arithmetic operators (+, -, *, /, %)",
    "Comparison operators (==, !=, >, <)",
    "Logical operators (and, or, not)",
    "Assignment operators (+=, -=, *=)"
  ]],
  ['04', 'Strings', [
    "Creating and printing strings",
    "String slicing and indexing",
    "Common string methods (upper, lower, strip, split)",
    "String formatting (f-strings)"
  ]],
  ['05', 'Lists', [
    "Creating and accessing lists",
    "Adding and removing elements",
    "List slicing and indexing",
    "Common list methods (append, pop, sort)"
  ]],
  ['06', 'Tuples', [
    "What are tuples?",
    "Difference between lists and tuples",
    "Accessing tuple elements",
    "Tuple methods and immutability"
  ]],
  ['07', 'Sets', [
    "Defining sets",
    "Set operations (union, intersection, difference)",
    "Adding and removing elements",
    "Use cases of sets"
  ]],
  ['08', 'Dictionaries', [
    "Creating dictionaries",
    "Accessing values with keys",
    "Adding, updating, and deleting items",
    "Dictionary methods (keys, values, items)"
  ]],
  ['09', 'Conditionals', [
    "if, elif, else statements",
    "Nested conditionals",
    "Boolean expressions",
    "Practical examples of decision making"
  ]],
  ['10', 'Loops', [
    "for loops",
    "while loops",
    "Break and continue statements",
    "Iterating over lists, strings, and dictionaries"
  ]],
  ['11', 'Functions', [
    "Defining functions properly",
    "Default parameters",
    "Return values",
    "Scope of variables (local vs global)"
  ]],
  ['12', 'Modules', [
    "Importing built-in modules",
    "Using math and random modules",
    "Creating your own modules",
    "Import styles (import vs from-import)"
  ]],
  ['13', 'List Comprehension', [
    "Introduction to list comprehensions",
    "Syntax and use cases",
    "Nested list comprehensions",
    "Practical examples"
  ]],
  ['14', 'Higher Order Functions', [
    "What are higher order functions?",
    "map(), filter(), and reduce()",
    "Lambda functions",
    "Practical examples in Python"
  ]],
  ['15', 'Python Type Errors', [
    "Common error types (TypeError, ValueError, NameError)",
    "Debugging basics",
    "Tracebacks explained",
    "Preventing common mistakes"
  ]],
  ['16', 'Python Date Time', [
    "Working with datetime module",
    "Getting current date and time",
    "Formatting dates",
    "Date arithmetic"
  ]],
  ['17', 'Exception Handling', [
    "What are exceptions?",
    "try, except blocks",
    "finally and else usage",
    "Raising exceptions manually"
  ]],
  ['18', 'Regular Expressions', [
    "What are regex patterns?",
    "Using re module",
    "Searching and matching strings",
    "Practical regex examples"
  ]],
  ['19', 'File Handling', [
    "Opening and closing files",
    "Reading and writing text files",
    "Working with CSV files",
    "Using context managers (with open)"
  ]],
  ['20', 'PIP', [
    "What is pip?",
    "Installing packages",
    "Upgrading and uninstalling packages",
    "Exploring PyPI"
  ]],
  ['21', 'Classes and Objects', [
    "Introduction to OOP",
    "Defining a class",
    "Creating objects",
    "Methods and attributes"
  ]],
  ['22', 'Python Web Scraping', [
    "What is web scraping?",
    "Using requests module",
    "Introduction to BeautifulSoup",
    "Extracting useful data"
  ]],
  ['23', 'Virtual Environment', [
    "Why use virtual environments?",
    "Creating and activating venv",
    "Installing dependencies in venv",
    "Managing multiple projects"
  ]],
  ['24', 'Statistics', [
    "Mean, Median, and Mode",
    "Standard deviation",
    "Basic probability",
    "Using statistics module"
  ]],
  ['25', 'Pandas', [
    "Introduction to Pandas library",
    "Creating Series and DataFrames",
    "Data selection and filtering",
    "Basic data analysis methods"
  ]],
  ['26', 'Python for Web', [
    "Introduction to Flask/Django",
    "Building simple routes",
    "Handling requests",
    "Returning responses"
  ]],
  ['27', 'Python with MongoDB', [
    "What is MongoDB?",
    "Connecting Python with MongoDB",
    "CRUD operations",
    "Basic queries"
  ]],
  ['28', 'API', [
    "What is an API?",
    "REST APIs explained",
    "Consuming APIs with requests",
    "Working with JSON data"
  ]],
  ['29', 'Building API', [
    "Using Flask/Django for APIs",
    "Creating endpoints",
    "Returning JSON responses",
    "Testing APIs with Postman"
  ]],
  ['30', 'Conclusions', [
    "Recap of what you’ve learned",
    "Next steps in Python journey",
    "Recommended practice projects",
    "Where to go from here"
  ]],
];


  return (
    <section className="mt-5 md:mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border relative">
      {/* Heading and Image */}
      <div className="flex flex-col mt-3 items-center gap-0 md:gap-6 text-center md:text-left">
        <div className="absolute top-2 right-4">
        <PremiumBadge text="UPDATED" color="" className="mb-2" />

        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          📘 30 Days of Python with AI Guide (280+ pages)
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            // src="/main-python.webp"
                        src="/polished/python-poli.webp"

            alt="30 Days of Python"
            width={300}
            height={400}
            className="w-[88%] my-2 md:my-0 mx-auto md:w-full h-auto"
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
