import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'

    // Motion value for opacity (1 = fully visible, 0 = fully transparent)
    const rawOpacity = useMotionValue(1)
    const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 })

    useEffect(() => {
        if (!isHome) {
            rawOpacity.set(1)
            return
        }

        const ctaEl = document.getElementById('cta-banner')
        if (!ctaEl) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Fade out when CTA is visible, fade back in when it's gone
                rawOpacity.set(entry.isIntersecting ? 0 : 1)
            },
            { threshold: 0.2 }
        )

        observer.observe(ctaEl)
        return () => observer.disconnect()
    }, [isHome, rawOpacity])

    // For section anchors: on home page scroll in-page; elsewhere navigate via router with hash
    const handleSection = (hash) => (e) => {
        e.preventDefault()
        if (isHome) {
            const el = document.getElementById(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            navigate(`/#${hash}`)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ opacity }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass m-6 pointer-events-auto"
        >
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <Rocket className="text-accent-pink" size={28} />
                <span className="text-xl font-extrabold tracking-tighter uppercase">SOCIOJENICS</span>
            </Link>

            <div className="hidden md:flex gap-8 text-sm font-medium">
                <a href="#hero" onClick={handleSection('hero')} className="hover:text-accent-pink transition-colors">Home</a>
                <a href="#services" onClick={handleSection('services')} className="hover:text-accent-pink transition-colors">Services</a>
                <Link
                    to="/success-stories"
                    className={`hover:text-accent-pink transition-colors ${location.pathname === '/success-stories' ? 'text-accent-pink' : ''}`}
                >
                    Successes
                </Link>
                <a href="#industries" onClick={handleSection('industries')} className="hover:text-accent-pink transition-colors">Sectors</a>
                <Link
                    to="/contact"
                    className={`hover:text-accent-pink transition-colors ${location.pathname === '/contact' ? 'text-accent-pink' : ''}`}
                >
                    Contact
                </Link>
            </div>

            <Link to="/contact" className="btn-primary text-[10px] md:text-xs px-4 md:px-6 py-2 md:py-auto uppercase tracking-widest">
                Let's Talk
            </Link>
        </motion.nav>
    )
}

export default Navbar
