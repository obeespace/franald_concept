import dbConnect from "../../util/dbConnect";
import { NextResponse } from 'next/server';
import Order from '../../models/Order';


export async function POST(request) {
  await dbConnect(); // Connect to the database

  try {
    const { customerName, email, address, phone, items, totalAmount, status } = await request.json();

    // Validate input
    if (!customerName || !email || !address || !phone || !items || !totalAmount || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new order
    const order = new Order({
      customerName,
      email,
      address,
      phone,
      items,
      totalAmount,
      status,
    });

    // Save the order to the database
    await order.save();

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  await dbConnect(); // Connect to the database

  try {
    // Fetch all orders from the database
    const orders = await Order.find({});

    return NextResponse.json(
      { success: true, data: orders },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}