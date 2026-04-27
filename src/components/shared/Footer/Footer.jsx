import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-black text-white pt-16 pb-8 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto flex flex-col">

                {/* TOP SECTION: Logo & Primary Nav */}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10 md:gap-0">

                    {/* Brand */}
                    <Link href="/" className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                        THRIFTY.COM
                    </Link>

                    {/* Navigation - Stacked on mobile, horizontal on desktop */}
                    <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium">
                        <Link href="/men" className="hover:text-white/70 transition-colors">Men</Link>
                        <Link href="/women" className="hover:text-white/70 transition-colors">Women</Link>
                        <Link href="/accessories" className="hover:text-white/70 transition-colors">Accessories</Link>
                        <Link href="/collections" className="hover:text-white/70 transition-colors">Collections</Link>
                    </nav>

                    {/* Invisible spacer on desktop to force true centering if needed, 
              but based on the design, justify-between handles the weight distribution fine. */}
                    <div className="hidden md:block w-32"></div>
                </div>

                {/* DIVIDER LINE */}
                <hr className="w-full border-t border-white/20 my-10 md:my-12" />

                {/* BOTTOM SECTION: Legal & Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-xs text-white/70">

                    {/* Legal Links - Stacked on mobile, horizontal on desktop */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 order-1 md:order-2 underline decoration-white/20 underline-offset-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies Settings</Link>
                    </div>

                    {/* Copyright - Pushed to the bottom on mobile, left/center alongside legal on desktop */}
                    <p className="order-2 md:order-1">
                        © {currentYear} Thrifty. All rights reserved.
                    </p>

                </div>

            </div>
        </footer>
    );
}