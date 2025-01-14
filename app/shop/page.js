import Image from "next/image";
import React from "react";
import homeImg from "../../public/fried-meat-table.png";
import shopbanner from "../../public/shopbanner2.jpg";
import ShopMenu from "../components/ShopMenu";

const menu = [
  {
    id: 1,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  },
  {
    id: 2,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  },
  {
    id: 3,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  },
  {
    id: 4,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  },
  {
    id: 5,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  },
];

const page = () => {
  return (
    <main className="mt-10 w-5/6 mx-auto">
      <section className="">
        <div>
          <Image
            src={shopbanner}
            alt="shop banner"
            className="lg:h-56 h-40 object-cover rounded-2xl"
          />
        </div>
      </section>

      <section className="mt-20">
        <div>
          <p className="text-3xl font-semibold">
            Hot <span className="text-red-700">Menu</span>
          </p>
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:flex lg:gap-10">
            {menu.map((data) => {
              return <ShopMenu key={data.id} {...data} />;
            })}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div>
          <p className="text-3xl font-semibold">
            Side <span className="text-red-700">Pieces</span>
          </p>
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:flex lg:gap-10">
            {menu.slice(0, 3).map((data) => {
              return <ShopMenu key={data.id} {...data} />;
            })}
          </div>
        </div>
      </section>

      <section className="my-20">
      <div>
          <p className="text-3xl font-semibold">
            Other <span className="text-green-700">Farm</span> Products
          </p>
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:flex lg:gap-10">
            {menu.slice(0, 4).map((data) => {
              return <ShopMenu key={data.id} {...data} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
