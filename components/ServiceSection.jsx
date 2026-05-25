'use client'
import { useRef, useState, useEffect } from 'react'

const gold = '#C9A96E'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const services = [
  { id: 1, icon: '🎨', title: 'UI/UX Design',       desc: 'Intuitive interfaces rooted in user psychology — from wireframe to pixel-perfect prototype.' },
  { id: 2, icon: '💻', title: 'Web Development',    desc: 'Blazing-fast, accessible web experiences built with modern stacks and obsessive performance.' },
  { id: 3, icon: '✦',  title: 'Brand Identity',     desc: 'Logos, type systems, and visual languages that make your brand impossible to ignore.' },
  { id: 4, icon: '▶',  title: 'Motion & Animation', desc: 'Purposeful motion design that guides attention and brings interfaces to life.' },
]

export default function ServicesSection({ dark, fg }) {
  const [ref, vis] = useInView(0.1)
  const sub    = dark ? 'rgba(240,237,230,0.55)' : 'rgba(26,24,18,0.55)'
  const card   = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const border = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)'

  return (
    <section id="services" ref={ref}
      style={{ padding: '100px clamp(24px,6vw,80px)' }}>

      {/* Section header */}
      <div className={`section-fade${vis ? ' in' : ''}`} style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.2em',
          textTransform: 'uppercase', color: gold, marginBottom: 16 }}>
          What We Do
        </p>
        <h2 style={{ fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, lineHeight: 1.1, maxWidth: 600 }}>
          Full-spectrum <em style={{ color: gold, fontStyle: 'italic' }}>creative services</em>
        </h2>
      </div>

      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {services.map((s, i) => (
          <div key={s.id} className={`card-hover section-fade${vis ? ' in' : ''}`}
            style={{ background: card, border: `1px solid ${border}`,
              borderRadius: 16, padding: '36px 32px',
              transitionDelay: `${0.1 + i * 0.1}s` }}>
            {/* Icon */}
            <div style={{ fontSize: 36, marginBottom: 24 }}>{s.icon}</div>
            {/* Title */}
            <h3 style={{ fontFamily: 'Playfair Display, serif',
              fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
            {/* Description */}
            <p style={{ color: sub, fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
            <div style={{ marginTop: 28, color: gold, fontSize: 13,
              fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
              cursor: 'pointer' }}>Learn more →</div>
          </div>
        ))}
      </div>
    </section>
  )
}