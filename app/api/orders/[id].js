import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import dbConnect from '@/utils/dbConnect';

export async function PUT(request, { params }) {
  await dbConnect(); // Connect to the database

  const { id } = params; // Extract the order ID from the URL

  try {
    const { status } = await request.json(); // Parse the request body

    // Validate input
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    // Update the order status
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request, { params }) {
  await dbConnect(); // Connect to the database

  const { id } = params; // Extract the order ID from the URL

  try {
    // Fetch the order by ID
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}