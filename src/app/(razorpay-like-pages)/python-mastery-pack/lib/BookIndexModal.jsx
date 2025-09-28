// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ChevronDown } from 'lucide-react';
// import { useState } from 'react';

// export default function BookIndexModal({ isOpen, onClose, indexData, title = "Book Content" }) {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleItem = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Animation variants for the dropdown content
//   const contentVariants = {
//     collapsed: { opacity: 0, height: 0 },
//     open: { opacity: 1, height: 'auto' },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Modal container */}
//           <motion.div
//             initial={{ scale: 0.95, y: 20, opacity: 0 }}
//             animate={{ scale: 1, y: 0, opacity: 1 }}
//             exit={{ scale: 0.95, y: 20, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="relative w-full max-w-2xl max-h-[70vh] sm:max-h-[80vh] bg-slate-50 rounded-2xl shadow-xl overflow-hidden flex flex-col"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-slate-200">
//               <h3 className="text-lg md:text-xl font-bold text-slate-800">{title}</h3>
//               <button
//                 onClick={onClose}
//                 className="text-slate-500 hover:text-slate-900 transition-colors rounded-full p-1"
//                 aria-label="Close modal"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Scrollable content with the accordion */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {indexData.map(([chapter, topic, subtopics], i) => (
//                 <div key={i} className="bg-white rounded-md shadow-sm overflow-hidden ring-1 ring-slate-200/50">
//                   {/* Clickable Header */}
//                   <button
//                     onClick={() => toggleItem(i)}
//                     className="w-full flex items-center justify-between p-3 text-left"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xs rounded-full">
//                         {chapter}
//                       </span>
//                       <span className="font-semibold text-slate-800 text-sm md:text-base">{topic}</span>
//                     </div>
//                     <motion.div
//                        animate={{ rotate: openIndex === i ? 180 : 0 }}
//                        transition={{ duration: 0.3 }}
//                     >
//                         <ChevronDown className="w-5 h-5 text-slate-500" />
//                     </motion.div>
//                   </button>

//                   {/* Collapsible Content */}
//                   <AnimatePresence initial={false}>
//                     {openIndex === i && (
//                       <motion.section
//                         key="content"
//                         initial="collapsed"
//                         animate="open"
//                         exit="collapsed"
//                         variants={contentVariants}
//                         transition={{ duration: 0.3, ease: 'easeInOut' }}
//                         className="overflow-hidden"
//                       >
//                         <ul className="list-disc pl-12 pr-3 pb-3 pt-1 space-y-2 text-slate-600 text-sm">
//                           {subtopics.map((point, j) => (
//                             <li key={j} className="leading-relaxed">{point}</li>
//                           ))}
//                         </ul>
//                       </motion.section>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
            
//             {/* Footer has been removed. */}

//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ChevronDown } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function BookIndexModal({ isOpen, onClose, indexData, title = "Book Content" }) {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleItem = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Lock/unlock background scroll
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // Animation variants for the dropdown content
//   const contentVariants = {
//     collapsed: { opacity: 0, height: 0 },
//     open: { opacity: 1, height: "auto" },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Modal container */}
//           <motion.div
//             initial={{ scale: 0.95, y: 20, opacity: 0 }}
//             animate={{ scale: 1, y: 0, opacity: 1 }}
//             exit={{ scale: 0.95, y: 20, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="relative w-full max-w-2xl max-h-[70vh] sm:max-h-[80vh] bg-slate-50 rounded-2xl shadow-xl overflow-hidden flex flex-col"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-slate-200">
//               <h3 className="text-lg md:text-xl font-bold text-slate-800">{title}</h3>
//               <button
//                 onClick={onClose}
//                 className="text-slate-500 hover:text-slate-900 transition-colors rounded-full p-1"
//                 aria-label="Close modal"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Scrollable content with the accordion */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {indexData.map(([chapter, topic, subtopics], i) => (
//                 <div key={i} className="bg-white rounded-md shadow-sm overflow-hidden ring-1 ring-slate-200/50">
//                   {/* Clickable Header */}
//                   <button
//                     onClick={() => toggleItem(i)}
//                     className="w-full flex items-center justify-between p-3 text-left"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xs rounded-full">
//                         {chapter}
//                       </span>
//                       <span className="font-semibold text-slate-800 text-sm md:text-base">{topic}</span>
//                     </div>
//                     <motion.div
//                       animate={{ rotate: openIndex === i ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <ChevronDown className="w-5 h-5 text-slate-500" />
//                     </motion.div>
//                   </button>

//                   {/* Collapsible Content */}
//                   <AnimatePresence initial={false}>
//                     {openIndex === i && (
//                       <motion.section
//                         key="content"
//                         initial="collapsed"
//                         animate="open"
//                         exit="collapsed"
//                         variants={contentVariants}
//                         transition={{ duration: 0.3, ease: 'easeInOut' }}
//                         className="overflow-hidden"
//                       >
//                         <ul className="list-disc pl-12 pr-3 pb-3 pt-1 space-y-2 text-slate-600 text-sm">
//                           {subtopics.map((point, j) => (
//                             <li key={j} className="leading-relaxed">{point}</li>
//                           ))}
//                         </ul>
//                       </motion.section>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BookIndexModal({ isOpen, onClose, indexData, title = "Book Content" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Lock/unlock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animation variants for the dropdown content
  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}   // 🔹 click on overlay closes modal
        >
          {/* Modal container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative w-full max-w-2xl max-h-[70vh] sm:max-h-[80vh] bg-slate-50 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}  // 🔹 prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">{title}</h3>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-900 transition-colors rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable content with the accordion */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {indexData.map(([chapter, topic, subtopics], i) => (
                <div key={i} className="bg-white rounded-md shadow-sm overflow-hidden ring-1 ring-slate-200/50">
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleItem(i)}
                    className="w-full flex items-center justify-between p-3 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xs rounded-full">
                        {chapter}
                      </span>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{topic}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    </motion.div>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={contentVariants}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="list-disc pl-12 pr-3 pb-3 pt-1 space-y-2 text-slate-600 text-sm">
                          {subtopics.map((point, j) => (
                            <li key={j} className="leading-relaxed">{point}</li>
                          ))}
                        </ul>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
