import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Search, Megaphone, BarChart3, PenTool, X, ChevronRight, Cpu, Layout as LayoutIcon } from 'lucide-react'
import { useState, useRef } from 'react'

const services = [
    {
        icon: <LayoutIcon size={32} />,
        title: "Website Design",
        desc: "Stunning, high-performance websites built on platforms tailored to specific business needs.",
        details: [
            "Platform Flexibility ( HTML, WOrdpress, Low/No-Code )",
            "Integration of Custom Solutions",
            "Fully Managed Maintenance",
            "Responsive & SEO-Ready Design"
        ]
    },
    {
        icon: <Search size={32} />,
        title: "Precision SEO",
        desc: "Dominating search results with data-driven optimization and semantic intelligence.",
        details: [
            "Technical Site Audits",
            "Semantic Keyword Research",
            "Authority Link Building",
            "Local SEO Dominance"
        ]
    },
    {
        icon: <Megaphone size={32} />,
        title: "Social Growth",
        desc: "Scaling your brand voice across platforms with high-engagement content strategies.",
        details: [
            "Viral Content Creation",
            "Community Management",
            "Influencer Partnerships",
            "Social Listening & ROI"
        ]
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Performance Ads",
        desc: "High-ROI PPC campaigns powered by advanced audience targeting and AI optimization.",
        details: [
            "Predictive Bidding AI",
            "Retargeting Funnels",
            "A/B Creative Testing",
            "Omnichannel Attribution"
        ]
    },
    {
        icon: <PenTool size={32} />,
        title: "Content Studio",
        desc: "Compelling storytelling that converts, from long-form articles to viral video scripts.",
        details: [
            "Video Scripting & Hooking",
            "Brand Narrative Design",
            "High-Conversion Copy",
            "Multi-Format Content Pillars"
        ]
    },
    {
        icon: <Cpu size={32} />,
        title: "Custom Solutions",
        desc: "Bespoke digital tools including AI Agents, dashboards, and automated workflows.",
        details: [
            "AI Agent Integrations",
            "Custom Data Dashboards",
            "Niche Enrichment Tools",
            "Internal Platform APIs"
        ]
    }
]

const Services = () => {
    const [clickedIndex, setClickedIndex] = useState(null); // persists until clicked again
    const [hoverIndex, setHoverIndex] = useState(null);     // auto-collapses on mouse leave
    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = (index) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        // Only trigger hover-open if this card isn't already click-locked
        if (clickedIndex !== index) {
            hoverTimeoutRef.current = setTimeout(() => {
                setHoverIndex(index);
            }, 1000);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        // Collapse hover-opened card immediately on mouse leave
        setHoverIndex(null);
    };

    return (
        <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-accent-pink font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Engineered for Growth</h2>
                <p className="text-text-secondary max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    We don't just "do" marketing. We build high-performance digital engines that scale your brand with precision and creativity.
                </p>
            </div>

            <LayoutGroup>
                <div className="grid grid-cols-3 gap-3 md:gap-6 items-start">
                    {services.map((s, i) => {
                        // Active if either click-locked OR hover-opened
                        const isActive = clickedIndex === i || hoverIndex === i;
                        return (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.05,
                                    y: { duration: 0.2, ease: "easeOut" },
                                    layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
                                }}
                                viewport={{ once: true }}
                                onMouseEnter={() => handleMouseEnter(i)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => {
                                    handleMouseLeave(); // clear any pending hover timeout
                                    setHoverIndex(null); // remove hover-open immediately
                                    // Toggle click-lock
                                    setClickedIndex(clickedIndex === i ? null : i);
                                }}
                                // On mobile: active card spans full 3 cols; on md+ normal 1 col
                                className={[
                                    'glass group cursor-pointer relative overflow-hidden transition-colors duration-300',
                                    isActive
                                        ? 'col-span-3 md:col-span-1 p-5 md:p-8 border-accent-pink shadow-lg shadow-accent-pink/10'
                                        : 'col-span-1 p-4 md:p-8 hover:border-accent-pink/40'
                                ].join(' ')}
                            >
                                {/* Glow */}
                                <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* ── COLLAPSED MOBILE tile (icon centred, title + arrow inline) ── */}
                                {!isActive && (
                                    <div className="flex md:hidden flex-col items-center justify-center gap-1.5 py-1">
                                        <div className="text-accent-pink">
                                            {s.icon}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-bold leading-tight text-center">{s.title}</span>
                                            <motion.span
                                                animate={{ x: [0, 3, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                                className="text-accent-pink"
                                            >
                                                <ChevronRight size={10} />
                                            </motion.span>
                                        </div>
                                    </div>
                                )}

                                {/* ── EXPANDED card (mobile full-width) or DESKTOP ── */}
                                <div className={isActive ? 'block' : 'hidden md:block'}>
                                    <motion.div layout className="mb-3 md:mb-6 text-accent-pink">
                                        {s.icon}
                                    </motion.div>
                                    <motion.h3 layout className="text-base md:text-2xl font-bold mb-2 md:mb-3 leading-tight">
                                        {s.title}
                                    </motion.h3>

                                    {/* desktop non-active description */}
                                    {!isActive && (
                                        <p className="text-sm text-text-secondary leading-relaxed mb-4 hidden md:block">
                                            {s.desc}
                                        </p>
                                    )}

                                    {/* active description (mobile + desktop) */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-xs md:text-sm text-text-secondary leading-relaxed mb-3 md:mb-4"
                                            >
                                                {s.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    {/* details list */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-white/5 pt-3 md:pt-6 space-y-2 md:space-y-4"
                                            >
                                                <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-accent-pink font-bold">Key Focus Areas</h4>
                                                <ul className="space-y-1.5 md:space-y-3">
                                                    {s.details.map((detail, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: idx * 0.08 }}
                                                            className="text-[10px] md:text-sm flex items-center gap-2 text-text-primary"
                                                        >
                                                            <ChevronRight size={10} className="text-accent-pink flex-shrink-0" />
                                                            {detail}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* desktop hover hint */}
                                    {!isActive && (
                                        <div className="mt-6 hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <span>Explore Details</span>
                                            <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                                                <ChevronRight size={12} />
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        </section>
    )
}

export default Services
