import { Section } from "../components/Section";

export default function Privacy() {
    return (
        <Section eyebrow="// Privacy" title="Privacy Policy" subtitle="Last updated: February 12, 2026.">
            <div className="prose prose-invert max-w-3xl text-muted-foreground space-y-6 text-base leading-relaxed">
                <p>LEGENDS UNITED ("we", "us") respects your privacy. This policy describes the limited data we collect and how it's used.</p>
                <h3 className="text-foreground font-display text-lg">1. Information we collect</h3>
                <p>When you submit our contact form, we collect your name, email, subject and message — plus your IP address and user agent for spam prevention. We do not sell or share this data.</p>
                <h3 className="text-foreground font-display text-lg">2. Cookies</h3>
                <p>We use only essential, first-party storage to remember your theme preference. No third-party tracking cookies.</p>
                <h3 className="text-foreground font-display text-lg">3. Data retention</h3>
                <p>Contact submissions are retained until your inquiry is resolved. You may request deletion at any time by writing to akkij8one@gmail.com.</p>
                <h3 className="text-foreground font-display text-lg">4. Changes</h3>
                <p>We may update this policy. Significant changes will be announced on this page.</p>
            </div>
        </Section>
    );
}
