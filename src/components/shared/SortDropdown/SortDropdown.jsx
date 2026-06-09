"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDropdown() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "recommended";

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        
        if (newSort === "recommended") {
            params.delete("sort");
        } else {
            params.set("sort", newSort);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Sort by:
            </label>
            <div className="relative">
                <select
                    id="sort"
                    value={currentSort}
                    onChange={handleSortChange}
                    className="appearance-none bg-background border border-border rounded-sm py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground transition-colors cursor-pointer hover:border-foreground/30"
                >
                    <option value="recommended">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
