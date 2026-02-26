import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/successStoriesData'

const previewStories = projects.slice(0, 3)

const SuccessStoriesPreview = () => {
    return (
        <section className="py-24 px-6" id="success-stories">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
                            transition={{ duration: 0.7, delay: 0.05 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black tracking-tighter leading-tight"
                        >
                            Results That{' '}
                            <span className="gradient-text">Speak Volumes.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            viewport={{ once: true }}
                            className="text-text-secondary mt-4 max-w-xl font-light leading-relaxed"
                        >
                            Real projects. Real outcomes. A snapshot of the brands we've helped
                            scale, grow, and dominate their digital space.
                        </motion.p>
                    </div>

                    {/* Desktop "See All" link */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden md:block shrink-0"
                    >
                        <Link
                            to="/success-stories"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-pink hover:gap-3 transition-all duration-200"
                        >
                            See All Stories
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previewStories.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.5, delay: i * 0.08, y: { duration: 0.2 } }}
                            viewport={{ once: true }}
                            className="glass p-7 group relative overflow-hidden hover:border-accent-pink/40 transition-colors duration-300"
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="text-accent-pink p-2 glass rounded-xl">
                                        {p.icon}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary border border-white/10 rounded-full px-3 py-1">
                                        {p.sector}
                                    </span>
                                </div>

                                {/* Client & tagline */}
                                <p className="text-xs text-accent-pink font-bold tracking-widest uppercase mb-1">{p.client}</p>
                                <h3 className="text-lg font-bold leading-snug mb-4">{p.tagline}</h3>

                                {/* Result pill */}
                                <div className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-4 py-1.5 mb-4">
                                    <TrendingUp size={12} className="text-accent-pink" />
                                    <span className="text-accent-pink font-black text-sm">{p.result}</span>
                                </div>

                                <p className="text-xs text-text-secondary mb-5">{p.metric}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map(t => (
                                        <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-text-secondary">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile "See All" button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 flex justify-center md:hidden"
                >
                    <Link
                        to="/success-stories"
                        className="btn-primary inline-flex items-center gap-2 px-8 py-3"
                    >
                        See All Stories
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

                {/* Desktop centered CTA button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 hidden md:flex justify-center"
                >
                    <Link
                        to="/success-stories"
                        className="btn-primary inline-flex items-center gap-2 px-10 py-3"
                    >
                        See All Stories
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}

export default SuccessStoriesPreview
