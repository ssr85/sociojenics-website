import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-primary-bg text-white font-sans selection:bg-accent-pink selection:text-white flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-pink/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center relative z-10 max-w-2xl"
                >
                    <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-6">
                        Lost in the <span className="gradient-text">digital void.</span>
                    </h2>
                    <p className="text-text-secondary text-lg mb-10 leading-relaxed max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved. Let's get you back on track to scaling your brand.
                    </p>

                    <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm shadow-lg shadow-accent-pink/20">
                        <ArrowLeft size={16} />
                        Return Home
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    )
}

export default NotFound
