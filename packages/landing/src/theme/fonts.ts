import localFont from 'next/font/local'
import { Roboto, IBM_Plex_Mono } from 'next/font/google'

export const headerFont = localFont({
  src: [
    {
      path: './fonts/Publico/PublicoHeadline-Light-Web.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: './fonts/Publico/PublicoText-Roman-Web.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Publico/PublicoText-Semibold-Web.woff2',
      weight: '600',
      style: 'semibold',
    },
  ],
})

export const bodyFont = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['apple-system', 'Helvetica', 'Arial', 'sans-serif'],
})

export const overlineFont = IBM_Plex_Mono({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})
