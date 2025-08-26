// invoice.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Invoice from "@/models/Invoice";

// Helper: map country -> currency
const currencyMap = {
  US: "USD",
  USA: "USD",
  UnitedStates: "USD",
  UK: "EUR",
  UnitedKingdom: "EUR",
  India: "INR",
};

// Helper: convert number to words (basic for 3 currencies)
function numberToWords(amount, currency) {
  const words = require("number-to-words"); // npm install number-to-words
  const numInWords = words.toWords(amount);

  switch (currency) {
    case "USD":
      return `USD ${numInWords.toUpperCase()} ONLY`;
    case "EUR":
      return `EUR ${numInWords.toUpperCase()} ONLY`;
    case "INR":
      return `RUPEES ${numInWords.toUpperCase()} ONLY`;
    default:
      return `${currency} ${numInWords.toUpperCase()} ONLY`;
  }
}

// Helper: generate sequential invoice number
async function getNextInvoiceNumber() {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

  const year = new Date().getFullYear().toString().slice(-2); // e.g. 25 for 2025
  let nextNumber = "000001";

  if (lastInvoice) {
    const [prefix, number] = lastInvoice.invoiceNumber.split("-");
    const lastYear = prefix.replace("INV", "");
    if (lastYear === year) {
      const incremented = (parseInt(number) + 1).toString().padStart(6, "0");
      nextNumber = incremented;
    }
  }

  return `INV${year}-${nextNumber}`;
}

// Main function
async function generateInvoice(email, mobile, country, coursesToSave) {
  await connectDB();

  // 1. Find user
  const user = await User.findOne({ email, mobile });
  if (!user) throw new Error("User not found");

  // 2. Determine currency
  let currency = "USD"; // default
  if (currencyMap[country]) {
    currency = currencyMap[country];
  }

  // 3. Generate invoice number
  const invoiceNumber = await getNextInvoiceNumber();

  // 4. Map courses to invoice items
  const items = coursesToSave.map((course, idx) => {
    const rate = course.amount / 100; // convert from Razorpay (19900 -> 199.00)
    return {
      sr: idx + 1,
      description: `30 days of ${course.name} mastery digital guides`,
      hsn: "998431",
      qty: 1,
      rate,
      amount: rate,
    };
  });

  // 5. Calculate totals
  const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
  const total = subTotal;
  const totalText = numberToWords(total, currency);
const customerName = user.name && user.name.trim().length > 0 
  ? user.name 
  : user.email.split("@")[0]; // fallback to email prefix

  // 6. Create invoice doc
  const invoice = new Invoice({
    user: user._id,
    name: customerName,
    email: user.email,
    phone: user.mobile,
    country,
    invoiceNumber,
    currency,
    items,
    subTotal,
    total,
    totalText,
  });

  await invoice.save();

  return invoice;
}

export default generateInvoice;
