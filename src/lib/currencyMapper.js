const currencyMapper = {
  INR: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_INDIA,
    default: true,
    variants: {
      m7r2d: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 499, realPrice: 3000 },
          js: { displayPrice: 499, realPrice: 3000 },
          python_js_combo: { price: 899 },
        },
      },
      m7r3d: {
        symbol: "₹",
        courses: {
          python: { displayPrice: 699, realPrice: 3000 },
          js: { displayPrice: 699, realPrice: 3000 },
          python_js_combo: { price: 1199 },
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

  GBP: {
    variants: {
      g7b4n: {
        symbol: "£",
        courses: {
          python: { displayPrice: 14, realPrice: 70 },
          js: { displayPrice: 14, realPrice: 70 },
          python_js_combo: { price: 29 },
        },
      },
      g7b9n: {
        symbol: "£",
        courses: {
          python: { displayPrice: 19, realPrice: 70 },
          js: { displayPrice: 19, realPrice: 70 },
          python_js_combo: { price: 29 },
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
          python_js_combo: { price: 68 },
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
          python_js_combo: { price: 78 },
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
          python_js_combo: { price: 78 },
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
