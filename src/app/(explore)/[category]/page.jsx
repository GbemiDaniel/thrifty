// Force Turbopack reload
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar/Navbar";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { FadeUp, StaggerContainer } from "@/components/ui/motion-wrappers";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { mapSupabaseToUIProduct } from "@/utils/data-adapters";
import { Filter } from "lucide-react";
import FilterSidebar from "@/components/shared/FilterSidebar/FilterSidebar";
import MobileFilterDrawer from "@/components/sections/Category/MobileFilterDrawer";
import SortDropdown from "@/components/shared/SortDropdown/SortDropdown";
import PaginationControls from "@/components/shared/PaginationControls/PaginationControls";

export const dynamic = 'force-dynamic';

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

    // 1. Extract & Normalize URL Params (Increased Default Max Price for Luxury Items)
    const activeTypes = resolvedSearchParams.type ? resolvedSearchParams.type.toLowerCase().split(',') : [];
    const activeStyles = resolvedSearchParams.style ? resolvedSearchParams.style.toLowerCase().split(',') : [];
    const activeColors = resolvedSearchParams.color ? resolvedSearchParams.color.toLowerCase().split(',') : [];
    const activeSizes = resolvedSearchParams.size ? resolvedSearchParams.size.toLowerCase().split(',') : [];
    
    // CRITICAL FIX: Bumped default max price to 1,000,000 to prevent filtering out luxury items like watches
    const activeMinPrice = resolvedSearchParams.minPrice ? parseInt(resolvedSearchParams.minPrice) : 0;
    const activeMaxPrice = resolvedSearchParams.maxPrice ? parseInt(resolvedSearchParams.maxPrice) : 1000000; 
    
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

    // 2. The Database Layer (Supabase Dynamic Query Builder)
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let dbQuery = supabase
        .from('products')
        .select('*')
        .ilike('category', categoryName)
        .gte('price', activeMinPrice)
        .lte('price', activeMaxPrice);

    // Conditionally attach top-level filters to the DB query
    if (activeTypes.length > 0) {
        dbQuery = dbQuery.in('sub_category', activeTypes);
    }
    if (activeStyles.length > 0) {
        dbQuery = dbQuery.in('dress_style', activeStyles);
    }

    // Await the optimized payload
    const { data: rawProducts, error } = await dbQuery;

    if (error) console.error("Supabase Hybrid Query Error:", error);

    // 3. Transform the payload via Adapter
    const uiProducts = rawProducts ? rawProducts.map(mapSupabaseToUIProduct) : [];

    // Calculate the absolute highest price in this specific category payload
    // We add a 10% buffer so the most expensive item isn't pushed to the absolute edge of the slider
    // Note: Since uiProducts is already filtered by activeMaxPrice, to prevent the slider from shrinking, 
    // a production app might run a separate un-filtered max() aggregate query. 
    const highestDbPrice = uiProducts.length > 0 
        ? Math.max(...uiProducts.map(p => p.price)) 
        : 1000;
    
    // If the user is heavily filtering, default to their URL max or the DB max so the slider doesn't permanently trap them.
    const effectiveHighest = Math.max(highestDbPrice, activeMaxPrice === 1000000 ? 0 : activeMaxPrice);
    const absoluteCategoryMax = Math.ceil(effectiveHighest * 1.1);

    // 4. The Application Layer (JavaScript Array Filtering for complex mappings)
    const products = uiProducts.filter((product) => {
        // Color Match (Handles the mapped array logic)
        if (activeColors.length > 0) {
            const validDbColors = activeColors.flatMap(color => colorGroups[color] || [color]);
            const hasColor = product.colors && product.colors.some(c => validDbColors.includes(c.name.toLowerCase()));
            if (!hasColor) return false;
        }

        // Size Match (Handles the mapped array logic)
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
                    <FilterSidebar dynamicMaxPrice={absoluteCategoryMax} />

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
                                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
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