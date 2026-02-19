import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import RecipeCard from "@/components/cards/RecipeCard";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "وصفاتنا", description: "تعلّم أسرار وصفات كهرمانة بغداد — طريقة تحضير الكبة والبرياني وأشهر الأكلات العراقية في منزلك." }
    : { title: "Recipes", description: "Learn the secrets of Kahramana Baghdad recipes — how to prepare kubba, biryani and the most famous Iraqi dishes at home." };
}
import recipesData from "@/data/recipes.json";
import { List, ListOrdered } from "lucide-react";

export default async function RecipesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("recipes");

  return (
    <>
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        imageUrl="/assets/hero/hero-recipes.webp"
        cta={{ label: t("hero_cta"), href: "#recipes-list" }}
        size="sm"
      />

      <div id="recipes-list" className="px-4 max-w-screen-lg mx-auto mt-10 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {recipesData.map((recipe) => (
            <RecipeCard
              key={recipe.id} recipe={recipe} locale={locale}
              labels={{ prep_time: t("prep_time"), cook_time: t("cook_time"), minutes: t("minutes"), watch: t("watch") }}
            />
          ))}
        </div>

        {recipesData.map((recipe) => (
          <article
            key={recipe.id} id={recipe.id}
            className="mb-8 p-6 rounded-3xl border scroll-mt-20"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-1)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: "var(--brand-gold)" }} />
              <h2 className="text-xl font-black" style={{ color: "var(--color-text)" }}>
                {locale === "ar" ? recipe.name.ar : recipe.name.en}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold mb-3" style={{ color: "var(--brand-spice)" }}>
                  <List size={16} strokeWidth={2} /> {t("ingredients")}
                </h3>
                <ul className="flex flex-col gap-2">
                  {(locale === "ar" ? recipe.ingredients.ar : recipe.ingredients.en).map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text)" }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--brand-gold)" }} />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold mb-3" style={{ color: "var(--base-saddle)" }}>
                  <ListOrdered size={16} strokeWidth={2} /> {t("steps")}
                </h3>
                <ol className="flex flex-col gap-3">
                  {(locale === "ar" ? recipe.steps.ar : recipe.steps.en).map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span
                        className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-black"
                        style={{ background: "var(--brand-spice)", color: "#fff" }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "var(--color-text)" }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <video className="mt-6 w-full rounded-2xl" src={`/${recipe.video}`} poster={`/${recipe.image}`} controls preload="none" />
          </article>
        ))}
      </div>
    </>
  );
}
