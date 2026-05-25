'use client'
import { useState, useEffect } from 'react'

const gold = '#C9A96E'

export default function Navbar({ dark, setDark, fg }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const border = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 clamp(24px,5vw,80px)',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      background: scrolled
        ? (dark ? 'rgba(14,12,9,0.85)' : 'rgba(245,242,235,0.85)')
        : 'transparent',
      borderBottom: `1px solid ${scrolled ? border : 'transparent'}`,
      transition: 'all 0.35s ease',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 68,
    }}>
      {/* Logo */}
      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700 }}>
        <span style={{ color: gold }}>✦</span> WDM
      </span>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Services','Portfolio','Contact'].map(l => (
          <button key={l} className="nav-link" style={{ color: fg }}
            onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
        ))}
        {/* Dark mode toggle */}
        <button onClick={() => setDark(d => !d)}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: fg, fontSize: 18, opacity: 0.6 }}>
          {dark ? '☀️' : '🌙'}
        </button>
        <button onClick={() => scrollTo('contact')}
          style={{ background: gold, color: '#1a1208', border: 'none',
            borderRadius: 6, padding: '8px 20px', fontSize: 13,
            fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Let's Talk
        </button>
      </div>
    </nav>
  )
}