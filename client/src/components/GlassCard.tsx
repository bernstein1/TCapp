import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  analyticsId?: string;
}

export default function GlassCard({ children, className, onClick, analyticsId }: GlassCardProps) {
  const isInteractive = typeof onClick === "function";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        "glass-effect rounded-2xl p-8",
        "transition-all duration-500 motion-reduce:transition-none",
        "gradient-overlay",
        isInteractive && [
          "hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]",
          "motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
          "cursor-pointer group",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        ],
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      data-analytics-id={analyticsId}
    >
      {children}
    </div>
  );
}
