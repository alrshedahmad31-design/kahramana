import type { ReactNode } from "react";
import Script from "next/script";
import { headers } from "next/headers";
import branchesData from "@/data/branches.json";

type CartBranch = {
    id: string;
    name: { ar: string; en: string };
    phone?: string | null;
};

type CartConfig = {
    brand: {
        whatsapp?: string | null;
        whatsapp_url?: string | null;
    };
    branches: CartBranch[];
};

export default function RootLayout({ children }: { children: ReactNode }) {
    const locale = headers().get("x-next-intl-locale") ?? "ar";
    const dir = locale === "ar" ? "rtl" : "ltr";

    const cartConfig: CartConfig = {
        brand: {
            whatsapp: branchesData.brand?.whatsapp ?? null,
            whatsapp_url: branchesData.brand?.whatsapp_url ?? null,
        },
        branches: (branchesData.branches ?? []).map((b) => ({
            id: b.id,
            name: b.name,
            phone: b.phone ?? null,
        })),
    };

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <head>
                {/* Local font preloads */}
                <link
                    rel="preload"
                    href="/assets/fonts/cairo-arabic-400.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/assets/fonts/cairo-arabic-600.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/assets/fonts/cairo-arabic-700.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/assets/fonts/cairo-arabic-900.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                {/* Material Symbols */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,200..700,0..1,-50..200"
                />
            </head>

            <body>
                {children}

                <Script id="kh-cart-config" strategy="beforeInteractive">
                    {`window.__KH_CART_CONFIG__=${JSON.stringify(cartConfig)};`}
                </Script>
                <Script src="/cart.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
