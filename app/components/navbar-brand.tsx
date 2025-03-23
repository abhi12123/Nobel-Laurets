import { Medal } from "lucide-react";
import * as React from "react";

import { SidebarMenu, SidebarMenuItem } from "~/components/ui/sidebar";

export function NavbarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex gap-2 items-center">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <Medal className="size-4" />
        </div>
        <span className="font-medium">Nobel Laureates</span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
