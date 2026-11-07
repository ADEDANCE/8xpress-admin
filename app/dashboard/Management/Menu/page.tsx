"use client";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/component/ui/Button";
import { IoMdAdd } from "react-icons/io";
import Input from "@/app/component/ui/input";
import { uploadImage } from "@/lib/cloudinary";
import { Loader2 } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
};

const page = () => {
  const [search, setSearch] = useState("");
  const [CategoriesFilter, setCategoriesFilter] = useState("All Categories");
  const [Categories, setCategories] = useState("All Categories");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [menuError, setMenuError] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const isFormValid =
    name.trim() !== "" &&
    description.trim() !== "" &&
    category !== "" &&
    price.trim() !== "" &&
    image !== null;

  const handleAddMenuItem = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!name || !description || !category || !price || !image) {
        setError("Please fill in all fields and select an image.");
        return;
      }

      const imageUrl = await uploadImage(image);

      // Retrieve the token
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated. Please log in again.");
      }

      const response = await fetch(
        "https://eightxpress-backend.onrender.com/menu/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            image_url: imageUrl,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to add menu item.");
      }

      setSuccess("Menu item added successfully!");

      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImage(null);
      setImagePreview("");

      setIsAddOpen(false);
    } catch (err) {
      console.error("Add menu item error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      setMenuLoading(true);
      setMenuError("");

      try {
        const response = await fetch(
          "https://eightxpress-backend.onrender.com/menu/",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data: MenuItem[] = await response.json();

        setMenuItems(data);
      } catch (err) {
        console.error("Fetch menu error:", err);
        setMenuError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

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
            className="bg-black"
            iconPosition="left"
            onClick={() => setIsAddOpen(true)}
          />
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-black">
                Add menu item
              </h2>

              <button onClick={() => setIsAddOpen(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <Input
                label="Item name"
                placeholder="e.g. Jollof Rice + Chicken"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Describe your menu item"
                  className="w-full border rounded-lg p-3 outline-none"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Category
                </label>
                <select
                  className="w-full border rounded-lg p-3 outline-none bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Party Jollof">Party Jollof</option>
                  <option value="Shawarma">Shawarma</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Add on">Add on</option>
                </select>
              </div>

              <Input
                label="Price (₦)"
                type="number"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Item image
                </label>

                <label className="w-full h-36 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Selected food"
                      width={300}
                      height={150}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm text-gray-400">
                      Click to upload image
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddMenuItem}
                disabled={!isFormValid || isLoading}
                className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
                  !isFormValid || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                {isLoading ? "Adding..." : "Add item"}
              </button>
            </div>
          </div>
        </div>
      )}

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
            {menuItems.map((item) => (
              <tr
                key={item.id}
                className="text-gray-500 text-xs border-t border-gray-100"
              >
                <td className="p-4">
                  <div className=" flex gap-2 items-center">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={50}
                      height={40}
                      className="rounded-lg"
                    />

                    <p className=" text-black font-semibold">{item.name}</p>
                  </div>
                </td>
                <td className="p-4">Party Jollof</td>
                <td className="p-4">₦{item.price}</td>
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

                            <div className=" flex gap-6 justify-between w-full">
                              {/* category */}

                              <select
                                value={Categories}
                                onChange={(e) => setCategories(e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white"
                              >
                                <option value="all">All Categories</option>
                                <option value="today">Jollof Rice</option>
                                <option value="7days"> Shawarma</option>
                                <option value="7days">Drinks</option>
                                <option value="7days">Add on</option>
                              </select>

                              <div>
                                <label className="block text-sm mb-1">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  placeholder="Enter price"
                                  className="w-full border rounded-lg p-2 outline-none"
                                />
                              </div>
                            </div>

                            {/* update imge */}
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default page;
