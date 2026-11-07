"use client";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import Button from "@/app/component/ui/Button";
import { IoMdAdd } from "react-icons/io";
import { uploadImage } from "@/lib/cloudinary";
import MenuTable from "./components/MenuTable";
import EditMenuModal from "./components/EditMenuModal";
import DeleteMenuModal from "./components/DeleteMenuModal";
import AddMenuModal from "./components/AddMenuModal";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
};

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [CategoriesFilter, setCategoriesFilter] = useState("All Categories");
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

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );

  const handleSaveEdit = (updatedItem: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );

    setIsEditOpen(false);
    setSelectedMenuItem(null);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsDeleteOpen(true);
  };

  const handleToggleAvailability = (item: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((menuItem) =>
        menuItem.id === item.id
          ? { ...menuItem, is_available: !menuItem.is_available }
          : menuItem,
      ),
    );
  };

  const handleConfirmDelete = (item: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.filter((menuItem) => menuItem.id !== item.id),
    );

    setIsDeleteOpen(false);
    setSelectedMenuItem(null);
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

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

          <AddMenuModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            error={error}
            isFormValid={isFormValid}
            isLoading={isLoading}
            onSubmit={handleAddMenuItem}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white  border border-gray-100 mt-10  rounded-xl">
        <MenuTable
          menuItems={menuItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleAvailability={handleToggleAvailability}
        />

        <EditMenuModal
          item={isEditOpen ? selectedMenuItem : null}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedMenuItem(null);
          }}
          onSave={handleSaveEdit}
        />

        <DeleteMenuModal
          item={isDeleteOpen ? selectedMenuItem : null}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedMenuItem(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </section>
  );
}
