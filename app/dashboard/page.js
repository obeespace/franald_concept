"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/user");
        setUser(response.data);
        console.log(response);
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
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Personal Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          router.push("/auth/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
}
