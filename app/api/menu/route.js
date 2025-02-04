import { NextResponse } from "next/server";
import dbConnect from "../../util/dbConnect";
import Menu from "../../models/menu";

// GET - Fetch all menu items
export async function GET() {
  await dbConnect();
  const menus = await Menu.find({});
  return NextResponse.json(menus);
}

// POST - Add a new menu item
export async function POST(req) {
  await dbConnect();
  const { name, description, price, image } = await req.json();
  const newMenu = new Menu({ name, description, price, image });
  await newMenu.save();
  return NextResponse.json({ message: "Menu added successfully", newMenu });
}

// DELETE - Remove a menu item
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();
  await Menu.findByIdAndDelete(id);
  return NextResponse.json({ message: "Menu deleted successfully" });
}

// PUT - Update a menu item
export async function PUT(req) {
  await dbConnect();
  const { id, name, description, price, image } = await req.json();
  const updatedMenu = await Menu.findByIdAndUpdate(
    id,
    { name, description, price, image },
    { new: true }
  );
  return NextResponse.json({ message: "Menu updated successfully", updatedMenu });
}
