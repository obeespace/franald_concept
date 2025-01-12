import Image from "next/image";
import React from "react";
import homeImg from "../../public/homemenu.png";

const HomeMenu = ({ name, price, description }) => {
  return (
    <div className="w-7/12 lg:w-2/12 flex-shrink-0 ">
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
        <p className="text-red-800 gap-10 font-semibold text-lg">{price}</p>
        <p>Cart</p>
      </div>
      </div>
      
    </div>
  );
};

export default HomeMenu;
