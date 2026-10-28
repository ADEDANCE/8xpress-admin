import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "../component/app-sidebar";
import AppTopbar from "../component/Apptopbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppTopbar />

        <main className="flex-1 p-6 bg-[#F1F5F9] ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
