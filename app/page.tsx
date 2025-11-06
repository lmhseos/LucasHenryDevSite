"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) => (
  <div className="mb-10 text-center">
    {kicker && <p className="mb-2 text-sm tracking-widest text-indigo-300 uppercase">{kicker}</p>}
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base text-indigo-200/90">{subtitle}</p>}
  </div>
);

const starCount = (density: number) => Math.floor(400 * density);

// Demo projects
const projects = [
  {
    title: "Discord Bot",
    desc: "This Discord bot, built using C#, Replicate, and AWS, can generate AI images, roll dice, and take polls. It provides a fun and interactive experience for users.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Replicate", "AWS"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "Index Llama Agent",
    desc: "Index Llama Agent is a local large language model agent developed using Python, Llama, and Slack API. It can execute code, retrieve data, and solve problems autonomously",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    tags: ["Ollama", "Slack API", "Python"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "Personal Site",
    desc: "My personal site, created with ReactJS, C#, and OpenAI, showcases my projects and work experience. It highlights my web development and AI integration skills.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind", "Vector Database"],
    links: { demo: "#", code: "#" },
  },
];

export default function SpacePortfolio() {
  const [showStars, setShowStars] = React.useState<boolean>(() => {
    try {
      const v = typeof window !== "undefined" ? localStorage.getItem("showStars") : null;
      // Default ON when no value stored
      return v === null ? true : v === "1";
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    try { localStorage.setItem("showStars", showStars ? "1" : "0"); } catch {}
  }, [showStars]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = typeof e.key === "string" ? e.key.toLowerCase() : "";
      if ((e.ctrlKey || e.metaKey) && key === "s") {
        e.preventDefault();
        setShowStars(s => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <StyleTag />
      <div className="relative min-h-screen text-white antialiased overflow-hidden bg-black">
        {showStars && <StarsBackground />}

        <div className="relative z-10">
          <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
            <Container className="flex h-14 items-center justify-between">
              <nav className="hidden gap-6 md:flex">
                <a href="#about" className="text-sm text-indigo-200 hover:text-white">About</a>
                <a href="#projects" className="text-sm text-indigo-200 hover:text-white">Projects</a>
                <a href="#contact" className="text-sm text-indigo-200 hover:text-white">Contact</a>
              </nav>
              <div className="flex items-center gap-2">
                <IconLink href="https://github.com/your-handle" label="GitHub"><Github className="h-5 w-5" /></IconLink>
                <IconLink href="https://linkedin.com/in/your-handle" label="LinkedIn"><Linkedin className="h-5 w-5" /></IconLink>
                <Button size="sm" variant="secondary" onClick={() => setShowStars(s => !s)}>
                  {showStars ? "Stars: On" : "Stars: Off"}
                </Button>
                <Button asChild size="sm" className="hidden sm:inline-flex">
                </Button>
              </div>
            </Container>
          </header>

          {/* About */}
          <section id="about" className="relative">
  <Container className="py-16 sm:py-20">
    <div className="grid md:grid-cols-2 gap-10 md:gap-10 items-center">
      {/* Left: Photo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto aspect-square w-64 sm:w-72 md:w-80 overflow-hidden rounded-2xl border border-white/10 shadow-xl"
      >
        <img
          src="/me.jpg"
          alt="Your portrait"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Right: Copy */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-left"
      >
        <p className="mb-2 text-sm font-medium tracking-widest text-indigo-300 uppercase">Hello, I’m</p>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Lucas Henry</h1>
        <p className="mt-4 max-w-xl text-indigo-200/90 text-lg leading-relaxed">
          Software engineer focused on building reliable full-stack systems and cloud-native infrastructure. I love turning complex problems into clean, performant products.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button asChild>
            <a href="#projects">View projects</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" /> Resume
            </a>
          </Button>
          <a href="#contact" className="text-sm text-indigo-300 hover:text-white">Contact me</a>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-indigo-200/80 sm:max-w-md">
          <li className="rounded-xl border border-white/10 bg-white/5 p-3">⚡ TypeScript, React, Next.js</li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-3">☁️ Docker, CI/CD, Kubernetes</li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-3">🧠 Python, FastAPI</li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-3">🗄️ Postgres, Prisma</li>
        </ul>
      </motion.div>
    </div>
  </Container>
</section>

          {/* Projects */}
          <section id="projects" className="relative border-t border-white/10">
            <Container className="py-16 sm:py-24">
              <SectionTitle kicker="Work" title="Highlighted Projects" subtitle="A few things I’ve designed, built, and shipped." />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                  <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }}>
                    <Card className="group h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur">
                      <CardHeader className="p-0">
                        <div className="relative aspect-video w-full overflow-hidden">
                          <img src={p.image} alt="Project preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-5">
                        <CardTitle className="text-white">{p.title}</CardTitle>
                        <p className="mt-2 text-sm text-indigo-200/90">{p.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t: string) => (
                            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-indigo-200/90">{t}</span>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                          {p.links.demo && (
                            <Button asChild size="sm">
                              <a href={p.links.demo} target="_blank" rel="noreferrer">
                                Live demo <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {p.links.code && (
                            <Button asChild size="sm" variant="secondary">
                              <a href={p.links.code} target="_blank" rel="noreferrer">
                                Code <Github className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>

          {/* Contact */}
          <section id="contact" className="relative border-t border-white/10">
            <Container className="py-16 sm:py-24">
              <SectionTitle kicker="Get in touch" title="Contact me" subtitle="Have a role, project, or idea? Drop a note—I'll reply fast." />

              {/* 2-column layout: left = form, right = prefer email + social buttons */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left: Form */}
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <form action="mailto:you@example.com" method="post" encType="text/plain" className="space-y-4">
                      <div>
                        <label htmlFor="name" className="mb-1 block text-sm text-indigo-200/90">Name</label>
                        <Input id="name" name="name" placeholder="Jane Doe" className="bg-black/30 text-white placeholder:text-indigo-300/50" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1 block text-sm text-indigo-200/90">Email</label>
                        <Input id="email" name="email" type="email" placeholder="jane@company.com" className="bg-black/30 text-white placeholder:text-indigo-300/50" required />
                      </div>
                      <div>
                        <label htmlFor="message" className="mb-1 block text-sm text-indigo-200/90">Message</label>
                        <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project…" className="bg-black/30 text-white placeholder:text-indigo-300/50" required />
                      </div>
                      <Button type="submit" className="w-full">Send message</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Right: Prefer email + social buttons */}
                <div className="flex flex-col gap-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-indigo-300">Prefer email?</p>
                    <a href="mailto:you@example.com" className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-white hover:underline">
                      <Mail className="h-5 w-5" /> you@example.com
                    </a>
                    <p className="mt-3 text-sm text-indigo-200/90">I’m based on Earth 🌍, available for remote or on‑site roles.</p>
                  </div>

                  {/* Aligned GitHub / LinkedIn buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="secondary" className="w-full h-12 inline-flex items-center justify-center gap-2">
                      <a href="https://github.com/your-handle" target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    <Button asChild variant="secondary" className="w-full h-12 inline-flex items-center justify-center gap-2">
                      <a href="https://linkedin.com/in/your-handle" target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Dev tests (console only) */}
          <DevTests />
        </div>
      </div>
    </>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-indigo-200 hover:text-white hover:border-white/20">{children}</a>;
}

function StarsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      <StarsLayer density={0.4} size={2.0} opacity={0.9} />
      <StarsLayer density={0.2} size={2.8} opacity={0.75} />
      <StarsLayer density={0.1} size={3.2} opacity={0.65} />
    </div>
  );
}

function StarsLayer({ density = 0.8, size = 1.2, opacity = 0.6 }: { density?: number; size?: number; opacity?: number }) {
  const count = starCount(density);
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const s = (Math.random() * size + 0.6).toFixed(2);
        const twinkle = (Math.random() * 4 + 2).toFixed(2);
        return <span key={i} className="absolute rounded-full bg-white" style={{ left: `${x}%`, top: `${y}%`, width: `${s}px`, height: `${s}px`, opacity, animation: `twinkle ${twinkle}s ease-in-out infinite` }} />;
      })}
    </div>
  );
}

// Minimal inline dev tests for starCount
function DevTests() {
  React.useEffect(() => {
    const cases: Array<[number, number]> = [
      [0, 0], [1, 400], [0.5, 200], [0.9, 360], [0.25, 100], [0.123, 49], [1.2, 480], [1.75, 700]
    ];
    let failures = 0;
    for (const [d, expected] of cases) {
      const actual = starCount(d);
      if (actual !== expected) {
        failures++;
        console.error(`starCount(${d}) expected ${expected}, got ${actual}`);
      }
    }
    if (failures === 0) console.log("DevTests: starCount cases passed ✅");
  }, []);
  return null;
}

export const StyleTag = () => (
  <style>{`
    @keyframes twinkle { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
    html { scroll-behavior: smooth; }
  `}</style>
);
