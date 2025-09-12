"use client";

import { useEffect, useState } from "react";

export default function BundleOfferBanner() {
  const EXPIRY_KEY = "bundleOfferExpiry";

  const [expiryTime, setExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [viewerCount, setViewerCount] = useState(30);

  // Initialize expiryTime on client
  useEffect(() => {
    let saved = localStorage.getItem(EXPIRY_KEY);
    if (!saved) {
      const newExpiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(EXPIRY_KEY, newExpiry.toString());
      saved = newExpiry.toString();
    }
    setExpiryTime(parseInt(saved, 10));
  }, []);

  // Countdown updater
  useEffect(() => {
    if (!expiryTime) return;

    const timer = setInterval(() => {
      const diff = expiryTime - Date.now();

      if (diff <= 0) {
        // reset another 24h
        const newExpiry = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(EXPIRY_KEY, newExpiry.toString());
        setExpiryTime(newExpiry);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  // Simulate random live viewers count
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = Math.floor(Math.random() * 3) - 1;
      setViewerCount((prev) => Math.max(20, prev + randomChange));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!expiryTime) {
    // prevent SSR mismatch flash
    return null;
  }

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
