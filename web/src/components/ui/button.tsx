import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocre-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-selva-900 text-niebla-50 hover:bg-selva-700 shadow-sm hover:shadow-selva dark:bg-ocre-400 dark:text-selva-950 dark:hover:bg-ocre-500",
        ocre: "bg-ocre-400 text-selva-900 hover:bg-ocre-500 shadow-[0_0_20px_rgba(212,162,78,0.3)] hover:shadow-[0_0_28px_rgba(212,162,78,0.45)]",
        arcilla: "bg-arcilla-500 text-white hover:bg-arcilla-600",
        outline: "border border-selva-900/15 bg-transparent hover:bg-selva-900 hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-selva-900",
        ghost: "hover:bg-selva-900/5 dark:hover:bg-white/10",
        beam: "relative overflow-hidden bg-selva-900 text-white hover:bg-selva-700 dark:bg-ocre-400 dark:text-selva-950",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
