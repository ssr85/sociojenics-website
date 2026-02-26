import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import useAutoScroll from '../hooks/useAutoScroll'
import { Link } from 'react-router-dom'
import { ArrowUpRight, TrendingUp, X } from 'lucide-react'
import { projects } from '../data/successStoriesData'

// All stories for mobile scroll, top 3 for desktop marquee
const featuredAll = projects
const featuredDesktop = projects.slice(0, 3)

const HomeSuccessStories = () => {
    const [selected, setSelected] = useState(null)
    // Mobile: all 6 cards, slower (0.35px/frame)
    const mobileRef = useAutoScroll(0.35, 2000)
    // Desktop: 3 cards duplicated, slightly faster (0.5px/frame)
    const desktopRef = useAutoScroll(0.5, 2000)

    return (
        <section id="success-stories" className="py-24 px-6 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-accent-pink font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            Success Stories
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black leading-tight tracking-tighter"
                        >
                            Results That{' '}
                            <span className="gradient-text">Speak Volumes.</span>
                        </motion.h2>
                    </div>

                    {/* Desktop CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden md:block shrink-0"
                    >
                        <Link
                            to="/success-stories"
                            className="inline-flex items-center gap-2 border border-accent-pink/40 text-accent-pink font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-accent-pink/10 transition-colors duration-300"
                        >
                            View All Stories
                            <ArrowUpRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile: auto-scroll + user-scrollable strip */}
                <div
                    ref={mobileRef}
                    className="md:hidden overflow-x-auto scrollbar-none -mx-6 px-6 cursor-grab active:cursor-grabbing"
                >
                    <div className="flex gap-4 py-2 w-max">
                        {[...featuredAll, ...featuredAll].map((p, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(p)}
                                className="glass shrink-0 w-[200px] p-4 cursor-pointer group relative overflow-hidden hover:border-accent-pink/40 transition-colors duration-300"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="text-accent-pink p-1.5 glass rounded-lg">{p.icon}</div>
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-text-secondary border border-white/10 rounded-full px-2 py-0.5">{p.sector}</span>
                                    </div>
                                    <p className="text-[10px] text-accent-pink font-bold tracking-widest uppercase mb-1">{p.client}</p>
                                    <h3 className="text-sm font-bold leading-snug mb-3">{p.tagline}</h3>
                                    <div className="inline-flex items-center gap-1.5 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-3 py-1">
                                        <TrendingUp size={10} className="text-accent-pink" />
                                        <span className="text-accent-pink font-black text-xs">{p.result}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: auto-scroll + user-scrollable strip */}
                <div
                    ref={desktopRef}
                    className="hidden md:block overflow-x-auto scrollbar-none -mx-6 px-6 cursor-grab active:cursor-grabbing"
                >
                    <div className="flex gap-6 py-2 w-max">
                        {[...featuredDesktop, ...featuredDesktop].map((p, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(p)}
                                className="glass shrink-0 w-[320px] p-7 cursor-pointer group relative overflow-hidden hover:border-accent-pink/40 transition-colors duration-300"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="text-accent-pink p-2 glass rounded-xl">{p.icon}</div>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary border border-white/10 rounded-full px-3 py-1">{p.sector}</span>
                                    </div>
                                    <p className="text-xs text-accent-pink font-bold tracking-widest uppercase mb-1">{p.client}</p>
                                    <h3 className="text-lg font-bold leading-snug mb-4">{p.tagline}</h3>
                                    <div className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-4 py-1.5 mb-3">
                                        <TrendingUp size={12} className="text-accent-pink" />
                                        <span className="text-accent-pink font-black text-sm">{p.result}</span>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-5">{p.metric}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map(t => (
                                            <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-text-secondary">{t}</span>
                                        ))}
                                    </div>
                                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span>Read More</span>
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Detail Modal */}
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
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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

                                <div className="flex items-center gap-3 mb-6 flex-wrap">
                                    <div className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-4 py-1.5">
                                        <TrendingUp size={12} className="text-accent-pink" />
                                        <span className="text-accent-pink font-black text-sm">{selected.result}</span>
                                    </div>
                                    <span className="text-sm text-text-secondary">{selected.metric}</span>
                                </div>

                                <p className="text-text-secondary leading-relaxed mb-8">{selected.description}</p>

                                <div className="border-t border-white/5 pt-6 mb-6">
                                    <p className="text-xs uppercase tracking-widest text-accent-pink font-bold mb-3">Services Delivered</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selected.services.map(s => (
                                            <span key={s} className="text-xs font-semibold border border-accent-pink/30 text-accent-pink rounded-full px-3 py-1">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                                    <Link
                                        to="/contact"
                                        onClick={() => setSelected(null)}
                                        className="btn-primary w-full sm:w-auto text-xs px-8 py-3.5 shadow-lg shadow-accent-pink/20"
                                    >
                                        Start a Project
                                    </Link>
                                    <Link
                                        to="/success-stories"
                                        onClick={() => setSelected(null)}
                                        className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent-pink transition-colors"
                                    >
                                        See all success stories <ArrowUpRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    )
}

export default HomeSuccessStories
