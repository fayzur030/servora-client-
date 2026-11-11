"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

import { THEME_STORAGE_KEY } from "./data"

/**
 * Visual-only theme switch.
 *
 * The icon swap is driven purely by CSS (`dark:` variants) so the markup stays
 * identical between the server render and the client, while the click handler
 * only flips the `dark` class that `globals.css` keys off.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggleTheme = React.useCallback(() => {
    const root = document.documentElement
    const nextIsDark = !root.classList.contains("dark")

    root.classList.toggle("dark", nextIsDark)

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light")
    } catch {
      // Storage can be unavailable (private mode); the toggle still works.
    }
  }, [])

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "relative size-9 rounded-full border border-border/80 bg-background/60 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <SunIcon className="size-[1.05rem] scale-100 rotate-0 transition-transform duration-300 ease-out dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-[1.05rem] scale-0 rotate-90 transition-transform duration-300 ease-out dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
