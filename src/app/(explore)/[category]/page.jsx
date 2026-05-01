import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar/Navbar";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { FadeUp, StaggerContainer } from "@/components/ui/motion-wrappers";
import { globalCatalog } from "@/lib/constants";
import { Filter } from "lucide-react";

// Generate static params for Next.js build optimization
export function generateStaticParams() {
    return [{ category: "men" }, { category: "women" }, { category: "accessories" }];
}

export default async function CategoryPage({ params }) {
    // 1. Await the params Promise (Next.js 15+ requirement)
    const resolvedParams = await params;
    const categoryName = resolvedParams.category.toLowerCase();

    // 2. Validate against allowed categories
    const validCategories = ["men", "women", "accessories"];
    if (!validCategories.includes(categoryName)) {
        notFound();
    }

    // 3. Filter the global catalog
    const products = globalCatalog.filter(
        (product) => product.category.toLowerCase() === categoryName
    );

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
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-32 flex flex-col gap-8">
                            <div className="flex items-center gap-2 font-bold uppercase tracking-wide border-b border-border/50 pb-4">
                                <Filter className="w-4 h-4" />
                                Filters
                            </div>

                            {/* Mock Filter Categories */}
                            {['Category', 'Size', 'Color', 'Price'].map((filterGroup) => (
                                <div key={filterGroup} className="flex flex-col gap-3">
                                    <h3 className="font-semibold text-sm">{filterGroup}</h3>
                                    <div className="flex flex-col gap-2">
                                        {[1, 2, 3].map((item) => (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="w-4 h-4 border border-border/50 rounded-sm group-hover:border-foreground transition-colors" />
                                                <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                                                    Option {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <div className="md:hidden flex items-center justify-between border border-border/50 p-4 rounded-sm">
                        <span className="font-medium text-sm">Showing {products.length} Results</span>
                        <button className="flex items-center gap-2 text-sm font-bold uppercase">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 w-full">
                        {products.length > 0 ? (
                            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
                                {products.map((product) => (
                                    <FadeUp key={product.id} className="h-full w-full">
                                        <ProductCard {...product} />
                                    </FadeUp>
                                ))}
                            </StaggerContainer>
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