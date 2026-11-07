"use client";

import type { MenuItem } from "@/app/types/menu";

type DeleteMenuModalProps = {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem) => void;
};

const DeleteMenuModal = ({
  item,
  onClose,
  onConfirm,
}: DeleteMenuModalProps) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">
            Delete Item?
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-black">{item.name}</span>?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Keep It
          </button>

          <button
            type="button"
            onClick={() => onConfirm(item)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuModal;