import { motion } from 'framer-motion'
import { MapPin, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'

const ContactPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>

                {/* ── Hero with KL map background ── */}
                <section className="relative min-h-[52vh] flex items-end pb-16 pt-36 px-6 overflow-hidden">

                    {/* OpenStreetMap iframe: KL centre, very low opacity */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <iframe
                            title="Kuala Lumpur Map"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=101.65%2C3.10%2C101.74%2C3.18&layer=mapnik"
                            className="w-full h-full border-0 opacity-[0.07] grayscale saturate-0"
                            loading="lazy"
                        />
                        {/* Gradient overlays to fade the map into the dark bg */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/80 via-primary-bg/50 to-primary-bg/95" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-bg/60 via-transparent to-primary-bg/60" />
                    </div>

                    {/* Ambient blobs */}
                    <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
                        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-accent-pink/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-purple/20 rounded-full blur-[80px]" />
                    </div>

                    {/* Hero copy */}
                    <div className="container mx-auto relative z-10 max-w-4xl">


                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-accent-pink font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            Get In Touch
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6"
                        >
                            Big Ideas Start <br />
                            <span className="gradient-text">With a Message.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="text-text-secondary text-lg max-w-2xl font-light leading-relaxed flex items-center gap-2"
                        >
                            <Zap size={16} className="text-accent-pink shrink-0" />
                            We respond within 24 hours — sometimes in 24 minutes.
                        </motion.p>
                    </div>
                </section>

                {/* ── Contact form section (reused from homepage) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <Contact />
                </motion.div>

            </main>
            <Footer />
        </div>
    )
}

export default ContactPage
