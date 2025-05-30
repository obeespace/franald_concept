'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from './CartContext';
import homeImg from '../../public/homemenu.png';
import { Toaster, toast } from 'sonner';

const ShopMenu = ({ id, name, price, description }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const newItem = { name, price, description };
    addToCart(newItem); // Update cart state
    toast.success(`${name} added to cart`, { duration: 2000 }); // Trigger toast directly
  };

  return (
    <div className="lg:w-full flex-shrink-0" key={id}>
      <Toaster position="top-right" richColors />
      <div className="flex flex-col items-center -mb-20">
        <Image
          src={homeImg}
          alt="picture of grilled chicken"
          className="mb-3"
        />
      </div>
      <div className="border shadow-gray-400 shadow-sm pt-16 pb-4 rounded-xl px-3">
        <p>{name}</p>
        <p className="italic text-slate-700">{description}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-red-800 gap-10 font-semibold text-lg">₦{price}</p>
          <p
            onClick={handleAddToCart}
            className="cursor-pointer text-green-700 lg:hover:underline"
          >
            Cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;