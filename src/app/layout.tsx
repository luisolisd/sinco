import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SINCO — Servicios Integrales de Construcción',
  description:
    'Empresa líder en construcción en México. Aplicamos la metodología Lean Construction para entregar proyectos de obra civil, remodelación, instalaciones y telecomunicaciones con el máximo valor.',
  keywords: 'construcción, obra civil, remodelación, instalaciones, Lean Construction, SINCO, Guanajuato, México',
  openGraph: {
    title: 'SINCO — Servicios Integrales de Construcción',
    description: 'Tu proyecto, nuestra pasión. Lean Construction aplicada a cada obra.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
