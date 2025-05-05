"use client";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { CartContext } from "../components/CartContext";
import cartpic from "../../public/cartpic.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Page = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    total,
  } = useContext(CartContext);

  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = () => {
    if (coupon) {
      setLoading(true);
      applyCoupon(coupon);
      setCoupon("");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto w-5/6 my-10">
        <h1 className="text-2xl font-bold">Cart</h1>
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
        <Skeleton height={50} className="my-3" />
      </div>
    );
  }

  return (
    <main className="w-5/6 mx-auto mt-10 mb-40">
      {cart.length > 0 && (
        <p className="text-2xl font-semibold mb-5">
          Cart <span className="text-red-700">Items</span>
        </p>
      )}

      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div
            key={item.name} // Optimized key to use item name (ensure it is unique)
            className="border p-4 mb-4 flex justify-between items-center rounded-lg shadow-md"
          >
            <div>
              <p className="text-xl">{item.name}</p>
              <p className="text-gray-500">Price: ₦{item.price}</p>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => decreaseQuantity(item.name)}
                className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.name)}
                className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div>
              <p className="text-lg">
                Total: ₦{Number(item.price) * Number(item.quantity)}
              </p>
              <button
                onClick={() => removeFromCart(item.name)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="py-40">
          <div className="flex justify-center items-center">
            <Image src={cartpic} alt="cart" className="lg:w-1/6 w-2/6" />
            <p className="text-3xl">Cart is empty</p>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Total: ₦{total.toFixed(2)}</h2>
          <Link href="/checkout">
            <button className="bg-orange-600 rounded-md px-4 py-2 mt-3 text-white hover:bg-orange-800 ml-3">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Page;
