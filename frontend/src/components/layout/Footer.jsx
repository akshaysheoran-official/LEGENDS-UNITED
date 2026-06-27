import { Link } from "react-router-dom";
import { FOOTER_LINKS, SITE, SOCIALS } from "../../config/site";
import { SocialIcon } from "../SocialIcon";

export function Footer() {
    return (
        <footer className="relative border-t border-border mt-32" data-testid="site-footer">
            <div className="mx-auto max-w-7xl px-4 py-16">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-2.5">
                            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background font-display font-bold">L</span>
                            <span className="font-display text-base font-bold tracking-tight">LEGENDS UNITED</span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">{SITE.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.id}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid={`footer-social-${s.id}`}
                                    aria-label={s.label}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                                    title={`${s.label} — ${s.handle}`}
                                >
                                    <SocialIcon name={s.icon} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                        <div key={group} className="md:col-span-2">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">{group}</p>
                            <ul className="space-y-2.5">
                                {links.map((l) => (
                                    <li key={l.to}>
                                        <Link
                                            to={l.to}
                                            data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="text-sm text-foreground/80 hover:text-accent transition-colors"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">Newsletter</p>
                        <p className="text-sm text-muted-foreground mb-3">Quarterly updates. No spam.</p>
                        <a
                            href={SITE.googleForm}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="footer-newsletter-cta"
                            className="inline-flex items-center justify-center rounded-full bg-foreground text-background text-xs font-medium px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            Get on the list →
                        </a>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground font-mono">
                        © {new Date().getFullYear()} LEGENDS UNITED — All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                        <span className="font-mono">v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
