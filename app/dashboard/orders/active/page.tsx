"use client"
import ActiveCard from "@/app/component/ui/ActiveCard";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  return (
    <section className=" px-4 w-full">
       <div className=" flex justify-between">
              {/* <h2 className=" font-bold">All orders on this page are paid</h2> */}
      
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
        <IoSearch className="text-gray-400" />
      
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none text-sm"
        />
      </div>
            </div>
      
            <div className=" flex justify-between">
              <p className=" font-semibold text-black"> 3 orders waiting</p>
      
              <p>Oldest orders shown first</p>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
              <ActiveCard
          orderID="#8xp-1048"
        orderTime="2 mins ago"
        name="Tunde Adebayo"
        orders={["2× Jollof Rice + Chicken", "1× Plantain add-on"]}
        deliveryAddress="14 Admiralty Way, Lekki Phase 1"
        deliveryType="Delivery"
        price={'₦7,400'}
      />

        <ActiveCard
          orderID="#8xp-1048"
        orderTime="2 mins ago"
        name="Tunde Adebayo"
        orders={["2× Jollof Rice + Chicken", "1× Plantain add-on"]}
        deliveryType="Pickup"
        price={'₦7,400'}
      />
      <ActiveCard
          orderID="#8xp-1048"
        orderTime="2 mins ago"
        name="Tunde Adebayo"
        orders={["2× Jollof Rice + Chicken", "1× Plantain add-on"]}
        deliveryAddress="14 Admiralty Way, Lekki Phase 1"
        deliveryType="Delivery"
        price={'₦7,400'}
      />

        <ActiveCard
          orderID="#8xp-1048"
        orderTime="2 mins ago"
        name="Tunde Adebayo"
        orders={["2× Jollof Rice + Chicken", "1× Plantain add-on"]}
        deliveryType="Pickup"
        price={'₦7,400'}
      />
            </div>
      
    </section>
  );
};

export default page;
