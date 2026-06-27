import { Section } from "../components/Section";
import { Code, BookText, Terminal, Boxes, ExternalLink } from "lucide-react";

const sections = [
    {
        title: "Guides",
        icon: BookText,
        items: [
            { name: "Production-grade FastAPI", desc: "Patterns for scalable Python services.", soon: true },
            { name: "React 19 architecture", desc: "Routing, query, state — opinionated defaults.", soon: true },
            { name: "MongoDB modeling", desc: "Schemas, indices and migrations.", soon: true },
        ],
    },
    {
        title: "Snippets",
        icon: Code,
        items: [
            { name: "Auth boilerplate", desc: "JWT + bcrypt + refresh rotation.", soon: true },
            { name: "Rate limiting", desc: "In-memory and Redis variants.", soon: true },
            { name: "RSS aggregation", desc: "Parser, cache, fault-tolerant fetch.", soon: false },
        ],
    },
    {
        title: "CLIs & Templates",
        icon: Terminal,
        items: [
            { name: "create-lu-app", desc: "Bootstrap a full-stack project.", soon: true },
            { name: "lu-scan", desc: "Lightweight security header scanner.", soon: true },
            { name: "lu-deploy", desc: "Opinionated Railway deploy helper.", soon: true },
        ],
    },
    {
        title: "Open Source",
        icon: Boxes,
        items: [
            { name: "LU Components", desc: "Premium UI kit (Tailwind + shadcn).", soon: true },
            { name: "LU Hooks", desc: "Reusable React hooks library.", soon: true },
            { name: "LU Crypto", desc: "Audited cryptographic helpers.", soon: true },
        ],
    },
];

export default function DevResources() {
    return (
        <Section eyebrow="// Developer Resources" title="Resources for engineers who care about craft." subtitle="Guides, snippets, CLIs and open-source tools — all calibrated to ship production-quality code.">
            <div className="grid gap-6 md:grid-cols-2">
                {sections.map((s) => (
                    <div key={s.title} className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
                                <s.icon className="h-4 w-4" />
                            </span>
                            <h3 className="font-display text-xl font-bold tracking-tight">{s.title}</h3>
                        </div>
                        <ul className="mt-5 divide-y divide-border">
                            {s.items.map((it) => (
                                <li key={it.name} className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium">{it.name}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{it.desc}</p>
                                    </div>
                                    {it.soon ? (
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Soon</span>
                                    ) : (
                                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
