"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Truck, Users, BarChart3, Tags, Box } from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/deliveries", label: "Deliveries", icon: Truck },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/discounts", label: "Discounts", icon: Tags },
  { href: "/admin/inventory", label: "Inventory", icon: Box },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#F7F7F7] border-r border-border flex flex-col">
      {/* Profile Block */}
      <div className="flex items-center gap-3 p-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex-shrink-0" /> {/* Placeholder */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Admin</span>
          <span className="text-xs text-muted-foreground">email@gmail.com</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
        {navLinks.map((link) => {
          // If the link is exactly '/admin', only match exact. Otherwise, match any sub-route (e.g. /admin/products/new)
          const isActive = link.href === "/admin" 
            ? pathname === link.href 
            : pathname.startsWith(link.href);
          
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 mx-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-200/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
