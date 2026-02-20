export { };

declare global {
    interface Window {
        __KH_CART_CONFIG__?: {
            brand?: { whatsapp?: string | null; whatsapp_url?: string | null };
            branches?: { id: string; name: { ar: string; en: string }; phone?: string | null }[];
        };

        openCart?: () => void;
        closeCart?: () => void;
        addToCart?: (id: string, name: string, price: number, image?: string) => void;

        // NEW (for stepper)
        getCartItemQty?: (id: string) => number;
        setCartQty?: (id: string, qty: number) => void;
    }
}
