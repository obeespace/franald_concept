import { NextResponse } from 'next/server';
import dbConnect from '../../util/dbConnect';
import Order from '../../models/Order';

export async function GET(request) {
  await dbConnect();
  
  // Extract user email from query params or authorization headers
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email'); 

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
