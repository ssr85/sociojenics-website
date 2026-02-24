import { motion, AnimatePresence } from 'framer-motion'
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
    const [activeIndex, setActiveIndex] = useState(null);
    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = (index) => {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

        // Set new timeout for 1 second
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveIndex(index);
        }, 1000);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
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

            <div className="grid grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 items-start">
                {services.map((s, i) => (
                    <motion.div
                        key={i}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.05,
                            y: { duration: 0.2, ease: "easeOut" },
                            layout: { duration: 0.3, ease: "easeInOut" }
                        }}
                        viewport={{ once: true }}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {
                            handleMouseLeave(); // Clear hover trigger if clicked
                            setActiveIndex(activeIndex === i ? null : i);
                        }}
                        className={`glass p-4 md:p-8 group transition-all duration-500 cursor-pointer relative overflow-hidden ${activeIndex === i ? 'border-accent-pink shadow-lg shadow-accent-pink/5' : 'hover:border-accent-pink/40'
                            }`}
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <motion.div layout className="mb-2 md:mb-6 text-accent-pink transition-colors duration-500 relative z-10 scale-75 md:scale-100">
                            {s.icon}
                        </motion.div>
                        <motion.h3 layout className="text-[10px] sm:text-xs md:text-2xl font-bold mb-1 md:mb-3 relative z-10 text-center md:text-left leading-tight">{s.title}</motion.h3>
                        <motion.p layout className="text-sm text-text-secondary leading-relaxed mb-4 relative z-10 hidden md:block">
                            {s.desc}
                        </motion.p>

                        <AnimatePresence>
                            {activeIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pt-4 md:pt-6 border-t border-white/5 space-y-2 md:space-y-4"
                                >
                                    <h4 className="text-[8px] md:text-xs uppercase tracking-widest text-accent-pink font-bold">Focus</h4>
                                    <ul className="space-y-1.5 md:space-y-3">
                                        {s.details.map((detail, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="text-[9px] md:text-sm flex items-center gap-1.5 md:gap-2 text-text-primary uppercase tracking-tighter md:normal-case md:tracking-normal"
                                            >
                                                <ChevronRight size={10} className="text-accent-pink flex-shrink-0" />
                                                <span className="truncate md:whitespace-normal">{detail}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Interactive Hint */}
                        <div className={`mt-2 md:mt-6 flex items-center justify-center md:justify-start gap-1 md:gap-2 text-[8px] md:text-xs font-bold uppercase tracking-widest transition-opacity duration-300 ${activeIndex === i ? 'opacity-0' : 'opacity-40 group-hover:opacity-100'}`}>
                            <span className="hidden md:inline">Explore Details</span>
                            <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <ChevronRight size={12} />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Services
