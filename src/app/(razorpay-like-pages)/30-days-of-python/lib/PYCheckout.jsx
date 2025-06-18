"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { indianStates } from "@/lib/indianStates";
import { Lock } from "lucide-react";

export default function PYCheckout({ isOpen, setIsOpen }) {
  const [form, setForm] = useState({ email: "", mobile: "", state: null });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (selectedOption) => {
    setForm(prev => ({ ...prev, state: selectedOption ? selectedOption.value : null }));
    setFieldErrors(prev => ({ ...prev, state: "" }));
  };

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
    const amount = 24900;
    try {

      const res = await fetch("/api/razorpay-javascript-199", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount,

        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: 24900,
        currency: "INR",
        name: "Python Mastery Pack",
        description: "Purchase E-Guide Bundle",
        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true);

          try {
            // Step 1: Verify payment
            const verifyRes = await fetch("/api/payment-verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                ...form,
                courseIdentifier: "python_299"
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Step 2: Track with Facebook Pixel
              if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Purchase', {
                  value: 249.00,
                  currency: 'INR'
                });
              }

              // Step 3: Attempt to send download email (but don't block redirect if it fails)
              try {
                await fetch("/api/send-download-link", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: form.email,
                    name: form.name,
                    hasPythonAccess: true,
                    hasJavaScriptAccess: false // set true if needed
                  }),
                });
              } catch (emailError) {
                console.warn("Download email failed to send:", emailError);
                // Optionally log or show toast (don't block flow)
              }

              // Step 4: Always redirect
              window.location.href = "/download";

            } else {
              setError("Payment verification failed.");
              setLoading(false);
            }

          } catch (err) {
            console.error("Handler error:", err);
            setError("An unexpected error occurred.");
            setLoading(false);
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

        <div className="text-center text-xl font-bold sm:mb-4  mt-5 sm:mt-0 mb-3">Payment Details</div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">

          <div className="sm:flex-1  sm:text-left">
            <h3 className="text-xl text-left sm:text-left font-semibold text-gray-800 leading-tight">
              30 Days of Python Mastery
            </h3>
            <p className="text-sm text-gray-600 text-left">
              Learn Core python, Artificial Intellegece, Web Development, Automation in Python and Make Projects.
            </p>
            {/* <p className="font-bold text-green-700">₹249</p> */}
          </div>
        </div>



        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors`}
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
            />
            <p className="text-xs text-gray-500 mt-1">Access to this purchase will be sent to this email</p>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Select
              name="state"
              options={indianStates}
              onChange={handleSelectChange}
              value={indianStates.find(s => s.value === form.state) || null}
              className="react-select-container"
              classNamePrefix="react-select"
              placehold er="Select your state"
              menuPlacement="top"
            />
            {fieldErrors.state && <p className="text-xs text-red-500 mt-1">{fieldErrors.state}</p>}
          </div>


          <Button
            className="w-full hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </Button>

        </form>
  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-[0.875rem] font-semibold rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2 border border-gray-200 whitespace-nowrap max-w-[95%] overflow-hidden">
  <div className="bg-green-100 p-1.5 rounded-full shadow-sm">
    <Lock size={14} className="text-green-600" />
  </div>
  <span className="tracking-tight">Secure Checkout</span>
</div>



      </div>
   

    </div>
  );
}
