import Image from "next/image";
import { cn } from "@/lib/utils";

interface EventItem {
  id: string; name: { ar: string; en: string };
  description: { ar: string; en: string }; image: string; highlight?: boolean;
}

export default function EventCard({ event, locale, className }: {
  event: EventItem; locale: string; className?: string;
}) {
  return (
    <article
      className={cn("group flex flex-col scale-100 transition-all duration-4 active:scale-[0.98]", className)}
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-2)", border: "1px solid var(--color-border)" }}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`/${event.image}`}
          alt={locale === "ar" ? event.name.ar : event.name.en}
          fill className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw,400px"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-overlay-deep) 0%, color-mix(in srgb, black 40%, transparent) 50%, transparent 100%)" }} />
        {event.highlight && (
          <span
            className="absolute top-3 start-3 text-100 font-bold px-3 py-1.5 rounded-pill"
            style={{ background: "var(--brand-gold)", color: "var(--bg-primary)" }}
          >
            {locale === "ar" ? "الأكثر طلبًا" : "Most Popular"}
          </span>
        )}
        <h3 className="absolute bottom-[var(--space-4)] start-[var(--space-4)] font-black text-lg text-white" style={{ textShadow: "var(--shadow-text-sm)" }}>
          {locale === "ar" ? event.name.ar : event.name.en}
        </h3>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {locale === "ar" ? event.description.ar : event.description.en}
        </p>
      </div>
    </article>
  );
}
