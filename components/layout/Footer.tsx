import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Instagram, Music, MessageCircle, Facebook, Ghost } from "lucide-react";
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

  return (
    <footer className="relative overflow-hidden bg-[var(--bg-primary)] pt-16 pb-12 border-t border-[var(--border-subtle)]">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/assets/pattern/arabic-pattern.webp')] bg-repeat bg-[size:400px]" />

      <div className="relative max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* 1. Brand Identity Section */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 items-center lg:items-start text-center lg:text-start">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="relative w-16 h-16 shrink-0">
                  <Image src="/assets/brand/logo.webp" alt="Kahramana" fill className="object-contain" />
                </div>
                <div>
                  <h2 className="text-2xl font-black leading-tight">
                    <span className="section-title-gold">
                      {locale === "ar" ? brand.name.ar : brand.name.en}
                    </span>
                  </h2>
                  <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] opacity-80">
                    {t("tagline")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: brand.social?.instagram, Icon: Instagram, label: "Instagram" },
                { href: brand.social?.tiktok, Icon: Music, label: "TikTok" },
                { href: brand.social?.snapchat, Icon: Ghost, label: "Snapchat" },
                { href: brand.social?.facebook, Icon: Facebook, label: "Facebook" },
              ].filter(({ href }) => !!href).map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href!} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-11 h-11 relative group flex items-center justify-center transition-all duration-300 active:scale-95"
                >
                  <div className="absolute inset-0 bg-[var(--bg-secondary)] rounded-2xl rotate-3 group-hover:rotate-6 group-hover:bg-[var(--brand-gold)]/10 transition-all duration-300" />
                  <div className="absolute inset-0 border border-[var(--border-gold)]/30 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-all duration-300" />
                  <Icon size={20} strokeWidth={1.5} className="relative z-10 text-[var(--brand-gold)] group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Links */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--brand-gold)] border-b border-[var(--border-gold)]/20 pb-3">
              {t("links_title")}
            </h3>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href} href={l.href}
                  className="text-sm font-medium no-underline text-[var(--text-body)] hover:text-[var(--brand-gold)] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Operational Hours */}
          <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[var(--brand-gold)] border-b border-[var(--border-gold)]/20 pb-3">
              {t("hours_title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-[var(--bg-secondary)]/30 p-5 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-gold)]/30 transition-colors group"
                >
                  <p className="text-[10px] font-bold text-[var(--brand-gold)] opacity-60 uppercase tracking-widest mb-1">
                    <span dir="ltr">{b.phone}</span>
                  </p>
                  <p className="text-sm font-black text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-gold)] transition-colors">
                    {locale === "ar" ? b.name.ar : b.name.en}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
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
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--brand-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative backdrop-blur-md p-5 flex items-center justify-between transition-all duration-300 bg-[var(--wa-bg)] group-hover:bg-[var(--wa-bg-hover)] border border-[var(--wa-border)] group-hover:border-[var(--wa-border-hover)]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: "var(--wa-green)", boxShadow: "0 0 20px var(--wa-green-glow)" }}>
                        <MessageCircle size={24} strokeWidth={2.5} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{locale === "ar" ? "تحدث معنا عبر واتساب" : "Chat on WhatsApp"}</p>
                        <p className="text-[10px] text-white/60 font-medium">{locale === "ar" ? "الرد خلال دقائق قليلة" : "Replies within minutes"}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d={locale === "ar" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14m-7-7 7 7-7 7"} />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Semantic Copyright Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
            © {new Date().getFullYear()} {locale === "ar" ? brand.name.ar : brand.name.en} — {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
              Luxury Experience
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />
            <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
              Baghdadi Soul
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
