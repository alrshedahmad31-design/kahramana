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
          "fixed top-0 inset-x-0 z-nav transition-[background-color,padding,box-shadow,height,border-color] duration-[var(--motion-slow)]",
          scrolled ? "shadow-1 bg-primary/95 backdrop-blur-xl py-[var(--space-1)]" : "shadow-none bg-transparent py-[var(--space-2)]"
        )}
        style={{
          borderBottom: `1px solid ${scrolled ? "var(--border-1)" : "transparent"}`,
          height: scrolled ? "var(--nav-top-h, 60px)" : "calc(var(--nav-top-h, 60px) + 8px)",
        }}
      >
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-[var(--space-4)] md:px-[var(--space-6)]">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center no-underline group shrink-0"
          >
            <div className="relative w-[var(--space-7)] h-[var(--space-7)] transition-transform group-hover:scale-105 duration-[var(--motion-slow)]">
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
                      "relative px-4 py-2 rounded-pill fs-300 fontWeight-bold no-underline transition-[background-color,color,transform] duration-2",
                      active
                        ? "text-white bg-gold shadow-1 active:scale-95"
                        : "text-white/80 hover:bg-white/10"
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
              className="hidden sm:inline-flex items-center gap-2 px-4 rounded-pill fs-300 fontWeight-bold border border-1 bg-surface text-body transition-[background-color,transform] duration-2 hover:bg-white/10 active:scale-95"
              style={{ height: "var(--tap-min)" }}
            >
              <Icon name="language" size="sm" />
              {t("lang")}
            </button>

            {/* CTA */}
            <a
              href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 fontWeight-bold no-underline rounded-pill bg-gold text-coffee transition-[filter,transform,box-shadow] duration-2 hover:brightness-105 active:scale-95 shadow-1"
              style={{
                height: "var(--tap-min)",
                paddingInline: "var(--space-6)",
                fontSize: "var(--fs-300)",
              }}
            >
              <Icon name="delivery_dining" />
              {t("order")}
            </a>

            {/* Cart Button */}
            <button
              id="cart-toggle"
              className="inline-flex items-center justify-center rounded-pill transition-[background-color,transform] duration-2 hover:bg-white/10 active:scale-95 shadow-1 relative"
              style={{
                width: "var(--tap-min)",
                height: "var(--tap-min)",
                color: "var(--color-gold)",
                background: "var(--bg-muted)",
                border: "1px solid var(--border-1)"
              }}
              // @ts-ignore
              onClick={() => window.openCart?.()}
              aria-label={locale === "ar" ? "حقيبة التسوق" : "Shopping Cart"}
            >
              <Icon name="shopping_basket" />
              <span className="cart-badge absolute -top-1 -right-1 flex items-center justify-center bg-gold text-dark-walnut text-[10px] fontWeight-black w-[var(--space-4)] h-[var(--space-4)] rounded-pill border-2 border-dark-walnut pointer-events-none hidden">0</span>
            </button>

            {/* Hamburger (Mobile only) */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-pill transition-[background-color,transform] duration-2 hover:bg-white/10 active:scale-95 shadow-1"
              style={{
                width: "var(--tap-min)",
                height: "var(--tap-min)",
                color: "var(--color-gold)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-1)"
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
          "fixed inset-0 z-drawer md:hidden transition-opacity duration-3",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "color-mix(in srgb, var(--coffee-bean) 70%, transparent)", backdropFilter: "blur(8px)" }}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        role="dialog" aria-modal="true"
        className={cn(
          "fixed top-0 bottom-0 z-modal w-[var(--nav-drawer-w)] flex flex-col md:hidden transition-transform duration-[var(--motion-mid)] ease-out",
          locale === "ar"
            ? cn("right-0", open ? "translate-x-0" : "translate-x-full")
            : cn("left-0", open ? "translate-x-0" : "-translate-x-full")
        )}
        style={{
          background: "var(--dark-walnut)",
          boxShadow: "var(--shadow-3)",
          paddingBottom: "env(safe-area-inset-bottom,0px)",
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
            <span className="font-black text-[1rem]" style={{ color: "var(--text-primary)" }}>
              {locale === "ar" ? "كهرمانة بغداد" : "Kahramana Baghdad"}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-pill hover:bg-white/10 transition-colors duration-2"
            style={{ width: "var(--tap-min)", height: "var(--tap-min)", color: "var(--text-muted)" }}
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-1">
          {NAV_ITEMS.map(({ key, path }) => {
            const active = isActive(path);
            return (
              <Link
                key={key}
                href={`/${locale}${path}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2 transition-[background-color,color] duration-2 fontWeight-semi no-underline"
                style={{
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
                    className="ms-auto w-1.5 h-1.5 rounded-pill"
                    style={{ background: "var(--color-gold)" }}
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
            className="flex items-center justify-center gap-2 rounded-2 border transition-colors duration-2 hover:bg-white/10 fontWeight-semi"
            style={{
              height: "var(--tap-min)",
              borderColor: "var(--border-1)",
              color: "var(--text-body)",
              background: "var(--bg-surface)"
            }}
          >
            <Icon name="language" size="sm" />
            {t("lang")}
          </button>
          <a
            href="https://www.talabat.com/ar/bahrain/kahramanat-baghdad-restaurant"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2 fontWeight-black no-underline transition-[filter,transform] duration-2 hover:brightness-105 active:scale-95"
            style={{
              height: "var(--tap-min)",
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
