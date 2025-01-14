import Image from "next/image";
import homeImg from "../public/fried-meat-table.png";
import poultry from "../public/poultry.png";
import fishery from "../public/fishery.png";
import takeout from "../public/chips.png";
import homeImg2 from "../public/chickenbreast.png";
import bannerpic from "../public/bannerpic.png";
import firstbanner from "../public/firstbanner.jpg";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { SiDrone } from "react-icons/si";
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
];

export default function Home() {
  return (
    <main className="">
      <section className="lg:mt-20 mt-10 w-5/6 mx-auto">
        <div className="lg:flex justify-between gap-20 ">
          <div className="lg:w-7/12">
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
            <button className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800">
              Order Now
            </button>
          </div>
          <Image
            src={homeImg}
            alt="vegetables"
            className="hidden lg:block text-center mt-14 lg:mt-0 lg:w-4/12 w-4/6 lg:h-full -rotate-12"
          />
          <Image
            src={homeImg2}
            alt="vegetables"
            className="block lg:hidden text-center mt-14 lg:mt-0 lg:w-4/12 lg:h-full -rotate-12"
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

      <section className="mt-20 lg:mt-12 w-5/6 mx-auto">
        <div className="flex justify-end">
          <button className="bg-orange-600 rounded-md px-4 py-2 text-white hover:bg-orange-800">
            See Menu
          </button>
        </div>
        <div className=" mx-auto my-3 py-2 overflow-x-scroll lg:flex-wrap lg:overflow-x-hidden scrollbar-none flex gap-7">
          {menu.map((data) => {
            return <HomeMenu key={data.id} {...data} />;
          })}
        </div>
      </section>

      <section className="mt-20 w-5/6 mx-auto">
        <div className="lg:flex justify-between items-end">
          <p className="text-4xl font-bold lg:w-2/6">
            Check out our <span className="text-green-800">Businesses</span>
          </p>
          <p className="text-lg font-medium lg:w-3/6 mt-3 lg:mt-0 italic text-gray-700">
            Not only do we deliver tasty chops, we farm our meals ourselves. You
            can also order these fresh farm produce
          </p>
        </div>

        <div className="mt-14 lg:grid grid-cols-3">
          <div className="flex flex-col items-center">
            <Image src={poultry} alt="vegetables" className="w-4/6" />
            <p className="font-semibold text-lg mt-7">Poultry Produce</p>
            <button className="flex items-center font-semibold text-orange-600">
              Order Now <IoMdArrowDropright />
            </button>
          </div>
          <div className="flex flex-col items-center mt-10 lg:mt-0">
            <Image src={fishery} alt="vegetables" className="w-4/6" />
            <p className="font-semibold text-lg mt-7">Fishery Produce</p>
            <button className="flex items-center font-semibold text-orange-600">
              Order Now <IoMdArrowDropright />
            </button>
          </div>
          <div className="flex flex-col items-center mt-10 lg:mt-0">
            <Image src={takeout} alt="vegetables" className="w-4/6" />
            <p className="font-semibold text-lg mt-7">Kitchen Produce</p>
            <button className="flex items-center text-orange-600 font-semibold">
              Order Now <IoMdArrowDropright />
            </button>
          </div>
        </div>
      </section>

      <section className="my-20">
        <Image
          src={firstbanner}
          alt="footer banner"
          className="w-full h-96 object-cover"
        />
        <div className="lg:flex -mt-80 text-white w-5/6 mx-auto">
          <div className="lg:w-3/6 ">
            <p className="text-3xl">Tastiest Meal, Tantalize your Taste Buds</p>
            <p className="italic text-slate-200 mt-4">
              Good food is the foundation of genuine happiness". "The smell of
              garlic, the sizzle of olive oil, and the warmth of a good meal are
              all that's needed for happiness
            </p>
          </div>

          <Image alt="banner picture" src={bannerpic} className="lg:w-7/12 mt-4 lg:mt-0" />

          <div className="hidden lg:block">
            <div className="flex justify-between">
              <SiDrone className="text-2xl" />
              <div>
                <p className="font-semibold text-xl">Air delivery</p> <p className="text-sm">The fastest and safest way to convey</p>
              </div>
            </div>

            <div className="flex justify-between">
              <SiDrone className="text-2xl" />
              <div>
                <p className="font-semibold text-xl">Air delivery</p> <p className="text-sm">The fastest and safest way to convey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="my-20 w-4/6 mx-auto">
        <div className="lg:flex gap-10">
          <div className="h-96 w-96 rounded-xl bg-green-800"></div>
          <div className="lg:flex flex-col justify-between">
            <div className="h-44 w-96 rounded-xl bg-orange-800"></div>
            <div className="h-44 w-96 rounded-xl bg-red-800"></div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
