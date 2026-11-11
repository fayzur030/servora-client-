import Link from "next/link"

import { cn } from "cn"

export function NavbarBrand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Servora home"
      className={cn(
        "group flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl",
        className
      )}
    >
      <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-linear-to-br from-primary to-secondary shadow-sm shadow-primary/30 transition-transform duration-300 ease-out group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="size-5 text-white"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.5c4.2-4.05 6.3-7.3 6.3-9.83A6.3 6.3 0 0 0 5.7 5.4c0 2.53 2.1 5.78 6.3 9.83Zm0-7.9a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <span className="font-heading text-[1.05rem] font-extrabold tracking-tight text-foreground">
        Servora
        <span className="text-primary">.</span>
      </span>
    </Link>
  )
}
