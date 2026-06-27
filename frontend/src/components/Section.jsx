import { motion } from "framer-motion";

export function Section({ id, eyebrow, title, subtitle, children, className = "", align = "left" }) {
    return (
        <section id={id} className={`mx-auto max-w-7xl px-4 py-20 md:py-28 ${className}`}>
            <div className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
                {eyebrow && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4 }}
                        className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-4"
                    >
                        {eyebrow}
                    </motion.p>
                )}
                {title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]"
                    >
                        {title}
                    </motion.h2>
                )}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
            {children}
        </section>
    );
}

export function StatusBadge({ status }) {
    const map = {
        "coming-soon": { label: "Coming Soon", color: "text-accent", dot: "bg-accent" },
        "beta": { label: "Beta", color: "text-emerald-500", dot: "bg-emerald-500" },
        "planned": { label: "Planned", color: "text-muted-foreground", dot: "bg-muted-foreground" },
        "in-progress": { label: "In Progress", color: "text-accent", dot: "bg-accent" },
        "release": { label: "Release", color: "text-emerald-500", dot: "bg-emerald-500" },
        "design": { label: "Design", color: "text-accent", dot: "bg-accent" },
        "infra": { label: "Infra", color: "text-foreground", dot: "bg-foreground" },
    };
    const cfg = map[status] || map["planned"];
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} animate-pulse-glow`} />
            {cfg.label}
        </span>
    );
}
