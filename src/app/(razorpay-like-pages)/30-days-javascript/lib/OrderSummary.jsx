"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import { loadScript } from "@/lib/loadScript";
import { toast } from "sonner";
import Image from "next/image";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get selected items from localStorage
    const savedItems = localStorage.getItem("selectedItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setSelectedItems(items);
      // Calculate total
      const sum = items.reduce((acc, item) => acc + item.price, 0);
      setTotal(sum);
    }
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
   

      const courseIdentifier = selectedItems.length > 1 ? "python_js_combo_498" : "python_299";

      const response = await fetch("/api/razorpay-javascript-199", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: searchParams.get("email"),
          mobile: searchParams.get("phone"),
          amount: total * 100, // Convert to paise
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Something went wrong!");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: total * 100,
        currency: "INR",
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
              email: searchParams.get("email"),
              mobile: searchParams.get("phone"),
              courseIdentifier 
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
            setTimeout(() => {
              window.location.href = "/download";
            }, 1000);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          email: searchParams.get("email"),
          contact: searchParams.get("phone"),
          name: searchParams.get("name"),
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Your Order</h2>
      
      <div className="space-y-6 mb-6">
        {selectedItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4 border-b pb-4">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden">
              <Image
                src={index === 0 ? "/last.webp" : "/javascript-book.webp"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-green-600 font-semibold mt-2">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Total Amount</span>
          <span className="font-bold text-lg">₹{total}</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">What's Included:</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Lifetime access to all course materials
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Downloadable resources and code files
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              Certificate of completion
            </li>
          </ul>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${total}`}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}