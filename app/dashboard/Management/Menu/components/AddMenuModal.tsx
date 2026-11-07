
"use client";

import Image from "next/image";

import { Loader2 } from "lucide-react";
import Input from "@/app/component/ui/input";

type AddMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;

  name: string;
  setName: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  imagePreview: string;
  onImageChange: (file: File) => void;

  error: string;
  isFormValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
};

const AddMenuModal = ({
  isOpen,
  onClose,
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice,
  imagePreview,
  onImageChange,
  error,
  isFormValid,
  isLoading,
  onSubmit,
}: AddMenuModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black">
            Add menu item
          </h2>

          <button type="button" onClick={onClose}>
            ✕
          </button>
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

                  if (file) onImageChange(file);
                }}
              />
            </label>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isFormValid || isLoading}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
              !isFormValid || isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isLoading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {isLoading ? "Adding..." : "Add item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;
