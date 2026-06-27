import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = (mounted ? (resolvedTheme || theme) : "dark") === "dark";

    return (
        <button
            type="button"
            data-testid="theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-all hover:border-accent hover:text-accent"
        >
            {mounted && isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
    );
}
