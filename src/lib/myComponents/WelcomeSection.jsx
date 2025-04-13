// components/WelcomeSection.jsx
"use client";

import DownloadSection from "./DownloadSection";

export default function WelcomeSection() {
  return (
    <div className="space-y-8 px-1 sm:px-3 md:px-8 sm:py-2 py-0 max-w-3xl">
      <div className="space-y-8 px-0 sm:px-6 md:px-8 py-3 max-w-3xl">

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">👋 Welcome to the 30-Days Web Design Mastery Journey</h1>
          <p className="text-gray-700">
            This course is crafted for <strong>absolute beginners</strong> who want to go from zero to confident web designer — one day at a time.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">📘 What You’ll Learn</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li><strong>HTML</strong> – The structure of web pages</li>
            <li><strong>CSS</strong> – The styling and layout engine</li>
            <li><strong>JavaScript</strong> – Making web pages interactive</li>
            <li>🧠 Real-world design thinking and best practices</li>
          </ul>
          <p className="text-gray-600">
            By the end, you’ll be confidently building responsive websites from scratch.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">🧰 What You Need</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>💻 A computer with internet</li>
            <li>🌐 A browser (like Chrome)</li>
            <li>🛠️ A code editor (we recommend VS Code)</li>
            <li>🧠 Curiosity and consistency</li>
          </ul>
          <p className="text-gray-600">No prior coding experience required!</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">📚 How This Course Works</h2>
          <p className="text-gray-700">Every day, you unlock one new chapter with lessons, examples, and exercises.</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>💡 Concepts & theory</li>
            <li>🧪 Real examples</li>
            <li>✍️ Hands-on tasks</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">🔁 Learn by Doing</h2>
          <p className="text-gray-700">At the end of each day, you’ll find:</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>✅ Mini challenges & tasks</li>
            <li>🧩 Practice questions</li>
            <li>🧠 Quick quizzes (from Day 8 onwards)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">🎁 Bonus Materials Included</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>📥 PDF guides for HTML, CSS, JavaScript</li>
            <li>🧠 100+ JS MCQs & Interview Questions</li>
            <li>💻 100+ Real-world JS Projects</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
          ⚡ <strong>Let’s get started — click on Day 1 in the sidebar to begin your journey!</strong>
        </div>

      </div>
<DownloadSection/>



    </div>
  );
}
