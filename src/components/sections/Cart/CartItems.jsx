"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartItems() {
    // 1. Hook into the Brain
    const { items, updateQuantity, removeItem } = useCartStore();

    // 2. Hydration Safety
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Prevent server-side rendering mismatch
    if (!mounted) {
        return <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">Loading cart...</div>;
    }

    // 3. The Empty State
    if (items.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 text-center bg-card rounded-md border border-border">
                <h2 className="text-2xl font-bold mb-3 text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 text-sm">Looks like you haven't added anything yet.</p>
                <Link href="/" className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:bg-foreground/80 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {items.map((item) => {
                // We use the compound key defined in Zustand to target the exact variant
                const variantKey = `${item.id}-${item.color}-${item.size}`;

                return (
                    <div key={variantKey} className="flex gap-4 md:gap-6 border-b border-border pb-6">

                        {/* Image Placeholder */}
                        <div className="relative w-24 h-32 md:w-32 md:h-40 bg-card rounded-sm shrink-0 overflow-hidden border border-border">
                            {item.image && (
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">

                            <div className="flex justify-between items-start gap-4">
                                <div className="truncate">
                                    <h3 className="font-bold text-lg text-foreground truncate">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Color: <span className="capitalize text-foreground font-medium">{item.color}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Size: <span className="text-foreground font-medium">{item.size}</span>
                                    </p>
                                </div>

                                {/* Trigger: Remove Item */}
                                <button
                                    onClick={() => removeItem(variantKey)}
                                    className="text-muted-foreground hover:text-sale transition-colors shrink-0"
                                    aria-label="Remove item"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Math & Controls */}
                            <div className="flex justify-between items-end mt-4">

                                {/* Trigger: Update Quantity */}
                                <div className="flex items-center justify-between bg-card rounded-full w-28 h-10 px-3 border border-border">
                                    <button
                                        onClick={() => updateQuantity(variantKey, item.quantity - 1)}
                                        className="text-lg text-muted-foreground hover:text-foreground"
                                    >−</button>
                                    <span className="text-sm font-bold text-foreground">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(variantKey, item.quantity + 1)}
                                        className="text-lg text-muted-foreground hover:text-foreground"
                                    >+</button>
                                </div>

                                {/* Dynamic Line Total */}
                                <span className="font-bold text-xl text-foreground">${item.price * item.quantity}</span>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}