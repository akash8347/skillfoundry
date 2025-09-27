'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookIndexModal from './BookIndexModal'; // import reusable modal
import { FaEye } from 'react-icons/fa'; // import eye icon

export default function WebDevPythonBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const indexData = [
  ['01', 'Introduction', [
    "Why learn Web Development with Python?",
    "Overview of Python web frameworks",
    "What you’ll build in this book"
  ]],
  ['02', 'Setting Up Your Development Environment', [
    "Installing Python & pip",
    "Setting up Virtual Environments",
    "Installing Flask & Django",
    "Choosing an IDE (VS Code, PyCharm)"
  ]],
  ['03', 'Understanding HTTP, HTML & APIs', [
    "How the Web Works (Client/Server)",
    "Basics of HTTP methods (GET, POST, etc.)",
    "Introduction to HTML structure",
    "What are APIs and JSON?"
  ]],
  ['04', 'Introduction to Flask', [
    "What is Flask?",
    "Setting up your first Flask app",
    "Routing basics",
    "Running a local server"
  ]],
  ['05', 'Building a Mini Website with Flask', [
    "Creating routes & templates",
    "Using Jinja2 for dynamic content",
    "Handling forms & user input",
    "Serving static files"
  ]],
  ['06', 'Introduction to Django (Fast Overview)', [
    "What is Django?",
    "Django project vs app structure",
    "Django ORM basics",
    "Admin panel overview"
  ]],
  ['07', 'Creating a Simple Blog App with Django', [
    "Setting up models & migrations",
    "Creating views & templates",
    "Handling CRUD (Create, Read, Update, Delete)",
    "Adding user authentication"
  ]],
  ['08', 'Hosting Your Web App', [
    "Choosing hosting (Heroku, Vercel, PythonAnywhere)",
    "Setting up Git & deployment",
    "Configuring environment variables",
    "Basic security best practices"
  ]],
  ['09', 'Bonus Projects (Mini Real World Projects)', [
    "Building a To-do app with Flask",
    "Simple REST API with FastAPI",
    "Portfolio website with Django",
    "Weather app with API integration"
  ]],
];


  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-3 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          🌐 Web Development Using Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/web-python.webp"
            alt="Web Development Using Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            A complete beginner’s guide to web development using Python — covering <strong>Flask</strong>, 
            <strong> Django</strong>, <strong>HTTP & APIs</strong>, deployment, and real-world mini projects.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Learn HTTP, HTML, and API integration from scratch</li>
            <li>Build projects using Flask and Django</li>
            <li>Host your web applications</li>
            <li>Includes mini real-world web app projects</li>
          </ul>
        </div>
      </div>

    <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-md hover:from-teal-500 hover:to-teal-600 transition"
        >
View Book Content <FaEye className="w-4 h-4" />        </motion.button>
      </div>

       {/* Reusable Modal */}
                  <BookIndexModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    indexData={indexData}
                    title="Web development in Python"
                  />
    </section>
  );
}
