import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Get request body

    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
