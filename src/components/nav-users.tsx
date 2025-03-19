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
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleTrigger } from "./ui/collapsible";

export function NavUsers({
  users,
}: {
  users: {
    name: string;
    url: string;
    icon: LucideIcon | IconType;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>ХАРИЛЦАГЧИЙН ТОХИРГОО</SidebarGroupLabel>
      <SidebarMenu>
        {users.map((item) => (
          <Collapsible key={item.name} asChild className="group/collapsible">
            <SidebarMenuItem key={item.name}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={navActive(pathname, item.url)}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
