"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRightIcon, LogOutIcon, MenuIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

import {
  NAV_LINKS,
  ROLE_BADGE_CLASSES,
  ROLE_LABELS,
  ROLE_MENU_ITEMS,
  type NavbarLink,
  type NavbarUser,
} from "./data"
import { useActiveHref } from "./use-active-href"

export interface NavbarMobileMenuProps {
  user?: NavbarUser | null
  links?: NavbarLink[]
  className?: string
}

/**
 * Slide-in navigation for tablet and mobile.
 *
 * Mirrors the desktop layout: public links first, then the account section
 * (or the Login / Sign Up pair) so both states are visually complete.
 */
export function NavbarMobileMenu({
  user = null,
  links = NAV_LINKS,
  className,
}: NavbarMobileMenuProps) {
  const isActive = useActiveHref()
  const items = user ? ROLE_MENU_ITEMS[user.role] : []

  return (
    <Sheet>
      <SheetTrigger
        render={(props) => (
          <button
            {...props}
            type="button"
            aria-label="Open navigation menu"
            className={cn(
              "grid size-9 place-items-center rounded-full border border-border/80 bg-background/60 text-foreground transition-colors duration-200 hover:bg-muted lg:hidden",
              className,
              props.className
            )}
          >
            <MenuIcon className="size-[1.15rem]" />
          </button>
        )}
      />

      <SheetContent
        side="right"
        className="w-[min(21rem,88vw)] gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border/80 px-5 py-4 pr-14">
          <SheetTitle className="font-heading text-base font-semibold">
            Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">
            Browse Servora pages and account sections.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-0.5">
              {links.map((link) => {
                const active = isActive(link.href)

                return (
                  <li key={link.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                        />
                      }
                    >
                      <span
                        className={cn(
                          "flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-[0.95rem] font-medium transition-colors duration-200",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                        <ChevronRightIcon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            active ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                      </span>
                    </SheetClose>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Separator className="my-4" />

          {user ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-3">
                <Avatar size="lg" className="ring-1 ring-border/80">
                  <AvatarFallback className="bg-primary/10 font-heading text-sm font-bold text-primary">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                  <Badge
                    className={cn(
                      "mt-1.5 h-4.5 gap-1 px-1.5 font-semibold uppercase tracking-wide",
                      ROLE_BADGE_CLASSES[user.role]
                    )}
                  >
                    {ROLE_LABELS[user.role]}
                  </Badge>
                </div>
              </div>

              <ul className="mt-3 flex flex-col gap-0.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[0.95rem] font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                    >
                      <item.icon className="size-4 shrink-0 text-muted-foreground" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <Separator className="my-4" />

              <button
                type="button"
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[0.95rem] font-medium text-destructive transition-colors duration-200 hover:bg-destructive/10"
              >
                <LogOutIcon className="size-4 shrink-0" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="h-11 w-full rounded-lg text-[0.95rem]"
              >
                Login
              </Button>
              <Button className="h-11 w-full rounded-lg text-[0.95rem] shadow-sm shadow-primary/25">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
