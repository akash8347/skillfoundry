'use client';

import Image from 'next/image';

export default function Cheatsheet() {
  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          🐍 Python Cheatsheet
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/py-cheat-sheet.webp"
            alt="Python Cheatsheet"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
        
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Python syntax, data types, loops, functions</li>
            <li>Advanced Pythonic patterns and comprehensions</li>
            <li>File handling, exception management, and modules</li>
            <li>Key packages: NumPy, Pandas, Matplotlib</li>
            <li>Virtual environments and package management</li>
            <li>Common developer shortcuts and best practices</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
