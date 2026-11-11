"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

/**
 * Resolves which navigation entry is currently active.
 *
 * Hash links (`/#how-it-works`) are tracked through the `hashchange` event so
 * the indicator follows in-page anchors as well as route changes.
 */
export function useActiveHref() {
  const pathname = usePathname()
  const [hash, setHash] = React.useState("")

  React.useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [pathname])

  return React.useCallback(
    (href: string) => {
      const [path, targetHash] = href.split("#")

      if (pathname !== path) return false
      if (targetHash) return hash === `#${targetHash}`

      return hash === ""
    },
    [pathname, hash]
  )
}
