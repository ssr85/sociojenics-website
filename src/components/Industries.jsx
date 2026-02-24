import { motion } from 'framer-motion'
import { Coffee, ShoppingBag, Factory, Sparkles, Leaf, Briefcase } from 'lucide-react'

const industries = [
    {
        name: "Hospitality",
        iconSm: <Coffee size={24} />,
        iconLg: <Coffee size={40} />,
        desc: "Crafting digital experiences for premium hotels, restaurants, and travel brands."
    },
    {
        name: "Retail",
        iconSm: <ShoppingBag size={24} />,
        iconLg: <ShoppingBag size={40} />,
        desc: "E-commerce optimization and high-conversion strategies for modern retail."
    },
    {
        name: "Manufacturing",
        iconSm: <Factory size={24} />,
        iconLg: <Factory size={40} />,
        desc: "Digital transformation and lead generation for the industrial sector."
    },
    {
        name: "Wellness",
        iconSm: <Sparkles size={24} />,
        iconLg: <Sparkles size={40} />,
        desc: "Building communities and scaling impact for health and wellness brands."
    },
    {
        name: "Sustainability",
        iconSm: <Leaf size={24} />,
        iconLg: <Leaf size={40} />,
        desc: "Strategic marketing for eco-conscious brands and green technologies."
    },
    {
        name: "Services",
        iconSm: <Briefcase size={24} />,
        iconLg: <Briefcase size={40} />,
        desc: "Professional services growth through authority building and digital precision."
    }
]

const Industries = () => {
    // Duplicate industries for a seamless loop
    const displayIndustries = [...industries, ...industries];

    return (
        <section id="industries" className="py-24 px-6 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-accent-pink font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Sectors We Empower</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">Industry Expertise</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Our strategies are industry-agnostic but execution-specific. We bring deep vertical knowledge to every partnership.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden -mx-4 px-4">
                    <div
                        className="flex gap-6 py-8 animate-marquee pause-on-hover"
                        style={{ width: "fit-content" }}
                    >
                        {displayIndustries.map((industry, i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="min-w-[215px] md:min-w-[400px] glass p-5 md:p-10 group/card relative border-white/5 hover:border-accent-pink/40 transition-all duration-500"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="mb-4 md:mb-8 text-accent-pink relative z-10 transform group-hover/card:scale-110 transition-transform duration-500">
                                    <span className="md:hidden">{industry.iconSm}</span>
                                    <span className="hidden md:block">{industry.iconLg}</span>
                                </div>
                                <h3 className="text-base md:text-2xl font-bold mb-2 md:mb-4 relative z-10">{industry.name}</h3>
                                <p className="text-xs md:text-base text-text-secondary font-light leading-relaxed relative z-10">
                                    {industry.desc}
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                                    <div className="absolute top-2 right-2 w-full h-full border-t border-r border-accent-pink/40" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Industries
