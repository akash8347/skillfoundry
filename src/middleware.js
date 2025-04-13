
import { NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/verifyTokenEdge"; 

export async function middleware(request) {
  
  const token = request.cookies.get("authToken")?.value;

  const pathname = request.nextUrl.pathname;
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const isProtected = pathname.startsWith("/Dashboard") || pathname.startsWith("/certification")

  if (isProtected) {
    const verified = token ? await verifyTokenEdge(token) : null;

    if (!verified) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*", "/Dashboard","/certification","/certification/:path*"],
};
