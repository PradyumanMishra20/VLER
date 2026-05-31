import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-14 w-full border-0 border-b border-border-strong bg-transparent px-0 py-4 text-[15px] text-foreground placeholder:text-foreground-subtle/50 transition-colors duration-300 focus-visible:border-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
