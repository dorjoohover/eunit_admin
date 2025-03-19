"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";
import { navActive } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavProducts({
  products,
}: {
  products: {
    name: string;
    url: string;
    icon: LucideIcon | IconType;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>БҮТЭЭГДЭХҮҮНИЙ ТОХИРГОО</SidebarGroupLabel>

      <SidebarMenu>
        {products.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={navActive(pathname, item.url)}>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
