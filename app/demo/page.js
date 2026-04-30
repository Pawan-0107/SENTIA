import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import { Comparison, BusinessModel, Financials, Impact, Contact, Footer } from './components/Sections'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Comparison />
      <BusinessModel />
      <Financials />
      <Impact />
      <Contact />
      <Footer />
    </main>
  )
}