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
import Link from "next/link";


const Footer = () => {
  return (
    <div className="text-white w-full h-80 lg:h-96 relative">
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
        <Link href="/shop"><button className="bg-black rounded-2xl px-6 py-2 mt-10 text-white flex items-center gap-2 hover:bg-slate-950 w-fit">
          Order Now <IoMdArrowDropright />
        </button></Link>
      </div>

      
    </div>
  );
};

export default Footer;