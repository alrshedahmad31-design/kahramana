"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import {
  Home, UtensilsCrossed, MapPin, Sparkles, ChefHat,
  Globe, Menu, X, Bike, BookOpen, Image as ImageLucide
} from "lucide-react";

const NAV_ITEMS = [
  { key: "home", path: "", Icon: Home },
  { key: "menu", path: "/menu", Icon: UtensilsCrossed },
  { key: "story", path: "/our-story", Icon: BookOpen },
  { key: "recipes", path: "/recipes", Icon: ChefHat },
  { key: "events", path: "/events", Icon: Sparkles },
  { key: "gallery", path: "/gallery", Icon: ImageLucide },
  { key: "branches", path: "/branches", Icon: MapPin },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", fn); };
  }, [open]);

  const switchLocale = () => {
    const other = locale === "ar" ? "en" : "ar";
    // Using regex to robustly replace the locale segment
    const newPath = pathname.replace(`/${locale}`, `/${other}`);
    router.push(newPath);
  };

  const isActive = (path: string) => {
    const currentPath = pathname === `/${locale}` ? "" : pathname.replace(`/${locale}`, "");
    return path === "" ? currentPath === "" : currentPath.startsWith(path);
  };

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "shadow-lg bg-[var(--bg-primary)]/95 backdrop-blur-xl py-1" : "shadow-none bg-transparent py-2"
        )}
        style={{
          borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
          height: scrolled ? "var(--nav-top-h)" : "calc(var(--nav-top-h) + 8px)",
        }}
      >
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 md:px-6">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center no-underline group shrink-0"
          >
            <div className="relative w-14 h-14 transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/assets/brand/logo.webp"
                alt="Kahramana"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav (Centered) */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav
              className="flex items-center gap-1 px-1.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 shadow-sm backdrop-blur-md"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map(({ key, path }) => {
                const active = isActive(path);
                return (
                  <Link
                    key={key}
                    href={`/${locale}${path}`}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-[0.8125rem] font-bold no-underline transition-all duration-200",
                      active
                        ? "text-white bg-[var(--brand-gold)] shadow-md active:scale-95"
                        : "text-[var(--text-on-dark)] hover:bg-white/10"
                    )}
                  >
                    {t(key as any)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-3">
            {/* Lang */}
            <button
              onClick={switchLocale}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 rounded-full text-[0.8125rem] font-bold border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]/40 text-[var(--text-body)] transition-all hover:bg-white/10 active:scale-95"
              style={{ height: 48 }}
            >
              <Globe size={16} strokeWidth={2} />
              {t("lang")}
            </button>

            {/* CTA */}
            <a
              href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 font-bold no-underline rounded-full bg-[var(--brand-gold)] text-[var(--bg-primary)] transition-all hover:brightness-105 active:scale-95 shadow-md"
              style={{
                height: 48,
                paddingInline: "var(--space-6)",
                fontSize: "0.8125rem",
              }}
            >
              <Bike size={20} strokeWidth={2.5} />
              {t("order")}
            </a>

            {/* Cart Button */}
            <button
              id="cart-toggle"
              className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-white/10 active:scale-95 shadow-sm relative"
              style={{
                width: 48,
                height: 48,
                color: "var(--brand-gold)",
                background: "var(--bg-gold-tint)",
                border: "1px solid var(--border-subtle)"
              }}
              // @ts-ignore
              onClick={() => window.openCart?.()}
              aria-label={locale === "ar" ? "حقيبة التسوق" : "Shopping Cart"}
            >
              <UtensilsCrossed size={24} strokeWidth={1.75} />
              <span className="cart-badge absolute -top-1 -right-1 flex items-center justify-center bg-[var(--brand-gold)] text-[var(--bg-secondary)] text-[10px] font-bold w-5 h-5 rounded-full border-2 border-[var(--bg-secondary)] pointer-events-none hidden">0</span>
            </button>

            {/* Hamburger (Mobile only) */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-full transition-colors hover:bg-white/10 active:scale-95 shadow-sm"
              style={{
                width: 48,
                height: 48,
                color: "var(--brand-gold)",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border-subtle)"
              }}
              onClick={() => setOpen(true)}
              aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
              aria-expanded={open}
            >
              <Menu size={24} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "color-mix(in srgb, var(--bg-primary) 70%, transparent)", backdropFilter: "blur(8px)" }}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        role="dialog" aria-modal="true"
        className={cn(
          "fixed top-0 bottom-0 z-[70] w-[300px] flex flex-col md:hidden transition-transform duration-300 ease-out",
          locale === "ar"
            ? cn("right-0", open ? "translate-x-0" : "translate-x-full")
            : cn("left-0", open ? "translate-x-0" : "-translate-x-full")
        )}
        style={{
          background: "var(--bg-secondary)",
          boxShadow: "var(--shadow-3)",
          paddingBottom: "env(safe-area-inset-bottom,0px)",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 h-[70px] shrink-0"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative w-12 h-12">
              <Image
                src="/assets/brand/logo.webp"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="font-black text-[1rem]" style={{ color: "var(--text-primary)" }}>
              {locale === "ar" ? "كهرمانة بغداد" : "Kahramana Baghdad"}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            style={{ width: 48, height: 48, color: "var(--text-muted)" }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-1">
          {NAV_ITEMS.map(({ key, path, Icon: NavIcon }) => {
            const active = isActive(path);
            return (
              <Link
                key={key}
                href={`/${locale}${path}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold no-underline transition-all"
                style={{
                  color: active ? "var(--brand-gold)" : "var(--text-body)",
                  background: active ? "var(--bg-tertiary)" : "transparent",
                  fontWeight: active ? "700" : "500",
                }}
              >
                <NavIcon size={18} strokeWidth={active ? 2.5 : 1.75} />
                {t(key as any)}
                {active && (
                  <span
                    className="ms-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--brand-gold)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 flex flex-col gap-2.5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <button
            onClick={switchLocale}
            className="flex items-center justify-center gap-2 rounded-2xl font-semibold border transition-colors hover:bg-white/10"
            style={{
              height: "var(--tap-target)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-body)",
              background: "var(--bg-tertiary)"
            }}
          >
            <Globe size={16} strokeWidth={1.75} />
            {t("lang")}
          </button>
          <a
            href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl font-bold no-underline transition-all hover:brightness-105"
            style={{
              height: "var(--tap-target)",
              background: "var(--brand-gold)",
              color: "var(--bg-primary)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <Bike size={20} strokeWidth={2} />
            {t("order")}
          </a>
        </div>
      </div>
    </>
  );
}
