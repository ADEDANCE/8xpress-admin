
import type { ReactNode } from "react";


type DashboardCardProps = {
  title: string;
  quantity: string | number;
  icon: ReactNode;
  iconColor?: string;
};

const  DashboardCard = ({
  title,
  quantity,
  icon,
  iconColor = "",
}: DashboardCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-black p-4 shadow-sm transition-shadow hover:shadow-md w-full ">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-red-500`}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {quantity}
        </h2>
        <p className="text-sm font-medium text-gray-300">{title}</p>
      </div>

     
    </div>
  );
};

export default  DashboardCard;




