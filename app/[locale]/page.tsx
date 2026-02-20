import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import branchesData from "@/data/branches.json";
import StatsSection from "@/components/sections/StatsSection";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "الرئيسية", description: "اكتشف عالم كهرمانة بغداد — مطعم عراقي أصيل في البحرين يقدم أشهى الأكلات البغدادية التراثية." }
    : { title: "Home", description: "Discover Kahramana Baghdad — an authentic Iraqi restaurant in Bahrain serving the finest traditional Baghdadi cuisine." };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const { brand } = branchesData;

  const categories = [
    { id: "charcoal-grills", name: { ar: "المشاوي", en: "Grills" }, image: "assets/gallery/menu-categories/charcoal-grills.webp" },
    { id: "soups", name: { ar: "الشوربات", en: "Soups" }, image: "assets/gallery/menu-categories/soups.webp" },
    { id: "salads", name: { ar: "السلطات", en: "Salads" }, image: "assets/gallery/menu-categories/salads.webp" },
    { id: "main-courses", name: { ar: "الأطباق الرئيسية", en: "Main Courses" }, image: "assets/gallery/menu-categories/main-courses.webp" },
    { id: "shawarma", name: { ar: "الشاورما", en: "Shawarma" }, image: "assets/gallery/menu-categories/shawarma.webp" },
    { id: "pizza", name: { ar: "البيتزا", en: "Pizza" }, image: "assets/gallery/menu-categories/pizza.webp" },
  ];

  const reviews = [
    {
      name: "Shnayka Ahmed", initials: "SA",
      title: locale === "ar" ? "تجربة عراقية أصيلة بطعم لا يُنسى" : "Authentic Iraqi experience",
      text: locale === "ar" ? "الأكل خيالي بكل معنى الكلمة! شوربة غنية، ظلي رقبة طري ولذيذ، بامية مضروبة على أصولها، حمص باللحم، كباب مميز، وخبز تنور يكمّل التجربة." : "The food is fantastic! Rich soup, tender neck, perfect okra, hummus with meat, special kebab, and tandoor bread."
    },
    {
      name: "Moayd Hamada", initials: "MH",
      title: locale === "ar" ? "طعم البيت العراقي.. بنكهة احترافية" : "Iraqi home taste",
      text: locale === "ar" ? "مطعم يستحق التجربة بكل أمانة. نظافة عالية، أسعار مناسبة، والأهم طعم عراقي أصلي يحسسك بأكل البيت لكن بجودة مطاعم راقية." : "Worth trying honestly. High cleanliness, suitable prices, and authentic Iraqi taste."
    },
    {
      name: "Yousef Alqahtani", initials: "YA",
      title: locale === "ar" ? "مشويات مميزة وخدمة راقية" : "Special grills & service",
      text: locale === "ar" ? "أفضل مطعم مشويات جربته في البحرين. جودة اللحم ممتازة، التقديم أنيق، والخدمة أكثر من رائعة." : "Best grill restaurant in Bahrain. Excellent meat quality and elegant presentation."
    },
    {
      name: "Deanero", initials: "D",
      title: locale === "ar" ? "أجواء هادئة وكرم ضيافة" : "Quiet atmosphere",
      text: locale === "ar" ? "مطعم لطيف بأجواء هادئة، طاقم ودود جدًا. الشاورما لذيذة، وتم تقديم بطاطس وشاي مجانًا، لفتة جميلة تعكس كرم الضيافة." : "Nice atmosphere, friendly staff. Delicious shawarma and great hospitality."
    },
    {
      name: "Zainab Alnahash", initials: "ZA",
      title: locale === "ar" ? "طعم متوازن وأسعار معقولة" : "Balanced taste & prices",
      text: locale === "ar" ? "طلبنا قوزي لحم مع مشويات وطبقين رز. الأكل لذيذ، الكمية مناسبة، والأسعار معقولة جدًا مقارنة بالجودة." : "Delicious food, appropriate quantity, and very reasonable prices."
    },
    {
      name: "Rawan Almattar", initials: "RA",
      title: locale === "ar" ? "خدمة مميزة تكمّل التجربة" : "Special service",
      text: locale === "ar" ? "الأكل لذيذ ويستحق التجربة، والتعامل كان راقي جدًا. شكر خاص للموظفين على حسن الاستقبال والاهتمام بالتفاصيل." : "Delicious food, worth trying, and very upscale treatment."
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        tagline={t("hero_tagline")}
        imageUrl="/assets/hero/hero-poster.webp"
        videoSrc="/assets/hero/hero-poster.mp4"
        videoPoster="/assets/hero/hero-poster.webp"
        cta={{ label: t("hero_cta_menu"), href: `/${locale}/menu` }}
        ctaSecondary={{ label: t("hero_cta_talabat"), href: brand.talabat_general }}
        size="lg"
      />

      <div className="max-w-screen-lg mx-auto px-[var(--space-4)] overflow-hidden mb-[var(--space-9)]">
        {/* Stats Section */}
        <StatsSection t={{
          years_num: t("stats_years_num"),
          years_label: t("stats_years_label"),
          dishes_num: t("stats_dishes_num"),
          dishes_label: t("stats_dishes_label"),
          branches_num: t("stats_branches_num"),
          branches_label: t("stats_branches_label"),
          rating_num: t("stats_rating_num"),
          rating_label: t("stats_rating_label"),
        }} />

        {/* Category Explorer */}
        <section className="mt-[var(--space-9)]">
          <SectionTitle title={t("categories_title")} subtitle={t("categories_subtitle")} centered />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[var(--space-4)] mt-[var(--space-7)]">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/${locale}/menu#${cat.id}`}
                className="group relative h-48 rounded-3xl overflow-hidden border no-underline transition-shadow transition-colors hover:border-[var(--color-gold)] hover:shadow-2xl"
                style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
              >
                <Image
                  src={`/${cat.image}`}
                  alt={locale === "ar" ? cat.name.ar : cat.name.en}
                  fill
                  className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="font-black text-lg text-white">
                    {locale === "ar" ? cat.name.ar : cat.name.en}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-[var(--space-10)] py-[var(--space-8)] px-[var(--space-5)] rounded-[var(--radius-2xl)]" style={{ background: "var(--bg-tertiary)" }}>
          <SectionTitle title={t("reviews_title")} subtitle={t("reviews_subtitle")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-4)] mt-[var(--space-5)]">
            {reviews.map((rev, i) => (
              <div key={i} className="flex flex-col p-8 rounded-3xl border space-y-4 h-full" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "var(--brand-gold)", color: "var(--bg-primary)" }}>
                    {rev.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{rev.name}</p>
                    <div className="text-[10px] items-center gap-1 flex" style={{ color: "var(--brand-gold)" }}>
                      <Icon name="check_circle" size="xs" filled />
                      {t("verified")}
                    </div>
                  </div>
                </div>

                <div className="space-y-[var(--space-2)] flex-grow">
                  <p className="text-[var(--fs-300)] font-bold leading-tight" style={{ color: "var(--brand-gold)" }}>
                    {rev.title}
                  </p>
                  <p className="text-[var(--fs-300)] italic leading-relaxed text-justify" style={{ color: "var(--text-body)" }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="flex gap-[var(--space-1)] pt-[var(--space-2)]" style={{ color: "var(--brand-gold)" }}>
                  {[...Array(5)].map((_, i) => <Icon key={i} name="star" size="xs" filled />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery CTA */}
        <section className="mt-[var(--space-10)] py-[var(--space-8)] px-[var(--space-5)] text-center border-y border-[var(--border-subtle)]">
          <SectionTitle
            title={locale === "ar" ? "معرض الصور" : "Gallery Exhibits"}
            subtitle={locale === "ar" ? "استعرض أجواءنا العراقية الأصيلة وأطباقنا الفاخرة" : "Explore our authentic Iraqi ambiance and premium dishes"}
            centered
          />
          <div className="mt-8">
            <Link
              href={`/${locale}/gallery`}
              className="inline-flex items-center gap-[var(--space-2)] px-[var(--space-8)] py-[var(--space-3)] rounded-[var(--radius-2)] font-bold text-[var(--fs-300)] transition-opacity transition-transform hover:opacity-90 active:scale-95"
              style={{ background: "var(--brand-gold)", color: "var(--bg-primary)", boxShadow: "var(--shadow-gold)" }}
            >
              {locale === "ar" ? "مشاهدة معرض الصور كاملاً" : "View Full Gallery"}
            </Link>
          </div>
        </section>
      </div>

      {/* Restaurant JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": locale === "ar" ? "كهرمانة بغداد" : "Kahramana Baghdad",
            "image": "https://kahramanat.com/assets/brand/og-image.webp",
            "url": `https://kahramanat.com/${locale}`,
            "telephone": "+97317131413",
            "servesCuisine": ["Iraqi", "Middle Eastern"],
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": locale === "ar" ? "منطقة الحجيات، شارع الحجيات الرئيسي" : "Hajiyat Area, Hajiyat Main Street",
              "addressLocality": locale === "ar" ? "الرفاع" : "Riffa",
              "addressCountry": "BH",
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "07:00",
              "closes": "01:00",
            },
            "sameAs": [
              "https://www.instagram.com/kahramanat_b/",
              "https://www.tiktok.com/@kahramanat_b",
              "https://www.facebook.com/kahramanat1",
            ],
          }),
        }}
      />
    </>
  );
}
