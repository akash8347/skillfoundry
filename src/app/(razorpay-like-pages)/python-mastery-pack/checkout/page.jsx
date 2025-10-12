"use client";

import PYCheckoutForm from "../py-checkout/PYCheckoutForm";

// import PYCheckoutForm from "@/components/PYCheckoutForm";

export default function CheckoutStandalone() {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className=" sm:max-w-xl  ">
        <PYCheckoutForm />
      </div>
    </div>
  );
}
