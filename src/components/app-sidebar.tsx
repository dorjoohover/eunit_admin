"use client";

import * as React from "react";
import {
  AudioWaveform,
  BarChart,
  BookOpen,
  Bot,
  Command,
  Crown,
  Database,
  Frame,
  GalleryVerticalEnd,
  Gift,
  Map,
  MoreHorizontal,
  Package,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUsers } from "@/components/nav-users";
import { NavUser } from "@/components/nav-user";
import { MdDashboardCustomize } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { IoCashOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { NavProducts } from "./nav-products";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Борлуулалт",
      url: "sales",
      icon: IoCashOutline,
    },
    {
      title: "Дашбоард",
      url: "#",
      icon: MdDashboardCustomize,
    },
    {
      title: "Захиалга",
      url: "order",
      icon: Package,
    },
  ],
  users: [
    {
      name: "Хэрэглэгчид",
      url: "users",
      icon: FiUsers,
    },
    {
      name: "Урамшуулал",
      url: "bonus",
      icon: Gift,
    },
    {
      name: "Гишүүнчлэл эрх",
      url: "member",
      icon: Crown,
    },
  ],
  products: [
    {
      name: "Орон сууцны дата",
      url: "data",
      icon: Database,
    },
    {
      name: "CPI",
      url: "cpi",
      icon: BarChart,
    },
    {
      name: "Бусад",
      url: "other",
      icon: MoreHorizontal,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavUsers users={data.users} />
        <NavProducts products={data.products} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
