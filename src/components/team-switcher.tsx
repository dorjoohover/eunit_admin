"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-between items-center">
          {open && (
            <Image
              src={"/logo/white-mini.png"}
              alt="logo white mini"
              width={32}
              height={32}
            />
          )}
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center ml-auto bg-white p-1.5 rounded-md"
            style={{
              boxShadow: "2px 0px 10px -5px #1E1E2D",
            }}
          >
            <Image
              src={"icons/doubleArrow.svg"}
              alt="double arrow"
              width={20}
              height={20}
            />
          </button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
