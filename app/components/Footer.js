import React from "react";
import { LuInstagram } from "react-icons/lu";
import { IoLogoTiktok } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import banner from "../../public/banner.jpg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative text-white py-14 px-6 mt-12 overflow-hidden">
      {/* Blurred banner background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={banner}
          alt="Footer Background"
          fill
          style={{ objectFit: 'cover' }}
          className="blur-sm brightness-75"
          priority
        />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-lg mb-1">Franald Concept</p>
          <p className="text-sm text-gray-200">Fresh, local, and delicious meals delivered to your door.</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold mb-2">Quick Links</span>
          <Link href="/" className="hover:text-orange-300 flex items-center"><IoMdArrowDropright className="mr-1" />Home</Link>
          <Link href="/shop" className="hover:text-orange-300 flex items-center"><IoMdArrowDropright className="mr-1" />Shop</Link>
          <Link href="/cart" className="hover:text-orange-300 flex items-center"><IoMdArrowDropright className="mr-1" />Cart</Link>
          <Link href="/events" className="hover:text-orange-300 flex items-center"><IoMdArrowDropright className="mr-1" />Events</Link>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <span className="font-semibold mb-2">Follow Us</span>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-2xl"><LuInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-black text-2xl"><IoLogoTiktok /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-orange-300 mt-8 pt-4 text-center text-sm text-gray-200 relative z-10">
        &copy; {new Date().getFullYear()} Franald Concept. All rights reserved.
      </div>
    </footer>)}
export default Footer;
