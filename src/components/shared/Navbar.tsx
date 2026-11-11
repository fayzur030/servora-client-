'use client'

import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from 'cn'

import { NavbarBrand } from './navbar/brand'
import { NAV_LINKS, type NavbarUser } from './navbar/data'
import { NavbarMobileMenu } from './navbar/mobile-nav'
import { ThemeToggle } from './navbar/theme-toggle'
import { NavbarUserMenu } from './navbar/user-menu'
import { useActiveHref } from './navbar/use-active-href'

export interface NavbarProps {
  /**
   * When a user is provided the navbar renders the account dropdown instead
   * of the Login / Sign Up pair. The value is display-only for now.
   */
  user?: NavbarUser | null
  className?: string
}

export function Navbar({ user = null, className }: NavbarProps) {
  const isActive = useActiveHref()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl transition-shadow duration-300',
        scrolled && 'shadow-sm shadow-black/5',
        className
      )}
    >
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8'>
        <NavbarBrand />

        <nav
          aria-label='Main'
          className='hidden lg:flex lg:flex-1 lg:justify-center'
        >
          <ul className='flex items-center gap-0.5'>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden='true'
                      className={cn(
                        'absolute inset-x-3 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out',
                        active && 'scale-x-100'
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className='ml-auto flex items-center gap-2 lg:ml-0'>
          <ThemeToggle />

          {user ? (
            <div className='hidden lg:block'>
              <NavbarUserMenu user={user} />
            </div>
          ) : (
            <>
              <Button
                variant='outline'
                className='hidden h-9 px-4 text-sm lg:inline-flex'
              >
                Login
              </Button>
              <Button className='hidden h-9 px-4 text-sm shadow-sm shadow-primary/25 transition-all hover:shadow-md hover:shadow-primary/30 lg:inline-flex'>
                Sign Up
              </Button>
            </>
          )}

          <NavbarMobileMenu user={user} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
