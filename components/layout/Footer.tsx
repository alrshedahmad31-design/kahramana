import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Icon from "@/components/ui/Icon";
import branchesData from "@/data/branches.json";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const { branches, brand } = branchesData;

  const links = [
    { href: `/${locale}`, label: tn("home") },
    { href: `/${locale}/menu`, label: tn("menu") },
    { href: `/${locale}/our-story`, label: tn("story") },
    { href: `/${locale}/recipes`, label: tn("recipes") },
    { href: `/${locale}/events`, label: tn("events") },
    { href: `/${locale}/gallery`, label: tn("gallery") },
    { href: `/${locale}/branches`, label: tn("branches") },
  ];

  const socialIcons: Record<string, string> = {
    Instagram: "photo_camera",
    TikTok: "music_note",
    Snapchat: "emoji_emotions",
    Facebook: "public"
  };

  return (
    <footer className="relative overflow-hidden bg-primary pt-[var(--space-16)] pb-[var(--space-12)] border-t-[var(--border-thin)] border-white/5">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/assets/pattern/arabic-pattern.webp')] bg-repeat bg-[size:var(--pattern-size-lg)]" />

      <div className="relative max-w-screen-xl mx-auto px-[var(--space-6)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--space-12)] lg:gap-[var(--space-16)]">

          {/* 1. Brand Identity Section */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-[var(--space-6)] items-center lg:items-start text-center lg:text-start">
            <div className="flex flex-col gap-[var(--space-3)]">
              <div className="flex items-center justify-center lg:justify-start gap-[var(--space-4)]">
                <div className="relative w-[var(--space-16)] h-[var(--space-16)] shrink-0">
                  <Image src="/assets/brand/logo.webp" alt="Kahramana" fill className="object-contain" />
                </div>
                <div>
                  <h2 className="fs-600 fontWeight-black leading-tight">
                    <span className="section-title-gold">
                      {locale === "ar" ? brand.name.ar : brand.name.en}
                    </span>
                  </h2>
                  <p className="fs-100 fontWeight-semi tracking-[0.2em] uppercase text-muted opacity-80">
                    {t("tagline")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[var(--space-3)]">
              {[
                { href: brand.social?.instagram, label: "Instagram" },
                { href: brand.social?.tiktok, label: "TikTok" },
                { href: brand.social?.snapchat, label: "Snapchat" },
                { href: brand.social?.facebook, label: "Facebook" },
              ].filter(({ href }) => !!href).map(({ href, label }) => (
                <a
                  key={label}
                  href={href!} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-11 h-11 relative group flex items-center justify-center transition-transform duration-2 active:scale-95"
                >
                  <div className="absolute inset-0 bg-muted rounded-2 rotate-3 group-hover:rotate-6 group-hover:bg-gold/10 transition-[transform,background-color] duration-3" />
                  <div className="absolute inset-0 border-1 border-gold/30 rounded-2 -rotate-3 group-hover:-rotate-6 transition-transform duration-3" />
                  <Icon
                    name={socialIcons[label] || "link"}
                    size="sm"
                    className="relative z-base text-gold group-hover:scale-110 transition-transform duration-2"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Links */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
            <h3 className="fs-100 fontWeight-black uppercase tracking-[0.25em] text-gold border-b-1 border-gold/20 pb-3">
              {t("links_title")}
            </h3>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href} href={l.href}
                  className="fs-300 fontWeight-semi no-underline text-body hover:text-gold hover:translate-x-1 transition-[color,transform] duration-2 inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-pill bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-2" />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Operational Hours */}
          <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-[var(--space-6)]">
            <h3 className="fs-100 fontWeight-black uppercase tracking-[0.25em] text-gold border-b-[var(--border-thin)] border-gold/20 pb-[var(--space-3)]">
              {t("hours_title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-6)]">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-muted p-[var(--space-5)] rounded-[var(--radius-2)] border-[var(--border-thin)] border-white/5 hover:border-gold/30 transition-colors duration-[var(--motion-mid)] group"
                >
                  <p className="fs-100 fontWeight-black text-gold opacity-60 uppercase tracking-widest mb-1">
                    <span dir="ltr">{b.phone}</span>
                  </p>
                  <p className="fs-300 fontWeight-black text-body mb-1 group-hover:text-gold transition-colors duration-2">
                    {locale === "ar" ? b.name.ar : b.name.en}
                  </p>
                  <p className="fs-200 leading-tight text-muted">
                    {locale === "ar" ? b.hours.ar : b.hours.en}
                  </p>
                </div>
              ))}

              {/* WhatsApp CTA Card */}
              <div className="sm:col-span-2 mt-2">
                <a
                  href={brand.whatsapp_url} target="_blank" rel="noopener noreferrer"
                  className="relative group block overflow-hidden rounded-3xl p-px"
                >
                  {/* Glowing background on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative backdrop-blur-md p-5 flex items-center justify-between transition-[background-color,border-color,transform] duration-3 bg-[var(--color-whatsapp-dark)]/80 group-hover:bg-[var(--color-whatsapp-dark)] border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-3" style={{ background: "var(--color-whatsapp)", boxShadow: "0 0 20px color-mix(in srgb, var(--color-whatsapp), transparent 60%)" }}>
                        <Icon name="chat" className="text-white" />
                      </div>
                      <div>
                        <p className="fs-300 fontWeight-black text-white">{locale === "ar" ? "تحدث معنا عبر واتساب" : "Chat on WhatsApp"}</p>
                        <p className="fs-100 text-white/60 fontWeight-semi">{locale === "ar" ? "الرد خلال دقائق قليلة" : "Replies within minutes"}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex w-10 h-10 rounded-pill bg-white/10 items-center justify-center group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-2">
                      <Icon name="arrow_forward" size="sm" directional className="text-white" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Semantic Copyright Footer */}
        <div className="mt-16 pt-8 border-t-1 border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <p className="fs-100 fontWeight-black text-muted tracking-widest uppercase">
            © {new Date().getFullYear()} {locale === "ar" ? brand.name.ar : brand.name.en} — {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <p className="fs-100 fontWeight-black text-muted tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity duration-2 cursor-default">
              Luxury Experience
            </p>
            <div className="w-1.5 h-1.5 rounded-pill bg-gold" />
            <p className="fs-100 fontWeight-black text-muted tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity duration-2 cursor-default">
              Baghdadi Soul
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
