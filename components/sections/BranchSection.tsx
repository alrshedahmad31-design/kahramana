import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { isOpenNow } from "@/lib/utils";

interface Branch {
    id: string;
    name: { ar: string; en: string };
    address: { ar: string; en: string };
    hours: { ar: string; en: string };
    phone: string;
    maps: string;
    opens: string;
    closes: string;
    coords: { lat: number; lng: number };
}

interface Props {
    branch: Branch;
    locale: string;
    t: {
        talk_title: string;
        talk_body: string;
        hours: string;
        open_map: string;
        call: string;
        order_menu: string;
        open_now: string;
        closed_now: string;
        opens_at: string;
        coming_soon: string;
        address_label: string;
    };
    talabatUrl: string | null;
}

export default function BranchSection({ branch, locale, t, talabatUrl }: Props) {
    const open = isOpenNow(branch.opens, branch.closes);
    const imgName = branch.id === "riffa-hajiyat" ? "riffa-hajiyat-branch" : "muharraq-galali-branch";
    const branchName = locale === "ar" ? branch.name.ar : branch.name.en;
    const branchAddress = locale === "ar" ? branch.address.ar : branch.address.en;
    const branchHours = locale === "ar" ? branch.hours.ar : branch.hours.en;

    // JSON-LD Schema for LocalBusiness
    const schema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": `https://kahramanat.com/branches#${branch.id}`,
        "name": branchName,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": branchAddress,
            "addressCountry": "BH"
        },
        "telephone": branch.phone,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": branch.coords.lat,
            "longitude": branch.coords.lng
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": branch.opens,
                "closes": branch.closes
            }
        ]
    };

    return (
        <section
            className="w-full overflow-hidden border-b relative"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
                style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: '400px' }} />
            {/* SEO Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-screen-xl mx-auto px-6 py-16 lg:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch relative z-10">

                    {/* Left Column: Information */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                                    style={{ background: open ? "var(--status-open-bg)" : "var(--status-closed-bg)", color: open ? "var(--status-open-fg)" : "var(--status-closed-fg)" }}>
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: open ? "var(--status-open-dot)" : "var(--status-closed-dot)", animation: open ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none" }}
                                    />
                                    {open ? t.open_now : t.closed_now}
                                </div>
                                {!open && (
                                    <span className="text-sm font-medium opacity-80" style={{ color: "var(--color-text-muted)" }}>
                                        {t.opens_at.replace("{{time}}", branch.opens)}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-black" style={{ color: "var(--color-text)" }}>
                                {branchName}
                            </h2>

                            <div className="grid grid-cols-1 gap-6 pt-6 mb-8 border-t" style={{ borderColor: "var(--color-border)" }}>
                                {/* Info: Address */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">{t.address_label}</h4>
                                        <p className="text-lg font-bold leading-normal">{branchAddress}</p>
                                    </div>
                                </div>

                                {/* Info: Phone */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">{t.call}</h4>
                                        <a href={`tel:${branch.phone.replace(/[\s\+]/g, '')}`} className="text-xl font-bold no-underline hover:underline" style={{ color: 'var(--color-text)' }}>
                                            <span dir="ltr">{branch.phone}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Info: Hours */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">{t.hours}</h4>
                                        <p className="text-lg font-medium">{branchHours}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href={branch.maps} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                                    style={{ background: "var(--brand-spice)", boxShadow: "var(--shadow-3)" }}
                                >
                                    <MapPin size={20} />
                                    {t.open_map}
                                </a>

                                <a
                                    href={`tel:${branch.phone.replace(/[\s\+]/g, '')}`}
                                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold transition-all hover:bg-[var(--brand-gold)]/10 active:scale-95 border"
                                    style={{ borderColor: "var(--color-border)", color: "var(--text-body)" }}
                                >
                                    <Phone size={20} />
                                    {t.call}
                                </a>

                                <a
                                    href={`/${locale}/menu`}
                                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 border border-[var(--brand-gold)]/30 shadow-md"
                                    style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}
                                >
                                    <Icon name="restaurant_menu" size="sm" />
                                    {t.order_menu}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    {/* --radius-2xl = 32px — closest token to 2.5rem */}
                    <div className="flex-1 min-h-[400px] lg:min-h-auto relative overflow-hidden shadow-2xl border" style={{ borderRadius: "var(--radius-2xl)", borderColor: 'var(--color-border)' }}>
                        <Image
                            src={`/assets/branches/${imgName}.webp`}
                            alt={branchName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-10 start-10 end-10 text-white">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">{branchAddress}</span>
                            <h3 className="text-3xl font-black mt-2">Kahramana Baghdad</h3>
                        </div>
                    </div>

                </div>
            </div>

            {/* Map Embed Section */}
            <div className="w-full h-[450px] relative border-t group" style={{ borderColor: 'var(--color-border)', background: 'var(--map-bg)' }}>
                <iframe
                    src={`https://www.google.com/maps?q=${branch.coords.lat},${branch.coords.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    className="grayscale contrast-[1.1] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Subtle overlay to handle clicks/interactions smoothly if needed */}
                <div className="absolute inset-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-700 bg-black/5" />
            </div>
        </section>
    );
}
