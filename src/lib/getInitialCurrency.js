import { cookies } from "next/headers";
import { currencyMapper, codeToCurrency } from "@/lib/currencyMapper";

export async function getInitialCurrency(urlSearchParams) {
  const cookieStore = await cookies();
  
  // Check query param first
  let currency;
  if (urlSearchParams?.get("c") && codeToCurrency[urlSearchParams.get("c")]) {
    currency = codeToCurrency[urlSearchParams.get("c")];
  } else {
    // fallback cookie
    currency = cookieStore.get("currency")?.value || "INR";
  }

  return {
    currency,
    encryptedCode: cookieStore.get("encryptedCode")?.value || currencyMapper[currency].code,
  };
}
