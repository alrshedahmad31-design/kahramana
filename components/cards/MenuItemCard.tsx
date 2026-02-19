import Image from "next/image";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string; name: { ar: string; en: string };
  description: { ar: string; en: string };
  price: number; image: string; featured?: boolean;
}

export default function MenuItemCard({ item, locale, currency, className }: {
  item: MenuItem; locale: string; currency: string; className?: string;
}) {
  return (
    <article
      className={cn(
        "flex gap-3 overflow-hidden rounded-2xl border group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-1)"
      }}
    >
      {/* Image */}
      <div className="relative w-[112px] shrink-0 overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <Image
          src={`/${item.image}`}
          alt={locale === "ar" ? item.name.ar : item.name.en}
          fill className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="112px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col justify-between flex-1 py-3.5 pe-4 gap-1 min-w-0">
        <div>
          {item.featured && (
            <span
              className="inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full mb-1.5 uppercase tracking-wider"
              style={{ background: "var(--bg-gold-badge)", color: "var(--brand-gold)" }}
            >
              <span className="w-1 h-1 rounded-full bg-[var(--brand-gold)] animate-pulse" />
              {locale === "ar" ? "مميز" : "Featured"}
            </span>
          )}
          <h3 className="text-[0.9375rem] font-bold leading-tight group-hover:text-[var(--brand-gold)] transition-colors truncate" style={{ color: "var(--text-body)" }}>
            {locale === "ar" ? item.name.ar : item.name.en}
          </h3>
          <p className="text-[0.8125rem] leading-relaxed mt-1 line-clamp-2 opacity-70" style={{ color: "var(--text-muted)" }}>
            {locale === "ar" ? item.description.ar : item.description.en}
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div
            className="text-[0.9375rem] font-black flex items-baseline gap-1"
            style={{ color: "var(--brand-gold)" }}
          >
            {item.price.toFixed(3)}
            <span className="font-bold text-[10px] uppercase opacity-70">{currency}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              window.addToCart?.(item.id, locale === 'ar' ? item.name.ar : item.name.en, item.price, `/${item.image}`);
            }}
            className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[var(--brand-gold)] text-[var(--bg-primary)] shadow-[var(--shadow-gold)] group-hover:shadow-[var(--shadow-gold)] group-hover:scale-110 active:scale-95 transition-all"
          >
            <span className="text-2xl font-black leading-none">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
