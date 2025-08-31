// middleware.js (root level, not in src/)
import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/verifyTokenEdge";

// 🔹 Single source of truth
import { currencyMapper, codeToCurrency } from "@/lib/currencyMapper";

export async function middleware(request) {
  const { nextUrl, cookies } = request;
  const url = nextUrl.clone();

  // 🔹 1. AUTH LOGIC
  const token = cookies.get("authToken")?.value;
  const pathname = url.pathname;

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtected =
    pathname.startsWith("/Dashboard") ||
    pathname.startsWith("/certification") ||
    pathname.startsWith("/download");

  if (isProtected) {
    const verified = token ? await verifyTokenEdge(token) : null;
    if (!verified) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 🔹 2. CURRENCY HANDLING
  let currencyCode = url.searchParams.get("c");

  // (a) If param present → map to variant & save cookies
  if (currencyCode && codeToCurrency[currencyCode]) {
    const data = codeToCurrency[currencyCode]; // contains { currency, code, symbol, courses }
    const res = NextResponse.next();
    res.cookies.set("currency", data.currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookies.set("encryptedCode", data.code, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  // (b) Else → check existing cookies
  const existingCurrency = cookies.get("currency")?.value;
  const existingCode = cookies.get("encryptedCode")?.value;
  if (existingCurrency && existingCode && codeToCurrency[existingCode]) {
    return NextResponse.next(); // already valid
  }

  // (c) Else → use geo to pick default variant
  const euroCountries = [
    "AT","BE","CY","EE","FI","FR","DE","GR","IE",
    "IT","LV","LT","LU","MT","NL","PT","SK","SI","ES"
  ];

  let geoCurrency = "INR"; // default
  try {
    const ip = request.headers.get("x-forwarded-for") || request.ip || "8.8.8.8";
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();

    if (geoData?.country_code) {
      if (geoData.country_code === "US") geoCurrency = "USD";
      else if (euroCountries.includes(geoData.country_code)) geoCurrency = "EUR";
    }
  } catch (err) {
    console.error("ipapi.co fetch failed:", err);
  }

  // pick first available variant for that currency
  const firstCode = Object.keys(currencyMapper[geoCurrency].variants)[0];
  const res = NextResponse.next();
  res.cookies.set("currency", geoCurrency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.cookies.set("encryptedCode", firstCode, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/Dashboard",
    "/certification",
    "/certification/:path*",
    "/download/:path*",
    "/download",
    "/30-days-of-python",
    "/30-days-of-python/:path*",
    "/30-days-of-javascript",
    "/30-days-of-javascript/:path*",
    "/checkout",
    "/order-summary",
  ],
};
