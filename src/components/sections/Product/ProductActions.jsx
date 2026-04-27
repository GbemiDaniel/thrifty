"use client";
import { useState } from "react";

export default function ProductActions() {
    const [selectedColor, setSelectedColor] = useState("brown");
    const [selectedSize, setSelectedSize] = useState("Large");
    const [quantity, setQuantity] = useState(1);

    const colors = [
        { id: "brown", hex: "#5C4033" },
        { id: "green", hex: "#1A4331" },
        { id: "navy", hex: "#1C2331" }
    ];

    const sizes = ["Small", "Medium", "Large", "X-Large"];

    return (
        <div className="flex flex-col w-full text-black">

            {/* Title & Reviews */}
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3">
                NIKE SWEATSHIRT
            </h1>

            <div className="flex items-center gap-2 mb-6">
                <div className="text-[#FFC107] text-lg tracking-widest">★★★★<span className="text-gray-300">★</span></div>
                <span className="text-sm font-medium text-gray-500">4.5/5</span>
            </div>

            {/* Pricing Block */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">$260</span>
                <span className="text-2xl font-medium text-gray-400 line-through">$300</span>
                <span className="bg-[#FFEAEA] text-[#FF4D4D] text-xs font-bold px-2 py-1 rounded-sm">
                    -40%
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            <hr className="border-gray-200 mb-6" />

            {/* Color Selector */}
            <div className="mb-6">
                <span className="block text-sm font-medium text-gray-700 mb-3">Select Colors</span>
                <div className="flex gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ backgroundColor: color.hex }}
                        >
                            {selectedColor === color.id && (
                                <span className="text-white text-xs">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Size Selector */}
            <div className="mb-8">
                <span className="block text-sm font-medium text-gray-700 mb-3">Choose Size</span>
                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedSize === size
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions Row */}
            <div className="flex gap-4 w-full">
                {/* Quantity */}
                <div className="flex items-center justify-between bg-gray-100 rounded-full w-[120px] h-12 px-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl text-gray-600">−</button>
                    <span className="text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-xl text-gray-600">+</button>
                </div>

                {/* Add to Cart */}
                <button className="flex-1 bg-black text-white rounded-full text-sm font-bold tracking-wide h-12 hover:bg-black/80 transition-colors">
                    Add to Cart
                </button>
            </div>

        </div>
    );
}