import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <p
        className="text-[6rem] font-black leading-none"
        style={{ color: "var(--brand-gold)" }}
      >
        404
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          الصفحة غير موجودة
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Page not found
        </p>
      </div>
      <Link
        href="/ar"
        className="px-6 py-3 rounded-2xl text-sm font-bold transition-opacity hover:opacity-80"
        style={{ background: "var(--brand-gold)", color: "var(--bg-primary)" }}
      >
        العودة للرئيسية — Back to Home
      </Link>
    </div>
  );
}
