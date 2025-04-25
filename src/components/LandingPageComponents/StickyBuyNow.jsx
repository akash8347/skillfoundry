'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'

const StickyBuyNow = ({ setCheckoutOpen }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">₹149</span>
            <span className="text-sm line-through text-gray-400 ml-2">₹2000</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">92% OFF</span>
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>Ends soon</span>
            </span>
          </div>
        </div>
      </div>

      {/* Max Visibility Vibration */}
      <motion.button
        animate={{ 
          x: [0, -10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0] 
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.5, // Total cycle ~1 sec
        }}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        onClick={() => setCheckoutOpen(true)}
      >
        <Zap className="w-4 h-4" />
        <span>Buy Now</span>
      </motion.button>
    </div>
  )
}

export default StickyBuyNow
