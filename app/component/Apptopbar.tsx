"use client";

import {
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { SidebarTrigger } from "@/components/ui/sidebar";

const AppTopbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b bg-black px-4 text-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <h3 className="font-semibold">Dashboard</h3>
      </div>

      <div className="flex items-center gap-6">
        <button>
          <IoNotificationsOutline size={20} />
        </button>

        <button>
          <IoSettingsOutline size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AppTopbar;