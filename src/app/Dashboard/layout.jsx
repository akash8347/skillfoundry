"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Menu, X, BookOpen, Smile, LibraryBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar1 from "@/lib/myComponents/Navbar1";

const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentSlug = pathname.split("/")[2];
  const selectedDay =
    ["welcome", "materials", "exam", "certificate"].includes(currentSlug)
      ? currentSlug
      : `Day ${currentSlug}`;


     
  useEffect(() => {
    const handleScroll = () => {
      // Only close on small screens when sidebar is open
      if (window.innerWidth < 640 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sidebarOpen]);


  useEffect(() => {
    // Scroll content to top on route change
    document.getElementById("mainContent")?.scrollTo(0, 0);
  }, [pathname]);

  const handleDayClick = (day, path) => {
    setSidebarOpen(false);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar1 />

      {/* Mobile Day Bar */}
      <div className="sm:hidden bg-[#282a35] flex items-center overflow-x-auto px-2 py-1 space-x-2 scrollbar-hide">
        <button
          className="text-white hover:bg-blue-700 p-2 rounded-md transition shrink-0"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide z-30">
          {days.map((day, index) => {
            const dayNumber = index + 1;
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day, `/Dashboard/${dayNumber}`)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition shrink-0 ${selectedDay === day
                  ? "bg-blue-300 text-blue-900 font-semibold"
                  : "bg-gray-700 text-white hover:bg-blue-600"
                  }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 sm:hidden z-10"
          onClick={() => setSidebarOpen(false)} // 👈 THIS IS IMPORTANT
        />
      )}


      {/* Sidebar + Main Content layout for big screens */}
      <div className="  flex-1 sm:flex sm:flex-row sm:overflow-hidden">
        {/* Sidebar (scrollable) */}
        <aside
          className={`   w-64 bg-gray-100 p-4 border-r shrink-0
    transform transition-transform duration-300 ease-in-out
    max-h-screen overflow-y-auto
    fixed top-23 left-0 z-30 h-[calc(100vh-3.5rem)]
    sm:relative sm:translate-x-0 sm:block sm:top-0 sm:h-auto
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
  `}
        >

          <h2 className="text-lg font-semibold mb-4">30-Day Mastery Plan</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href={`/Dashboard/welcome`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === "welcome"
                  ? "bg-blue-200 font-semibold text-blue-900"
                  : "hover:bg-blue-100"
                  }`}
                onClick={() => handleDayClick("welcome", "/Dashboard/welcome")}
              >
                <Smile size={16} /> Welcome
              </Link>
            </li>

            <li>
              <Link
                href={`/Dashboard/materials`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === "materials"
                  ? "bg-blue-200 font-semibold text-blue-900"
                  : "hover:bg-blue-100"
                  }`}
                onClick={() => handleDayClick("materials", "/Dashboard/materials")}
              >
                <LibraryBig size={16} /> Materials
              </Link>
            </li>
            <li>
              <Link
                href={`/Dashboard/project`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === "materials"
                  ? "bg-blue-200 font-semibold text-blue-900"
                  : "hover:bg-blue-100"
                  }`}
                onClick={() => handleDayClick("project", "/Dashboard/project")}
              >
                <LibraryBig size={16} /> projects
              </Link>
            </li>

            {days.map((day, index) => (
              <li key={day}>
                <Link
                  href={`/Dashboard/${index + 1}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === day
                    ? "bg-blue-200 font-semibold text-blue-900"
                    : "hover:bg-blue-100"
                    }`}
                  onClick={() => handleDayClick(day, `/Dashboard/${index + 1}`)}
                >
                  <BookOpen size={16} /> {day}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href={`/certification/instruction`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === "exam"
                  ? "bg-blue-200 font-semibold text-blue-900"
                  : "hover:bg-blue-100"
                  }`}
                onClick={() => handleDayClick("exam", "/certification/instruction")}
              >
                <LibraryBig size={16} /> Take exam
              </Link>
            </li>

            <li>
              <Link
                href={`/certification/certificate`}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${selectedDay === "certificate"
                  ? "bg-blue-200 font-semibold text-blue-900"
                  : "hover:bg-blue-100"
                  }`}
                onClick={() => handleDayClick("certificate", "/certification/certificate")}
              >
                <LibraryBig size={16} /> My certificates
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content (scrollable) */}
        <main
          id="mainContent"
          className="flex-1 p-6 overflow-y-auto max-h-screen"
        >
          {children}

          {/* Prev/Next Buttons */}
          {selectedDay.startsWith("Day") && (
            <div className="mt-10 flex justify-between items-center max-w-4xl mx-auto">
              <button
                disabled={parseInt(currentSlug) === 1}
                onClick={() => router.push(`/Dashboard/${parseInt(currentSlug) - 1}`)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
              >
                ← Previous
              </button>
              <button
                disabled={parseInt(currentSlug) === 30}
                onClick={() => router.push(`/Dashboard/${parseInt(currentSlug) + 1}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
      {/* <LandingFooter/> */}
    </div>
  );
}
