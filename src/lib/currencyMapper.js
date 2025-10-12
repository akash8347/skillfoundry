const currencyMapper = {
  INR: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_INDIA,
    default: true,
    variants: {
      m7r7d: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 397, realPrice: 2000 },
          js: { displayPrice: 397, realPrice: 2000 },
          python_js_combo: { price: 794 },
        },
      },
      m7r4d: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 497, realPrice: 2000 },
          js: { displayPrice: 497, realPrice: 2000 },
          python_js_combo: { price: 994 },
        },
      },
     
      temp2242: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 1, realPrice: 2000 },
          js: { displayPrice: 1, realPrice: 2000 },
          python_js_combo: { price: 1 },
        },
      },
    },
  },
  USD: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    variants: {
      x3f9q: { // Tier 2
        symbol: "$",
        courses: {
          python: { displayPrice: 39, realPrice: 97 },
          js: { displayPrice: 39, realPrice: 97 },
          python_js_combo: { price: 78 },
        },
      },
      x2f9q: { // Tier 1
        symbol: "$",
        courses: {
          python: { displayPrice: 29, realPrice: 79 },
          js: { displayPrice: 29, realPrice: 79 },
          python_js_combo: { price: 58 },
        },
      },
      x1f9q: { // Tier 2
        symbol: "$",
        courses: {
          python: { displayPrice: 19, realPrice: 97 },
          js: { displayPrice: 19, realPrice: 78 },
          python_js_combo: { price: 38 },
        },
      },
      x2f7q: { // Tier 1
        symbol: "$",
        courses: {
          python: { displayPrice: 27, realPrice: 97 },
          js: { displayPrice: 27, realPrice: 78 },
          python_js_combo: { price: 54 },
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
          python_js_combo: { price: 50 },
        },
      },
    },
  },

  GBP: {
    variants: {
      g7b4n: {
        symbol: "£",
        courses: {
          python: { displayPrice: 14, realPrice: 70 },
          js: { displayPrice: 14, realPrice: 70 },
          python_js_combo: { price: 28 },
        },
      },
      g7b9n: {
        symbol: "£",
        courses: {
          python: { displayPrice: 19, realPrice: 70 },
          js: { displayPrice: 19, realPrice: 70 },
          python_js_combo: { price: 38 },
        },
      },
    },
  },

  CAD: {
    variants: {
      c4d2s: {
        symbol: "$",
        courses: {
          python: { displayPrice: 39.99, realPrice: 97 },
          js: { displayPrice: 39.99, realPrice: 97 },
          python_js_combo: { price: 79.98 },
        },
      },
    },
  },

  AUD: {
    variants: {
      a9u5t: {
        symbol: "$",
        courses: {
          python: { displayPrice: 44.99, realPrice: 97 },
          js: { displayPrice: 44.99, realPrice: 97 },
          python_js_combo: { price: 89.98 },
        },
      },
    },
  },

  NZD: {
    variants: {
      n3z6d: {
        symbol: "$",
        courses: {
          python: { displayPrice: 47.99, realPrice: 97 },
          js: { displayPrice: 47.99, realPrice: 97 },
          python_js_combo: { price: 94.98 },
        },
      },
    },
  }
}


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
