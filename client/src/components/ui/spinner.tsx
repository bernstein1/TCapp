import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, loading = true, size = "default", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
    }

    if (!loading && children) {
      return <>{children}</>
    }

    if (!loading) {
      return null
    }

    return (
      <div ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
        <Loader2
          className={cn(
            sizeClasses[size],
            "animate-spin motion-reduce:animate-none text-current"
          )}
        />
        {children && <span className="ml-2">{children}</span>}
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner }
