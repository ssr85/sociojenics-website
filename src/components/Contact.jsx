import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Search, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

// Countries sorted A–Z by name
const countries = [
    { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
    { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
    { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
    { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
    { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
    { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
    { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
    { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
    { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
    { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
    { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
    { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
    { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
    { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
    { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
    { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
    { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
    { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
    { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
    { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
    { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
    { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
    { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
    { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
    { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
    { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
    { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
    { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
    { code: 'MV', name: 'Maldives', dial: '+960', flag: '🇲🇻' },
    { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
    { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
    { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
    { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
    { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
    { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
    { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
    { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
    { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
    { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
    { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
    { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
    { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
    { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
    { code: 'SN', name: 'Senegal', dial: '+221', flag: '🇸🇳' },
    { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
    { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
    { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
    { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
    { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
    { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
    { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
    { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿' },
    { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
    { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
    { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
    { code: 'UG', name: 'Uganda', dial: '+256', flag: '🇺🇬' },
    { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
    { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
    { code: 'ZM', name: 'Zambia', dial: '+260', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼' },
]

// ── Custom searchable country picker ───────────────────────────────────────
const CountryPicker = ({ selected, onChange }) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const wrapperRef = useRef(null)
    const searchRef = useRef(null)

    const filtered = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.dial.includes(query)
    )

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false)
                setQuery('')
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Auto-focus search when dropdown opens
    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50)
    }, [open])

    return (
        <div ref={wrapperRef} className="relative shrink-0">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => { setOpen((o) => !o); setQuery('') }}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-sm focus:border-accent-pink outline-none transition-colors hover:border-white/20 h-full whitespace-nowrap"
            >
                <span className="text-base leading-none">{selected.flag}</span>
                <span className="font-medium">{selected.dial}</span>
                <ChevronDown
                    size={12}
                    className={`text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-[calc(100%+6px)] z-50 w-64 rounded-xl border border-white/10 bg-[#0d0d1a]/95 backdrop-blur-md shadow-2xl overflow-hidden"
                    >
                        {/* Search bar */}
                        <div className="p-2 border-b border-white/10">
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                                <Search size={12} className="text-white/40 shrink-0" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search country or code…"
                                    className="bg-transparent text-xs outline-none placeholder:text-white/30 w-full"
                                />
                            </div>
                        </div>

                        {/* Country list */}
                        <ul className="max-h-52 overflow-y-auto divide-y divide-white/5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                            {filtered.length === 0 ? (
                                <li className="px-4 py-3 text-xs text-white/40 text-center">No results</li>
                            ) : (
                                filtered.map((c) => (
                                    <li key={c.code}>
                                        <button
                                            type="button"
                                            onClick={() => { onChange(c); setOpen(false); setQuery('') }}
                                            className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs hover:bg-accent-pink/10 transition-colors ${selected.code === c.code ? 'bg-accent-pink/15 text-accent-pink' : ''
                                                }`}
                                        >
                                            <span className="text-base leading-none">{c.flag}</span>
                                            <span className="flex-1 font-medium">{c.name}</span>
                                            <span className="text-white/40 font-mono shrink-0">{c.dial}</span>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Shared styles ───────────────────────────────────────────────────────────
const inputBase =
    'w-full bg-white/5 border rounded-lg px-4 py-3 outline-none transition-colors text-sm placeholder:text-white/25'
const inputClass = `${inputBase} border-white/10 focus:border-accent-pink`
const inputError = `${inputBase} border-red-500/70 focus:border-red-400`
const labelClass = 'text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 block'

const validateEmail = (v) => {
    if (!v) return 'Company email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address'
    return ''
}
const validatePhone = (v) => {
    if (!v) return 'Phone number is required'
    const digits = v.replace(/[\s\-().+]/g, '')
    if (!/^\d+$/.test(digits)) return 'Phone number must contain only digits'
    if (digits.length < 5) return 'Phone number is too short'
    if (digits.length > 15) return 'Phone number is too long'
    return ''
}

// ── Contact section ─────────────────────────────────────────────────────────
const Contact = () => {
    const [selectedCountry, setSelectedCountry] = useState(
        countries.find((c) => c.code === 'GB')
    )

    const [fields, setFields] = useState({ email: '', phone: '' })
    const [errors, setErrors] = useState({ email: '', phone: '' })
    const [touched, setTouched] = useState({ email: false, phone: false })

    const handleBlur = (field) => {
        setTouched((t) => ({ ...t, [field]: true }))
        const err =
            field === 'email' ? validateEmail(fields.email) : validatePhone(fields.phone)
        setErrors((e) => ({ ...e, [field]: err }))
    }

    const handleChange = (field, value) => {
        setFields((f) => ({ ...f, [field]: value }))
        if (touched[field]) {
            const err = field === 'email' ? validateEmail(value) : validatePhone(value)
            setErrors((e) => ({ ...e, [field]: err }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailErr = validateEmail(fields.email)
        const phoneErr = validatePhone(fields.phone)
        setErrors({ email: emailErr, phone: phoneErr })
        setTouched({ email: true, phone: true })
        if (emailErr || phoneErr) return
        // TODO: submit form
    }

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

            {/* Contact info cards — stacked grid, centred under header */}
            <div className="lg:hidden w-full max-w-lg mx-auto mb-8 grid grid-cols-2 gap-3">
                {/* Email — full width */}
                <div className="col-span-2 flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><Mail size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Email</p>
                        <p className="text-xs font-semibold">jennifer@sociojenics.com</p>
                    </div>
                </div>
                {/* Call */}
                <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><Phone size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Call</p>
                        <p className="text-xs font-semibold">+60 123 013 043</p>
                    </div>
                </div>
                {/* Visit */}
                <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5 justify-center">
                    <span className="text-accent-pink"><MapPin size={16} /></span>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-text-secondary">Visit</p>
                        <p className="text-xs font-semibold">KL, Malaysia</p>
                    </div>
                </div>
            </div>


            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                {/* Left — desktop only */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center">
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

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2 glass p-5 md:p-10 rounded-2xl"
                >
                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>

                        {/* Name + Company Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input type="text" className={inputClass} placeholder="John Doe" />
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

                        {/* Phone — country picker + number */}
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

                        {/* Message */}
                        <div>
                            <label className={labelClass}>Message</label>
                            <textarea
                                rows="4"
                                className={inputClass}
                                placeholder="Tell us about your project..."
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full max-w-lg mx-auto py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                            <Send size={14} />
                            Let's Transform
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact


