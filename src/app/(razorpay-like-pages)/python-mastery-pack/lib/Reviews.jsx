"use client";
import React from "react";

const reviews = [
  {
    text: "I learned more from these five-six books than years of coding in Python.",
    name: "—Alex Thompson on Twitter",
  },
  {
    text: 'These books is my most-read #python and AI books. A must-have for coding lovers like me.',
    name: "—Maya Rodriguez on Mastodon",
  },
  {
    text: 'The AI Mastery book confirmed I am on the right path, and I learned a TON I\'m already adding to my projects.',
    name: "—Jordan Wells on Twitter",
  },
  {
    text: "Just finished your Python and data science books in one sitting. Can't wait to put your ideas into action!",
    name: "—Chris Allen on Twitter",
  },
  {
    text: "I've been coding in Python for over a decade, but the hardest thing now is learning better patterns and tools. This books delivers that and more!",
    name: "—Sophie Mitchell on Twitter",
  },
  {
    text: "If you work in software, drop what you’re doing and get this AI guides now. It’s saved me countless hours already!",
    name: "—Ryan Carter on Twitter",
  },
  {
    text: "Used my training budget for your Python books — easily one of the best investments. Constant 'wish I knew this earlier!' moments.",
    name: "—Priya Khanna on Goodreads",
  },
  {
    text: "This Python books is packed with practical tips that would’ve saved my clients a lot of money. Every dev should read it!",
    name: "—Liam O’Connor on LinkedIn",
  },
  {
    text: "It's pure gold — every chapter is a gold nugget for Python developers.",
    name: "—Emma Lee on Twitter",
  },
//   {
//     text: "If you think technical books are complex, think again — this AI guide is approachable, insightful, and inspiring.",
//     name: "—Noah Greene on Goodreads",
//   },
//   {
//     text: "Started reading the AI Mastery book today — absolutely brilliant!",
//     name: "—Olivia Hayes on Twitter",
//   },
//   {
//     text: "As a beta reader, I can say this book is packed with amazing tips and insights.",
//     name: "—Ethan Brooks on Twitter",
//   },
//   {
//     text: "Finished reading the Python Mastery book — lots of helpful advice and tips!",
//     name: "—Hannah White on Twitter",
//   },
//   {
//     text: "Sometimes you need to hear familiar concepts explained in a new way — this book nails it.",
//     name: "—Jacob Miller on Twitter",
//   },
//   {
//     text: "Been using Python since before version 2.0, and I still learned new tricks from this book.",
//     name: "—Sophia Davis on Twitter",
//   },
];

export default function Reviews() {
  return (
    <section className="py-10" id="reviews">
      <h2 className="text-2xl font-bold mb-8">What Readers Say</h2>
      <div className="grid gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border border-black rounded-md p-5 text-black shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <p className="mb-3 italic">“{review.text}”</p>
            <p className="font-semibold">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
