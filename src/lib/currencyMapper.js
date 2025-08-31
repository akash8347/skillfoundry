// lib/currencyMapper.js

// 🔹 Single source of truth
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
      x2f7q: { // Tier 1
        symbol: "$",
        courses: {
          python: { displayPrice: 27, realPrice: 97 },
          js: { displayPrice: 27, realPrice: 97 },
          python_js_combo: { price: 44 },
        },
      },
      x1f9q: { // Tier 2 (new)
        symbol: "$",
        courses: {
          python: { displayPrice: 19, realPrice: 79 },
          js: { displayPrice: 19, realPrice: 79 },
          python_js_combo: { price: 29 },
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

export { currencyMapper, codeToCurrency };
