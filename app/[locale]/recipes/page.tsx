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
import Icon from "@/components/ui/Icon";

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

      <div id="recipes-list" className="px-[var(--space-4)] max-w-screen-lg mx-auto mt-[var(--space-7)] pb-[var(--space-8)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-4)] mb-[var(--space-8)]">
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
            className="mb-[var(--space-8)] p-[var(--space-6)] rounded-[var(--radius-3xl)] border scroll-mt-20"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-1)" }}
          >
            <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-6)]">
              <div className="w-[var(--border-thick)] h-[var(--space-8)] rounded-pill" style={{ background: "var(--color-gold)" }} />
              <h2 className="text-[var(--fs-500)] font-black" style={{ color: "var(--color-text)" }}>
                {locale === "ar" ? recipe.name.ar : recipe.name.en}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-6)]">
              <div>
                <h3 className="flex items-center gap-[var(--space-2)] text-[var(--fs-300)] font-bold mb-[var(--space-3)]" style={{ color: "var(--color-saddle)" }}>
                  <Icon name="list" size="sm" /> {t("ingredients")}
                </h3>
                <ul className="flex flex-col gap-[var(--space-2)]">
                  {(locale === "ar" ? recipe.ingredients.ar : recipe.ingredients.en).map((ing, i) => (
                    <li key={i} className="flex items-center gap-[var(--space-2)] text-[var(--fs-300)]" style={{ color: "var(--color-text)" }}>
                      <span className="w-1.5 h-1.5 rounded-pill shrink-0" style={{ background: "var(--color-gold)" }} />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-[var(--space-2)] text-[var(--fs-300)] font-bold mb-[var(--space-3)]" style={{ color: "var(--color-saddle)" }}>
                  <Icon name="format_list_numbered" size="sm" /> {t("steps")}
                </h3>
                <ol className="flex flex-col gap-[var(--space-3)]">
                  {(locale === "ar" ? recipe.steps.ar : recipe.steps.en).map((step, i) => (
                    <li key={i} className="flex gap-[var(--space-3)] text-[var(--fs-300)]">
                      <span
                        className="w-[var(--space-6)] h-[var(--space-6)] rounded-pill shrink-0 flex items-center justify-center text-[var(--fs-200)] font-black"
                        style={{ background: "var(--color-saddle)", color: "var(--text-body)" }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "var(--color-text)" }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <video className="mt-[var(--space-6)] w-full rounded-[var(--radius-2xl)]" src={`/${recipe.video}`} poster={`/${recipe.image}`} controls preload="none" />
          </article>
        ))}
      </div>
    </>
  );
}
