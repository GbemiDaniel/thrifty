import ProductNavbar from "@/components/sections/Product/ProductNavbar";
import ProductGallery from "@/components/sections/Product/ProductGallery";
import ProductActions from "@/components/sections/Product/ProductActions";
import ProductDetailsAccordion from "@/components/sections/Product/ProductDetailsAccordion";
import DeliveryReturns from "@/components/sections/Product/DeliveryReturns";
import ProductReviews from "@/components/sections/Product/ProductReviews";
import RecommendationGrid from "@/components/sections/Product/RecommendationGrid"; // The new component
import Link from "next/link";

export default function ProductPage() {
    return (
        <div className="w-full min-h-screen bg-white pb-24">
            <ProductNavbar />

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6">

                <nav className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-black">Casual</span>
                </nav>

                {/* TOP SPLIT */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16 md:mb-20">
                    <div className="w-full lg:w-[55%]">
                        <ProductGallery />
                    </div>
                    <div className="w-full lg:w-[45%]">
                        <ProductActions />
                    </div>
                </div>

                {/* LOGISTICS */}
                <div className="w-full flex flex-col gap-6 border-t border-gray-100 pt-10">
                    <ProductDetailsAccordion />
                    <DeliveryReturns />
                </div>

                {/* REVIEWS */}
                <ProductReviews />

                {/* CROSS-SELL GRIDS */}
                <div className="w-full flex flex-col gap-8 md:gap-12 mt-8">
                    <RecommendationGrid title="You Might Also Like" showButton={true} />
                    <RecommendationGrid title="Recently Viewed" showButton={false} />
                </div>

            </main>
        </div>
    );
}