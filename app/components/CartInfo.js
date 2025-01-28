import React from "react";
import cart from "../../public/rb_26078.png";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";

const CartInfo = ({id, name, description, price, deleteItem}) => {
  
  return (
      <div className="my-5">
        <div className="px-3 py-2 border border-gray-100 rounded-2xl">
          <div className="lg:flex">
            <div className="flex gap-2 items-center lg:w-3/6">
              <Image src={cart} alt="item" className="lg:w-1/12 w-3/12" />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm italic text-gray-700">
                {description}
                </p>
                <p className="font-bold text-red-700">{price}</p>
              </div>
            </div>

            <div className="flex gap-5 lg:gap-0 items-center lg:w-3/6 lg:justify-between justify-end text-xl">
              <p className="flex justify-end">- 3 +</p>
              <div onClick={() => deleteItem(id)} className="flex justify-end"><MdDeleteOutline className="" /></div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
  
  );
};

export default CartInfo;
