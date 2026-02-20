import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-black rounded-2 transition-[filter,transform,background-color,color,box-shadow] duration-[var(--motion-mid)] ease-[var(--ease-std)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "min-h-[var(--tap-min)] px-6 fs-400 bg-gold text-coffee hover:brightness-105 shadow-1",
        secondary: "min-h-[var(--tap-min)] px-6 fs-400 bg-saddle text-white hover:brightness-110",
        ghost: "min-h-[var(--tap-min)] px-6 fs-400 bg-transparent text-saddle border-2 border-saddle hover:bg-saddle hover:text-white",
        icon: "w-[var(--tap-min)] h-[var(--tap-min)] rounded-1 bg-walnut text-body shadow-1",
      },
      size: {
        sm: "min-h-[40px] px-4 fs-300",
        md: "min-h-[var(--tap-min)] px-6 fs-400",
        lg: "min-h-[56px] px-8 fs-500",
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
