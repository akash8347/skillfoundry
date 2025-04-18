"use client";

import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        {/* Logo */}
        <Link href="/30-days-javascript" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Skill Foundry Logo"
            width={100}
            height={30}
            className="object-contain h-8 sm:h-10 w-auto"
            priority
          />
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-black transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu - overlay, no layout shift */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[100%] w-full bg-white shadow-md px-6 py-4 space-y-2 border-t border-gray-200 z-40"
          >
            <Link href="/30-days-javascript" className="block text-gray-800 font-medium hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/download/js-download" className="block text-gray-800 font-medium hover:text-blue-600 transition">
              My Course
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
