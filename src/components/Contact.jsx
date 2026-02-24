import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-4xl md:text-5xl mb-6">Let's Ignite Your <br /> Growth Engine.</h2>
                    <p className="text-text-secondary mb-10 text-lg">
                        Ready to take the leap? Our team is waiting to discuss how we can scale your business to new heights.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 glass flex items-center justify-center text-accent-cyan">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-widest">Email Us</p>
                                <p className="font-semibold text-lg">hello@sociojenics.digital</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 glass flex items-center justify-center text-accent-cyan">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-widest">Call Us</p>
                                <p className="font-semibold text-lg">+1 (555) 000-0000</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 glass flex items-center justify-center text-accent-cyan">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-widest">Visit Us</p>
                                <p className="font-semibold text-lg">Innovation Hub, SF</p>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 glass p-10"
                >
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-text-secondary">Full Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-blue outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-text-secondary">Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-blue outline-none transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-text-secondary">Message</label>
                            <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-accent-blue outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <button className="btn-primary w-full py-4 text-sm uppercase tracking-widest">Send Transmission</button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
