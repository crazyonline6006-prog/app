import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, ProductVariant } from '../data/mockData';

export type CartItem = {
    cartItemId: string; // Unique ID for the cart row (e.g., product_id + variant_id)
    product: Product;
    variant: ProductVariant;
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
        setItems((currentItems) => {
            const cartItemId = `${product.product_id}-${variant.variant_id}`;
            const existingItemIndex = currentItems.findIndex((item) => item.cartItemId === cartItemId);

            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // Add new item
                return [...currentItems, { cartItemId, product, variant, quantity }];
            }
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, delta: number) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.cartItemId === cartItemId) {
                    const newQuantity = item.quantity + delta;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const subtotal = useMemo(() => {
        return items.reduce((total, item) => total + item.variant.price * item.quantity, 0);
    }, [items]);

    const tax = useMemo(() => {
        return subtotal * 0.08; // Assuming 8% tax rate
    }, [subtotal]);

    const total = useMemo(() => {
        return subtotal + tax;
    }, [subtotal, tax]);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                itemCount,
                subtotal,
                tax,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
