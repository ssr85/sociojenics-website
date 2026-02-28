import React, { useReducer, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wand2, Mail, Bot, Megaphone, PenTool, Layers,
    TrendingUp, MousePointer, Video, Zap, Check,
    ChevronLeft, ChevronRight, Rocket, Briefcase,
    Globe, Info, Laptop, Target, Users, Building2,
    Phone, Send, RefreshCw, X,
    Star, Calendar, BarChart, Map, Clock, Wallet, ChevronDown
} from 'lucide-react';
import { render } from '@react-email/render';
import WizardLeadEmail from '../emails/WizardLeadEmail';
import { CountryPicker, countries as countryData } from './FormElements';

// --- Types & Interfaces ---

interface ContactState {
    name: string;
    email: string;
    whatsapp: string;
    countryCode: string;
    company: string;
    notes: string;
    agreed: boolean;
}

interface WizardState {
    step: number;
    services: string[];
    goal: string;
    businessSize: string;
    markets: string[];
    currency: string;
    budgetMin: number;
    budgetMax: number;
    timeline: string;
    selectedCountry: any;
    contact: ContactState;
}

type WizardAction =
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'SET_FIELD'; field: keyof WizardState; value: any }
    | { type: 'SET_CONTACT_FIELD'; field: keyof ContactState; value: any }
    | { type: 'RESET' };

interface ProjectScopeWizardProps {
    onSubmit?: (payload: Record<string, unknown>) => void;
}

// --- Constants & Config ---

const initialState: WizardState = {
    step: 1,
    services: [],
    goal: '',
    businessSize: '',
    markets: [],
    currency: 'MYR',
    selectedCountry: countryData.find(c => c.code === 'MY') || countryData[0],
    budgetMin: 1000,
    budgetMax: 10000,
    timeline: '',
    contact: {
        name: '',
        email: '',
        whatsapp: '',
        countryCode: '+60',
        company: '',
        notes: '',
        agreed: false,
    },
};

const CURRENCY_CONFIG: Record<string, { symbol: string; locale: string; rate: number }> = {
    MYR: { symbol: 'RM', locale: 'en-MY', rate: 1 },
    USD: { symbol: '$', locale: 'en-US', rate: 4.45 },
    GBP: { symbol: '£', locale: 'en-GB', rate: 5.62 },
    EUR: { symbol: '€', locale: 'de-DE', rate: 4.70 },
    AED: { symbol: 'د.إ', locale: 'ar-AE', rate: 1.21 },
    NZD: { symbol: 'NZ$', locale: 'en-NZ', rate: 2.58 },
    AUD: { symbol: 'A$', locale: 'en-AU', rate: 2.87 },
};

const STEP_NAMES = ['Services', 'Business Scope', 'Your Strategy Session'];

const SERVICES = [
    { id: 'bot', icon: Bot, title: 'AI Automation', desc: 'Intelligent workflows & chatbots' },
    { id: 'megaphone', icon: Megaphone, title: 'Social Media Strategy', desc: 'Organic growth & community' },
    { id: 'pentool', icon: PenTool, title: 'Content Creation', desc: 'Copy, blogs & creatives' },
    { id: 'layers', icon: Layers, title: 'Brand Identity', desc: 'Logo, tone & visual system' },
    { id: 'trendingup', icon: TrendingUp, title: 'SEO & Growth', desc: 'Rankings & organic traffic' },
    { id: 'mousepointer', icon: MousePointer, title: 'Paid Ads', desc: 'Performance & ROAS-focused' },
    { id: 'video', icon: Video, title: 'Video Production', desc: 'Reels, ads & brand films' },
    { id: 'zap', icon: Zap, title: 'Full-Service Bundle', desc: 'End-to-end agency partnership' },
];

const GOALS = ['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Customer Retention'];

const BUSINESS_SIZES = [
    { id: 'Startup', icon: Rocket, label: 'Startup' },
    { id: 'SME', icon: Briefcase, label: 'SME' },
    { id: 'Enterprise', icon: Building2, label: 'Enterprise' },
    { id: 'Agency', icon: Users, label: 'Agency' },
];

const MARKETS = ['Local', 'National', 'Pan-India', 'Global', 'US/UK', 'Middle East'];

const TIMELINES = [
    { id: 'Rush', title: 'Rush', desc: '2–4 weeks', note: 'Priority queue, premium rates apply' },
    { id: 'Standard', title: 'Standard', desc: '1–3 months', note: 'Recommended for most projects' },
    { id: 'Flexible', title: 'Flexible', desc: '3–6 months', note: 'Best value, relaxed delivery' },
];

const COUNTRY_CODES = countryData;

// --- Helper Functions ---

const convert = (inrValue: number, currency: string): number =>
    Math.round(inrValue / CURRENCY_CONFIG[currency].rate);

const formatCurrency = (inrValue: number, currency: string): string =>
    new Intl.NumberFormat(CURRENCY_CONFIG[currency].locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(convert(inrValue, currency));

const getRecommendedPackage = (state: WizardState) => {
    let name = 'Growth Package';
    let roi = '4x – 8x';
    let tier = 'growth';

    const hasFullBundle = state.services.includes('Full-Service Bundle');
    const hasAI = state.services.includes('AI Automation');

    if (hasFullBundle) {
        name = 'Enterprise Suite';
        roi = '10x – 20x';
        tier = 'enterprise';
    } else if (hasAI && state.budgetMax > 15000) {
        name = 'AI Growth Stack – Premium';
        roi = '8x – 15x';
        tier = 'premium_ai';
    } else if (hasAI) {
        name = 'AI Growth Stack';
        roi = '8x – 15x';
        tier = 'ai';
    } else if (state.businessSize === 'Enterprise' || state.budgetMax > 15000) {
        name = 'Premium Package';
        roi = '8x – 15x';
        tier = 'premium';
    } else if (state.budgetMax < 3000) {
        name = 'Starter Package';
        roi = '2x – 4x';
        tier = 'starter';
    }

    // Map services to deliverables
    const deliverables = state.services.map(s => {
        const service = SERVICES.find(srv => srv.title === s);
        return service ? service.desc : s;
    }).slice(0, 4);

    if (deliverables.length === 0) deliverables.push('Custom Strategy RoadMap');

    return { name, roi, tier, deliverables };
};

const generateEmailSummary = (state: WizardState, recommendation: any) => {
    return `
SOCIOJENICS - NEW WIZARD LEAD
------------------------------
CONTACT DETAILS:
Name: ${state.contact.name}
Email: ${state.contact.email}
WhatsApp: ${state.contact.countryCode} ${state.contact.whatsapp}
Company: ${state.contact.company || 'N/A'}
Notes: ${state.contact.notes || 'None'}

PROJECT DETAILS:
Recommendation: ${recommendation?.name}
Goal: ${state.goal}
Business Size: ${state.businessSize}
Target Markets: ${state.markets.join(', ')}
Timeline: ${state.timeline}
Budget Range: MYR ${state.budgetMin} - MYR ${state.budgetMax}

SERVICES REQUESTED:
${state.services.map((s: string) => `- ${s}`).join('\n')}
`.trim();
};

// --- Reducer ---

function reducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'NEXT_STEP':
            return { ...state, step: Math.min(state.step + 1, 3) };
        case 'PREV_STEP':
            return { ...state, step: Math.max(state.step - 1, 1) };
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_CONTACT_FIELD':
            return { ...state, contact: { ...state.contact, [action.field]: action.value } };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

// --- Components ---

const ProgressBar = ({ step }: { step: number }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                    Step {step} of 3
                </span>
                <span className="text-sm font-semibold text-accent-pink">
                    {STEP_NAMES[step - 1]}
                </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 relative h-full">
                        <div className="absolute inset-0 bg-white/5" />
                        {s <= step && (
                            <motion.div
                                layoutId="progress-fill"
                                className="absolute inset-0 bg-gradient-to-r from-accent-pink to-accent-purple"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ProjectScopeWizard({ onSubmit = (p) => console.log('Lead:', p) }: ProjectScopeWizardProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const recommendation = useMemo(() => {
        if (state.step >= 3) return getRecommendedPackage(state);
        return null;
    }, [state]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (state.step === 1) {
            if (state.services.length === 0) newErrors.services = 'Please select at least one service';
        } else if (state.step === 2) {
            if (!state.goal) newErrors.goal = 'Please select a goal';
            if (!state.businessSize) newErrors.businessSize = 'Please select your business size';
            if (state.markets.length === 0) newErrors.markets = 'Please select at least one target market';
            if (!state.timeline) newErrors.timeline = 'Please select a timeline';
        } else if (state.step === 3) {
            if (!state.contact.name || state.contact.name.length < 2) newErrors.name = 'Name is required (min 2 chars)';
            if (!state.contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact.email)) newErrors.email = 'Valid email is required';
            if (!state.contact.whatsapp || state.contact.whatsapp.replace(/\D/g, '').length < 10) newErrors.whatsapp = 'Valid WhatsApp number is required (min 10 digits)';
            if (!state.contact.agreed) newErrors.agreed = 'You must agree to be contacted';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            dispatch({ type: 'NEXT_STEP' });
        }
    };

    const handleBack = () => {
        dispatch({ type: 'PREV_STEP' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const summaryText = generateEmailSummary(state, recommendation);

            const payload = {
                ...state,
                recommendation: recommendation,
                summaryText: summaryText,
                submittedAt: new Date().toISOString()
            };

            onSubmit(payload);
            setIsSuccess(true);
        }
    };

    if (isSuccess) {
        return (
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400"
                >
                    <Check size={40} />
                </motion.div>
                <h2 className="text-3xl font-black mb-4">Wizard Complete!</h2>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    We've received your project scope and recommendation. A strategy expert will reach out to you within 24 hours.
                </p>



                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' });
                        setIsSuccess(false);
                    }}
                    className="flex items-center gap-2 mx-auto text-accent-pink hover:text-accent-pink/80 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                    <RefreshCw size={14} /> Start Over
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            <div className="glass p-6 md:p-10 rounded-3xl border border-white/10 overflow-hidden">
                <ProgressBar step={state.step} />

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state.step}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.3 }}
                            className="py-4"
                        >
                            {state.step === 1 && (
                                <Step1 state={state} dispatch={dispatch} error={errors.services} />
                            )}
                            {state.step === 2 && (
                                <CombinedStep2 state={state} dispatch={dispatch} errors={errors} />
                            )}
                            {state.step === 3 && recommendation && (
                                <CombinedStep3 state={state} dispatch={dispatch} errors={errors} recommendation={recommendation} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Footer */}
                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div>
                        {state.step > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}
                    </div>
                    <div>
                        {state.step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="btn-primary px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                            >
                                Continue <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="btn-primary px-8 py-3 rounded-full flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                            >
                                Book My Free Strategy Session <Send size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Step Components ---

function Step1({ state, dispatch, error }: { state: WizardState, dispatch: any, error?: string }) {
    const toggleService = (title: string) => {
        const current = state.services;
        const next = current.includes(title)
            ? current.filter(s => s !== title)
            : [...current, title];
        dispatch({ type: 'SET_FIELD', field: 'services', value: next });
    };

    return (
        <div>
            <h3 className="text-2xl font-black mb-2">What do you need help with?</h3>
            <p className="text-text-secondary mb-8">Select all services that interest you.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.map((s) => {
                    const isActive = state.services.includes(s.title);
                    return (
                        <button
                            key={s.id}
                            onClick={() => toggleService(s.title)}
                            className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 ${isActive
                                ? 'bg-accent-pink/10 border-accent-pink shadow-[0_0_20px_rgba(255,51,102,0.15)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${isActive ? 'bg-accent-pink text-white' : 'bg-white/5 text-white/60 group-hover:text-white'
                                }`}>
                                <s.icon size={20} />
                            </div>
                            <h4 className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-white/80'}`}>{s.title}</h4>
                            <p className="text-[11px] text-text-secondary leading-tight opacity-70">{s.desc}</p>

                            {isActive && (
                                <div className="absolute top-3 right-3 w-5 h-5 bg-accent-pink rounded-full flex items-center justify-center shadow-lg">
                                    <Check size={12} strokeWidth={4} className="text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            {error && <p className="text-red-400 text-xs mt-4 flex items-center gap-1"><Info size={12} /> {error}</p>}
        </div>
    );
}

function CombinedStep2({ state, dispatch, errors }: { state: WizardState, dispatch: any, errors: any }) {
    const toggleMarket = (market: string) => {
        const next = state.markets.includes(market)
            ? state.markets.filter(m => m !== market)
            : [...state.markets, market];
        dispatch({ type: 'SET_FIELD', field: 'markets', value: next });
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val <= state.budgetMax - 1000) {
            dispatch({ type: 'SET_FIELD', field: 'budgetMin', value: val });
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val >= state.budgetMin + 1000) {
            dispatch({ type: 'SET_FIELD', field: 'budgetMax', value: val });
        }
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Business Context */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                            <Target size={16} className="text-accent-pink" /> 1. Business Context
                        </h4>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] text-white/30 uppercase font-black block mb-2 ml-1">Primary Goal</label>
                                <div className="flex flex-wrap gap-2">
                                    {GOALS.map(goal => (
                                        <button
                                            key={goal}
                                            onClick={() => dispatch({ type: 'SET_FIELD', field: 'goal', value: goal })}
                                            className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all ${state.goal === goal
                                                ? 'bg-accent-pink border-accent-pink text-white shadow-lg'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                                                }`}
                                        >
                                            {goal}
                                        </button>
                                    ))}
                                </div>
                                {errors.goal && <p className="text-red-400 text-[10px] mt-2 italic">{errors.goal}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] text-white/30 uppercase font-black block mb-2 ml-1">Business Size</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {BUSINESS_SIZES.map(size => (
                                        <button
                                            key={size.id}
                                            onClick={() => dispatch({ type: 'SET_FIELD', field: 'businessSize', value: size.id })}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${state.businessSize === size.id
                                                ? 'bg-accent-pink/10 border-accent-pink text-white'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                                                }`}
                                        >
                                            <size.icon size={16} className={state.businessSize === size.id ? 'text-accent-pink' : 'text-white/40'} />
                                            <span className="mt-1 text-[10px] font-bold">{size.label}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.businessSize && <p className="text-red-400 text-[10px] mt-2 italic">{errors.businessSize}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] text-white/30 uppercase font-black block mb-2 ml-1">Target Markets</label>
                                <div className="flex flex-wrap gap-2">
                                    {MARKETS.map(market => (
                                        <button
                                            key={market}
                                            onClick={() => toggleMarket(market)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium border transition-all flex items-center gap-2 ${state.markets.includes(market)
                                                ? 'bg-accent-purple/20 border-accent-purple text-accent-purple-light'
                                                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                                                }`}
                                        >
                                            {market}
                                            {state.markets.includes(market) && <X size={10} />}
                                        </button>
                                    ))}
                                </div>
                                {errors.markets && <p className="text-red-400 text-[10px] mt-2 italic">{errors.markets}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Budget & Timeline */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                            <Wallet size={16} className="text-accent-purple" /> 2. Investment & Timeline
                        </h4>

                        <div className="space-y-10">
                            {/* Currency & Budget */}
                            <div className="glass p-6 rounded-2xl border border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <label className="text-[10px] text-white/30 uppercase font-black">Monthly Budget</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={state.currency}
                                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'currency', value: e.target.value })}
                                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] outline-none transition-all focus:border-accent-pink"
                                        >
                                            {Object.keys(CURRENCY_CONFIG).map(key => (
                                                <option key={key} value={key} className="bg-[#0d0d1a]">{key}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center bg-accent-pink/10 p-3 rounded-xl border border-accent-pink/20">
                                        <div className="text-center flex-1">
                                            <span className="block text-[8px] text-accent-pink uppercase font-black">Minimum</span>
                                            <span className="text-sm font-black text-white">{formatCurrency(state.budgetMin, state.currency)}</span>
                                        </div>
                                        <div className="w-px h-8 bg-accent-pink/20 mx-4" />
                                        <div className="text-center flex-1">
                                            <span className="block text-[8px] text-accent-pink uppercase font-black">Maximum</span>
                                            <span className="text-sm font-black text-white">{formatCurrency(state.budgetMax, state.currency)}</span>
                                        </div>
                                    </div>

                                    <div className="relative h-1.5 w-full bg-white/10 rounded-full mt-4">
                                        <div
                                            className="absolute h-full bg-accent-pink rounded-full"
                                            style={{
                                                left: `${((state.budgetMin - 500) / (50000 - 500)) * 100}%`,
                                                right: `${100 - ((state.budgetMax - 500) / (50000 - 500)) * 100}%`
                                            }}
                                        />
                                        <input
                                            type="range"
                                            min="500"
                                            max="50000"
                                            step="100"
                                            value={state.budgetMin}
                                            onChange={handleMinChange}
                                            className="absolute inset-0 w-full bg-transparent appearance-none pointer-events-none z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-pink"
                                        />
                                        <input
                                            type="range"
                                            min="500"
                                            max="50000"
                                            step="100"
                                            value={state.budgetMax}
                                            onChange={handleMaxChange}
                                            className="absolute inset-0 w-full bg-transparent appearance-none pointer-events-none z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-pink"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <label className="text-[10px] text-white/30 uppercase font-black block mb-4 ml-1">Desired Timeline</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {TIMELINES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => dispatch({ type: 'SET_FIELD', field: 'timeline', value: t.id })}
                                            className={`p-4 rounded-xl border text-left transition-all ${state.timeline === t.id
                                                ? 'bg-accent-purple/10 border-accent-purple'
                                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                                                }`}
                                        >
                                            <h5 className={`font-bold text-[10px] mb-0.5 ${state.timeline === t.id ? 'text-accent-purple-light' : 'text-white'}`}>{t.title}</h5>
                                            <p className="text-[8px] opacity-60 leading-tight">{t.desc}</p>
                                        </button>
                                    ))}
                                </div>
                                {errors.timeline && <p className="text-red-400 text-[10px] mt-2 italic">{errors.timeline}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SelectionSummary({ state }: { state: WizardState }) {
    const summaryItems = [
        { label: 'Primary Goal', value: state.goal, icon: Star, color: 'text-accent-pink' },
        { label: 'Business Size', value: state.businessSize, icon: Building2, color: 'text-accent-purple' },
        { label: 'Target Markets', value: state.markets.join(', '), icon: Map, color: 'text-blue-400' },
        { label: 'Timeline', value: state.timeline, icon: Clock, color: 'text-green-400' },
    ];

    return (
        <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-pink/10 to-accent-purple/10 rounded-3xl opacity-50 blur-xl"></div>
            <div className="relative glass border border-white/10 rounded-3xl overflow-hidden">
                <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">Project Scope Summary</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-accent-pink/10 rounded-full border border-accent-pink/20">
                        <Star size={8} className="text-accent-pink fill-accent-pink" />
                        <span className="text-[8px] font-black text-white uppercase italic">Elite Strategy</span>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {summaryItems.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                    <item.icon size={10} className={item.color} />
                                    <p className="text-[8px] uppercase tracking-widest text-white/30 font-black">{item.label}</p>
                                </div>
                                <p className="text-[10px] font-bold text-white/90 truncate pl-4">{item.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                        <div className="flex flex-wrap gap-1.5">
                            {state.services.slice(0, 3).map(s => (
                                <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-bold text-white/50">{s}</span>
                            ))}
                            {state.services.length > 3 && <span className="text-[8px] text-white/30 font-bold">+{state.services.length - 3} more</span>}
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] uppercase tracking-widest text-white/30 font-black">Est. Investment</p>
                            <p className="text-xs font-black text-white italic">{formatCurrency(state.budgetMin, state.currency)} – {formatCurrency(state.budgetMax, state.currency)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CombinedStep3({ state, dispatch, errors, recommendation }: { state: WizardState, dispatch: any, errors: any, recommendation: any }) {
    const handleChange = (field: keyof ContactState, value: any) => {
        dispatch({ type: 'SET_CONTACT_FIELD', field, value });
    };

    return (
        <div className="flex flex-col gap-8">
            <SelectionSummary state={state} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Recommendation */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="px-3 py-1 bg-accent-pink rounded-full shadow-lg">
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">Recommended</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <span className="text-accent-pink font-bold tracking-[0.2em] uppercase text-[9px] mb-2 block">Your Package</span>
                            <h3 className="text-2xl font-black mb-6 text-white">{recommendation.name}</h3>

                            <div className="space-y-3 mb-8">
                                {recommendation.deliverables.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={8} className="text-green-400" />
                                        </div>
                                        <span className="text-[11px] font-medium text-white/80">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-1">Expected ROI Potential</span>
                                <span className="text-xl font-black text-accent-pink">{recommendation.roi}</span>
                            </div>

                            <p className="text-[10px] text-white/30 italic mt-6 flex items-center gap-2">
                                <Info size={12} /> Get a free strategy call to finalize this roadmap.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black mb-2">Claim Your Strategy Session</h3>
                        <p className="text-xs text-text-secondary leading-relaxed mb-6">Enter your details to receive this recommendation and book a free call.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/60 font-bold ml-1">Full Name *</label>
                                <input
                                    type="text"
                                    value={state.contact.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="John Doe"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 outline-none transition-all text-sm ${errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-accent-pink focus:bg-white/10'}`}
                                />
                                {errors.name && <p className="text-red-400 text-[9px] ml-1">{errors.name}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/60 font-bold ml-1">Business Email *</label>
                                <input
                                    type="email"
                                    value={state.contact.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="john@company.com"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 outline-none transition-all text-sm ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-accent-pink focus:bg-white/10'}`}
                                />
                                {errors.email && <p className="text-red-400 text-[9px] ml-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/60 font-bold ml-1">WhatsApp Number *</label>
                                <div className="flex gap-2">
                                    <CountryPicker
                                        selected={state.selectedCountry || countryData[0]}
                                        onChange={(c) => {
                                            dispatch({ type: 'SET_FIELD', field: 'selectedCountry', value: c });
                                            dispatch({ type: 'SET_CONTACT_FIELD', field: 'countryCode', value: c.dial });
                                        }}
                                    />
                                    <input
                                        type="tel"
                                        value={state.contact.whatsapp}
                                        onChange={(e) => handleChange('whatsapp', e.target.value)}
                                        placeholder="Mobile digits"
                                        className={`flex-1 bg-white/5 border rounded-xl px-4 py-2.5 outline-none transition-all text-sm ${errors.whatsapp ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-accent-pink focus:bg-white/10'}`}
                                    />
                                </div>
                                {errors.whatsapp && <p className="text-red-400 text-[9px] ml-1">{errors.whatsapp}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/60 font-bold ml-1">Message / Notes (Optional)</label>
                                <textarea
                                    rows={3}
                                    value={state.contact.notes}
                                    onChange={(e) => handleChange('notes', e.target.value)}
                                    placeholder="Tell us more about your project goals..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-accent-pink transition-all text-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${state.contact.agreed ? 'bg-accent-pink border-accent-pink' : 'border-white/20 group-hover:border-white/40'}`}>
                                    {state.contact.agreed && <Check size={10} className="text-white" strokeWidth={4} />}
                                    <input
                                        type="checkbox"
                                        checked={state.contact.agreed}
                                        onChange={(e) => handleChange('agreed', e.target.checked)}
                                        className="hidden"
                                    />
                                </div>
                                <span className="text-[10px] text-white/50 leading-tight">
                                    I agree to receive a tailored project roadmap and be contacted for a free strategy session.
                                </span>
                            </label>
                            {errors.agreed && <p className="text-red-400 text-[9px] ml-1">{errors.agreed}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
