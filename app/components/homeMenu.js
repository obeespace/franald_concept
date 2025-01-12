import Image from "next/image";
import React from "react";
import homeImg from "../../public/homemenu.png";

const HomeMenu = ({name, price, description}) => {
  return (
    <div className="w-5/12 flex-shrink-0 border shadow-green-400 py-5">
      <div className="flex flex-col items-center">
        <Image src={homeImg} alt="picture of grilled chicken" className="mb-3" />
        <p>{name}</p>
        <p className="italic text-slate-700">{description}</p>
        <div className="flex justify-between">
            <p className="text-red-800 gap-10">{price}</p>
            <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
