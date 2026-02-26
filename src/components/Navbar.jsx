import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'
    const [menuOpen, setMenuOpen] = useState(false)

    // Opacity fade when CTA banner is in view
    const rawOpacity = useMotionValue(1)
    const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 })

    useEffect(() => {
        if (!isHome) { rawOpacity.set(1); return }
        const ctaEl = document.getElementById('cta-banner')
        if (!ctaEl) return
        const observer = new IntersectionObserver(
            ([entry]) => rawOpacity.set(entry.isIntersecting ? 0 : 1),
            { threshold: 0.2 }
        )
        observer.observe(ctaEl)
        return () => observer.disconnect()
    }, [isHome, rawOpacity])

    // Close menu on route change
    useEffect(() => { setMenuOpen(false) }, [location])

    const handleSection = (hash) => (e) => {
        e.preventDefault()
        setMenuOpen(false)
        if (isHome) {
            const el = document.getElementById(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            navigate(`/#${hash}`)
        }
    }

    const navLinks = [
        { type: 'section', label: 'Home', hash: 'hero' },
        { type: 'section', label: 'Services', hash: 'services' },
        { type: 'link', label: 'Successes', to: '/success-stories' },
        { type: 'section', label: 'Sectors', hash: 'industries' },
        { type: 'link', label: 'Contact', to: '/contact' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ opacity }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass m-6"
            >
                {/* Logo — text only, no icon */}
                <Link to="/" className="cursor-pointer">
                    <span className="text-xl font-extrabold tracking-tighter uppercase">SOCIOJENICS</span>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    {navLinks.map((item) =>
                        item.type === 'section' ? (
                            <a key={item.label} href={`#${item.hash}`} onClick={handleSection(item.hash)} className="hover:text-accent-pink transition-colors">
                                {item.label}
                            </a>
                        ) : (
                            <Link key={item.label} to={item.to} className={`hover:text-accent-pink transition-colors ${location.pathname === item.to ? 'text-accent-pink' : ''}`}>
                                {item.label}
                            </Link>
                        )
                    )}
                </div>

                {/* Desktop CTA button */}
                <Link to="/contact" className="btn-primary hidden md:inline-flex text-xs px-6 py-2 uppercase tracking-widest">
                    Let's Talk
                </Link>

                {/* Mobile right controls */}
                <div className="flex md:hidden items-center gap-3">
                    {/* Phone CTA icon */}
                    <Link
                        to="/contact"
                        className="relative flex items-center justify-center w-9 h-9 rounded-full glass border border-accent-pink/30 text-accent-pink hover:bg-accent-pink/10 transition-colors duration-300"
                        aria-label="Contact us"
                    >
                        {/* Pulsing ring */}
                        <span className="absolute inset-0 rounded-full border border-accent-pink/40 animate-ping opacity-40" />
                        <Phone size={15} strokeWidth={2.5} />
                    </Link>

                    {/* Burger icon */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="flex items-center justify-center w-9 h-9 rounded-full glass border border-white/10 hover:border-accent-pink/40 text-text-primary transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile slide-down menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed top-[88px] left-6 right-6 z-40 glass rounded-2xl border border-white/10 overflow-hidden md:hidden"
                    >
                        <div className="flex flex-col py-4">
                            {navLinks.map((item, i) =>
                                item.type === 'section' ? (
                                    <motion.a
                                        key={item.label}
                                        href={`#${item.hash}`}
                                        onClick={handleSection(item.hash)}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-6 py-3 text-sm font-semibold hover:text-accent-pink hover:bg-white/5 transition-colors duration-200"
                                    >
                                        {item.label}
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={item.to}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block px-6 py-3 text-sm font-semibold hover:text-accent-pink hover:bg-white/5 transition-colors duration-200 ${location.pathname === item.to ? 'text-accent-pink' : ''}`}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                )
                            )}

                            {/* CTA row */}
                            <div className="mx-6 mt-3 pt-3 border-t border-white/5">
                                <Link
                                    to="/contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="btn-primary w-full text-center text-xs uppercase tracking-widest py-3 block"
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-30 md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
