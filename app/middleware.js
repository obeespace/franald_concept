// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }

//   try {
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }
// }

// // Protect dashboard routes
// export const config = {
//   matcher: ["/dashboard/:path*"], // Protect all dashboard pages
// };
