"use client";
import React, { useState, useContext, useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import { CartContext } from '../components/CartContext'; // Adjust the import path as needed


const Page = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nickname, setNickName] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Access the total from CartContext
  const {cart, total, clearCart } = useContext(CartContext);

  // Fetch the logged-in user's email
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const userData = await response.json();
        if (response.ok && userData.email) {
          setEmail(userData.email); // Set the email to the logged-in user's email
        } else {
          console.error('Failed to fetch user email');
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!email || !address || !nickname || !fullname || !phone) {
      toast.error("Please fill in all required fields.");
      return; 
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_KEY) {
      toast.error("Paystack public key is not set. Please contact support.");
      return;
    }

    const PaystackPop = (await import('@paystack/inline-js')).default;
    const paystack = new PaystackPop(); 

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY, // Use NEXT_PUBLIC prefix for client-side environment variables
      email: email.trim(), // Ensure email is trimmed
      amount: Math.round(total * 100), // Ensure amount is in kobo and rounded
      ref: `ref_${new Date().getTime()}`, // Unique reference for each transaction
      onSuccess: async (transaction) => {
        console.log("Payment Successful!", transaction);

        // Save order to the database
        const orderData = {
          customerName: fullname.trim(),
          email: email.trim(),
          address: address.trim(),
          phone: phone.trim(),
          items: cart.map((item) => ({
            name: item.name,
            price: item.price, 
            quantity: item.quantity,
          })),
          totalAmount: total,
          status: 'Processing', // Initial status
        };

        console.log("Order Data:", orderData);

        try {
          const response = await fetch('/api/clientorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });

          if (response.ok) {
            toast.success("Payment Successful! Your order has been placed.");
            clearCart(); // Clear the cart after successful payment
            window.location.href = "/dashboard"; // Redirect to the dashboard
          } else {
            toast.error("Failed to save order. Please contact support.");
          }
        } catch (error) {
          console.error("Error saving order:", error);
          toast.error("An error occurred. Please try again.");
        }
      },
      onCancel: () => {
        console.log("Payment Cancelled");
        toast.error("Payment was not completed. Please try again.");
      },
    });
  };

  return (
    <div className="my-20 lg:w-5/12 w-5/6 mx-auto">
            <Toaster position="top-right" richColors />

      <p className="text-2xl font-bold">
        Delivery <span className="text-red-600">Info</span>
      </p>
      <div className="mt-10 text-black">
        <div className="flex gap-5">
          <input
            className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="text"
            id="fullname"
            placeholder="Full Name"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            className="border-b border-red-600 shadow-sm px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="text"
            id="lastname"
            placeholder="Nick Name"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
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
          readOnly // Make the email field ineditable
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

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="text"
          id="address"
          placeholder="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {/* Display the total amount */}
        <div className="mt-5 text-xl font-semibold">
          Total Amount: <span className='text-red-700'>₦{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={initializePayment} // Initialize Paystack payment
            className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;