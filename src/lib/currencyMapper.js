const currencyMapper = {
  INR: {
    default: true,
    variants: {
      m7r2d: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 249, realPrice: 2000 },
          js: { displayPrice: 249, realPrice: 2000 },
          python_js_combo: { price: 398 },
        },
      },
    },
  },
  USD: {
    variants: {
      x3f9q: { // Tier 2
        symbol: "$",
        courses: {
          python: { displayPrice: 39, realPrice: 97 },
          js: { displayPrice: 39, realPrice: 97 },
          python_js_combo: { price: 58 },
        },
      },
      x2f9q: { // Tier 1
        symbol: "$",
        courses: {
          python: { displayPrice: 29, realPrice: 79 },
          js: { displayPrice: 29, realPrice: 79 },
          python_js_combo: { price: 48 },
        },
      },
    },
  },

  EUR: {
    variants: {
      k3z8p: {
        symbol: "€",
        courses: {
          python: { displayPrice: 25, realPrice: 95 },
          js: { displayPrice: 25, realPrice: 95 },
          python_js_combo: { price: 40 },
        },
      },
    },
  },
};

// 🔹 Reverse lookup
const codeToCurrency = {};
for (const [currency, { variants }] of Object.entries(currencyMapper)) {
  for (const [code, details] of Object.entries(variants)) {
    codeToCurrency[code] = { currency, code, ...details };
  }
}
// 🔹 Helper function
function getCoursePricesByCode(code) {
  const details = codeToCurrency[code];
  if (!details) {
    throw new Error(`Invalid currency code: ${code}`);
  }

  const { courses, symbol } = details;

  return {
    symbol,
    python: courses.python.displayPrice,
    js: courses.js.displayPrice,
    python_js_combo: courses.python_js_combo.price,
  };
}

export { currencyMapper, codeToCurrency, getCoursePricesByCode };
