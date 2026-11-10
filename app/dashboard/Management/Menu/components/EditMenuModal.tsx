"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/app/types/menu";
import { useRef } from "react";

type EditMenuModalProps = {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (updatedItem: MenuItem, image: File | null) => void;
  isLoading: boolean;
  error: string;
  success: string;
};

const EditMenuModal = ({
  item,
  onClose,
  onSave,
  isLoading,
  error,
}: EditMenuModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(String(item.price));
      setImage(null);
      setImagePreview(item.image_url);
    }
  }, [item]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!item) return null;

  const handleImageChange = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price || Number(price) <= 0) {
      return;
    }

    onSave(
      {
        ...item,
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
      },
      image,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black">Edit menu item</h2>

          <button type="button" onClick={onClose} disabled={isLoading}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border rounded-lg p-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={3}
              className="w-full border rounded-lg p-2 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border rounded-lg p-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Product image</label>
            {imagePreview && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-40 mb-3 cursor-pointer group"
              >
                <Image
                  src={imagePreview}
                  alt={name || "Menu item"}
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <p className="text-white text-sm font-medium">
                    Click to change image
                  </p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageChange(file);
              }}
              className="hidden"
            />{" "}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save menu item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;
