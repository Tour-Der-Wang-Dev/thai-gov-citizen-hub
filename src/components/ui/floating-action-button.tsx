import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export interface FloatingActionButtonProps extends ButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ className, position = "bottom-right", ...props }, ref) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <Button
      ref={ref}
      className={cn(
        "fixed z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
        positionClasses[position],
        className
      )}
      size="icon"
      {...props}
    />
  );
});

FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton };