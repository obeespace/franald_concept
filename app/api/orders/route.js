import { NextResponse } from 'next/server';
import dbConnect from '../../util/dbConnect';
import Order from '../../models/Order';

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const query = email ? { email } : {}; // Fetch all orders if no email is provided
    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// PATCH - Update order status
export async function PATCH(req) {
  await dbConnect();
  const { id, status } = await req.json();

  if (!['Processing', 'In-Transit', 'Delivered'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order status updated successfully', updatedOrder });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
