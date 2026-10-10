import DashboardCard from "../component/ui/DashboardCard";
import { ShoppingBag, Truck, CircleCheck } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const page = () => {
  return (
    <section className="  px-4">
      <div className=" mx-auto text-black">
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
        </div>
        <div className=" flex gap-4">
          <div className=" md:w-2/3 bg-black mt-6 py-2  rounded-xl text-white">
            <h3 className=" font-semibold px-4">Incoming paid orders</h3>
            <div className=" flex justify-between  border-b border-gray-400 px-4 pb-2">
              <p className=" text-gray-200 text-xs">
                Start preparing to move them into your active queue.
              </p>

              <Link href={""} className=" flex items-center gap-2 text-xs">
                <p>view all</p>
                <IoIosArrowForward />
              </Link>
            </div>

            <div className=" mt-4">
              <p>#8XP-1048</p>
              <p>2 mins ago</p>
            </div>
          </div>

          <div className=" md:w-1/3 bg-black mt-6 py-2  rounded-xl text-white ">
            <h3 className=" font-semibold px-4">Active orders</h3>
            <div className=" flex justify-between border-b border-gray-400 px-4 pb-2">
              <p className=" text-gray-200 text-xs">Orders in progress</p>

              <Link href={""} className=" flex items-center gap-2 text-xs">
                <p>view all</p>
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
