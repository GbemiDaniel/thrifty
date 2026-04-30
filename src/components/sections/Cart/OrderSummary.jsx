"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function OrderSummary() {
    // 1. Hook into the Brain
    const items = useCartStore((state) => state.items);

    // 2. Hydration Safety
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // 3. The Math Engine
    // Sum up (price * quantity) for every item in the cart
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Hardcoded delivery logic (e.g., Flat $15, or Free if over $500)
    const deliveryFee = subtotal > 500 ? 0 : 15;

    const finalTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

    // Prevent rendering the math until the client has loaded the local storage
    if (!mounted) {
        return <div className="w-full bg-card rounded-md p-6 lg:p-8 animate-pulse h-64"></div>;
    }

    return (
        <div className="w-full bg-card rounded-md p-6 lg:p-8 border border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Order Summary</h2>

            <div className="flex flex-col gap-4 text-sm mb-6">

                {/* Dynamic Subtotal */}
                <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>

                {/* Dynamic Delivery */}
                <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-medium text-foreground">
                        {subtotal === 0 ? "$0.00" : deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>

                {/* Optional Promo Code Row (Visual only for now) */}
                <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span className="font-medium text-sale">-$0.00</span>
                </div>
            </div>

            <hr className="border-border mb-6" />

            {/* Dynamic Final Total */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Checkout CTA - Wired to /checkout */}
            <Link
                href="/checkout"
                className={`w-full h-14 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors ${items.length === 0
                        ? "bg-muted text-muted-foreground pointer-events-none"
                        : "bg-foreground text-background hover:bg-foreground/80"
                    }`}
                tabIndex={items.length === 0 ? -1 : 0}
            >
                Go to Checkout <span>→</span>
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes and shipping calculated at checkout.
            </p>
        </div>
    );
}