"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { SlideDownHeader } from "@/components/ui/motion-wrappers";

export default function ProductNavbar() {
    // 1. Hook into Zustand
    const items = useCartStore((state) => state.items);

    // 2. Hydration Safety (Prevents Next.js Server/Client Mismatch)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // 3. Compute Total Items (Sum of Quantities)
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <SlideDownHeader className="w-full px-4 md:px-12 py-4 border-b border-border bg-background sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">

                {/* 1. LEFT ZONE */}
                <div className="flex-1 flex items-center justify-start min-w-0 shrink-0 gap-3 md:gap-0">
                    <button aria-label="Menu" className="md:hidden pb-0.5 text-foreground hover:text-foreground/70 shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                        </svg>
                    </button>
                    <Link href="/" className="text-xl md:text-3xl font-bold uppercase tracking-wide text-foreground leading-none pb-0.5 truncate shrink-0">
                        THRIFTY.COM
                    </Link>
                </div>

                {/* 2. CENTER ZONE (The Un-collapsible Search Bar) */}
                <div className="hidden md:flex flex-[2] justify-center min-w-0">
                    <div className="w-full max-w-2xl flex items-center bg-card rounded-md px-4 h-12 border border-border min-w-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted-foreground mr-3 shrink-0">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="flex-1 min-w-0 w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground font-medium leading-none focus:ring-0"
                        />
                    </div>
                </div>

                {/* 3. RIGHT ZONE */}
                <div className="flex-1 flex items-center justify-end min-w-0 shrink-0 gap-4 md:gap-5 text-foreground">
                    <button aria-label="Search" className="md:hidden hover:text-foreground/70 pb-0.5 shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" />
                            <path d="M21 21L16.65 16.65" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* The Wired Cart Icon with Notification Badge */}
                    <Link href="/cart" aria-label="Cart" className="relative flex items-center hover:text-foreground/70 pb-0.5 shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>

                        {mounted && totalItems > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-sale text-background text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <button aria-label="Profile" className="hover:text-foreground/70 pb-0.5 shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                </div>

            </div>
        </SlideDownHeader>
    );
}