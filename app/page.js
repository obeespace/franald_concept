"use client";
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
import { FiAward } from "react-icons/fi";
import HomeMenu from "./components/homeMenu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
   const faqs = [
    {
      question: "How long does delivery usually take?",
      answer:
        "Most deliveries arrive within 30-45 minutes. During peak hours or bad weather, it might take up to 60 minutes. You'll get real-time tracking updates so you know exactly when your order will arrive.",
    },
    {
      question: "What are the delivery fees and minimum order requirements?",
      answer:
        "Delivery fees typically range from ₦500 to ₦2000 depending on distance",
    },
    {
      question: "Can I track my order in real-time?",
      answer:
        "Yes! Once your order is confirmed, you can track it every step of the way. You'll see when the restaurant starts preparing your food, when the driver picks it up, till it gets to you.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, verve).",
    },
    {
      question: "What if my order is wrong or missing items?",
      answer:
        "We're here to help! If there's an issue with your order, contact us immediately through the app or call our support line. We'll work with the restaurant to fix the problem and may offer a refund, credit, or replacement order.",
    },
  ];
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const fetchMenus = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/menu");
      setMenus(data || []); // Fallback to empty array if data is null/undefined
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu items. Check your connection.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);


  return (
    <main className="">
      <Toaster position="top-right" richColors />

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
            <Link href='/shop'>
            <button className="bg-orange-600 rounded-md px-4 py-2 mt-5 text-white hover:bg-orange-800">
              Order Now
            </button></Link>
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
              More <span className="text-green-700 font-bold">Fresh Produce</span>,
              tastier <span className="text-black font-bold">Grills</span>
            </p>
            <div>
              <p className="text-2xl font-bold text-orange-800">10+</p>
              <p>Farm & Grill Options</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">1 Farm</p>
              <p>Nature-fed, Flame-grilled</p>
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
        {loading ? (
          <Skeleton count={5} height={50} className="my-3" />
        ) : (
          <div className=" mx-auto my-3 py-2 overflow-x-scroll lg:flex-wrap lg:overflow-x-hidden scrollbar-none flex gap-7">
            {menus.map((data) => (
              <HomeMenu key={data._id} {...data} />
            ))}
          </div>
        )}
        
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
            <Link href='/shop'><button className="flex items-center font-semibold text-orange-600">
              Order Now <IoMdArrowDropright />
            </button></Link>
          </div>
          <div className="flex flex-col items-center mt-10 lg:mt-0">
            <Image src={fishery} alt="vegetables" className="w-4/6" />
            <p className="font-semibold text-lg mt-7">Fishery Produce</p>
            <Link href='/shop'><button className="flex items-center font-semibold text-orange-600">
              Order Now <IoMdArrowDropright />
            </button></Link>
          </div>
          <div className="flex flex-col items-center mt-10 lg:mt-0">
            <Image src={takeout} alt="vegetables" className="w-4/6" />
            <p className="font-semibold text-lg mt-7">Kitchen Produce</p>
            <Link href='/shop'><button className="flex items-center text-orange-600 font-semibold">
              Order Now <IoMdArrowDropright />
            </button></Link>
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

          <Image
            alt="banner picture"
            src={bannerpic}
            className="lg:w-7/12 mt-10 lg:mt-0"
          />

          <div className="hidden lg:block">
            <div className="flex justify-between">
              
              <div>
                <p className="font-semibold text-xl">Door delivery</p>{" "}
                <p className="text-sm">Your orders can be brought to your doorstep</p>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              
              <div>
                <p className="font-semibold text-xl">Timely delivery</p>{" "}
                <p className="text-sm">We partner with professional delivery services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-green-800">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We've got answers. Find everything you need to know
              about our delivery service.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  className="w-full text-left font-semibold text-orange-700 hover:text-orange-500 py-6 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {faq.question}
                </button>
                {openFaq === index && (
                  <p
                    id={`faq-answer-${index}`}
                    className="text-gray-600 pb-6 leading-relaxed"
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <div className="sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors"
              >
                Contact Support
              </a>
              
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
