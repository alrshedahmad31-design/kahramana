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
import { LayoutGrid, Users, Flame, FileEdit, MessageCircle } from "lucide-react";

export default async function EventsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("events");
  const { brand } = branchesData;

  const features = [
    { key: "feature1", Icon: LayoutGrid },
    { key: "feature2", Icon: Users },
    { key: "feature3", Icon: Flame },
    { key: "feature4", Icon: FileEdit },
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

      <div className="px-4 max-w-screen-lg mx-auto mt-10 pb-14">
        {/* Feature pills */}
        <section className="mb-10">
          <SectionTitle title={t("features_title")} className="mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map(({ key, Icon }) => (
              <div
                key={key}
                className="flex flex-col items-center gap-3 p-5 rounded-3xl text-center border"
                style={{ background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-1)" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "var(--bg-tertiary)" }}>
                  <Icon size={24} strokeWidth={1.75} style={{ color: "var(--brand-spice)" }} />
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: "var(--color-text)" }}>
                  {t(key as "feature1" | "feature2" | "feature3" | "feature4")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>

        {/* CTA block */}
        <div
          className="mt-12 p-8 rounded-3xl flex flex-col items-center gap-5 text-center"
          style={{ background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)" }}
        >
          <p className="text-xl font-black text-white">
            {locale === "ar" ? "هل تريد حجز مناسبة معنا؟" : "Want to book an event with us?"}
          </p>
          <a
            href={brand.whatsapp_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl font-bold no-underline transition-all hover:brightness-110"
            style={{
              height: "var(--tap-target)", paddingInline: "var(--space-7)",
              background: "var(--brand-gold)", color: "var(--bg-primary)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <MessageCircle size={20} strokeWidth={2} />
            {t("whatsapp_cta")}
          </a>
        </div>
      </div>
    </>
  );
}
