import React from "react";
import events from "../../public/events.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="py-40">
      <div className="flex justify-center items-center">
        <Image src={events} alt="cart" className="lg:w-2/6 w-3/6" />
      </div>
    </div>
  );
};

export default page;
