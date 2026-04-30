'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: scrolled ? 'rgba(26,4,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(176,80,128,0.2)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="/" style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 22, fontWeight: 600, letterSpacing: '0.15em',
          color: 'var(--rv-pale)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--rv-accent), var(--rv-bright))',
            display: 'inline-block', boxShadow: '0 0 8px rgba(233,30,140,0.5)',
          }} />
          SENTIA
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden md:flex">
          {[['How It Works', '/demo'], ['Business', '#business'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--font-dm)', fontSize: 13, fontWeight: 400,
              color: 'rgba(201,160,180,0.7)', textDecoration: 'none', letterSpacing: '0.04em',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--rv-pale)'}
              onMouseLeave={e => e.target.style.color = 'rgba(201,160,180,0.7)'}
            >{label}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: 12, textDecoration: 'none' }}>
            Request Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: 'none', border: 'none', color: 'var(--rv-blush)', cursor: 'pointer', fontSize: 20 }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(26,4,16,0.98)', borderTop: '1px solid rgba(176,80,128,0.2)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {[['How It Works', '/demo'], ['Business', '#business'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-dm)', fontSize: 15, color: 'var(--rv-blush)',
              textDecoration: 'none', letterSpacing: '0.04em',
            }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}