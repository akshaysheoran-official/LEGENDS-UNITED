import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Cpu, BookOpen, GitBranch, Zap, Globe, Github, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Section, StatusBadge } from "../components/Section";
import { TOOL_CATEGORIES, ROADMAP, FAQ, TECH_STACK, SITE, CHANGELOG } from "../config/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Spotlight } from "../components/effects/Spotlight";
import { RotatingPhrase } from "../components/effects/RotatingPhrase";

const ecosystemPillars = [
    { icon: Cpu, title: "AI Applications", description: "Practical LLM tooling — summarizers, copilots, prompt engineering studios." },
    { icon: ShieldCheck, title: "Cybersecurity", description: "Defender-first toolkit. Recon, hardening, education and live threat intelligence." },
    { icon: GitBranch, title: "Developer Resources", description: "Utilities, snippets and guides — calibrated for daily engineering workflows." },
    { icon: BookOpen, title: "Education & Open Source", description: "Long-form guides, write-ups and public repositories you can learn from." },
    { icon: Zap, title: "Automation", description: "Scripts, workflows and integrations that compress hours into seconds." },
    { icon: Globe, title: "SaaS Products", description: "Standalone products born inside the LEGENDS UNITED ecosystem." },
];

export default function Home() {
    return (
        <>
            {/* HERO */}
            <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-24 md:pt-16 md:pb-32" data-testid="hero-section">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur"
                >
                    <span className="status-dot text-accent" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                        v1 · Now Live
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]"
                >
                    Building the future <br />
                    <span className="relative inline-block">
                        through <span className="text-accent">technology</span>.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                    LEGENDS UNITED is a long-horizon technology platform — a digital headquarters for{" "}
                    <RotatingPhrase />. Built for the next decade, not the next sprint.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-10 flex flex-wrap items-center gap-3"
                >
                    <Link to="/future-tools">
                        <Button size="lg" data-testid="hero-cta-tools" className="rounded-full px-6 h-12 text-sm font-medium">
                            Explore the platform <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to="/cyber-news">
                        <Button size="lg" variant="outline" data-testid="hero-cta-news" className="rounded-full px-6 h-12 text-sm font-medium">
                            Live cyber news
                        </Button>
                    </Link>
                </motion.div>

                {/* metric strip */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { k: "Pillars", v: "6+" },
                        { k: "Tools planned", v: "30+" },
                        { k: "News feeds", v: "5" },
                        { k: "Horizon", v: "2026 →" },
                    ].map((m) => (
                        <div key={m.k} className="rounded-2xl border border-border bg-background/40 backdrop-blur p-5">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{m.k}</p>
                            <p className="mt-2 font-display text-3xl font-bold tracking-tight">{m.v}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* MISSION */}
            <Section eyebrow="// Mission" title="Not just a website. The foundation of an entire ecosystem.">
                <div className="grid gap-8 md:grid-cols-2">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        We're building the digital home for builders, defenders and learners — one that prioritizes
                        craft over noise, depth over hype, and longevity over trend cycles.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Every product we ship is part of a larger thesis: that technology, when made elegant and accessible,
                        becomes a lever for the people who use it. LEGENDS UNITED is that lever.
                    </p>
                </div>
            </Section>

            {/* ECOSYSTEM PILLARS - Bento */}
            <Section eyebrow="// Platform overview" title="A platform with six pillars." subtitle="Each pillar feeds the others. New tools register automatically into the ecosystem.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ecosystemPillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            data-testid={`pillar-card-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <Spotlight className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-8 card-glow h-full">
                                <div className="relative">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                                        <p.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{p.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* FUTURE TOOLS PREVIEW */}
            <Section eyebrow="// Future Tools" title="A scalable tools architecture." subtitle="Categories below register from a single config file. Future tools appear here automatically — no hardcoded pages.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {TOOL_CATEGORIES.slice(0, 6).map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6"
                        >
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">/{cat.id}</p>
                            <h3 className="mt-2 font-display text-lg font-bold tracking-tight">{cat.title}</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {cat.tools.slice(0, 3).map((t) => (
                                    <span key={t.name} className="text-[11px] font-mono px-2 py-1 rounded-md bg-secondary/60 text-foreground/80">
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <Link to="/future-tools">
                        <Button variant="outline" data-testid="home-tools-cta" className="rounded-full">View all tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </Link>
                </div>
            </Section>

            {/* ROADMAP PREVIEW */}
            <Section eyebrow="// Roadmap" title="What we're shipping next.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {ROADMAP.map((q) => (
                        <div key={q.quarter} className="rounded-2xl border border-border bg-background/40 backdrop-blur p-5">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{q.quarter}</p>
                                <StatusBadge status={q.status} />
                            </div>
                            <ul className="mt-4 space-y-2">
                                {q.items.slice(0, 4).map((it) => (
                                    <li key={it} className="flex items-start gap-2 text-sm text-foreground/80">
                                        <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            {/* TECH STACK MARQUEE */}
            <Section eyebrow="// Built with" title="A modern, no-compromise stack.">
                <div className="overflow-hidden border-y border-border py-8">
                    <div className="flex gap-12 marquee-track whitespace-nowrap w-max">
                        {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
                            <span key={i} className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground/40 hover:text-foreground transition-colors">
                                {t} <span className="text-accent">·</span>
                            </span>
                        ))}
                    </div>
                </div>
            </Section>

            {/* LATEST UPDATES */}
            <Section eyebrow="// Latest" title="Recent updates from the lab.">
                <div className="grid gap-4 md:grid-cols-3">
                    {CHANGELOG.slice(0, 3).map((c) => (
                        <Link key={c.version} to="/changelog" className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6 block">
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.date}</p>
                                <StatusBadge status={c.tag} />
                            </div>
                            <h3 className="mt-3 font-display text-lg font-bold tracking-tight">{c.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{c.version}</p>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* FAQ */}
            <Section eyebrow="// FAQ" title="Frequently asked questions.">
                <Accordion type="single" collapsible className="w-full">
                    {FAQ.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`} className="border-border">
                            <AccordionTrigger className="text-left font-display text-base md:text-lg font-semibold tracking-tight hover:no-underline">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-4 my-24">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-background/40 backdrop-blur p-10 md:p-16">
                    <div className="absolute inset-0 mesh-bg opacity-80" aria-hidden />
                    <div className="relative">
                        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">// Join the build</p>
                        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
                            We're assembling the team that will define the next decade of tech.
                        </h2>
                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Engineers, designers, researchers and writers — both contributors and core members.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/join-team">
                                <Button size="lg" data-testid="cta-join-team" className="rounded-full">
                                    Join the team <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" data-testid="cta-contact" className="rounded-full">
                                    Get in touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
