'use client'
import { useState, useEffect, useRef } from 'react'

const gold = '#C9A96E'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
 
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimNum({ to, suffix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, vis]   = useInView()
  useEffect(() => {
    if (!vis) return
    let current = 0
    const duration = 1400, step = 16
    const increment = (to / duration) * step
    const timer = setInterval(() => {
      current += increment
      if (current >= to) { setVal(to); clearInterval(timer) }
      else setVal(Math.floor(current))
    }, step)
    return () => clearInterval(timer)
  }, [vis, to])
  return <span ref={ref}>{val}{suffix}</span>
}

export default function HeroSection({ dark, fg }) {
  const [ref, vis] = useInView(0.05)
  const sub    = dark ? 'rgba(240,237,230,0.55)' : 'rgba(26,24,18,0.55)'
  const border = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)'

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={ref}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '100px clamp(24px,6vw,80px) 80px',
        position: 'relative', overflow: 'hidden' }}>

      {/* Background glow blobs — purely decorative */}
      <div style={{ position: 'absolute', top: '15%', right: '-5%',
        width: 'clamp(300px,45vw,600px)', height: 'clamp(300px,45vw,600px)',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${dark ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.18)'} 0%, transparent 70%)`,
        pointerEvents: 'none' }}/>

      {/* Badge label */}
      <div className={`section-fade${vis ? ' in' : ''}`} style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.2em',
          textTransform: 'uppercase', color: gold,
          border: `1px solid ${gold}44`, borderRadius: 4, padding: '5px 12px' }}>
          Wdm Studio — Est. 2026
        </span>
      </div>

      {/* Main headline */}
      <h1 className={`section-fade${vis ? ' in' : ''}`}
        style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(44px, 8vw, 110px)',
          fontWeight: 700, lineHeight: 1.02, maxWidth: 800,
          transitionDelay: '0.1s' }}>
        Design that<br/>
        <em style={{ color: gold, fontStyle: 'italic' }}>moves</em> people.
      </h1>

      {/* Subtitle */}
      <p className={`section-fade${vis ? ' in' : ''}`}
        style={{ marginTop: 28, fontSize: 'clamp(16px,2vw,20px)',
          lineHeight: 1.7, color: sub, maxWidth: 480, transitionDelay: '0.2s' }}>
        Wdm is a design studio crafting brands, interfaces,
        and digital experiences with intention and craft.
      </p>

      {/* CTA buttons */}
      <div className={`section-fade${vis ? ' in' : ''}`}
        style={{ marginTop: 44, display: 'flex', gap: 16,
          flexWrap: 'wrap', transitionDelay: '0.3s' }}>
        <button onClick={() => scrollTo('portfolio')}
          style={{ background: gold, color: '#1a1208', border: 'none',
            borderRadius: 8, padding: '16px 36px', fontSize: 15,
            fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          View Our Work →
        </button>
        <button onClick={() => scrollTo('contact')}
          style={{ background: 'transparent', color: fg,
            border: `1.5px solid ${border}`, borderRadius: 8,
            padding: '16px 36px', fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit' }}>
          Get in Touch
        </button>
      </div>

      {/* Animated stats row */}
      <div className={`section-fade${vis ? ' in' : ''}`}
        style={{ marginTop: 80, display: 'flex',
          gap: 'clamp(32px,6vw,80px)', flexWrap: 'wrap',
          borderTop: `1px solid ${border}`, paddingTop: 40,
          transitionDelay: '0.45s' }}>
        {[
          [120, '+', 'Projects delivered'],
          [8,   '',  'Years of craft'],
          [98,  '%', 'Client satisfaction'],
        ].map(([n, suffix, label]) => (
          <div key={label}>
            <div style={{ fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700,
              color: gold, lineHeight: 1 }}>
              <AnimNum to={n} suffix={suffix} />
            </div>
            <div style={{ fontSize: 13, color: sub, marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}