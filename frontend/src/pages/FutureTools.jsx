import { useState } from "react";
import { motion } from "framer-motion";
import { Section, StatusBadge } from "../components/Section";
import { TOOL_CATEGORIES } from "../config/site";
import { Button } from "../components/ui/button";

export default function FutureTools() {
    const allCats = ["All", ...TOOL_CATEGORIES.map((c) => c.title)];
    const [active, setActive] = useState("All");
    const visible = active === "All" ? TOOL_CATEGORIES : TOOL_CATEGORIES.filter((c) => c.title === active);

    return (
        <Section
            eyebrow="// Future Tools"
            title="A scalable tools registry."
            subtitle="Tools register from a single config file and appear here automatically. Each tool is tagged Coming Soon, Beta, or Planned."
        >
            <div className="flex flex-wrap gap-2 mb-10">
                {allCats.map((c) => (
                    <Button
                        key={c}
                        variant={active === c ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActive(c)}
                        data-testid={`tools-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                        className="rounded-full"
                    >
                        {c}
                    </Button>
                ))}
            </div>

            <div className="space-y-12">
                {visible.map((cat) => (
                    <div key={cat.id} data-testid={`tool-category-${cat.id}`}>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-5 gap-2">
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">/{cat.id}</p>
                                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tighter">{cat.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-md">{cat.description}</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {cat.tools.map((t, i) => (
                                <motion.div
                                    key={t.name}
                                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    className="card-glow rounded-2xl border border-border bg-background/40 backdrop-blur p-6"
                                    data-testid={`tool-card-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h4 className="font-display text-lg font-bold tracking-tight">{t.name}</h4>
                                        <StatusBadge status={t.status} />
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
