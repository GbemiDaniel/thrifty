// src/hooks/useCarousel.js
import { useState, useEffect } from "react";

export function useCarousel(length, autoPlayInterval = 5000) {
    const [[page, direction], setPage] = useState([0, 0]);

    // Derived state for the actual array index
    const slideIndex = Math.abs(page % length);

    // The Pagination Logic
    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    // The Auto-Play Engine
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, autoPlayInterval);

        // Cleanup interval on unmount or manual interaction
        return () => clearInterval(timer);
    }, [page, autoPlayInterval]);

    return { page, direction, slideIndex, paginate };
}