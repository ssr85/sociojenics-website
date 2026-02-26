import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, X, TrendingUp } from 'lucide-react'
import { projects } from '../data/successStoriesData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'



const SuccessStories = () => {
    const [selected, setSelected] = useState(null)

    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                {/* Hero */}
                <section className="relative min-h-[45vh] flex items-end pb-16 pt-36 px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-pink/20 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent-purple/20 rounded-full blur-[100px]" />
                    </div>
                    <div className="container mx-auto relative z-10 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-accent-pink font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            Success Stories
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6"
                        >
                            Results That <br />
                            <span className="gradient-text">Speak Volumes.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-text-secondary text-lg max-w-2xl font-light leading-relaxed"
                        >
                            Real projects. Real outcomes. A snapshot of the brands we've helped scale, grow, and dominate their digital space.
                        </motion.p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16 px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.5, delay: i * 0.07, y: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                onClick={() => setSelected(p)}
                                className="glass p-7 cursor-pointer group relative overflow-hidden hover:border-accent-pink/40 transition-colors duration-300"
                            >
                                {/* Background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="text-accent-pink p-2 glass rounded-xl">
                                            {p.icon}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary border border-white/10 rounded-full px-3 py-1">
                                            {p.sector}
                                        </span>
                                    </div>

                                    {/* Client */}
                                    <p className="text-xs text-accent-pink font-bold tracking-widest uppercase mb-1">{p.client}</p>
                                    <h3 className="text-lg font-bold leading-snug mb-4">{p.tagline}</h3>

                                    {/* Key result pill */}
                                    <div className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-4 py-1.5 mb-4">
                                        <TrendingUp size={12} className="text-accent-pink" />
                                        <span className="text-accent-pink font-black text-sm">{p.result}</span>
                                    </div>

                                    <p className="text-xs text-text-secondary mb-5">{p.metric}</p>

                                    {/* Services tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map(t => (
                                            <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-text-secondary">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View detail link */}
                                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span>Read More</span>
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA strip */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black mb-6 tracking-tighter"
                        >
                            Ready to be our <span className="gradient-text">next story?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-text-secondary mb-10 text-lg"
                        >
                            Let's talk about your goals and build something worth writing about.
                        </motion.p>
                        <motion.a
                            href="/#contact"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="btn-primary text-lg px-12 py-4 inline-block shadow-lg shadow-accent-pink/20"
                        >
                            Start a Project
                        </motion.a>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[620px] max-h-[85vh] overflow-y-auto glass z-50 p-8 md:p-10"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-5 right-5 text-text-secondary hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className={`absolute inset-0 bg-gradient-to-br ${selected.color} opacity-30 pointer-events-none rounded-[inherit]`} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-accent-pink p-2 glass rounded-xl">{selected.icon}</div>
                                    <div>
                                        <p className="text-xs text-accent-pink font-bold tracking-widest uppercase">{selected.client}</p>
                                        <span className="text-xs text-text-secondary">{selected.sector}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">{selected.tagline}</h2>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-4 py-1.5">
                                        <TrendingUp size={12} className="text-accent-pink" />
                                        <span className="text-accent-pink font-black text-sm">{selected.result}</span>
                                    </div>
                                    <span className="text-sm text-text-secondary">{selected.metric}</span>
                                </div>

                                <p className="text-text-secondary leading-relaxed mb-8">{selected.description}</p>

                                <div className="border-t border-white/5 pt-6">
                                    <p className="text-xs uppercase tracking-widest text-accent-pink font-bold mb-3">Services Delivered</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selected.services.map(s => (
                                            <span key={s} className="text-xs font-semibold border border-accent-pink/30 text-accent-pink rounded-full px-3 py-1">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SuccessStories
