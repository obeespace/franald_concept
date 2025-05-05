"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import shopbanner from "../../public/shopbanner2.jpg";
import ShopMenu from "../components/ShopMenu";
import { Toaster, toast } from 'sonner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Page = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return (
      <main className="mt-10 w-5/6 mx-auto">
        <Toaster position="top-right" richColors />
        <section>
          <Skeleton height={200} className="rounded-2xl" />
        </section>

        <section className="mt-20">
          <Skeleton height={30} width={200} className="mb-5" />
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:grid-cols-4">
            <Skeleton height={150} className="rounded-lg" count={4} />
          </div>
        </section>

        <section className="my-20">
          <Skeleton height={30} width={200} className="mb-5" />
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:grid-cols-4">
            <Skeleton height={150} className="rounded-lg" count={3} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mt-10 w-5/6 mx-auto">
      <Toaster position="top-right" richColors />
      <section>
        <div>
          <Image
            src={shopbanner}
            alt="shop banner"
            className="lg:h-56 h-40 object-cover rounded-2xl"
            priority // Add priority for above-the-fold images
          />
        </div>
      </section>

      <section className="mt-20">
        <div>
          <p className="text-2xl font-semibold">
            Hot <span className="text-red-700">Menu</span>
          </p>
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:grid-cols-4">
            {menus.map((data) => (
              <ShopMenu key={data._id} {...data} />
            ))}
          </div>
        </div>
      </section>

      <section className="my-20">
        <div>
          <p className="text-2xl font-semibold">
            Side <span className="text-red-700">Pieces</span>
          </p>
          <div className="mx-auto my-3 gap-4 py-2 grid grid-cols-2 lg:grid-cols-4">
            {menus.slice(0, 3).map((data) => (
              <ShopMenu key={data._id} {...data} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;