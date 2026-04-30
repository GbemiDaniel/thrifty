import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            // The Master Array
            items: [],

            // 1. ADD ITEM
            addItem: (newItem) => {
                const currentItems = get().items;

                // E-commerce logic: We must check if the EXACT variant (ID + Color + Size) already exists in the cart.
                const existingItemIndex = currentItems.findIndex(
                    (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
                );

                if (existingItemIndex !== -1) {
                    // It exists: Just bump the quantity to avoid duplicate line items.
                    const updatedItems = [...currentItems];
                    updatedItems[existingItemIndex].quantity += newItem.quantity;
                    set({ items: updatedItems });
                } else {
                    // It's a new variant: Push it to the array.
                    set({ items: [...currentItems, newItem] });
                }
            },

            // 2. REMOVE ITEM
            // We use a compound key (id-color-size) because just passing 'id' might delete the wrong variant.
            removeItem: (variantKey) => {
                set({
                    items: get().items.filter(
                        (item) => `${item.id}-${item.color}-${item.size}` !== variantKey
                    ),
                });
            },

            // 3. UPDATE QUANTITY
            updateQuantity: (variantKey, newQuantity) => {
                set({
                    items: get().items.map((item) =>
                        `${item.id}-${item.color}-${item.size}` === variantKey
                            ? { ...item, quantity: Math.max(1, newQuantity) } // Prevent negative or zero quantities
                            : item
                    ),
                });
            },

            // 4. NUKE CART (For post-checkout)
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'thrifty-cart-storage', // This is the key Zustand will use in your browser's Local Storage
        }
    )
);