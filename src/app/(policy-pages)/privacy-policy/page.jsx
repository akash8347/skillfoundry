"use client";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy explains how <strong>Skill Foundry</strong> collects, uses, and protects your information when you use our website and enroll in the Mastery courses available at{" "}
          <strong>skill-foundry.in</strong>. By using our website, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal details such as your name, email address, and other contact information when you sign up, make a payment, or fill out forms on our site. We also collect technical data like your IP address, browser type, and usage behavior via cookies and similar tracking technologies.
        </p>

        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          We use your data to deliver our course content, improve our platform, and communicate with you regarding your enrollment, updates, or support. Your information may also be used for personalized content, marketing emails (only when opted in), or to meet legal and regulatory requirements.
        </p>

        <h2 className="text-xl font-semibold mb-2">Information Sharing</h2>
        <p className="mb-4">
          We do not sell your personal data. However, we may share your information with trusted third-party services like payment processors, email platforms, or analytics tools that help us operate and improve Skill Foundry. We may also disclose your data when required by law or to protect our legal rights.
        </p>

        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <p className="mb-4">
          We implement industry-standard measures to secure your data. While we strive to protect your personal information, please be aware that no online system is 100% secure. We encourage users to take basic precautions like using strong passwords and not sharing account credentials.
        </p>

        <h2 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may revise this Privacy Policy from time to time. If we make significant changes, we’ll notify you via our website or email. Please check this page regularly to stay informed.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please reach out to us at{" "}
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
