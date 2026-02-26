import { Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
)

const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

const Footer = () => {
    return (
        <footer className="border-t border-white/10 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="text-lg font-extrabold tracking-tighter uppercase">SOCIOJENICS</span>
                    </div>
                    <p className="text-sm text-text-secondary max-w-xs text-center md:text-left">
                        Engineering the next generation of social performance.
                    </p>
                </div>

                <div className="flex gap-12 text-sm text-text-secondary">
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-semibold mb-2">Navigation</p>
                        <a href="/#services" className="hover:text-accent-pink transition-colors">Services</a>
                        <a href="/#industries" className="hover:text-accent-pink transition-colors">Sectors</a>
                        <Link to="/success-stories" className="hover:text-accent-pink transition-colors">Success Stories</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-semibold mb-2">Connect</p>
                        <Link to="/contact" className="hover:text-accent-pink transition-colors">Contact Us</Link>
                        <a href="mailto:hello@sociojenics.com" className="hover:text-accent-pink transition-colors">hello@sociojenics.com</a>
                        <a href="https://www.linkedin.com/in/sociojenics/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition-colors">LinkedIn</a>
                    </div>
                </div>

                <div className="flex gap-4">
                    <a href="https://www.instagram.com/sociojenics/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:text-accent-pink transition-colors"><InstagramIcon /></a>
                    <a href="https://www.linkedin.com/in/sociojenics/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:text-accent-pink transition-colors"><Linkedin size={18} /></a>
                    <a href="https://www.facebook.com/Sociojenics/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass flex items-center justify-center hover:text-accent-pink transition-colors"><FacebookIcon /></a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-text-secondary">
                © {new Date().getFullYear()} Sociojenics. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
