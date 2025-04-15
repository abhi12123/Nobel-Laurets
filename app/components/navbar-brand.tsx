import { Medal } from "lucide-react";
import * as React from "react";
import { NavLink } from "react-router";

import { SidebarMenu, SidebarMenuItem } from "~/components/ui/sidebar";

export function NavbarBrand() {
  return (
    <SidebarMenu>
      <NavLink to="/">
        <SidebarMenuItem className="flex gap-2 items-center cursor-pointer">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Medal className="size-4" />
          </div>
          <span className="font-medium">Nobel Laureates</span>
        </SidebarMenuItem>
      </NavLink>
    </SidebarMenu>
  );
}
