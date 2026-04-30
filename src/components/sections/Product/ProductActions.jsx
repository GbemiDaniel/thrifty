"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore"; // 1. Import the Brain

export default function ProductActions() {
    const [selectedColor, setSelectedColor] = useState("brown");
    const [selectedSize, setSelectedSize] = useState("Large");
    const [quantity, setQuantity] = useState(1);

    // 2. Hook into the Store
    const addItem = useCartStore((state) => state.addItem);

    const colors = [
        { id: "brown", hex: "#5C4033" },
        { id: "green", hex: "#1A4331" },
        { id: "navy", hex: "#1C2331" }
    ];

    const sizes = ["Small", "Medium", "Large", "X-Large"];

    // 3. The Dispatch Function
    const handleAddToCart = () => {
        const newItem = {
            id: "nike-sweatshirt-001", // Hardcoded ID since there's no DB
            name: "NIKE SWEATSHIRT",
            price: 260,
            image: "/images/Product-1.jpg", // Placeholder image reference for the cart
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        };

        addItem(newItem);
        console.log("Vault updated:", newItem); // Temporary proof of life
    };

    return (
        <div className="flex flex-col w-full text-foreground">

            {/* Title & Reviews */}
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">
                NIKE SWEATSHIRT
            </h1>

            <div className="flex items-center gap-2 mb-6">
                <div className="text-warning text-lg tracking-widest">★★★★<span className="text-muted-foreground/30">★</span></div>
                <span className="text-sm font-medium text-muted-foreground">4.5/5</span>
            </div>

            {/* Pricing Block */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">$260</span>
                <span className="text-2xl font-medium text-muted-foreground line-through">$300</span>
                <span className="bg-sale/10 text-sale text-xs font-bold px-2 py-1 rounded-sm">
                    -40%
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            <hr className="border-border mb-6" />

            {/* Color Selector */}
            <div className="mb-6">
                <span className="block text-sm font-medium text-foreground mb-3">Select Colors</span>
                <div className="flex gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: color.hex }}
                        >
                            {selectedColor === color.id && (
                                <span className="text-background text-xs">✓</span>
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
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedSize === size
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:bg-border"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions Row */}
            <div className="flex gap-4 w-full">
                {/* Local Quantity Control */}
                <div className="flex items-center justify-between bg-muted rounded-full w-32 h-12 px-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl text-muted-foreground">−</button>
                    <span className="text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-xl text-muted-foreground">+</button>
                </div>

                {/* 4. The Trigger */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-foreground text-background rounded-full text-sm font-bold tracking-wide h-12 hover:bg-foreground/80 transition-colors"
                >
                    Add to Cart
                </button>
            </div>

        </div>
    );
}