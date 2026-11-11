"use client"

import * as React from "react"
import { ChevronDownIcon, LogOutIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "cn"

import {
  MENU_ITEM_CLASS,
  MENU_ITEM_DESTRUCTIVE_CLASS,
  ROLE_BADGE_CLASSES,
  ROLE_LABELS,
  ROLE_MENU_ITEMS,
  type NavbarUser,
} from "./data"

export interface NavbarUserMenuProps {
  user: NavbarUser
  align?: "start" | "center" | "end"
}

/**
 * Static account menu mockup.
 *
 * There is no session handling here on purpose: the dropdown only renders
 * presentation, so the real auth flow can be plugged in later without
 * touching the layout.
 */
export function NavbarUserMenu({ user, align = "end" }: NavbarUserMenuProps) {
  const items = ROLE_MENU_ITEMS[user.role]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button
            {...props}
            type="button"
            aria-label={`Open account menu for ${user.name}`}
            className={cn(
              "group flex items-center gap-1.5 rounded-full p-1 pr-2 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              props.className
            )}
          >
            <Avatar className="ring-1 ring-border/80">
              <AvatarFallback className="bg-primary/10 font-heading text-xs font-bold text-primary">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDownIcon className="size-3.5 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
          </button>
        )}
      />

      <DropdownMenuContent
        align={align}
        sideOffset={12}
        className="w-[19rem] rounded-2xl border border-border/70 bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/5 ring-0"
      >
        <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5">
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

        <DropdownMenuSeparator className="bg-border/70" />

        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.label} className={MENU_ITEM_CLASS}>
              <item.icon className="size-4 text-muted-foreground" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/70" />

        <DropdownMenuItem
          variant="destructive"
          className={MENU_ITEM_DESTRUCTIVE_CLASS}
        >
          <LogOutIcon className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
