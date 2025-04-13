"use client";
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import { Button } from "@/components/ui/button";
import Navbar from "@/lib/myComponents/Navbar";
import { useState } from "react";

// Email validation utility
const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side email validation
    if (!email.trim()) {
      setMessage("❌ Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("❌ Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }      

      setMessage("✅ Check your inbox for a login link!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[35rem] lg:min-h-[33rem]  flex justify-center items-center bg-gray-50 p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
  >
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
      Login to access your course
    </h2>

    <input
      type="email"
      placeholder="Enter your email"
      className="w-full border border-gray-300 rounded-md p-2 mb-4"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <Button
      type="submit"
      className="w-full p-2 rounded-md"
      disabled={loading}
    >
      {loading ? "Sending..." : "Send Login Link"}
    </Button>

    {message && (
      <p
        className={`mt-4 text-center ${
          message.startsWith("✅") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}
  </form>
</div>

      <LandingFooter />
    </>
  );
}
