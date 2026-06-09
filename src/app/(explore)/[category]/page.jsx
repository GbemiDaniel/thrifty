// Force Turbopack reload
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar/Navbar";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { FadeUp, StaggerContainer } from "@/components/ui/motion-wrappers";
import { globalCatalog } from "@/lib/constants";
import { Filter } from "lucide-react";
import FilterSidebar from "@/components/shared/FilterSidebar/FilterSidebar";
import MobileFilterDrawer from "@/components/sections/Category/MobileFilterDrawer";
import SortDropdown from "@/components/shared/SortDropdown/SortDropdown";
import PaginationControls from "@/components/shared/PaginationControls/PaginationControls";

// Generate static params for Next.js build optimization
export function generateStaticParams() {
    return [{ category: "men" }, { category: "women" }, { category: "accessories" }];
}

export default async function CategoryPage({ params, searchParams }) {
    // 1. Await the params and searchParams Promises (Next.js 15+ requirement)
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const categoryName = resolvedParams.category.toLowerCase();

    // 2. Validate against allowed categories
    const validCategories = ["men", "women", "accessories"];
    if (!validCategories.includes(categoryName)) {
        notFound();
    }

    // Extract & Normalize URL Params
    const activeTypes = resolvedSearchParams.type ? resolvedSearchParams.type.toLowerCase().split(',') : [];
    const activeStyles = resolvedSearchParams.style ? resolvedSearchParams.style.toLowerCase().split(',') : [];
    const activeColors = resolvedSearchParams.color ? resolvedSearchParams.color.toLowerCase().split(',') : [];
    const activeSizes = resolvedSearchParams.size ? resolvedSearchParams.size.toLowerCase().split(',') : [];
    const activeMinPrice = resolvedSearchParams.minPrice ? parseInt(resolvedSearchParams.minPrice) : 0;
    const activeMaxPrice = resolvedSearchParams.maxPrice ? parseInt(resolvedSearchParams.maxPrice) : 200;
    const activeSort = resolvedSearchParams.sort || 'recommended';
    const currentPage = parseInt(resolvedSearchParams.page) || 1;

    const sizeMap = {
        "xxs": "xx-small",
        "xs": "x-small",
        "s": "small",
        "m": "medium",
        "l": "large",
        "xl": "x-large",
        "xxl": "xx-large",
        "3xl": "3x-large",
        "4xl": "4x-large"
    };

    const colorGroups = {
        "black": ["black", "onyx", "vintage black", "faded black", "carbon", "charcoal"],
        "white": ["white", "bone", "off-white", "cream", "sand"],
        "green": ["green", "olive", "matcha"],
        "grey": ["grey", "gray", "heather grey", "ash", "slate", "graphite"],
        "brown": ["brown", "espresso", "saddle", "tortoise"],
        "blue": ["blue", "navy", "washed navy"],
        "red": ["red", "crimson"]
    };

    // 3. Filter the global catalog
    const products = globalCatalog.filter((product) => {
        // Route Match
        if (product.category.toLowerCase() !== categoryName) return false;

        // Type Match
        if (activeTypes.length > 0) {
            if (!product.subCategory || !activeTypes.includes(product.subCategory.toLowerCase())) return false;
        }

        // Style Match
        if (activeStyles.length > 0) {
            if (!product.dressStyle || !activeStyles.includes(product.dressStyle.toLowerCase())) return false;
        }

        // Price Match
        if (product.price < activeMinPrice || product.price > activeMaxPrice) return false;

        // Color Match
        if (activeColors.length > 0) {
            // Create a flat array of all valid DB color names based on the user's selection
            const validDbColors = activeColors.flatMap(color => colorGroups[color] || [color]);

            const hasColor = product.colors && product.colors.some(c => validDbColors.includes(c.name.toLowerCase()));
            if (!hasColor) return false;
        }

        // Size Match
        if (activeSizes.length > 0) {
            const hasSize = product.sizes && product.sizes.some(dbSize => {
                const normalizedDbSize = dbSize.toLowerCase();
                const mappedName = sizeMap[normalizedDbSize] || normalizedDbSize;
                return activeSizes.includes(normalizedDbSize) || activeSizes.includes(mappedName);
            });
            if (!hasSize) return false;
        }

        return true;
    });

    if (activeSort === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
    }

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // 4. Capitalize for the Header
    const displayCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    return (
        <>
            {/* THE MISSING ENGINE: Mount the route-aware Navbar here */}
            <Navbar />

            <main className="w-full min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24">
                <nav className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-8 max-w-[1440px] mx-auto px-4 md:px-12">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-foreground">{displayCategory}</span>
                </nav>

                {/* Category Header */}
                <div className="w-full bg-muted/30 border-b border-border/50 py-12 md:py-16 mb-8">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                        <FadeUp>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {displayCategory} Collection
                            </h1>
                            <p className="text-foreground/70 text-sm md:text-base max-w-xl">
                                Explore our latest {categoryName} arrivals. Designed for modern utility, crafted with premium materials.
                            </p>
                        </FadeUp>
                    </div>
                </div>

                {/* Main Content Area: Sidebar + Grid */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Sidebar (Filters) */}
                    <FilterSidebar />

                    {/* Mobile Filter Button */}
                    <div className="md:hidden flex items-center justify-between border border-border/50 p-4 rounded-sm">
                        <span className="font-medium text-sm">Showing {products.length} Results</span>
                        <MobileFilterDrawer />
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-end md:justify-between mb-6">
                            <span className="font-medium text-sm hidden md:block text-muted-foreground">Showing {products.length} Results</span>
                            <SortDropdown />
                        </div>

                        {products.length > 0 ? (
                            <>
                                <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
                                    {paginatedProducts.map((product) => (
                                        <FadeUp key={product.id} className="h-full w-full">
                                            <ProductCard {...product} />
                                        </FadeUp>
                                    ))}
                                </StaggerContainer>
                                <PaginationControls currentPage={currentPage} totalPages={totalPages} />
                            </>
                        ) : (
                            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                                <p className="text-xl font-medium text-foreground/70">No products found in this category.</p>
                                <button className="mt-6 border-b border-foreground pb-1 text-sm font-bold hover:text-foreground/70 transition-colors">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </>
    );
}