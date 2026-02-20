/**
 * Icon — Material Symbols Rounded wrapper
 * Family: Material Symbols Rounded (single family — never mix)
 */
import { cn } from "@/lib/utils";

type IconSize = "xs" | "sm" | "md" | "lg";

export interface IconProps {
  name: string;
  size?: IconSize;
  filled?: boolean;
  /** Flip horizontally for directional icons (arrows) in RTL */
  directional?: boolean;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

const sizeClass: Record<IconSize, string> = {
  xs: "icon-xs",
  sm: "icon-sm",
  md: "",
  lg: "icon-lg",
};

export default function Icon({
  name,
  size = "md",
  filled = false,
  directional = false,
  color,
  style,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  return (
    <span
      className={cn(
        "icon",
        sizeClass[size],
        filled && "icon-filled",
        directional && "icon-dir",
        className
      )}
      style={{ ...style, ...(color ? { color } : {}) }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
