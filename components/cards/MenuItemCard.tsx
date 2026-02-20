"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  price: number;
  image: string;
  featured?: boolean;
}

function readLocalQty(id: string): number {
  try {
    const raw = window.localStorage?.getItem("kahramana_cart_v2");
    if (!raw) return 0;
    const data = JSON.parse(raw) as { items?: { id: string; qty?: number }[] };
    const it = data?.items?.find((x) => x.id === id);
    return Number(it?.qty ?? 0) || 0;
  } catch {
    return 0;
  }
}

export default function MenuItemCard({
  item,
  locale,
  currency,
  className,
}: {
  item: MenuItem;
  locale: string;
  currency: string;
  className?: string;
}) {
  const name = locale === "ar" ? item.name.ar : item.name.en;
  const description = locale === "ar" ? item.description.ar : item.description.en;

  const imgSrc = useMemo(
    () => `/${String(item.image || "").replace(/^\/+/, "")}`,
    [item.image]
  );

  const [qty, setQty] = useState<number>(0);

  useEffect(() => {
    const sync = () => {
      const q =
        window.getCartItemQty?.(item.id) ??
        readLocalQty(item.id);
      setQty(Number(q || 0));
    };

    sync();
    window.addEventListener("kahramana:cart", sync as EventListener);
    return () => window.removeEventListener("kahramana:cart", sync as EventListener);
  }, [item.id]);

  const inc = () => {
    window.addToCart?.(item.id, name, item.price, imgSrc);
  };

  const dec = () => {
    const next = Math.max(0, qty - 1);
    window.setCartQty?.(item.id, next);
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-3)] border bg-[var(--bg-secondary)]/30 shadow-1 transition-[transform,border-color] duration-[var(--motion-mid)] hover:-translate-y-0.5 hover:border-[var(--color-gold)]/30",
        className
      )}
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[var(--motion-slow)] group-hover:scale-[1.03]"
        />

        {item.featured ? (
          <div
            className="absolute top-[var(--space-3)] inline-flex items-center rounded-pill px-[var(--space-3)] py-[var(--space-1)] text-100 font-extrabold"
            style={{
              background: "var(--color-gold)",
              color: "var(--bg-primary)",
              insetInlineStart: "var(--space-3)",
              border: "1px solid var(--color-border)",
              backdropFilter: "blur(8px)",
            }}
          >
            {locale === "ar" ? "مميز" : "Featured"}
          </div>
        ) : null}
      </div>

      <div className="p-[var(--space-4)]">
        <h3 className="text-400 font-extrabold line-clamp-2" style={{ color: "var(--text-on-dark)" }}>{name}</h3>
        <p className="mt-[var(--space-1)] text-200 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>{description}</p>

        <div className="mt-[var(--space-3)] flex items-center justify-between gap-[var(--space-3)]">
          <div className="font-extrabold" style={{ color: "var(--color-text)" }}>
            {item.price.toFixed(3)} {currency}
          </div>

          <div
            className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-2)] border px-[var(--space-2)] py-[var(--space-2)]"
            style={{
              borderColor: "var(--border-subtle)",
              background: "rgba(255,255,255,.04)",
            }}
            aria-label={locale === "ar" ? "الكمية" : "Quantity"}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dec();
              }}
              disabled={qty <= 0}
              className={cn(
                "flex h-[var(--space-9)] w-[var(--space-9)] items-center justify-center rounded-[var(--radius-2)] border text-[var(--text-primary)] transition active:scale-95 duration-[var(--motion-fast)]",
                qty <= 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/5"
              )}
              style={{ borderColor: "var(--border-subtle)" }}
              aria-label={locale === "ar" ? "نقص" : "Decrease"}
              title={locale === "ar" ? "نقص" : "Decrease"}
            >
              −
            </button>

            <div className="min-w-6 text-center text-200 font-extrabold" style={{ color: "var(--text-on-dark)" }}>
              {qty}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                inc();
              }}
              className="flex h-[var(--space-9)] w-[var(--space-9)] items-center justify-center rounded-[var(--radius-2)] transition active:scale-95 duration-[var(--motion-fast)] hover:shadow-glow"
              style={{
                background: "var(--color-gold)",
                color: "var(--bg-primary)",
                boxShadow: "var(--glow-gold)"
              }}
              aria-label={locale === "ar" ? "زيادة" : "Increase"}
              title={locale === "ar" ? "زيادة" : "Increase"}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
