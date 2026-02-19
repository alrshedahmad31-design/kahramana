import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import "@/app/globals.css";

const BASE = "https://kahramanat.com";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const isAr = locale === "ar";

  const title = isAr
    ? "كهرمانة بغداد | Kahramana Baghdad"
    : "Kahramana Baghdad | كهرمانة بغداد";
  const desc = isAr
    ? "مطعم عراقي أصيل في البحرين — نكهات بغداد الحقيقية من كبة وبرياني وأكلات تراثية."
    : "Authentic Iraqi restaurant in Bahrain — the true flavors of Baghdad: kubba, biryani & heritage cuisine.";

  return {
    metadataBase: new URL(BASE),
    title: {
      default: title,
      template: isAr ? "%s | كهرمانة بغداد" : "%s | Kahramana Baghdad",
    },
    description: desc,
    robots: { index: true, follow: true },
    manifest: "/assets/brand/site.webmanifest",
    icons: {
      icon: [
        { url: "/assets/brand/favicon.ico" },
        { url: "/assets/brand/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/assets/brand/apple-touch-icon.png",
    },
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        ar: `${BASE}/ar`,
        en: `${BASE}/en`,
        "x-default": `${BASE}/ar`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "كهرمانة بغداد | Kahramana Baghdad",
      locale: isAr ? "ar_BH" : "en_BH",
      alternateLocale: isAr ? "en_BH" : "ar_BH",
      title,
      description: desc,
      url: `${BASE}/${locale}`,
      images: [{
        url: "/assets/brand/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kahramana Baghdad",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: ["/assets/brand/og-image.webp"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as "ar" | "en")) notFound();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Cairo Font Preload — ensures local woff2 is loaded early */}
        <link
          rel="preload"
          href="/assets/fonts/cairo-arabic-400.woff2"
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

        {/* Material Symbols Rounded */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />

        <Script src="/js/cart.js" strategy="lazyOnload" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
          <BottomNav />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-FQRT7CX2KY" />
        <GoogleTagManager gtmId="GTM-T8BP6SM8" />
      </body>
    </html>
  );
}
