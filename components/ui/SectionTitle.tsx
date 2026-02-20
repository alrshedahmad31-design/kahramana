import { cn } from "@/lib/utils";

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
  noPadding = false,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  noPadding?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col gap-2 relative",
      noPadding ? "" : "py-12",
      centered && "text-center items-center",
      className
    )}>
      <h2 className="font-black text-800 md:text-900 leading-tight tracking-[-0.02em]">
        <span className="section-title-gold">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-400 leading-tight max-w-2xl text-body opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
