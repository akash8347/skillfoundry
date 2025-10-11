// import React, { useState } from "react";

// export default function GSTCalculator({sales}) {
//   console.log(sales+"hello type of"+typeof sales);
//   const [amount, setAmount] = useState("");
//   const [total, setTotal] = useState("");

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);

//     if (!value || isNaN(value)) {
//       setTotal("");
//       return;
//     }

//     const totalWithGST = (parseFloat(value) * 1.18).toFixed(2);
//     setTotal(totalWithGST);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800">
//       <div className="flex flex-col sm:flex-col items-center gap-3 bg-white p-6 rounded-2xl shadow-md">
//         <input
//           type="number"
//           value={amount}
//           onChange={handleChange}
//           placeholder="Enter amount"
//           className="border border-gray-300 rounded-xl px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {total && (
//           <div className="text-lg  font-semibold">
//             ₹{total} (COST)
//           </div>
//         )}
//         {sales && (
//           <>
//           <div className="text-lg  font-semibold">
//             ₹{sales} (SALES)
//           </div>
//           <div className="text-lg  bg-green-200 font-semibold">
//             ₹{sales-total} (PROFIT)
//           </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, IndianRupee } from "lucide-react";

export default function GSTCalculator({ sales }) {
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

  const profitOrLoss =
    sales && total ? (parseFloat(sales) - parseFloat(total)).toFixed(2) : null;

  const isProfit = profitOrLoss && profitOrLoss > 0;
  const isLoss = profitOrLoss && profitOrLoss < 0;

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-sm transition-all duration-300 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-5 text-indigo-600">
          GST + Profit/Loss Calculator
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Enter base amount"
            className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-center text-lg"
          />

          {total && (
            <div className="flex flex-col items-center bg-indigo-50 p-3 rounded-xl">
              <div className="flex items-center text-lg font-semibold text-indigo-700">
                <IndianRupee className="w-4 h-4 mr-1" />
                {total} <span className="ml-2 text-sm text-gray-500">(Cost with GST)</span>
              </div>
            </div>
          )}

          {sales && (
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex items-center justify-center bg-blue-50 p-3 rounded-xl text-blue-700 font-semibold text-lg">
                <IndianRupee className="w-4 h-4 mr-1" />
                {sales} <span className="ml-2 text-sm text-gray-500">(Sales)</span>
              </div>

              {profitOrLoss && (
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-xl font-bold text-lg shadow-sm ${
                    isProfit
                      ? "bg-green-100 text-green-700"
                      : isLoss
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isProfit && (
                    <>
                      <ArrowUpCircle className="w-6 h-6 mb-1 text-green-600" />
                      <span>Profit: ₹{profitOrLoss}</span>
                    </>
                  )}
                  {isLoss && (
                    <>
                      <ArrowDownCircle className="w-6 h-6 mb-1 text-red-600" />
                      <span>Loss: ₹{Math.abs(profitOrLoss)}</span>
                    </>
                  )}
                  {!isProfit && !isLoss && <span>No Profit, No Loss</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
