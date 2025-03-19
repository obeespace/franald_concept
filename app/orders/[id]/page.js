// app/orders/[id]/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const OrderPage = () => {
  const { id } = useParams(); // Get order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="my-20 lg:w-5/12 w-5/6 mx-auto">
      <h1 className="text-2xl font-bold">Order Status</h1>
      <div className="mt-10">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer Name:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Total Amount:</strong> ₦{order.totalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      {/* Admin Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Update Order Status</h2>
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => updateStatus('Processing')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Processing
          </button>
          <button
            onClick={() => updateStatus('In-Transit')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md"
          >
            In-Transit
          </button>
          <button
            onClick={() => updateStatus('Delivered')}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Delivered
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;