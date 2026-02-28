/**
 * HELPER: Email Submission via Web3Forms (CORS-Safe)
 * This uses the existing Web3Forms infrastructure to send project 
 * scope details directly to your inbox.
 */

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "82adfec7-4fa7-40d3-bd4a-968ea67b0cc0";

export const sendWizardLeadEmail = async (payload: {
    summaryText: string,
    contactEmail: string,
    name: string,
    state?: any
}) => {
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                to: "skaizentech@gmail.com, jennifer@sociojenics.com",
                name: payload.name,
                email: payload.contactEmail,
                subject: `✨ New Project Scope: ${payload.name}`,
                from_name: "Sociojenics Website",
                message: payload.summaryText,
                _template: "table",
                // Pass key fields for structured view in Web3Forms dashboard
                goal: payload.state?.goal,
                size: payload.state?.businessSize,
                markets: payload.state?.markets?.join(', '),
                budget: `${payload.state?.currency} ${payload.state?.budgetMin} - ${payload.state?.budgetMax}`,
                services: payload.state?.services?.join(', '),
                whatsapp: `${payload.state?.contact?.countryCode} ${payload.state?.contact?.whatsapp}`,
                notes: payload.state?.contact?.notes
            }),
        });

        const data = await response.json();
        return { success: data.success, error: data.message };
    } catch (err) {
        return { success: false, error: err };
    }
};
