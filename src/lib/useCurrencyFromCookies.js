"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // npm install js-cookie

export default function useCurrencyFromCookies() {
  const [currency, setCurrency] = useState("USD");
  const [encryptedCode, setEncryptedCode] = useState("default123");

  useEffect(() => {
    const c = Cookies.get("currency") || "USD";
    const code = Cookies.get("encryptedCode") || "default123";
    setCurrency(c);
    setEncryptedCode(code);
  }, []);

  return { currency, encryptedCode };
}
