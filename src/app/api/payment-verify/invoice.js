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
  INDIA: "INR",
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


//fetchRBIReferenceRate
async function fetchRBIReferenceRate(currencyCode, date) {
  try {
    let url = `https://api.frankfurter.app/${date}?from=${currencyCode}&to=INR`;
    console.log("🔗 Fetching exchange rate from:", url);

    let response = await fetch(url);
    let data = await response.json();

    if (!data || !data.rates || !data.rates.INR) {
      console.warn(`No rate found for ${date}, falling back to latest`);
      url = `https://api.frankfurter.app/latest?from=${currencyCode}&to=INR`;
      response = await fetch(url);
      data = await response.json();
    }

    if (!data || !data.rates || !data.rates.INR) {
      console.error("Unexpected API response:", data);
      throw new Error("Exchange rate for INR not found in API response");
    }

    return data.rates.INR;
  } catch (err) {
    console.error("fetchRBIReferenceRate failed:", err);
    throw err;
  }
}

// Helper to convert any currency to INR as of given date
//  async function convertToINR(total, currencyCode, date) {

//    if (currencyCode === "INR") return total;
//     const rate = await fetchRBIReferenceRate(currencyCode, date); return total * rate;
//    }
// Helper to convert any currency to INR as of given date
async function convertToINR(total, currencyCode, date) {
  // If currency is already INR, the rate is 1
  if (currencyCode === "INR") {
    return { convertedAmount: total, rate: 1 };
  }
  
  const rate = await fetchRBIReferenceRate(currencyCode, date);
  const convertedAmount = total * rate;
  
  // Return an object with both values
  return { convertedAmount, rate };
}
// Main function
async function generateInvoice(email, mobile, country, currency, coursesToSave, razorpay_order_id, razorpay_payment_id) {
  console.log("Generating invoice for:", email, mobile, country, coursesToSave);
  await connectDB();

  // 1. Find user
  const user = await User.findOne({ email, mobile });
  if (!user) throw new Error("User not found");

  // 2. Determine currency
  // let currency = "USD"; // default
  // if (currencyMap[country]) {
  //   currency = currencyMap[country];
  // }

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
  
  // 6. Calculate converted INR amount (if not INR)
   const transactionDate = new Date().toISOString().split("T")[0]; 
  const { convertedAmount, rate } = await convertToINR(total, currency, transactionDate);
  
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
     convertedINRAmount: convertedAmount, // Use the converted amount here
    exchangeRate: rate,                 // And save the exchange rate here
    razorpay_order_id,
    razorpay_payment_id,
  });

  await invoice.save();

  return invoice;
}

export default generateInvoice;
