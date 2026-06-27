import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { mapSupabaseToUIProduct } from "@/utils/data-adapters";

import ProductNavbar from "@/components/sections/Product/ProductNavbar";
import ProductGallery from "@/components/sections/Product/ProductGallery";
import ProductActions from "@/components/sections/Product/ProductActions";
import ProductDetailsAccordion from "@/components/sections/Product/ProductDetailsAccordion";
import DeliveryReturns from "@/components/sections/Product/DeliveryReturns";
import ProductReviews from "@/components/sections/Product/ProductReviews";
import RecommendationGrid from "@/components/sections/Product/RecommendationGrid";

// Ensure page always fetches fresh data
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
    // 1. Await params for Next.js 15+
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Fetch the single product by ID
    const { data: rawProduct, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !rawProduct) {
        console.error("Product fetch error:", error);
        return notFound();
    }

    // Transform the payload to match the UI Contract
    const product = mapSupabaseToUIProduct(rawProduct);

    // --- INJECT THIS X-RAY DIAGNOSTIC BLOCK ---
    console.log("\n====== PDP IMAGE X-RAY ======");
    console.log("1. Product Title:", product?.title);
    console.log("2. Singular 'image' property:", product?.image);
    console.log("3. Plural 'images' array property:", product?.images);
    console.log("4. Raw DB 'images' array:", rawProduct?.images);
    console.log("=============================\n");
    // ------------------------------------------

    // Capitalize category for the breadcrumb UI
    const displayCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);

    return (
        <div className="w-full min-h-screen bg-white pb-24">
            <ProductNavbar />

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6">

                {/* DYNAMIC BREADCRUMBS */}
                <nav className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>&gt;</span>
                    <Link href={`/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">
                        {displayCategory}
                    </Link>
                    <span>&gt;</span>
                    <span className="text-black truncate w-48 md:w-auto">{product.title}</span>
                </nav>

                {/* TOP SPLIT */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16 md:mb-20">
                    <div className="w-full lg:w-[55%]">
                        {/* Passing the images array down so the gallery knows what images to show */}
                        <ProductGallery images={product.images} />
                    </div>
                    <div className="w-full lg:w-[45%]">
                        {/* Passing the product data down for pricing, sizes, colors, and cart logic */}
                        <ProductActions product={product} />
                    </div>
                </div>

                {/* LOGISTICS */}
                <div className="w-full flex flex-col gap-6 border-t border-gray-100 pt-10">
                    <ProductDetailsAccordion product={product} />
                    <DeliveryReturns />
                </div>

                {/* REVIEWS */}
                <ProductReviews productId={product.id} />

                {/* CROSS-SELL GRIDS */}
                <div className="w-full flex flex-col gap-8 md:gap-12 mt-8">
                    <RecommendationGrid
                        title="You Might Also Like"
                        showButton={true}
                        category={product.category}
                        currentProductId={product.id}
                    />
                    <RecommendationGrid
                        title="Recently Viewed"
                        showButton={false}
                    />
                </div>

            </main>
        </div>
    );
}