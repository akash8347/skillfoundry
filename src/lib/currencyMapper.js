// lib/currencyMapper.js

// 🔹 Single source of truth
const currencyMapper = {
  INR: { 
    code: "m7r2d",
    symbol: "₹",
    courses: {
      python: { displayPrice: 249, realPrice: 2000 },
      js: { displayPrice: 249, realPrice: 2000 },
      python_js_combo :{ price: 498}
    }
  },
  USD: { 
    code: "x9f7q",
    symbol: "$",
    courses: {
      python: { displayPrice: 27, realPrice: 97 },
      js: { displayPrice: 27, realPrice: 97 }, // 🔹 different allowed
      python_js_combo: { price: 44 }
    }
  },
  EUR: { 
    code: "k3z8p",
    symbol: "€",
    courses: {
      python: { displayPrice: 25, realPrice: 95 },
      js: { displayPrice: 25, realPrice: 95 },
      python_js_combo: { price: 40 }
    }
  }
};

// For reverse lookup (encryptedCode → currency)
const codeToCurrency = Object.fromEntries(
  Object.entries(currencyMapper).map(([curr, obj]) => [obj.code, curr])
);

export { currencyMapper, codeToCurrency };
