import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        black:
          "bg-backgroundBlack text-white font-semibold md:font-bold hover:bg-zinc-800",
        blue: "bg-sysmapLight text-black font-semibold md:font-bold hover:bg-blue-200",
        buy: "bg-customYellow text-white font-bold text-base md:text-xl hover:bg-yellow-400",
        add: "bg-green-500 text-white font-bold text-base md:text-lg hover:bg-green-600",
      },
      size: {
        default: "h-10 rounded-full px-4 py-2",
        large: "h-15 rounded-full px-8 py-4",
        add: "h-15 rounded-xl px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
