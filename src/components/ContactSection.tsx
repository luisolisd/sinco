'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Teléfonos',
    lines: ['477 240 4005', '452 526 9920'],
    href: 'tel:4772404005',
  },
  {
    icon: Mail,
    label: 'Correo',
    lines: ['sinco.constructora1@gmail.com'],
    href: 'mailto:sinco.constructora1@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Cobertura',
    lines: ['Guanajuato y área metropolitana', 'República Mexicana'],
    href: null,
  },
]

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/mgobkjkj', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" ref={ref} className="py-28 bg-cream-dark relative z-[2] overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal/6 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-navy/6 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="section-tag justify-center"
          >
            Hablemos
          </motion.div>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-heading font-extrabold text-sinco-dark leading-none mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
          >
            ¿Tienes un proyecto <span className="text-teal">en mente?</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-body font-light text-sinco-muted text-lg max-w-lg mx-auto"
          >
            Cuéntanos tu idea. Nuestro equipo te responde en menos de 24 horas
            con una propuesta inicial.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact info */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="space-y-6"
          >
            {contactInfo.map((c, i) => (
              <div key={c.label} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal/12 flex items-center justify-center mt-1">
                  <c.icon size={20} className="text-teal" />
                </div>
                <div>
                  <p className="font-heading font-bold text-navy text-base mb-1">{c.label}</p>
                  {c.lines.map((line) => (
                    c.href ? (
                      <a
                        key={line}
                        href={c.href}
                        className="block font-body font-normal text-sinco-muted hover:text-teal transition-colors text-sm"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="font-body font-normal text-sinco-muted text-sm">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA card */}
            <div className="mt-8 p-6 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl">
              <p className="font-heading font-bold text-navy text-base mb-2">Respuesta inmediata por WhatsApp</p>
              <p className="font-body font-normal text-sinco-muted text-sm mb-4">
                Escríbenos directamente y recibe atención personalizada al instante.
              </p>
              <a
                href="https://wa.me/524772404005?text=Hola%20SINCO%2C%20me%20interesa%20una%20cotización%20para%20mi%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-heading font-bold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            custom={4}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            {sent ? (
              <div className="bg-cream rounded-2xl p-12 text-center border border-teal/20">
                <CheckCircle size={56} className="text-teal mx-auto mb-5" />
                <h3 className="font-heading font-extrabold text-navy text-2xl mb-3">¡Mensaje enviado!</h3>
                <p className="font-body font-normal text-sinco-muted text-base">
                  Gracias por contactarnos. Te responderemos en menos de 24 horas
                  para dar seguimiento a tu proyecto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-cream rounded-2xl p-8 border border-cream-darker shadow-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-heading font-semibold text-navy text-sm mb-2">
                      Nombre <span className="text-teal">*</span>
                    </label>
                    <input required type="text" name="nombre" placeholder="Tu nombre completo" className="sinco-input" />
                  </div>
                  <div>
                    <label className="block font-heading font-semibold text-navy text-sm mb-2">Empresa</label>
                    <input type="text" name="empresa" placeholder="Nombre de tu empresa" className="sinco-input" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-heading font-semibold text-navy text-sm mb-2">
                      Correo <span className="text-teal">*</span>
                    </label>
                    <input required type="email" name="correo" placeholder="tu@correo.com" className="sinco-input" />
                  </div>
                  <div>
                    <label className="block font-heading font-semibold text-navy text-sm mb-2">Teléfono</label>
                    <input type="tel" name="telefono" placeholder="477 000 0000" className="sinco-input" />
                  </div>
                </div>

                <div>
                  <label className="block font-heading font-semibold text-navy text-sm mb-2">
                    Cuéntanos tu proyecto <span className="text-teal">*</span>
                  </label>
                  <textarea
                    required
                    name="mensaje"
                    rows={5}
                    placeholder="Describe brevemente el proyecto: tipo de obra, ubicación, dimensiones aproximadas, fechas estimadas..."
                    className="sinco-input resize-none"
                  />
                </div>

                {error && (
                  <p className="font-body text-red-500 text-sm text-center">
                    Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark disabled:opacity-60 text-white font-heading font-bold text-base tracking-wide py-4 rounded-lg transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensaje
                    </>
                  )}
                </button>

                <p className="font-body text-sinco-muted text-xs text-center">
                  Al enviar, aceptas que SINCO use tu información para contactarte sobre tu proyecto.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
