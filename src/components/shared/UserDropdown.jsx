"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, Heart, Package, LogOut, LayoutDashboard } from "lucide-react";

export default function UserDropdown() {
    const { user, profile, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 1. LOGGED OUT STATE (Zero Footprint)
    if (!user) {
        return (
            <>
                <Link href="/login" className="text-sm font-medium hover:opacity-70 transition-opacity">
                    Log In
                </Link>
                {/* Optional: Add Sign Up link here if your original navbar didn't have one */}
            </>
        );
    }

    // 2. LOGGED IN STATE
    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center transition-opacity hover:opacity-70 focus:outline-none"
                aria-label="User Menu"
            >
                <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-4 w-56 backdrop-blur-xl bg-white/95 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                            Hi, {profile?.first_name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="p-2">
                        {profile?.role === 'admin' && (
                            <>
                                <Link 
                                    href="/admin" 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin Portal
                                </Link>
                                <div className="h-px bg-slate-100 my-1 mx-2" />
                            </>
                        )}

                        <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                            <Package className="w-4 h-4 text-slate-400 stroke-[1.5]" /> My Orders
                        </Link>
                        <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                            <Heart className="w-4 h-4 text-slate-400 stroke-[1.5]" /> Wishlist
                        </Link>
                        <Link href="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                            <Settings className="w-4 h-4 text-slate-400 stroke-[1.5]" /> Settings
                        </Link>
                    </div>

                    <div className="p-2 border-t border-slate-100">
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                signOut();
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4 stroke-[1.5]" /> Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
