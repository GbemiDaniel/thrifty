"use client";

import { usePathname } from "next/navigation";
import { Search, Globe } from "lucide-react";
import Link from 'next/link';

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pathname.split("/").pop() || "Dashboard";
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="sticky top-0 z-10 h-20 bg-[#F7F7F7] flex items-center justify-between px-8 border-b border-border">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-slate-900">{formattedTitle}</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center w-96">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent border-none outline-none w-full text-sm text-slate-900 placeholder:text-slate-500"
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Link 
            href="/" 
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-black transition-all"
        >
            <Globe className="w-4 h-4 stroke-[1.5]" />
            View Live Store
        </Link>
      </div>
    </header>
  );
}
