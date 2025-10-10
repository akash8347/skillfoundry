import React, { useState } from "react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (!value || isNaN(value)) {
      setTotal("");
      return;
    }

    const totalWithGST = (parseFloat(value) * 1.18).toFixed(2);
    setTotal(totalWithGST);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-6 rounded-2xl shadow-md">
        <input
          type="number"
          value={amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="border border-gray-300 rounded-xl px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {total && (
          <div className="text-lg font-semibold">
            ₹{total} (incl. 18% GST)
          </div>
        )}
      </div>
    </div>
  );
}
