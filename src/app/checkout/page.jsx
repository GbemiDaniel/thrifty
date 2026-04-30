import CheckoutForm from "@/components/sections/Checkout/CheckoutForm";
import CheckoutSummary from "@/components/sections/Checkout/CheckoutSummary";
import Link from "next/link";

export default function CheckoutPage() {
    return (
        // 1. VOID FIX: Changed bg-white to bg-gray-50 to create contrast against the forms
        <div className="w-full min-h-screen bg-gray-50">

            {/* Header remains pure white to anchor the top of the page */}
            <header className="w-full px-6 md:px-12 py-6 border-b border-gray-200 flex justify-between items-center bg-white">
                <Link href="/" className="text-2xl font-bold uppercase tracking-wide text-black">
                    THRIFTY.COM
                </Link>
                <div className="flex items-center gap-2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-xs font-medium uppercase tracking-widest hidden sm:block">Secure Checkout</span>
                </div>
            </header>

            {/* 2. ALIGNMENT FIX: Restored max-w-[1440px] to respect the global layout padding */}
            <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">

                {/* We center the entire flex block so it floats beautifully in the middle of large screens */}
                <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-16">

                    {/* Left: Input. Constrained to 650px maximum. Forms shouldn't stretch forever. */}
                    <div className="w-full lg:max-w-[650px]">
                        {/* Added a white bounding box and shadow around the form */}
                        <div className="bg-white p-6 md:p-10 rounded-md border border-gray-200 shadow-sm">
                            <CheckoutForm />
                        </div>
                    </div>

                    {/* Right: Validation & Execution. Constrained to 450px maximum. */}
                    <div className="w-full lg:max-w-[450px]">
                        <div className="sticky top-10">
                            {/* Note: If your CheckoutSummary still has bg-[#fafafa], you might want to switch it to bg-white so it pops against the gray-50 page background */}
                            <CheckoutSummary />
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
}