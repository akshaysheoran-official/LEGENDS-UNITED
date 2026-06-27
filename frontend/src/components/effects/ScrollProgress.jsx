import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Top scroll progress bar (premium polish). */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
    return (
        <motion.div
            aria-hidden
            className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent"
            style={{ scaleX }}
        />
    );
}
