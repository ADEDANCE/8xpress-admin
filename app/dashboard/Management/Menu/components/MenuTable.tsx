import type { MenuItem } from "@/app/types/menu";
import Image from "next/image";

type MenuTableProps = {
  menuItems: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onToggleAvailability: (item: MenuItem) => void;
};

const MenuTable = ({
  menuItems,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuTableProps) => {
  return (
    <table className="w-full text-left border-collapse ">
      <thead>
        <tr className="bg-gray-50 text-gray-500 text-sm">
          <th className="p-4">Item</th>
          <th className="p-4">Category</th>
          <th className="p-4">Price</th>
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
              <div className="flex gap-2 items-center">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={50}
                  height={40}
                  unoptimized
                  className="rounded-lg w-12.5 h-10 cover"
                />

                <p className="text-black font-semibold">{item.name}</p>
              </div>
            </td>

            <td className="p-4">—</td>

            <td className="p-4">₦{item.price}</td>

            <td className="p-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleAvailability(item)}
                  role="switch"
                  aria-checked={item.is_available}
                  aria-label={`Toggle availability for ${item.name}`}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    item.is_available ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      item.is_available ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <span className="text-xs text-gray-500">
                  {item.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
            </td>

            <td className="p-4 whitespace-nowrap">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="text-black"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
