import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            // The Master Array
            items: [],

            // Dynamic Getter
            getWishlistCount: () => get().items.length,

            // 1. TOGGLE ITEM (Add if missing, Remove if present)
            toggleItem: (product) => {
                const currentItems = get().items;
                const exists = currentItems.some((item) => item.id === product.id);

                if (exists) {
                    // It's in the wishlist: Remove it
                    set({ items: currentItems.filter((item) => item.id !== product.id) });
                } else {
                    // It's not in the wishlist: Add it
                    set({ items: [...currentItems, product] });
                }
            },

            // 2. NUKE WISHLIST
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'thrifty-wishlist-storage', // Browser Local Storage Key
        }
    )
);
