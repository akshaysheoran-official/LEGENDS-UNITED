import { Section, StatusBadge } from "../components/Section";
import { CHANGELOG } from "../config/site";

export default function Changelog() {
    return (
        <Section eyebrow="// Changelog" title="Every shipped change, in order." subtitle="A complete log of what's gone live on the platform.">
            <div className="space-y-8">
                {CHANGELOG.map((c) => (
                    <div
                        key={c.version}
                        className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-8"
                        data-testid={`changelog-${c.version}`}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.date}</p>
                                <span className="font-mono text-xs text-foreground/80">{c.version}</span>
                            </div>
                            <StatusBadge status={c.tag} />
                        </div>
                        <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{c.title}</h3>
                        <ul className="mt-4 space-y-2">
                            {c.notes.map((n) => (
                                <li key={n} className="text-sm text-foreground/80 flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                                    {n}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
