"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export default function ProductActions({ product }) {
    if (!product) return null;

    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
    const [quantity, setQuantity] = useState(1);

    // UX State for the button
    const [isAdded, setIsAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);
    const numericPrice = parseFloat(String(product.price).replace(/[^0-9.]/g, ''));

    const handleAddToCart = () => {
        const newItem = {
            id: product.id,
            name: product.title,
            price: numericPrice,
            // Fallback just in case the catalog uses 'images' array instead of 'image' string
            image: product.images?.[0] || product.image,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        };

        addItem(newItem);

        toast.success("Added to cart", { description: `${product.title} has been added to your bag.` });

        // Visual feedback
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col w-full text-foreground">

            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">
                {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
                <div className="text-warning text-lg tracking-widest">★★★★<span className="text-muted-foreground/30">★</span></div>
                <span className="text-sm font-medium text-muted-foreground">4.5/5</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">{product.price}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {product.description}
            </p>

            <hr className="border-border mb-6" />

            {/* Color Selector */}
            <div className="mb-6">
                <span className="block text-sm font-medium text-foreground mb-3">Select Colors</span>
                <div className="flex gap-3">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-border"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                            {selectedColor === color.name && (
                                <span className="text-background text-xs drop-shadow-md">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-border mb-6" />

            {/* Size Selector */}
            <div className="mb-8">
                <span className="block text-sm font-medium text-foreground mb-3">Choose Size</span>
                <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${selectedSize === size
                                ? "bg-foreground text-background border-foreground"
                                : "bg-muted text-muted-foreground border-border hover:bg-border"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions Row */}
            <div className="flex gap-4 w-full">
                <div className="flex items-center justify-between bg-muted rounded-full w-32 h-12 px-4 border border-border">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl text-muted-foreground hover:text-foreground transition-colors">−</button>
                    <span className="text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-xl text-muted-foreground hover:text-foreground transition-colors">+</button>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 rounded-full text-sm font-bold tracking-wide h-12 transition-all duration-300 ${isAdded
                            ? "bg-green-600 text-white"
                            : "bg-foreground text-background hover:bg-foreground/80"
                        }`}
                >
                    {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                </button>
            </div>

        </div>
    );
}