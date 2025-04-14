"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';
import axios from "axios";

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
        setOrders(response.data.orders)
        console.log(response);
        console.log(response.data.orders)
      } catch (error) {
        toast.error("Authentication failed")
        console.log("Authentication failed, redirecting...");
        router.push("/auth/signin");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">My Orders</h1>

      
        {orders ? (<div className="overflow-x-auto">
          <table className="min-w-full bg-white border shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Items</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="py-2 px-4 border">{order._id.slice(-6)}</td>
                  <td className="py-2 px-4 border">
                    {order.items.map((item) => (
                      <p key={item.name}>
                        {item.name} x{item.quantity}
                      </p>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">${order.totalAmount}</td>
                  <td className="py-2 px-4 border">
                    <span
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : (<p>No order found!</p>)}
      
    </div>
    
  );
}
