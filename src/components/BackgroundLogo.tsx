'use client'

export default function BackgroundLogo() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[1] flex items-center justify-center"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logotipos/hexagono.png"
        alt=""
        style={{
          height: 'min(80vh, 700px)',
          width: 'auto',
          opacity: 0.08,
        }}
      />
    </div>
  )
}
