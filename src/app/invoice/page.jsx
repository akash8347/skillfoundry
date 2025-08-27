"use client";

import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css
import "react-date-range/dist/theme/default.css"; // theme css

export default function InvoiceDatePicker() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [option, setOption] = useState("custom");

  const handleOptionChange = (value) => {
    setOption(value);
    let today = new Date();

    switch (value) {
      case "today":
        setRange([{ startDate: today, endDate: today, key: "selection" }]);
        break;
      case "lastWeek":
        setRange([
          { startDate: startOfWeek(today, { weekStartsOn: 1 }), endDate: endOfWeek(today, { weekStartsOn: 1 }), key: "selection" },
        ]);
        break;
      case "currentMonth":
        setRange([{ startDate: startOfMonth(today), endDate: endOfMonth(today), key: "selection" }]);
        break;
      case "lastMonth":
        const lastMonthDate = subMonths(today, 1);
        setRange([{ startDate: startOfMonth(lastMonthDate), endDate: endOfMonth(lastMonthDate), key: "selection" }]);
        break;
      case "custom":
      default:
        break;
    }
  };

  const fetchInvoices = async () => {

    const payload = {
      startDate: range[0].startDate.toISOString(),
      endDate: range[0].endDate.toISOString(),
    };
    try{

    const res = await fetch("/api/getinv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "No invoicesdd found");
        return;
      }

            const blob = await res.blob();
    // Determine filename from response headers
      const contentDisposition = res.headers.get("Content-Disposition");
      let filename = "invoices";

      if (contentDisposition && contentDisposition.includes("filename=")) {
        filename = contentDisposition
          .split("filename=")[1]
          .replace(/["']/g, "")
          .trim();
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);
     } catch (err) {
      console.error("Download failed:", err);
      alert("Something went wrong while downloading invoices");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Invoice Date Range</h2>

      {/* Options */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleOptionChange("today")}
          className={`px-3 py-1 rounded-lg text-sm ${
            option === "today" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => handleOptionChange("lastWeek")}
          className={`px-3 py-1 rounded-lg text-sm ${
            option === "lastWeek" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Last Week
        </button>
        <button
          onClick={() => handleOptionChange("currentMonth")}
          className={`px-3 py-1 rounded-lg text-sm ${
            option === "currentMonth" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Current Month
        </button>
        <button
          onClick={() => handleOptionChange("lastMonth")}
          className={`px-3 py-1 rounded-lg text-sm ${
            option === "lastMonth" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Last Month
        </button>
        <button
          onClick={() => handleOptionChange("custom")}
          className={`px-3 py-1 rounded-lg text-sm ${
            option === "custom" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Custom Range
        </button>
      </div>

      {/* Custom Date Range Picker */}
      {option === "custom" && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="mb-4"
        />
      )}

      {/* Action Button */}
      <button
        onClick={fetchInvoices}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Fetch Invoices
      </button>
    </div>
  );
}
