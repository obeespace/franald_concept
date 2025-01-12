import Image from "next/image";
import homeImg from "../public/fried-meat-table.png";
import { MdOutlineDirectionsBike } from "react-icons/md";
import HomeMenu from "./components/homeMenu";

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
  {
    id: 6,
    name: "Chicken Sharwama",
    price: "N3500",
    description: "Very short description",
    image: homeImg,
  }
]

export default function Home() {
  return (
    <main className="w-5/6 mx-auto">
      <section className="lg:mt-20 mt-10">
        <div className="lg:flex justify-between gap-20 ">
          <div className="lg:w-5/12">
            <p className="flex items-center gap-2 bg-yellow-100 w-max text-black rounded-md px-2 py-1">
              Bike Delivery
              <span className="rounded-full bg-white shadow-xl w-6 h-6 flex items-center justify-center">
                {" "}
                <MdOutlineDirectionsBike className="drop-shadow-xl" />
              </span>
            </p>
            <p className="text-5xl font-black ">
              Your <span className="text-red-800">tight</span> schedule should
              not stop a <span className="text-green-700">Good</span> meal
            </p>
            <p className="mt-5 italic text-gray-700">
              Food is the great connector, and laughs are the cement. If we go
              out to eat and have a nice meal, that's one thing. If we can share
              a laugh, now we're friends.
            </p>
            <button className="bg-green-800 rounded-md px-4 py-2 mt-5 text-white hover:bg-green-600">
              Re-up Now
            </button>
          </div>
          <Image
            src={homeImg}
            alt="vegetables"
            className="text-center mt-14 lg:mt-0 lg:w-4/12 w-4/6 lg:h-full -rotate-12"
          />
          <div className="lg:flex hidden lg:flex-col gap-20 text-center">
            <p>
              More <span className="text-green-700 font-bold">Vegetables</span>,
              healthier <span className="text-black font-bold">Life</span>
            </p>
            <div>
              <p className="text-2xl font-bold">4+</p>
              <p>Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1 Store</p>
              <p>Life-long supply</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-6">
        <div
          className=" mx-auto my-5 py-2 overflow-x-scroll lg:flex-wrap lg:overflow-x-hidden scrollbar-none flex gap-7"
        >{menu.map((data) => {
          return <HomeMenu key={data.id} {...data}/>
        })}</div>
      </section>
    </main>
  );
}
