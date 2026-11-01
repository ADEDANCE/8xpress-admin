import DashboardCard from "../component/ui/DashboardCard";
import { ShoppingBag, Truck, CircleCheck } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import IncomingOrders from "../component/ui/IncomingOrders";
import ActiveOrder from "../component/ui/ActiveOrder";
import { TbCurrencyNaira } from "react-icons/tb";

const page = () => {
  return (
    <section className=" px-4">
      <div className="  mx-auto text-black">
        <h1 className=" font-bold text-2xl">Hello Wellcome</h1>
        <p className=" text-gray-600">
          Here’s what’s happening in your restaurant right now.
        </p>

        <div className=" flex flex-col md:flex-row justify-between gap-4 mt-4">
          <DashboardCard
            title="New Orders"
            quantity={12}
            icon={<ShoppingBag size={24} />}
          />

          <DashboardCard
            title="Active Orders"
            quantity={8}
            icon={<Truck size={24} />}
            iconColor="bg-blue-100 text-blue-600"
          />

          <DashboardCard
            title="Completed Today"
            quantity={24}
            icon={<CircleCheck size={24} />}
            iconColor="bg-green-100 text-green-600"
          />

          <DashboardCard
            title="Today's Revenue"
            quantity={24000}
            icon={<TbCurrencyNaira size={24} />}
            iconColor="bg-green-100 text-green-600"
          />
        </div>
        <div className=" flex gap-4">
          <div className=" md:w-2/3 bg-white mt-6 py-2  rounded-xl text-black">
            <h3 className=" font-semibold px-4">Incoming paid orders</h3>
            <div className=" flex justify-between  border-b border-gray-300 px-4 pb-2">
              <p className=" text-gray-600 text-xs">
                Start preparing to move them into your active queue.
              </p>

              <Link href={""} className=" flex items-center gap-2 text-xs">
                <p>view all</p>
                <IoIosArrowForward />
              </Link>
            </div>

            <IncomingOrders
              orderID="#8XP-1048
"
              ordertime="2 mins ago"
              name="Adaeze Okafor"
              orders="2× Jollof Rice + Chicken · 1× Plantain add-on"
              totalPrice="3500"
              delivaryType="Delivary"
            />
            <IncomingOrders
              orderID="#8XP-1048
"
              ordertime="2 mins ago"
              name="Adaeze Okafor"
              orders="2× Jollof Rice + Chicken · 1× Plantain add-on"
              totalPrice="3500"
              delivaryType="Delivary"
            />
            <IncomingOrders
              orderID="#8XP-1048
"
              ordertime="2 mins ago"
              name="Adaeze Okafor"
              orders="2× Jollof Rice + Chicken · 1× Plantain add-on"
              totalPrice="3500"
              delivaryType="Delivary"
            />
          </div>

          <div className=" md:w-1/3 bg-white mt-6 py-2  rounded-xl text-black ">
            <h3 className=" font-semibold px-4">Active orders</h3>
            <div className=" flex justify-between border-b border-gray-300 px-4 pb-2">
              <p className=" text-gray-600 text-xs">Orders in progress</p>

              <Link href={""} className=" flex items-center gap-2 text-xs">
                <p>view all</p>
                <IoIosArrowForward />
              </Link>
            </div>

            <ActiveOrder
              orderID="#8XP-1045"
              name="Moyo Balogun"
              delivaryType=" · Pickup"
              status="Preparing"
            />
            <ActiveOrder
              orderID="#8XP-1045"
              name="Moyo Balogun"
              delivaryType=" · Pickup"
              status="Preparing"
            />
            <ActiveOrder
              orderID="#8XP-1045"
              name="Moyo Balogun"
              delivaryType=" · Pickup"
              status="Preparing"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
