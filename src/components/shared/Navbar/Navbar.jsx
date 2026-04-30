"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { SlideDownHeader } from "@/components/ui/motion-wrappers";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    return (
        <SlideDownHeader className="absolute top-0 left-0 w-full z-[100] transition-colors duration-300">

            {/* ==============================================
                A. MOBILE NODE (<md)
                ============================================== */}
            <div className="flex md:hidden w-full h-20 px-4 bg-background text-foreground items-center justify-between border-b border-border relative z-50">
                <button
                    className="p-2 -ml-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>

                <Link href="/" className="font-bold text-xl uppercase tracking-tight">
                    THRIFTY.COM
                </Link>

                <div className="flex gap-2">
                    <button className="p-2"><Search className="w-5 h-5" /></button>
                    <Link href="/cart" className="p-2 -mr-2"><ShoppingCart className="w-5 h-5" /></Link>
                </div>
            </div>

            {/* ==============================================
                B. DESKTOP NODE (>=md)
                ============================================== */}
            <div className="hidden md:flex max-w-[1440px] mx-auto px-12 h-24 items-center justify-between text-white">
                <div className="flex shrink-0 items-center">
                    <Link href="/" className="font-bold text-2xl uppercase tracking-tight">
                        THRIFTY.COM
                    </Link>
                </div>

                <nav className="flex items-center gap-10 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                    {["Men", "Women", "Accessories", "Collections"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="group relative">
                            <span className="text-white/90 hover:text-white transition-colors">{item}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6 text-sm font-medium text-white/90">
                    <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                    <div className="h-3 w-[1px] bg-white/40"></div>
                    <Link href="/help" className="hover:text-white transition-colors">Help</Link>
                    <div className="h-3 w-[1px] bg-white/40"></div>
                    <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                    <Link href="/cart" className="hover:text-white transition-colors ml-2">
                        <ShoppingCart className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* ==============================================
                C. MOBILE DRAWER UI
                ============================================== */}
            {/* 1. The Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* 2. The Sliding Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-[85vw] sm:w-[350px] bg-background z-[210] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="h-20 px-6 flex items-center justify-between border-b border-border/50">
                    <span className="font-bold text-lg uppercase tracking-tight text-foreground">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Drawer Primary Links */}
                <div className="flex flex-col py-2 overflow-y-auto">
                    {["Men", "Women", "Accessories", "Collections"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-6 py-4 text-lg font-medium text-foreground hover:bg-muted/50 transition-colors border-b border-border/20"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Drawer Secondary/Action Links */}
                <div className="mt-auto px-6 py-8 bg-muted/30 flex flex-col gap-6 text-sm font-medium text-foreground/80 border-t border-border/50">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Login / Register
                    </Link>
                    <Link href="/help" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Help Center
                    </Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>

        </SlideDownHeader>
    );
}