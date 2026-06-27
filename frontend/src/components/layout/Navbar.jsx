import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "../../config/site";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    // Show condensed nav: keep 6 most-used, others fold into More on smaller screens
    const primary = NAV_LINKS.slice(0, 6);
    const secondary = NAV_LINKS.slice(6);

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? "py-2" : "py-4"
            }`}
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className={`flex items-center justify-between rounded-2xl border border-border px-4 py-2.5 transition-all ${
                    scrolled ? "glass shadow-lg" : "bg-background/40 backdrop-blur"
                }`}>
                    <Link to="/" data-testid="nav-logo" className="group flex items-center gap-2.5">
                        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background font-display font-bold">
                            <span className="text-sm">L</span>
                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_currentColor] text-accent" />
                        </span>
                        <div className="flex flex-col leading-none">
                            <span className="font-display text-sm font-bold tracking-tight">LEGENDS UNITED</span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/ building the future</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {primary.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                data-testid={`nav-link-${l.to.replace(/\//g, "") || "home"}`}
                                end={l.to === "/"}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-foreground bg-secondary"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Link to="/join-team" className="hidden md:inline-flex">
                            <Button data-testid="nav-cta-join" size="sm" className="rounded-full px-4">
                                Join Us <ChevronRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                        </Link>
                        <button
                            data-testid="mobile-menu-toggle"
                            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Menu"
                        >
                            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 rounded-2xl border border-border glass p-3 lg:hidden"
                        >
                            <div className="grid grid-cols-2 gap-1">
                                {[...primary, ...secondary].map((l) => (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        end={l.to === "/"}
                                        data-testid={`mobile-nav-${l.to.replace(/\//g, "") || "home"}`}
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm transition-colors ${
                                                isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                                            }`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
