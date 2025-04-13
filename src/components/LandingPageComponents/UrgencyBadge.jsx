'use client';
import React from 'react';

const UrgencyBadge = () => {
  return (
    <div className="sm:hidden flex justify-center mt-4">
      <div className="relative bg-red-100 text-red-600 font-semibold text-sm px-4 py-1 rounded-full flex items-center">
      Enroll Now – ₹499 Offer Ends Soon!
      <span className='pl-1'>
        <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"  />
        <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full " />
        </span>
      </div>
    </div>
  );
};

export default UrgencyBadge;
