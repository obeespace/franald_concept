'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import axios from "axios";
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Kindly fill up all fields");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signin", { email, password });

      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/`; // Store in cookie
        toast.success("Sign-in successful, you are being redirected...");
        router.push("/shop");
      } else {
        toast.error("Login failed");
      }
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
    className="my-32 lg:w-4/12 w-5/6 mx-auto">
      <Toaster position="top-right" richColors />
      <p className="text-2xl text-center font-bold">Sign <span className='italic text-red-600'>In</span></p>
      <div className="mt-10">
        <input
          className="border-b border-orange-600 text-black px-3 py-1 w-full mb-5 rounded-md"
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border-b border-orange-600 text-black px-3 py-1 w-full mb-5 rounded-md"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className='flex justify-between text-sm -mt-2'>
        <Link href='/forgetpassword'><p>Forget Password?</p></Link>
        <Link href='/auth/signup'><p className='hover:underline'>New?..Sign up</p></Link>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogin} // Initialize Paystack payment
            className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800"
          >
            Sign in
          </button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}