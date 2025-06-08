"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <-- add this
import { indianStates } from "@/lib/indianStates";
import Select from "react-select";


export default function PYCheckoutForm({ showCloseButton = true  }) {
    const router = useRouter(); // <-- initialize router

  const [form, setForm] = useState({ email: "", mobile: "" ,state:null});
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("checkoutForm", JSON.stringify(form));
      }
    }, [form]);
     
  
 const handleSelectChange = (selectedOption) => {
    setForm(prev => ({ ...prev, state: selectedOption ? selectedOption.value : null }));
    setFieldErrors(prev => ({ ...prev, state: "" }));
  };




  const courseIdentifier="python_299";
const amount=24900;
  const onClose=()=>{
    router.push("/30-days-python");
  }


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
          const verifyRes = await fetch("/api/payment-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, ...form,courseIdentifier:courseIdentifier }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq('track', 'Purchase', {
                value: 249.00,
                currency: 'INR'
              });
            }
            window.location.href = "/download";
          } else {
            setError("Payment verification failed.");
            setLoading(false);
          }
        },
        prefill: { email: form.email, contact: form.mobile },
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
    <div className="h-full w-full bg-white p-6 sm:rounded-l-lg relative overflow-y-auto">
      {showCloseButton && (
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={28} />
        </button>
      )}

      <div className="text-center text-xl font-bold sm:mb-4 mb-2">Payment Details</div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
        <div className="w-[120px]">
          <Image
            src="/last.webp"
            alt="Book Mockup"
            width={1208}
            height={1251}
            className="rounded-xl hidden sm:block"
          />
        </div>
        <div className="sm:flex-1 text-left">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight">
            30 Days of Python Mastery
          </h3>
          <p className="text-sm text-gray-600">
            Learn Core python, Artificial Intelligence, Web Development, Automation in Python and Make Projects.
          </p>
          <p className="font-bold text-green-700">₹249</p>
        </div>
      </div>

      <ul className="hidden md:block space-y-1 text-sm mb-4">
        {[
          "Day-by-Day structured Python learning",
          "AI, Automation, web devlopment in python",
          "150+ Core Python+Game Projects",
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

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
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
            className={`w-full border ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
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
            placeholder="Select your state"
          />
          {fieldErrors.state && <p className="text-xs text-red-500 mt-1">{fieldErrors.state}</p>}
        </div>


        <Button
          className="w-full  text-white font-semibold py-3 px-6 rounded-lg"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </Button>
      </form>
    </div>
  );
}
