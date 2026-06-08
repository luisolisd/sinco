'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const MaquinaScene = dynamic(() => import('./MaquinaScene'), { ssr: false })

const stats = [
  { value: '+50', label: 'Proyectos\nCompletados' },
  { value: '+15', label: 'Años de\nExperiencia' },
  { value: '5', label: 'Líneas de\nServicio' },
  { value: '100%', label: 'Compromiso\ncon el cliente' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 },
  }),
}

export default function HeroSection() {

  return (
    <section id="inicio" className="relative z-[2] min-h-screen blueprint-grid flex flex-col overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-teal/6 blur-3xl" />
        <div className="absolute bottom-24 -left-24 w-72 h-72 rounded-full bg-navy/6 blur-3xl" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-28 pb-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="section-tag"
          >
            Lean Construction
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-heading font-extrabold text-sinco-dark leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Tu Proyecto,
            <br />
            <span className="text-teal">Nuestra Pasión.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body font-light text-sinco-muted text-lg leading-relaxed mb-4 max-w-lg"
          >
            Somos{' '}
            <strong className="font-semibold text-navy">
              SINCO, Servicios Integrales de Construcción.
            </strong>{' '}
            Aplicamos la metodología Lean Construction para eliminar
            desperdicios, optimizar cada proceso y maximizar el valor de tu
            inversión en cada obra.
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body font-light text-sinco-muted text-base leading-relaxed mb-10 max-w-lg"
          >
            Cero desperdicios. Flujo continuo. Mejora constante.{' '}
            <span className="text-teal font-medium">Así construimos.</span>
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-heading font-bold text-base tracking-wide px-7 py-4 rounded-lg transition-all duration-200 group"
            >
              Ver Servicios
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border-2 border-navy/30 hover:border-teal text-navy hover:text-teal font-heading font-semibold text-base tracking-wide px-7 py-4 rounded-lg transition-all duration-200"
            >
              Contactar
            </a>
          </motion.div>
        </div>

        {/* Right: machine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          className="relative h-[480px] lg:h-[600px] rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              '0 30px 80px rgba(26,122,138,0.12), 0 8px 30px rgba(0,0,0,0.1)',
          }}
        >
          <MaquinaScene />
          <div className="absolute bottom-5 right-5 text-white/50 text-xs font-body flex items-center gap-1">
            <span>Scroll</span>
            <ChevronDown size={13} className="animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 bg-navy/5 border-t border-navy/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-navy/10">
          {stats.map((s) => (
            <div key={s.label} className="py-6 px-8 text-center">
              <p className="stat-number font-heading font-extrabold text-teal text-3xl lg:text-4xl">
                {s.value}
              </p>
              <p className="font-body font-normal text-sinco-muted text-sm mt-1 whitespace-pre-line leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
