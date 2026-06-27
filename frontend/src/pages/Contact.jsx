import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Section } from "../components/Section";
import { SOCIALS, SITE } from "../config/site";
import { SocialIcon } from "../components/SocialIcon";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Loader2, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
    name: z.string().min(2, "Name is too short").max(120),
    email: z.string().email("Enter a valid email"),
    subject: z.string().min(2, "Subject is required").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(4000),
    company: z.string().max(120).optional(), // honeypot
});

export default function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
    });

    const onSubmit = async (values) => {
        setSubmitting(true);
        try {
            const { data } = await axios.post(`${API}/contact`, values, { timeout: 8000 });
            toast.success(data?.message || "Message sent. We'll be in touch.");
            reset();
        } catch (e) {
            const detail = e?.response?.data?.detail;
            if (e?.response?.status === 429) {
                toast.error("Too many submissions. Please wait a few minutes.");
            } else if (e?.response?.status === 422) {
                toast.error(detail || "Please check the form and try again.");
            } else {
                // Backend optional — open user's email client as a graceful fallback.
                const body = encodeURIComponent(
                    `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
                );
                const subject = encodeURIComponent(values.subject || "Hello from LEGENDS UNITED");
                window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
                toast.message("Opening your email client…", {
                    description: "Backend isn't connected yet — we redirected your message to email.",
                });
                reset();
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Section eyebrow="// Contact" title="Tell us what you're building." subtitle="Partnerships, collaborations, questions or just hello — drop us a note. We read everything.">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-8">
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Direct</p>
                            <a href={`mailto:${SITE.email}`} className="mt-2 block font-display text-xl md:text-2xl font-bold tracking-tight hover:text-accent transition-colors" data-testid="contact-email">
                                {SITE.email}
                            </a>
                            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Elsewhere</p>
                            <div className="mt-3 space-y-2">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.id}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid={`contact-social-${s.id}`}
                                        className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 hover:border-accent transition-colors group"
                                    >
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                                            <SocialIcon name={s.icon} className="h-4 w-4" />
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium group-hover:text-accent transition-colors">{s.label}</p>
                                            <p className="text-xs text-muted-foreground">{s.handle}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        data-testid="contact-form"
                        className="lg:col-span-7 rounded-2xl border border-border bg-background/40 backdrop-blur p-6 md:p-8 space-y-5"
                    >
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Name</Label>
                                <Input id="name" data-testid="contact-name" {...register("name")} placeholder="Your name" className="mt-2 h-11" />
                                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Email</Label>
                                <Input id="email" type="email" data-testid="contact-email-input" {...register("email")} placeholder="you@domain.com" className="mt-2 h-11" />
                                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Subject</Label>
                            <Input id="subject" data-testid="contact-subject" {...register("subject")} placeholder="What's this about?" className="mt-2 h-11" />
                            {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Message</Label>
                            <Textarea id="message" data-testid="contact-message" {...register("message")} placeholder="Tell us more…" className="mt-2 min-h-[140px]" />
                            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                        </div>
                        {/* honeypot */}
                        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden {...register("company")} className="hidden" />
                        <Button type="submit" disabled={submitting} data-testid="contact-submit" size="lg" className="w-full rounded-full">
                            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending</> : <>Send message <Send className="h-4 w-4 ml-2" /></>}
                        </Button>
                    </form>
                </div>
            </Section>
        </>
    );
}
