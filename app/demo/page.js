'use client'
import { useState, useRef } from 'react'

// ─── Color palette for steps ──────────────────────────────────────────────────
const stepColors = [
  '#E91E8C', // electric magenta
  '#C2185B', // rose crimson
  '#B05080', // dusty mauve
  '#8B1A55', // deep berry
  '#E91E8C', // back to magenta
  '#F48FB1', // soft blush
]

const steps = [
  { id:1, code:'01', title:'Select Preferences', subtitle:'Customer input via touchscreen', description:'You choose your scent profile by adjusting percentage sliders. The AI accepts up to 5 fragrance families simultaneously, each mapped to a physical cartridge inside the kiosk.', detail:'The touchscreen UI runs on an embedded SBC. Selections are validated in real-time — the system ensures percentages sum to 100% before proceeding.', interactive:'sliders' },
  { id:2, code:'02', title:'AI Maps Ratios', subtitle:'Neural computation', description:"SENTIA's AI engine converts your percentage inputs into precise microlitre volumes, accounting for density differences, evaporation rates, and blend harmony rules.", detail:'The model was trained on 2,000+ perfumer formulations. It also applies a "harmony correction" — nudging ratios when combinations are known to clash at the molecular level.', interactive:'mapping' },
  { id:3, code:'03', title:'Pumps Dispense', subtitle:'Microfluidic precision', description:'Each cartridge pump activates simultaneously. Microfluidic pumps operate at ±2µL precision — equivalent to 1/500th of a single drop — ensuring identical reproduction every time.', detail:'Pumps are electronically controlled via PWM signals. Each pump is independently calibrated during manufacturing and recalibrated via software after every 500 cycles.', interactive:'pumps' },
  { id:4, code:'04', title:'Mixing Chamber', subtitle:'Laminar flow blending', description:'Liquids enter a proprietary inline mixing chamber. Microchannel geometry creates laminar flow that folds liquids together without turbulence — same principle as lab-on-chip devices.', detail:'The chamber is made from medical-grade PDMS. At this scale, mixing happens through diffusion rather than mechanical agitation — producing a more uniform blend.', interactive:'mixing' },
  { id:5, code:'05', title:'Output Delivered', subtitle:'Two modes of delivery', description:'Moment Mode sprays directly onto skin (₹30–₹80). Signature Mode fills a 10ml bottle you take home (₹300–₹1,500). Both use the same blend — only delivery differs.', detail:'The nozzle uses an ultrasonic atomiser for Moment Mode — 5–10µm mist for maximum skin adherence. Signature Mode uses a peristaltic pump for precise bottle filling.', interactive:'output' },
  { id:6, code:'06', title:'Auto-Flush', subtitle:'Zero cross-contamination', description:"After every blend, IPA solvent purges all microchannels and the mixing chamber. The flush cycle takes 8 seconds — invisible to the customer. The next person gets a perfectly clean system.", detail:"Sensors verify flush completion by measuring optical clarity of the outflow. If clarity isn't achieved, it re-flushes automatically until the reading is clean.", interactive:'flush' },
]

// ─── Input styles ──────────────────────────────────────────────────────────────
const inp = (accent) => ({
  width: '100%', background: 'rgba(45,8,32,0.6)',
  border: `1px solid rgba(176,80,128,0.2)`,
  borderRadius: 8, padding: '10px 14px',
  color: '#FCE4EC', fontFamily: 'var(--font-dm), sans-serif',
  fontSize: 13, outline: 'none',
})

// ─── Sliders ───────────────────────────────────────────────────────────────────
function SlidersInteractive({ color }) {
  const [vals, setVals] = useState({ Floral:40, Citrus:30, Woody:20, Musk:10 })
  const total = Object.values(vals).reduce((a,b)=>a+b,0)
  const cols = { Floral:'#E91E8C', Citrus:'#C2185B', Woody:'#B05080', Musk:'#8B1A55' }

  const adjust = (key, v) => {
    const nv = Math.max(0, Math.min(100, Number(v)))
    const diff = nv - vals[key]
    const others = Object.keys(vals).filter(k=>k!==key)
    const n = {...vals, [key]:nv}
    let rem = diff
    for (let i=0; i<others.length; i++) {
      const k = others[i]
      const take = i===others.length-1 ? rem : Math.round(rem/(others.length-i))
      n[k] = Math.max(0, n[k]-take)
      rem -= (vals[k]-n[k])
    }
    setVals(n)
  }

  return (
    <div style={{marginTop:20}}>
      {Object.entries(vals).map(([k,v])=>(
        <div key={k} style={{marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
            <span style={{fontFamily:'var(--font-dm)',fontSize:12,color:cols[k]}}>{k}</span>
            <span style={{fontFamily:'var(--font-dm)',fontSize:12,color:cols[k]}}>{v}%</span>
          </div>
          <input type="range" min={0} max={100} value={v}
            onChange={e=>adjust(k,e.target.value)}
            style={{width:'100%',height:2,borderRadius:2,cursor:'pointer',accentColor:cols[k],background:`linear-gradient(to right,${cols[k]} ${v}%,rgba(45,8,32,0.8) ${v}%)`}}
          />
        </div>
      ))}
      <div style={{textAlign:'center',marginTop:12,fontFamily:'var(--font-dm)',fontSize:12,color:total===100?'#A5D6A7':'rgba(233,30,140,0.7)'}}>
        {total===100 ? '✓ Ready to blend' : `Total: ${total}% — adjust by ${100-total>0?'+':''}${100-total}`}
      </div>
    </div>
  )
}

// ─── AI Mapping ────────────────────────────────────────────────────────────────
function MappingInteractive({ color }) {
  const [running,setRunning]=useState(false)
  const [done,setDone]=useState(false)
  const [prog,setProg]=useState(0)
  const inputs=[['Floral 40%','#E91E8C'],['Citrus 30%','#C2185B'],['Woody 20%','#B05080'],['Musk 10%','#8B1A55']]
  const outputs=[['Floral oil','48.2µL','#E91E8C'],['Citrus oil','34.6µL','#C2185B'],['Woody oil','22.1µL','#B05080'],['Musk oil','10.8µL','#8B1A55']]

  const run=()=>{
    setRunning(true);setDone(false);setProg(0)
    let p=0
    const t=setInterval(()=>{p+=4;setProg(p);if(p>=100){clearInterval(t);setRunning(false);setDone(true)}},40)
  }
  return (
    <div style={{marginTop:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div>
          <div style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.15em',color:'rgba(176,80,128,0.4)',textTransform:'uppercase',marginBottom:10}}>Input</div>
          {inputs.map(([l,c])=><div key={l} style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><div style={{width:6,height:6,borderRadius:'50%',background:c,flexShrink:0}}/><span style={{fontFamily:'var(--font-dm)',fontSize:12,color:c}}>{l}</span></div>)}
        </div>
        <div>
          <div style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.15em',color:'rgba(176,80,128,0.4)',textTransform:'uppercase',marginBottom:10}}>Output</div>
          {outputs.map(([l,v,c])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
              <span style={{fontFamily:'var(--font-dm)',fontSize:12,color:done?c:'rgba(176,80,128,0.2)',transition:'color 0.5s'}}>{l}</span>
              <span style={{fontFamily:'var(--font-dm)',fontSize:12,color:done?c:'rgba(176,80,128,0.2)',transition:'color 0.5s'}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {running&&<div style={{height:2,background:'rgba(176,80,128,0.15)',borderRadius:2,marginBottom:12,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,background:color,width:`${prog}%`,transition:'width 0.1s'}}/></div>}
      <button onClick={run} disabled={running} style={{width:'100%',padding:'10px',borderRadius:8,border:'none',cursor:'pointer',background:running?'transparent':color,color:running?color:'white',border:`1px solid ${color}`,fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,opacity:running?0.6:1,transition:'all 0.2s'}}>
        {running?'Computing…':done?'Run again':'Run AI mapping'}
      </button>
    </div>
  )
}

// ─── Pumps ────────────────────────────────────────────────────────────────────
function PumpsInteractive({ color }) {
  const [active,setActive]=useState(false)
  const [fills,setFills]=useState([0,0,0,0])
  const targets=[48,35,22,11]
  const cols=['#E91E8C','#C2185B','#B05080','#8B1A55']
  const labels=['Floral','Citrus','Woody','Musk']

  const run=()=>{
    setActive(true);setFills([0,0,0,0])
    targets.forEach((target,i)=>{
      let v=0
      const t=setInterval(()=>{v=Math.min(target,v+2);setFills(f=>{const n=[...f];n[i]=v;return n});if(v>=target)clearInterval(t)},30+i*10)
    })
    setTimeout(()=>setActive(false),2200)
  }

  return (
    <div style={{marginTop:20}}>
      <div style={{display:'flex',justifyContent:'center',gap:20,marginBottom:20}}>
        {fills.map((f,i)=>(
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
            <span style={{fontFamily:'var(--font-dm)',fontSize:10,color:cols[i]}}>{f}µL</span>
            <div style={{width:32,height:80,background:'rgba(45,8,32,0.8)',borderRadius:6,border:'1px solid rgba(176,80,128,0.2)',display:'flex',flexDirection:'column',justifyContent:'flex-end',overflow:'hidden'}}>
              <div style={{borderRadius:4,background:cols[i],opacity:0.85,height:`${(f/targets[i])*100}%`,transition:'height 0.08s'}}/>
            </div>
            <span style={{fontFamily:'var(--font-dm)',fontSize:10,color:'rgba(176,80,128,0.4)'}}>{labels[i]}</span>
          </div>
        ))}
      </div>
      <button onClick={run} disabled={active} style={{width:'100%',padding:'10px',borderRadius:8,border:'none',cursor:'pointer',background:active?'transparent':color,color:active?color:'white',border:`1px solid ${color}`,fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,opacity:active?0.6:1,transition:'all 0.2s'}}>
        {active?'Dispensing…':'Activate pumps'}
      </button>
    </div>
  )
}

// ─── Mixing ────────────────────────────────────────────────────────────────────
function MixingInteractive({ color }) {
  const [mixing,setMixing]=useState(false)
  const [mixed,setMixed]=useState(false)
  const [angle,setAngle]=useState(0)
  const af=useRef(null)
  const cols=['#E91E8C','#C2185B','#B05080','#8B1A55']

  const run=()=>{
    setMixing(true);setMixed(false)
    let a=0;let speed=2
    const animate=()=>{a+=speed;speed=Math.min(speed+0.12,10);setAngle(a);if(a<720)af.current=requestAnimationFrame(animate);else{setMixing(false);setMixed(true)}}
    af.current=requestAnimationFrame(animate)
  }
  return (
    <div style={{marginTop:20,display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{width:96,height:96,marginBottom:16}}>
        <svg viewBox="0 0 96 96" style={{width:'100%',height:'100%'}}>
          <circle cx="48" cy="48" r="44" fill="rgba(45,8,32,0.8)" stroke="rgba(176,80,128,0.2)" strokeWidth="1"/>
          {cols.map((c,i)=>{
            const r=mixed?0:16
            const ox=mixed?0:Math.cos((angle*Math.PI/180)+(i*Math.PI/2))*r
            const oy=mixed?0:Math.sin((angle*Math.PI/180)+(i*Math.PI/2))*r
            return <circle key={i} cx={48+ox} cy={48+oy} r={mixed?22:9} fill={c} opacity={mixed?0.25:0.85} style={{transition:mixed?'all 0.6s':'none'}}/>
          })}
          {mixed&&<circle cx="48" cy="48" r="22" fill="#C2185B" opacity="0.6"/>}
        </svg>
      </div>
      <div style={{fontFamily:'var(--font-dm)',fontSize:12,color:'rgba(176,80,128,0.45)',textAlign:'center',marginBottom:14,minHeight:18}}>
        {mixed?'Blend complete — uniform mixture achieved':mixing?'Laminar flow mixing in progress…':'Click to simulate mixing chamber'}
      </div>
      <button onClick={run} disabled={mixing} style={{width:'100%',padding:'10px',borderRadius:8,border:'none',cursor:'pointer',background:mixing?'transparent':color,color:mixing?color:'white',border:`1px solid ${color}`,fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,opacity:mixing?0.6:1,transition:'all 0.2s'}}>
        {mixing?'Mixing…':mixed?'Mix again':'Start mixing'}
      </button>
    </div>
  )
}

// ─── Output ────────────────────────────────────────────────────────────────────
function OutputInteractive({ color }) {
  const [mode,setMode]=useState(null)
  const [dispensing,setDispensing]=useState(false)
  const [done,setDone]=useState(false)
  const [fill,setFill]=useState(0)

  const dispense=(m)=>{
    setMode(m);setDispensing(true);setDone(false);setFill(0)
    let v=0
    const t=setInterval(()=>{v=Math.min(100,v+(m==='moment'?10:3));setFill(v);if(v>=100){clearInterval(t);setDispensing(false);setDone(true)}},60)
  }
  return (
    <div style={{marginTop:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        {[['moment','Moment Mode','₹30–₹80','Direct spray'],['signature','Signature Mode','₹300–₹1,500','10ml bottle']].map(([m,label,price,sub])=>(
          <button key={m} onClick={()=>dispense(m)} disabled={dispensing} style={{padding:'14px 12px',borderRadius:10,border:`1px solid ${mode===m?color:'rgba(176,80,128,0.2)'}`,background:mode===m?`rgba(194,24,91,0.08)`:'rgba(45,8,32,0.6)',cursor:'pointer',textAlign:'left',transition:'all 0.2s',opacity:dispensing&&mode!==m?0.4:1}}>
            <div style={{fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,color:'#FCE4EC',marginBottom:3}}>{label}</div>
            <div style={{fontFamily:'var(--font-cormorant),serif',fontSize:16,color:color,marginBottom:2}}>{price}</div>
            <div style={{fontFamily:'var(--font-dm)',fontSize:10,color:'rgba(176,80,128,0.4)'}}>{sub}</div>
          </button>
        ))}
      </div>
      {mode&&<div style={{height:2,background:'rgba(176,80,128,0.15)',borderRadius:2,marginBottom:10,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,background:color,width:`${fill}%`,transition:'width 0.1s'}}/></div>}
      <div style={{fontFamily:'var(--font-dm)',fontSize:12,textAlign:'center',color:'rgba(176,80,128,0.5)',marginBottom:14,minHeight:18}}>
        {done?`✓ ${mode==='moment'?'Sprayed! Enjoy your scent.':'Bottle filled. Take it home.'}`:mode?'Dispensing…':'Select a mode to dispense'}
      </div>
    </div>
  )
}

// ─── Flush ────────────────────────────────────────────────────────────────────
function FlushInteractive({ color }) {
  const [stage,setStage]=useState(0)
  const stages=[
    {label:'Idle',color:'rgba(176,80,128,0.3)',text:'System ready for next customer'},
    {label:'Flushing',color:'#C2185B',text:'IPA 70% purging all microchannels…'},
    {label:'Verifying',color:'#B05080',text:'Optical clarity sensor checking outflow…'},
    {label:'Clean',color:'#A5D6A7',text:'✓ All channels clear. Ready for next blend.'},
  ]
  const next=()=>setStage(s=>s>=stages.length-1?0:s+1)
  return (
    <div style={{marginTop:20}}>
      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {stages.map((s,i)=><div key={i} style={{flex:1,height:2,borderRadius:2,background:i<=stage?s.color:'rgba(45,8,32,0.8)',transition:'background 0.4s'}}/>)}
      </div>
      <div style={{background:'rgba(45,8,32,0.6)',border:'1px solid rgba(176,80,128,0.15)',borderRadius:10,padding:'20px 16px',marginBottom:14,minHeight:64,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{fontFamily:'var(--font-dm)',fontSize:13,textAlign:'center',color:stages[stage].color,transition:'color 0.4s'}}>{stages[stage].text}</div>
      </div>
      <div style={{display:'flex',gap:12,marginBottom:14,flexWrap:'wrap'}}>
        {stages.map((s,i)=>(
          <span key={i} style={{display:'flex',alignItems:'center',gap:5,fontFamily:'var(--font-dm)',fontSize:10,color:'rgba(176,80,128,0.4)'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:i<=stage?s.color:'rgba(176,80,128,0.2)',display:'inline-block',transition:'background 0.4s'}}/>
            {s.label}
          </span>
        ))}
      </div>
      <button onClick={next} style={{width:'100%',padding:'10px',borderRadius:8,border:'none',cursor:'pointer',background:stages[stage].color,color:stage===3?'#1a0410':'white',fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,transition:'all 0.3s'}}>
        {stage===0?'Start flush cycle':stage===stages.length-1?'Reset':'Next stage →'}
      </button>
    </div>
  )
}

const interactiveMap = { sliders:SlidersInteractive, mapping:MappingInteractive, pumps:PumpsInteractive, mixing:MixingInteractive, output:OutputInteractive, flush:FlushInteractive }

// ─── Main Demo Page ────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [active,setActive]=useState(1)
  const [fading,setFading]=useState(false)

  const go=(id)=>{
    if(id===active)return
    setFading(true)
    setTimeout(()=>{setActive(id);setFading(false)},180)
  }

  const step=steps.find(s=>s.id===active)
  const color=stepColors[active-1]
  const Interactive=interactiveMap[step.interactive]

  return (
    <main style={{minHeight:'100vh',background:'var(--rv-deepest)'}}>

      {/* Nav */}
      <nav style={{position:'fixed',top:0,width:'100%',zIndex:50,background:'rgba(26,4,16,0.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(176,80,128,0.15)'}}>
        <div style={{maxWidth:1152,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="/" style={{fontFamily:'var(--font-cormorant),serif',fontSize:20,fontWeight:600,letterSpacing:'0.15em',color:'#FCE4EC',textDecoration:'none'}}>SENTIA</a>
          <span style={{fontFamily:'var(--font-dm)',fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(176,80,128,0.4)'}}>Interactive Demo</span>
          <a href="/" style={{fontFamily:'var(--font-dm)',fontSize:12,color:'rgba(201,160,180,0.5)',textDecoration:'none'}}>← Back</a>
        </div>
      </nav>

      <div style={{maxWidth:1152,margin:'0 auto',padding:'100px 24px 80px'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:56}}>
          <p style={{fontFamily:'var(--font-dm)',fontSize:11,letterSpacing:'0.25em',textTransform:'uppercase',color:'var(--rv-accent)',marginBottom:12}}>Interactive walkthrough</p>
          <h1 style={{fontFamily:'var(--font-cormorant),serif',fontSize:'clamp(36px,6vw,64px)',fontWeight:300,color:'#FCE4EC',marginBottom:12,lineHeight:1.1}}>
            Inside a SENTIA <em style={{fontStyle:'italic',color:'var(--rv-blush)'}}>blend</em>
          </h1>
          <p style={{fontFamily:'var(--font-dm)',fontSize:13,color:'rgba(176,80,128,0.4)',maxWidth:420,margin:'0 auto'}}>
            Step through every stage. Each step has a live simulation — try it.
          </p>
        </div>

        {/* Step pills */}
        <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:56}}>
          {steps.map((s,i)=>(
            <button key={s.id} onClick={()=>go(s.id)} style={{
              display:'flex',alignItems:'center',gap:8,padding:'7px 16px',borderRadius:100,
              border:`1px solid ${active===s.id?stepColors[i]:'rgba(176,80,128,0.15)'}`,
              background:active===s.id?`rgba(194,24,91,0.08)`:'rgba(45,8,32,0.4)',
              color:active===s.id?stepColors[i]:'rgba(176,80,128,0.4)',
              fontFamily:'var(--font-dm)',fontSize:12,cursor:'pointer',
              transition:'all 0.2s',
            }}>
              <span style={{fontFamily:'var(--font-cormorant),serif',fontSize:14}}>{s.code}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div style={{display:'grid',gap:24,opacity:fading?0:1,transition:'opacity 0.18s'}}
          className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left info */}
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
              <div style={{width:48,height:48,borderRadius:12,border:`1px solid ${color}`,background:`rgba(194,24,91,0.06)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontFamily:'var(--font-cormorant),serif',fontSize:20,color:color,fontWeight:600}}>{step.code}</span>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:color,marginBottom:2}}>{step.code} / 06</div>
                <div style={{fontFamily:'var(--font-cormorant),serif',fontSize:24,fontWeight:600,color:'#FCE4EC'}}>{step.title}</div>
              </div>
            </div>

            <p style={{fontFamily:'var(--font-dm)',fontSize:14,color:'rgba(201,160,180,0.6)',lineHeight:1.8,marginBottom:20}}>{step.description}</p>

            <div style={{background:'rgba(45,8,32,0.6)',border:'1px solid rgba(176,80,128,0.12)',borderRadius:12,padding:'16px 20px',marginBottom:24}}>
              <div style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(176,80,128,0.3)',marginBottom:8}}>Technical detail</div>
              <p style={{fontFamily:'var(--font-dm)',fontSize:12,color:'rgba(176,80,128,0.5)',lineHeight:1.75,margin:0}}>{step.detail}</p>
            </div>

            {/* Progress line */}
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {steps.map((s,i)=>(
                <div key={s.id} onClick={()=>go(s.id)} style={{flex:1,height:1,borderRadius:1,cursor:'pointer',background:s.id<=active?color:'rgba(45,8,32,0.8)',transition:'background 0.3s'}}/>
              ))}
            </div>

            {/* Prev/Next */}
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>go(Math.max(1,active-1))} disabled={active===1} style={{flex:1,padding:'10px',borderRadius:10,border:'1px solid rgba(176,80,128,0.15)',background:'transparent',color:'rgba(176,80,128,0.4)',fontFamily:'var(--font-dm)',fontSize:12,cursor:'pointer',opacity:active===1?0.3:1,transition:'all 0.2s'}}>← Previous</button>
              <button onClick={()=>go(Math.min(6,active+1))} disabled={active===6} style={{flex:1,padding:'10px',borderRadius:10,border:'none',background:color,color:'white',fontFamily:'var(--font-dm)',fontSize:12,fontWeight:500,cursor:'pointer',opacity:active===6?0.3:1,transition:'all 0.2s'}}>Next →</button>
            </div>
          </div>

          {/* Right interactive */}
          <div style={{background:'linear-gradient(135deg,rgba(45,8,32,0.9),rgba(26,4,16,0.95))',border:`1px solid rgba(176,80,128,0.2)`,borderRadius:20,padding:'28px 24px',boxShadow:`0 0 60px rgba(194,24,91,0.06)`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <span style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(176,80,128,0.35)'}}>Live simulation</span>
              <span style={{fontFamily:'var(--font-dm)',fontSize:10,padding:'3px 10px',borderRadius:100,border:`1px solid ${color}`,color:color}}>interactive</span>
            </div>
            <div style={{fontFamily:'var(--font-cormorant),serif',fontSize:18,color:'#FCE4EC',fontWeight:600,marginBottom:2}}>{step.subtitle}</div>
            <div style={{height:1,background:'rgba(176,80,128,0.1)',marginBottom:4}}/>
            <Interactive color={color}/>
          </div>
        </div>

        {/* All steps grid */}
        <div style={{marginTop:80}}>
          <p style={{fontFamily:'var(--font-dm)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(176,80,128,0.25)',textAlign:'center',marginBottom:24}}>All steps</p>
          <div style={{display:'grid',gap:8}} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s,i)=>(
              <button key={s.id} onClick={()=>go(s.id)} style={{
                padding:'20px 14px',borderRadius:12,textAlign:'left',cursor:'pointer',
                border:`1px solid ${active===s.id?stepColors[i]:'rgba(176,80,128,0.1)'}`,
                background:active===s.id?`rgba(194,24,91,0.06)`:'rgba(26,4,16,0.6)',
                transition:'all 0.2s',
              }}>
                <div style={{fontFamily:'var(--font-cormorant),serif',fontSize:22,fontWeight:600,color:stepColors[i],marginBottom:4}}>{s.code}</div>
                <div style={{fontFamily:'var(--font-dm)',fontSize:11,color:active===s.id?'#FCE4EC':'rgba(176,80,128,0.4)',lineHeight:1.4}}>{s.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop:80,textAlign:'center',
          background:'linear-gradient(135deg,rgba(45,8,32,0.8),rgba(26,4,16,0.95))',
          border:'1px solid rgba(176,80,128,0.15)',borderRadius:24,padding:'64px 24px',
          position:'relative',overflow:'hidden',
        }}>
          <div className="orb" style={{width:300,height:300,top:'-30%',left:'50%',transform:'translateX(-50%)',background:'rgba(194,24,91,0.07)'}}/>
          <p style={{fontFamily:'var(--font-dm)',fontSize:11,letterSpacing:'0.25em',textTransform:'uppercase',color:'var(--rv-accent)',marginBottom:12,position:'relative'}}>Ready to deploy</p>
          <h2 style={{fontFamily:'var(--font-cormorant),serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:300,color:'#FCE4EC',marginBottom:12,position:'relative'}}>
            Want SENTIA at your <em style={{fontStyle:'italic',color:'var(--rv-blush)'}}>outlet?</em>
          </h2>
          <p style={{fontFamily:'var(--font-dm)',fontSize:13,color:'rgba(176,80,128,0.4)',marginBottom:28,position:'relative'}}>Join the waitlist for early MSME deployment across Bengaluru.</p>
          <a href="/#contact" className="btn-primary" style={{textDecoration:'none',position:'relative'}}>Request a demo</a>
        </div>
      </div>
    </main>
  )
}