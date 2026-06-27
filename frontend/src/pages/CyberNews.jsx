import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { Section } from "../components/Section";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Static fallback so the page is fully visible even when the backend is offline.
const FALLBACK_SPOTLIGHT = [
    { id: "eh-1", title: "Inside a Bug Bounty: How Hackers Earned $250,000 Reporting a Single Flaw", summary: "A deep look at responsible disclosure programs and the real-world impact ethical hackers have on global security infrastructure.", link: "https://www.hackerone.com/top-hackers", source: "Spotlight", category: "Ethical Hacking" },
    { id: "eh-2", title: "From Script Kiddie to Red Teamer: A Modern Roadmap", summary: "What it actually takes today to move from CTF challenges into professional offensive security — tools, certifications, and mindset.", link: "https://www.offsec.com/courses/pen-200/", source: "Spotlight", category: "Career" },
    { id: "eh-3", title: "The Possibilities of AI-Powered Penetration Testing", summary: "Large language models are starting to reshape recon, payload crafting, and vulnerability triage. Where it helps — and where it breaks.", link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", source: "Spotlight", category: "AI Security" },
];

const STATIC_NEWS = [
    { id: "s1", title: "Why Zero-Trust Architecture Is the New Default", summary: "Perimeter-based security is dead. Here's how modern defenders are rebuilding from first principles.", link: "https://www.nist.gov/publications/zero-trust-architecture", source: "Reading List", category: "Architecture" },
    { id: "s2", title: "OWASP Top 10 for LLM Applications — Explained", summary: "Prompt injection, training-data poisoning and model DoS — the new attack surface every AI builder should know.", link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", source: "Reading List", category: "AI Security" },
    { id: "s3", title: "Hardening HTTP Headers in 5 Minutes", summary: "CSP, HSTS, Referrer-Policy and friends — a checklist that closes 80% of common web vulnerabilities.", link: "https://owasp.org/www-project-secure-headers/", source: "Reading List", category: "Web" },
    { id: "s4", title: "A Beginner's Guide to Reverse Engineering", summary: "Start with Ghidra and a few practice binaries. Within a week you'll read assembly like English.", link: "https://ghidra-sre.org/", source: "Reading List", category: "Reverse Engineering" },
];

function formatDate(s) {
    if (!s) return "";
    try { return new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); }
    catch { return ""; }
}

export default function CyberNews() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("All");

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API}/news/cyber?limit=40`, { timeout: 8000 });
            const data = res.data || [];
            if (data.length === 0) throw new Error("empty");
            setItems(data);
        } catch (e) {
            // Backend optional — fall back to static content so page stays visible.
            console.warn("Live news unavailable, using fallback:", e?.message);
            setItems([...FALLBACK_SPOTLIGHT, ...STATIC_NEWS]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNews(); }, []);

    const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    const visible = filter === "All" ? items : items.filter((i) => i.category === filter);
    const spotlight = visible.filter((i) => i.source === "Spotlight");
    const news = visible.filter((i) => i.source !== "Spotlight");

    return (
        <Section
            eyebrow="// Cyber News & Ethical Hacking"
            title="Live cybersecurity intelligence, every day."
            subtitle="Curated feeds from The Hacker News, Krebs, BleepingComputer, Dark Reading and Schneier — paired with our editorial spotlight on ethical hacking."
        >
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <Button
                    variant={filter === "All" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("All")}
                    data-testid="news-filter-all"
                    className="rounded-full"
                >
                    All
                </Button>
                {categories.map((c) => (
                    <Button
                        key={c}
                        variant={filter === c ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(c)}
                        data-testid={`news-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                        className="rounded-full"
                    >
                        {c}
                    </Button>
                ))}
                <div className="ml-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchNews}
                        disabled={loading}
                        data-testid="news-refresh-btn"
                        className="rounded-full"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm" data-testid="news-error">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span>{error}</span>
                </div>
            )}

            {/* Ethical Hacking Spotlight */}
            {spotlight.length > 0 && (
                <div className="mb-10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-4">// Ethical Hacking Spotlight</p>
                    <div className="grid gap-4 md:grid-cols-3">
                        {spotlight.map((s, i) => (
                            <motion.a
                                key={s.id}
                                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`spotlight-card-${i}`}
                                className="card-glow group rounded-2xl border border-border bg-background/40 backdrop-blur p-6 block"
                            >
                                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">{s.category}</Badge>
                                <h3 className="mt-3 font-display text-lg font-bold tracking-tight group-hover:text-accent transition-colors">{s.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.summary}</p>
                                <span className="mt-4 inline-flex items-center text-xs text-accent font-medium">
                                    Read more <ExternalLink className="h-3 w-3 ml-1" />
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            )}

            {/* Live feed */}
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">// Live feed</p>

            {loading ? (
                <div className="grid gap-3" data-testid="news-skeletons">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-border bg-background/40 p-5">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-5 w-3/4 mt-3" />
                            <Skeleton className="h-3 w-full mt-2" />
                            <Skeleton className="h-3 w-1/2 mt-1.5" />
                        </div>
                    ))}
                </div>
            ) : news.length === 0 ? (
                <div className="rounded-2xl border border-border bg-background/40 p-10 text-center text-muted-foreground" data-testid="news-empty">
                    No articles matched.
                </div>
            ) : (
                <div className="grid gap-3">
                    {news.map((n, i) => (
                        <motion.a
                            key={n.id + i}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
                            href={n.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`news-article-${i}`}
                            className="card-glow group rounded-2xl border border-border bg-background/40 backdrop-blur p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
                        >
                            <div className="flex items-center gap-3 md:w-48 md:flex-shrink-0">
                                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">{n.source}</Badge>
                                {n.published && <span className="text-xs text-muted-foreground">{formatDate(n.published)}</span>}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-display text-base md:text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">{n.title}</h3>
                                {n.summary && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{n.summary}</p>}
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                        </motion.a>
                    ))}
                </div>
            )}
        </Section>
    );
}
