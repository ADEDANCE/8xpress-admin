"use client";
import NewOrdersCard from "@/app/component/ui/NewOrdersCard";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";

type OrderItem = {
  menu_item_id: number;
  name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

type Order = {
  order_id: number;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  phone: string;
  order_type: "pickup" | "delivery";
  delivery_address: string | null;
  status: string;
  total_amount: number;
  items: OrderItem[];
};

const page = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not authenticated. Please log in again.");
        }

        const response = await fetch(
          "https://eightxpress-backend.onrender.com/orders/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to fetch orders.");
        }

        setOrders(data);
      } catch (err) {
        console.error("Fetch orders error:", err);

        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  return (
    <section className=" px-4 w-full">
      <div className=" flex justify-between">
        <h2 className=" font-bold">All orders on this page are paid</h2>

        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
          <IoSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none text-sm"
          />
        </div>
      </div>

      <div className=" flex justify-between">
        <p className=" font-semibold text-black"> 3 orders waiting</p>

        <p>Oldest orders shown first</p>
      </div>
      {isLoading && <p>Loading orders...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <NewOrdersCard
          key={order.order_id}
          orderID={`#8xp-${order.order_id}`}
          orderTime="Recently"
          name={order.customer.name}
          orders={order.items.map((item) => `${item.quantity}× ${item.name}`)}
          deliveryAddress={order.delivery_address ?? undefined}
          deliveryType={order.order_type}
        />
      ))}
    </section>
  );
};

export default page;
