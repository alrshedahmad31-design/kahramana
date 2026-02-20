"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import MenuItemCard from "@/components/cards/MenuItemCard";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

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

  useEffect(() => {
    if (!gridRef.current) return;
    const yOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--menu-sticky-offset')) || -160;
    const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [cat, q]);

  return (
    <div className="flex flex-col gap-8">
      <div
        className="sticky z-30 space-y-5 py-4 -mt-4 bg-walnut/95 backdrop-blur-xl border-b-1 shadow-1"
        style={{ top: "var(--nav-top-h)", borderBottomColor: "var(--border-1)" }}
      >
        <div className="relative">
          <Icon
            name="search"
            size="sm"
            className="absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="search"
            placeholder={labels.search_placeholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-2 border-1 text-300 bg-muted outline-none transition-[border-color,box-shadow] duration-2 placeholder:text-muted focus:border-gold"
            style={{
              height: "var(--tap-min)",
              paddingInlineStart: "var(--input-icon-offset)", paddingInlineEnd: "1rem",
              borderColor: "var(--border-subtle)",
              color: "var(--text-body)",
            }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setCat("all")}
            className={cn("flex items-center gap-1.5 shrink-0 px-5 rounded-pill text-100 font-black border-1 transition-[background-color,color,transform,box-shadow] duration-2 active:scale-95",
              cat === "all" ? "border-transparent" : "bg-white/5 border-white/5"
            )}
            style={{
              height: "var(--tap-min)",
              ...(cat === "all"
                ? { background: "var(--metallic-gold)", color: "var(--coffee-bean)", boxShadow: "var(--shadow-1)" }
                : { color: "var(--text-muted)" }),
            }}
          >
            <Icon name="restaurant_menu" size="sm" />
            {labels.all}
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn("flex items-center gap-2 shrink-0 px-5 rounded-pill text-100 font-black border-1 transition-[background-color,color,transform,box-shadow] duration-2 active:scale-95",
                cat === c.id ? "border-transparent" : "bg-white/5 border-white/5"
              )}
              style={{
                height: "var(--tap-min)",
                ...(cat === c.id
                  ? { background: "var(--metallic-gold)", color: "var(--coffee-bean)", boxShadow: "var(--shadow-1)" }
                  : { color: "var(--text-muted)" }),
              }}
            >
              <Icon
                name={c.id === "starters" ? "restaurant" :
                  c.id === "main" ? "flatware" :
                    c.id === "grill" ? "outdoor_grill" :
                      c.id === "sides" ? "bakery_dining" :
                        c.id === "drinks" ? "local_bar" : "restaurant_menu"}
                size="sm"
              />
              {locale === "ar" ? c.name.ar : c.name.en}
            </button>
          ))}
        </div>
      </div>

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
