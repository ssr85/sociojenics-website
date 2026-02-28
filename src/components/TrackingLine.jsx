import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const TrackingLine = () => {
    // Get the scroll progress of the entire page
    const { scrollYProgress } = useScroll()

    // Bouncy spring configuration for the line
    const springConfig = { stiffness: 100, damping: 15, mass: 0.5, restDelta: 0.001 }

    // Smooth scroll position
    const yPos = useSpring(scrollYProgress, springConfig)

    return (
        <div className="fixed left-6 lg:left-10 top-0 bottom-0 w-1.5 z-50 pointer-events-none hidden md:block">
            {/* Outline track */}
            <div className="absolute inset-y-0 w-full bg-white/5 rounded-full" />

            {/* Filled bouncy track */}
            <motion.div
                className="absolute top-0 w-full rounded-full origin-top"
                style={{
                    scaleY: yPos,
                    background: 'linear-gradient(to bottom, transparent, rgba(236,72,153, 0.4), rgba(236,72,153, 1))',
                    height: '100%'
                }}
            />

            {/* The little bouncy "thumb" element riding the edge of the line */}
            <motion.div
                className="absolute -left-[5px] w-4 h-8 rounded-full bg-accent-pink shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                style={{
                    top: useTransform(yPos, value => `calc(${value * 100}% - 32px)`)
                }}
            />
        </div>
    )
}

export default TrackingLine
