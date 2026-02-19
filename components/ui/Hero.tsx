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
          ? "h-[var(--hero-h-md)] md:h-[var(--hero-h-lg)] lg:h-[calc(var(--hero-h-lg)+60px)]"
          : size === "sm"
            ? "h-[var(--hero-h-sm)] md:h-[var(--hero-h-md)]"
            : "h-[var(--hero-h-md)] md:h-[calc(var(--hero-h-md)+60px)]",
        "rounded-b-3xl",
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
            ? "var(--hero-overlay-center)"
            : "var(--hero-overlay-bottom)",
        }}
      />

      {/* ── Text + CTAs ───────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-x-0 flex flex-col gap-2 px-4 md:px-8",
          isCenter
            ? "top-1/2 -translate-y-1/2 items-center text-center"
            : "bottom-0 pb-10 md:pb-14"
        )}
      >
        {tagline && (
          <p
            className="font-bold uppercase tracking-wider"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-primary)",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
              marginBottom: "-4px",
            }}
          >
            {tagline}
          </p>
        )}

        <h1
          className="font-black leading-tight section-title-gold"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </h1>

        <p
          className="font-medium"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            lineHeight: "1.4",
            color: "var(--text-on-dark)",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            maxWidth: "50ch",
          }}
        >
          {subtitle}
        </p>

        {(cta || ctaSecondary) && (
          <div className="flex flex-wrap gap-3 mt-2">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center gap-2 font-bold no-underline
                           active:scale-95 hover:brightness-105 transition-all duration-150"
                style={{
                  minHeight: "var(--tap-target)",
                  paddingInline: "var(--space-6)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  background: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                {cta.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 font-bold no-underline
                           active:scale-95 hover:bg-white/20 transition-all duration-150"
                style={{
                  minHeight: "var(--tap-target)",
                  paddingInline: "var(--space-6)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9375rem",
                  border: "2px solid var(--border-subtle)",
                  color: "var(--text-body)",
                  background: "var(--bg-gold-tint)",
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
