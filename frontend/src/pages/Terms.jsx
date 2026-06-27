import { Section } from "../components/Section";

export default function Terms() {
    return (
        <Section eyebrow="// Terms" title="Terms of Service" subtitle="Last updated: February 12, 2026.">
            <div className="prose prose-invert max-w-3xl text-muted-foreground space-y-6 text-base leading-relaxed">
                <p>By using LEGENDS UNITED you agree to the following terms.</p>
                <h3 className="text-foreground font-display text-lg">1. Acceptable use</h3>
                <p>You agree not to use the platform for any unlawful activity, to attempt to disrupt service, or to abuse any tool we provide.</p>
                <h3 className="text-foreground font-display text-lg">2. Content</h3>
                <p>News articles displayed in the Cyber News section are aggregated from third-party sources. Copyright belongs to the respective publishers; we link out for full reading.</p>
                <h3 className="text-foreground font-display text-lg">3. No warranty</h3>
                <p>The platform and all tools are provided "as is". We make no guarantees of fitness for any particular purpose.</p>
                <h3 className="text-foreground font-display text-lg">4. Changes</h3>
                <p>We may modify these terms. Continued use of the platform indicates acceptance of updated terms.</p>
            </div>
        </Section>
    );
}
