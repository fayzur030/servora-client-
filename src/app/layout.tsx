import type { Metadata } from 'next'
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

import { THEME_STORAGE_KEY } from '@/components/shared/navbar/data'

/* Body / UI font */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

/* Heading font */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

/* Monospace font */
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Servora',
  description: 'Servora client application',
}

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong colour scheme. Mirrors the logic in the navbar theme toggle.
 */
const themeScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})();`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {children}
      </body>
    </html>
  )
}
