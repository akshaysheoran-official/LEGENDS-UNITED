import { Section, StatusBadge } from "../components/Section";

const projects = [
    {
        name: "LEGENDS UNITED Platform",
        status: "in-progress",
        description: "The platform you're looking at — multi-pillar tech HQ built on React + FastAPI + MongoDB.",
        tags: ["Platform", "Full-stack"],
    },
    {
        name: "Cyber News Aggregator",
        status: "release",
        description: "Live multi-source cybersecurity news with editorial spotlight on ethical hacking.",
        tags: ["Backend", "Content"],
    },
    {
        name: "Header Inspector",
        status: "beta",
        description: "Real-time security header audit for any URL — built into our cyber toolkit.",
        tags: ["Cybersecurity", "Tool"],
    },
    {
        name: "LU Components",
        status: "planned",
        description: "Open-source Tailwind + shadcn UI kit — the same primitives that power this site.",
        tags: ["Open Source", "Design"],
    },
    {
        name: "Prompt Forge",
        status: "coming-soon",
        description: "Reusable prompt templates with variables, evaluation and team libraries.",
        tags: ["AI"],
    },
    {
        name: "LU Pro",
        status: "planned",
        description: "Premium membership — advanced quotas, priority features, private community.",
        tags: ["SaaS"],
    },
];

export default function Projects() {
    return (
        <Section eyebrow="// Projects" title="What we're building, in the open." subtitle="From in-progress experiments to shipped releases — here's the current state of the lab.">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                    <div
                        key={p.name}
                        className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6"
                        data-testid={`project-card-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="font-display text-lg font-bold tracking-tight">{p.name}</h3>
                            <StatusBadge status={p.status} />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                                <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary/60 text-foreground/80">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
