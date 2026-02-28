import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Search, ChevronDown, ArrowUpRight, CheckCircle, Loader2, Wand2 } from 'lucide-react'
import ProjectScopeWizard from './ProjectScopeWizard'
import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { sendWizardLeadEmail } from '../lib/email'
import { CountryPicker, countries as countryData } from './FormElements'

const countries = countryData

const Contact = ({ hideFormOnMobile }) => {
    const location = useLocation()
    const nameRef = useRef(null)
    const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'MY') || countries[0])
    const [activeMode, setActiveMode] = useState('wizard') // Default to wizard

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const [fields, setFields] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
    })

    // Focus handling from location state
    useEffect(() => {
        if (location.state?.autoFocus) {
            setActiveMode('form')
            setTimeout(() => {
                nameRef.current?.focus()
            }, 500)
        }
    }, [location])

    const validateName = (val) => {
        if (!val) return 'Name is required'
        if (val.length < 2) return 'Name is too short'
        return ''
    }

    const validateEmail = (val) => {
        if (!val) return 'Email is required'
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(val)) return 'Invalid email address'
        return ''
    }

    const validatePhone = (val) => {
        if (!val) return 'Phone number is required'
        const digits = val.replace(/\D/g, '')
        if (digits.length < 7) return 'Phone number is too short'
        return ''
    }

    const validateMessage = (val) => {
        if (!val) return 'Message is required'
        if (val.length < 10) return 'Message must be at least 10 characters'
        return ''
    }

    const handleChange = (field, value) => {
        setFields(prev => ({ ...prev, [field]: value }))
        if (touched[field]) {
            let error = ''
            if (field === 'name') error = validateName(value)
            if (field === 'email') error = validateEmail(value)
            if (field === 'phone') error = validatePhone(value)
            if (field === 'message') error = validateMessage(value)
            setErrors(prev => ({ ...prev, [field]: error }))
        }
    }

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        let error = ''
        if (field === 'name') error = validateName(fields.name)
        if (field === 'email') error = validateEmail(fields.email)
        if (field === 'phone') error = validatePhone(fields.phone)
        if (field === 'message') error = validateMessage(fields.message)
        setErrors(prev => ({ ...prev, [field]: error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {
            name: validateName(fields.name),
            email: validateEmail(fields.email),
            phone: validatePhone(fields.phone),
            message: validateMessage(fields.message),
        }

        setErrors(newErrors)
        setTouched({ name: true, email: true, phone: true, message: true })

        if (Object.values(newErrors).some(err => err !== '')) return

        setIsSubmitting(true)
        setSubmitError('')

        try {
            const fullPhone = `${selectedCountry.dial} ${fields.phone}`

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY || "82adfec7-4fa7-40d3-bd4a-968ea67b0cc0",
                    to: "skaizentech@gmail.com, jennifer@sociojenics.com",
                    name: fields.name,
                    email: fields.email,
                    phone: fullPhone,
                    message: fields.message,
                    subject: `New Lead: ${fields.name} via Sociojenics`
                })
            })

            const data = await response.json()
            if (data.success) {
                setIsSubmitted(true)
            } else {
                setSubmitError(data.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            setSubmitError('Network error. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const labelClass = "text-[10px] uppercase font-black tracking-widest text-white/30 block mb-2 ml-1"
    const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-pink transition-all text-sm"
    const inputError = "w-full bg-red-400/5 border border-red-400/30 rounded-xl px-4 py-3 outline-none focus:border-red-400 transition-all text-sm"

    return (
        <section id="contact" className="py-16 md:py-24 px-6 max-w-7xl mx-auto">

            {/* Mobile header */}
            <div className="text-center mb-8 lg:hidden">
                <span className="text-accent-pink font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Get In Touch</span>
                <h2 className="text-3xl font-black mb-3">Let's Ignite Your<br />Growth Engine.</h2>
                <p className="text-text-secondary text-sm leading-relaxed max-w-sm mx-auto">
                    Ready to scale? Drop us a message and we'll get back to you within 24 hours.
                </p>
            </div>

            {/* Contact info cards */}
            <div className="lg:hidden w-full max-w-lg mx-auto mb-8 grid grid-cols-2 gap-3">
                <div className="col-span-2 flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><Mail size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Email</p>
                        <p className="text-xs font-semibold">jennifer@sociojenics.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><Phone size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Call</p>
                        <p className="text-xs font-semibold">+60 123 013 043</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><MapPin size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Visit</p>
                        <p className="text-xs font-semibold">KL, Malaysia</p>
                    </div>
                </div>
            </div>

            {/* Mode Toggle Section */}
            <div className="mb-12 max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">How would you like to reach us?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => setActiveMode('wizard')}
                        className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group ${activeMode === 'wizard' ? 'bg-accent-pink/10 border-accent-pink border-2' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeMode === 'wizard' ? 'bg-accent-pink text-white' : 'bg-white/5 text-white/40'}`}>
                                <Wand2 size={24} />
                            </div>
                            <span className="bg-accent-pink text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-accent-pink/20">Recommended</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Interactive Project Wizard</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">Answer a few quick questions, get a tailored package recommendation and a free strategy call</p>
                    </button>

                    <button
                        onClick={() => setActiveMode('form')}
                        className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group ${activeMode === 'form' ? 'bg-accent-pink/10 border-accent-pink border-2' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${activeMode === 'form' ? 'bg-accent-pink text-white' : 'bg-white/5 text-white/40'}`}>
                            <Mail size={24} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Quick Contact Form</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">Already know what you need? Fill out the form directly</p>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeMode === 'wizard' ? (
                    <motion.div
                        key="wizard"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25 }}
                        className="w-full"
                    >
                        <ProjectScopeWizard onSubmit={async (p) => {
                            const result = await sendWizardLeadEmail({
                                summaryText: p.summaryText,
                                contactEmail: p.contact.email,
                                name: p.contact.name,
                                state: p
                            });
                            if (result.success) {
                                console.log('Lead sent successfully via Web3Forms');
                            }
                        }} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col lg:flex-row gap-10 lg:gap-16"
                    >
                        <div className="hidden lg:flex lg:w-[45%] flex-col justify-center pr-8">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Ignite Your<br />Growth Engine.</h2>
                            <p className="text-text-secondary mb-10 text-lg leading-relaxed">
                                Ready to take the leap? Our team is waiting to discuss how we can scale your business to new heights.
                            </p>
                            <div className="space-y-5">
                                {[
                                    { icon: <Mail size={20} />, label: 'Email Us', value: 'jennifer@sociojenics.com' },
                                    { icon: <Phone size={20} />, label: 'Call Us', value: '+60 123 013 043' },
                                    { icon: <MapPin size={20} />, label: 'Visit Us', value: 'KL, Malaysia' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-12 h-12 glass flex items-center justify-center text-accent-pink shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary uppercase tracking-widest">{item.label}</p>
                                            <p className="font-semibold text-lg">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-[55%] glass p-5 md:p-10 rounded-2xl flex flex-col justify-center">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-accent-pink/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-pink">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                                    <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
                                        Thank you for reaching out, {fields.name.split(' ')[0]}. We'll review your details and get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form className="space-y-5 w-full" onSubmit={handleSubmit} noValidate>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Full Name</label>
                                            <input
                                                ref={nameRef}
                                                type="text"
                                                value={fields.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                onBlur={() => handleBlur('name')}
                                                className={touched.name && errors.name ? inputError : inputClass}
                                                placeholder="John Doe"
                                                disabled={isSubmitting}
                                            />
                                            {touched.name && errors.name && (
                                                <p className="text-[10px] text-red-400 mt-1.5 pl-0.5 flex items-center gap-1">
                                                    <span>⚠</span> {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Company Email</label>
                                            <input
                                                type="email"
                                                value={fields.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                onBlur={() => handleBlur('email')}
                                                className={touched.email && errors.email ? inputError : inputClass}
                                                placeholder="john@company.com"
                                            />
                                            {touched.email && errors.email && (
                                                <p className="text-[10px] text-red-400 mt-1.5 pl-0.5 flex items-center gap-1">
                                                    <span>⚠</span> {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Phone Number</label>
                                        <div className="flex gap-2">
                                            <CountryPicker
                                                selected={selectedCountry}
                                                onChange={setSelectedCountry}
                                            />
                                            <input
                                                type="tel"
                                                value={fields.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                onBlur={() => handleBlur('phone')}
                                                className={`${touched.phone && errors.phone ? inputError : inputClass} flex-1`}
                                                placeholder="98765 43210"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        {touched.phone && errors.phone ? (
                                            <p className="text-[10px] text-red-400 mt-1.5 pl-0.5 flex items-center gap-1">
                                                <span>⚠</span> {errors.phone}
                                            </p>
                                        ) : (
                                            <p className="text-[9px] text-white/30 mt-1 pl-1">
                                                {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.dial})
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Message</label>
                                        <textarea
                                            rows="4"
                                            value={fields.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            onBlur={() => handleBlur('message')}
                                            className={touched.message && errors.message ? inputError : inputClass}
                                            placeholder="Tell us about your project..."
                                            disabled={isSubmitting}
                                        />
                                        {touched.message && errors.message && (
                                            <p className="text-[10px] text-red-400 mt-1.5 pl-0.5 flex items-center gap-1">
                                                <span>⚠</span> {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {submitError && (
                                        <p className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg text-center border border-red-400/20">
                                            {submitError}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full max-w-lg mx-auto py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} />
                                                Let's Transform
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Contact
