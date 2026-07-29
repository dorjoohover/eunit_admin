import { FunctionComponent, ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cn } from "@/lib/utils";

// import { getSupplier } from "@/services";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = async ({ children }) => {
  // let supplier;

  // const supplierId = (await getCookie("supplierId"))?.value || "";

  // if (supplierId) {
  //   // global
  //   supplier = await getSupplier<any>(supplierId);
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={cn("w-full")}>{children}</main>
    </SidebarProvider>
  );
};

export default MainLayout;
