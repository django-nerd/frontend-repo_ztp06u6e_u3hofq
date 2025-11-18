import React from 'react'
import Spline from '@splinetool/react-spline'

export default function HeroSpline() {
  return (
    <div className="relative h-40 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#EAF0FF]">
      <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/70 dark:to-slate-900/80" />
    </div>
  )
}
