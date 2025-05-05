// app/orders/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders?id=${id}`);

      if (response.status === 200) {
        setOrder(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
        setOrder(null);
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Replaced loading state with skeleton loading for better user experience
  if (loading) {
    return (
      <div className="container mx-auto w-5/6 my-10">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>Order ID is missing in the URL. Please check the link or contact support.</p>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ₦{order.totalAmount}</p>

      <h2 className="text-xl font-bold mt-5">Items</h2>
      <ul>
        {order.items.map((item, index) => (
          <li key={index} className="border p-3">
            {item.name} - ₦{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsPage;