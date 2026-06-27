import { Section, StatusBadge } from "../components/Section";
import { ROADMAP } from "../config/site";

export default function Roadmap() {
    return (
        <Section eyebrow="// Roadmap" title="A public roadmap. No surprises." subtitle="What's shipping, when, and where it sits in priority. We update this as plans evolve.">
            <div className="relative">
                <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />
                <div className="space-y-10">
                    {ROADMAP.map((q, i) => (
                        <div key={q.quarter} className="relative grid md:grid-cols-2 gap-6" data-testid={`roadmap-${q.quarter.toLowerCase().replace(/\s+/g, "-")}`}>
                            <div className={`md:col-start-${i % 2 === 0 ? "1" : "2"} ${i % 2 === 1 ? "md:text-right" : ""}`}>
                                <div className="relative rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-8 ml-10 md:ml-0">
                                    <span className={`absolute top-7 ${i % 2 === 0 ? "md:-right-[2.6rem] -left-9" : "md:-left-[2.6rem] -left-9"} inline-flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-accent`}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    </span>
                                    <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{q.quarter}</p>
                                        <StatusBadge status={q.status} />
                                    </div>
                                    <ul className={`mt-4 space-y-2 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                                        {q.items.map((it) => (
                                            <li key={it} className="text-sm text-foreground/80 flex items-start gap-2">
                                                {i % 2 === 1 ? (
                                                    <>
                                                        <span className="md:hidden mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                                                        <span className="flex-1">{it}</span>
                                                        <span className="hidden md:inline mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                                                        <span>{it}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
