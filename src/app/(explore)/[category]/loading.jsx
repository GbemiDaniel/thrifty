import Navbar from "@/components/shared/Navbar/Navbar";

export default function CategoryLoading() {
    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24">
                {/* Breadcrumbs Skeleton */}
                <nav className="flex items-center gap-2 mb-8 max-w-[1440px] mx-auto px-4 md:px-12 animate-pulse">
                    <div className="h-4 w-12 bg-muted rounded"></div>
                    <span className="text-muted-foreground text-sm">&gt;</span>
                    <div className="h-4 w-20 bg-muted rounded"></div>
                </nav>

                {/* Category Header Skeleton */}
                <div className="w-full bg-muted/30 border-b border-border/50 py-12 md:py-16 mb-8">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-12 animate-pulse">
                        <div className="h-10 md:h-12 w-64 bg-muted rounded mb-4"></div>
                        <div className="h-4 w-full max-w-xl bg-muted rounded"></div>
                        <div className="h-4 w-2/3 max-w-md bg-muted rounded mt-2"></div>
                    </div>
                </div>

                {/* Main Content Area: Sidebar + Grid */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Sidebar Skeleton */}
                    <aside className="w-full md:w-64 lg:w-72 shrink-0 hidden md:flex flex-col gap-8 animate-pulse">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="h-4 w-24 bg-muted rounded"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="h-3 w-full bg-muted rounded"></div>
                                    <div className="h-3 w-3/4 bg-muted rounded"></div>
                                    <div className="h-3 w-5/6 bg-muted rounded"></div>
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Mobile Filter Button Skeleton */}
                    <div className="md:hidden flex items-center justify-between border border-border/50 p-4 rounded-sm animate-pulse">
                        <div className="h-4 w-32 bg-muted rounded"></div>
                        <div className="h-4 w-16 bg-muted rounded"></div>
                    </div>

                    {/* Product Grid Skeleton */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="flex flex-col animate-pulse w-full">
                                    <div className="w-full aspect-[3/4] bg-muted rounded-md mb-4"></div>
                                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-muted rounded w-1/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
