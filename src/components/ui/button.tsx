import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm uppercase tracking-[0.15em] transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground-muted",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-foreground/40",
        ghost:
          "text-foreground hover:text-foreground-muted",
        subtle:
          "bg-background-surface text-foreground hover:bg-background-elevated",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-11 px-6 text-xs",
        lg: "h-14 px-10",
        icon: "h-11 w-11",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
