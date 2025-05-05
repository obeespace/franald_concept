"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        phone,
        password
      });
  
      toast.success("Sign-up successful, redirecting...");
      router.push("/auth/signin");
  
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };
  

  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.9 }}
      className="my-20 lg:w-5/12 w-5/6 mx-auto"
    >
      <Toaster position="top-right" richColors />
      <p className="text-2xl text-center font-bold">
        Sign <span className="italic text-red-600">Up</span>
      </p>
      <div className="mt-10 text-black">
        <div className="flex gap-5">
          <input
            className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="text"
            id="name"
            placeholder="Full Name"
            name="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="number"
            id="phone"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="-mt-2 flex text-white justify-end">
          <Link href="/signin">
            <p className="hover:underline text-sm">
              Already have an account? Sign in
            </p>
          </Link>
        </div>

        <div className="flex justify-end text-sm -mt-4">
          <Link href="/auth/signin">
            <p className="hover:underline">Got an account?..Sign in</p>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit} // Initialize Paystack payment
            className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800"
          >
            Sign Up
          </button>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
}
