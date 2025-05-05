import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value || req.headers.get("x-admin-token");

  if (!token) {
    const redirectUrl = new URL("/auth/signin", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the user is trying to access the admin page
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!adminToken || decoded.email !== "obeewon20@gmail.com" || decoded.password !== "foodway") {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect to home screen
      }
    }

    return NextResponse.next();
  } catch (error) {
    const redirectUrl = new URL("/auth/signin", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

// Protect dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect all dashboard and admin pages
};
