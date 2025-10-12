// Revised CheckoutSummaryWithButton.jsx
'use client'; // ⬅️ THIS IS CRITICAL

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ====================================================================
// DEMO DATA (keep this for now, but pass real data as props later)
// ====================================================================
const demoItems = [
  { name: 'Stylish T-shirt (Size M)', quantity: 1, price: 29.99 },
  { name: 'Modern Sneakers', quantity: 1, price: 89.99 },
  { name: 'Minimalist Cap', quantity: 2, price: 19.50 },
];

const subtotal = demoItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
const shipping = 5.00;
const total = subtotal + shipping;
// ====================================================================

const CheckoutSummaryWithButton = ({ loading, handlePayment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    // Prevent the default behavior if necessary, although unnecessary on a button
    setIsExpanded(!isExpanded);
  };
  
  // NOTE: We now use conditional properties in the 'animate' prop.
  // We don't need 'AnimatePresence' or 'variants' for this cleaner approach.

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      {/* Container for the Expandable Summary */}
      <div 
        className="mb-3 border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
        style={{ zIndex: 10 }}
      >
        
        {/* Header/Toggle Button Area */}
        <button 
          onClick={handleToggle}
          className="flex justify-between items-center w-full p-4 font-semibold text-gray-800 focus:outline-none"
        >
          <span className="text-lg">Order Summary</span>
          
          {/* Animated Arrow Icon */}
          <motion.svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        {/* REVISED: Direct motion.div without AnimatePresence.
          We animate 'maxHeight' and 'opacity' based on the 'isExpanded' state.
        */}
        <motion.div
          // This is the key: Conditional animation targets
          animate={{
            maxHeight: isExpanded ? 500 : 0, // Use a large fixed max-height instead of "auto"
            opacity: isExpanded ? 1 : 0,
            paddingBottom: isExpanded ? '1rem' : 0 // Apply padding only when expanded
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          // Ensure content is hidden when collapsed
          className="px-4 border-t border-gray-100" 
          style={{ overflow: 'hidden' }}
        >
            
          {/* Content that was previously inside the conditional block */}
          
          {/* Items List */}
          <div className="space-y-2 text-sm text-gray-600 mb-4 pt-4"> 
            {demoItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="truncate pr-2">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium text-gray-800">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          {/* Totals Section */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between pt-2 font-bold text-lg text-black">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

        </motion.div>
      </div>
      
      {/* The Final Buy Now Button */}
      <button
        type="submit"
        onClick={handlePayment} 
        className="w-full bg-black text-white py-3 rounded-lg font-medium transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : "Buy Now"}
      </button>
    </div>
  );
};

export default CheckoutSummaryWithButton;