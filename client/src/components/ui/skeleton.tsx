import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse motion-reduce:animate-none rounded-md bg-muted motion-reduce:bg-muted",
        className
      )}
      {...props}
    />
  )
}

// Premium shimmer skeleton with gradient effect
function ShimmerSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-r from-muted via-muted-foreground/10 to-muted",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent",
        "before:animate-shimmer motion-reduce:before:animate-none",
        "motion-reduce:bg-muted",
        className
      )}
      style={{
        backgroundSize: "1000px 100%",
      }}
      {...props}
    />
  )
}

// Card skeleton loader for dashboard cards
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 p-6 rounded-lg border border-border bg-card", className)}>
      <div className="flex items-center justify-between">
        <ShimmerSkeleton className="h-5 w-1/3" />
        <ShimmerSkeleton className="h-8 w-8 rounded-full" />
      </div>
      <ShimmerSkeleton className="h-12 w-full" />
      <div className="space-y-2">
        <ShimmerSkeleton className="h-4 w-full" />
        <ShimmerSkeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}

// List skeleton loader for appointments, cases
function ListSkeleton({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
          <ShimmerSkeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <ShimmerSkeleton className="h-4 w-3/4" />
            <ShimmerSkeleton className="h-3 w-1/2" />
          </div>
          <ShimmerSkeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}

// Table skeleton loader for document hub
function TableSkeleton({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-border">
        <ShimmerSkeleton className="h-4 w-1/4" />
        <ShimmerSkeleton className="h-4 w-1/4" />
        <ShimmerSkeleton className="h-4 w-1/4" />
        <ShimmerSkeleton className="h-4 w-1/4" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3">
          <ShimmerSkeleton className="h-4 w-1/4" />
          <ShimmerSkeleton className="h-4 w-1/4" />
          <ShimmerSkeleton className="h-4 w-1/4" />
          <ShimmerSkeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}

// Wallet skeleton loader for insurance cards
function WalletSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-[1.586/1] rounded-xl border border-border bg-card p-6 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <ShimmerSkeleton className="h-8 w-24" />
              <ShimmerSkeleton className="h-6 w-6 rounded" />
            </div>
            <div className="space-y-3">
              <ShimmerSkeleton className="h-4 w-32" />
              <ShimmerSkeleton className="h-6 w-48" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ShimmerSkeleton className="h-3 w-16" />
                  <ShimmerSkeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <ShimmerSkeleton className="h-3 w-16" />
                  <ShimmerSkeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, ShimmerSkeleton, CardSkeleton, ListSkeleton, TableSkeleton, WalletSkeleton }
