// // src/app/(razorpay-like-pages)/python-mastery-pack/@modal/(.)javascript-upsell/page.jsx

// "use client";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// // 👈 You'll need to import the component that holds the content 
// // of your /30-days-javascript page.
// import JS from "@/app/(razorpay-like-pages)/30-days-javascript/JS";

// // ... [Keep the same backdropVariants and modalVariants as your CheckoutModal] ...

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const modalVariants = {
//   hidden: { 
//     y: "50px", 
//     opacity: 0, 
//     scale: 0.95 
//   },
//   visible: {
//     y: "0", 
//     opacity: 1, 
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
//   exit: { 
//     y: "50px", 
//     opacity: 0, 
//     scale: 0.95,
//     transition: { 
//         duration: 0.25 
//     }
//   },
// };

// export default function JavascriptUpsellModal() {
//   const router = useRouter();

//   const closeModal = () => {
//     // router.back() will close this modal and take the user 
//     // back to the previous URL, which is /python-mastery-pack/checkout
//     // router.back(); 
//         router.replace("/python-mastery-pack/checkout?fromUpsell=true"); 

//   };

//   return (
//     // Backdrop
//     <motion.div
//       variants={backdropVariants}
//       initial="hidden"
//       animate="visible"
//       exit="hidden"
//       // Use a higher z-index like z-55 or z-[55] to stack on top of the checkout modal (z-50)
//       className="fixed inset-0 bg-black/70 z-[55] flex items-center justify-center p-4" 
//       onClick={closeModal}
//     >
//       {/* Modal Content */}
//       <motion.div
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         // Make this modal slightly bigger or adjust styling as needed
//         className="bg-white rounded-2xl  m-0 p-0 shadow-2xl w-full max-w-xl  lg:max-w-xl max-h-[90vh] relative overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="pt-8 pb-5 px-1 ">
//             <button 
//                 onClick={closeModal} 
//                 className="absolute top-4  right-4 text-gray-500 hover:text-gray-700 z-10"
//                 aria-label="Close"
//             >
//                 {/*  */}
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>

//             {/* Render the full content of the JavaScript course page here */}
//             <JS fromModal={true} /> 
//             {/* <div className="mt-6">this</div> */}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }


// src/app/(razorpay-like-pages)/python-mastery-pack/@modal/(.)javascript-upsell/page.jsx

"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import JS from "@/app/(razorpay-like-pages)/30-days-javascript/JS";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    y: "50px",
    opacity: 0,
    scale: 0.95
  },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    y: "50px",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 }
  },
};

export default function JavascriptUpsellModal() {
  const router = useRouter();

  const closeModal = () => {
    router.replace("/python-mastery-pack/checkout?fromUpsell=true");
  };

  return (
    // Backdrop
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black/70 z-[55] flex items-center justify-center p-4"
      onClick={closeModal}
    >
      {/* Modal Content */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl m-0 p-0 shadow-2xl w-full max-w-xl lg:max-w-xl max-h-[90vh] relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        {/* <div className="sticky sm:top-4 top-0 right-0 sm:right-5 z-20 flex justify-end bg-white/100 backdrop-blur-sm p-3 rounded-t-2xl">
          <div>
            Learn Javascript also
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div> */}

        {/* Sticky Header */}
{/* Sticky Header */}
<div className="sticky top-0 z-20 flex items-center justify-center bg-gradient-to-r from-[#f9fafb] via-white to-[#f9fafb] backdrop-blur-xl border-b border-gray-100 shadow-sm px-4 py-3 rounded-t-2xl">

  <div className="relative w-full flex items-center justify-center">
    {/* Center Title */}
    <h2 className="text-base sm:text-lg font-semibold tracking-tight text-gray-800">
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full animate-pulse shadow-sm"></span>
        <span className="bg-gradient-to-r from-indigo-500 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">
          Learn JavaScript Also
        </span>
      </span>
    </h2>

    {/* Close Button */}
    {/* <button
      onClick={closeModal}
      className="absolute right-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all p-1.5 rounded-full"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button> */}

    <button
  onClick={closeModal}
  className="absolute right-0 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all p-2 rounded-full"
  aria-label="Close"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 sm:h-6 sm:w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
  </div>
</div>



        {/* Modal Body */}
        <div className="pt-0 pb-5 px-1">
          <JS fromModal={true} />
        </div>
      </motion.div>
    </motion.div>
  );
}
