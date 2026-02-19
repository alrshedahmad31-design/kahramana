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
      className={cn("rounded-3xl overflow-hidden group cursor-pointer", className)}
      style={{ background:"var(--color-surface)", boxShadow:"var(--shadow-2)", border:"1px solid var(--color-border)" }}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`/${event.image}`}
          alt={locale === "ar" ? event.name.ar : event.name.en}
          fill className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw,400px"
        />
        <div className="absolute inset-0" style={{ background:"var(--hero-overlay-bottom)" }} />
        {event.highlight && (
          <span
            className="absolute top-3 start-3 text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background:"var(--brand-gold)", color:"var(--bg-primary)" }}
          >
            {locale === "ar" ? "الأكثر طلبًا" : "Most Popular"}
          </span>
        )}
        <h3 className="absolute bottom-4 start-4 font-black text-lg text-white" style={{ textShadow:"0 2px 8px rgba(0,0,0,0.5)" }}>
          {locale === "ar" ? event.name.ar : event.name.en}
        </h3>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed" style={{ color:"var(--color-text-muted)" }}>
          {locale === "ar" ? event.description.ar : event.description.en}
        </p>
      </div>
    </article>
  );
}
