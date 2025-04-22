"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function JSCheckout({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({ email: "", mobile: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;



    if (!emailRegex.test(form.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!phoneRegex.test(form.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
    }

    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/razorpay-javascript-199", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: 14900,
        currency: "INR",
        name: "Javascript Mastery Pack",
        description: "Purchase E-Guide Bundle",
        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true); // show loading while verifying and redirecting

          const verifyRes = await fetch("/api/payment-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, ...form }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {

            // Trigger Facebook Purchase event
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq('track', 'Purchase', {
                value: 149.00,
                currency: 'INR'
              });
            }

            window.location.href = "/download/js-download";
          } else {
            setError("Payment verification failed.");
            setLoading(false); // stop loading if error

          }
        },
        prefill: {
          email: form.email,
          contact: form.mobile,
        },
        theme: { color: "#528FF0" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/30 z-[90] transition-opacity 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg p-6 z-50 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"} sm:max-w-md sm:rounded-l-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        <div className="text-center text-xl font-bold sm:mb-4 mb-2">Payment Details</div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
          <div className="w-[120px]">
            <Image
              src="/main-image.png"
              alt="Book Mockup"
              width={1208}
              height={1251}
              className="rounded-xl hidden sm:block"
            />
          </div>
          <div className="sm:flex-1  sm:text-left">
            <h3 className="text-xl text-left sm:text-left font-semibold text-gray-800 leading-tight">
              30 Days of Javascript Mastery
            </h3>
            <p className="text-sm text-gray-600 text-left">
              Learn HTML, CSS, JavaScript, live coding, premium guides and more.
            </p>
            <p className="font-bold text-green-700">₹149</p>
          </div>
        </div>

        <div className="bg-white text-black rounded-xl pb-0 sm:pb-3">
          <ul className="space-y-1 text-sm">
            {[
              "Day-by-Day structured Javascript learning",
              "HTML, CSS – Beginner to Advanced",
              "100+ Javascript Projects",
              "Exercise, code and practice",
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4">


          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
            />
            {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="mobile"
              className={`w-full border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your phone number"
              onChange={handleChange}
              value={form.mobile}
            />
            {fieldErrors.mobile && <p className="text-xs text-red-500 mt-1">{fieldErrors.mobile}</p>}
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy @ INR 149"}
          </Button>
        </form>
      </div>
    </div>
  );
}
