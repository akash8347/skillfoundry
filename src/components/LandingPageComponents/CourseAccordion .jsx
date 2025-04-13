'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';



const VISIBLE_COUNT = 6;

const courseStructure = [
    {
      title: 'Day 1: Introduction to Web Design',
      items: ['What is Web Design?', 'How the Web Works', 'Course Overview'],
    },
    {
      title: 'Day 2: HTML Basics & Page Structure',
      items: ['HTML Boilerplate', 'Headings & Paragraphs', 'Semantic Tags'],
    },
    {
      title: 'Day 3: CSS Fundamentals & Selectors',
      items: ['Basic Selectors', 'Colors', 'Typography'],
    },
    {
      title: 'Day 4: Box Model, Margin, Padding & Borders',
      items: ['Box Model Explained', 'Spacing Utilities', 'Border Styling'],
    },
    {
      title: 'Day 5: CSS Positioning & Display',
      items: ['Static, Relative, Absolute', 'Z-index', 'Block vs Inline vs Inline-block'],
    },
    {
      title: 'Day 6: Flexbox Mastery',
      items: ['Flex Container & Items', 'Axis, Wrapping, Gaps', 'Common Layouts with Flexbox'],
    },
    {
      title: 'Day 7: Building Your First Web Page',
      items: ['Design Mockup to Code', 'Sectioning', 'Responsiveness'],
    },
    {
      title: 'Day 8: Introduction to JavaScript',
      items: ['Why JavaScript?', 'Using JS in HTML', 'Console & Basics'],
    },
    {
      title: 'Day 9: Variables, Constants, and Data Types',
      items: ['let, const, var', 'Primitive Data Types', 'Type Conversion'],
    },
    {
      title: 'Day 10: Booleans, Operators, and Date',
      items: ['Logical Operators', 'Comparison', 'Date Object'],
    },
    {
      title: 'Day 11: Conditional Statements',
      items: ['if, else, else if', 'Switch Statement', 'Ternary Operator'],
    },
    {
      title: 'Day 12: Loops in JavaScript',
      items: ['for Loop', 'while & do...while', 'break & continue'],
    },
    {
      title: 'Day 13: Functions in JavaScript',
      items: ['Function Declaration', 'Return & Scope', 'Arrow Functions'],
    },
    {
      title: 'Day 14: Arrays in JavaScript',
      items: ['Creating Arrays', 'Array Methods', 'Looping through Arrays'],
    },
    {
      title: 'Day 15: Objects in JavaScript',
      items: ['Key-Value Pairs', 'Accessing Properties', 'Methods in Objects'],
    },
    {
      title: 'Day 16: Math Object & Randomness',
      items: ['Math Methods', 'Random Numbers', 'Rounding, Floor, Ceil'],
    },
    {
      title: 'Day 17: String Methods',
      items: ['Length, Slice, Substring', 'Replace, Split, Includes'],
    },
    {
      title: 'Day 18: Date Object Deep Dive',
      items: ['Creating Dates', 'Getters & Setters', 'Date Formatting'],
    },
    {
      title: 'Day 19: Window Object & Browser Interactions',
      items: ['alert, prompt, confirm', 'Window Properties', 'Timers'],
    },
    {
      title: 'Day 20: Document Object Model (DOM) Basics',
      items: ['DOM Tree', 'Query Selectors', 'Basic Manipulation'],
    },
    {
      title: 'Day 21: DOM Manipulation',
      items: ['Changing Text, Classes', 'Creating & Removing Elements'],
    },
    {
      title: 'Day 22: DOM Events & Event Listeners',
      items: ['Click, Submit, Input', 'addEventListener', 'Event Object'],
    },
    {
      title: 'Day 23: Form Handling in JavaScript',
      items: ['Reading Input Values', 'Validations', 'Prevent Default'],
    },
    {
      title: 'Day 24: Error Handling & Try Catch',
      items: ['try, catch, finally', 'Custom Errors', 'Use Cases'],
    },
    {
      title: 'Day 25: ES6+ Features',
      items: ['let & const', 'Arrow Functions', 'Template Literals'],
    },
    {
      title: 'Day 26: Destructuring, Spread & Rest Operators',
      items: ['Array/Object Destructuring', 'Spread Operator', 'Rest Parameters'],
    },
    {
      title: 'Day 27: Callback Functions',
      items: ['What are Callbacks?', 'Use Cases', 'Callback Hell'],
    },
    {
      title: 'Day 28: Promises and Async JavaScript',
      items: ['Creating Promises', 'then/catch', 'Chaining Promises'],
    },
    {
      title: 'Day 29: Async/Await',
      items: ['Await Syntax', 'Handling Errors', 'Use with Fetch'],
    },
    {
      title: 'Day 30: JSON and LocalStorage',
      items: ['JSON Basics', 'localStorage & sessionStorage', 'Storing App Data'],
    },
  ];
  

  const CourseAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
  
    const toggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    const visibleItems = showAll ? courseStructure : courseStructure.slice(0, VISIBLE_COUNT);
  
    return (
      <div className="bg-gray-200 lg:rounded-sm text-gray-800 max-w-4xl mx-auto  mb-4 mt-3 md:mt-0 p-4 sm:p-6">
       <div className='mx-auto w-[95%]'>
        <h2 className=" text-xl sm:text-2xl font-semibold mb-2">
          30 days Course Content
        </h2>
        <p className='text-sm'>this is the 30 days learning plane</p>
        <p className="text-sm text-gray-500 mb-2 sm:mb-6">({courseStructure.length} Modules)</p>
        </div>
        <AnimatePresence initial={false}>
          {visibleItems.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-200 rounded-md mb-3 shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left"
              >
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{day.title}</h3>
                  <p className="text-xs text-gray-500">{day.items.length} Lessons</p>
                </div>
  
                <div>
                  {openIndex === index ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
              </button>
  
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden border-t border-gray-100 bg-gray-50"
                  >
                    <ul className="px-4 py-3 space-y-1 text-sm text-gray-700">
                      {day.items.map((item, idx) => (
                        <li key={idx} className="list-disc ml-5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
  
        <div className="text-center md:mt-4 mb-5 ">
        <button
    onClick={() => setShowAll((prev) => !prev)}
    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-blue-600 text-sm font-medium rounded-full hover:bg-gray-200 transition-all"
  >
    {showAll ? 'Show Less Modules' : 'Show All Modules'}
    {showAll ? (
      <FiChevronUp className="w-4 h-4" />
    ) : (
      <FiChevronDown className="w-4 h-4" />
    )}
  </button>
        </div>
      </div>
    );
  };
  
  export default CourseAccordion;