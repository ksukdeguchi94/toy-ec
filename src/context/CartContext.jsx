import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("toy-ec-cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("toy-ec-cart");
    };

    const totalItems = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    const totalPrice = useMemo(
        () =>
            cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [cart]
    );

    useEffect(() => {
        try {
            localStorage.setItem("toy-ec-cart", JSON.stringify(cart));
        } catch {
            //保存できなくてもアプリは動かす
        }
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
