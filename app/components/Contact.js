'use client'
import { useState } from 'react'

export default function Contact() {
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

  return (
    <section id="contact" className="py-24 px-6 max-w-2xl mx-auto">
      <p className="text-amber-400 text-sm font-semibold mb-3 text-center">GET IN TOUCH</p>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Request a demo</h2>
      <p className="text-gray-400 text-center mb-10">Interested in deploying SENTIA at your outlet? We'll reach out within 24 hours.</p>
      {status === 'sent' ? (
        <div className="text-center text-green-400 text-lg py-12">Message sent! We'll be in touch soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" required placeholder="Your name" value={form.name} onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50" />
          <input name="email" type="email" required placeholder="Email address" value={form.email} onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50" />
          <select name="business" value={form.business} onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50">
            <option value="">Business type (optional)</option>
            <option>MSME / Perfume retailer</option>
            <option>Salon or spa</option>
            <option>Mall or lifestyle store</option>
            <option>Event organizer</option>
            <option>Investor / VC</option>
            <option>Other</option>
          </select>
          <textarea name="message" rows={4} placeholder="Tell us about your business..." value={form.message} onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 resize-none" />
          <button type="submit" disabled={status === 'sending'}
            className="bg-amber-400 text-black font-semibold py-3 rounded-full hover:bg-amber-300 transition disabled:opacity-50">
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
          {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
        </form>
      )}
      <p className="text-gray-600 text-xs text-center mt-8">SENTIA · Manthan 2026 · FKCCI Innovation Challenge · Bengaluru</p>
    </section>
  )
}