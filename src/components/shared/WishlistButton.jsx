"use client";

import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistButton({ product }) {
    const { items, toggleItem } = useWishlistStore();
    
    // Check if this specific product exists in the global store
    const isLiked = items.some((item) => item.id === product.id);

    const handleClick = (e) => {
        e.preventDefault(); // Prevent Next.js Link navigation
        e.stopPropagation(); // Stop click from bubbling up to parent wrappers
        toggleItem(product);
    };

    return (
        <button 
            onClick={handleClick}
            // Dynamic styling: Always visible if liked. Fade-in on group-hover if unliked.
            className={`absolute bottom-3 right-3 p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110 z-10 ${
                isLiked 
                    ? "bg-white opacity-100 text-red-500" 
                    : "bg-white/70 backdrop-blur-md opacity-0 group-hover:opacity-100 text-slate-700 hover:bg-white"
            }`}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill={isLiked ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
        </button>
    );
}
