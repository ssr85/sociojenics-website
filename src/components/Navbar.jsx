import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const sections = [
    { label: 'Home', hash: 'hero' },
    { label: 'Services', hash: 'services' },
]

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'

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
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass m-6"
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
