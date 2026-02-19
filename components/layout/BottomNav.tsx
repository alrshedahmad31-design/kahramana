"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, UtensilsCrossed, BookOpen, ChefHat, MessageCircle, Image as ImageLucide } from "lucide-react";

const TABS = [
  { key: "home", path: "", Icon: Home },
  { key: "menu", path: "/menu", Icon: UtensilsCrossed },
  { key: "story", path: "/our-story", Icon: BookOpen },
  { key: "gallery", path: "/gallery", Icon: ImageLucide },
  { key: "contact", path: "/branches", Icon: MessageCircle },
] as const;

export default function BottomNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-6 inset-x-4 z-50 md:hidden flex justify-center"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 w-full max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-[var(--border-subtle)]"
        style={{
          background: "var(--bg-primary)",
          backdropFilter: "blur(20px)",
          borderRadius: "var(--radius-pill)",
          height: "var(--nav-bottom-h)",
        }}
      >
        {TABS.map(({ key, path, Icon: TabIcon }) => {
          const href = `/${locale}${path}`;
          const active = path === ""
            ? pathname === `/${locale}` || pathname === `/${locale}/`
            : pathname.startsWith(`/${locale}${path}`);

          return (
            <Link
              key={key}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 no-underline transition-all"
              style={{ color: active ? "var(--brand-gold)" : "var(--text-muted)", opacity: active ? 1 : 0.8 }}
            >
              <div
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 48, height: 48, /* var(--tap-target) = 48px */
                  background: active ? "var(--bg-secondary)" : "transparent",
                }}
              >
                {/* 20 = --icon-size-sm (active) | 16 = --icon-size-xs (inactive) */}
                <TabIcon
                  size={active ? 20 : 16}
                  strokeWidth={active ? 2.5 : 1.75}
                />
              </div>
              <span
                className="leading-none text-[9px] font-bold"
                style={{
                  color: active ? "var(--brand-gold)" : "var(--text-muted)",
                }}
              >
                {t(key as any)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
