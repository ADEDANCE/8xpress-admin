"use client";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
    const [deliveryType, setDeliveryType] = useState("Pickup & delivery");
  return (
    <section className=" px-6 py-6 w-full">
      <div className="  py-2 bg-white rounded-xl">
        <div className=" flex gap-6 my-4">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 ml-2">
            <IoSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
          >
            <option value="all">Pickup & delivery</option>
            <option value="today">Pickup</option>
            <option value="7days">Delivery</option>
          </select>
        </div>

        <div className="w-full overflow-x-auto bg-white  border border-gray-100">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-gray-50 text-gray-500 text-sm">
        <th className="p-4">Order ID</th>
        <th className="p-4">Customer</th>
        <th className="p-4">Order type</th>
        <th className="p-4">Total</th>
        <th className="p-4">Date & time</th>
      </tr>
    </thead>

    <tbody>
       <tr className="text-gray-500 text-xs border-t border-gray-100">
      <td className="p-4">#8XP-1041</td>
      <td className="p-4">Amara Obi</td>
      <td className="p-4">Pickup</td>
      <td className="p-4">₦6,200</td>
      <td className="p-4 whitespace-nowrap">
        18 May 2025, 10:42 AM
      </td>
    </tr>
    </tbody>


     <tbody>
       <tr className="text-gray-500 text-xs border-t border-gray-100">
      <td className="p-4">#8XP-1041</td>
      <td className="p-4">Amara Obi</td>
      <td className="p-4">Pickup</td>
      <td className="p-4">₦6,200</td>
      <td className="p-4 whitespace-nowrap">
        18 May 2025, 10:42 AM
      </td>
    </tr>
    </tbody>
     <tbody>
       <tr className="text-gray-500 text-xs border-t border-gray-100">
      <td className="p-4">#8XP-1041</td>
      <td className="p-4">Amara Obi</td>
      <td className="p-4">Pickup</td>
      <td className="p-4">₦6,200</td>
      <td className="p-4 whitespace-nowrap">
        18 May 2025, 10:42 AM
      </td>
    </tr>
    </tbody>
  </table>
</div>
      </div>
    </section>
  );
};

export default page;
