import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BusinessModel from './components/BusinessModel'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <BusinessModel />
      <Contact />
    </main>
  )
}