"use client"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type SpinnerProps = {
  className?: string
  size?: number
}

export function Spinner({ className, size = 20 }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}

export default Spinner

