// 'use client'

// import React from 'react'
// import { Zap, Clock } from 'lucide-react'
// import { useRouter } from "next/navigation";


// const StickyBuyNow = ({ setCheckoutOpen, upsell }) => {
//   const router = useRouter();

//   return (
//     <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
//       <div className="flex items-center gap-3">
//         <div className="flex flex-col">
//           <div className="flex items-center">
//             <span className="text-xl font-bold text-gray-900">₹199</span>
//             <span className="text-sm line-through text-gray-400 ml-2">₹2000</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">90% OFF</span>
//             <span className="flex items-center text-xs text-gray-500">
//               <Clock className="w-3 h-3 mr-1" />
//               <span>Ends soon</span>
//             </span>
//           </div>
//         </div>
//       </div>
// {upsell ?( <button
//         className="vibrate-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         onClick={() => router.push("/python-mastery-pack/py-checkout")}
//         >
//         <Zap className="w-4 h-4" />
//         <span>Buy Now</span>
//       </button>):(
//         <button
//         className="vibrate-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         onClick={() => router.push("/python-mastery-pack/py-checkout")}
//         >
//         <Zap className="w-4 h-4" />
//         <span>Buy Now</span>
//       </button>
//       )}

//     </div>
//   )
// }

// export default StickyBuyNow

// 'use client'

// import React, { useState } from 'react'
// import { Zap, Clock } from 'lucide-react'
// import { useRouter } from "next/navigation";

// const StickyBuyNow = ({ setCheckoutOpen, upsell }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = () => {
//     setIsLoading(true);
//     router.push(upsell ? "/python-mastery-pack/py-checkout" : "/python-mastery-pack/py-checkout");
//   };

//   return (
//     <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
//       <div className="flex items-center gap-3">
//         <div className="flex flex-col">
//           <div className="flex items-center">
//             <span className="text-xl font-bold text-gray-900">₹199</span>
//             <span className="text-sm line-through text-gray-400 ml-2">₹2000</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">90% OFF</span>
//             <span className="flex items-center text-xs text-gray-500">
//               <Clock className="w-3 h-3 mr-1" />
//               <span>Ends soon</span>
//             </span>
//           </div>
//         </div>
//       </div>
//       <button
//         className="vibrate-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         onClick={handleClick}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className="flex items-center gap-2">
//             <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             <span>Redirecting...</span>
//           </div>
//         ) : (
//           <>
//             <Zap className="w-4 h-4" />
//             <span>Download</span>
//           </>
//         )}
//       </button>
//     </div>
//   )
// }

// export default StickyBuyNow

// 'use client'

// import React, { useState } from 'react'
// import { Zap, Clock } from 'lucide-react'
// import { useRouter } from "next/navigation";

// const StickyBuyNow = ({ setCheckoutOpen, upsell }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = () => {
//     setIsLoading(true);
//     router.push(upsell ? "/python-mastery-pack/py-checkout" : "/python-mastery-pack/py-checkout");
//   };

//   return (
//     <div className="fixed bottom-0 left-0 w-full md:hidden   border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
//       {/* <div className="flex items-center gap-3">
//         <div className="flex flex-col">
//           <div className="flex items-center">
//             <span className="text-xl font-bold text-gray-900">₹199</span>
//             <span className="text-sm line-through text-gray-400 ml-2">₹2000</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">90% OFF</span>
//             <span className="flex items-center text-xs text-gray-500">
//               <Clock className="w-3 h-3 mr-1" />
//               <span>Ends soon</span>
//             </span>
//           </div>
//         </div>
//       </div> */}
//    <button
//   className="custom-button modern-gradient"
//   onClick={handleClick}
//   disabled={isLoading}
// >
//   <span className="button-content">
//     {isLoading ? (
//       <div className="spinner-container">
//         <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//         <span>Redirecting...</span>
//       </div>
//     ) : (
//       <>
//         <Zap className="icon" />
//         <span>BUY NOW</span>
//       </>
//     )}
//   </span>
// </button>

//     </div>
//   )
// }

// export default StickyBuyNow


'use client'

import React, { useState } from 'react'
import { Zap, Clock } from 'lucide-react'
import { useRouter } from "next/navigation";
import { get } from 'mongoose';
import { genEventId } from "@/lib/eventHelper";
import { FaBook, FaStar, FaQuestionCircle } from "react-icons/fa";

const StickyBuyNow = ({ setCheckoutOpen, upsell, currency, price, symbol, encryptedCode, pythonRealPrice }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // const handleClick = () => {
  //   window.fbq('track', 'InitiateCheckout', {
  //     value: price,
  //     currency: currency,
  //   });
  //   setCheckoutOpen(true)
  // };

  // Helper function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const itemSku = "PYTHON_GUIDES_BUNDLE_01";

const handleClick = async () => {
  const eventId = genEventId();

  // 1. Pixel (no change here)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(
      "track",
      "InitiateCheckout",
      {
        value: price,
        currency,
        content_ids: [itemSku],
        content_type: "product",
      },
      { eventID: eventId }
    );
  }

  // 2. Server CAPI (using sendBeacon for reliability)
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc");

  const payload = {
    event_name: "InitiateCheckout",
    event_id: eventId,
    event_source_url: window.location.href,
    fbp,
    fbc,
    custom_data: {
      value: price,
      currency,
      content_ids: [itemSku],
      content_type: "product",
    },
  };

  navigator.sendBeacon(
    "/api/capi",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );

  setIsLoading(true);
  router.push(`/python-mastery-pack/checkout?c=${encryptedCode}`);
 setTimeout(() => {
        setIsLoading(false);
    }, 300); 

};

  // const strikeThroughPrice = currency === "EUR" ? 94 : currency === "USD" ? 97 : 2000;
  const getDiscountPercentage = (price, strikeThroughPrice) => {
    return Math.round(((strikeThroughPrice - price) / strikeThroughPrice) * 100);
  }
  return (
    // <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
    //   <div className="flex items-center gap-3">
    //     <div className="flex flex-col">
    //       <div className="flex items-center">
    //         <span className="text-xl font-bold text-gray-900">{symbol}{price}</span>
    //         <span className="text-sm line-through text-gray-400 ml-2">{symbol}{pythonRealPrice}</span>
    //       </div>
    //       <div className="flex items-center gap-1">
    //         <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{getDiscountPercentage(price, pythonRealPrice)}% OFF</span>
    //         <span className="flex items-center text-xs text-gray-500">
    //           <Clock className="w-3 h-3 mr-1" />
    //           <span>Ends soon</span>
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <button
    //     className="vibrate-btn bg-gradient-to-r from-black to-black hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
    //     onClick={handleClick}
    //     disabled={isLoading}
    //   >
    //     {isLoading ? (
    //       <div className="flex items-center gap-2">
    //         <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    //           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //         </svg>
    //         <span>Redirecting...</span>
    //       </div>
    //     ) : (
    //       <>
    //         <Zap className="w-4 h-4" />
    //         <span>Get It Now</span>
    //       </>
    //     )}
    //   </button>
    // </div>





  //   <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-6 py-2 flex justify-between items-center z-50">
    
  //   {/* Books */}
  //   <a href="#book" className="flex flex-col items-center text-gray-800 hover:text-black transition-colors">
  //     <FaBook className="w-6 h-6 mb-1" />
  //     <span className="text-xs font-medium">Books</span>
  //   </a>

  //   {/* Reviews */}
  //   <a href="#reviews" className="flex flex-col items-center text-gray-800 hover:text-black transition-colors">
  //     <FaStar className="w-6 h-6 mb-1" />
  //     <span className="text-xs font-medium">Reviews</span>
  //   </a>

  //   {/* FAQ */}
  //   <a href="#faq" className="flex flex-col items-center text-gray-800 hover:text-black transition-colors">
  //     <FaQuestionCircle className="w-6 h-6 mb-1" />
  //     <span className="text-xs font-medium">FAQ</span>
  //   </a>

  //   {/* Button on Right */}
  //   <button
  //     className="vibrate-btn bg-gradient-to-r from-black to-black hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
  //     onClick={handleClick}
  //     disabled={isLoading}
  //   >
  //     {isLoading ? (
  //       <div className="flex items-center gap-2">
  //         <svg
  //           className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <circle
  //             className="opacity-25"
  //             cx="12"
  //             cy="12"
  //             r="10"
  //             stroke="currentColor"
  //             strokeWidth="4"
  //           ></circle>
  //           <path
  //             className="opacity-75"
  //             fill="currentColor"
  //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
  //             1.135 5.824 3 7.938l3-2.647z"
  //           ></path>
  //         </svg>
  //         <span>Redirecting...</span>
  //       </div>
  //     ) : (
  //       <>
  //         <Zap className="w-4 h-4" />
  //         <span>Get It Now</span>
  //       </>
  //     )}
  //   </button>
  // </div>


  <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-2 flex justify-between items-center z-50">
    
    {/* Navigation Tabs */}
    <div className="flex flex-1 justify-evenly">
      {/* Books */}
      <a
        href="#book"
        className="flex flex-col items-center text-gray-700 hover:text-black transition-colors"
      >
        <FaBook className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">Books</span>
      </a>

      {/* Reviews */}
      <a
        href="#reviews"
        className="flex flex-col items-center text-gray-700 hover:text-black transition-colors"
      >
        <FaStar className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">Reviews</span>
      </a>

      {/* FAQ */}
      <a
        href="#faq"
        className="flex flex-col items-center text-gray-700 hover:text-black transition-colors"
      >
        <FaQuestionCircle className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">FAQ</span>
      </a>
    </div>

    {/* CTA Button */}
    <button
      className="ml-4 vibrate-btn bg-black hover:bg-gray-900 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
              5.291A7.962 7.962 0 014 12H0c0 
              3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <Zap className="w-4 h-4" />
          <span>Get It Now</span>
        </>
      )}
    </button>
  </div>


  )
}

export default StickyBuyNow