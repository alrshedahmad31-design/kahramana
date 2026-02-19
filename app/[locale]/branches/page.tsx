import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import BranchSection from "@/components/sections/BranchSection";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "فروعنا", description: "تعرّف على فروع كهرمانة بغداد في البحرين — الرفاع (الحجيات) والمحرق (قلالي). مواعيد العمل والموقع وطرق التواصل." }
    : { title: "Our Branches", description: "Find Kahramana Baghdad branches in Bahrain — Riffa (Hajiyat) and Muharraq (Galali). Hours, location and contact details." };
}
import Icon from "@/components/ui/Icon";
import branchesData from "@/data/branches.json";

export default async function BranchesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("branches");
  const tc = await getTranslations("common");
  const { branches, brand } = branchesData;

  const labels = {
    talk_title: t("talk_title"),
    talk_body: t("talk_body"),
    hours: t("hours"),
    open_map: t("open_map"),
    call: t("call"),
    order_menu: t("order_menu"),
    open_now: tc("open_now"),
    closed_now: tc("closed_now"),
    opens_at: t.raw("opens_at"),
    coming_soon: t("coming_soon"),
    address_label: locale === "ar" ? "العنوان" : "Address"
  };

  return (
    <>
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        imageUrl="/assets/hero/hero-branches.webp"
        cta={{ label: t("open_map"), href: branches[0].maps }}
        size="md"
      />

      {/* "Let's Talk" Intro Section - Once at the top */}
      <section className="bg-[var(--color-surface)] py-16 border-b relative overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
          style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />

        <div className="max-w-screen-md mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black mb-6" style={{ color: "var(--color-text)" }}>{labels.talk_title}</h2>
          <p className="text-lg leading-relaxed opacity-90 text-justify" style={{ color: "var(--color-text-muted)" }}>
            {labels.talk_body}
          </p>
        </div>
      </section>

      <div className="w-full flex flex-col">
        {branches.map((branch) => (
          <BranchSection
            key={branch.id}
            branch={branch}
            locale={locale}
            t={labels}
            talabatUrl={branch.id === "riffa-hajiyat" ? brand.talabat_hajiyat : brand.talabat_galali}
          />
        ))}
      </div>

      <div className="px-6 max-w-screen-xl mx-auto py-20 pb-32">
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 liquid-gold">
              {t.raw("faq.title")}
            </h2>
            <div className="w-16 h-1 bg-[var(--base-gold)] mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {(t.raw("faq.items") as any[]).map((item, i) => (
              <details
                key={i}
                className="group p-6 rounded-3xl border transition-all hover:border-[var(--base-gold)]/40 bg-[var(--color-surface)] relative overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none grayscale invert"
                  style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />

                <summary className="flex items-center justify-between cursor-pointer font-bold text-lg list-none relative z-10">
                  <span className="pe-8">{item.q}</span>
                  <span className="ms-2 transition-transform group-open:rotate-180 opacity-60">
                    <Icon name="expand_more" size="sm" />
                  </span>
                </summary>
                <div className="pt-4 text-[var(--color-text-muted)] leading-relaxed text-justify relative z-10">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (t.raw("faq.items") as any[]).map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })
        }}
      />
    </>
  );
}
