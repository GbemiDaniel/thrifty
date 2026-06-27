"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images = [] }) {
    // 1. Safe Fallback: Ensure we always have an array to map over
    const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];
    
    // 2. State: Track the currently selected hero image
    const [mainImage, setMainImage] = useState(safeImages[0]);

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:max-h-[650px]">

            {/* THUMBNAILS: 15% width, scrollable, strict square children */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-[15%] order-2 md:order-1 overflow-x-auto md:overflow-y-auto no-scrollbar pb-2 md:pb-0">
                {safeImages.map((imgUrl, index) => (
                    <div 
                        key={index}
                        onClick={() => setMainImage(imgUrl)}
                        className={`relative w-20 md:w-full aspect-square shrink-0 bg-slate-100 rounded-sm cursor-pointer border-2 overflow-hidden transition-all ${
                            mainImage === imgUrl 
                                ? "border-foreground" 
                                : "border-transparent hover:border-foreground/30"
                        }`}
                    >
                        <Image 
                            src={imgUrl} 
                            alt={`Thumbnail ${index + 1}`} 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 15vw"
                        />
                    </div>
                ))}
            </div>

            {/* MAIN HERO: 85% width, strict square, capped height */}
            <div className="relative w-full md:w-[85%] aspect-square md:max-h-[650px] bg-slate-100 rounded-sm order-1 md:order-2 overflow-hidden">
                <Image 
                    src={mainImage} 
                    alt="Main product view" 
                    fill 
                    className="object-cover"
                    priority 
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

        </div>
    );
}