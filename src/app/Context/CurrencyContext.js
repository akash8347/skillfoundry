"use client";

import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children, initialCurrency, initialEncrypted, courses, symbol }) {
  const [currency] = useState(initialCurrency);
  const [encryptedCode] = useState(initialEncrypted);
  const [pythonPrice] = useState(courses.python.displayPrice);
  const [pythonRealPrice] = useState(courses.python.realPrice);
  const [jsPrice] = useState(courses.js.displayPrice);
  const [jsRealPrice] = useState(courses.js.realPrice);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        pythonPrice,
        pythonRealPrice,
        jsPrice,
        jsRealPrice,
        symbol,
        encryptedCode,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside CurrencyProvider");
  return context;
}
