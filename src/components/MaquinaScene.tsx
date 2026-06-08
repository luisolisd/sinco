'use client'

export default function MaquinaScene() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/logotipos/maquina-movimiento.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Warm golden-hour sun pulse overlay */}
      <div className="absolute inset-0 pointer-events-none sun-pulse" />

      {/* Floating info badge */}
      <div className="absolute bottom-5 left-5 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3">
        <p className="font-heading font-semibold text-white text-sm tracking-wide">EN OPERACIÓN</p>
        <p className="font-body text-white/70 text-xs">Proyecto activo · Guanajuato, MX</p>
      </div>
    </div>
  )
}
