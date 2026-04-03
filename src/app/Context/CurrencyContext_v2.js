/**
 * Improved CurrencyContext
 * Optimized for performance and clarity
 */

"use client";

import { createContext, useContext } from "react";

const CurrencyContext = createContext(null);

/**
 * Currency Provider Component
 * Props are passed from server component, not stored in state
 */
export function CurrencyProvider({
  children,
  initialCurrency,
  initialEncrypted,
  courses,
  symbol,
}) {
  // Validate props
  if (!initialCurrency || !courses || !symbol) {
    throw new Error("CurrencyProvider: Missing required props");
  }

  // Create context value - these don't need to be state
  // They're passed from server component and don't change
  const contextValue = {
    currency: initialCurrency,
    encryptedCode: initialEncrypted,
    
    // Course prices - static data from initialization
    courses: {
      python: {
        displayPrice: courses.python?.displayPrice || 0,
        realPrice: courses.python?.realPrice || 0,
      },
      javascript: {
        displayPrice: courses.js?.displayPrice || 0,
        realPrice: courses.js?.realPrice || 0,
      },
      combo: {
        displayPrice: courses.python_js_combo?.price || 0,
      },
    },
    
    symbol,

    // Helper methods
    formatPrice: (price) => `${symbol}${price.toFixed(2)}`,
    getDisplayPrice: (courseId) =>
      contextValue.courses[courseId]?.displayPrice || 0,
    getRealPrice: (courseId) =>
      contextValue.courses[courseId]?.realPrice || 0,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

/**
 * Hook to use currency context
 */
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return context;
}

/**
 * Hook to get price in current currency
 */
export function usePrice(courseId) {
  const { getDisplayPrice, getRealPrice } = useCurrency();
  return {
    displayPrice: getDisplayPrice(courseId),
    realPrice: getRealPrice(courseId),
  };
}

/**
 * Hook to format currency
 */
export function useFormatCurrency() {
  const { symbol } = useCurrency();
  return (amount) => `${symbol}${amount.toFixed(2)}`;
}
