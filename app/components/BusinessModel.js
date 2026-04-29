const streams = [
  ['Machine Lease', '₹20K–₹30K/month', 'Deploy kiosks at MSME outlets, salons, and malls. Machine cost recovers in ~2 months.'],
  ['Cartridge Subscription', '60% gross margin', 'Proprietary refill sets consumed 1–2 times per machine per month. Razor-blade model.'],
  ['AI SaaS', '₹1K–₹2.5K/machine/month', 'Scent ID™ customer profiles, usage analytics, and AI recommendation engine access.'],
  ['Event Rental', '₹25K–₹60K/event', 'Weddings, expos, college fests. Low marginal cost, high revenue per engagement.'],
  ['Per-Blend Commission', '₹50–₹120 per blend', 'Applied at SENTIA-run kiosks. 20–30 blends/day average target.'],
]

export default function BusinessModel() {
  return (
    <section id="business" className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-amber-400 text-sm font-semibold mb-3 text-center">REVENUE MODEL</p>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Five revenue streams</h2>
      <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">Multi-stream model with strong recurring income. Break-even in ~2 months per unit.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {streams.map(([title, metric, desc]) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-amber-400 font-semibold text-sm mb-1">{metric}</div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6">
          <div className="text-amber-400 font-semibold text-sm mb-1">Year 3 target</div>
          <h3 className="font-semibold text-lg mb-2">₹395–533 Lakhs revenue</h3>
          <p className="text-amber-200/60 text-sm leading-relaxed">300 units deployed across Karnataka. 60–65% gross margin. Pan-India scale begins Year 4.</p>
        </div>
      </div>
    </section>
  )
}