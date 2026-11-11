import type { LucideIcon } from "lucide-react"
import {
  CalendarCheckIcon,
  ChartColumnIcon,
  HeartIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SettingsIcon,
  StarIcon,
  StoreIcon,
  TagsIcon,
  UserIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

export type NavbarRole = "customer" | "provider" | "admin"

/**
 * localStorage key used by the theme toggle and the pre-paint theme script
 * in the root layout. Keep both sides in sync.
 */
export const THEME_STORAGE_KEY = "servora-theme"

export interface NavbarLink {
  label: string
  href: string
}

export interface NavbarUser {
  name: string
  email: string
  initials: string
  role: NavbarRole
}

export interface NavbarMenuItem {
  label: string
  icon: LucideIcon
}

export const NAV_LINKS: NavbarLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const ROLE_LABELS: Record<NavbarRole, string> = {
  customer: "Customer",
  provider: "Provider",
  admin: "Admin",
}

/**
 * Badge treatment per role. Every variant is built from theme tokens only,
 * so contrast stays correct in both light and dark mode.
 */
export const ROLE_BADGE_CLASSES: Record<NavbarRole, string> = {
  customer: "bg-primary text-primary-foreground",
  provider: "bg-secondary text-secondary-foreground",
  admin: "bg-foreground text-background",
}

/**
 * Static placeholder identities used by the mockups.
 * Replace with real session data once authentication is implemented.
 */
export const MOCK_USERS: Record<NavbarRole, NavbarUser> = {
  customer: {
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    initials: "OM",
    role: "customer",
  },
  provider: {
    name: "Daniel Carter",
    email: "daniel.carter@servora.com",
    initials: "DC",
    role: "provider",
  },
  admin: {
    name: "Amelia Hart",
    email: "amelia.hart@servora.com",
    initials: "AH",
    role: "admin",
  },
}

export const ROLE_MENU_ITEMS: Record<NavbarRole, NavbarMenuItem[]> = {
  customer: [
    { label: "My Dashboard", icon: LayoutDashboardIcon },
    { label: "My Bookings", icon: CalendarCheckIcon },
    { label: "My Wishlist", icon: HeartIcon },
    { label: "My Reviews", icon: StarIcon },
    { label: "My Profile", icon: UserIcon },
    { label: "Settings", icon: SettingsIcon },
  ],
  provider: [
    { label: "Provider Dashboard", icon: LayoutDashboardIcon },
    { label: "My Services", icon: StoreIcon },
    { label: "Manage Bookings", icon: CalendarCheckIcon },
    { label: "Earnings", icon: WalletIcon },
    { label: "Reviews", icon: StarIcon },
    { label: "My Profile", icon: UserIcon },
    { label: "Settings", icon: SettingsIcon },
  ],
  admin: [
    { label: "Admin Dashboard", icon: LayoutDashboardIcon },
    { label: "Manage Users", icon: UsersIcon },
    { label: "Manage Providers", icon: StoreIcon },
    { label: "Manage Services", icon: ListChecksIcon },
    { label: "Manage Bookings", icon: CalendarCheckIcon },
    { label: "Manage Categories", icon: TagsIcon },
    { label: "Reports & Analytics", icon: ChartColumnIcon },
    { label: "Settings", icon: SettingsIcon },
  ],
}

/**
 * Shared class strings so the desktop dropdown and the mobile sheet stay
 * visually identical.
 *
 * The `!` markers are deliberate: shadcn's dropdown items style hover with
 * `focus:bg-accent` / `focus:**:text-accent-foreground`. This design system
 * uses `--accent` for the cyan brand colour, so the neutral `--muted` hover is
 * forced through with `!important` to win over the vendor rule.
 */
export const MENU_ITEM_CLASS =
  "gap-2.5 px-2.5 py-2 focus:bg-muted! focus:text-foreground! not-data-[variant=destructive]:focus:**:text-foreground!"

export const MENU_ITEM_DESTRUCTIVE_CLASS =
  "gap-2.5 px-2.5 py-2 focus:bg-destructive/10! focus:text-destructive!"
