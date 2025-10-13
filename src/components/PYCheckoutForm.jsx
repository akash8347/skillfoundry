"use client";
import { useState, useEffect } from "react";
import { X, Check, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <-- add this
// import { indianStates } from "@/lib/indianStates";
import Select from "react-select";
import { useCurrency } from "@/app/Context/CurrencyContext";
import { is } from "date-fns/locale";
// import { usaStates } from "@/lib/usaStates";
import { genEventId } from "@/lib/eventHelper";
// import { australiaStates } from "@/lib/australiaStates";
// import { ukStates } from "@/lib/ukStates";
// import { newZealandStates } from "@/lib/newZealandStates";
import { optionsForCurrency } from "@/lib/optionsForCurrency "
import { canadaStates } from "@/lib/canadaStates";
import toast from "react-hot-toast";
import Link from "next/link";
import { currencyMapper } from "@/lib/currencyMapper";
import { motion, AnimatePresence } from 'framer-motion';
import { add } from "date-fns";


export default function PYCheckoutForm({ showCloseButton = true }) {
  const router = useRouter(); // <-- initialize router

const [form, setForm] = useState(() => {
  // Load from localStorage initially
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("checkoutForm");
    return saved ? JSON.parse(saved) : { email: "", mobile: "", state: null };
  }
  return { email: "", mobile: "", state: null };
}); 
 const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [addUpsell, setAddUpsell] = useState(false);
  const [amount, setAmount] = useState(0);
  console.log("addUpsell checkout form", addUpsell);
  const { currency, pythonPrice: price, jsPrice: jsPrice, symbol, encryptedCode, pythonRealPrice, jsRealPrice } = useCurrency(); // 👈 ab teeno mil rahe
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("checkoutForm", JSON.stringify(form));
    }
  }, [form]);

  if (addUpsell) {
    () => setAmount(currencyMapper[currency].variants[encryptedCode].courses.python_js_combo.price);
  }
  // price= newTotal;


  const baseItems = [
    { name: 'Python Mastery Pack', quantity: 1, price: price },
  ];

  if (addUpsell) {
    baseItems.push({ name: 'JavaScript Mastery Pack', quantity: 1, price: jsPrice });
  }

  // Add the final items (Tax/Total calculation placeholder)
  const finalItems = [
    ...baseItems,
    { name: 'Tax', quantity: 1, price: '0 (price with tax)' },
  ];





 const handleSelectChange = (selectedOption) => {
  setForm(prev => {
    const updated = { ...prev, state: selectedOption ? selectedOption.value : null };
    localStorage.setItem("checkoutForm", JSON.stringify(updated));
    return updated;
  });
  setFieldErrors(prev => ({ ...prev, state: "" }));
};




  const courseIdentifier = "python_299";
  // const amount = 24900;
  const onClose = () => {
    // router.push(`/python-mastery-pack?c=${encryptedCode}`);
    router.back();
  }


  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex;

    if (currency === "INR") {
      // India: +91XXXXXXXXXX or variations
      phoneRegex = /^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/;

    } else if (currency === "USD") {
      // USA: 1234567890, (123) 456-7890, 123-456-7890, +1XXXXXXXXXX
      phoneRegex = /^(?:\+1\s*|1\s*[-.]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    } else if (currency === "CAD") {
      // Canada: same as USA (North American Numbering Plan)
      phoneRegex = /^(?:\+1\s*|1\s*[-.]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    } else if (currency === "AUD") {
      // Australia: starts with +61 or 0, followed by 9 digits
      phoneRegex = /^(?:\+61|0)[2-478]\d{8}$/;

    } else if (currency === "NZD") {
      // New Zealand: starts with +64 or 0, usually 8–10 digits
      phoneRegex = /^(?:\+64|0)[2-9]\d{7,9}$/;

    } else if (currency === "GBP") {
      // UK mobile validation (flexible, common formats)
      phoneRegex = /^(?:\+44\s?7\d{3}|\(?(?:\+44)?0?7\d{3}\)?)[\s-]?\d{3}[\s-]?\d{3}$/;
    }
    else if (currency === "EUR") {
      // Placeholder: (you might want to add specific patterns per country later)
      phoneRegex = /^\+?\d{6,15}$/;
    }


    if (!emailRegex.test(form.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!phoneRegex.test(form.mobile)) {
      errors.mobile = "Enter a valid  mobile number";
    } return errors;
  };

  const handleChange = (e) => {
  const updated = { ...form, [e.target.name]: e.target.value };
  setForm(updated);
  localStorage.setItem("checkoutForm", JSON.stringify(updated));
  setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
};
  

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    const eventId = genEventId();
    // const itemSku = "PYTHON_MASTERY_PACK_01"; // Or whatever your product SKU is
    const PYTHON_SKU = "PYTHON_MASTERY_PACK_01";
    const JAVASCRIPT_SKU = "JAVASCRIPT_MASTERY_PACK";

    let content_ids = [PYTHON_SKU]; // Always include the base product (Python)
    if (addUpsell) {
      content_ids.push(JAVASCRIPT_SKU); // Add the upsell product if purchased
    }
    const courseIdentifier = addUpsell ? "python_js_combo_498" : "python_299";

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "AddPaymentInfo",
        {
          value: addUpsell ? currencyMapper[currency].variants[encryptedCode].courses.python_js_combo.price : price,
          currency,
          content_ids: content_ids, // <-- ADD THIS
          content_type: "product",
        },
        { eventID: eventId }
      );
    }
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    // CAPI - still fine with fetch here
    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "AddPaymentInfo",
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: fbp,
        fbc: fbc,
        email: form.email,
        phone: form.mobile,
        custom_data: {
          value: addUpsell ? currencyMapper[currency].variants[encryptedCode].courses.python_js_combo.price : price,
          currency,
          content_ids: content_ids,
          content_type: "product",
        },
      }),
    }).catch(console.error);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setError("");
    setLoading(true);

    const amount1 = addUpsell ? amount : price * 100;
    console.log("amount: ", amount1);
    const courseId = addUpsell ? "python_js_combo" : "python";

    try {
      const res = await fetch("/api/razorpay-javascript-199", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount1,
          currency,
          courseId,
          // is39,
          encryptedCode
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
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Python Mastery Pack",
        description: "Purchase E-Guide Bundle",
        notes: {
          email: form.email,
          mobile: form.mobile,
          courseIdentifier: courseIdentifier,
          encryptedCode: encryptedCode,
          courseId: courseId
        },

        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true);

          const verifyRes = await fetch("/api/payment-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              ...form,
              courseIdentifier: courseIdentifier,
              // currency: data.order.currency,
              courseId,
              // is39,
              encryptedCode
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            const eventId = genEventId();

            // Pixel (unchanged)
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq(
                "track",
                "Purchase",
                {
                  value: price,
                  currency,
                  order_id: data.order.id,
                  content_ids: content_ids,
                  content_type: "product",
                  contents: [{ id: courseId, quantity: addUpsell ? 2 : 1 }],
                },
                { eventID: eventId }
              );
            }

            // Fresh cookies
            const fbp = getCookie("_fbp");
            const fbc = getCookie("_fbc");

            // CAPI (use sendBeacon for reliability)
            const payload = {
              event_name: "Purchase",
              event_id: eventId,
              event_source_url: window.location.href,
              email: form.email,
              phone: form.mobile,
              fbp,
              fbc,
              order_id: data.order.id,
              custom_data: {
                value: price,
                currency: data.order.currency,
                content_ids: content_ids,
                content_type: "product",
                contents: [{ id: courseId, quantity: addUpsell ? 2 : 1 }],
              },
            };

            navigator.sendBeacon(
              "/api/capi",
              new Blob([JSON.stringify(payload)], { type: "application/json" })
            );

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

  const getSubdivisionLabel = (currency) => {
    switch (currency) {
      case "INR": return "Select your State";
      case "USD": return "Select your State";
      case "AUD": return "Select your State / Territory";
      case "GBP": return "Select your Region";
      case "NZD": return "Select your Region";
      case "CAD": return "Select your Province / Territory";
      default: return "Select your State/Region";
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // Placeholder Data (You will replace this with your dynamic cart data)


  // Framer Motion variants for the expandable panel
  const panelVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren"
      }
    }
  };
  const ChevronIcon = ({ isOpen }) => (
    <motion.svg
      className="h-5 w-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </motion.svg>
  );




  return (
    <div className="max-h-[90vh] bg-white p-6 sm:rounded-l-lg relative ">
      {showCloseButton && (
        <button
          className="sticky top-0 z-10 float-right text-gray-500 hover:text-gray-700 transition-colors p-1 -mt-2 -mr-2 bg-white rounded-full"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      )}

      <div className="text-xl font-bold mt-4 mb-4 sm:mb-4">
        {/* Use Flexbox to align the icon and text horizontally in the center */}
        <div className="flex items-center justify-center">

          {/* Lock Icon Container */}
          <div className="bg-green-100 p-1.5 rounded-full shadow-sm mr-2">
            <Lock size={14} className="text-green-600" />
          </div>

          {/* Text */}
          <div>
            Checkout Details
          </div>
        </div>
      </div>

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
            The Python Mastery Pack
          </h3>
          {/* <p className="text-sm text-gray-600">
            Learn Core Python, Artificial Intelligence, Web Development, Automation in Python and Make Projects for <span className="font-bold">{symbol}{price}{currency == "INR" ? "/" : ""}</span> only.
          </p> */}
          {/* <p className="font-bold text-green-700">₹199</p> */}
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

        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          {/* <Select
            name="state"
            options={currency === "INR" ? indianStates : usaStates}
            onChange={handleSelectChange}
            value={currency === "INR" ? indianStates.find(s => s.value === form.state) || null : usaStates.find(s => s.value === form.state) || null}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select your state"
            menuPlacement="top"
          /> */}


          <Select
            name="state"
            options={optionsForCurrency[currency]} // you map currency → list
            onChange={handleSelectChange}
            value={optionsForCurrency[currency]?.find(s => s.value === form.state) || null}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder={getSubdivisionLabel(currency)}
            menuPlacement="top"
          />

          {fieldErrors.state && <p className="text-xs text-red-500 mt-1">{fieldErrors.state}</p>}
        </div>


        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          {/* <h3 className="text-sm font-semibold text-blue-800 mb-2">
            🎁 Special Offer: Upgrade Your Learning!
          </h3> */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={addUpsell}
              onChange={() => {
                setAddUpsell(!addUpsell);
                toast.success(addUpsell ? "JavaScript course removed" : "JavaScript course added");
              }}
              className="mt-1 accent-blue-600 w-4 h-4"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Add the <Link href="/python-mastery-pack/javascript-upsell" className="underline text-blue-600">JavaScript Mastery Course</Link> to your order.
              </p>
              {/* <p className="text-xs text-gray-700 mt-1">
                Learn JavaScript from basics to advanced with HTML, CSS, 100+ JS projects, and more.
              </p> */}
              {/* <p className="text-green-600 font-semibold text-sm mt-2">
                Add for just ₹149 extra
              </p> */}
            </div>
          </label>
        </div>

        {/* checkout summary Start----------------------------------- */}

        {/* Checkout Summary Container */}
        <div className="relative w-full mb-4">

          {/* Summary Header (The clickable part) */}
          <motion.button
            type="button"
            layout="position" // Enables Framer Motion to animate its position if other elements around it change
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 pt-2 px-3 rounded-t-lg transition-colors duration-150 border border-b-0 border-gray-300"
            aria-expanded={isExpanded}
          >
            <span className="text-sm font-medium text-gray-700">
              Total Amount:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">
                {symbol}{addUpsell ? currencyMapper[currency].variants[encryptedCode].courses.python_js_combo.price : price}
              </span>
              <ChevronIcon isOpen={isExpanded} />
            </div>
          </motion.button>

          {/* The Expandable Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={panelVariants}
                // This is the key: absolute positioning, high z-index, and sitting flush on top
                className="absolute bottom-full left-0 right-0 z-50 p-4 bg-white border border-gray-300 rounded-t-lg shadow-2xl overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="text-sm space-y-3"
                >
                  <h3 className="text-sm font-semibold text-gray-600 pb-1">
                    Order Details
                  </h3>

                  {/* Items List */}
                  <ul className="space-y-2">
                    {finalItems.map((item, index) => (
                      <li key={index} className="flex justify-between text-gray-700">
                        <span className="truncate">
                          {item.name === "Tax" ? (
                            // If the item name is "Tax", just show the name in bold
                            <span>{item.name}</span>
                          ) : (
                            // Otherwise, show the name AND the quantity
                            <>
                              {item.name} <span className="text-gray-500">x {item.quantity}</span>
                            </>
                          )}
                        </span>
                        <span className="font-medium">{symbol}{item.price}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Total Separator and final amount */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between font-extrabold text-lg text-gray-900">
                      <span>Grand Total</span>
                      <span> {symbol}{addUpsell ? currencyMapper[currency].variants[encryptedCode].courses.python_js_combo.price : price}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* checkout summary End----------------------------------- */}


        {/* button Start */}
        <Button
          type="submit"
          onClick={handlePayment}
          className="w-full  bg-black text-white py-3 rounded-lg font-medium transition-colors"
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
          ) : "Buy Now"}
        </Button>

        {/* button End */}

        {/* <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-[0.875rem] font-semibold rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2 border border-gray-200 whitespace-nowrap max-w-[95%] overflow-hidden">
          <div className="bg-green-100 p-1.5 rounded-full shadow-sm">
            <Lock size={14} className="text-green-600" />
          </div>
          <span className="tracking-tight">Secure Checkout</span>
        </div> */}
        {/* <div className="flex justify-center pt-2">  */}

        <div className="flex justify-center">





          {/* <div 
      // Removed the unnecessary 'flex' from the inner div since 'gap-2' and 'items-center' already make it behave like flex.
      // KEY CHANGE: Add w-fit to constrain the width to the content.
      className="bg-white text-gray-800 text-[0.875rem] font-semibold rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2 border border-gray-200 whitespace-nowrap overflow-hidden w-fit"
    >
      <div className="bg-green-100 p-1.5 rounded-full shadow-sm">
        <Lock size={14} className="text-green-600" />
      </div>
      <span className="tracking-tight">Secure Checkout</span>
    </div> */}
        </div>
      </form>

    </div>
  );
}
