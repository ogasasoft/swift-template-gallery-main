import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn, buttonVariants, type ButtonProps } from "@/lib/utils";

// Export buttonVariants separately
export type { ButtonProps };

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ variant, size, asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
