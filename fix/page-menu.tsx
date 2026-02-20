import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import MenuTabs from "@/components/menu/MenuTabs";
import menuData from "@/data/menu.json";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "القائمة", description: "تصفح قائمة كهرمانة بغداد — كبة، برياني، مسقوف، تمن وأكلات عراقية تراثية أصيلة." }
    : { title: "Menu", description: "Browse Kahramana Baghdad's menu — kubba, biryani, masgouf, timman and authentic Iraqi heritage dishes." };
}

export default async function MenuPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("menu");

  return (
    <>
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        imageUrl="/assets/hero/hero-menu.webp"
        cta={{ label: t("hero_cta"), href: "#menu-list" }}
        size="sm"
      />

      {/* FIX: was px-4 mt-10 pb-6 (raw Tailwind/hardcoded) → now uses design tokens */}
      <div
        id="menu-list"
        className="max-w-screen-lg mx-auto"
        style={{
          paddingInline: "var(--space-4)",
          marginTop: "var(--space-9)",
          paddingBottom: "var(--space-5)",
        }}
      >
        {(() => {
          const categories = menuData.map((group) => {
            const id = group.category.en.toLowerCase().replace(/\s+/g, "-");
            return {
              id,
              name: group.category,
              icon: "restaurant_menu",
            };
          });

          const items = menuData.flatMap((group) => {
            const categoryId = group.category.en.toLowerCase().replace(/\s+/g, "-");
            return group.items.map((item) => ({
              id: item.id,
              categoryId,
              name: item.name,
              description: item.description,
              price: item.price_bhd,
              image: item.image_url.startsWith("/") ? item.image_url.slice(1) : item.image_url,
              featured: (item as any).featured || (item as any).signature || false,
            }));
          });

          return (
            <MenuTabs
              categories={categories}
              items={items}
              locale={locale}
              labels={{
                all: t("all"),
                search_placeholder: t("search_placeholder"),
                currency: t("currency"),
              }}
            />
          );
        })()}
      </div>
    </>
  );
}
