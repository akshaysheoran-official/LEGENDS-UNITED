import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
    "AI applications",
    "cybersecurity intelligence",
    "developer utilities",
    "open-source tools",
    "automation flows",
    "education that ships",
];

export function RotatingPhrase({ className = "" }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % phrases.length), 2400);
        return () => clearInterval(t);
    }, []);
    return (
        <span className={`relative inline-block align-baseline ${className}`} style={{ minWidth: "16ch" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={phrases[i]}
                    initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-accent"
                >
                    {phrases[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
