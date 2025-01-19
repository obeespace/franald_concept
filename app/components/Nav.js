"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Toaster, toast } from 'sonner'



const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const pathname = usePathname();
//   const [token, setToken] = useState(null);
//   const inactivityTimeLimit = 30 * 60 * 1000; // 30 minutes in milliseconds
//   let logoutTimer;

  // Function to log out the user
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     toast.info("You have been logged out due to inactivity.");
//   };

//   // Function to reset the inactivity timer
//   const resetTimer = () => {
//     clearTimeout(logoutTimer);
//     logoutTimer = setTimeout(handleLogout, inactivityTimeLimit);
//   };

//   // Function to update the token from localStorage
//   const updateToken = () => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);
//   };

//   useEffect(() => {
//     // Initial load
//     updateToken();

//     // Start inactivity timer
//     resetTimer();

//     // Polling localStorage to detect token changes
//     const interval = setInterval(() => {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken !== token) {
//         setToken(storedToken);
//       }
//     }, 500); // Check every 500ms

//     // Set up activity listeners to reset timer
//     const events = ["mousemove", "keydown", "click", "scroll"];
//     events.forEach((event) => window.addEventListener(event, resetTimer));

//     return () => {
//       clearInterval(interval);
//       clearTimeout(logoutTimer);
//       events.forEach((event) => window.removeEventListener(event, resetTimer));
//     };
//   }, [token]);

  return (
    <div className="w-5/6 mx-auto py-5">
      <Toaster position="top-right" richColors />
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="font-bold text-xl">Franald Foods</h1>
          </Link>
        </div>
        <div className="flex gap-10 items-center">
          <Link href="/shop">
            <p
              className={
                pathname === "/shop"
                  ? "border-b-2 border-red-600 px-1 py-1"
                  : "text-black"
              }
            >
              Shop
            </p>
          </Link>
          <Link href="/blog">
            <p
              className={
                pathname === "/blog"
                  ? "border-b-2 border-red-600 px-1 py-1"
                  : "text-black"
              }
            >
              Blog
            </p>
          </Link>
          
        </div>
        <Link href="cart">
        <MdOutlineShoppingCart className="text-2xl" />
          </Link>
        {/* {token === null ? (
          <Link href="signin">
            <motion.p
              whileTap={{ scale: 0.7 }}
              className="px-5 py-2 bg-white flex font-semibold items-center gap-1 text-black rounded-xl cursor-pointer"
            >
              Log In <IoMdArrowDropright className="text-red-600" />
            </motion.p>
          </Link>
        ) : (
          <Link href="user">
            <motion.p
              whileTap={{ scale: 0.7 }}
              className="px-5 py-2 bg-white flex font-semibold items-center gap-1 text-black rounded-xl cursor-pointer"
            >
              Dash Board <IoMdArrowDropright className="text-red-600" />
            </motion.p>
          </Link>
        )} */}
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="font-bold text-xl">Franald Foods</h1>
          </Link>
        </div>

        <div className="flex gap-3">
        <Link href="cart"><MdOutlineShoppingCart className="text-xl" /></Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            {toggleMenu ? (
              <motion.p whileTap={{ scale: 0.7 }}>
                <IoMdClose
                  className="text-3xl text-black cursor-pointer"
                  onClick={() => setToggleMenu((prev) => !prev)}
                />
              </motion.p>
            ) : (
              <motion.p whileTap={{ scale: 0.7 }}>
                <HiMenuAlt4
                  className="text-xl cursor-pointer text-black"
                  onClick={() => setToggleMenu((prev) => !prev)}
                />
              </motion.p>
            )}
          </div>
        </div>
        </div>
        {toggleMenu && (
          <div className="bg-gray-100 z-50 text-gray-900 h-max w-40 absolute top-20 right-8 py-4 rounded-xl shadow-md">
            <div className="flex flex-col gap-3 items-center w-5/6 mx-auto text-lg font-semibold ">
              <Link
                href="/shop"
                className="hover:bg-gray-700 w-full hover:text-white text-center rounded-md"
              >
                <p
                  className=" hover:border-green-700 px-3 py-2"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  Shop
                </p>
              </Link>

              <Link
                href="/blog"
                className="hover:bg-gray-700 w-full hover:text-white text-center rounded-md"
              >
                <p
                  className=" hover:border-green-700 px-3 py-2"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  Blog
                </p>
              </Link>
              <Link
                href="/contact"
                className="hover:bg-gray-700 w-full hover:text-white text-center rounded-md"
              >
                <p
                  className="px-3 py-2"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  Contact
                </p>
              </Link>
              {/* {!token ? (
                <Link
                  href="/signin"
                  className="hover:bg-gray-700 hover:text-white w-full text-center rounded-md"
                >
                  <p
                    className="px-3 py-2"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    Sign in
                  </p>
                </Link>
              ) : (
                <Link
                  href="/user"
                  className="hover:bg-gray-700 hover:text-white w-full text-center rounded-md"
                >
                  <p
                    className="px-3 py-2"
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    Dash Board
                  </p>
                </Link>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
