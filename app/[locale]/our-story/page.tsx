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
import {
  Quote,
  History,
  Utensils,
  Compass,
  ShieldCheck,
  Award,
  HandHeart,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function StoryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("story");

  const pillars = [
    {
      title: t("value_authenticity"),
      text: t("value_authenticity_text"),
      Icon: ShieldCheck
    },
    {
      title: t("value_quality"),
      text: t("value_quality_text"),
      Icon: Award
    },
    {
      title: t("value_hospitality"),
      text: t("value_hospitality_text"),
      Icon: HandHeart
    },
    {
      title: t("value_innovation"),
      text: t("value_innovation_text"),
      Icon: Lightbulb
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
      <section id="vision" className="max-w-screen-xl mx-auto px-4 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
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
              <div className="absolute bottom-6 inset-x-6 text-white">
                <p className="font-black text-xl liquid-gold">{t("founder_name")}</p>
                <p className="text-sm opacity-90">{t("founder_title")}</p>
              </div>
            </div>
            {/* Decoraive elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--brand-gold)]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--brand-gold)]/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Founder Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[var(--color-primary)]">
                {t("founder_title")}
              </h2>
              <h3 className="text-3xl md:text-4xl font-black leading-tight text-[var(--color-text)]">
                {t("founder_name")}
              </h3>
              <div className="w-16 h-1 bg-[var(--brand-gold)] rounded-full" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-muted)] text-justify">
              <p>{t("founder_bio_1")}</p>
              <p>{t("founder_bio_2")}</p>
              <p>{t("founder_bio_3")}</p>
            </div>

            <div className="relative p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl mt-10 italic">
              <Quote className="absolute -top-4 -start-4 w-10 h-10 text-[var(--brand-gold)] opacity-30 fill-current" />
              <p className="text-xl md:text-2xl font-bold leading-snug text-[var(--color-text)] text-center">
                {t("founder_quote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Philosophy & Grid Section --- */}
      <section className="bg-[var(--color-surface-alt)] py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />

        <div className="max-w-screen-xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black liquid-gold">{t("values_title")}</h2>
            <p className="text-[var(--color-text-muted)] text-lg">{t("values_subtitle")}</p>
            <div className="flex justify-center mt-6">
              <div className="w-12 h-1 bg-[var(--brand-gold)] rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Symbolism */}
            <div className="group p-8 rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-gold)]/10 flex items-center justify-center mb-6 text-[var(--brand-gold)]">
                <History size={28} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-[var(--color-text)]">{t("symbolism_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("symbolism_text")}</p>
            </div>

            {/* Philosophy */}
            <div className="group p-8 rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-all duration-300 transform md:-translate-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-gold)]/10 flex items-center justify-center mb-6 text-[var(--brand-gold)]">
                <Utensils size={28} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-[var(--color-text)]">{t("philosophy_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("philosophy_text")}</p>
            </div>

            {/* Journey */}
            <div className="group p-8 rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[var(--brand-gold)]/10 flex items-center justify-center mb-6 text-[var(--brand-gold)]">
                <Compass size={28} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-[var(--color-text)]">{t("journey_title")}</h4>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-justify">{t("journey_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Pillars Section --- */}
      <section className="max-w-screen-xl mx-auto px-4 py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all hover:border-[var(--brand-gold)]/40 hover:-translate-y-1">
              <pillar.Icon className="w-12 h-12 text-[var(--brand-gold)] mb-6 opacity-80" strokeWidth={1.5} />
              <h5 className="font-black text-lg mb-3 text-[var(--color-text)]">{pillar.title}</h5>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed text-justify">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Brand Image */}
      <section className="max-w-screen-xl mx-auto px-4 pb-20">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden shadow-2xl" style={{ borderRadius: "var(--radius-2xl)" }}>
          <Image
            src="/assets/story/story.webp"
            alt="Kahramana Atmosphere"
            fill
            className="object-cover"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-transparent to-transparent" />
          <div className="absolute bottom-12 inset-x-12 text-center md:text-start">
            <p className="text-white/80 font-medium tracking-[0.2em] uppercase text-xs mb-4">{t("hero_title")}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">{t("hero_subtitle")}</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
