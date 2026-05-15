"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Crosshair,
  UserCircle,
  FileBarChart,
  Settings,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Employés", href: "/dashboard/employees", icon: Users },
  { label: "Formations", href: "/dashboard/training", icon: GraduationCap },
  { label: "Simulations", href: "/dashboard/simulations", icon: Crosshair },
  { label: "Rapports", href: "/dashboard/reports", icon: FileBarChart },
  { label: "Mon espace", href: "/dashboard/user-dashboard", icon: UserCircle },
  { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[260px]"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rht-violet to-rht-violet-light shadow-[0_4px_15px_rgba(156,30,153,0.3)]">
          <Shield className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">CyberSense</span>
            <span className="text-[11px] opacity-40">by Rostel High-Tech</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-7 w-7 opacity-40 hover:bg-sidebar-accent hover:opacity-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {!collapsed && (
        <div className="px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-widest opacity-30">Organisation</p>
          <p className="mt-0.5 text-sm font-medium">{currentUser.org}</p>
        </div>
      )}

      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-rht-violet/15 text-rht-violet-light shadow-[0_2px_8px_rgba(156,30,153,0.1)]"
                  : "opacity-50 hover:bg-sidebar-accent hover:opacity-80"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="p-3">
        <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${collapsed ? "justify-center" : ""}`}>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-rht-violet to-rht-violet-light text-[11px] text-white">
              {currentUser.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-[11px] opacity-40">{currentUser.email}</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/login">
              <LogOut className="h-4 w-4 shrink-0 opacity-30 transition-opacity hover:opacity-100" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
