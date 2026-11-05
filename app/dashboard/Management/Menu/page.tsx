"use client";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import Button from "@/app/component/ui/Button";
import { IoMdAdd } from "react-icons/io";

const page = () => {
  const [search, setSearch] = useState("");
  const [CategoriesFilter, setCategoriesFilter] = useState("All Categories");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <section className=" px-4 w-full">
      <div className=" flex justify-between">
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

        <div className=" flex gap-3">
          <select
            value={CategoriesFilter}
            onChange={(e) => setCategoriesFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
          >
            <option value="all">All Categories</option>
            <option value="today">Jollof Rice</option>
            <option value="7days"> Shawarma</option>
            <option value="7days">Drinks</option>
            <option value="7days">Add on</option>
          </select>

          <Button
            icon={<IoMdAdd />}
            text="Add menu item"
            className=" bg-black"
            iconPosition="left"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white  border border-gray-100 mt-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="p-4">Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">price</th>
              <th className="p-4">Availability</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-gray-500 text-xs border-t border-gray-100">
              <td className="p-4">
                <div className=" flex gap-2 items-center">
                  <Image
                    src="/images/jollofR&chicken.jpg"
                    alt="8Xpress food"
                    className=" rounded-lg"
                    width={50}
                    height={40}
                  ></Image>

                  <p className=" text-black font-semibold">
                    Jollof Rice + Chicken
                  </p>
                </div>
              </td>
              <td className="p-4">Party Jollof</td>
              <td className="p-4">₦6,200</td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAvailable(!isAvailable)}
                    role="switch"
                    aria-checked={isAvailable}
                    className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                      isAvailable ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        isAvailable ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <span className="text-xs text-gray-500">
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className=" flex gap-2">
                  <button onClick={() => setIsEditOpen(true)}>
                    <p className="text-black">Edit</p>
                  </button>

                  {/*edit pop up  */}
                  {isEditOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-lg font-semibold text-black">
                            Edit menu item
                          </h2>

                          <button onClick={() => setIsEditOpen(false)}>
                            ✕
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-1">
                              Item name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter product name"
                              className="w-full border rounded-lg p-2 outline-none"
                            />
                          </div>

                          {/* category */}

                          <div>
                            <label className="block text-sm mb-1">Price</label>
                            <input
                              type="number"
                              placeholder="Enter price"
                              className="w-full border rounded-lg p-2 outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setIsEditOpen(false)}
                            className="px-4 py-2 border rounded-lg"
                          >
                            Cancel
                          </button>

                          <button className="px-4 py-2 bg-black text-white rounded-lg">
                            Save menu item
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setIsDeleteOpen(true)}
                    className="text-red-500"
                  >
                    Delete
                  </button>

                  {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold text-black">
                            Delete Item?
                          </h2>

                          <button
                            onClick={() => setIsDeleteOpen(false)}
                            className="text-gray-400"
                          >
                            ✕
                          </button>
                        </div>

                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this product? This
                          action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setIsDeleteOpen(false)}
                            className="px-4 py-2 border rounded-lg text-sm"
                          >
                            Keep It
                          </button>

                          <button
                            onClick={() => {
                              setIsDeleteOpen(false);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                          >
                            Yes, Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default page;
