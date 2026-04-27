import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 text-white">
            {/* Pushed the horizontal padding out to match the full-bleed boundaries */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between relative">

                {/* MOBILE ONLY: Hamburger Menu */}
                <button className="md:hidden hover:text-white/70 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                {/* BRAND: Removed tracking-widest, switched to tracking-normal to match the bold punchiness */}
                <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-shrink-0">
                    <Link href="/" className="font-bold text-xl md:text-2xl uppercase tracking-normal">
                        THRIFTY.COM
                    </Link>
                </div>

                {/* DESKTOP ONLY: Center Navigation - Increased gap for breathing room */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                    <Link href="/men" className={styles.navLink}>Men</Link>
                    <Link href="/women" className={styles.navLink}>Women</Link>
                    <Link href="/accessories" className={styles.navLink}>Accessories</Link>
                    <Link href="/collections" className={styles.navLink}>Collections</Link>
                </nav>

                {/* ACTIONS: Right side */}
                <div className="flex items-center gap-5 text-sm font-medium">

                    <div className="hidden md:flex items-center gap-5">
                        <Link href="/login" className="hover:text-white/70 transition-colors">Login</Link>
                        {/* Engineered dividers: 1px wide, perfectly vertically centered */}
                        <div className="h-3 w-px bg-white/40"></div>
                        <Link href="/help" className="hover:text-white/70 transition-colors">Help</Link>
                        <div className="h-3 w-px bg-white/40"></div>
                        <Link href="/contact" className="hover:text-white/70 transition-colors">Contact Us</Link>
                    </div>

                    <button className="hover:text-white/70 transition-colors cursor-pointer ml-1">
                        {/* Slimmed the strokeWidth to 1.5 to match the delicate design */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>

            </div>
        </header>
    );
}