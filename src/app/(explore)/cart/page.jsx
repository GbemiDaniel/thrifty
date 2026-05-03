"use client";
import Link from "next/link";
import ProductNavbar from "@/components/sections/Product/ProductNavbar";
import CartItems from "@/components/sections/Cart/CartItems";
import OrderSummary from "@/components/sections/Cart/OrderSummary";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
    const items = useCartStore((state) => state.items);
    const getCartCount = useCartStore((state) => state.getCartCount);

    const cartCount = getCartCount();

    return (
        <div className="w-full min-h-screen bg-white pb-24">
            <ProductNavbar />

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6">
                <nav className="text-xs font-medium text-gray-500 flex items-center gap-2 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-black">Your Cart</span>
                </nav>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground mb-6 md:mb-8">
                    YOUR CART {cartCount > 0 ? `(${cartCount})` : ""}
                </h1>

                {items.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                        <div className="w-full lg:w-[60%]">
                            <CartItems />
                        </div>
                        <div className="w-full lg:w-[40%]">
                            <div className="sticky top-24">
                                <OrderSummary />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-t border-gray-100">
                        <p className="text-xl text-gray-500 mb-8">Your cart is currently empty.</p>
                        <Link
                            href="/"
                            className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}