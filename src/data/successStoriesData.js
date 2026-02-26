import { TrendingUp, Users, Globe, Zap, ShoppingBag, HeartPulse } from 'lucide-react'
import { createElement } from 'react'

export const projects = [
    {
        id: 1,
        client: "Lumière Hospitality",
        sector: "Hospitality",
        icon: createElement(Globe, { size: 28 }),
        tagline: "From obscurity to 4× bookings in 6 months",
        services: ["Precision SEO", "Performance Ads", "Social Growth"],
        result: "4× Bookings",
        metric: "+320% organic search traffic",
        description: "A boutique hotel group struggling with digital visibility. We built a full-funnel strategy combining local SEO, Instagram growth, and targeted Google Ads that turned their online presence into their top revenue channel.",
        tags: ["SEO", "Paid Ads", "Instagram"],
        color: "from-accent-pink/20 to-accent-purple/10"
    },
    {
        id: 2,
        client: "Verdant Wellness Co.",
        sector: "Wellness",
        icon: createElement(HeartPulse, { size: 28 }),
        tagline: "Built a DTC brand from zero to 10K subscribers",
        services: ["Content Studio", "Website Design", "Social Growth"],
        result: "10K Subscribers",
        metric: "₹0 → ₹18L revenue in 90 days",
        description: "A wellness startup with a great product but no digital strategy. We crafted their brand narrative, built a Shopify storefront, and launched a content engine that grew their newsletter and social audience simultaneously.",
        tags: ["Content", "Shopify", "Email"],
        color: "from-emerald-500/20 to-accent-pink/10"
    },
    {
        id: 3,
        client: "NxtGen Retail",
        sector: "Retail",
        icon: createElement(ShoppingBag, { size: 28 }),
        tagline: "2.8× ROAS on Google & Meta within 60 days",
        services: ["Performance Ads", "Custom Solutions", "Content Studio"],
        result: "2.8× ROAS",
        metric: "CPA reduced by 44%",
        description: "A mid-sized e-commerce brand burning budget on broad campaigns. We rebuilt their ad structure with precise audience segmentation, creative A/B testing, and AI-driven bidding — dramatically improving returns.",
        tags: ["Google Ads", "Meta", "AI Bidding"],
        color: "from-amber-500/20 to-accent-purple/10"
    },
    {
        id: 4,
        client: "Forge Manufacturing",
        sector: "Manufacturing",
        icon: createElement(Zap, { size: 28 }),
        tagline: "B2B lead pipeline rebuilt from scratch",
        services: ["Website Design", "Precision SEO", "Custom Solutions"],
        result: "3× Qualified Leads",
        metric: "New CRM dashboard integrating 5 data sources",
        description: "An industrial manufacturer with no inbound funnel and an outdated website. We delivered a fast, conversion-focused site, a custom CRM integration, and a B2B SEO strategy that generates steady qualified enquiries.",
        tags: ["B2B SEO", "CRM", "Web Design"],
        color: "from-sky-500/20 to-accent-pink/10"
    },
    {
        id: 5,
        client: "Summit Services Group",
        sector: "Services",
        icon: createElement(Users, { size: 28 }),
        tagline: "LinkedIn presence turned into a lead machine",
        services: ["Social Growth", "Content Studio", "Performance Ads"],
        result: "8× LinkedIn Reach",
        metric: "42 booked consultations in 30 days",
        description: "A professional services firm that relied entirely on referrals. We built a LinkedIn content strategy, ran targeted sponsored content, and created lead-magnet assets that turned their feed into a consistent pipeline.",
        tags: ["LinkedIn", "B2B", "Content"],
        color: "from-indigo-500/20 to-accent-pink/10"
    },
    {
        id: 6,
        client: "GreenPath Sustainability",
        sector: "Sustainability",
        icon: createElement(TrendingUp, { size: 28 }),
        tagline: "Raised brand awareness 5× with zero paid spend",
        services: ["Content Studio", "Social Growth", "Precision SEO"],
        result: "5× Brand Reach",
        metric: "+180% website sessions in 3 months",
        description: "A sustainability consultancy with a mission-driven team but limited budget. We built an organic content moat — pillar articles, Instagram reels, and thought leadership posts — that grew their audience entirely through earned media.",
        tags: ["Organic", "SEO", "Reels"],
        color: "from-green-500/20 to-accent-purple/10"
    }
]
