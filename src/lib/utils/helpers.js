/**
 * Common Utility Functions
 * Utility functions for dates, formatting, calculations, etc.
 */

/**
 * Format currency value
 */
export function formatCurrency(amount, currency, locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return `${amount} ${currency}`;
  }
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency) {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    CAD: "C$",
    AUD: "A$",
    NZD: "NZ$",
  };
  return symbols[currency] || currency;
}

/**
 * Format date in human-readable format
 */
export function formatDate(date, format = "short") {
  const d = new Date(date);
  const formats = {
    short: () => d.toLocaleDateString("en-US"),
    long: () => d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: () => d.toLocaleTimeString("en-US"),
    full: () => d.toLocaleString("en-US"),
  };
  return (formats[format] || formats.short)();
}

/**
 * Round to 2 decimal places
 */
export function roundToTwo(num) {
  if (typeof num !== "number") return 0;
  return Math.round(num * 100) / 100;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Generate random ID
 */
export function generateId(prefix = "") {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if email is valid
 */
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Truncate string
 */
export function truncateString(str, length = 50) {
  if (!str) return "";
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Convert bytes to human-readable format
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Delay execution (for testing/throttling)
 */
export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff(fn, maxAttempts = 3) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await delay(1000 * Math.pow(2, i));
    }
  }
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge objects deeply
 */
export function deepMerge(target, source) {
  const output = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

/**
 * Debounce function
 */
export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle(fn, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      fn(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
}

/**
 * Check if object is empty
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Get nested property safely
 */
export function getNestedProperty(obj, path, defaultValue = undefined) {
  const value = path
    .split(".")
    .reduce((acc, part) => acc?.[part], obj);
  return value ?? defaultValue;
}
