/**
 * Icon — Material Symbols Rounded wrapper
 * Family: Material Symbols Rounded (single family — never mix)
 */
import { cn } from "@/lib/utils";

type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  name: string;
  size?: IconSize;
  filled?: boolean;
  /** Flip horizontally for directional icons (arrows) in RTL */
  directional?: boolean;
  color?: string;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

const sizeClass: Record<IconSize, string> = {
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
      style={color ? { color } : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
