import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[hsl(var(--f5-orange))] to-[hsl(var(--f5-orange-dark))] text-white hover:shadow-[0_8px_30px_hsl(var(--f5-orange)/0.4)] hover:-translate-y-0.5",
        ghost: "bg-transparent text-white hover:bg-white/10",
        outline: "border border-white/20 bg-transparent hover:bg-white/10",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        sm: "px-4 py-2 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
