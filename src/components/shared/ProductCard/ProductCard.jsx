"use client";

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "../WishlistButton";

export default function ProductCard(product) {
    if (!product || Object.keys(product).length === 0) return null;

    const price = Number(product.price) || 0;

    // Extract the new hidePrice boolean from the props
    const { hidePrice } = product;

    return (
        <Link href={`/product/${product.id}`} className="group flex flex-col cursor-pointer">
            {/* Product Image Wrapper */}
            <div className="relative w-full aspect-[4/5] bg-slate-100 rounded-sm overflow-hidden group cursor-pointer">
                <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.title || "Product Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Our new intelligent, global-state connected component */}
                <WishlistButton product={product} />
            </div>

            {/* Clean, Center-Aligned Text Stack Below Image */}
            <div className="mt-3 flex flex-col items-center text-center space-y-1 w-full px-2">
                <h3 className="font-semibold text-sm text-foreground truncate w-full">{product.title}</h3>
                <p className="text-xs text-slate-500">{product.category}</p>

                {/* Conditionally render the price */}
                {!hidePrice && (
                    <p className="font-bold text-sm mt-1">${price.toFixed(2)}</p>
                )}
            </div>
        </Link>
    );
}