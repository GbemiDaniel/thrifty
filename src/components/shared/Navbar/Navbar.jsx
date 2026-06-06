"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { SlideDownHeader } from "@/components/ui/motion-wrappers";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    // Zustand Cart Connection
    const items = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Route-aware solid state
    const isHomePage = pathname === '/';
    const isSolid = isScrolled || !isHomePage;

    // Dynamic Scroll State
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger immediately to catch initial state
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <>
            <SlideDownHeader className="fixed top-0 left-0 w-full z-100 transition-all duration-300">

                {/* ==============================================
                    A. MOBILE NODE (<md)
                    ============================================== */}
                <div
                    className={`flex md:hidden w-full h-20 px-4 items-center justify-between transition-all duration-300 relative z-50 text-foreground ${isSolid
                        ? "bg-background/95 backdrop-blur border-b border-border"
                        : "bg-background border-b border-border"
                        }`}
                >
                    <button
                        className="p-2 -ml-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link href="/" className="font-bold text-xl uppercase tracking-tight">
                        THRIFTY.COM
                    </Link>

                    <div className="flex items-center gap-1">
                        <button
                            className="p-2"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Toggle search"
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>

                        {/* THE FIX: Removed negative margin, pinned badge directly to the icon */}
                        <Link href="/cart" className="p-2 flex items-center">
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5" />
                                {mounted && totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-sale text-background text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* ==============================================
                    B. DESKTOP NODE (>=md)
                    ============================================== */}
                <div
                    className={`hidden md:block w-full transition-all duration-300 ${isSolid
                        ? "bg-background/95 backdrop-blur border-b border-border text-foreground shadow-sm"
                        : "bg-transparent text-white border-transparent"
                        }`}
                >
                    <div className="flex max-w-[1440px] mx-auto px-12 h-24 items-center justify-between relative">
                        <div className="flex shrink-0 items-center">
                            <Link href="/" className="font-bold text-2xl uppercase tracking-tight">
                                THRIFTY.COM
                            </Link>
                        </div>

                        <nav className="flex items-center gap-10 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                            {["Men", "Women", "Accessories"].map((item) => {
                                const isActive = pathname.includes(`/${item.toLowerCase()}`);
                                return (
                                    <Link key={item} href={`/${item.toLowerCase()}`} className="group relative">
                                        <span className={`transition-colors ${isActive ? (isSolid ? "text-foreground" : "text-white") : (isSolid ? "text-foreground/90 hover:text-foreground" : "text-white/90 hover:text-white")}`}>{item}</span>
                                        <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"} ${isSolid ? "bg-foreground" : "bg-white"}`}></span>
                                    </Link>
                                );
                            })}

                            <div className="group relative">
                                <button className={`flex items-center gap-1 transition-colors ${pathname.includes('/collections') ? (isSolid ? "text-foreground" : "text-white") : (isSolid ? "text-foreground/90 hover:text-foreground" : "text-white/90 hover:text-white")}`}>
                                    Collections <ChevronDown className="w-4 h-4" />
                                </button>
                                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${pathname.includes('/collections') ? "w-full" : "w-0 group-hover:w-full"} ${isSolid ? "bg-foreground" : "bg-white"}`}></span>
                                
                                <div className="absolute top-full left-0 hidden group-hover:flex flex-col pt-4">
                                    <div className="flex flex-col bg-background text-foreground shadow-lg border border-border rounded-md min-w-[200px] py-1 divide-y divide-border">
                                        <Link href="/collections/urban-wear" className="hover:bg-muted px-4 py-3 text-sm transition-colors">Urban Wear</Link>
                                        <Link href="/collections/shirts" className="hover:bg-muted px-4 py-3 text-sm transition-colors">Shirts</Link>
                                        <Link href="/collections/bags-accessories" className="hover:bg-muted px-4 py-3 text-sm transition-colors">Bags & Accessories</Link>
                                        <Link href="/collections/footwear" className="hover:bg-muted px-4 py-3 text-sm transition-colors">Footwear</Link>
                                        <Link href="/collections/trousers-suits" className="hover:bg-muted px-4 py-3 text-sm transition-colors">Trousers & Suits</Link>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        <div className={`flex items-center gap-6 text-sm font-medium transition-colors ${isSolid ? "text-foreground/90" : "text-white/90"}`}>
                            <Link href="/login" className={`transition-colors ${isSolid ? "hover:text-foreground" : "hover:text-white"}`}>Login</Link>
                            <div className={`h-3 w-px transition-colors ${isSolid ? "bg-border" : "bg-white/40"}`}></div>
                            <Link href="/help" className={`transition-colors ${isSolid ? "hover:text-foreground" : "hover:text-white"}`}>Help</Link>
                            <div className={`h-3 w-px transition-colors ${isSolid ? "bg-border" : "bg-white/40"}`}></div>
                            <Link href="/contact" className={`transition-colors ${isSolid ? "hover:text-foreground" : "hover:text-white"}`}>Contact Us</Link>

                            <button
                                className={`ml-2 transition-colors ${isSolid ? "hover:text-foreground" : "hover:text-white"}`}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Toggle search"
                            >
                                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                            </button>

                            <Link href="/cart" className={`relative flex items-center transition-colors ${isSolid ? "hover:text-foreground" : "hover:text-white"}`}>
                                <ShoppingCart className="w-5 h-5" />
                                {mounted && totalItems > 0 && (
                                    <span className="absolute top-0 right-0 bg-sale text-background text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full -translate-y-1/4 translate-x-1/2">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ==============================================
                    SEARCH DROPDOWN
                    ============================================== */}
                <div className={`w-full overflow-hidden transition-all duration-300 ${isSearchOpen
                    ? "max-h-32 py-6 opacity-100 bg-background text-foreground border-b border-border shadow-md"
                    : "max-h-0 py-0 opacity-0"
                    }`}>
                    <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex justify-center">
                        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="Search products, brands, or categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-muted/50 border border-border rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all pr-12 text-foreground"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-foreground/70 hover:text-foreground transition-colors"
                                aria-label="Submit search"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

            </SlideDownHeader>

            {/* ==============================================
                C. MOBILE DRAWER UI 
                ============================================== */}
            <div
                className={`fixed inset-0 bg-black/60 z-200 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            <div
                className={`fixed top-0 left-0 h-full w-[85vw] sm:w-[350px] bg-background z-210 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-20 px-6 flex items-center justify-between border-b border-border/50">
                    <span className="font-bold text-lg uppercase tracking-tight text-foreground">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col py-2 overflow-y-auto">
                    {["Men", "Women", "Accessories"].map((item) => {
                        const isActive = pathname.includes(`/${item.toLowerCase()}`);
                        return (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`px-6 py-4 text-lg font-medium transition-colors border-b border-border/20 ${isActive ? "text-foreground bg-muted/50" : "text-foreground/80 hover:text-foreground hover:bg-muted/50"}`}
                            >
                                {item}
                            </Link>
                        );
                    })}

                    <div className="flex flex-col border-b border-border/20">
                        <button
                            onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                            className={`px-6 py-4 flex items-center justify-between text-lg font-medium transition-colors ${pathname.includes('/collections') ? "text-foreground bg-muted/50" : "text-foreground/80 hover:text-foreground hover:bg-muted/50"}`}
                        >
                            Collections
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isCollectionsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isCollectionsOpen ? "max-h-[400px] py-2" : "max-h-0"}`}>
                            <Link href="/collections/urban-wear" onClick={() => setIsMobileMenuOpen(false)} className="pl-10 pr-6 py-3 text-base text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors">Urban Wear</Link>
                            <Link href="/collections/shirts" onClick={() => setIsMobileMenuOpen(false)} className="pl-10 pr-6 py-3 text-base text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors">Shirts</Link>
                            <Link href="/collections/bags-accessories" onClick={() => setIsMobileMenuOpen(false)} className="pl-10 pr-6 py-3 text-base text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors">Bags & Accessories</Link>
                            <Link href="/collections/footwear" onClick={() => setIsMobileMenuOpen(false)} className="pl-10 pr-6 py-3 text-base text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors">Footwear</Link>
                            <Link href="/collections/trousers-suits" onClick={() => setIsMobileMenuOpen(false)} className="pl-10 pr-6 py-3 text-base text-foreground/70 hover:text-foreground hover:bg-muted/30 transition-colors">Trousers & Suits</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-auto px-6 py-8 bg-muted/30 flex flex-col gap-6 text-sm font-medium text-foreground/80 border-t border-border/50">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Login / Register
                    </Link>
                    <Link href="/help" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Help Center
                    </Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-foreground transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    );
}