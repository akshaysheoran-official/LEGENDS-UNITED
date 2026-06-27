import { Section } from "../components/Section";
import { SOCIALS, SITE } from "../config/site";
import { SocialIcon } from "../components/SocialIcon";
import { Button } from "../components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Community() {
    return (
        <>
            <Section eyebrow="// Community" title="A home for builders, defenders and learners." subtitle="Join the conversation on the platforms that work for you. Discord, Telegram, Pinterest and Quora — all linked below.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {SOCIALS.map((s) => (
                        <a
                            key={s.id}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`community-${s.id}`}
                            className="card-glow group rounded-2xl border border-border bg-background/40 backdrop-blur p-6 flex items-center gap-4"
                        >
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                                <SocialIcon name={s.icon} className="h-5 w-5" />
                            </span>
                            <div className="flex-1">
                                <h3 className="font-display text-base font-bold tracking-tight group-hover:text-accent transition-colors">{s.label}</h3>
                                <p className="text-xs text-muted-foreground">{s.handle}</p>
                            </div>
                            {s.soon ? (
                                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Soon</span>
                            ) : (
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            )}
                        </a>
                    ))}
                </div>
            </Section>

            <Section eyebrow="// Newsletter" title="Quarterly platform digest.">
                <div className="rounded-2xl border border-border bg-background/40 backdrop-blur p-8 md:p-12 text-center">
                    <p className="max-w-xl mx-auto text-muted-foreground">No spam. No noise. Four updates a year on what we've shipped, what's next, and what we've learned.</p>
                    <a href={SITE.googleForm} target="_blank" rel="noopener noreferrer">
                        <Button data-testid="community-newsletter-cta" size="lg" className="mt-6 rounded-full">
                            Get on the list <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </Section>
        </>
    );
}
