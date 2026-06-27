import { Section } from "../components/Section";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Shield } from "lucide-react";

const values = [
    { icon: Target, title: "Craft", body: "Pixel-grade execution. Nothing ships unless it feels considered." },
    { icon: Eye, title: "Clarity", body: "Honest copy, honest products. No empty hype, ever." },
    { icon: Compass, title: "Long-horizon", body: "We design for the next ten years, not the next demo." },
    { icon: Shield, title: "Trust", body: "Privacy, security and reliability are first-class concerns." },
];

export default function About() {
    return (
        <>
            <Section eyebrow="// About" title="A platform built for builders, defenders and learners." subtitle="LEGENDS UNITED began as a single repository and a stubborn idea: the technology web deserves a calmer, more elegant headquarters.">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-muted-foreground">
                        <p>We pair the rigor of a security lab with the polish of a product studio. The result is a platform that treats software the way Apple treats hardware — every detail intentional.</p>
                        <p>The mission is simple: take the messy, fragmented surface of modern technology and turn it into something cohesive — a place where AI tools, cybersecurity intelligence, developer utilities and education live under one roof.</p>
                        <p>This is the foundation. Everything you'll see across the platform — tools, news, projects, roadmap — is a piece of that thesis.</p>
                    </div>
                    <div className="md:col-span-5">
                        <div className="rounded-3xl border border-border bg-background/40 backdrop-blur p-1 overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/8453814/pexels-photo-8453814.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                alt="Contemporary tech workspace"
                                className="rounded-[1.4rem] w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            <Section eyebrow="// Values" title="What we believe.">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.05 }}
                            className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6"
                        >
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                                <v.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{v.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </>
    );
}
