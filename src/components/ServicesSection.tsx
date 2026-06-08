'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, PaintRoller, Plug, ClipboardList, Wifi } from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Construcción de Obra Civil',
    desc: 'Edificios comerciales, residenciales e industriales ejecutados con los más altos estándares de ingeniería. Desde la cimentación hasta la entrega de llaves.',
    tag: 'Obra mayor',
  },
  {
    icon: PaintRoller,
    title: 'Remodelación y Acabados',
    desc: 'Transformamos espacios existentes con acabados premium. Interiores, fachadas, pisos y recubrimientos que elevan el valor de tu propiedad.',
    tag: 'Remodelación',
  },
  {
    icon: Plug,
    title: 'Instalaciones Eléctricas e Hidráulicas',
    desc: 'Diseño e instalación de sistemas eléctricos, hidráulicos, sanitarios y de gas con normativa vigente y materiales certificados.',
    tag: 'Instalaciones',
  },
  {
    icon: ClipboardList,
    title: 'Gestión y Gerencia de Proyectos',
    desc: 'Administración integral de tu obra: presupuesto, cronograma, supervisión y control de calidad. Tú decides, nosotros ejecutamos.',
    tag: 'Gestión',
  },
  {
    icon: Wifi,
    title: 'Telecomunicaciones',
    desc: 'Infraestructura de datos, voz y conectividad para proyectos residenciales, comerciales e industriales. Instalación certificada.',
    tag: 'Tech',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 },
  }),
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" ref={ref} className="py-28 bg-navy relative z-[2] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,122,138,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,122,138,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-teal-light font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4"
          >
            <span className="block w-8 h-0.5 bg-teal-light" />
            Lo Que Hacemos
            <span className="block w-8 h-0.5 bg-teal-light" />
          </motion.div>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-heading font-extrabold text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-body font-light text-white/60 text-lg max-w-xl mx-auto"
          >
            Soluciones integrales bajo un mismo techo. Cada proyecto recibe
            atención especializada desde el diseño hasta la entrega.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i + 3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className={`service-card relative bg-navy-light rounded-2xl p-7 border border-white/8 cursor-default
                ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal/15 rounded-xl mb-5">
                <s.icon size={22} className="text-teal-light" />
              </div>

              {/* Tag */}
              <span className="absolute top-6 right-6 text-xs font-heading font-semibold text-teal-light/70 bg-teal/10 px-3 py-1 rounded-full">
                {s.tag}
              </span>

              <h3 className="font-heading font-bold text-white text-xl mb-3">{s.title}</h3>
              <p className="font-body font-normal text-white/55 text-sm leading-relaxed">{s.desc}</p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-teal rounded-b-2xl w-0 group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          custom={8}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mt-14"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-heading font-bold text-base tracking-wide px-8 py-4 rounded-lg transition-all duration-200 group"
          >
            Solicitar Cotización Gratuita
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
