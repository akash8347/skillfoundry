// middleware.js (root level, not in src/)
import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/verifyTokenEdge";

// 🔹 Single source of truth
import { currencyMapper, codeToCurrency } from "@/lib/currencyMapper";

export async function middleware(request) {
  const { nextUrl, geo, cookies } = request;
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

  // (a) If param present → map to currency & save cookies
  if (currencyCode && codeToCurrency[currencyCode]) {
    const currency = codeToCurrency[currencyCode];
    const res = NextResponse.next();
    res.cookies.set("currency", currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookies.set("encryptedCode", currencyMapper[currency].code, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  // (b) Else → check cookie
  const existingCurrency = cookies.get("currency")?.value;
  if (existingCurrency && currencyMapper[existingCurrency]) {
    return NextResponse.next();
  }

  // (c) Else → fallback geo
  let geoCurrency = "INR"; // default
  if (geo?.country === "US") geoCurrency = "USD";
  else if (["FR", "DE", "ES"].includes(geo?.country)) geoCurrency = "EUR";

  const res = NextResponse.next();
  res.cookies.set("currency", geoCurrency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.cookies.set("encryptedCode", currencyMapper[geoCurrency].code, {
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
