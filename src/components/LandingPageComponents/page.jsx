"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/LandingPageComponents/Testimonials";
import FAQSection from "@/components/LandingPageComponents/FAQSection";
import Checkout from "@/lib/myComponents/Checkout";
import Navbar from "../../lib/myComponents/Navbar";
import CourseHighlights from "@/components/LandingPageComponents/CourseHighlights";
import CourseAccordion from "@/components/LandingPageComponents/CourseAccordion ";
import WhoCanTakeThisCourse from "@/components/LandingPageComponents/WhoCanTakeThisCourse";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import StickyBuyNow from "@/components/LandingPageComponents/StickyBuyNow";

const books = [
  {
    title: "30 Days JavaScript Mastery",
    details: "Covers ES6+ concepts, DOM Manipulation, Async/Await, and more."
  },
  {
    title: "HTML Made Easy",
    details: "Learn HTML fundamentals, elements, tables, forms, and media embeds. Covers: Structure of an HTML document. Headings, paragraphs, and text formatting. Links, images, and multimedia elements. Forms and form validation. Semantic HTML. SEO-friendly markup."
  },
  {
    title: "CSS Made Easy",
    details: "Covers Flexbox, Grid, Animations, and Responsive Design. Topics include: CSS selectors and specificity. Box model and positioning. Flexbox and Grid layout. Transitions, animations, and keyframes. Media queries for responsive design. CSS best practices."
  },
  {
    title: "100+ Web Design Projects",
    details: "Real-world projects with source code. Includes: Landing pages, Portfolio sites, E-commerce UI, Blog templates, Admin dashboards, Animations and interactive components, Dark/light mode toggle designs."
  },
  {
    title: "100+ JavaScript Interview Questions",
    details: "Frequently asked questions with answers. Topics covered: Core JavaScript fundamentals, ES6+ concepts, Hoisting, Closures, and Scope, Event loop and asynchronous JavaScript, Performance optimization, Data structures and algorithms, Common coding problems."
  },
  {
    title: "100+ JavaScript MCQs & Quizzes",
    details: "Sharpen your skills with multiple-choice questions. Covers: Beginner, Intermediate, and Advanced-level questions. Topics include: ES6, OOP in JavaScript, Async programming, Event handling, Error handling, Web APIs, Data structures and logic-based questions."
  }
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false); // Control Checkout Form

  return (
    <div className="min-h-screen bg-gray-50  text-gray-900 overflow-x-hidden">
      {/* Scrolling banner for smaller screens */}
      <div className={`sm:hidden overflow-hidden ${menuOpen ? 'invisible' : 'visible'}`}>
        <motion.div
          className="whitespace-nowrap flex gap-x-1"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        >
          <span>🚀 Limited Time Offer: Unlock the</span>
          <strong>30-Days Web Design Mastery Pack</strong>
          <span>Today & Fast-Track Your Career!</span>
        </motion.div>
      </div>
      {/* Discount Banner */}
      {/* Static text for larger screens */}
      <div className="hidden text-center h-8 sm:flex sm:items-center sm:justify-center sm:block sm:bg-black sm:text-white sm:mt-0">
        🚀 Limited Time Offer: Unlock the <div className="font-bold px-1">30-Days Web Design Mastery Pack</div> Today & Fast-Track Your Career!
      </div>
      <Navbar />




      <section className="xl:px-28 lg:px-4 lg:w-[90%] xl:w-[90%] lg:mx:auto xl:mx-auto  pt-1 pb-5 xl:pt-10 xl:pb-18 flex flex-col lg:flex-row xl:flex-row items-center lg:justidy-center xl:justify-center text-black">
        <div className="w-[90%] lg:w-full max-w-[380px] md:max-w-xs lg:max-w-md mx-auto"
        >
          <img
            src="/main-book-final.png"
            alt="30 Days Web Design Mastery"
          />
        </div>

        <div className="md:w-[80%]  w-[90%] mx-auto mt-6 md:mt-5 xl:mt-0 ">
          <div className="p-0 md:p-0"> {/* Ensure no internal padding on mobile, only optional on desktop */}
            <h2 className="text-[1.75rem] sm:text-3xl md:text-3xl xl:text-4xl font-bold leading-snug tracking-tight">
              {/* 30 Days of Web Design Mastery: */}
              Become Certified Web Designer in 30 Days,
              <br className=" sm:block" />
              Learn HTML, CSS, JavaScript, 100+ Projects, Quizzes, and Live Coding!
            </h2>

            <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Access 100+ projects, hands-on guides, JavaScript, HTML, CSS challenges, quizzes,
              interview  questions, and live coding sessions — all crafted to make you job-ready for top tech roles!
            </p>

            {/* Rating and student count */}
            <div className="flex flex-wrap items-center md:justify-start gap-x-4 gap-y-2 mt-2 text-sm sm:text-base">
              <div className="flex items-center text-green-600 font-semibold">
                <span className="mr-1">4.8</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-green-600">(1,200+ reviews)</span>
              </div>
              <span className="hidden sm:block text-gray-400">|</span>
              <span className="text-gray-600">5,000+ Students</span>
            </div>

            {/* Pricing Text */}
            <div className="mt-4 text-xl sm:text-xl font-semibold text-black">
              ₹499 <span className="line-through text-gray-500 ml-1">₹4999</span>
              <span className="text-gray-700 ml-2">90% off</span>
            </div>

            <Button
              className="w-[100%] lg:w-[50%] mx-auto sm:mt-8 mt-5 text-base sm:text-lg font-medium py-4"
              onClick={() => setCheckoutOpen(true)}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </section>


      {/* this course offers */}
      <div className="bg-white text-black  rounded-xl pb-2 pl-5   md:hidden">
        <h3 className="text-base font-semibold mb-3 text-black italic">Course Benifits</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Day-by-Day structured learning
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            HTML, CSS, JavaScript-Begginer to advanced
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            100+ Web Design Projects
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Live coding and practice
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Certificate on completion
          </li>
        </ul>
      </div>

      {/* course content-Begginer to Advanced */}
      <CourseAccordion />

      {/* Sticky Buy Now Bar - Clean White/Black Version */}
      <StickyBuyNow />
      {/* Checkout Component (Visible when checkoutOpen is true) */}
      <Checkout isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />

      <CourseHighlights />

      {/* Book Collection */}

      <section>

        <h2 className="sm:text-4xl text-3xl mx-auto mt-2 w-[90%] sm:w-[68%] font-bold sm:mb-5 text-gray-900">Course Guides </h2>


        <div className="sm:w-[70%]  mx-auto    p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-gray-300 rounded-lg md:p-5 p-0"
            >
              <img
                src={`/book-${index}.png`}
                alt={book.title}
                className="h-43 md:h-72 object-contain"
              />
              <p className="mt-1 sm:mt-2 text-center text-normal sm:text-lg font-medium">{book.title}</p>
            </div>
          ))}
        </div>
      </section>

      <WhoCanTakeThisCourse />
      <Testimonials />
      <FAQSection />
      <LandingFooter />
    </div>
  );
}