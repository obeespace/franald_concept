import React from "react";
import { IoMdArrowDropright } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-green-600 py-28 text-white ">
      <div className="w-5/6 mx-auto flex flex-col items-center">
        <p className="text-4xl font-semibold w-3/6 text-center">
          Enjoy all Our amazing <span className="text-orange-300">Menus</span>{" "}
          and farm produce
        </p>
        <button className="bg-black rounded-2xl px-6 py-2 mt-5 text-white flex items-center gap-2 hover:bg-slate-950 w-fit">
              Order Now <IoMdArrowDropright />
            </button>
      </div>
    </div>
  );
};

export default Footer;
