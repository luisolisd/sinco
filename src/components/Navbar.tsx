'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" className="flex-shrink-0">
          <Image
            src="/logotipos/sinco-sin-fondo.png"
            alt="SINCO — Servicios Integrales de Construcción"
            width={200}
            height={67}
            className="object-contain h-14 w-auto"
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link font-body font-medium text-navy hover:text-teal transition-colors duration-200 text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          className="hidden lg:inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-heading font-semibold text-sm tracking-wide px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Solicitar Cotización
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-navy"
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden bg-cream/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 border-b border-cream-darker' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-body font-medium text-navy hover:text-teal transition-colors border-b border-cream-darker"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="block text-center bg-teal text-white font-heading font-semibold py-3 rounded-lg"
            >
              Solicitar Cotización
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
