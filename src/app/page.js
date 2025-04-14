'use client';

import LandingFooter from '@/components/LandingPageComponents/LandingFooter';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="Skill Foundry Logo"
              width={153}
              height={38}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="#courses" className="text-sm font-medium hover:text-blue-600 transition">
              Courses
            </Link>
            <Link href="/Dashboard" className="text-sm font-medium hover:text-blue-600 transition">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden bg-gradient-to-tr from-purple-100 via-pink-100 to-blue-100">
        <div className="z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Launch Your Tech Career with Coding Courses
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
            Learn Web Design, Python, AI & more — one course at a time. Build real projects and get certified.
          </p>
          <Link
            href="#courses"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform">
              <Image
                src="/main-book-final.png"
                width={400}
                height={300}
                alt="Web Design Course"
                className="rounded-lg mb-4 w-full h-auto object-contain"
              />
              <h3 className="text-2xl font-semibold mb-2">30 Days of Web Design Mastery</h3>
              <p className="text-gray-600 mb-4 text-sm">
                HTML, CSS, JavaScript + Projects, Quizzes & Certificate.
              </p>
              <Link
                href="/Web-Design-Course"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                View Course
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
            Upcoming Courses
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            We’re working on high-quality courses for Python, AI, and more — packed with real-world projects, interview prep, and live practice tools.
          </p>
          <p className="text-gray-400 text-sm italic">Stay tuned for updates 🚀</p>
        </div>
      </section>

      {/* Footer */}
   <LandingFooter/>
    </main>
  );
}
