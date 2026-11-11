import { Navbar } from '@/components/shared/Navbar'
import { NavbarMobileMenu } from '@/components/shared/navbar/mobile-nav'
import {
  MOCK_USERS,
  ROLE_LABELS,
  type NavbarRole,
} from '@/components/shared/navbar/data'

const ROLES: NavbarRole[] = ['customer', 'provider', 'admin']

/**
 * Review page for the navbar UI. Every state is rendered statically so the
 * three role menus can be compared side by side. Delete this route once the
 * real pages exist.
 */
export default function NavbarPreviewPage() {
  return (
    <main className='mx-auto w-full max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8'>
      <header className='space-y-2'>
        <h1 className='font-heading text-3xl font-bold tracking-tight'>
          Servora Navbar <span className='text-primary'>UI preview</span>
        </h1>
        <p className='max-w-2xl text-sm text-muted-foreground'>
          Static mockups for review. Open the account menu on each row to
          inspect the customer, provider and admin variations. No authentication
          is wired up.
        </p>
      </header>

      <section className='space-y-3'>
        <h2 className='font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
          Public navbar
        </h2>
        <div className='overflow-hidden rounded-xl border border-border bg-card'>
          <Navbar className='static' />
        </div>
      </section>

      {ROLES.map((role) => (
        <section key={role} className='space-y-3'>
          <h2 className='font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {ROLE_LABELS[role]} navbar
          </h2>
          <div className='overflow-hidden rounded-xl border border-border bg-card'>
            <Navbar user={MOCK_USERS[role]} className='static' />
          </div>
        </section>
      ))}

      <section className='space-y-3'>
        <h2 className='font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
          Mobile menu
        </h2>
        <div className='flex items-center gap-3 rounded-xl border border-border bg-card p-4'>
          <NavbarMobileMenu className='lg:inline-grid' />
          <span className='text-sm text-muted-foreground'>
            Opens the slide-in menu (same component as the mobile header).
          </span>
        </div>
      </section>

      {ROLES.map((role) => (
        <section key={`mobile-${role}`} className='space-y-3'>
          <h2 className='font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            Mobile menu — {ROLE_LABELS[role]}
          </h2>
          <div className='flex items-center gap-3 rounded-xl border border-border bg-card p-4'>
            <NavbarMobileMenu
              user={MOCK_USERS[role]}
              className='lg:inline-grid'
            />
            <span className='text-sm text-muted-foreground'>
              Account section for the {ROLE_LABELS[role].toLowerCase()} role.
            </span>
          </div>
        </section>
      ))}
    </main>
  )
}
