"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';
import axios from "axios";
import { format } from "date-fns";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/user");
        setUser(response.data);
      } catch (error) {
        toast.error("Authentication failed, please log in again.");
        router.push("/auth/signin");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userResponse = await axios.get("/api/auth/user"); // Fetch logged-in user details
        const userEmail = userResponse.data.email;

        const response = await axios.get(`/api/orders?email=${userEmail}`); // Pass email to fetch orders
        if (response.status === 200) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders:", response.status);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  // Replaced loading state with skeleton loading for better user experience
  if (loading) {
    return (
      <div className="container mx-auto w-5/6 my-10">
        <h1 className="text-2xl font-bold">My <span className="text-red-700">Dashboard</span></h1>
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
      </div>
    );
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = format(new Date(order.createdAt), "MMMM d, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="w-5/6 mx-auto my-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">My <span className="text-red-600">Orders</span></h1>

      {orders ? (
        <div className="space-y-4">
          {Object.keys(groupedOrders).map((date) => (
            <div key={date} className="mb-6 ">
              <h2 className="text-lg font-bold mb-2">{date}</h2>
              {groupedOrders[date].map((order) => (
                <div key={order._id} className="lg:flex justify-between mb-4 items-center border border-gray-300 p-4 rounded-md shadow-sm">
                  <div>
                    <p className="font-semibold">Order ID: {order._id.slice(-6)}</p>
                    <div className="mt-2">
                      <p className="font-semibold">Items:</p>
                      {order.items.map((item) => (
                        <p key={item.name} className="text-sm">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 font-semibold">Total: ₦{order.totalAmount}</p>
                  <p className="mt-3 font-semibold">
                    Status: <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        order.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "In-Transit"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No order found!</p>
      )}
    </div>
  );
}
