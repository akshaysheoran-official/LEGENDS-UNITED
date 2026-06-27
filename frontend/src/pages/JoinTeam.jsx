import { Section } from "../components/Section";
import { OPEN_ROLES, SITE } from "../config/site";
import { Button } from "../components/ui/button";
import { ExternalLink, GitBranch, MessageSquare, Sparkles, Check } from "lucide-react";

const workflow = [
    { step: "01", title: "Apply", body: "Fill the Google Form. Tell us what you want to build, learn, or contribute." },
    { step: "02", title: "Onboard", body: "We schedule an intro call, share the Notion and Discord, and pick a starter task." },
    { step: "03", title: "Ship", body: "Open a PR or proposal. Code review, polish, ship. Every contribution credited publicly." },
    { step: "04", title: "Grow", body: "Contributors level up to Core. Core members shape roadmap and lead pillars." },
];

const guidelines = [
    "Write code that ages well — clarity over cleverness.",
    "Every PR includes a description and screenshots/loom if UI-related.",
    "Security, privacy and accessibility are non-negotiable.",
    "Be kind. Disagreements happen — disrespect doesn't.",
];

export default function JoinTeam() {
    return (
        <>
            <Section eyebrow="// Join the team" title="We're hiring for the long game." subtitle="LEGENDS UNITED is being built openly. Engineers, designers, researchers and writers all welcome — contributor or core.">
                <div className="flex flex-wrap gap-3">
                    <a href={SITE.googleForm} target="_blank" rel="noopener noreferrer" data-testid="join-google-form-cta">
                        <Button size="lg" className="rounded-full">
                            Apply via Google Form <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                    <a href="https://t.me/CiBER_PIRATE" target="_blank" rel="noopener noreferrer" data-testid="join-telegram-cta">
                        <Button size="lg" variant="outline" className="rounded-full">
                            Telegram <MessageSquare className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </Section>

            <Section eyebrow="// Open roles" title="Roles we're filling.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {OPEN_ROLES.map((r) => (
                        <div key={r.title} className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{r.type}</span>
                                <span className="text-xs text-muted-foreground">{r.commitment}</span>
                            </div>
                            <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{r.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{r.focus}</p>
                            <a href={SITE.googleForm} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-xs font-medium text-accent hover:underline">Apply →</a>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="// Workflow" title="From application to shipped code.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {workflow.map((w) => (
                        <div key={w.step} className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{w.step}</p>
                            <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{w.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="// Guidelines" title="Contribution guidelines.">
                <div className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-10">
                    <ul className="space-y-3">
                        {guidelines.map((g) => (
                            <li key={g} className="flex items-start gap-3 text-base">
                                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <Check className="h-3 w-3" />
                                </span>
                                <span>{g}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>
        </>
    );
}
