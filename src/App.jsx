import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Industries from './components/Industries'
import Contact from './components/Contact'
import CTABanner from './components/CTABanner'
import HomeSuccessStories from './components/HomeSuccessStories'
import Footer from './components/Footer'
import SuccessStories from './pages/SuccessStories'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'

// Home page as its own component so Lenis works per-route
function HomePage() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CTABanner />
        <Industries />
        <HomeSuccessStories />
        <Contact hideFormOnMobile />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
