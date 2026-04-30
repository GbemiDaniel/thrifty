import Image from "next/image";
import Link from "next/link";

export default function RecommendationGrid({ title, showButton = false }) {
    // Array of 4 dummy items to fill the grid
    const dummyProducts = [1, 2, 3, 4];

    return (
        <section className="w-full mt-16 md:mt-24">

            {/* Section Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-8 md:mb-10">
                {title}
            </h2>

            {/* The Product Grid: 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {dummyProducts.map((item) => (
                    <Link href={`/product/${item}`} key={item} className="flex flex-col group cursor-pointer">

                        {/* Image Container */}
                        <div className="relative w-full aspect-4/5 bg-[#f5f5f5] rounded-sm overflow-hidden mb-3 md:mb-4">
                            <Image
                                src="/images/product-1.jpg" // Our standard global placeholder
                                alt="Product Recommendation"
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>

                        {/* Product Meta Data */}
                        <div className="flex flex-col items-center text-center">
                            <h3 className="text-sm font-bold text-black uppercase tracking-tight">Product</h3>
                            <p className="text-xs text-gray-500 mb-1">Blue</p>
                            <p className="text-sm font-bold text-black">$40</p>
                        </div>

                    </Link>
                ))}
            </div>

            {/* Conditional View All Button */}
            {showButton && (
                <div className="flex justify-center mt-6">
                    <button className="bg-black text-white px-12 py-3.5 text-sm font-bold tracking-wide hover:bg-black/80 transition-colors rounded-sm">
                        View All
                    </button>
                </div>
            )}

        </section>
    );
}