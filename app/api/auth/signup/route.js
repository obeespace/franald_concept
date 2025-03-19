import { NextResponse } from 'next/server';
import User from '../../../models/User';
import dbConnect from '../../../util/dbConnect';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await dbConnect();

  const { name, email, phone, password } = await request.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  await user.save();

  return NextResponse.json(
    { message: 'User created successfully' },
    { status: 201 }
  );
}