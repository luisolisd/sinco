'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Repeat2, TrendingUp, Trophy } from 'lucide-react'

const leanPrinciples = [
  {
    icon: Zap,
    title: 'Cero Desperdicios',
    desc: 'Identificamos y eliminamos todo aquello que no agrega valor: tiempos de espera, retrabajos, materiales en exceso.',
  },
  {
    icon: Repeat2,
    title: 'Flujo Continuo',
    desc: 'Organizamos los procesos para que cada actividad fluya sin interrupciones, desde la planeación hasta la entrega.',
  },
  {
    icon: TrendingUp,
    title: 'Mejora Constante',
    desc: 'Aprendemos de cada proyecto. Cada obra nos hace más eficientes, más precisos y mejores constructores.',
  },
  {
    icon: Trophy,
    title: 'Máximo Valor',
    desc: 'Tu inversión se traduce en calidad real. Entregamos más por el mismo presupuesto gracias a nuestra eficiencia.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nosotros" ref={ref} className="py-28 bg-cream relative z-[2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="section-tag"
            >
              Quiénes Somos
            </motion.div>

            <motion.h2
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="font-heading font-extrabold text-sinco-dark leading-none mb-6"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
            >
              Construimos con
              <br />
              <span className="text-teal">metodología Lean</span>
            </motion.h2>

            <motion.p
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="font-body font-light text-sinco-muted text-lg leading-relaxed mb-5"
            >
              SINCO nace con la misión de transformar la industria de la
              construcción en México. Aplicamos los principios Lean para
              entregar proyectos de mayor calidad, en menos tiempo y con
              recursos optimizados.
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              className="font-body font-light text-sinco-muted text-base leading-relaxed mb-8"
            >
              Nuestro equipo de ingenieros, arquitectos y especialistas trabaja
              bajo un sistema de mejora continua que garantiza que cada obra sea
              mejor que la anterior. Así hemos construido nuestra reputación:
              proyecto a proyecto, cliente a cliente.
            </motion.p>

            <motion.a
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              href="#contacto"
              className="inline-flex items-center gap-2 text-teal font-heading font-bold text-base border-b-2 border-teal pb-1 hover:gap-4 transition-all duration-200"
            >
              Hablemos de tu proyecto →
            </motion.a>
          </div>

          {/* Right: Lean principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {leanPrinciples.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i + 2}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                className="lean-card bg-cream-dark border border-cream-darker rounded-2xl p-6 cursor-default"
              >
                <p.icon size={28} className="lean-icon text-teal mb-4" />
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{p.title}</h3>
                <p className="lean-text font-body font-normal text-sinco-muted text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
