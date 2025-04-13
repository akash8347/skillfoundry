import { NextResponse } from "next/server";

export async function GET(request) {
  const logoutResponse = NextResponse.redirect(new URL("/login", request.url)); // ✅ absolute URL

  logoutResponse.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    expires: new Date(0), // force expire
  });

  return logoutResponse;
}
