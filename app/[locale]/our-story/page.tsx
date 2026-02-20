import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import Image from "next/image";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "قصتنا", description: "تعرّف على قصة كهرمانة بغداد — رحلة من بغداد الحقيقية إلى قلب البحرين، نحمل معنا إرث الطعام العراقي الأصيل." }
    : { title: "Our Story", description: "Learn the story of Kahramana Baghdad — a journey from the heart of Baghdad to Bahrain, carrying the legacy of authentic Iraqi cuisine." };
}
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export default async function StoryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("story");

  const pillars = [
    {
      title: t("value_authenticity"),
      text: t("value_authenticity_text"),
      iconName: "verified_user"
    },
    {
      title: t("value_quality"),
      text: t("value_quality_text"),
      iconName: "workspace_premium"
    },
    {
      title: t("value_hospitality"),
      text: t("value_hospitality_text"),
      iconName: "volunteer_activism"
    },
    {
      title: t("value_innovation"),
      text: t("value_innovation_text"),
      iconName: "lightbulb"
    },
  ];

  return (
    <div className="bg-[var(--color-bg)]">
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        imageUrl="/assets/hero/hero-story.webp"
        cta={{ label: t("hero_cta"), href: "#vision" }}
        size="md"
      />

      {/* --- Founder's Vision Section --- */}
      <section id="vision" className="max-w-screen-xl mx-auto px-[var(--space-4)] py-[var(--space-9)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: 'var(--pattern-size-lg)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-6)] items-center relative z-10">
          {/* Founder Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-[var(--color-border)]" style={{ borderRadius: "var(--radius-2xl)" }}>
              <Image
                src="/assets/founder/founder.webp"
                alt={t("founder_name")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent" />
              <div className="absolute bottom-[var(--space-6)] inset-x-[var(--space-6)] text-white">
                <p className="font-black text-[var(--fs-500)] liquid-gold">{t("founder_name")}</p>
                <p className="text-[var(--fs-300)] opacity-90">{t("founder_title")}</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-[var(--space-12)] h-[var(--space-12)] bg-[var(--color-gold)]/10 rounded-pill blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-[var(--space-12)] h-[var(--space-12)] bg-[var(--color-gold)]/10 rounded-pill blur-3xl -z-10" />
          </div>

          {/* Founder Content Column */}
          <div className="lg:col-span-7 space-y-[var(--space-8)]">
            <div className="space-y-[var(--space-4)]">
              <h2 className="text-[var(--fs-200)] font-black uppercase tracking-widest text-[var(--color-primary)]">
                {t("founder_title")}
              </h2>
              <h3 className="text-[var(--fs-700)] md:text-[var(--fs-800)] font-black leading-tight text-[var(--color-text)]">
                {t("founder_name")}
              </h3>
              <div className="w-[var(--space-6)] h-[var(--border-thick)] bg-[var(--color-gold)] rounded-pill" />
            </div>

            <div className="space-y-[var(--space-6)] text-[var(--fs-400)] leading-relaxed text-[var(--color-text-muted)] text-justify">
              <p>{t("founder_bio_1")}</p>
              <p>{t("founder_bio_2")}</p>
              <p>{t("founder_bio_3")}</p>
            </div>

            <div className="relative p-[var(--space-8)] rounded-[var(--radius-3xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl mt-[var(--space-10)] italic">
              <Icon name="format_quote" className="absolute -top-4 -start-4 w-[var(--space-12)] h-[var(--space-12)] text-[var(--color-gold)] opacity-30" filled />
              <p className="text-[var(--fs-500)] md:text-[var(--fs-600)] font-bold leading-snug text-[var(--color-text)] text-center">
                {t("founder_quote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Philosophy & Grid Section --- */}
      <section className="bg-[var(--color-surface-alt)] py-[var(--space-10)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: 'var(--pattern-size-lg)' }} />

        <div className="max-w-screen-xl mx-auto px-[var(--space-4)] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-[var(--space-16)] space-y-[var(--space-4)]">
            <h2 className="text-[var(--fs-700)] md:text-[var(--fs-900)] font-black liquid-gold">{t("values_title")}</h2>
            <p className="text-[var(--color-text-muted)] text-[var(--fs-400)]">{t("values_subtitle")}</p>
            <div className="flex justify-center mt-[var(--space-6)]">
              <div className="w-[var(--space-12)] h-[var(--border-thick)] bg-[var(--color-gold)] rounded-pill" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-8)]">
            {/* Symbolism */}
            <div className="group p-[var(--space-8)] rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-[var(--space-14)] h-[var(--space-14)] rounded-[var(--radius-2xl)] bg-[var(--color-gold)]/10 flex items-center justify-center mb-[var(--space-6)] text-[var(--color-gold)]">
                <Icon name="history" size="lg" />
              </div>
              <h4 className="text-[var(--fs-500)] font-bold mb-[var(--space-4)] text-[var(--color-text)]">{t("symbolism_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("symbolism_text")}</p>
            </div>

            {/* Philosophy */}
            <div className="group p-[var(--space-8)] rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-shadow transition-transform duration-300 transform md:-translate-y-4">
              <div className="w-[var(--space-14)] h-[var(--space-14)] rounded-[var(--radius-2xl)] bg-[var(--color-gold)]/10 flex items-center justify-center mb-[var(--space-6)] text-[var(--color-gold)]">
                <Icon name="restaurant" size="lg" />
              </div>
              <h4 className="text-[var(--fs-500)] font-bold mb-[var(--space-4)] text-[var(--color-text)]">{t("philosophy_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("philosophy_text")}</p>
            </div>

            {/* Journey */}
            <div className="group p-[var(--space-8)] rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-[var(--space-14)] h-[var(--space-14)] rounded-[var(--radius-2xl)] bg-[var(--color-gold)]/10 flex items-center justify-center mb-[var(--space-6)] text-[var(--color-gold)]">
                <Icon name="explore" size="lg" />
              </div>
              <h4 className="text-[var(--fs-500)] font-bold mb-[var(--space-4)] text-[var(--color-text)]">{t("journey_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("journey_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Pillars Section --- */}
      <section className="max-w-screen-xl mx-auto px-[var(--space-4)] py-[var(--space-10)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: 'var(--pattern-size-lg)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-6)] relative z-10">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-[var(--space-8)] rounded-[var(--radius-3xl)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-[colors,transform] hover:border-[var(--color-gold)]/40 hover:-translate-y-1 duration-[var(--motion-mid)]">
              <Icon name={pillar.iconName} size="lg" className="text-[var(--color-gold)] mb-[var(--space-6)] opacity-80" />
              <h5 className="font-black text-[var(--fs-400)] mb-[var(--space-3)] text-[var(--color-text)]">{pillar.title}</h5>
              <p className="text-[var(--fs-300)] text-[var(--color-text-muted)] leading-relaxed text-justify">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Brand Image */}
      <section className="max-w-screen-xl mx-auto px-[var(--space-4)] pb-[var(--space-9)]">
        <div className="relative h-[var(--hero-gallery-h)] overflow-hidden shadow-2xl" style={{ borderRadius: "var(--radius-2xl)" }}>
          <Image
            src="/assets/story/story.webp"
            alt="Kahramana Atmosphere"
            fill
            className="object-cover"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-transparent to-transparent" />
          <div className="absolute bottom-[var(--space-12)] inset-x-[var(--space-12)] text-center md:text-start">
            <p className="text-white/80 font-medium tracking-[0.2em] uppercase text-[var(--fs-200)] mb-[var(--space-4)]">{t("hero_title")}</p>
            <h2 className="text-[var(--fs-700)] md:text-[var(--fs-900)] font-black text-white leading-tight max-w-2xl">{t("hero_subtitle")}</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
