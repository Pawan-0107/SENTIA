'use client'
import { useState } from 'react'

// ─── Comparison ────────────────────────────────────────────────────────────────
const rows = [
  ['AI Personalisation',   '✓', '✗', 'Partial'],
  ['Real-time blending',   '✓', '✗', '✗'],
  ['Auto-flush / hygiene', '✓', '✗', '✗'],
  ['Inventory-free model', '✓', '✗', 'Partial'],
  ['MSME-focused',         '✓', '✗', '✗'],
  ['Recurring revenue',    '✓', '✗', 'Partial'],
]

export function Comparison() {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--rv-deepest)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 400, height: 400, bottom: 0, left: '-8%', background: 'rgba(92,19,64,0.2)' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Why SENTIA</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--rv-pale)' }}>
            Nothing else does <em style={{ fontStyle: 'italic', color: 'var(--rv-blush)' }}>this</em>
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(176,80,128,0.2)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-dm)', fontSize: 11, fontWeight: 400, color: 'rgba(176,80,128,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Feature</th>
                {['SENTIA', 'Traditional retail', 'Other kiosks'].map((h, i) => (
                  <th key={h} style={{ padding: '12px 16px', fontFamily: 'var(--font-dm)', fontSize: 12, fontWeight: i === 0 ? 500 : 400, color: i === 0 ? 'var(--rv-blush)' : 'rgba(176,80,128,0.35)', textAlign: 'center', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feat, a, b, c]) => (
                <tr key={feat} style={{ borderBottom: '1px solid rgba(176,80,128,0.08)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(194,24,91,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.6)' }}>{feat}</td>
                  {[a, b, c].map((v, i) => (
                    <td key={i} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 15, color: v === '✓' ? (i === 0 ? 'var(--rv-bright)' : 'rgba(176,80,128,0.4)') : v === 'Partial' ? 'rgba(201,160,180,0.4)' : 'rgba(176,80,128,0.15)' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── Business Model ─────────────────────────────────────────────────────────────
const streams = [
  ['Machine Lease', '₹20K–₹30K / month', 'Deploy kiosks at MSME outlets, salons, and malls. Machine cost recovers in ~2 months.'],
  ['Cartridge Subscription', '60% gross margin', 'Proprietary refill sets consumed 1–2× per machine per month. Classic razor-blade model.'],
  ['AI SaaS', '₹1K–₹2.5K / machine / month', 'Scent ID™ customer profiles, usage analytics, and AI recommendation engine access.'],
  ['Event Rental', '₹25K–₹60K / event', 'Weddings, expos, college fests. Low marginal cost, high revenue per engagement.'],
  ['Per-Blend Commission', '₹50–₹120 per blend', 'Applied at SENTIA-run kiosks. 20–30 blends/day average target per unit.'],
]

export function BusinessModel() {
  return (
    <section id="business" style={{
      padding: '120px 24px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--rv-dark) 0%, var(--rv-deepest) 100%)',
    }}>
      <div className="orb" style={{ width: 500, height: 500, top: '-5%', right: '-8%', background: 'rgba(139,26,85,0.14)' }} />
      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-label">Revenue model</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--rv-pale)', marginBottom: 12 }}>
            Five streams. One <em style={{ fontStyle: 'italic', color: 'var(--rv-blush)' }}>machine.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.4)', maxWidth: 440, margin: '0 auto' }}>Multi-stream model with strong recurring income. Break-even in ~2 months per unit.</p>
        </div>
        <div style={{ display: 'grid', gap: 12 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {streams.map(([title, metric, desc]) => (
            <div key={title} className="card-rv" style={{ padding: '28px 24px' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, fontWeight: 600, color: 'var(--rv-blush)', marginBottom: 4 }}>{metric}</div>
              <div style={{ fontFamily: 'var(--font-dm)', fontSize: 14, fontWeight: 500, color: 'var(--rv-pale)', marginBottom: 10 }}>{title}</div>
              <p style={{ fontFamily: 'var(--font-dm)', fontSize: 12, color: 'rgba(201,160,180,0.45)', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
          <div style={{
            padding: '28px 24px', borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(194,24,91,0.12), rgba(139,26,85,0.08))',
            border: '1px solid rgba(194,24,91,0.25)',
          }}>
            <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, fontWeight: 600, color: 'var(--rv-bright)', marginBottom: 4 }}>Year 3 target</div>
            <div style={{ fontFamily: 'var(--font-dm)', fontSize: 14, fontWeight: 500, color: 'var(--rv-pale)', marginBottom: 10 }}>₹395–533 Lakhs revenue</div>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: 12, color: 'rgba(244,143,177,0.5)', lineHeight: 1.75 }}>300 units across Karnataka. 60–65% gross margin. Pan-India scale begins Year 4.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Financials ─────────────────────────────────────────────────────────────────
const finData = [
  ['Units (cumulative)',  '5',      '50',      '300',      '600+'],
  ['Revenue (₹ Lakhs)',  '10–16',  '102–141', '395–533',  '710–920'],
  ['Gross margin',       '50–55%', '55–60%',  '60–65%',   '65–70%'],
]

export function Financials() {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--rv-deepest)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 400, height: 400, bottom: '-5%', left: '-5%', background: 'rgba(92,19,64,0.18)' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Traction</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--rv-pale)', marginBottom: 8 }}>4-year forecast</h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: 12, color: 'rgba(176,80,128,0.4)', letterSpacing: '0.05em' }}>Bengaluru → Karnataka → Pan-India</p>
        </div>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(176,80,128,0.15)', borderRadius: 16, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(45,8,32,0.9)' }}>
                <th style={{ textAlign: 'left', padding: '16px 20px', fontFamily: 'var(--font-dm)', fontSize: 11, fontWeight: 400, color: 'rgba(176,80,128,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Metric</th>
                {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map(y => (
                  <th key={y} style={{ padding: '16px 20px', fontFamily: 'var(--font-dm)', fontSize: 12, fontWeight: 400, color: 'rgba(201,160,180,0.5)', textAlign: 'center' }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {finData.map(([label, ...vals], ri) => (
                <tr key={label} style={{ borderTop: '1px solid rgba(176,80,128,0.1)', background: ri === 1 ? 'rgba(194,24,91,0.04)' : 'transparent' }}>
                  <td style={{ padding: '16px 20px', fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.55)' }}>{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'var(--font-cormorant), serif', fontSize: 18, fontWeight: 600, color: ri === 1 ? 'var(--rv-blush)' : 'var(--rv-pale)' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'grid', gap: 12 }} className="grid grid-cols-2 md:grid-cols-4">
          {[['₹38,200', 'Monthly revenue / unit'], ['~2 months', 'Break-even / machine'], ['₹70,000', 'Machine build cost'], ['₹100 Cr', '0.5% market share target']].map(([n, l]) => (
            <div key={n} className="card-rv" style={{ padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24, fontWeight: 600, color: 'var(--rv-blush)', marginBottom: 4 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-dm)', fontSize: 10, color: 'rgba(176,80,128,0.4)', letterSpacing: '0.05em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Impact ─────────────────────────────────────────────────────────────────────
export function Impact() {
  return (
    <section style={{
      padding: '120px 24px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--rv-deepest) 0%, var(--rv-dark) 100%)',
    }}>
      <div className="orb" style={{ width: 500, height: 500, top: 0, right: '-10%', background: 'rgba(139,26,85,0.1)' }} />
      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-label">Purpose</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--rv-pale)', marginBottom: 12 }}>
            Built for <em style={{ fontStyle: 'italic', color: 'var(--rv-blush)' }}>India</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.4)', maxWidth: 440, margin: '0 auto' }}>
            Empowering MSMEs, creating jobs, and cutting waste — not just building a product.
          </p>
        </div>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }} className="grid grid-cols-2 md:grid-cols-4">
          {[['500+', 'MSME partners by Year 3'], ['1,200+', 'Jobs created'], ['80%', 'Packaging waste reduction'], ['₹100 Cr', 'Revenue at 0.5% market share']].map(([n, l]) => (
            <div key={n} className="card-rv" style={{ padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 600, color: 'var(--rv-blush)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-dm)', fontSize: 11, color: 'rgba(176,80,128,0.45)', lineHeight: 1.6 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 12 }} className="grid grid-cols-1 md:grid-cols-2">
          {[
            ['MSME empowerment', 'Women-led SHG franchise model. MSMEs gain in-store differentiation against Nykaa and Amazon. Eliminates capital lock-up from unsold finished inventory.'],
            ['Sustainability', 'Up to 80% reduction in packaging waste vs single-use perfume bottles. Refill model cuts plastic at retail. Real-time blending eliminates overproduction entirely.'],
          ].map(([t, d]) => (
            <div key={t} className="card-rv" style={{ padding: '28px 24px' }}>
              <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 20, fontWeight: 600, color: 'var(--rv-pale)', marginBottom: 10 }}>{t}</h3>
              <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.5)', lineHeight: 1.75 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  const inputStyle = {
    width: '100%', background: 'rgba(45,8,32,0.6)', border: '1px solid rgba(176,80,128,0.2)',
    borderRadius: 10, padding: '12px 16px', color: 'var(--rv-pale)',
    fontFamily: 'var(--font-dm)', fontSize: 13, outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{
      padding: '120px 24px', background: 'var(--rv-dark)', position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb" style={{ width: 500, height: 500, top: '-10%', left: '-10%', background: 'rgba(194,24,91,0.08)' }} />
      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-label">Get in touch</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--rv-pale)', marginBottom: 12 }}>
            Request a <em style={{ fontStyle: 'italic', color: 'var(--rv-blush)' }}>demo</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.4)' }}>
            Interested in deploying SENTIA at your outlet? We'll reach out within 24 hours.
          </p>
        </div>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 36, color: 'var(--rv-blush)', marginBottom: 12 }}>Thank you.</div>
            <p style={{ fontFamily: 'var(--font-dm)', fontSize: 13, color: 'rgba(201,160,180,0.4)' }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['name', 'Your name', 'text'], ['email', 'Email address', 'email']].map(([name, placeholder, type]) => (
              <input key={name} name={name} type={type} required placeholder={placeholder}
                value={form[name]} onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(194,24,91,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(176,80,128,0.2)'}
              />
            ))}
            <select name="business" value={form.business} onChange={handleChange}
              style={{ ...inputStyle, color: form.business ? 'var(--rv-pale)' : 'rgba(201,160,180,0.35)' }}>
              <option value="">Business type (optional)</option>
              {['MSME / Perfume retailer', 'Salon or spa', 'Mall or lifestyle store', 'Event organiser', 'Investor / VC', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
            <textarea name="message" rows={4} placeholder="Tell us about your business..."
              value={form.message} onChange={handleChange}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(194,24,91,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(176,80,128,0.2)'}
            />
            <button type="submit" disabled={status === 'sending'} className="btn-primary"
              style={{ width: '100%', padding: '14px', marginTop: 4, opacity: status === 'sending' ? 0.5 : 1 }}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {status === 'error' && <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(233,30,140,0.7)' }}>Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(176,80,128,0.12)', padding: '48px 24px', textAlign: 'center', background: 'var(--rv-deepest)' }}>
      <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 600, letterSpacing: '0.15em', color: 'var(--rv-pale)', marginBottom: 6 }}>SENTIA</div>
      <div style={{ fontFamily: 'var(--font-dm)', fontSize: 11, color: 'rgba(176,80,128,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Creating Scents That Inspire</div>
      <div style={{ fontFamily: 'var(--font-dm)', fontSize: 11, color: 'rgba(176,80,128,0.25)', lineHeight: 2 }}>
        Moksh Gowda S · Sanjith R Nair · Pranev S · Pawan Kumar Karthik<br />
        Guided by Dr. Satyabrata Das<br />
        Manthan 2026 · FKCCI Innovation Challenge · Bengaluru
      </div>
    </footer>
  )
}