"use client"
import Spinner from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type LoadingStateProps = {
  message?: string
  fullScreen?: boolean
  className?: string
}

export function LoadingState({
  message = "Preparando todo…",
  fullScreen = true,
  className,
}: LoadingStateProps) {
  const Wrapper: React.ElementType = fullScreen ? "div" : "section"

  return (
    <Wrapper
      className={cn(
        fullScreen
          ? "flex h-[60vh] w-full items-center justify-center"
          : "w-full",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Spinner className="text-primary" size={22} />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </Wrapper>
  )}

export default LoadingState

