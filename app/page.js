'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServiceSection'
import PortfolioSection from '../components/PotfolioSection'
import ContactSection from '../components/ContactSection'

export default function Home() {
  const [dark, setDark] = useState(true)

  const bg  = dark ? '#0e0c09' : '#f5f2eb'
  const fg  = dark ? '#f0ede6' : '#1a1812'

  return (
    <div style={{ background: bg, color: fg, minHeight: '100vh',
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      transition: 'background 0.4s, color 0.4s', overflowX: 'hidden' }}>
      <Navbar dark={dark} setDark={setDark} fg={fg} />
      <HeroSection dark={dark} fg={fg} />
      <ServicesSection dark={dark} fg={fg} />
      <PortfolioSection dark={dark} fg={fg} />
      <ContactSection dark={dark} fg={fg} />
      <footer style={{ padding: '28px 80px', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700 }}>
          <span style={{ color: '#C9A96E' }}>✦</span> Wdm
        </span>
        <span style={{ opacity: 0.5, fontSize: 13 }}>© 2026 Wdm Studio. All rights reserved.</span>
      </footer>
    </div>
  )
}