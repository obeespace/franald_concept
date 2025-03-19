import { NextResponse } from 'next/server';
import Product from '../../models/Product';
import dbConnect from '../../util/dbConnect';

export async function POST(request) {
  await dbConnect(); // Connect to the database

  try {
    const { name, price, description } = await request.json();

    // Validate input
    if (!name || !price || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new product
    const product = new Product({
      name,
      price,
      description,
    });

    // Save the product to the database
    await product.save();

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  await dbConnect(); // Connect to the database

  try {
    // Fetch all products from the database
    const products = await Product.find({});

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}