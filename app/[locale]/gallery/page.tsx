import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export async function generateMetadata(
    { params }: { params: { locale: string } }
): Promise<Metadata> {
    const { locale } = params;
    return locale === "ar"
        ? { title: "معرض الصور الفاخر", description: "استمتع بمشاهدة أفخم تفاصيل كهرمانة بغداد — رحلة بصرية بين التراث والحداثة." }
        : { title: "Luxury Gallery", description: "Experience the luxury of Kahramana Baghdad — a visual journey between heritage and modernity." };
}

export default async function GalleryPage({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const t = await getTranslations("gallery");

    const galleryItems = [
        // BLOCK 1: Hero Intro (Major Arabic Seating)
        {
            src: "/assets/seating/arabic-floor-seating-majlis-iraqi-restaurant.webp",
            alt: t("alt_arabic_seating"),
            className: "md:col-span-2 md:row-span-2",
            priority: true
        },
        {
            src: "/assets/kahramanat_photos/chef-made/kebab.webp",
            alt: t("alt_kebab"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/seating/outdoor-seating-baghdadi-style.webp",
            alt: t("alt_outdoor_seating"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior7.webp",
            alt: t("alt_arabic_seating"),
            className: "md:col-span-2 md:row-span-1"
        },

        // BLOCK 2: Wide Feature (Family Dining)
        {
            src: "/assets/seating/private-family-dining-iraqi-restaurant.webp",
            alt: t("alt_family_seating"),
            className: "md:col-span-2 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior2.webp",
            alt: t("alt_family_seating"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/chef-made/baqala-bil-dihin.webp",
            alt: t("alt_baqala"),
            className: "md:col-span-1 md:row-span-2"
        },

        // BLOCK 3: Tall Feature (Tea Culture)
        {
            src: "/assets/kahramanat_photos/pictures_interior/tea_section.webp",
            alt: t("alt_tea_section"),
            className: "md:col-span-1 md:row-span-2"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/tea_section2.webp",
            alt: t("alt_tea_section"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/chef-made/tea.webp",
            alt: t("alt_tea"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior.webp",
            alt: t("alt_interior_1"),
            className: "md:col-span-2 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/chef-made/falafel.webp",
            alt: t("alt_falafel"),
            className: "md:col-span-1 md:row-span-1"
        },

        // BLOCK 4: Dynamic Duo (Interior Ambiance)
        {
            src: "/assets/kahramanat_photos/chef-made/liver.webp",
            alt: t("alt_liver"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior4.webp",
            alt: t("alt_outdoor_seating"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/chef-made/stuffed_vine_leaves.webp",
            alt: t("alt_vine_leaves"),
            className: "md:col-span-2 md:row-span-2"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior5.webp",
            alt: t("alt_family_seating"),
            className: "md:col-span-2 md:row-span-1"
        },

        // BLOCK 5: Finale
        {
            src: "/assets/kahramanat_photos/chef-made/DSC06211-819x1024.webp",
            alt: t("alt_signature_dish"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior3.webp",
            alt: t("alt_interior_3"),
            className: "md:col-span-1 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/chef-made/DSC06381-scaled.webp",
            alt: t("alt_chef_special"),
            className: "md:col-span-2 md:row-span-1"
        },
        {
            src: "/assets/kahramanat_photos/pictures_interior/pictures_interior6.webp",
            alt: t("alt_ambiance_interior"),
            className: "md:col-span-1 md:row-span-1"
        }
    ];

    return (
        <main className="min-h-screen pb-[var(--space-16)]" style={{ background: "var(--bg-primary)" }}>
            <Hero
                title={locale === "ar" ? "معرض الصور" : "Gallery"}
                subtitle={locale === "ar" ? "قصة تُروى بالألوان والمطعم" : "A story told in colors and flavors"}
                imageUrl="/assets/kahramanat_photos/pictures_interior/pictures_interior5.webp"
                size="sm"
            />

            <section className="max-w-screen-2xl mx-auto px-[var(--space-6)] py-[var(--space-16)]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-[var(--space-16)] gap-[var(--space-8)]">
                    <div className="max-w-2xl">
                        <SectionTitle
                            title={locale === "ar" ? "فخامة التفاصيل" : "Luxury in Detail"}
                            subtitle={locale === "ar" ? "حيث يلتقي عبق التاريخ مع رقي الضيافة المعاصرة" : "Where heritage meets contemporary hospitality excellence"}
                            noPadding
                        />
                    </div>
                    <div className="hidden md:block">
                        <div className="flex gap-[var(--space-2)] text-200 font-black uppercase tracking-[0.4em] leading-none mb-[var(--space-4)]" style={{ color: "var(--color-gold)", opacity: 0.4 }}>
                            <span>Ambiance</span>
                            <span className="w-[var(--space-12)] h-px self-center" style={{ background: "var(--color-gold)", opacity: 0.2 }} />
                            <span>Authenticity</span>
                        </div>
                    </div>
                </div>

                <GalleryGrid items={galleryItems} />

                <div className="mt-[var(--space-16)] text-center relative">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px" style={{ background: "linear-gradient(to right, transparent, var(--color-gold), transparent)", opacity: 0.1 }} />
                    <div className="relative inline-block px-[var(--space-12)]" style={{ background: "var(--bg-primary)" }}>
                        <p className="text-100 font-black uppercase tracking-[0.5em] mb-[var(--space-4)]" style={{ color: "var(--text-body)", opacity: 0.3 }}>
                            Kahramana Baghdad
                        </p>
                        <p className="text-400 max-w-xl italic mx-auto font-medium" style={{ color: "var(--text-body)", opacity: 0.5 }}>
                            {locale === "ar"
                                ? "كل زاوية تروي قصة، وكل طبق هو فصل من فصول الجودة."
                                : "Every corner tells a story, and every dish is a chapter of quality."}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
