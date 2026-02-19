import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "min-h-[48px] px-6 text-[0.9375rem] bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:brightness-105 shadow-md",
        secondary: "min-h-[48px] px-6 text-[0.9375rem] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:brightness-110",
        ghost: "min-h-[48px] px-6 text-[0.9375rem] bg-transparent text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white",
        icon: "w-[48px] h-[48px] rounded-xl bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-1)]",
      },
      size: {
        sm: "min-h-[40px] px-4 text-sm",
        md: "min-h-[48px] px-6 text-[0.9375rem]",
        lg: "min-h-[56px] px-8 text-[1rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
export { Button, buttonVariants };
