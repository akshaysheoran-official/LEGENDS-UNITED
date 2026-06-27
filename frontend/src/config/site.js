// Single source of truth for navigation, social links, future tools and roadmap.
// Add new tools here and they'll automatically appear on the Future Tools page.

export const SITE = {
    name: "LEGENDS UNITED",
    short: "LU",
    tagline: "Building the Future Through Technology.",
    description:
        "A premium technology platform focused on AI, Cybersecurity, Developer Resources, Automation, Educational Content, Open Source and future SaaS products.",
    email: "akkij8one@gmail.com",
    googleForm: "https://forms.gle/fBd3rbx9i957mLR17",
};

export const SOCIALS = [
    { id: "instagram", label: "Instagram", handle: "@sheoranxjaat", href: "https://instagram.com/sheoranxjaat", icon: "instagram" },
    { id: "telegram", label: "Telegram", handle: "@CiBER_PIRATE", href: "https://t.me/CiBER_PIRATE", icon: "send" },
    { id: "email", label: "Email", handle: "akkij8one@gmail.com", href: "mailto:akkij8one@gmail.com", icon: "mail" },
    { id: "discord", label: "Discord", handle: "Coming soon", href: "#", icon: "discord", soon: true },
    { id: "pinterest", label: "Pinterest", handle: "Coming soon", href: "https://pinterest.com/", icon: "pinterest", soon: true },
    { id: "quora", label: "Quora", handle: "Coming soon", href: "https://quora.com/", icon: "quora", soon: true },
];

export const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Developer Resources", to: "/developer-resources" },
    { label: "Cyber News", to: "/cyber-news" },
    { label: "Future Tools", to: "/future-tools" },
    { label: "Projects", to: "/projects" },
    { label: "Roadmap", to: "/roadmap" },
    { label: "Changelog", to: "/changelog" },
    { label: "Join Team", to: "/join-team" },
    { label: "Community", to: "/community" },
    { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS = {
    Platform: [
        { label: "About", to: "/about" },
        { label: "Future Tools", to: "/future-tools" },
        { label: "Projects", to: "/projects" },
        { label: "Roadmap", to: "/roadmap" },
        { label: "Changelog", to: "/changelog" },
    ],
    Resources: [
        { label: "Developer Resources", to: "/developer-resources" },
        { label: "Cyber News", to: "/cyber-news" },
        { label: "Community", to: "/community" },
    ],
    Company: [
        { label: "Join Team", to: "/join-team" },
        { label: "Contact", to: "/contact" },
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
    ],
};

// Future Tools — categories with placeholder cards
export const TOOL_CATEGORIES = [
    {
        id: "developer",
        title: "Developer Utilities",
        description: "Everyday helpers for engineers — formatters, converters, generators.",
        tools: [
            { name: "JSON ↔ YAML Studio", status: "planned", description: "Convert, format, validate and diff structured data." },
            { name: "Regex Playground", status: "beta", description: "Live regex builder with shareable URLs." },
            { name: "UUID & ID Generator", status: "planned", description: "ULID, UUID v4/v7, NanoID — all in one." },
            { name: "Cron Translator", status: "planned", description: "Plain-English cron expression composer." },
        ],
    },
    {
        id: "ai",
        title: "AI Applications",
        description: "Practical AI tools built around real workflows.",
        tools: [
            { name: "Prompt Forge", status: "coming-soon", description: "Reusable prompt templates with variables." },
            { name: "AI Summarizer", status: "planned", description: "Summarize PDFs, articles and transcripts." },
            { name: "Code Review Copilot", status: "planned", description: "Static review augmented with LLM context." },
        ],
    },
    {
        id: "pdf",
        title: "PDF Utilities",
        description: "Fast, private, in-browser PDF tooling.",
        tools: [
            { name: "Merge / Split", status: "planned", description: "Drag-and-drop PDF assembly." },
            { name: "Compress", status: "planned", description: "Shrink without quality loss." },
            { name: "OCR Extract", status: "planned", description: "Searchable text from scanned PDFs." },
        ],
    },
    {
        id: "image",
        title: "Image Utilities",
        description: "Pro-grade image processing on the edge.",
        tools: [
            { name: "Background Remover", status: "planned", description: "One-click subject isolation." },
            { name: "Bulk Compressor", status: "planned", description: "Batch optimize PNG / JPG / WebP." },
            { name: "Format Converter", status: "planned", description: "AVIF, WebP, HEIC and back." },
        ],
    },
    {
        id: "cyber",
        title: "Cybersecurity Toolkit",
        description: "Hardening, recon and education for defenders.",
        tools: [
            { name: "Header Inspector", status: "beta", description: "Audit security headers of any URL." },
            { name: "Password Forensics", status: "planned", description: "Entropy and breach analysis." },
            { name: "Hash Workbench", status: "planned", description: "MD5/SHA/Bcrypt utilities in one panel." },
        ],
    },
    {
        id: "saas",
        title: "SaaS Products",
        description: "Standalone products from the LEGENDS UNITED ecosystem.",
        tools: [
            { name: "LU Analytics", status: "planned", description: "Privacy-first product analytics." },
            { name: "LU Notify", status: "planned", description: "Lightweight notification infrastructure." },
        ],
    },
];

// Roadmap quarters
export const ROADMAP = [
    {
        quarter: "Q1 2026",
        status: "in-progress",
        items: [
            "Launch LEGENDS UNITED platform v1",
            "Cyber News live feed",
            "Public Contact + Newsletter",
            "Developer Resources index",
        ],
    },
    {
        quarter: "Q2 2026",
        status: "planned",
        items: [
            "Regex Playground (beta → stable)",
            "Header Inspector (beta)",
            "User accounts + bookmarks",
            "Open source repository hub",
        ],
    },
    {
        quarter: "Q3 2026",
        status: "planned",
        items: [
            "AI Summarizer + Prompt Forge",
            "PDF utilities suite",
            "Browser extension companion",
            "Documentation portal",
        ],
    },
    {
        quarter: "Q4 2026",
        status: "planned",
        items: [
            "Premium membership (LU Pro)",
            "Public APIs",
            "Admin Dashboard",
            "Internationalization (i18n)",
        ],
    },
];

export const CHANGELOG = [
    {
        date: "2026-02-12",
        version: "v1.0.0",
        title: "Platform launch",
        tag: "release",
        notes: [
            "Inaugural release of LEGENDS UNITED",
            "Cyber News with live RSS aggregation",
            "Contact form with backend persistence and rate limiting",
            "Future Tools registry and scalable architecture",
        ],
    },
    {
        date: "2026-02-10",
        version: "v0.9.0",
        title: "Design system locked",
        tag: "design",
        notes: [
            "Satoshi / Manrope / JetBrains Mono typography",
            "Dark + Light themes with user preference",
            "Noise overlay, mesh gradients, animated grid",
        ],
    },
    {
        date: "2026-02-05",
        version: "v0.5.0",
        title: "Architecture",
        tag: "infra",
        notes: [
            "Single-source navigation + tools registry",
            "Component primitives via shadcn/ui",
            "Framer Motion scroll choreography",
        ],
    },
];

export const FAQ = [
    { q: "What is LEGENDS UNITED?", a: "A long-term technology platform — a digital headquarters for tools, education, open source and SaaS products spanning AI, cybersecurity and developer experience." },
    { q: "Is everything free?", a: "Core utilities and content will remain free. A premium membership (LU Pro) will unlock advanced features and quotas." },
    { q: "How can I contribute?", a: "Apply via the Join Team page. We welcome engineers, designers, researchers and writers — both contributors and core members." },
    { q: "Will there be an API?", a: "Yes. Public APIs are on the Q4 2026 roadmap with stable versioning and developer keys." },
    { q: "Where do you get cybersecurity news?", a: "We aggregate trusted feeds (The Hacker News, Krebs, BleepingComputer, Dark Reading, Schneier) and pair them with our own editorial spotlight." },
];

export const TECH_STACK = [
    "React", "FastAPI", "MongoDB", "TailwindCSS", "Framer Motion", "shadcn/ui",
    "TanStack Query", "Zod", "React Hook Form", "Lucide", "Sonner",
];

export const OPEN_ROLES = [
    { title: "Full Stack Engineer", type: "Core", commitment: "Part-time / Volunteer", focus: "React + FastAPI" },
    { title: "Cybersecurity Researcher", type: "Core", commitment: "Project-based", focus: "Recon, write-ups, education" },
    { title: "AI / ML Engineer", type: "Core", commitment: "Part-time", focus: "LLM apps, evaluation, infra" },
    { title: "Product Designer", type: "Core", commitment: "Project-based", focus: "Design systems, interaction" },
    { title: "Technical Writer", type: "Contributor", commitment: "Flexible", focus: "Guides, docs, blogs" },
    { title: "Community Manager", type: "Contributor", commitment: "Flexible", focus: "Discord, Telegram, events" },
];
