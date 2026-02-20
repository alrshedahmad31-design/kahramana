import Image from "next/image";
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
            className="w-full overflow-hidden border-b-1 relative"
            style={{ background: "var(--bg-secondary)", borderColor: "var(--border-1)" }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
                style={{ backgroundImage: 'url("/assets/pattern/arabic-pattern.webp")', backgroundSize: 'var(--pattern-size-lg)' }} />
            {/* SEO Schema Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="max-w-screen-xl mx-auto px-[var(--space-4)] py-[var(--space-8)] lg:py-[var(--space-10)] relative z-base">
                <div className="flex flex-col lg:flex-row gap-[var(--space-6)] lg:gap-[var(--space-9)] items-stretch relative z-base">
                    {/* z-10 changed to z-base as it's within the section flow */}

                    {/* Left Column: Information */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-300 font-black"
                                    style={{
                                        background: open ? "color-mix(in srgb, var(--color-success) 10%, transparent)" : "color-mix(in srgb, var(--saddle-brown) 10%, transparent)",
                                        color: open ? "var(--color-success)" : "var(--saddle-brown)"
                                    }}>
                                    <span
                                        className="w-2 h-2 rounded-pill"
                                        style={{
                                            background: open ? "var(--color-success)" : "var(--color-error)",
                                            animation: open ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none"
                                        }}
                                    />
                                    {open ? t.open_now : t.closed_now}
                                </div>
                                {!open && (
                                    <span className="text-300 font-semi opacity-80" style={{ color: "var(--text-muted)" }}>
                                        {t.opens_at.replace("{{time}}", branch.opens)}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-black" style={{ color: "var(--color-text)" }}>
                                {branchName}
                            </h2>

                            <div className="grid grid-cols-1 gap-[var(--space-6)] pt-[var(--space-6)] mb-[var(--space-8)] border-t-[var(--border-thin)]" style={{ borderColor: "var(--border-1)" }}>
                                {/* Info: Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-[var(--tap-min)] h-[var(--tap-min)] rounded-[var(--radius-1)] flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-muted)", color: "var(--metallic-gold)" }}>
                                        <Icon name="location_on" />
                                    </div>
                                    <div>
                                        <h4 className="text-300 font-black opacity-60 uppercase tracking-widest mb-1">{t.address_label}</h4>
                                        <p className="text-500 font-black leading-tight">{branchAddress}</p>
                                    </div>
                                </div>

                                {/* Info: Phone */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-[var(--radius-3)] flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}>
                                        <Icon name="call" />
                                    </div>
                                    <div>
                                        <h4 className="text-300 font-bold opacity-60 uppercase tracking-widest mb-1">{t.call}</h4>
                                        <a href={`tel:${branch.phone.replace(/[\s\+]/g, '')}`} className="text-500 font-bold no-underline hover:underline" style={{ color: 'var(--color-text)' }}>
                                            <span dir="ltr">{branch.phone}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Info: Hours */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-[var(--radius-3)] flex items-center justify-center shrink-0"
                                        style={{ background: "var(--bg-tertiary)", color: "var(--brand-gold)" }}>
                                        <Icon name="schedule" />
                                    </div>
                                    <div>
                                        <h4 className="text-300 font-bold opacity-60 uppercase tracking-widest mb-1">{t.hours}</h4>
                                        <p className="text-500 font-medium">{branchHours}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href={branch.maps} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-[var(--space-2)] px-[var(--space-6)] py-[var(--space-4)] rounded-[var(--radius-1)] font-black text-white transition-[transform,box-shadow,filter] duration-[var(--motion-mid)] hover:scale-[1.02] active:scale-95 shadow-2"
                                    style={{ background: "var(--saddle-brown)", boxShadow: "var(--shadow-3)" }}
                                >
                                    <Icon name="location_on" />
                                    {t.open_map}
                                </a>

                                <a
                                    href={`tel:${branch.phone.replace(/[\s\+]/g, '')}`}
                                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-[var(--space-2)] px-[var(--space-6)] py-[var(--space-4)] rounded-[var(--radius-1)] font-black transition-[background-color,transform] duration-[var(--motion-mid)] hover:bg-white-mid active:scale-95 border-[var(--border-thin)]"
                                    style={{ borderColor: "var(--border-1)", color: "var(--text-body)" }}
                                >
                                    <Icon name="call" />
                                    {t.call}
                                </a>

                                <a
                                    href={`/${locale}/menu`}
                                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-[var(--space-2)] px-[var(--space-6)] py-[var(--space-4)] rounded-[var(--radius-1)] font-black transition-[transform,background-color,border-color] duration-[var(--motion-mid)] hover:scale-[1.02] active:scale-95 border-[var(--border-thin)] border-[var(--border-subtle)] shadow-1"
                                    style={{ background: "var(--bg-muted)", color: "var(--color-gold)" }}
                                >
                                    <Icon name="restaurant_menu" size="sm" />
                                    {t.order_menu}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="flex-1 min-h-[var(--hero-gallery-h)] lg:min-h-auto relative overflow-hidden shadow-3 border-[var(--border-thin)]" style={{ borderRadius: "var(--radius-3)", borderColor: 'var(--border-1)' }}>
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
            <div className="w-full h-[450px] relative border-t-[var(--border-thin)] group" style={{ borderColor: 'var(--border-1)', background: 'var(--coffee-bean)' }}>
                <iframe
                    src={`https://www.google.com/maps?q=${branch.coords.lat},${branch.coords.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    className="grayscale contrast-[1.1] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-4 ease-in-out"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Subtle overlay to handle clicks/interactions smoothly if needed */}
                <div className="absolute inset-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-4 bg-black/5" />
            </div>
        </section>
    );
}
