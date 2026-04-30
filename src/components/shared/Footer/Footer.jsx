import Link from "next/link";
import { ScrollReveal } from "@/components/ui/motion-wrappers";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const linkClass = "relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 hover:after:w-full";

    return (
        <footer className="w-full bg-black text-white pt-16 pb-8 px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto flex flex-col">

                {/* TOP SECTION: Logo & Primary Nav */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">

                    {/* Brand */}
                    <ScrollReveal delay={0} className="w-full md:w-auto flex justify-center md:justify-start">
                        <Link href="/" className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                            THRIFTY.COM
                        </Link>
                    </ScrollReveal>

                    {/* Navigation - Stacked on mobile, horizontal on desktop */}
                    <ScrollReveal delay={0.1} className="w-full md:w-auto">
                        <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium">
                            <Link href="/men" className={linkClass}>Men</Link>
                            <Link href="/women" className={linkClass}>Women</Link>
                            <Link href="/accessories" className={linkClass}>Accessories</Link>
                            <Link href="/collections" className={linkClass}>Collections</Link>
                        </nav>
                    </ScrollReveal>

                    {/* Invisible spacer on desktop to force true centering if needed */}
                    <div className="hidden md:block w-32"></div>
                </div>

                {/* DIVIDER LINE */}
                <hr className="w-full border-t border-white/20 my-10 md:my-12" />

                {/* BOTTOM SECTION: Legal & Copyright */}
                <ScrollReveal delay={0.4} className="w-full">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-xs text-white/70">

                        {/* Legal Links - Stacked on mobile, horizontal on desktop */}
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 order-1 md:order-2">
                            <Link href="/privacy" className={linkClass}>Privacy Policy</Link>
                            <Link href="/terms" className={linkClass}>Terms of Service</Link>
                            <Link href="/cookies" className={linkClass}>Cookies Settings</Link>
                        </div>

                        {/* Copyright - Pushed to the bottom on mobile, left/center alongside legal on desktop */}
                        <p className="order-2 md:order-1">
                            © {currentYear} Thrifty. All rights reserved.
                        </p>

                    </div>
                </ScrollReveal>

            </div>
        </footer>
    );
}