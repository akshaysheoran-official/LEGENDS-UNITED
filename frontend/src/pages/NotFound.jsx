import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
    return (
        <section className="mx-auto max-w-3xl px-4 py-24 md:py-32 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">// 404</p>
            <h1 className="mt-6 font-display text-6xl md:text-8xl font-black tracking-tighter">Lost in space.</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
                The page you're looking for doesn't exist — yet. It might be on the roadmap.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link to="/">
                    <Button data-testid="notfound-home-cta" size="lg" className="rounded-full">
                        <HomeIcon className="h-4 w-4 mr-2" /> Back to home
                    </Button>
                </Link>
                <Link to="/roadmap">
                    <Button data-testid="notfound-roadmap-cta" size="lg" variant="outline" className="rounded-full">
                        View roadmap
                    </Button>
                </Link>
            </div>
        </section>
    );
}
