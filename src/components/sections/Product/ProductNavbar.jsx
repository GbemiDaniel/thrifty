import Link from "next/link";

export default function ProductNavbar() {
    return (
        <header className="w-full px-4 md:px-12 py-4 border-b border-gray-200 bg-white">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                {/* 1. LEFT ZONE: Hamburger (Mobile) + Logo */}
                <div className="flex items-center gap-3 md:gap-0 md:w-1/4">

                    {/* Mobile Hamburger Menu */}
                    <button aria-label="Menu" className="md:hidden pb-0.5 text-black hover:text-black/70">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                        </svg>
                    </button>

                    <Link href="/" className="text-xl md:text-3xl font-bold uppercase tracking-wide text-black leading-none pb-0.5">
                        THRIFTY.COM
                    </Link>
                </div>

                {/* 2. CENTER ZONE: Full Search Bar (Desktop Only) */}
                <div className="hidden md:flex justify-center w-2/4">
                    <div className="w-full max-w-[500px] flex items-center bg-[#F1F3F4] rounded-sm px-4 h-12">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400 mr-3">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-black font-medium leading-none focus:ring-0"
                        />
                    </div>
                </div>

                {/* 3. RIGHT ZONE: Icons */}
                <div className="flex items-center justify-end gap-4 md:gap-5 text-black md:w-1/4">

                    {/* Mobile Search Icon (Hidden on Desktop) */}
                    <button aria-label="Search" className="md:hidden hover:text-black/70 pb-0.5">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" />
                            <path d="M21 21L16.65 16.65" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <button aria-label="Cart" className="relative flex items-center hover:text-black/70 pb-0.5">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </button>

                    {/* Profile Icon */}
                    <button aria-label="Profile" className="hover:text-black/70 pb-0.5">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>

                </div>

            </div>
        </header>
    );
}