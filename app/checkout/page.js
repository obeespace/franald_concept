"use client";
import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext'; // Adjust the import path as needed
import PaystackPop from '@paystack/inline-js'; // Import Paystack inline JS

const Page = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nickname, setNickName] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Access the total from CartContext
  const { total, clearCart } = useContext(CartContext);

  // Initialize Paystack payment
  const initializePayment = () => {
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_f9e5f001c6e0fd5e327d9f59585c1dcd8e410f8a", // Replace with your Paystack public key
      email: email, // Customer's email
      amount: total * 100, // Amount in kobo (e.g., 10000 = ₦100.00)
      ref: new Date().getTime().toString(), // Unique reference for each transaction
      onSuccess: (transaction) => {
        console.log("Payment Successful!", transaction);
        alert("Payment Successful! Thank you for your purchase.");
        clearCart(); // Clear the cart after successful payment
        // Redirect to a success page or home page
        window.location.href = "/success"; // Replace with your success page route
      },
      onCancel: () => {
        console.log("Payment Cancelled");
        alert("Payment was not completed. Please try again.");
      },
    });
  };

  return (
    <div className="my-20 lg:w-5/12 w-5/6 mx-auto">
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