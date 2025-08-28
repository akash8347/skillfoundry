"use client";

import { createContext, useContext, useState } from "react";
import { currencyMapper } from "@/lib/currencyMapper";

const CurrencyContext = createContext();

export function CurrencyProvider({ children, initialCurrency, initialEncrypted }) {
  const [currency] = useState(initialCurrency);
  const [encryptedCode] = useState(initialEncrypted);
   console.log("CurrencyProvider currency: " + currency + " encryptedCode: " + encryptedCode);
  const [pythonPrice] = useState(currencyMapper[currency].courses.python.displayPrice);
  const [pythonRealPrice] = useState(currencyMapper[currency].courses.python.realPrice);
  const [jsPrice] = useState(currencyMapper[currency].courses.js.displayPrice);
  const [jsRealPrice] = useState(currencyMapper[currency].courses.js.realPrice);
  const [symbol] = useState(currencyMapper[currency].symbol);

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
