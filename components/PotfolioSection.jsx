'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const gold = '#C9A96E'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const portfolio = [
  {
    id: 1,
    title: 'Aurum Finance',
    tag: 'Brand + Web',
    color: '#C9A96E',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
  {
    id: 2,
    title: 'Helix Health',
    tag: 'UI/UX',
    color: '#7EC8C8',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    id: 3,
    title: 'Volta Electric',
    tag: 'Brand Identity',
    color: '#E87C3E',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
  },
  {
    id: 4,
    title: 'Solen Architecture',
    tag: 'Web Dev',
    color: '#A8C5A0',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  },
  {
    id: 5,
    title: 'Nōto Productivity',
    tag: 'UI/UX + Motion',
    color: '#B8A4D4',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
  },
  {
    id: 6,
    title: 'Drift Surf Co.',
    tag: 'Brand + Motion',
    color: '#6ABEDC',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
  },
]

function ProjectCard({ project, index, vis, hovered, onEnter, onLeave, dark, fg, border, card }) {
  return (
    <div
      className={`section-fade${vis ? ' in' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${border}`,
        transitionDelay: `${0.05 + index * 0.08}s`,
        transition: 'transform .35s ease, box-shadow .35s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? `0 24px 64px ${project.color}44` : 'none',
      }}
    >
      
      <div
        style={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
          background: dark ? '#111' : '#e8e4dc',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform .5s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />


        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '55%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

       
        <div
          style={{
            position: 'absolute', inset: 0,
            background: `${project.color}1A`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity .35s ease',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        
        <div
          style={{
            position: 'absolute',
            bottom: hovered ? 16 : -40,
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'bottom .35s ease',
            whiteSpace: 'nowrap',
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '.15em', textTransform: 'uppercase',
              color: project.color,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${project.color}88`,
              borderRadius: 20, padding: '7px 18px',
            }}
          >
            View Case Study →
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div
        style={{
          padding: '18px 24px 22px',
          background: card,
          borderTop: `1px solid ${border}`,
        }}
      >
        <span
          style={{
            fontSize: 10, fontWeight: 800,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: project.color,
            background: `${project.color}18`,
            borderRadius: 4, padding: '4px 10px',
            display: 'inline-block', marginBottom: 10,
          }}
        >
          {project.tag}
        </span>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 20, fontWeight: 700, lineHeight: 1.25,
            transition: 'color .25s',
            color: hovered ? project.color : fg,
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  )
}

export default function PortfolioSection({ dark, fg }) {
  const [sectionRef, vis] = useInView()
  const [hovered, setHovered] = useState(null)

  const border = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)'
  const card   = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{ padding: '100px clamp(24px,6vw,80px)' }}
    >
      <div
        className={`section-fade${vis ? ' in' : ''}`}
        style={{
          marginBottom: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div>
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '.2em',
            textTransform: 'uppercase', color: gold, marginBottom: 16,
          }}>
            Selected Work
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px,5vw,64px)',
            fontWeight: 700, lineHeight: 1.1,
          }}>
            Projects we're{' '}
            <em style={{ color: gold, fontStyle: 'italic' }}>proud of</em>
          </h2>
        </div>

        <button
          style={{
            background: 'transparent',
            border: `1.5px solid ${border}`,
            color: fg, borderRadius: 8,
            padding: '12px 24px', fontSize: 13,
            fontWeight: 600, letterSpacing: '.05em',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = fg }}
        >
          All Projects →
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {portfolio.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            vis={vis}
            hovered={hovered === project.id}
            onEnter={() => setHovered(project.id)}
            onLeave={() => setHovered(null)}
            dark={dark}
            fg={fg}
            border={border}
            card={card}
          />
        ))}
      </div>
    </section>
  )
}