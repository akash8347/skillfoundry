'use client';
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          At <span className="font-semibold">Skill Foundry</span>, we empower learners to build real-world tech skills
          through practical and beginner-friendly courses in web design, JavaScript, and software development. Led by
          industry professionals, our mission is to help you go from zero to job-ready with clarity and confidence.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-4">
          For support, questions, or course-related help, feel free to reach out using the following options:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>
            <span className="font-medium">Email:</span>{" "}
            <Link
              href="mailto:support@skill-foundry.in"
              className="text-blue-600 underline"
            >
              support@skill-foundry.in
            </Link>
          </li>
          <li>
            <span className="font-medium">DM on Instagram:</span>{" "}
            <Link
              href="https://instagram.com/akash_gohil_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @akash_gohil_
            </Link>
          </li>
        </ul>
      </div>
      <LandingFooter/>
    </>
  );
}
