"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const JSnavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-3 bg-[#0F172A] text-white shadow-md">
        {/* Just the logo wrapped in a Link */}
        <Link href="/download" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Skill Foundry Logo"
            width={100}
            height={30}
            className="object-contain h-8 sm:h-10 w-auto w-[36px] h-[20px]"
            priority
          />
        </Link>

        <div className="pr-5 sm:pr-10">
          30 DAYS OF MASTERY
        </div>

        <button
          className="flex items-center gap-1 text-sm sm:text-base hover:text-gray-300 transition"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="hidden xs:inline">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default JSnavbar;
