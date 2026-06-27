import Navbar from "@/components/shared/Navbar/Navbar";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { FadeUp, StaggerContainer } from "@/components/ui/motion-wrappers";
import { globalCatalog } from "@/lib/constants";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
    // 1. Await searchParams for Next.js 15+
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.q || "";

    // 2. The Filtering Engine
    const lowerQuery = query.toLowerCase();
    
    // Only search if we have a query
    const searchResults = lowerQuery ? globalCatalog.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(lowerQuery))
    ) : [];

    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24">
                <nav className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-8 max-w-[1440px] mx-auto px-4 md:px-12">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-foreground">Search Results</span>
                </nav>

                {/* Header Section */}
                <div className="w-full bg-muted/30 border-b border-border/50 py-12 md:py-16 mb-8">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                        <FadeUp>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {query ? `Search results for "${query}"` : "Search"}
                            </h1>
                            <p className="text-foreground/70 text-sm md:text-base max-w-xl">
                                {query 
                                    ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} matching your search.` 
                                    : "Enter a search term to find products."}
                            </p>
                        </FadeUp>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                    <div className="flex-1 w-full">
                        {searchResults.length > 0 ? (
                            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                                {searchResults.map((product) => (
                                    <FadeUp key={product.id} className="h-full w-full">
                                        <ProductCard {...product} />
                                    </FadeUp>
                                ))}
                            </StaggerContainer>
                        ) : (
                            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                                <p className="text-xl font-medium text-foreground mb-4">
                                    {query 
                                        ? `We couldn't find anything matching '${query}'.` 
                                        : "No search query provided."}
                                </p>
                                <p className="text-muted-foreground text-sm max-w-md mb-8">
                                    {query 
                                        ? "Try checking for typos, using broader terms, or exploring our categories." 
                                        : "Please use the search bar above to find products."}
                                </p>
                                <Link 
                                    href="/" 
                                    className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:bg-foreground/80 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
