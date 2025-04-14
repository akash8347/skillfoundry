"use client";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          Welcome to <strong>Skill Foundry</strong>! These Terms and Conditions govern your use of our website,{" "}
          <strong>skill-foundry.in</strong>, and access to the 30 Days of Web Design Mastery course. By using our platform, you accept these terms in full. If you disagree with any part of these terms, please refrain from using our website.
        </p>

        <h2 className="text-xl font-semibold mb-2">Intellectual Property Rights</h2>
        <p className="mb-4">
          Unless stated otherwise, all content, branding, materials, course modules, and designs on this website are owned by Skill Foundry and/or its licensors. All rights are reserved. You may access the course content strictly for personal use, subject to the restrictions set in these terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">Restrictions</h2>
        <p className="mb-4">You are specifically restricted from the following actions:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Publishing any course content or website material on any other platform or media.</li>
          <li>Selling, sublicensing, or commercializing any course or website content.</li>
          <li>Publicly performing or displaying any website material without permission.</li>
          <li>Using this website in any way that causes damage or interrupts service.</li>
          <li>Engaging in illegal activity or actions that violate applicable laws or regulations.</li>
          <li>Extracting or harvesting data from the website for any commercial use.</li>
          <li>Using this platform for unauthorized marketing or spam activities.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, Skill Foundry disclaims all warranties related to the website and your use of it. Nothing in this disclaimer will:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Limit or exclude liability for death or personal injury caused by negligence.</li>
          <li>Limit or exclude liability for fraud or fraudulent misrepresentation.</li>
          <li>Limit any liabilities in ways not permitted under applicable law.</li>
          <li>Exclude any liabilities that may not be excluded under applicable law.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms and Conditions at any time without prior notice. It is your responsibility to check this page regularly to stay informed of any updates.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about these terms, please contact us at{" "}
          <Link href="mailto:skill.foundry365@gmail.com" className="text-blue-600 underline">
          skill.foundry365@gmail.com
          </Link>
          .
        </p>
      </div>
      <LandingFooter/>
    </>
  );
}
