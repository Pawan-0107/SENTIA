export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      <div className="inline-block bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs px-4 py-1.5 rounded-full mb-6">
        India's first AI-enabled microfluidic fragrance kiosk
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Creating Scents<br/>
        <span className="text-amber-400">That Inspire</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
        SENTIA blends hyper-personalized perfumes on demand using AI — 
        deployed as kiosks at MSMEs, salons, boutiques, and events across India.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#contact" className="bg-amber-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition">
          Request a Demo
        </a>
        <a href="#how" className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition">
          How it works
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
        {[
          ['₹20,000 Cr+', 'fragrance market by 2027'],
          ['60%', 'gross margin on cartridges'],
          ['~2 months', 'machine break-even'],
          ['₹15 Lakhs', 'funding sought'],
        ].map(([num, label]) => (
          <div key={num}>
            <div className="text-2xl md:text-3xl font-bold text-amber-400">{num}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}