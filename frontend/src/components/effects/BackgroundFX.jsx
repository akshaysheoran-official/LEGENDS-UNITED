export function BackgroundFX() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 mesh-bg animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
            <div className="absolute inset-0 tech-grid opacity-70" />
        </div>
    );
}
