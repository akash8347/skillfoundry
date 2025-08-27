"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { X,CheckCircle, Gift  } from "lucide-react"; // Add this at the top
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/app/Context/CurrencyContext";
import { currencyMapper } from "@/lib/currencyMapper";
export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { currency, pythonPrice, pythonRealPrice, jsRealPrice, jsPrice, symbol: currencySymbol, encryptedCode } = useCurrency();
  console.log("this is from order summary: ", currency, pythonPrice, jsPrice, pythonRealPrice, jsRealPrice, currencySymbol, encryptedCode);

  // initialize state based on currency immediately
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
  setSelectedItems([
    {
      name: "Python Mastery Course",
      price: pythonPrice,
      description:
        "Learn Core Python, Artificial Intelligence, Web Development, Automation in Python and Make Projects."
    }
  ]);
}, [pythonPrice]);
  const [upsellItem] = useState({
    name: "JavaScript Mastery Course",
    price: jsPrice,
    description:
      "Learn JavaScript from basics to advanced with HTML, CSS, 100+ JS projects, and more."
  });
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState({ email: '', mobile: '' });
  const [addUpsell, setAddUpsell] = useState(false);



  const displayItems = addUpsell
    ? [...selectedItems, upsellItem]
    : selectedItems;

 useEffect(() => {
  let newTotal = displayItems.reduce((acc, item) => acc + item.price, 0);

  if (addUpsell) {
    if (currency === "USD") newTotal = currencyMapper[currency].courses.python_js_combo.price;
    else if (currency === "EUR") newTotal = currencyMapper[currency].courses.python_js_combo.price;
  }

  setTotal(newTotal);
}, [displayItems, addUpsell, currency]);



  // useEffect(() => {
  //   // Get selected items from localStorage
  //   const savedItems = localStorage.getItem("selectedItems");
  //   if (savedItems) {
  //     const items = JSON.parse(savedItems);
  //     setSelectedItems(items);
  //     // Calculate total
  //     const sum = items.reduce((acc, item) => acc + item.price, 0);
  //     setTotal(sum);
  //   }
  //   setLoadingSkeleton(false);
  // }, []); 
  
  const originalTotal =  displayItems.reduce((acc, item) => {
    const key = item.name.toLowerCase().includes("python") ? "python" : "js";
    return acc + currencyMapper[currency].courses[key].realPrice;
  }, 0);
  console.log("originalTotal: ", originalTotal);
  // 👉 calculate discount percent
  console.log( " total: ", total);
  const discountPercent =
    originalTotal > 0 ? Math.round(((originalTotal - total) / originalTotal) * 100) : 0;
    console.log("discountPercent: ", discountPercent);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedForm = localStorage.getItem('checkoutForm');
      const lastEmailSent = localStorage.getItem('lastEmailSent');
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hrs in ms

      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        setCustomer(parsedForm); // Good for UI

        // ✅ Only send if no timestamp or more than 24 hours passed
        if (!lastEmailSent || now - parseInt(lastEmailSent, 10) > twentyFourHours) {
          fetch('/api/checkout-filled', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: parsedForm.email,
              mobile: parsedForm.mobile,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                console.log("✅ Email sent successfully");
                localStorage.setItem('lastEmailSent', now.toString()); // ⏱ Save new timestamp
              } else {
                console.error("❌ Email sending failed");
              }
            })
            .catch(err => console.error("❌ Error sending email:", err));
        } else {
          console.log("⏳ Email already sent in the last 24 hours.");
        }
      }
    }
  }, []);




  const handlePayment = async () => {


    try {
      setLoading(true);


      const courseIdentifier = addUpsell ? "python_js_combo_498" : "python_299";
      const courseId = addUpsell ? "python_js_combo" : "python";
      const response = await fetch("/api/razorpay-javascript-199", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customer.email,
          mobile: customer.mobile,
          courseId,
          currency,
          

        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Something went wrong!");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Skill Foundry",
        description: selectedItems.length > 1 ? "Python + JavaScript Mastery Bundle" : "Python Mastery Pack",
        order_id: data.order.id,
        handler: async (response) => {
          setLoading(true);
          const verifyRes = await fetch("/api/payment-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              email: customer.email,
              mobile: customer.mobile,
              courseIdentifier,
              currency: data.order.currency
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq('track', 'Purchase', {
                value: total,
                currency: 'INR'
              });
            }
            toast.success("Payment successful!");
            localStorage.setItem("firstTime", "true")
            setTimeout(() => {
              window.location.href = "/download";
            }, 1000);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          email: customer.email,
          contact: customer.mobile,
        },
        theme: { color: "#2563eb" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Your Order Summary
      </h2>

      <div className="space-y-4 mb-6">


        <AnimatePresence mode="popLayout">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              layout
              className="relative flex items-start gap-5 border-b pb-2 px-2 sm:px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              {item.name === "JavaScript Mastery Course" && (
                <button
                  className="absolute top-0 right-1 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                  title="Remove"
                  onClick={() => {
                    setAddUpsell(!addUpsell);
                    toast.success(addUpsell ? "JavaScript course removed" : "JavaScript course added");
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="w-32 h-20 sm:w-40 sm:h-28 relative rounded-lg overflow-hidden flex-shrink-0 bg-white border-2 border-gray-200">
                <Image
                  src={index === 0 ? "/book-bundle.webp" : "/book-bundle-js.webp"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
                <p className="text-green-600   font-bold text-base sm:text-lg flex items-center gap-2">
                  {currencySymbol}{item.price}
                  {item.name === "Python Mastery Course" && (
                    <span className="text-gray-400 line-through text-xs sm:text-sm">{currencySymbol}{pythonPrice}</span>
                  )}
                  {item.name === "JavaScript Mastery Course" && (
                    <span className="text-gray-400 line-through text-xs sm:text-sm">{currencySymbol}{jsPrice}</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>


      </div>

<AnimatePresence>
      {addUpsell && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 text-white mb-4"
        >
          <div className="bg-white/20 rounded-full p-2">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold"> Special Combo Deal!</span>
            <span className="text-sm">
              You unlocked the <span className="font-semibold">{currencySymbol}{currencyMapper[currency].courses.python_js_combo.price} combo price</span> for both courses!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>



      <div className="border-t pt-4">
        <div className="flex flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base sm:text-lg">Total Amount</span>
            <span className="font-bold text-base sm:text-lg text-gray-900">
              {currencySymbol}{total}
            </span>
            {console.log("discountPercent: ", discountPercent)}
            {discountPercent > 0 && (
              <>
                <span className="text-gray-400 line-through text-sm">
                  {currencySymbol}{originalTotal}
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200 whitespace-nowrap ml-2">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
        </div>


        {/* Upsell Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
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
                Add the <Link href="/30-days-javascript?from=checkout" className="underline text-blue-600">JavaScript Mastery Course</Link> to your order.
              </p>
              <p className="text-xs text-gray-700 mt-1">
                Learn JavaScript from basics to advanced with HTML, CSS, 100+ JS projects, and more.
              </p>
              {/* <p className="text-green-600 font-semibold text-sm mt-2">
                Add for just ₹149 extra
              </p> */}
            </div>
          </label>
        </div>

        {/* Inline button for desktop, hidden on mobile */}
        <div className="hidden sm:block">
          <Button
            className="w-full bg-black text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ₹${total}`
            )}
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure payment powered by Razorpay</span>
        </div>
      </div>

      {/* Fixed button for mobile only */}
      <div className="sm:hidden">
        <div className="fixed bottom-10 left-0 w-full  px-5 z-50 flex justify-center pointer-events-none">
          <Button
            className="w-full mx-2 pointer-events-auto bg-black  text-white font-semibold py-5  transition-all duration-200 text-base shadow-md hover:shadow-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ${currencySymbol}${total}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}