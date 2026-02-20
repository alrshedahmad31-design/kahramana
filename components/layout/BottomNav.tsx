"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const TABS = [
  { key: "home", path: "" },
  { key: "menu", path: "/menu" },
  { key: "story", path: "/our-story" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/branches" },
] as const;

export default function BottomNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-6 inset-x-4 z-nav md:hidden flex justify-center"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 w-full max-w-md shadow-3 border border-1"
        style={{
          background: "var(--color-coffee)",
          backdropFilter: "blur(20px)",
          borderRadius: "var(--radius-pill)",
          height: "var(--tap-min)",
        }}
      >
        {TABS.map(({ key, path }) => {
          const href = `/${locale}${path}`;
          const active = path === ""
            ? pathname === `/${locale}` || pathname === `/${locale}/`
            : pathname.startsWith(`/${locale}${path}`);

          return (
            <Link
              key={key}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 no-underline transition-[color,opacity] duration-2"
              style={{ color: active ? "var(--color-gold)" : "var(--text-muted)", opacity: active ? 1 : 0.8 }}
            >
              <div
                className="flex items-center justify-center rounded-pill transition-[background-color,transform] duration-2"
                style={{
                  width: "var(--tap-min)", height: "var(--tap-min)",
                  background: active ? "var(--dark-walnut)" : "transparent",
                }}
              >
                <Icon
                  name={key === "home" ? "home" :
                    key === "menu" ? "restaurant_menu" :
                      key === "story" ? "history" :
                        key === "gallery" ? "image" :
                          key === "contact" ? "location_on" : "link"}
                  size={active ? "sm" : "xs"}
                  filled={active}
                />
              </div>
              <span
                className="leading-none text-[9px] fontWeight-black"
                style={{
                  color: active ? "var(--color-gold)" : "var(--text-muted)",
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
