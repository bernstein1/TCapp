import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
  formatNumber?: boolean
}

export function AnimatedNumber({
  value,
  duration = 500,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  formatNumber = true,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef(value)

  useEffect(() => {
    // Skip animation if motion is reduced
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    // Start animation
    setIsAnimating(true)
    startValueRef.current = displayValue
    startTimeRef.current = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - (startTimeRef.current || now)
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentValue =
        startValueRef.current + (value - startValueRef.current) * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value, duration, displayValue])

  const formattedValue = formatNumber
    ? displayValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : displayValue.toFixed(decimals)

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300 motion-reduce:transition-none",
        isAnimating && "scale-110 motion-reduce:scale-100",
        className
      )}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}

// Currency formatting variant
export function AnimatedCurrency({
  value,
  duration,
  className,
  ...props
}: Omit<AnimatedNumberProps, "prefix" | "formatNumber" | "decimals">) {
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      className={className}
      prefix="$"
      formatNumber={true}
      decimals={0}
      {...props}
    />
  )
}

// Percentage formatting variant
export function AnimatedPercentage({
  value,
  duration,
  className,
  decimals = 1,
  ...props
}: Omit<AnimatedNumberProps, "suffix" | "formatNumber">) {
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      className={className}
      suffix="%"
      formatNumber={false}
      decimals={decimals}
      {...props}
    />
  )
}
