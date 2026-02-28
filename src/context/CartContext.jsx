import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addToCart = (product, variant, quantity) => {
        setItems((currentItems) => {
            const cartItemId = `${product.product_id}-${variant.variant_id}`;
            const existingItemIndex = currentItems.findIndex((item) => item.cartItemId === cartItemId);
            if (existingItemIndex >= 0) {
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                return [...currentItems, { cartItemId, product, variant, quantity }];
            }
        });
    };

    const removeFromCart = (cartItemId) => {
        setItems((currentItems) => currentItems.filter((item) => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId, delta) => {
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
        return subtotal * 0.08;
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
