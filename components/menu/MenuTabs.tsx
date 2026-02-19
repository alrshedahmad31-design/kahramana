"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import MenuItemCard from "@/components/cards/MenuItemCard";
import { cn } from "@/lib/utils";
import { Search, UtensilsCrossed } from "lucide-react";

interface Category { id: string; name: { ar: string; en: string }; icon: string; }
interface MenuItem {
  id: string; categoryId: string; name: { ar: string; en: string };
  description: { ar: string; en: string }; price: number; image: string; featured?: boolean;
}

export default function MenuTabs({ categories, items, locale, labels }: {
  categories: Category[]; items: MenuItem[]; locale: string;
  labels: { all: string; search_placeholder: string; currency: string; };
}) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => items.filter((item) => {
    const matchesCat = cat === "all" || item.categoryId === cat;
    const name = (locale === "ar" ? item.name.ar : item.name.en).toLowerCase();
    return matchesCat && (!q || name.includes(q.toLowerCase()));
  }), [cat, q, items, locale]);

  const gridRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top of grid when category or search changes
  useEffect(() => {
    if (!gridRef.current) return;

    // Calculate position: just above the grid (under the sticky header)
    const yOffset = -160; // Accommodate Header (60px) + Sticky Tabs (~100px)
    const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [cat, q]);

  return (
    <div className="flex flex-col gap-8">
      {/* Sticky Header Wrapper: Search + Categories */}
      <div
        className="sticky z-30 space-y-5 py-4 -mt-4 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-sm"
        style={{ top: "var(--nav-top-h)" }}
      >
        {/* Search */}
        <div className="relative">
          <Search
            size={20} strokeWidth={1.75}
            className="absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="search"
            placeholder={labels.search_placeholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-2xl border text-sm bg-[var(--bg-tertiary)] outline-none transition-all placeholder:text-[var(--text-muted)] hover:border-[var(--brand-gold)]/40 focus:border-[var(--brand-gold)]"
            style={{
              height: "var(--tap-target)",
              paddingInlineStart: "2.75rem", paddingInlineEnd: "1rem",
              borderColor: "var(--border-subtle)",
              color: "var(--text-body)",
            }}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {/* height:48 = var(--tap-target); icon 16 = --icon-size-xs */}
          <button
            onClick={() => setCat("all")}
            className={cn("flex items-center gap-1.5 shrink-0 px-5 rounded-full text-xs font-bold border transition-all active:scale-95",
              cat === "all" ? "border-transparent" : "bg-[var(--bg-tertiary)]/50 border-[var(--border-subtle)]"
            )}
            style={{
              height: 48,
              ...(cat === "all"
                ? { background: "var(--brand-gold)", color: "var(--bg-primary)", boxShadow: "var(--shadow-gold)" }
                : { color: "var(--text-muted)" }),
            }}
          >
            <UtensilsCrossed size={16} strokeWidth={2.5} />
            {labels.all}
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn("shrink-0 px-5 rounded-full text-xs font-bold border transition-all active:scale-95",
                cat === c.id ? "border-transparent" : "bg-[var(--bg-tertiary)]/50 border-[var(--border-subtle)]"
              )}
              style={{
                height: 48,
                ...(cat === c.id
                  ? { background: "var(--brand-gold)", color: "var(--bg-primary)", boxShadow: "var(--shadow-gold)" }
                  : { color: "var(--text-muted)" }),
              }}
            >
              {locale === "ar" ? c.name.ar : c.name.en}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center py-16 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {locale === "ar" ? "لا توجد نتائج" : "No results found"}
        </p>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} locale={locale} currency={labels.currency} />
          ))}
        </div>
      )}
    </div>
  );
}
