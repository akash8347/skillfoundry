"use client"
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";
export default function RefundPolicy() {
    return (
        <>
        <Navbar/>
        <div className="max-w-[70%] min-h-[25rem] md:min-h-[30rem] mx-auto  py-8 text-gray-700">
      <h2 className="text-xl font-semibold mb-2">Operational Address</h2>
      <p>
        L.H. Road, Surat, Gujarat, India
      </p>
    </div>
      <LandingFooter/>
      </>
    );
  }
  