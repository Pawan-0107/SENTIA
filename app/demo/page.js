'use client'
import { useState, useEffect, useRef } from 'react'

const steps = [
  {
    id: 1,
    code: '01',
    title: 'Select Preferences',
    subtitle: 'Customer input via touchscreen',
    description:
      'You choose your scent profile by adjusting percentage sliders. The AI accepts up to 5 fragrance families simultaneously, each mapped to a physical cartridge inside the kiosk.',
    detail:
      'The touchscreen UI runs on an embedded SBC (single board computer). Selections are validated in real-time — the system ensures percentages sum to 100% before proceeding.',
    color: '#f5c842',
    icon: '◈',
    interactive: 'sliders',
  },
  {
    id: 2,
    code: '02',
    title: 'AI Maps Ratios',
    subtitle: 'Neural computation',
    description:
      'SENTIA\'s AI engine converts your percentage inputs into precise microlitre volumes. It accounts for density differences between fragrance oils, evaporation rates, and blend harmony rules.',
    detail:
      'The model was trained on 2,000+ perfumer formulations. It also applies a "harmony correction" — nudging ratios slightly when combinations are known to clash at the molecular level.',
    color: '#c084fc',
    icon: '⬡',
    interactive: 'mapping',
  },
  {
    id: 3,
    code: '03',
    title: 'Pumps Dispense',
    subtitle: 'Microfluidic precision',
    description:
      'Each cartridge pump activates simultaneously. Microfluidic pumps operate at ±2µL precision — equivalent to 1/500th of a single drop — ensuring your blend is reproduced identically every time.',
    detail:
      'Pumps are electronically controlled via PWM signals from the main controller. Each pump is independently calibrated during manufacturing and recalibrated via software after every 500 cycles.',
    color: '#34d399',
    icon: '⬡',
    interactive: 'pumps',
  },
  {
    id: 4,
    code: '04',
    title: 'Mixing Chamber',
    subtitle: 'Laminar flow blending',
    description:
      'Liquids enter a proprietary inline mixing chamber. Microchannel geometry creates laminar flow that folds the liquids together without turbulence — the same principle used in lab-on-chip devices.',
    detail:
      'The chamber is made from medical-grade PDMS. At this scale, mixing happens through diffusion rather than mechanical agitation — producing a more uniform blend than any manual method.',
    color: '#fb923c',
    icon: '◎',
    interactive: 'mixing',
  },
  {
    id: 5,
    code: '05',
    title: 'Output Delivered',
    subtitle: 'Two modes of delivery',
    description:
      'Moment Mode sprays directly onto skin (₹30–₹80). Signature Mode fills a 10ml bottle you take home (₹300–₹1,500). Both use the same blend — only the delivery mechanism differs.',
    detail:
      'The nozzle uses an ultrasonic atomiser for Moment Mode — producing a 5–10µm mist that maximises skin adherence. Signature Mode uses a peristaltic pump for precise bottle filling.',
    color: '#f5c842',
    icon: '◉',
    interactive: 'output',
  },
  {
    id: 6,
    code: '06',
    title: 'Auto-Flush',
    subtitle: 'Zero cross-contamination',
    description:
      'After every blend, a cleaning solvent purges all microchannels and the mixing chamber. The flush cycle takes 8 seconds and is invisible to the customer — the next person gets a perfectly clean system.',
    detail:
      'The flush fluid is isopropyl alcohol at 70% concentration. Sensors verify flush completion by measuring optical clarity of the outflow. If clarity isn\'t achieved, it re-flushes automatically.',
    color: '#38bdf8',
    icon: '↺',
    interactive: 'flush',
  },
]

function SlidersInteractive() {
  const [vals, setVals] = useState({ Floral: 40, Citrus: 30, Woody: 20, Musk: 10 })
  const total = Object.values(vals).reduce((a, b) => a + b, 0)
  const colors = { Floral: '#f5c842', Citrus: '#fb923c', Woody: '#34d399', Musk: '#c084fc' }

  const adjust = (key, v) => {
    const newVal = Math.max(0, Math.min(100, Number(v)))
    const diff = newVal - vals[key]
    const others = Object.keys(vals).filter(k => k !== key)
    const newVals = { ...vals, [key]: newVal }
    let remaining = diff
    for (let i = 0; i < others.length; i++) {
      const k = others[i]
      const take = i === others.length - 1 ? remaining : Math.round(remaining / (others.length - i))
      newVals[k] = Math.max(0, newVals[k] - take)
      remaining -= (vals[k] - newVals[k])
    }
    setVals(newVals)
  }

  return (
    <div className="space-y-3 mt-4">
      {Object.entries(vals).map(([k, v]) => (
        <div key={k}>
          <div className="flex justify-between text-xs mb-1" style={{ color: colors[k] }}>
            <span>{k}</span><span>{v}%</span>
          </div>
          <input type="range" min={0} max={100} value={v}
            onChange={e => adjust(k, e.target.value)}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: colors[k], background: `linear-gradient(to right, ${colors[k]} ${v}%, #2a2a2a ${v}%)` }} />
        </div>
      ))}
      <div className={`text-xs mt-3 text-center font-mono ${total === 100 ? 'text-green-400' : 'text-red-400'}`}>
        Total: {total}% {total === 100 ? '✓ Ready to blend' : `— adjust by ${100 - total > 0 ? '+' : ''}${100 - total}`}
      </div>
    </div>
  )
}

function MappingInteractive() {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputs = [['Floral 40%', '#f5c842'], ['Citrus 30%', '#fb923c'], ['Woody 20%', '#34d399'], ['Musk 10%', '#c084fc']]
  const outputs = [['Floral oil', '48.2µL', '#f5c842'], ['Citrus oil', '34.6µL', '#fb923c'], ['Woody oil', '22.1µL', '#34d399'], ['Musk oil', '10.8µL', '#c084fc']]

  const run = () => {
    setRunning(true); setDone(false); setProgress(0)
    let p = 0
    const t = setInterval(() => {
      p += 4
      setProgress(p)
      if (p >= 100) { clearInterval(t); setRunning(false); setDone(true) }
    }, 40)
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4 text-xs mb-4">
        <div>
          <div className="text-[#555] mb-2 uppercase tracking-widest text-[10px]">Input</div>
          {inputs.map(([l, c]) => <div key={l} className="flex items-center gap-2 mb-1.5"><div className="w-2 h-2 rounded-full" style={{ background: c }} /><span style={{ color: c }}>{l}</span></div>)}
        </div>
        <div>
          <div className="text-[#555] mb-2 uppercase tracking-widest text-[10px]">Output</div>
          {outputs.map(([l, v, c]) => (
            <div key={l} className="flex items-center justify-between mb-1.5">
              <span style={{ color: done ? c : '#333' }}>{l}</span>
              <span className="font-mono" style={{ color: done ? c : '#333' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {running && <div className="h-1 bg-[#1a1a1a] rounded-full mb-3 overflow-hidden"><div className="h-full bg-[#c084fc] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>}
      <button onClick={run} disabled={running}
        className="w-full py-2 rounded-lg text-xs font-semibold border transition-all disabled:opacity-40"
        style={{ borderColor: '#c084fc', color: running ? '#c084fc' : '#0a0a0a', background: running ? 'transparent' : '#c084fc' }}>
        {running ? 'Computing...' : done ? 'Run again' : 'Run AI mapping'}
      </button>
    </div>
  )
}

function PumpsInteractive() {
  const [active, setActive] = useState(false)
  const [fills, setFills] = useState([0, 0, 0, 0])
  const targets = [48, 35, 22, 11]
  const colors = ['#f5c842', '#fb923c', '#34d399', '#c084fc']
  const labels = ['Floral', 'Citrus', 'Woody', 'Musk']

  const run = () => {
    setActive(true)
    setFills([0, 0, 0, 0])
    targets.forEach((target, i) => {
      let v = 0
      const t = setInterval(() => {
        v = Math.min(target, v + 2)
        setFills(f => { const n = [...f]; n[i] = v; return n })
        if (v >= target) clearInterval(t)
      }, 30 + i * 10)
    })
    setTimeout(() => setActive(false), 2000)
  }

  return (
    <div className="mt-4">
      <div className="flex gap-3 justify-center mb-4">
        {fills.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-[10px] font-mono" style={{ color: colors[i] }}>{f}µL</div>
            <div className="w-8 h-20 bg-[#1a1a1a] rounded border border-[#2a2a2a] flex flex-col justify-end overflow-hidden">
              <div className="rounded transition-all duration-75" style={{ height: `${(f / targets[i]) * 100}%`, background: colors[i], opacity: 0.8 }} />
            </div>
            <div className="text-[10px] text-[#555]">{labels[i]}</div>
          </div>
        ))}
      </div>
      <button onClick={run} disabled={active}
        className="w-full py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
        style={{ background: '#34d399', color: '#0a0a0a' }}>
        {active ? 'Dispensing...' : 'Activate pumps'}
      </button>
    </div>
  )
}

function MixingInteractive() {
  const [mixing, setMixing] = useState(false)
  const [mixed, setMixed] = useState(false)
  const [angle, setAngle] = useState(0)
  const af = useRef(null)

  const run = () => {
    setMixing(true); setMixed(false)
    let a = 0; let speed = 2
    const animate = () => {
      a += speed
      speed = Math.min(speed + 0.1, 8)
      setAngle(a)
      if (a < 720) af.current = requestAnimationFrame(animate)
      else { setMixing(false); setMixed(true) }
    }
    af.current = requestAnimationFrame(animate)
  }

  const colors = ['#f5c842', '#fb923c', '#34d399', '#c084fc']

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="relative w-24 h-24 mb-4">
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <circle cx="48" cy="48" r="44" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
          {colors.map((c, i) => {
            const r = mixed ? 0 : 16
            const ox = mixed ? 0 : Math.cos((angle * Math.PI / 180) + (i * Math.PI / 2)) * r
            const oy = mixed ? 0 : Math.sin((angle * Math.PI / 180) + (i * Math.PI / 2)) * r
            return <circle key={i} cx={48 + ox} cy={48 + oy} r={mixed ? 20 : 8} fill={c} opacity={mixed ? 0.3 : 0.8} style={{ transition: mixed ? 'all 0.5s' : 'none' }} />
          })}
          {mixed && <circle cx="48" cy="48" r="20" fill="#d4a843" opacity="0.6" />}
        </svg>
      </div>
      <div className="text-xs text-[#555] mb-3">{mixed ? 'Blend complete — uniform mixture achieved' : mixing ? 'Laminar flow mixing in progress...' : 'Click to simulate mixing chamber'}</div>
      <button onClick={run} disabled={mixing}
        className="w-full py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
        style={{ background: '#fb923c', color: '#0a0a0a' }}>
        {mixing ? 'Mixing...' : mixed ? 'Mix again' : 'Start mixing'}
      </button>
    </div>
  )
}

function OutputInteractive() {
  const [mode, setMode] = useState(null)
  const [dispensing, setDispensing] = useState(false)
  const [done, setDone] = useState(false)
  const [fill, setFill] = useState(0)

  const dispense = (m) => {
    setMode(m); setDispensing(true); setDone(false); setFill(0)
    let v = 0
    const t = setInterval(() => {
      v = Math.min(100, v + (m === 'moment' ? 10 : 3))
      setFill(v)
      if (v >= 100) { clearInterval(t); setDispensing(false); setDone(true) }
    }, 60)
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[['moment', 'Moment Mode', '₹30–₹80', 'Direct spray'], ['signature', 'Signature Mode', '₹300–₹1,500', '10ml bottle']].map(([m, label, price, sub]) => (
          <button key={m} onClick={() => dispense(m)} disabled={dispensing}
            className="p-3 rounded-xl border text-left transition-all disabled:opacity-40"
            style={{ borderColor: mode === m ? '#f5c842' : '#2a2a2a', background: mode === m ? '#f5c84210' : '#1a1a1a' }}>
            <div className="text-xs font-semibold text-white mb-0.5">{label}</div>
            <div className="text-[10px] text-[#f5c842] font-mono">{price}</div>
            <div className="text-[10px] text-[#555] mt-0.5">{sub}</div>
          </button>
        ))}
      </div>
      {mode && (
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden mb-2">
          <div className="h-full rounded-full transition-all" style={{ width: `${fill}%`, background: '#f5c842' }} />
        </div>
      )}
      <div className="text-xs text-center text-[#555]">
        {done ? `✓ ${mode === 'moment' ? 'Sprayed! Enjoy your scent.' : 'Bottle filled. Take it home.'}` : mode ? 'Dispensing...' : 'Select a mode to dispense'}
      </div>
    </div>
  )
}

function FlushInteractive() {
  const [stage, setStage] = useState(0)
  const stages = [
    { label: 'Idle', color: '#2a2a2a', text: 'System ready' },
    { label: 'Flushing', color: '#38bdf8', text: 'IPA 70% purging channels...' },
    { label: 'Verifying', color: '#c084fc', text: 'Optical clarity sensor checking...' },
    { label: 'Clean', color: '#34d399', text: '✓ All channels clear. Ready for next customer.' },
  ]

  const next = () => {
    if (stage >= stages.length - 1) { setStage(0); return }
    setStage(s => s + 1)
  }

  return (
    <div className="mt-4">
      <div className="flex gap-1 mb-4">
        {stages.map((s, i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
            style={{ background: i <= stage ? s.color : '#2a2a2a' }} />
        ))}
      </div>
      <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4 border border-[#2a2a2a] min-h-[60px] flex items-center justify-center">
        <div className="text-sm text-center" style={{ color: stages[stage].color }}>
          {stages[stage].text}
        </div>
      </div>
      <div className="flex gap-2 text-[10px] text-[#555] mb-4 flex-wrap">
        {stages.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: i <= stage ? s.color : '#2a2a2a' }} />
            {s.label}
          </span>
        ))}
      </div>
      <button onClick={next}
        className="w-full py-2 rounded-lg text-xs font-semibold transition-all"
        style={{ background: stages[stage].color, color: '#0a0a0a' }}>
        {stage === 0 ? 'Start flush cycle' : stage === stages.length - 1 ? 'Reset' : 'Next stage →'}
      </button>
    </div>
  )
}

const interactiveMap = {
  sliders: SlidersInteractive,
  mapping: MappingInteractive,
  pumps: PumpsInteractive,
  mixing: MixingInteractive,
  output: OutputInteractive,
  flush: FlushInteractive,
}

export default function DemoPage() {
  const [active, setActive] = useState(1)
  const [animating, setAnimating] = useState(false)

  const go = (id) => {
    if (id === active) return
    setAnimating(true)
    setTimeout(() => { setActive(id); setAnimating(false) }, 180)
  }

  const step = steps.find(s => s.id === active)
  const Interactive = interactiveMap[step.interactive]

  return (
    <main className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-[#1a1a1a] z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-bold tracking-widest text-[#f5c842]" style={{ fontFamily: 'var(--font-playfair), serif' }}>SENTIA</a>
          <span className="text-xs text-[#555] tracking-widest uppercase">How It Works — Interactive</span>
          <a href="/" className="text-xs text-[#555] hover:text-white transition">← Back</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#f5c842] uppercase mb-3">Interactive walkthrough</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Inside a SENTIA blend
          </h1>
          <p className="text-[#555] text-sm max-w-lg mx-auto">
            Step through every stage of the process. Each step has a live simulation — try it.
          </p>
        </div>

        {/* Step pills */}
        <div className="flex gap-2 justify-center flex-wrap mb-12">
          {steps.map(s => (
            <button key={s.id} onClick={() => go(s.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-200"
              style={{
                borderColor: active === s.id ? s.color : '#2a2a2a',
                background: active === s.id ? `${s.color}15` : '#111',
                color: active === s.id ? s.color : '#555',
              }}>
              <span className="font-mono">{s.code}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity duration-180 ${animating ? 'opacity-0' : 'opacity-100'}`}>

          {/* Left — info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border"
                style={{ borderColor: step.color, background: `${step.color}10`, color: step.color }}>
                {step.icon}
              </div>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase" style={{ color: step.color }}>{step.code} / 06</div>
                <div className="text-white font-bold text-xl">{step.title}</div>
              </div>
            </div>

            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4">{step.description}</p>

            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-6">
              <div className="text-xs text-[#444] uppercase tracking-widest mb-2">Technical detail</div>
              <p className="text-[#666] text-xs leading-relaxed">{step.detail}</p>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5">
              {steps.map(s => (
                <div key={s.id} onClick={() => go(s.id)}
                  className="h-0.5 flex-1 rounded-full cursor-pointer transition-all duration-300"
                  style={{ background: s.id <= active ? step.color : '#1a1a1a' }} />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3 mt-5">
              <button onClick={() => go(Math.max(1, active - 1))} disabled={active === 1}
                className="flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all disabled:opacity-20"
                style={{ borderColor: '#2a2a2a', color: '#555' }}>
                ← Previous
              </button>
              <button onClick={() => go(Math.min(6, active + 1))} disabled={active === 6}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-20"
                style={{ background: step.color, color: '#0a0a0a' }}>
                Next →
              </button>
            </div>
          </div>

          {/* Right — interactive */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6"
            style={{ boxShadow: `0 0 40px ${step.color}08` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-widest text-[#444]">Live simulation</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: step.color, color: step.color }}>
                interactive
              </span>
            </div>
            <div className="text-white font-semibold text-sm mb-1">{step.subtitle}</div>
            <div className="h-px bg-[#1a1a1a] mb-1" />
            <Interactive />
          </div>
        </div>

        {/* All steps mini grid */}
        <div className="mt-20">
          <p className="text-xs text-[#333] uppercase tracking-widest text-center mb-6">All steps</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {steps.map(s => (
              <button key={s.id} onClick={() => go(s.id)}
                className="p-4 rounded-xl border text-left transition-all hover:scale-105"
                style={{
                  borderColor: active === s.id ? s.color : '#1a1a1a',
                  background: active === s.id ? `${s.color}08` : '#111',
                }}>
                <div className="text-2xl mb-2" style={{ color: s.color }}>{s.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: s.color }}>{s.code}</div>
                <div className="text-xs text-white font-medium leading-tight">{s.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-[#111] border border-[#1a1a1a] rounded-2xl p-12"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(245,200,66,0.04) 0%, #111 100%)' }}>
          <p className="text-xs uppercase tracking-[0.25em] text-[#f5c842] mb-3">Ready to deploy</p>
          <h2 className="font-bold text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Want SENTIA at your outlet?
          </h2>
          <p className="text-[#555] text-sm mb-6">Join the waitlist for early MSME deployment across Bengaluru.</p>
          <a href="/#contact"
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-all hover:bg-amber-300"
            style={{ background: '#f5c842', color: '#0a0a0a' }}>
            Request a demo
          </a>
        </div>
      </div>
    </main>
  )
}