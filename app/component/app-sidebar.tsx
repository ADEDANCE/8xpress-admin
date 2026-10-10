"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Clock3,
  History,
  Utensils,
  Users,
  Truck,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const orderItems = [
  {
    title: "New Orders",
    url: "/dashboard/orders/new",
    icon: ShoppingBag,
  },
  {
    title: "Active Orders",
    url: "/dashboard/orders/active",
    icon: Clock3,
  },
  {
    title: "Order History",
    url: "/dashboard/orders/history",
    icon: History,
  },
];

const managementItems = [
  {
    title: "Menu",
    url: "/dashboard/menu",
    icon: Utensils,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Deliveries",
    url: "/dashboard/deliveries",
    icon: Truck,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="bg-[#292b2a] text-white">
        <div className="px-4 py-5">
          <h1 className="text-xl font-bold tracking-wide">8XPRESS</h1>
          <p className="text-xs text-gray-300">Workspace</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#292b2a] text-white">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/dashboard" />}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Orders */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Orders
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {orderItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Management
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#292b2a] text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
