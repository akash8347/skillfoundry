"use client";

export const UrgencySection = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 shadow-sm">
      {/* Top Row - Badge and Timer */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
          #199
        </span>
        <span className="text-amber-700 text-sm font-medium">
          Limited Time Offer - Expires Soon!
        </span>
      </div>

      {/* Middle Row - Enrollment Count */}
      <div className="text-center mb-4">
        <p className="text-amber-800 text-sm">
          <span className="font-semibold">43 people</span> enrolled in the last 24 hours!
        </p>
      </div>

      {/* Bottom Row - CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Blinking "BEST DEAL" badge */}
       

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 px-6 rounded-full shadow-lg transition-all duration-200 w-full sm:w-auto text-center">
          BUY NOW
        </button>
      </div>
    </div>
  );
};