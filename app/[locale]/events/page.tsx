import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import EventCard from "@/components/cards/EventCard";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "الفعاليات", description: "اكتشف آخر فعاليات وعروض كهرمانة بغداد — سهرات، مناسبات خاصة وتجارب طعام استثنائية في البحرين." }
    : { title: "Events", description: "Explore the latest Kahramana Baghdad events — evenings, special occasions and exceptional dining experiences in Bahrain." };
}
import eventsData from "@/data/events.json";
import branchesData from "@/data/branches.json";
import Icon from "@/components/ui/Icon";

export default async function EventsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("events");
  const { brand } = branchesData;

  const features = [
    { key: "feature1", iconName: "grid_view" },
    { key: "feature2", iconName: "groups" },
    { key: "feature3", iconName: "local_fire_department" },
    { key: "feature4", iconName: "edit_note" },
  ];

  return (
    <>
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        imageUrl="/assets/catering/royal-arabic-banquets-qoozi-mafthool.webp"
        videoSrc="/assets/hero/hero-catering.mp4"
        videoPoster="/assets/catering/royal-arabic-banquets-qoozi-mafthool.webp"
        cta={{ label: t("whatsapp_cta"), href: brand.whatsapp_url }}
        size="md"
      />

      <div className="px-[var(--space-4)] max-w-screen-lg mx-auto mt-[var(--space-10)] pb-[var(--space-14)]">
        {/* Feature pills */}
        <section className="mb-[var(--space-10)]">
          <SectionTitle title={t("features_title")} className="mb-[var(--space-6)]" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-4)]">
            {features.map(({ key, iconName }) => (
              <div
                key={key}
                className="flex flex-col items-center gap-[var(--space-3)] p-[var(--space-5)] rounded-[var(--radius-3xl)] text-center border"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-1)" }}
              >
                <div className="w-[var(--space-14)] h-[var(--space-14)] rounded-[var(--radius-2xl)] flex items-center justify-center" style={{ background: "var(--bg-muted)" }}>
                  <Icon name={iconName} size="lg" style={{ color: "var(--color-saddle)" }} />
                </div>
                <p className="text-[var(--fs-300)] font-semibold leading-snug" style={{ color: "var(--color-text)" }}>
                  {t(key as "feature1" | "feature2" | "feature3" | "feature4")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-5)]">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>

        {/* CTA block */}
        <div
          className="mt-[var(--space-12)] p-[var(--space-8)] rounded-[var(--radius-3xl)] flex flex-col items-center gap-[var(--space-5)] text-center"
          style={{ background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)" }}
        >
          <p className="text-[var(--fs-500)] font-black text-white">
            {locale === "ar" ? "هل تريد حجز مناسبة معنا؟" : "Want to book an event with us?"}
          </p>
          <a
            href={brand.whatsapp_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-2xl)] font-bold no-underline transition-[opacity,transform] hover:opacity-90 active:scale-95 duration-[var(--motion-fast)]"
            style={{
              height: "var(--tap-min)", paddingInline: "var(--space-7)",
              background: "var(--color-gold)", color: "var(--bg-primary)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <Icon name="chat" />
            {t("whatsapp_cta")}
          </a>
        </div>
      </div>
    </>
  );
}
