"use client"
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
          placeholder="Search menu items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none text-sm"
        />
      </div>
      </div>
      </section>
  )
}

export default page