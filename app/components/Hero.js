export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      padding: '120px 24px 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: '-10%', left: '-15%', background: 'rgba(139,26,85,0.18)' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: '5%', right: '-10%', background: 'rgba(233,30,140,0.1)' }} />
      <div className="orb" style={{ width: 300, height: 300, top: '30%', right: '20%', background: 'rgba(92,19,64,0.2)' }} />

      {/* Decorative ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        border: '1px solid rgba(176,80,128,0.06)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        border: '1px solid rgba(194,24,91,0.08)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>

        {/* Pill badge */}
        <div className="fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(194,24,91,0.08)', border: '1px solid rgba(194,24,91,0.25)',
          borderRadius: 100, padding: '6px 18px', marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rv-bright)', display: 'inline-block', boxShadow: '0 0 6px rgba(233,30,140,0.8)' }} />
          <span style={{ fontFamily: 'var(--font-dm)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--rv-accent)', textTransform: 'uppercase' }}>
            India's first AI microfluidic fragrance kiosk
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up-1" style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(52px, 9vw, 96px)',
          fontWeight: 300, lineHeight: 1.0,
          letterSpacing: '-0.02em', marginBottom: 8,
          color: 'var(--rv-pale)',
        }}>
          Scent is
        </h1>
        <h1 className="fade-up-2 shimmer-text" style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(52px, 9vw, 96px)',
          fontWeight: 600, lineHeight: 1.0,
          letterSpacing: '-0.02em', marginBottom: 32,
          fontStyle: 'italic',
        }}>
          personal.
        </h1>

        <p className="fade-up-3" style={{
          fontFamily: 'var(--font-dm)', fontSize: 16, fontWeight: 300,
          color: 'rgba(201,160,180,0.65)', lineHeight: 1.8,
          maxWidth: 520, margin: '0 auto 48px', letterSpacing: '0.02em',
        }}>
          SENTIA blends hyper-personalised perfumes on demand using AI — deployed as kiosks at
          MSMEs, salons, boutiques, and events across India.
        </p>

        {/* CTAs */}
        <div className="fade-up-4" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
          <a href="#contact" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Demo</a>
          <a href="/demo" className="btn-ghost" style={{ textDecoration: 'none' }}>Experience a Blend →</a>
        </div>

        {/* Stats bar */}
        <div className="fade-up-4" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1, maxWidth: 640, margin: '0 auto',
          background: 'rgba(176,80,128,0.15)', borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(176,80,128,0.2)',
        }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {[
            ['₹20,000 Cr+', 'Fragrance market by 2027'],
            ['60%', 'Gross margin on cartridges'],
            ['~2 months', 'Machine break-even'],
            ['₹15 Lakhs', 'Funding sought'],
          ].map(([n, l], i) => (
            <div key={n} style={{
              padding: '24px 20px', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(45,8,32,0.8), rgba(26,4,16,0.9))',
              borderRight: i < 3 ? '1px solid rgba(176,80,128,0.15)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 28, fontWeight: 600, color: 'var(--rv-blush)',
                lineHeight: 1.1, marginBottom: 4,
              }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-dm)', fontSize: 10, color: 'rgba(176,80,128,0.6)', letterSpacing: '0.05em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div style={{
          width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(194,24,91,0.6), transparent)',
          margin: '0 auto',
        }} />
      </div>
    </section>
  )
}