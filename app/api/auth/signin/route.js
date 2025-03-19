import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Store in environment variables

export async function POST(request) {
  try {
    await dbConnect();
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  let email, password;
  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "No user found with this email" }, { status: 400 });
  }

  if (!user.password) {
    return NextResponse.json({ error: "User password is missing" }, { status: 500 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  // ✅ Generate JWT Token (valid for 7 days)
  
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  // Set token as a cookie
  setCookie("token", token, { req: request, maxAge: 60 * 60 * 24 * 7 });

  return NextResponse.json({ message: "Sign-in successful", token }, { status: 200 });
}