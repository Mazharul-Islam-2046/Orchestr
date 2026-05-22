"use client";

import * as React from "react";
import {
  IconCalendar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconPlus,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Appointments",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Services",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Calender View (Upcoming)",
      url: "#",
      icon: IconCalendar,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <Image
                  height={24}
                  width={24}
                  src="/logo.png"
                  alt="shadcn avatar"
                  className="rounded-full"
                />
                <span className="text-base font-semibold">Orchestr</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton tooltip="Create Appointment" asChild>
          <Button
            variant="default"
            size={state === "collapsed" ? "icon" : "default"}
            className={state === "collapsed" ? "mx-auto" : "w-full gap-2"}
          >
            <IconPlus />
            {state !== "collapsed" ? (
              <span>Create Appointment</span>
            ) : (
              <span className="sr-only">Create Appointment</span>
            )}
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
