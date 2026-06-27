import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NoiseOverlay } from "../effects/NoiseOverlay";
import { BackgroundFX } from "../effects/BackgroundFX";
import { ScrollProgress } from "../effects/ScrollProgress";
import { motion, AnimatePresence } from "framer-motion";

export function RootLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen">
            <BackgroundFX />
            <NoiseOverlay />
            <ScrollProgress />
            <Navbar />
            <main className="relative z-10 pt-28">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
