"use client";

import PYCheckoutForm from "../py-checkout/PYCheckoutForm";

// import PYCheckoutForm from "@/components/PYCheckoutForm";

export default function CheckoutStandalone() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <PYCheckoutForm />
    </div>
  );
}
