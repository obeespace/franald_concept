import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;
  console.log(token, JWT_SECRET);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
