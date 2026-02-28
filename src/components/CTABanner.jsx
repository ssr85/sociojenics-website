import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const stats = [
    { value: '200+', label: 'Brands Scaled' },
    { value: '3.8×', label: 'Avg. ROAS' },
    { value: '6', label: 'Specialist Domains' },
    { value: '90', label: 'Days to Results' },
]

const CTABanner = () => {
    return (
        <section id="cta-banner" className="py-6 px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[120px] bg-accent-pink/6 rounded-full blur-[60px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 12, mass: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="container mx-auto max-w-7xl relative z-10"
            >
                <div
                    className="rounded-xl p-px"
                    style={{
                        background: 'linear-gradient(135deg, rgba(236,72,153,0.4), rgba(168,85,247,0.2), rgba(255,255,255,0.04))'
                    }}
                >
                    <div className="rounded-xl bg-[#07090f] px-5 py-4 md:px-6 md:flex md:items-center md:justify-between md:gap-4">

                        {/* Mobile layout: 2×2 stats grid + button row */}
                        <div className="md:hidden">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4 text-center">
                                {stats.map((stat, i) => (
                                    <div key={i}>
                                        <p className="text-xl font-black gradient-text leading-none">{stat.value}</p>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mt-0.5">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-2">
                                <Link
                                    to="/contact"
                                    className="btn-primary inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold shadow-md shadow-accent-pink/20"
                                >
                                    Start a Project <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Desktop layout: single row */}
                        <div className="hidden md:flex md:items-center md:gap-10 md:flex-1">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    viewport={{ once: true }}
                                >
                                    <p className="text-2xl font-black gradient-text leading-none">{stat.value}</p>
                                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mt-0.5">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="hidden md:block w-px h-8 bg-white/10 shrink-0" />

                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="hidden md:flex items-center gap-3 shrink-0"
                        >
                            <p className="text-sm text-text-secondary font-light hidden lg:block">Ready to scale?</p>
                            <Link
                                to="/contact"
                                className="btn-primary px-6 py-2.5 text-sm font-bold flex items-center gap-1.5 shadow-md shadow-accent-pink/20 whitespace-nowrap"
                            >
                                Start a Project <ArrowUpRight size={14} />
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default CTABanner
