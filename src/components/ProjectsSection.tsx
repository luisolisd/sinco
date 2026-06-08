'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const categories = ['Todos', 'Obra Civil', 'Remodelación', 'Instalaciones', 'Gestión']

const projects = [
  {
    title: 'Torre Corporativa León',
    category: 'Obra Civil',
    desc: 'Edificio de 8 niveles para uso mixto. Estructura de concreto armado con acabados de alta gama.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    title: 'Nave Industrial Silao',
    category: 'Obra Civil',
    desc: 'Nave de 4,500 m² para sector automotriz. Incluye instalaciones especiales y área administrativa.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    title: 'Remodelación Comercial Antea',
    category: 'Remodelación',
    desc: 'Renovación integral de local comercial de 650 m². Fachada, interiores y acabados premium.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    title: 'Instalaciones Planta Irapuato',
    category: 'Instalaciones',
    desc: 'Sistema eléctrico de media tensión, hidrosanitario y gases especiales para planta de producción.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    title: 'Conjunto Residencial Jardines',
    category: 'Obra Civil',
    desc: '18 casas habitación. Proyecto ejecutivo, construcción y supervisión integral bajo metodología Lean.',
    img: 'https://images.unsplash.com/photo-1545041855-61e9db40e4aa?w=800&q=80',
  },
  {
    title: 'Gerencia Hospital Regional',
    category: 'Gestión',
    desc: 'Dirección de obra de ampliación hospitalaria 2,100 m². Control de costo, tiempo y calidad.',
    img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.07 },
  }),
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="proyectos" ref={ref} className="py-28 bg-cream relative z-[2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="section-tag justify-center"
          >
            Nuestro Trabajo
          </motion.div>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-heading font-extrabold text-sinco-dark leading-none mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
          >
            Proyectos <span className="text-teal">Destacados</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="font-body font-light text-sinco-muted text-lg max-w-xl mx-auto"
          >
            Cada proyecto es una prueba de nuestro compromiso con la calidad y
            la metodología Lean.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-heading font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 ${
                active === cat
                  ? 'bg-teal text-white shadow-md'
                  : 'bg-cream-dark text-navy hover:bg-cream-darker'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.97 }}
                variants={fadeUp}
                className="project-card rounded-2xl overflow-hidden bg-cream-dark group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="overlay absolute inset-0 bg-navy/60 opacity-0 flex items-center justify-center transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-teal text-white font-heading font-semibold text-xs px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{p.title}</h3>
                  <p className="font-body font-normal text-sinco-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
