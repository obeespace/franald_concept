import React from "react";
import {
  BsDribbble,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import banner from "../../public/banner.jpg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="text-white w-full h-80 lg:h-96 relative fixed bottom-0 left-0">
      <Image
        src={banner}
        alt="footer banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <p className="text-3xl font-medium lg:w-2/6 w-3/6">
          Enjoy all Our amazing <span className="text-red-800 font-bold">menus</span>{" "}
          and <span className="text-green-800 font-bold">farm</span> produce
        </p>
        <button className="bg-black rounded-2xl px-6 py-2 mt-10 text-white flex items-center gap-2 hover:bg-slate-950 w-fit">
          Order Now <IoMdArrowDropright />
        </button>
      </div>

      <div className="w-4/6 mx-auto lg:-mt-14 -mt-8 flex justify-between items-center">
        <p>Franald Foods</p>
        <p className="hidden lg:block">2025 ObeeSpace | All rights reserved</p>
        <div className="flex gap-8 text-orange-700">
          <BsDribbble />
          <BsLinkedin />
          <BsFacebook />
          <BsInstagram />
        </div>
      </div>
    </div>
  );
};

export default Footer;