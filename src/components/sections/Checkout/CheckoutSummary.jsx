"use client";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function CheckoutSummary() {
    // Hook into the live Zustand cart
    const { items } = useCartStore();

    // The Math Engine
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 500 ? 0 : 15;
    const finalTotal = subtotal + deliveryFee;

    return (
        <div className="w-full border border-gray-200 rounded-md p-6 bg-white shadow-sm">

            <h3 className="text-lg font-bold text-black mb-6 uppercase">Order Review</h3>

            {/* Micro Item List */}
            <div className="flex flex-col gap-4 mb-6 border-b border-gray-200 pb-6">
                {items.map((item) => {
                    const variantKey = `${item.id}-${item.color}-${item.size}`;
                    
                    return (
                        <div key={variantKey} className="flex gap-4 items-center">
                            <div className="relative w-16 h-16 bg-[#dcdcdc] rounded-sm shrink-0 overflow-hidden border border-gray-100">
                                {item.image && (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                )}
                            </div>
                            <div className="flex flex-col grow min-w-0">
                                <span className="text-sm font-bold text-black truncate">{item.name}</span>
                                <span className="text-xs text-gray-500 capitalize">
                                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-black shrink-0">
                                ${item.price * item.quantity}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Math Recap */}
            <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-black">${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-black">{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Final Total */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-base text-gray-500 uppercase tracking-wide">Total</span>
                <span className="text-3xl font-bold text-black">${finalTotal}</span>
            </div>

            {/* The Money Button */}
            <button type="submit" form="checkout-form" className="w-full bg-black text-white h-14 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Pay Now
            </button>

        </div>
    );
}