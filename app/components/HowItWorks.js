const steps = [
  ['01', 'Select Preferences', 'Customer picks scent type and intensity via touchscreen — e.g. 40% floral, 30% citrus, 30% woody.'],
  ['02', 'AI Maps Ratios', 'The AI engine converts percentage inputs into precise microlitre volumes and sends signals to microfluidic pumps.'],
  ['03', 'Pumps Dispense', 'Microfluidic pumps activate simultaneously, each releasing a precisely calculated amount at ±2µL precision.'],
  ['04', 'Mixing Chamber', 'Liquids enter an inline chamber; laminar flow microchannels ensure uniform blending without turbulence.'],
  ['05', 'Output Delivered', 'Moment Mode spray (₹30–₹80) or Signature Mode bottle fill (₹300–₹1,500). Same blend, two experiences.'],
  ['06', 'Auto-Flush', 'IPA solvent purges all pathways in 8 seconds between blends — zero cross-contamination, every time.'],
]

export default function HowItWorks() {
  return (
    <section id="how" style={{
      padding: '120px 24px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--rv-deepest) 0%, var(--rv-dark) 100%)',
    }}>
      <div className="orb" style={{ width: 500, height: 500, top: '20%', right: '-10%', background: 'rgba(139,26,85,0.12)' }} />

      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-label">The process</p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300,
            color: 'var(--rv-pale)', marginBottom: 16,
          }}>
            From skin to <em style={{ fontStyle: 'italic', color: 'var(--rv-blush)' }}>soul</em> in six steps
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: 14, color: 'rgba(201,160,180,0.5)', maxWidth: 480, margin: '0 auto' }}>
            Every blend is created in real-time. No pre-made stock. No compromise.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(([num, title, desc], i) => (
            <div key={num} className="card-rv" style={{
              padding: '36px 28px', position: 'relative', overflow: 'hidden',
              borderRadius: i === 0 ? '16px 0 0 0' : i === 2 ? '0 16px 0 0' : i === 3 ? '0 0 0 16px' : i === 5 ? '0 0 16px 0' : 0,
            }}>
              {/* Number watermark */}
              <div style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 80, fontWeight: 700, lineHeight: 1,
                color: 'rgba(194,24,91,0.06)', pointerEvents: 'none', userSelect: 'none',
              }}>{num}</div>

              <div style={{
                fontFamily: 'var(--font-dm)', fontSize: 11, letterSpacing: '0.2em',
                color: 'var(--rv-accent)', textTransform: 'uppercase', marginBottom: 12,
              }}>{num}</div>
              <h3 style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 22, fontWeight: 600, color: 'var(--rv-pale)', marginBottom: 12,
              }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.55)', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA to demo */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <a href="/demo" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Try the interactive simulation →
          </a>
        </div>
      </div>
    </section>
  )
}