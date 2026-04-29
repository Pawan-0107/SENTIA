const steps = [
  ['01', 'Select preferences', 'Customer picks scent type and intensity via touchscreen — e.g. 40% floral, 30% citrus, 30% woody.'],
  ['02', 'AI maps ratios', 'The AI engine converts percentage inputs into precise liquid volumes and sends signals to microfluidic pumps.'],
  ['03', 'Pumps dispense', 'Microfluidic pumps activate simultaneously, each releasing a precisely calculated amount electronically.'],
  ['04', 'Mixing chamber blends', 'Liquids enter an inline mixing chamber; controlled flow and microchannel design ensure uniformity.'],
  ['05', 'Output delivered', 'Fragrance goes to a spray nozzle (Moment Mode: ₹30–₹80) or bottle-fill outlet (Signature Mode: ₹300–₹1,500).'],
  ['06', 'Auto-flush', 'Cleaning solvent purges all pathways between blends — preventing cross-contamination every time.'],
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-amber-400 text-sm font-semibold mb-3 text-center">THE PROCESS</p>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">How SENTIA works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map(([num, title, desc]) => (
          <div key={num} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 transition">
            <div className="text-amber-400 font-mono text-sm mb-3">{num}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}