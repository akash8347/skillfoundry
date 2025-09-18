"use client";
import { useEffect, useState } from "react";

export const UrgencySection = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ SSR safety

    const STORAGE_KEY = "urgencyTimerStart";
    const now = Date.now();

    let startTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

    // Debug check

    if (!startTime || now - startTime >= 24 * 60 * 60 * 1000) {
      startTime = now; // reset to new cycle
      localStorage.setItem(STORAGE_KEY, String(startTime));
    }

    const deadline = startTime + 24 * 60 * 60 * 1000;

    const updateTime = () => {
      const remaining = deadline - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateTime(); // run immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert ms to h:m:s
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
          #149
        </span>
        <span className="text-amber-700 text-sm font-medium">
          Offer ends in {hours}h {minutes}m {seconds}s
        </span>
      </div>

      <div className="text-center mb-4">
        <p className="text-amber-800 text-sm">
          <span className="font-semibold">43 people</span> enrolled in the last 24 hours!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 px-6 rounded-full shadow-lg transition-all duration-200 w-full sm:w-auto text-center">
          BUY NOW
        </button>
      </div>
    </div>
  );
};
