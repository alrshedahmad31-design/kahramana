"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import Icon from "@/components/ui/Icon";

const NAV_ITEMS = [
  { key: "home", path: "" },
  { key: "menu", path: "/menu" },
  { key: "story", path: "/our-story" },
  { key: "recipes", path: "/recipes" },
  { key: "events", path: "/events" },
  { key: "gallery", path: "/gallery" },
  { key: "branches", path: "/branches" },
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
          "fixed top-0 inset-x-0 transition-[background-color,padding,box-shadow,height,border-color] duration-[var(--motion-slow)]",
          scrolled ? "shadow-[var(--shadow-1)] backdrop-blur-xl py-[var(--space-1)]" : "shadow-none py-[var(--space-2)]"
        )}
        style={{
          zIndex: "var(--z-nav)",
          borderBottom: `1px solid ${scrolled ? "var(--border-1)" : "transparent"}`,
          background: scrolled ? "color-mix(in srgb, var(--bg-primary) 95%, transparent)" : "transparent",
          height: scrolled ? "var(--nav-top-h)" : "calc(var(--nav-top-h) + 8px)",
        }}
      >
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-[var(--space-4)] md:px-[var(--space-6)]">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center no-underline group shrink-0"
          >
            <div
              className="relative transition-transform group-hover:scale-105 duration-[var(--motion-slow)]"
              style={{ width: "var(--space-7)", height: "var(--space-7)" }}
            >
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
              className="flex items-center gap-1 px-1.5 py-1 rounded-[var(--radius-pill)] backdrop-blur-md"
              style={{
                border: "1px solid var(--border-subtle)",
                background: "color-mix(in srgb, var(--bg-secondary) 50%, transparent)",
                boxShadow: "var(--shadow-1)",
              }}
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map(({ key, path }) => {
                const active = isActive(path);
                return (
                  <Link
                    key={key}
                    href={`/${locale}${path}`}
                    className="relative px-4 py-2 rounded-[var(--radius-pill)] no-underline transition-[background-color,color,transform] duration-[var(--motion-mid)] active:scale-95"
                    style={{
                      fontSize: "var(--fs-300)",
                      fontWeight: "var(--fw-bold)",
                      color: active ? "#ffffff" : "rgba(255,255,255,0.8)",
                      background: active ? "var(--color-gold)" : "transparent",
                      boxShadow: active ? "var(--shadow-1)" : "none",
                    }}
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
              className="hidden sm:inline-flex items-center gap-2 px-4 rounded-[var(--radius-pill)] transition-[background-color,transform] duration-[var(--motion-mid)] hover:bg-white/10 active:scale-95"
              style={{
                height: "var(--tap-min)",
                fontSize: "var(--fs-300)",
                fontWeight: "var(--fw-bold)",
                border: "1px solid var(--border-1)",
                background: "var(--bg-surface)",
                color: "var(--text-body)",
              }}
            >
              <Icon name="language" size="sm" />
              {t("lang")}
            </button>

            {/* CTA */}
            <a
              href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 no-underline rounded-[var(--radius-pill)] transition-[filter,transform,box-shadow] duration-[var(--motion-mid)] hover:brightness-105 active:scale-95"
              style={{
                height: "var(--tap-min)",
                paddingInline: "var(--space-6)",
                fontSize: "var(--fs-300)",
                fontWeight: "var(--fw-black)",
                background: "var(--color-gold)",
                color: "var(--color-coffee)",
                boxShadow: "var(--shadow-1)",
              }}
            >
              <Icon name="delivery_dining" />
              {t("order")}
            </a>

            {/* Cart Button */}
            <button
              id="cart-toggle"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] transition-[background-color,transform] duration-[var(--motion-mid)] hover:bg-white/10 active:scale-95 relative"
              style={{
                width: "var(--tap-min)",
                height: "var(--tap-min)",
                color: "var(--color-gold)",
                background: "var(--bg-muted)",
                border: "1px solid var(--border-1)",
                boxShadow: "var(--shadow-1)",
              }}
              // @ts-ignore
              onClick={() => window.openCart?.()}
              aria-label={locale === "ar" ? "حقيبة التسوق" : "Shopping Cart"}
            >
              <Icon name="shopping_basket" />
              <span
                className="cart-badge absolute -top-1 -right-1 flex items-center justify-center rounded-[var(--radius-pill)] pointer-events-none hidden"
                style={{
                  width: "var(--space-4)",
                  height: "var(--space-4)",
                  background: "var(--color-gold)",
                  color: "var(--dark-walnut)",
                  fontSize: "var(--fs-100)",
                  fontWeight: "var(--fw-black)",
                  border: "2px solid var(--dark-walnut)",
                }}
              >0</span>
            </button>

            {/* Hamburger (Mobile only) */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-[var(--radius-pill)] transition-[background-color,transform] duration-[var(--motion-mid)] hover:bg-white/10 active:scale-95"
              style={{
                width: "var(--tap-min)",
                height: "var(--tap-min)",
                color: "var(--color-gold)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-1)",
                boxShadow: "var(--shadow-1)",
              }}
              onClick={() => setOpen(true)}
              aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
              aria-expanded={open}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 md:hidden transition-opacity duration-[var(--motion-slow)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          zIndex: "var(--z-drawer)",
          background: "color-mix(in srgb, var(--coffee-bean) 70%, transparent)",
          backdropFilter: "blur(8px)",
        }}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        role="dialog" aria-modal="true"
        className={cn(
          "fixed top-0 bottom-0 flex flex-col md:hidden transition-transform duration-[var(--motion-mid)] ease-out",
          locale === "ar"
            ? cn("right-0", open ? "translate-x-0" : "translate-x-full")
            : cn("left-0", open ? "translate-x-0" : "-translate-x-full")
        )}
        style={{
          zIndex: "var(--z-modal)",
          width: "var(--nav-drawer-w)",
          background: "var(--dark-walnut)",
          boxShadow: "var(--shadow-3)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-[var(--space-5)] h-[var(--nav-top-h)] shrink-0"
          style={{ borderBottom: "1px solid var(--border-1)" }}
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
            <span
              className="font-black"
              style={{ fontSize: "var(--fs-400)", color: "var(--text-primary)" }}
            >
              {locale === "ar" ? "كهرمانة بغداد" : "Kahramana Baghdad"}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] hover:bg-white/10 transition-colors duration-[var(--motion-mid)]"
            style={{ width: "var(--tap-min)", height: "var(--tap-min)", color: "var(--text-muted)" }}
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-[var(--space-4)] py-[var(--space-4)] gap-1">
          {NAV_ITEMS.map(({ key, path }) => {
            const active = isActive(path);
            return (
              <Link
                key={key}
                href={`/${locale}${path}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-2)] transition-[background-color,color] duration-[var(--motion-mid)] no-underline"
                style={{
                  fontWeight: "var(--fw-semi)",
                  color: active ? "var(--color-gold)" : "var(--text-body)",
                  background: active ? "var(--bg-surface)" : "transparent",
                }}
              >
                <Icon
                  name={key === "home" ? "home" :
                    key === "menu" ? "restaurant_menu" :
                      key === "story" ? "history" :
                        key === "recipes" ? "menu_book" :
                          key === "events" ? "event" :
                            key === "gallery" ? "image" :
                              key === "branches" ? "location_on" : "link"}
                  size="sm"
                  filled={active}
                />
                {t(key as any)}
                {active && (
                  <span
                    className="ms-auto w-1.5 h-1.5 rounded-[var(--radius-pill)]"
                    style={{ background: "var(--color-gold)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div
          className="p-[var(--space-4)] flex flex-col gap-2.5"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <button
            onClick={switchLocale}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-2)] transition-colors duration-[var(--motion-mid)] hover:bg-white/10"
            style={{
              height: "var(--tap-min)",
              fontWeight: "var(--fw-semi)",
              border: "1px solid var(--border-1)",
              color: "var(--text-body)",
              background: "var(--bg-surface)",
            }}
          >
            <Icon name="language" size="sm" />
            {t("lang")}
          </button>
          <a
            href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-[var(--radius-2)] no-underline transition-[filter,transform] duration-[var(--motion-mid)] hover:brightness-105 active:scale-95"
            style={{
              height: "var(--tap-min)",
              fontWeight: "var(--fw-black)",
              background: "var(--color-gold)",
              color: "var(--color-coffee)",
              boxShadow: "var(--glow-gold)",
            }}
          >
            <Icon name="delivery_dining" />
            {t("order")}
          </a>
        </div>
      </div>
    </>
  );
}
