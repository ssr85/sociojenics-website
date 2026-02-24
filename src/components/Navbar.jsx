import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass m-6"
        >
            <div className="flex items-center gap-2 cursor-pointer">
                <Rocket className="text-accent-pink" size={28} />
                <span className="text-xl font-extrabold tracking-tighter uppercase">SOCIOJENICS</span>
            </div>

            <div className="hidden md:flex gap-8 text-sm font-medium">
                <a href="#hero" className="hover:text-accent-blue transition-colors">Home</a>
                <a href="#services" className="hover:text-accent-blue transition-colors">Services</a>
                <a href="#industries" className="hover:text-accent-blue transition-colors">Sectors</a>
                <a href="#contact" className="hover:text-accent-blue transition-colors">Contact</a>
            </div>

            <button className="btn-primary text-xs uppercase tracking-widest px-6">
                Let's Talk
            </button>
        </motion.nav>
    )
}

export default Navbar
