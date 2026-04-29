'use client'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-wider text-amber-400">SENTIA</span>
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#business" className="hover:text-white transition">Business</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">☰</button>
      </div>
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm text-gray-300">
          <a href="#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="#business" onClick={() => setOpen(false)}>Business</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  )
}