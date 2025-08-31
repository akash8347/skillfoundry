// lib/getInitialCurrency.js
import { cookies } from "next/headers";
import { currencyMapper, codeToCurrency } from "@/lib/currencyMapper";

export async function getInitialCurrency(urlSearchParams) {
  const cookieStore = await cookies();

  let code = urlSearchParams?.get("c");  
  let data;

  if (code && codeToCurrency[code]) {
    data = codeToCurrency[code]; // exact variant
  } else {
    // fallback cookie
    const cookieCode = cookieStore.get("encryptedCode")?.value;
    if (cookieCode && codeToCurrency[cookieCode]) {
      data = codeToCurrency[cookieCode];
    } else {
      // fallback default INR
      const defaultCode = Object.keys(currencyMapper.USD.variants)[0];
      data = codeToCurrency[defaultCode];
    }
  }

  return {
    currency: data.currency,
    encryptedCode: data.code,
    symbol: data.symbol,
    courses: data.courses,
  };
}
