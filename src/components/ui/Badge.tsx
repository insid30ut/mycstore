import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
}

export const Badge = ({ className, variant = "primary", ...props }: BadgeProps) => {
  const variants = {
    primary: "bg-primary/20 text-primary border-primary/20",
    secondary: "bg-secondary/20 text-secondary-foreground border-secondary/20",
    accent: "bg-accent/20 text-accent border-accent/20",
    outline: "border-border text-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
