import Image from "next/image";
import React from "react";
import CartInfo from "../components/CartInfo";
import menu from "../components/fakefooddata"
import Link from "next/link";

const page = () => {
  return (
    <main className="w-5/6 mx-auto mt-10 mb-40">
      <p className="text-2xl font-medium mb-5">Cart Items</p>
      
      {/* <div className="py-48">
        <div className="flex justify-center items-center">
          <Image src={cart} alt="cart" className="lg:w-1/6 w-2/6" />
          <p className="text-3xl">Cart is Empty</p>
        </div>
      </div> */}
      {menu.slice(0, 3).map((data) => {
              return <CartInfo key={data.id} {...data} />;
            })}
      <Link href='/checkout'><button className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800">
              Proceed to Checkout
            </button></Link>
    </main>
  );
};

export default page;
