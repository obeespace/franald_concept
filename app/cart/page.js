"use client"
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../components/CartContext";
import CartInfo from "../components/CartInfo";
import cartpic from "../../public/cartpic.png";

const page = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  return (
    <main className="w-5/6 mx-auto mt-10 mb-40">
    {cart.length > 0 && <p className="text-2xl font-semibold mb-5">Cart <span className="text-red-700">Items</span></p>}
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <CartInfo key={index} {...item} deleteItem={removeFromCart}/>
        ))
      ) : (
        <div className="py-40">
          <div className="flex justify-center items-center">
            <Image src={cartpic} alt="cart" className="lg:w-1/6 w-2/6" />
            <p className="text-3xl">Cart is Empty</p>
          </div>
        </div>
      )}

      {cart.length > 0 && <Link href="/checkout">
        <button className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800">
          Proceed to Checkout
        </button>
      </Link>}
    </main>
  );
};

export default page;
