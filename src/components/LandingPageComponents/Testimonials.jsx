// "use client";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { useWindowSize } from "react-use";

// const testimonials = [
//   {
//     name: "Shubham Jha",
//     review:
//       "This course changed my life! The step-by-step approach made learning web design so easy.",
//     img: "/shubham.jpg",
//     rating: 5,
//   },
//   {
//     name: "khushal solanki",
//     review:
//       "I landed my first freelance job after completing this course. The projects were amazing!",
//     img: "/khushal.jpg",
//     rating: 5,
//   },
//   {
//     name: "Vishal Rathee",
//     review:
//       "Great content! Perfectly structured for beginners and working professionals alike.",
//     img: "rathee.jpg",
//     rating: 5,
//   },
//   {
//     name: "James Anderson",
//     review:
//       "Loved the interactive approach. JavaScript concepts were explained beautifully.",
//     img: "https://randomuser.me/api/portraits/men/8.jpg",
//     rating: 5,
//   },
//   {
//     name: "David Clark",
//     review:
//       "Loved the interactive approach. JavaScript concepts were explained beautifully.",
//     img: "https://randomuser.me/api/portraits/men/7.jpg",
//     rating: 5,
//   },
//   {
//     name: "John Reynolds",
//     review:
//       "Loved the interactive approach. JavaScript concepts were explained beautifully.",
//     img: "https://randomuser.me/api/portraits/men/12.jpg",
//     rating: 5,
//   }
// ];

// export default function Testimonials() {
//   const [index, setIndex] = useState(0);
//   const { width } = useWindowSize();

//   const isMobile = width < 1024;
//   const cardsPerView = isMobile ? 1 : 3;
//   const totalSlides = Math.ceil(testimonials.length / cardsPerView);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const handleDragEnd = (event, info) => {
//     if (info.offset.x < -100) nextSlide();
//     if (info.offset.x > 100) prevSlide();
//   };

//   return (
//     <section className="p-6 bg-white">
//       <h2 className="text-2xl font-bold text-center mb-6">What Our Students Say</h2>

//       <div className="relative  max-w-[90vw] md:max-w-[70vw] mx-auto overflow-hidden">
//         <motion.div
//           className="flex"
//           style={{
//             width: `${(testimonials.length / cardsPerView) * 100}%`,
//           }}
//           animate={{ x: `-${index * (100 / totalSlides)}%` }}
//           transition={{ type: "tween", duration: 0.6 }}
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           onDragEnd={handleDragEnd}
//         >
//           {testimonials.map((testimonial, i) => (
//             <div
//               key={i}
//               className="p-6  "
//               style={{
//                 minWidth: `${100 / testimonials.length}%`,
//               }}
//             >
//               <div className="bg-gray-100 p-6 rounded-lg shadow-md h-full ">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <img
//                     src={testimonial.img}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full border"
//                   />
//                   <h3 className="text-lg font-semibold">{testimonial.name}</h3>
//                 </div>
//                 <div className="flex mb-2">
//                   {Array.from({ length: 5 }).map((_, starIndex) => (
//                     <Star
//                       key={starIndex}
//                       size={18}
//                       className={`mr-1 ${starIndex < testimonial.rating
//                           ? "text-yellow-500"
//                           : "text-gray-300"
//                         }`}
//                       fill={
//                         starIndex < testimonial.rating ? "currentColor" : "none"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 italic">"{testimonial.review}"</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>


//         {/* Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Shubham Jha',
    review:
      'This course changed my life! The step-by-step approach made learning web design so easy.',
    img: '/shubham.jpg',
    rating: 5,
  },
  {
    name: 'khushal solanki',
    review:
      'I landed my first freelance job after completing this course. The projects were amazing!',
    img: '/khushal.jpg',
    rating: 5,
  },
  {
    name: 'Vishal Rathee',
    review:
      'Great content! Perfectly structured for beginners and working professionals alike.',
    img: 'rathee.jpg',
    rating: 5,
  },
  {
    name: 'James Anderson',
    review:
      'Loved the interactive approach. JavaScript concepts were explained beautifully.',
    img: 'https://randomuser.me/api/portraits/men/8.jpg',
    rating: 5,
  },
  {
    name: 'David Clark',
    review:
      'Loved the interactive approach. JavaScript concepts were explained beautifully.',
    img: 'https://randomuser.me/api/portraits/men/7.jpg',
    rating: 5,
  },
  {
    name: 'John Reynolds',
    review:
      'Loved the interactive approach. JavaScript concepts were explained beautifully.',
    img: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const next = () => {
    setIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const start = index * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>

      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-3 text-xl text-gray-600 hover:text-black">
          <FaChevronLeft />
        </button>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {getCurrentItems().map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <div className="text-yellow-500 text-sm">
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">“{testimonial.review}”</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={next} className="p-3 text-xl text-gray-600 hover:text-black">
          <FaChevronRight />
        </button>
      </div>

      {/* <div className="text-center mt-6 text-gray-400 text-sm">
        Page {index + 1} of {totalPages}
      </div> */}
    </div>
  );
};

export default Testimonials;

