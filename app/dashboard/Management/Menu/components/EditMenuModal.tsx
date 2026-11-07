"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/app/types/menu";

type EditMenuModalProps = {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (updatedItem: MenuItem) => void;
};

const EditMenuModal = ({ item, onClose, onSave }: EditMenuModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(String(item.price));
    }
  }, [item]);

  if (!item) return null;

  const handleSave = () => {
    if (!name.trim() || !price || Number(price) <= 0) return;

    onSave({
      ...item,
      name: name.trim(),
      price: Number(price),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-black">Edit menu item</h2>

          <button type="button" onClick={onClose}>
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
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border rounded-lg p-2 outline-none"
            />
          </div>
        </div>

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
            onClick={handleSave}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Save menu item
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;
