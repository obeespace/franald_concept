"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [nickname, setNickName] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.9 }}
      className="my-20 lg:w-5/12 w-5/6 mx-auto"
    >
      {/* <Toaster position="top-right" richColors /> */}
      <p className="text-2xl font-bold">
        Delivery <span className="text-red-600">Info</span>
      </p>
      <div className="mt-10 text-black">
        <div className="flex gap-5">
          <input
            className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="text"
            id="fullname"
            placeholder="Full Name"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            className="border-b border-red-600 shadow-sm px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
            type="text"
            id="lastname"
            placeholder="Nick Name"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </div>

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="email"
          id="email"
          placeholder="Email"
          name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          required
        />
        

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="number"
          id="phone"
          placeholder="Phone Number"
          name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          className="border-b border-red-600 px-3 py-1 w-full mb-5 rounded-md placeholder:text-gray-400 outline-none"
          type="text"
          id="address"
          placeholder="Address"
          name="password"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          required
        />
        
        <div className="flex justify-center">
          
        <Link href='/checkout'><button className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800">
              Make Payment
            </button></Link>
          
        </div>
        {/* <ToastContainer /> */}
      </div>
    </div>
  )
}

export default page