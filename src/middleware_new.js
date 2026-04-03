/**
 * Next.js Middleware
 * Handles authentication, request tracking, currency detection, and security headers
 */

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currencyMapper, codeToCurrency } from "@/lib/currencyMapper";

/**
 * Euro zone countries
 */
const EURO_COUNTRIES = [
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
];

/**
 * Detect currency based on country code
 */
function detectCurrency(countryCode) {
  const currencyMap = {
    IN: "INR",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    NZ: "NZD",
  };

  if (currencyMap[countryCode]) {
    return currencyMap[countryCode];
  }

  // Check if Euro country
  if (EURO_COUNTRIES.includes(countryCode)) {
    return "EUR";
  }

  return "USD"; // Default fallback
}

/**
 * Detect user's country and currency from IP
 */
async function detectCountryFromIP(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) throw new Error("IP geolocation failed");

    const data = await response.json();
    return {
      country: data.country_code,
      currency: detectCurrency(data.country_code),
      city: data.city,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("IP geolocation error:", error.message);
    return {
      country: "US",
      currency: "USD",
      city: "Unknown",
      timezone: "UTC",
    };
  }
}

/**
 * Apply security headers
 */
function addSecurityHeaders(response) {
  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  return response;
}

/**
 * Main middleware function
 */
export async function middleware(request) {
  const { nextUrl, cookies, ip } = request;
  const pathname = nextUrl.pathname;
  const requestId = uuidv4();

  // Initialize response
  let response = NextResponse.next();

  // Add request ID for tracking
  response.headers.set("x-request-id", requestId);

  // Add security headers
  response = addSecurityHeaders(response);

  // Skip middleware for static assets and API internal routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname.includes(".") // files with extensions
  ) {
    return response;
  }

  // 🔹 1. AUTHENTICATION CHECK (commented out - enable as needed)
  const token = cookies.get("authToken")?.value;
  // const isProtected = pathname.startsWith("/dashboard") || 
  //                     pathname.startsWith("/certification") ||
  //                     pathname.startsWith("/download");
  //
  // if (isProtected && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // 🔹 2. CURRENCY HANDLING
  let currencyCode = nextUrl.searchParams.get("c");

  // Case 1: Currency code provided in URL
  if (currencyCode && codeToCurrency[currencyCode]) {
    const currencyData = codeToCurrency[currencyCode];
    response.cookies.set("currency", currencyData.currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("encryptedCode", currencyData.code, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return response;
  }

  // Case 2: Check existing currency cookies
  const existingCurrency = cookies.get("currency")?.value;
  const existingCode = cookies.get("encryptedCode")?.value;
  if (
    existingCurrency &&
    existingCode &&
    currencyMapper[existingCurrency]?.variants[existingCode]
  ) {
    return response; // Cookies are valid
  }

  // Case 3: Auto-detect from IP geolocation
  const userIP = ip || request.headers.get("x-forwarded-for") || "8.8.8.8";
  const geoData = await detectCountryFromIP(userIP);
  
  const currency = currencyMapper[geoData.currency];
  if (currency) {
    const firstVariantCode = Object.keys(currency.variants)[0];
    response.cookies.set("currency", geoData.currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("encryptedCode", firstVariantCode, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
}

/**
 * Configure which routes should run middleware
 */
export const config = {
  matcher: [
    // Run on all routes except these
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
