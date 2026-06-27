import { useRef } from "react";

/**
 * Spotlight: a cursor-tracking radial highlight that reveals on hover.
 * Wrap any element with this to get a premium hover-glow effect.
 */
export function Spotlight({ children, className = "", color = "rgba(245, 166, 35, 0.18)" }) {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            className={`relative group ${className}`}
            style={{
                "--mx": "50%",
                "--my": "50%",
            }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
                style={{
                    background: `radial-gradient(380px circle at var(--mx) var(--my), ${color}, transparent 60%)`,
                }}
            />
            {children}
        </div>
    );
}
