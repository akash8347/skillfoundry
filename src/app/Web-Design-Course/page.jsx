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
import UrgencyBadge from "@/components/LandingPageComponents/UrgencyBadge";
import Link from "next/link";
import Image from "next/image"
import LiveDemoSection from "@/components/LandingPageComponents/LiveDemoSection";
import YourInstructor from "@/components/LandingPageComponents/YourInstructor";
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
    title: "Interview Questions",
    details: "Frequently asked questions with answers. Topics covered: Core JavaScript fundamentals, ES6+ concepts, Hoisting, Closures, and Scope, Event loop and asynchronous JavaScript, Performance optimization, Data structures and algorithms, Common coding problems."
  },
  {
    title: "MCQs & Quizzes",
    details: "Sharpen your skills with multiple-choice questions. Covers: Beginner, Intermediate, and Advanced-level questions. Topics include: ES6, OOP in JavaScript, Async programming, Event handling, Error handling, Web APIs, Data structures and logic-based questions."
  }
];

export default function LandingPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false); // Control Checkout Form

  return (
    <>
      <div className="pb-16 md:pb-0">
        <div className="min-h-screen bg-gray-50  text-gray-900 overflow-x-hidden">
          <div className="hidden text-center h-8 sm:flex sm:items-center sm:justify-center sm:block sm:bg-black sm:text-white sm:mt-0">
            🚀 Limited Time Offer: Unlock the <div className="font-bold px-1">30-Days Web Design Mastery Pack</div> Today & Fast-Track Your Career!
          </div>
          <Navbar />
          <UrgencyBadge />
          {/* hero section strats-------------------------- */}

          <section className=" lg:py-20 xl:px-28 lg:px-4 lg:w-[90%] xl:w-[90%] lg:mx-auto xl:mx-auto pt-2 sm:pt-5 pb-8 flex flex-col lg:flex-row items-center text-black">
            <div className="w-[80%] mb-3 mt-2  lg:mt-0 lg:mb-0 lg:w-full max-w-[250px] lg:max-w-[380px] mx-auto">
              <Image
                src="/web-design-book.webp"
                alt="30 Days Web Design Mastery"
                width={350}
                height={100}
                priority
                className="rounded-lg"
              />
            </div>

            <div className="md:w-[80%] w-[90%] mx-auto mt-2 lg:mt-0">
              <div>
                <h2 className="text-[2rem] sm:text-4xl font-extrabold leading-tight text-black">
                  Become a Certified Web Designer in Just 30 Days
                </h2>

                <p className="mt-3 text-gray-800 text-[1.05rem] sm:text-[1.2rem] leading-relaxed font-medium">
                  Want to become a Web Designer? Learn HTML, CSS, JavaScript, build 100+ real projects, practice with live coding exercises, crack interviews & start your career — all in one!
                </p>

                <p className="hidden sm:block mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                  Get 100+ real-world projects, step-by-step guides, coding challenges, interview questions, and live practice sessions — all in one powerful course!
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 text-sm sm:text-base">
                  <div className="flex items-center text-green-600 font-semibold">
                    <span className="mr-1">4.9</span>
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="ml-2 text-green-600">(1,200+ reviews)</span>
                  </div>
                  <span className="text-gray-400 hidden sm:block">|</span>
                  <span className="text-gray-600">5,000+ Students</span>
                </div>

                <div className="mt-4 text-2xl font-bold text-black">
                  ₹499 <span className="line-through text-gray-500 ml-1">₹4999</span>
                  <span className="text-green-600 ml-2">90% off</span>
                </div>

                <Button
                  className="w-full lg:w-[100%] lg:mx-auto mt-5 text-base sm:text-lg font-medium py-4"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </section>

          {/* hero section ends ------------------------------*/}

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
                HTML, CSS, JavaScript-Beginner  to advanced
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

          {/* books grid */}
          <section className="mb-5">
            <h2 className="sm:text-4xl mb-2 text-2xl mx-auto mt-8 w-[90%] sm:w-[68%] font-semibold sm:mb-5 text-gray-900 text-center">
              Premium Guides Provided
            </h2>

            <div className="w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[75%] mx-auto p-2 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border border-gray-200 rounded-lg p-1 sm:p-3"
                >
                  <Image
                    src={`/book-${index}.png`}
                    alt={book.title}
                    height={500}
                    width={350}
                    className="h-48 sm:h-64 object-contain transition-all duration-300"
                  />
                  <p className="mt-1 sm:mt-2 text-center text-sm sm:text-base font-medium">
                    {book.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Checkout isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
          <CourseHighlights />
          <YourInstructor />
          <WhoCanTakeThisCourse />
          <Testimonials />
          <FAQSection />
          <LandingFooter />
        </div>
      </div>
      <StickyBuyNow setCheckoutOpen={setCheckoutOpen} />
    </>
  );
}