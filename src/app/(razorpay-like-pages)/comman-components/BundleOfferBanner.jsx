"use client";

import { useEffect, useState } from "react";

export default function BundleOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const [viewerCount, setViewerCount] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate random live viewers count
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = Math.floor(Math.random() * 3) - 1;
      setViewerCount((prev) => Math.max(20, prev + randomChange));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 my-6">
      {/* Viewer count */}
      <div className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#f1f5f9] to-[#e2e8f0] border border-gray-300 text-gray-800 text-sm font-medium shadow-sm">
        🟢 {viewerCount} people currently viewing this bundle
      </div>

      {/* Countdown timer */}
      <div className="w-full border border-gray-300 bg-white p-4 rounded-xl shadow-md text-center">
        <p className="text-pink-600 font-semibold mb-3 text-sm flex items-center justify-center gap-1">
          ⏰ Special offer ends in:
        </p>
        <div className="flex justify-center md:justify-between gap-4 w-full">
          <div className="flex flex-col items-center bg-[#f8fafc] border border-gray-300 rounded-md p-3 flex-1">
            <span className="text-2xl font-bold text-gray-800">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-500">Hours</span>
          </div>
          <div className="flex flex-col items-center bg-[#f8fafc] border border-gray-300 rounded-md p-3 flex-1">
            <span className="text-2xl font-bold text-gray-800">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center bg-[#f8fafc] border border-gray-300 rounded-md p-3 flex-1">
            <span className="text-2xl font-bold text-gray-800">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-500">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
