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
//         onClick={() => router.push("/30-days-of-python/py-checkout")}
//         >
//         <Zap className="w-4 h-4" />
//         <span>Buy Now</span>
//       </button>):(
//         <button
//         className="vibrate-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         onClick={() => router.push("/30-days-python/py-checkout")}
//         >
//         <Zap className="w-4 h-4" />
//         <span>Buy Now</span>
//       </button>
//       )}
      
//     </div>
//   )
// }

// export default StickyBuyNow

'use client'

import React, { useState } from 'react'
import { Zap, Clock } from 'lucide-react'
import { useRouter } from "next/navigation";

const StickyBuyNow = ({ setCheckoutOpen, upsell }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(upsell ? "/30-days-of-python/py-checkout" : "/30-days-python/py-checkout");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">₹199</span>
            <span className="text-sm line-through text-gray-400 ml-2">₹2000</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">90% OFF</span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>Ends soon</span>
            </span>
          </div>
        </div>
      </div>
      <button
        className="vibrate-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Redirecting...</span>
          </div>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  )
}

export default StickyBuyNow