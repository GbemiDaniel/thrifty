import ProductNavbar from "@/components/sections/Product/ProductNavbar";
import CartItems from "@/components/sections/Cart/CartItems";
import OrderSummary from "@/components/sections/Cart/OrderSummary";
import Link from "next/link";

export default function CartPage() {
    return (
        <div className="w-full min-h-screen bg-white pb-24">
            {/* 1. Header */}
            <ProductNavbar />

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6">

                {/* 2. Breadcrumbs */}
                <nav className="text-xs font-medium text-gray-500 flex items-center gap-2 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-black">Men</span>
                </nav>

                {/* 3. Page Title */}
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-black mb-8">
                    YOUR CART
                </h1>

                {/* 4. The 60/40 Split */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

                    {/* Left Column: Cart Items (Takes up roughly 60%) */}
                    <div className="w-full lg:w-[60%]">
                        <CartItems />
                    </div>

                    {/* Right Column: Order Summary (Takes up roughly 40%) */}
                    <div className="w-full lg:w-[40%]">
                        {/* The sticky top-24 ensures the summary follows the user if they have 20 items in their cart */}
                        <div className="sticky top-24">
                            <OrderSummary />
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}