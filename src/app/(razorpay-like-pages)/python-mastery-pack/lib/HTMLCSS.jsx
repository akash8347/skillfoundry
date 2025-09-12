

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

export default function CoreProjects() {



  return (
    <>
      <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
        {/* Heading and Image */}
        <div className="flex flex-col items-center gap-4 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
            100+ Python Projects
          </h3>
          <div className="w-full md:w-92 flex-shrink-0">
            <Image
              src="/project-core-py.webp"
              alt="100+ python projects"
              width={300}
              height={400}
              className="w-[88%] mx-auto md:w-full h-auto"
            />
          </div>
          <div className="max-w-xl">
            <p className="text-gray-700 mt-2 mb-4">
              This curated guide features 100+ practical Python projects to strengthen your core programming skills — covering <strong>scripting</strong>, <strong>automation</strong>, <strong>data analysis</strong>, <strong>web development</strong>, and <strong>GUI apps</strong>.
            </p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
              <li>Start with beginner-friendly tools: calculators, password generators, and games</li>
              <li>Advance to building GUIs, bots, web apps, and data visualizations</li>
              <li>Includes full-stack apps with Flask, REST APIs, and database integration</li>
              <li>Work with real-world libraries: Pandas, Selenium, Tkinter, SQL, and more</li>
            </ul>
          </div>

        </div>



      </section>
      <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
        {/* Heading and Image */}
        <div className="flex flex-col items-center gap-4 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
            50+ Game Projects in Python
          </h3>
          <div className="w-full md:w-92 flex-shrink-0">
            <Image
              src="/project-game-py.webp"
              alt="AI with Python"
              width={300}
              height={400}
              className="w-[80%] mx-auto md:w-full h-auto"
            />
          </div>
          <div className="max-w-xl">
            {/* <p className="text-gray-700 mt-2 mb-4">
    Dive into 50+ exciting game projects that bring Python to life — from <strong>arcade classics</strong> to <strong>logic puzzles</strong> and <strong>strategy-based challenges</strong>. Perfect for sharpening your skills in game logic, OOP, and libraries like <strong>Turtle</strong> and <strong>Pygame</strong>.
  </p> */}
            <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
              <li>Build iconic games like <strong>Snake</strong>, <strong>Pong</strong>, <strong>2048</strong>, and <strong>Flappy Bird</strong></li>
              <li>Create brainy puzzles and board games: <strong>Sudoku Solver</strong>, <strong>Tower of Hanoi</strong>, <strong>Battleship</strong>, <strong>Connect Four</strong></li>
              <li>Reimagine arcade-style classics like <strong>Pacman</strong>, <strong>Brick Breaker</strong>, and <strong>Space Invaders</strong></li>
              <li>Level up with memory and reflex games: <strong>Simon Says</strong>, <strong>Whack-a-Mole</strong>, <strong>Memory Match</strong>, and more</li>
            </ul>
          </div>


        </div>



      </section>
    </>
  );
}

