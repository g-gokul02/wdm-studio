'use client'
import { useRef, useState, useEffect } from 'react'

const gold = '#C9A96E'

function useInView(threshold = 0.1) {
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

export default function ContactSection({ dark, fg }) {
  const [ref, vis]  = useInView()
 
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
 
  const [errors, setErrors] = useState({})
 
  const [sent, setSent]     = useState(false)

  const sub    = dark ? 'rgba(240,237,230,0.55)' : 'rgba(26,24,18,0.55)'
  const card   = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const border = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)'


  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    
    if (Object.keys(e).length) { setErrors(e); return }

    setSent(true)
  }

  
  const renderInput = (field, placeholder, multiline = false) => {
    const Tag = multiline ? 'textarea' : 'input'
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Tag
          value={form[field]}
          placeholder={placeholder}
          rows={multiline ? 5 : undefined}
          onChange={ev => {
           
            setForm(p  => ({ ...p,  [field]: ev.target.value }))
            setErrors(p => ({ ...p, [field]: '' }))
          }}
          style={{
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            
            border: `1.5px solid ${errors[field] ? '#E87C3E' : border}`,
            borderRadius: 8, padding: '14px 16px', fontSize: 15,
            color: fg, outline: 'none', fontFamily: 'inherit',
            resize: multiline ? 'vertical' : 'none',
            transition: 'border-color 0.2s',
          }}
        />
        
        {errors[field] && (
          <span style={{ color: '#E87C3E', fontSize: 12 }}>{errors[field]}</span>
        )}
      </div>
    )
  }

  if (sent) return (
    <section id="contact" style={{ padding: '100px clamp(24px,6vw,80px)',
      textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 8 }}>
        Message received.
      </h3>
      <p style={{ opacity: 0.6, fontSize: 16 }}>We'll be in touch within 24 hours.</p>
    </section>
  )

  return (
    <section id="contact" ref={ref}
      style={{ padding: '100px clamp(24px,6vw,80px) 120px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 80, alignItems: 'start' }}>

        {/* Left column — copy text */}
        <div className={`section-fade${vis ? ' in' : ''}`}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.2em',
            textTransform: 'uppercase', color: gold, marginBottom: 16 }}>
            Start a Project
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700,
            lineHeight: 1.1, marginBottom: 24 }}>
            Let's create something{' '}
            <em style={{ color: gold, fontStyle: 'italic' }}>remarkable.</em>
          </h2>
          <p style={{ color: sub, fontSize: 16, lineHeight: 1.7 }}>
            Whether you're launching a brand, redesigning a product, or building
            something entirely new — we'd love to hear about it.
          </p>
        </div>

        {/* Right column — form card */}
        <div className={`section-fade${vis ? ' in' : ''}`}
          style={{ background: card, border: `1px solid ${border}`,
            borderRadius: 20, padding: 'clamp(28px,5vw,48px)',
            transitionDelay: '0.15s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {renderInput('name',    'Your name')}
            {renderInput('email',   'your@email.com')}
            {renderInput('message', 'Tell us about your project…', true)}
            <button onClick={handleSubmit}
              style={{ background: gold, color: '#1a1208', border: 'none',
                borderRadius: 8, padding: '16px 32px', fontSize: 15,
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                alignSelf: 'flex-start' }}>
              Send Message
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}