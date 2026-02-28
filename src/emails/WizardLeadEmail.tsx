import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    render,
} from '@react-email/components';
import * as React from 'react';

interface WizardLeadEmailProps {
    state: any;
    recommendation: any;
}

const WizardLeadEmail = ({
    state,
    recommendation,
}: WizardLeadEmailProps) => (
    <Html>
        <Head />
        <Preview>New Lead from Sociojenics Wizard!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={h1}>New Project Scope Captured!</Heading>
                </Section>
                <Section style={section}>
                    <Text style={text}>
                        <strong>Name:</strong> {state.contact.name}
                    </Text>
                    <Text style={text}>
                        <strong>Email:</strong> {state.contact.email}
                    </Text>
                    <Text style={text}>
                        <strong>WhatsApp:</strong> {state.contact.countryCode} {state.contact.whatsapp}
                    </Text>
                    {state.contact.company && (
                        <Text style={text}>
                            <strong>Company:</strong> {state.contact.company}
                        </Text>
                    )}
                    {state.contact.notes && (
                        <Text style={text}>
                            <strong>Notes:</strong> {state.contact.notes}
                        </Text>
                    )}
                </Section>
                <Hr style={hr} />
                <Section style={section}>
                    <Heading style={h2}>Project Selections</Heading>
                    <Text style={text}>
                        <strong>Package:</strong> {recommendation?.name}
                    </Text>
                    <Text style={text}>
                        <strong>Goal:</strong> {state.goal}
                    </Text>
                    <Text style={text}>
                        <strong>Size:</strong> {state.businessSize}
                    </Text>
                    <Text style={text}>
                        <strong>Markets:</strong> {state.markets.join(', ')}
                    </Text>
                    <Text style={text}>
                        <strong>Timeline:</strong> {state.timeline}
                    </Text>
                    <Text style={text}>
                        <strong>Budget Range:</strong> {state.currency} {state.budgetMin} – {state.currency} {state.budgetMax}
                    </Text>
                </Section>
                <Section style={section}>
                    <Heading style={h3}>Services Requested:</Heading>
                    <ul style={list}>
                        {state.services.map((s: string) => (
                            <li key={s} style={listItem}>{s}</li>
                        ))}
                    </ul>
                </Section>
                <Hr style={hr} />
                <Text style={footer}>
                    This lead was generated via the Sociojenics Project Scope Wizard.
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#0d0d1a',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
};

const header = {
    padding: '10px 0',
    textAlign: 'center' as const,
};

const h1 = {
    color: '#ff3366',
    fontSize: '28px',
    fontWeight: 'bold',
    padding: '0',
    margin: '20px 0',
};

const h2 = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
};

const h3 = {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
};

const text = {
    color: '#cccccc',
    fontSize: '14px',
    lineHeight: '24px',
};

const section = {
    padding: '10px 0',
};

const list = {
    paddingLeft: '20px',
    color: '#cccccc',
};

const listItem = {
    marginBottom: '5px',
};

const hr = {
    borderColor: '#333333',
    margin: '20px 0',
};

const footer = {
    color: '#666666',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '20px',
};

export default WizardLeadEmail;
