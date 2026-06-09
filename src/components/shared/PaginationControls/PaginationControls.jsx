"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({ currentPage, totalPages }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", newPage.toString());
        }

        // We use scroll: true to push the user back up to the top of the grid
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    return (
        <div className="w-full flex items-center justify-center gap-4 mt-12 mb-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                    currentPage === 1
                        ? "border-border/50 text-muted-foreground/50 cursor-not-allowed"
                        : "border-border text-foreground hover:bg-muted hover:border-foreground/30"
                }`}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium text-muted-foreground">
                Page <span className="text-foreground">{currentPage}</span> of {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                    currentPage === totalPages
                        ? "border-border/50 text-muted-foreground/50 cursor-not-allowed"
                        : "border-border text-foreground hover:bg-muted hover:border-foreground/30"
                }`}
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
