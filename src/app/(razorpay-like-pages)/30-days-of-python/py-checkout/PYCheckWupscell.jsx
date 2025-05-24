"use client";
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import toast from "react-hot-toast";

export default function PYCheckWupscell({ showCloseButton = true }) {
  const router = useRouter();

  const [form, setForm] = useState(() => {
    if (typeof window !== "undefined") {
      const savedForm = localStorage.getItem("checkoutForm");
      if (savedForm) return JSON.parse(savedForm);
    }
    return { email: "", mobile: "" };
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // const [addUpsell, setAddUpsell] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutForm", JSON.stringify(form));
    }
  }, [form]);

  const onClose = () => {
    router.push("/30-days-of-python");
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!emailRegex.test(form.email)) errors.email = "Enter a valid email address";
    if (!phoneRegex.test(form.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const selectedItems = [
      {
        name: "Python Mastery Course",
        price: 199,
        description: "Learn Core Python, Artificial Intelligence, Web Development, Automation in Python and Make Projects."
      }
    ];

  

    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    router.push(`/30-days-of-python/order-summary`);
  };

  return (
    <div className="h-full w-full bg-white p-6 sm:rounded-l-lg relative overflow-y-auto">
      {showCloseButton && (
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={onClose}
        >
          <X size={28} />
        </button>
      )}

      <div className="text-center text-xl font-bold sm:mb-4 mb-4 mt-4">Checkout Details</div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
        <div className="w-[120px] h-[63px] relative hidden sm:block"> {/* Added hidden sm:block to hide on mobile */}
          <Image
            src="/book-bundle.webp"
            alt="Book Mockup"
            width={1200}
            height={628}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="sm:flex-1 text-left">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight">
            30 Days of Python Mastery
          </h3>
          <p className="text-sm text-gray-600">
            Learn Core Python, Artificial Intelligence, Web Development, Automation in Python and Make Projects.
          </p>
          <p className="font-bold text-green-700">₹199</p>
        </div>
      </div>

      <ul className="hidden md:block space-y-1 text-sm mb-4">
        {[
          "Day-by-Day structured Python learning",
          "AI, Automation, web development in Python",
          "150+ Core Python + Game Projects",
          "Exercise, code and practice",
        ].map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>


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
            className={`w-full border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors`}
            placeholder="Enter your phone number"
            onChange={handleChange}
            value={form.mobile}
          />
          {fieldErrors.mobile && <p className="text-xs text-red-500 mt-1">{fieldErrors.mobile}</p>}
        </div>

        <Button
          type="submit"
          onClick={handleContinue}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : "Review Your Order"}
        </Button>
      </form>
    </div>
  );
}