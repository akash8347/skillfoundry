// app/py-checkout/page.jsx
"use client";

import PYCheckoutForm from "./PYCheckoutForm";
import PYCheckWupscell from "./PYCheckWupscell";


export default function PYCheckoutPage() {
  return (
    <div className="h-screen w-full bg-black/30 flex justify-end sm:items-center sm:justify-center">
      <div className="w-full sm:max-w-md sm:rounded-l-lg h-full sm:h-[90vh] shadow-lg bg-white">
        <PYCheckoutForm/>
      </div>
    </div>
  );
}
