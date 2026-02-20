import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  return locale === "ar"
    ? { title: "قصتنا", description: "تعرّف على قصة كهرمانة بغداد — رحلة من بغداد الحقيقية إلى قلب البحرين." }
    : { title: "Our Story", description: "Learn the story of Kahramana Baghdad — a journey from Baghdad to Bahrain." };
}

export default async function StoryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations("story");
  const isRtl = locale === "ar";

  const pillars = [
    { title: t("value_authenticity"), text: t("value_authenticity_text"), iconName: "verified_user", num: "01" },
    { title: t("value_quality"),       text: t("value_quality_text"),       iconName: "workspace_premium", num: "02" },
    { title: t("value_hospitality"),   text: t("value_hospitality_text"),   iconName: "volunteer_activism", num: "03" },
    { title: t("value_innovation"),    text: t("value_innovation_text"),    iconName: "lightbulb", num: "04" },
  ];

  const timeline = [
    { year: "١٩٩٠", yearEn: "1990", label: isRtl ? "البدايات في بغداد" : "Origins in Baghdad" },
    { year: "٢٠٠٥", yearEn: "2005", label: isRtl ? "أول فرع في البحرين" : "First Branch in Bahrain" },
    { year: "٢٠١٥", yearEn: "2015", label: isRtl ? "التوسع والنمو" : "Expansion & Growth" },
    { year: "٢٠٢٤", yearEn: "2024", label: isRtl ? "إرث يتجدد" : "A Legacy Renewed" },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          CINEMATIC ANIMATIONS & GLOBAL STYLES
      ═══════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInStart {
          from { opacity: 0; transform: translateX(${isRtl ? "60px" : "-60px"}); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInEnd {
          from { opacity: 0; transform: translateX(${isRtl ? "-60px" : "60px"}); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes lineGrowV {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          50%       { box-shadow: 0 0 0 8px rgba(212,175,55,0.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Scroll-triggered reveal */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(${isRtl ? "40px" : "-40px"});
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(${isRtl ? "-40px" : "40px"});
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Liquid gold text */
        .liquid-gold-text {
          background: var(--gold-gradient-liquid);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* Cinematic hero overlay */
        .story-hero-overlay {
          background: linear-gradient(
            180deg,
            rgba(110,69,49,0) 0%,
            rgba(110,69,49,0.3) 30%,
            rgba(95,49,26,0.75) 65%,
            rgba(95,49,26,1) 100%
          );
        }

        /* Gold divider line animation */
        .gold-line {
          transform-origin: ${isRtl ? "right" : "left"};
          animation: lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }

        /* Pillar card hover */
        .pillar-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s ease,
                      box-shadow 0.4s ease;
        }
        .pillar-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212,175,55,0.4) !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.08);
        }

        /* Philosophy card hover */
        .phil-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
        }
        .phil-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }

        /* Founder image parallax container */
        .founder-img-wrap {
          animation: scaleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }

        /* Timeline dot pulse */
        .tl-dot {
          animation: pulseGold 2.5s ease-in-out infinite;
        }

        /* Floating decorative orb */
        .orb-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Number label */
        .pillar-num {
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
        }

        /* Section separator */
        .gold-separator {
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          height: 1px;
          width: 100%;
          opacity: 0.25;
        }

        /* Backdrop texture */
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
        }

        /* Reveal delay utilities */
        .delay-1 { transition-delay: 0.1s !important; }
        .delay-2 { transition-delay: 0.2s !important; }
        .delay-3 { transition-delay: 0.3s !important; }
        .delay-4 { transition-delay: 0.4s !important; }
        .delay-5 { transition-delay: 0.5s !important; }
        .delay-6 { transition-delay: 0.6s !important; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          SCROLL OBSERVER SCRIPT
      ═══════════════════════════════════════════════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function init(){
            var els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
            if(!els.length) return;
            var io = new IntersectionObserver(function(entries){
              entries.forEach(function(e){
                if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
              });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
            els.forEach(function(el){ io.observe(el); });
          }
          if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
          else init();
        })();
      `}} />

      <div style={{ background: "var(--bg-primary)", overflow: "hidden" }}>

        {/* ═══════════════════════════════════════════════════════
            01 — CINEMATIC HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="relative" style={{ height: "100svh", minHeight: "600px", maxHeight: "900px" }}>
          {/* Full-bleed image */}
          <Image
            src="/assets/hero/hero-story.webp"
            alt={isRtl ? "كهرمانة بغداد" : "Kahramana Baghdad"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Cinematic gradient overlay */}
          <div className="story-hero-overlay absolute inset-0" />

          {/* Noise texture */}
          <div className="noise-overlay absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} />

          {/* Arabic pattern — very subtle */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")',
              backgroundSize: "300px",
              opacity: 0.025,
              mixBlendMode: "overlay",
            }}
          />

          {/* Decorative corner ornament */}
          <div
            className="absolute top-8 pointer-events-none"
            style={{ insetInlineStart: "var(--space-6)", opacity: 0.35 }}
          >
            <div style={{ width: 48, height: 48, borderTop: "1px solid var(--color-gold)", borderInlineStart: "1px solid var(--color-gold)" }} />
          </div>
          <div
            className="absolute bottom-8 pointer-events-none"
            style={{ insetInlineEnd: "var(--space-6)", opacity: 0.35 }}
          >
            <div style={{ width: 48, height: 48, borderBottom: "1px solid var(--color-gold)", borderInlineEnd: "1px solid var(--color-gold)" }} />
          </div>

          {/* Hero content */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col"
            style={{ paddingBottom: "var(--space-10)", paddingInline: "var(--space-5)" }}
          >
            <div className="max-w-screen-xl mx-auto w-full">
              {/* Eyebrow */}
              <div
                className="flex items-center gap-3 mb-[var(--space-4)]"
                style={{ animation: "fadeIn 1s ease 0.3s both" }}
              >
                <div style={{ width: 32, height: 1, background: "var(--color-gold)" }} />
                <span
                  className="uppercase tracking-[0.3em] font-bold"
                  style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
                >
                  {isRtl ? "قصتنا" : "Our Story"}
                </span>
              </div>

              {/* Main title */}
              <h1
                className="font-black leading-none mb-[var(--space-5)]"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  color: "#ffffff",
                  textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                  animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both",
                  maxWidth: "14ch",
                }}
              >
                {t("hero_title")}
              </h1>

              {/* Subtitle */}
              <p
                className="leading-relaxed max-w-xl"
                style={{
                  fontSize: "var(--fs-400)",
                  color: "rgba(248,244,225,0.85)",
                  animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.7s both",
                }}
              >
                {t("hero_subtitle")}
              </p>

              {/* Scroll CTA */}
              <a
                href="#vision"
                className="inline-flex items-center gap-3 mt-[var(--space-6)]"
                style={{
                  animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both",
                  textDecoration: "none",
                  color: "var(--color-gold)",
                }}
              >
                <span style={{ fontSize: "var(--fs-300)", fontWeight: "var(--fw-bold)", letterSpacing: "0.1em" }}>
                  {isRtl ? "اكتشف القصة" : "Discover the Story"}
                </span>
                <div
                  style={{
                    width: 40, height: 40,
                    border: "1px solid rgba(212,175,55,0.4)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "pulseGold 2.5s ease-in-out infinite",
                  }}
                >
                  <Icon name="arrow_downward" size="sm" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            02 — FOUNDER SECTION (Magazine Layout)
        ═══════════════════════════════════════════════════════ */}
        <section
          id="vision"
          className="relative"
          style={{ paddingBlock: "var(--space-10)" }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")',
              backgroundSize: "400px",
              opacity: 0.025,
            }}
          />

          {/* Floating gold orb — decorative */}
          <div
            className="orb-float absolute pointer-events-none"
            style={{
              width: 400, height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
              top: "10%",
              insetInlineEnd: "-100px",
            }}
          />

          <div
            className="max-w-screen-xl mx-auto relative z-10"
            style={{ paddingInline: "var(--space-4)" }}
          >

            {/* ── Section label ── */}
            <div className="reveal flex items-center gap-4 mb-[var(--space-8)]">
              <span
                className="uppercase tracking-[0.35em] font-bold"
                style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
              >
                {isRtl ? "المؤسس" : "The Founder"}
              </span>
              <div className="gold-line flex-1" style={{ height: 1, background: "linear-gradient(90deg, var(--color-gold), transparent)", opacity: 0.4 }} />
            </div>

            {/* ── Magazine grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-6)] lg:gap-0 items-stretch">

              {/* Image column */}
              <div
                className="reveal-left founder-img-wrap relative"
                style={{ minHeight: 500 }}
              >
                <div
                  className="relative h-full overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-3)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    minHeight: 480,
                  }}
                >
                  <Image
                    src="/assets/founder/founder.webp"
                    alt={t("founder_name")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, transparent 40%, rgba(95,49,26,0.95) 100%)"
                    }}
                  />

                  {/* Name badge — bottom of image */}
                  <div className="absolute bottom-0 inset-x-0 p-[var(--space-6)]">
                    <div
                      style={{
                        borderInlineStart: "3px solid var(--color-gold)",
                        paddingInlineStart: "var(--space-4)",
                      }}
                    >
                      <p
                        className="font-black liquid-gold-text leading-none mb-1"
                        style={{ fontSize: "var(--fs-700)" }}
                      >
                        {t("founder_name")}
                      </p>
                      <p style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}>
                        {t("founder_title")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats badge — floating overlay */}
                <div
                  className="absolute hidden lg:flex flex-col items-center justify-center"
                  style={{
                    bottom: "var(--space-6)",
                    insetInlineEnd: "-var(--space-5)",
                    width: 120, height: 120,
                    borderRadius: "50%",
                    background: "var(--color-gold)",
                    transform: "translateX(50%)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: "var(--fs-800)", color: "var(--color-coffee)" }}
                  >
                    {isRtl ? "+٣٠" : "30+"}
                  </span>
                  <span
                    className="text-center leading-tight"
                    style={{ fontSize: "var(--fs-200)", color: "var(--color-coffee)", fontWeight: "var(--fw-bold)" }}
                  >
                    {isRtl ? "عاماً\nخبرة" : "Years\nExp."}
                  </span>
                </div>
              </div>

              {/* Content column */}
              <div
                className="reveal-right flex flex-col justify-center lg:ps-[var(--space-10)]"
                style={{ paddingBlock: "var(--space-6)" }}
              >
                <h2
                  className="font-black leading-tight mb-[var(--space-6)]"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--text-primary)",
                  }}
                >
                  {t("founder_name")}
                </h2>

                <div
                  className="space-y-[var(--space-4)] mb-[var(--space-7)]"
                  style={{ fontSize: "var(--fs-400)", color: "var(--text-muted)", lineHeight: 1.85 }}
                >
                  <p className="text-justify">{t("founder_bio_1")}</p>
                  <p className="text-justify">{t("founder_bio_2")}</p>
                  <p className="text-justify">{t("founder_bio_3")}</p>
                </div>

                {/* Quote block — premium style */}
                <div
                  className="relative"
                  style={{
                    borderInlineStart: "2px solid var(--color-gold)",
                    paddingInlineStart: "var(--space-6)",
                    paddingBlock: "var(--space-4)",
                    marginInlineStart: "var(--space-2)",
                  }}
                >
                  {/* Giant quote mark */}
                  <span
                    className="absolute font-black select-none pointer-events-none"
                    style={{
                      top: -20,
                      insetInlineStart: "var(--space-4)",
                      fontSize: "6rem",
                      lineHeight: 1,
                      color: "var(--color-gold)",
                      opacity: 0.12,
                      fontFamily: "serif",
                    }}
                  >❝</span>

                  <p
                    className="italic font-bold leading-relaxed"
                    style={{ fontSize: "var(--fs-500)", color: "var(--text-body)" }}
                  >
                    {t("founder_quote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GOLD SEPARATOR
        ═══════════════════════════════════════════════════════ */}
        <div className="gold-separator" />

        {/* ═══════════════════════════════════════════════════════
            03 — TIMELINE
        ═══════════════════════════════════════════════════════ */}
        <section
          className="relative"
          style={{
            paddingBlock: "var(--space-10)",
            background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
          }}
        >
          <div
            className="max-w-screen-xl mx-auto"
            style={{ paddingInline: "var(--space-4)" }}
          >
            {/* Section heading */}
            <div className="reveal text-center mb-[var(--space-10)]">
              <p
                className="uppercase tracking-[0.35em] font-bold mb-[var(--space-3)]"
                style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
              >
                {isRtl ? "الرحلة عبر الزمن" : "Journey Through Time"}
              </p>
              <h2
                className="font-black liquid-gold-text"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                {isRtl ? "محطات كهرمانة" : "Kahramana Milestones"}
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical center line (desktop) */}
              <div
                className="hidden lg:block absolute"
                style={{
                  left: "50%",
                  top: 0, bottom: 0,
                  width: 1,
                  background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.3), transparent)",
                  transform: "translateX(-50%)",
                }}
              />

              <div className="flex flex-col gap-[var(--space-7)]">
                {timeline.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`reveal delay-${idx + 1} flex items-center gap-[var(--space-5)] lg:gap-0`}
                      style={{ justifyContent: "center" }}
                    >
                      {/* Left side (desktop) */}
                      <div
                        className={`hidden lg:flex lg:w-[45%] ${isEven ? "justify-end pe-[var(--space-8)]" : "justify-start ps-[var(--space-8)] order-3"}`}
                      >
                        {isEven ? (
                          <div className="text-end">
                            <p
                              className="font-black liquid-gold-text"
                              style={{ fontSize: "var(--fs-700)" }}
                            >
                              {isRtl ? item.year : item.yearEn}
                            </p>
                            <p style={{ fontSize: "var(--fs-400)", color: "var(--text-body)", fontWeight: "var(--fw-semi)" }}>
                              {item.label}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="px-[var(--space-5)] py-[var(--space-3)] rounded-[var(--radius-2)]"
                            style={{
                              background: "var(--bg-surface)",
                              border: "1px solid var(--border-1)",
                            }}
                          >
                            <p style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}>
                              {item.label}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div
                        className="tl-dot shrink-0"
                        style={{
                          width: 16, height: 16,
                          borderRadius: "50%",
                          background: "var(--color-gold)",
                          border: "3px solid var(--bg-primary)",
                          position: "relative",
                          zIndex: 2,
                        }}
                      />

                      {/* Right side (desktop) */}
                      <div
                        className={`hidden lg:flex lg:w-[45%] ${isEven ? "justify-start ps-[var(--space-8)] order-3" : "justify-end pe-[var(--space-8)]"}`}
                      >
                        {!isEven ? (
                          <div>
                            <p
                              className="font-black liquid-gold-text"
                              style={{ fontSize: "var(--fs-700)" }}
                            >
                              {isRtl ? item.year : item.yearEn}
                            </p>
                            <p style={{ fontSize: "var(--fs-400)", color: "var(--text-body)", fontWeight: "var(--fw-semi)" }}>
                              {item.label}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="px-[var(--space-5)] py-[var(--space-3)] rounded-[var(--radius-2)]"
                            style={{
                              background: "var(--bg-surface)",
                              border: "1px solid var(--border-1)",
                            }}
                          >
                            <p style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}>
                              {item.label}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Mobile layout */}
                      <div className="lg:hidden flex-1">
                        <p
                          className="font-black liquid-gold-text"
                          style={{ fontSize: "var(--fs-600)" }}
                        >
                          {isRtl ? item.year : item.yearEn}
                        </p>
                        <p style={{ fontSize: "var(--fs-300)", color: "var(--text-body)" }}>
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GOLD SEPARATOR
        ═══════════════════════════════════════════════════════ */}
        <div className="gold-separator" />

        {/* ═══════════════════════════════════════════════════════
            04 — PHILOSOPHY TRIO (Staggered Cards)
        ═══════════════════════════════════════════════════════ */}
        <section
          className="relative"
          style={{
            paddingBlock: "var(--space-10)",
            background: "var(--bg-secondary)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")',
              backgroundSize: "400px",
              opacity: 0.025,
            }}
          />

          <div
            className="max-w-screen-xl mx-auto relative z-10"
            style={{ paddingInline: "var(--space-4)" }}
          >
            {/* Section heading */}
            <div className="reveal text-center mb-[var(--space-10)]">
              <p
                className="uppercase tracking-[0.35em] font-bold mb-[var(--space-3)]"
                style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
              >
                {isRtl ? "فلسفتنا" : "Our Philosophy"}
              </p>
              <h2
                className="font-black liquid-gold-text"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                {t("values_title")}
              </h2>
              <p
                className="mt-[var(--space-4)] max-w-2xl mx-auto"
                style={{ fontSize: "var(--fs-400)", color: "var(--text-muted)" }}
              >
                {t("values_subtitle")}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-5)]">
              {[
                { key: "symbolism", icon: "history",     title: t("symbolism_title"), text: t("symbolism_text") },
                { key: "philosophy", icon: "restaurant", title: t("philosophy_title"), text: t("philosophy_text"), featured: true },
                { key: "journey",   icon: "explore",     title: t("journey_title"),   text: t("journey_text") },
              ].map((card, idx) => (
                <div
                  key={card.key}
                  className={`reveal delay-${idx + 1} phil-card relative overflow-hidden`}
                  style={{
                    borderRadius: "var(--radius-3)",
                    background: card.featured
                      ? "linear-gradient(145deg, rgba(212,175,55,0.12), rgba(95,49,26,0.5))"
                      : "rgba(212,175,55,0.03)",
                    border: `1px solid ${card.featured ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.1)"}`,
                    padding: "var(--space-7)",
                    marginTop: card.featured ? 0 : "var(--space-4)",
                    ...(card.featured ? { boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.2)" } : {}),
                  }}
                >
                  {/* Featured badge */}
                  {card.featured && (
                    <div
                      className="absolute top-0 inset-x-0 h-[2px]"
                      style={{ background: "var(--gold-gradient-soft)" }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center mb-[var(--space-5)]"
                    style={{
                      width: 56, height: 56,
                      borderRadius: "var(--radius-2)",
                      background: card.featured ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0.08)",
                      color: "var(--color-gold)",
                    }}
                  >
                    <Icon name={card.icon} size="lg" />
                  </div>

                  <h4
                    className="font-black mb-[var(--space-3)]"
                    style={{
                      fontSize: "var(--fs-500)",
                      color: card.featured ? "var(--color-gold)" : "var(--text-primary)",
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    className="leading-relaxed text-justify"
                    style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GOLD SEPARATOR
        ═══════════════════════════════════════════════════════ */}
        <div className="gold-separator" />

        {/* ═══════════════════════════════════════════════════════
            05 — PILLARS (numbered grid)
        ═══════════════════════════════════════════════════════ */}
        <section
          className="relative"
          style={{ paddingBlock: "var(--space-10)", background: "var(--bg-primary)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")',
              backgroundSize: "400px",
              opacity: 0.025,
            }}
          />

          <div
            className="max-w-screen-xl mx-auto relative z-10"
            style={{ paddingInline: "var(--space-4)" }}
          >
            {/* Heading */}
            <div className="reveal text-center mb-[var(--space-10)]">
              <p
                className="uppercase tracking-[0.35em] font-bold mb-[var(--space-3)]"
                style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
              >
                {isRtl ? "ركائزنا" : "Core Values"}
              </p>
              <h2
                className="font-black"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--text-primary)" }}
              >
                {isRtl ? "ما يميزنا" : "What Sets Us Apart"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-4)]">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`reveal delay-${idx + 1} pillar-card`}
                  style={{
                    borderRadius: "var(--radius-3)",
                    border: "1px solid var(--border-1)",
                    background: "var(--bg-surface)",
                    padding: "var(--space-6)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Large bg number */}
                  <span
                    className="pillar-num absolute font-black select-none pointer-events-none"
                    style={{
                      top: "-10px",
                      insetInlineEnd: "12px",
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: "var(--color-gold)",
                      opacity: 0.06,
                    }}
                  >
                    {pillar.num}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: 48, height: 48,
                      borderRadius: "var(--radius-2)",
                      background: "rgba(212,175,55,0.1)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "var(--space-5)",
                    }}
                  >
                    <Icon name={pillar.iconName} size="md" />
                  </div>

                  {/* Number label */}
                  <p
                    className="pillar-num font-bold mb-[var(--space-2)]"
                    style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)", letterSpacing: "0.1em" }}
                  >
                    {pillar.num}
                  </p>

                  <h5
                    className="font-black mb-[var(--space-3)]"
                    style={{ fontSize: "var(--fs-400)", color: "var(--text-primary)" }}
                  >
                    {pillar.title}
                  </h5>

                  <p
                    className="leading-relaxed text-justify"
                    style={{ fontSize: "var(--fs-300)", color: "var(--text-muted)" }}
                  >
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            06 — CINEMATIC CLOSING IMAGE
        ═══════════════════════════════════════════════════════ */}
        <section
          className="reveal relative"
          style={{
            marginInline: "var(--space-4)",
            marginBottom: "var(--space-9)",
            borderRadius: "var(--radius-3)",
            overflow: "hidden",
            height: "min(60vw, 560px)",
          }}
        >
          <Image
            src="/assets/story/story.webp"
            alt={isRtl ? "أجواء كهرمانة" : "Kahramana Atmosphere"}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(95,49,26,0.92) 0%, rgba(110,69,49,0.5) 50%, rgba(0,0,0,0.2) 100%)"
            }}
          />

          {/* Arabic pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")',
              backgroundSize: "300px",
              opacity: 0.06,
            }}
          />

          {/* Top gold line */}
          <div
            className="absolute top-0 inset-x-0"
            style={{ height: 2, background: "var(--gold-gradient-soft)" }}
          />

          {/* Content */}
          <div
            className="absolute inset-0 flex flex-col justify-center"
            style={{ paddingInline: "clamp(var(--space-5), 6vw, var(--space-12))" }}
          >
            <p
              className="uppercase tracking-[0.35em] font-bold mb-[var(--space-4)]"
              style={{ fontSize: "var(--fs-200)", color: "var(--color-gold)" }}
            >
              {isRtl ? "كهرمانة بغداد" : "Kahramana Baghdad"}
            </p>

            <h2
              className="font-black text-white leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                maxWidth: "16ch",
              }}
            >
              {t("hero_subtitle")}
            </h2>

            {/* Bottom ornament */}
            <div className="flex items-center gap-4 mt-[var(--space-6)]">
              <div style={{ width: 60, height: 1, background: "var(--color-gold)", opacity: 0.6 }} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-gold)", opacity: 0.8 }} />
              <div style={{ width: 32, height: 1, background: "var(--color-gold)", opacity: 0.4 }} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}