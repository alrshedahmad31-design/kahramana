/**
 * Hero — unified component used identically across all 6 pages.
 *
 * Heights (token-driven):
 *   sm  → --hero-h-sm  (360px)  compact pages: menu, recipes
 *   md  → --hero-h-md  (420px)  standard pages: branches, events, story
 *   lg  → --hero-h-lg  (520px)  home / main landing
 *
 * Overlay:
 *   bottom  → strong bottom-up gradient (text at foot)
 *   center  → flat scrim (text centered)
 */
"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaItem { label: string; href: string }

export interface HeroProps {
  title: string;
  subtitle: string;
  tagline?: string;
  imageUrl: string;
  videoSrc?: string;
  videoPoster?: string;
  cta?: CtaItem;
  ctaSecondary?: CtaItem;
  /** Visual size variant — maps to design token heights */
  size?: "sm" | "md" | "lg";
  /** Content alignment */
  align?: "bottom" | "center";
  priority?: boolean;
  className?: string;
}

const heightVar: Record<"sm" | "md" | "lg", string> = {
  sm: "var(--hero-h-sm)",
  md: "var(--hero-h-md)",
  lg: "var(--hero-h-lg)",
};

export default function Hero({
  title,
  subtitle,
  tagline,
  imageUrl,
  videoSrc,
  videoPoster,
  cta,
  ctaSecondary,
  size = "md",
  align = "bottom",
  priority = true,
  className,
}: HeroProps) {
  const isCenter = align === "center";

  return (
    <section
      aria-label={title}
      className={cn(
        "relative w-full overflow-hidden",
        // Responsive height: token on mobile, bump at md/lg breakpoints
        size === "lg"
          ? "h-[var(--hero-h-sm)] md:h-[var(--hero-h-md)] lg:h-[var(--hero-h-lg)]"
          : size === "sm"
            ? "h-[var(--hero-h-sm)] md:h-[var(--hero-h-sm)]"
            : "h-[var(--hero-h-sm)] md:h-[var(--hero-h-md)]",
        "rounded-b-[var(--radius-3xl)]",
        className
      )}
    >
      {/* ── Background media ──────────────────────────────────────── */}
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          poster={videoPoster ?? imageUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
        />
      )}

      {/* ── Gradient overlay ──────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: isCenter
            ? "var(--bg-overlay-deep)"
            : "linear-gradient(to top, var(--bg-overlay-deep) 0%, color-mix(in srgb, black 40%, transparent) 50%, transparent 100%)",
        }}
      />

      {/* ── Text + CTAs ───────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-x-0 flex flex-col gap-[var(--space-2)] px-[var(--space-4)] md:px-[var(--space-8)]",
          isCenter
            ? "top-1/2 -translate-y-1/2 items-center text-center"
            : "bottom-0 pb-[var(--space-10)] md:pb-[var(--space-14)]"
        )}
      >
        {tagline && (
          <p
            className="font-black uppercase tracking-wider"
            style={{
              fontSize: "var(--fs-300)",
              color: "var(--metallic-gold)",
              textShadow: "var(--shadow-text-sm)",
              marginBottom: "-4px",
            }}
          >
            {tagline}
          </p>
        )}

        <h1
          className="font-black leading-tight section-title-gold"
          style={{
            fontSize: "clamp(2rem, 6vw, var(--fs-900))",
          }}
        >
          {title}
        </h1>

        <p
          className="font-semibold"
          style={{
            fontSize: "clamp(1rem, 2.5vw, var(--fs-600))",
            lineHeight: "var(--lh-tight)",
            color: "var(--text-body)",
            textShadow: "var(--shadow-text-sm)",
            maxWidth: "50ch",
          }}
        >
          {subtitle}
        </p>

        {(cta || ctaSecondary) && (
          <div className="flex flex-wrap gap-[var(--space-3)] mt-[var(--space-2)]">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center gap-2 font-black no-underline
                           active:scale-95 hover:brightness-105 transition-[filter,transform,box-shadow] duration-[var(--dur-2)]"
                style={{
                  minHeight: "var(--tap-min)",
                  paddingInline: "var(--space-6)",
                  borderRadius: "var(--radius-1)",
                  fontSize: "var(--fs-400)",
                  background: "var(--metallic-gold)",
                  color: "var(--coffee-bean)",
                  boxShadow: "var(--glow-gold)",
                }}
              >
                {cta.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 font-black no-underline
                           active:scale-95 hover:bg-white/20 transition-[background-color,transform] duration-[var(--dur-2)]"
                style={{
                  minHeight: "var(--tap-min)",
                  paddingInline: "var(--space-6)",
                  borderRadius: "var(--radius-1)",
                  fontSize: "var(--fs-400)",
                  border: "2px solid var(--border-1)",
                  color: "var(--text-body)",
                  background: "var(--bg-muted)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
