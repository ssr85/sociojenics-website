import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Animated background blobs */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent-pink/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-[100px] animate-bounce-slow" />
            </div>

            {/* ── MOBILE / TABLET (< md): image as background, text overlaid ── */}
            <div className="md:hidden absolute inset-0 top-20 z-0">
                <img
                    src="/assets/brand-hero-seamless.png"
                    alt="Sociojenics Creative Direction"
                    className="w-full h-full object-cover object-top opacity-40"
                />
                {/* dark gradient so text stays legible */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/60 via-primary-bg/40 to-primary-bg/90" />
            </div>

            {/* ── Main grid ── */}
            <div className="container mx-auto px-6 relative z-10 w-full">

                {/* Mobile: single column, text centred over bg image */}
                <div className="md:hidden flex flex-col items-start justify-end min-h-[75vh] pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        style={{ opacity }}
                    >
                        <span className="text-accent-pink font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block">
                            The Future of Performance
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight tracking-tighter">
                            Accelerate Your <br />
                            <span className="gradient-text">Digital Pulse.</span>
                        </h1>
                        <p className="text-text-secondary text-sm mb-6 leading-relaxed max-w-sm">
                            Cutting-edge technology meets creative strategy — built to scale your brand.
                        </p>
                        <div className="flex gap-3">
                            <Link to="/contact" className="btn-primary text-sm px-6 py-3 shadow-lg shadow-accent-pink/20">Start a Project</Link>
                            <Link to="/success-stories" className="glass text-sm px-6 py-3 font-semibold hover:border-accent-pink transition-colors">Success Stories</Link>
                        </div>
                    </motion.div>
                </div>

                {/* Desktop / Tablet (md+): two-column side-by-side */}
                <div className="hidden md:grid grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Left: text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ opacity }}
                        className="flex flex-col items-start text-left"
                    >
                        <span className="text-accent-pink font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
                            The Future of Performance
                        </span>
                        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight tracking-tighter">
                            Accelerate Your <br />
                            <span className="gradient-text">Digital Pulse.</span>
                        </h1>
                        <p className="max-w-xl text-text-secondary text-lg xl:text-xl mb-12 leading-relaxed font-light">
                            We combine cutting-edge technology with creative strategy to transform your brand's digital presence into a high-performance engine for growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/contact" className="btn-primary text-lg px-10 py-4 shadow-lg shadow-accent-pink/20 text-center">Start a Project</Link>
                            <Link to="/success-stories" className="glass px-10 py-4 font-semibold hover:border-accent-pink transition-colors text-center">Success Stories</Link>
                        </div>
                    </motion.div>

                    {/* Right: image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="relative group h-[85vh] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-accent-pink/10 rounded-full blur-[120px] scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <img
                                    src="/assets/brand-hero-seamless.png"
                                    alt="Sociojenics Creative Direction"
                                    className="w-full h-full object-contain drop-shadow-2xl brightness-90 hover:brightness-100 transition-all duration-1000"
                                    style={{
                                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                                        WebkitMaskComposite: 'source-in'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-bg via-transparent to-primary-bg pointer-events-none opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent pointer-events-none opacity-70" />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r-2 border-b-2 border-accent-pink/20 rounded-br-3xl pointer-events-none" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-accent-pink/20 rounded-tl-3xl pointer-events-none" />
                    </motion.div>
                </div>
            </div>

        </section>
    )
}

export default Hero
