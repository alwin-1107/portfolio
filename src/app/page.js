"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  Download,
  GraduationCap,
  Award,
  BadgeCheck,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ============================== CONSTANTS ============================== */

const RESUME_PROPS = {
  href: "https://drive.google.com/file/d/11fuYopoBvlOAHig946B5cqDHrBbP28uz/view?usp=drive_link",
  target: "_blank",
  rel: "noreferrer",
};

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const TAGLINES = [
  "Building & testing things that see",
  "ML + QA Automation + WebAR",
  "B.E. IT @ FCRIT, Mumbai '26",
];

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/alwin-1107", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/alwin-mathew", label: "LinkedIn" },
  { icon: Mail, href: "mailto:alwinmathew1107@gmail.com", label: "Email" },
];

const SKILLS = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"] },
  { label: "QA & Testing", items: ["Selenium WebDriver", "PyTest", "Postman", "JUnit", "CI/CD"] },
  { label: "ML / Data", items: ["TensorFlow", "scikit-learn", "OpenCV", "Pandas", "NumPy"] },
  { label: "Cloud / Web", items: ["Flask", "Three.js", "AWS", "MongoDB"] },
  { label: "Core", items: ["Git", "Docker", "TDD", "DSA", "OOP"] },
];

const PROJECTS = [
  {
    name: "RoomScan",
    subtitle: "Distributed WebAR & Image Pipeline",
    date: "Jan 2026",
    stack: ["Python", "Flask", "YOLOv8", "PyTest"],
    blurb: "Concurrent ThreadPoolExecutor backend with automated testing built in for high uptime.",
    github: "https://github.com/alwin-1107/roomscan",
    demo: "https://roomscan.onrender.com/",
  },
  {
    name: "Scenery Classification App",
    subtitle: "Custom CNN",
    date: "Oct 2025",
    stack: ["Python", "TensorFlow"],
    blurb: "81% accuracy on a 25k-image dataset using a purpose-built convolutional network.",
    github: "https://github.com/alwin-1107/scenery-classification-app",
    demo: "https://scenery-classifier.streamlit.app/",
  },
  {
    name: "Cardiac Risk Ensemble App",
    subtitle: "ML Prediction",
    date: "Sep 2025",
    stack: ["Scikit-learn", "Pandas"],
    blurb: "Stacking classifier engineered with careful attention to avoiding test-data leakage.",
    github: "https://github.com/alwin-1107/cardiac-risk-ensemble-app",
    demo: "https://cardiac-risk-ensemble.streamlit.app/",
  },
  {
    name: "Movie Sentiment App",
    subtitle: "NLP Analyzer",
    date: "Jan 2025",
    stack: ["DistilBERT", "TF-IDF", "AWS EC2"],
    blurb: "Automated data-cleaning pipeline feeding a transformer-based sentiment classifier.",
    github: "https://github.com/alwin-1107/movie-sentiment-app",
    demo: "https://movie-sentiment-classifier.streamlit.app/",
  },
];

const EDUCATION = [
  {
    icon: GraduationCap,
    title: "B.E. Information Technology",
    org: "Fr. C. Rodrigues Institute of Technology, Vashi",
    period: "2022 — 2026",
  },
  {
    icon: Award,
    title: "AWS Cloud Practitioner",
    org: "Amazon Web Services",
    period: "In progress",
  },
  {
    icon: BadgeCheck,
    title: "Software Testing & QA Fundamentals",
    org: "Coursework & applied practice",
    period: "Completed",
  },
];

const COLORS = {
  bg0: "#0f2027",
  bg1: "#203a43",
  bg2: "#2c5364",
  accent: "#58A6FF",
  accentSoft: "rgba(88,166,255,0.14)",
  card: "rgba(6,10,13,0.55)",
};

/* ============================== HOOKS ============================== */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ============================== SMALL PARTS ============================== */

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionTag({ children }) {
  return (
    <span
      className="font-mono text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full"
      style={{ color: COLORS.accent, background: COLORS.accentSoft, border: "1px solid rgba(88,166,255,0.3)" }}
    >
      {children}
    </span>
  );
}

function TimelineLine() {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 bottom-0 w-px origin-top"
      style={{
        background: "linear-gradient(to bottom, rgba(88,166,255,0.7), rgba(88,166,255,0.05))",
        transform: inView ? "scaleY(1)" : "scaleY(0)",
        transition: "transform 1.1s cubic-bezier(.2,.7,.2,1)",
      }}
    />
  );
}

/* ============================== PAGE ============================== */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTaglineIdx((i) => (i + 1) % TAGLINES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText("alwinmathew1107@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen w-full relative font-sans"
      style={{
        background: `linear-gradient(135deg, ${COLORS.bg0} 0%, ${COLORS.bg1} 50%, ${COLORS.bg2} 100%)`,
        color: "#E6EDF3",
      }}
    >
      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) rotate(0deg);} 50% { transform: translate(14px,-18px) rotate(6deg);} }
        @keyframes float2 { 0%,100% { transform: translate(0,0) rotate(0deg);} 50% { transform: translate(-16px,16px) rotate(-8deg);} }
        @keyframes fadeSlide { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform: translateY(0);} }
        .tagline-anim { animation: fadeSlide 0.5s ease; }
        .glass-card {
          background: ${COLORS.card};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        .glass-card:hover {
          border-color: rgba(88,166,255,0.55);
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 0 0 1px rgba(88,166,255,0.25), 0 20px 40px -20px rgba(88,166,255,0.35);
        }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        ::selection { background: rgba(88,166,255,0.35); }
      `}</style>

      <div className="grain fixed inset-0 pointer-events-none z-0" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-40 h-40 rounded-full opacity-20"
          style={{ top: "12%", left: "8%", border: `1px solid ${COLORS.accent}`, animation: "float1 9s ease-in-out infinite" }}
        />
        <div
          className="absolute w-24 h-24 opacity-20"
          style={{ top: "60%", right: "10%", border: `1px solid ${COLORS.accent}`, animation: "float2 11s ease-in-out infinite" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full opacity-60"
          style={{ top: "30%", right: "22%", background: COLORS.accent, animation: "float1 7s ease-in-out infinite" }}
        />
      </div>

      {/* ===================== NAVBAR ===================== */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,16,20,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-mono text-lg font-bold tracking-tight" style={{ color: COLORS.accent }}>
            &lt;AM/&gt;
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-gray-400 hover:text-white transition-colors">
                <s.icon size={18} />
              </a>
            ))}
            <a
              {...RESUME_PROPS}
              className="font-mono text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all hover:opacity-90"
              style={{ background: COLORS.accent, color: "#0a1016" }}
            >
              <Download size={14} /> Resume
            </a>
          </div>

          <button className="md:hidden text-gray-200" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(10,16,20,0.95)" }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-sm font-medium text-gray-300 py-1">
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-5 pt-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <s.icon size={18} className="text-gray-300" />
                </a>
              ))}
            </div>
            <a {...RESUME_PROPS} className="font-mono text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 w-fit" style={{ background: COLORS.accent, color: "#0a1016" }}>
              <Download size={14} /> Resume
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* ===================== HERO ===================== */}
        <section id="hero" className="max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40 relative">
          <p className="font-mono text-sm mb-4" style={{ color: COLORS.accent }}>Hi, I'm</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">Alwin Mathew</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-3">
            IT Engineer · Machine Learning · QA Automation · Computer Vision · Cloud
          </p>

          <div className="h-8 mb-8 overflow-hidden">
            <p key={taglineIdx} className="tagline-anim font-mono text-base md:text-lg" style={{ color: COLORS.accent }}>
              {TAGLINES[taglineIdx]}
            </p>
          </div>

          <p className="max-w-2xl text-gray-300 leading-relaxed mb-10">
            Graduate Software Engineer specializing in Python backend development, Machine Learning,
            and QA Automation. Builds concurrent web apps, engineers robust automated testing
            pipelines, and ships ML models to production with zero-defect deployment strategies.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              style={{ background: COLORS.accent, color: "#0a1016" }}
            >
              View Projects <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-lg font-semibold text-sm border transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              Get in Touch
            </button>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <FadeUp><SectionTag>About</SectionTag></FadeUp>
          <FadeUp delay={80}>
            <p className="mt-6 text-2xl md:text-3xl font-medium leading-snug max-w-3xl text-gray-100">
              Graduate Software Engineer who likes making machines see and understand the physical world.
              Builds at the intersection of machine learning, computer vision, and real-time web engineering.
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
              I strongly believe code isn't truly shipped until it's rigorously tested, which is why I
              bridge the gap between raw backend development and bulletproof QA automation.
            </p>
          </FadeUp>
        </section>

        {/* ===================== TECH STACK ===================== */}
        <section id="stack" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <FadeUp><SectionTag>Tech Stack</SectionTag></FadeUp>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((group, gi) => (
              <FadeUp key={group.label} delay={gi * 90}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: COLORS.accent }}>
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-2.5 py-1.5 rounded-md text-gray-300"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ===================== PROJECTS ===================== */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <FadeUp><SectionTag>Projects</SectionTag></FadeUp>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.name} delay={i * 100}>
                <div className="glass-card rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{p.name}</h3>
                      <p className="text-sm text-gray-400">{p.subtitle}</p>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-1 rounded" style={{ background: COLORS.accentSoft, color: COLORS.accent }}>
                      {p.date}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">{p.blurb}</p>

                  <div className="flex flex-wrap gap-x-1.5 gap-y-1 mb-5">
                    {p.stack.map((s, si) => (
                      <span key={s} className="text-[11px] font-mono text-gray-400">
                        {s}{si !== p.stack.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
                      <FaGithub size={15} /> Code
                    </a>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: COLORS.accent }}>
                      <ExternalLink size={15} /> Live demo
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ===================== EDUCATION ===================== */}
        <section id="education" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <FadeUp><SectionTag>Education</SectionTag></FadeUp>

          <div className="mt-12 relative pl-8">
            <TimelineLine />
            <div className="flex flex-col gap-10">
              {EDUCATION.map((e, i) => (
                <FadeUp key={e.title} delay={i * 120}>
                  <div className="relative">
                    <span
                      className="absolute rounded-full"
                      style={{ left: "-2.05rem", top: "0.3rem", width: 12, height: 12, background: COLORS.accent, boxShadow: `0 0 0 4px ${COLORS.accentSoft}` }}
                    />
                    <div className="flex items-center gap-2 mb-1">
                      <e.icon size={16} style={{ color: COLORS.accent }} />
                      <h3 className="font-semibold text-white">{e.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{e.org}</p>
                    <p className="text-xs font-mono text-gray-500 mt-1">{e.period}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FOOTER / CONTACT ===================== */}
        <footer id="contact" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
          <FadeUp><SectionTag>Contact</SectionTag></FadeUp>
          <FadeUp delay={80}>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">Let's build something.</h2>
          </FadeUp>
          <FadeUp delay={140}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-sm glass-card">
                <Mail size={16} style={{ color: COLORS.accent }} />
                alwinmathew1107@gmail.com
                {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} className="text-gray-400" />}
              </button>
              <a {...RESUME_PROPS} className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm" style={{ background: COLORS.accent, color: "#0a1016" }}>
                <Download size={16} /> Resume
              </a>
            </div>
          </FadeUp>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/10">
            <p className="text-xs text-gray-500 font-mono">© 2026 Alwin Mathew. Built and shipped.</p>
            <div className="flex items-center gap-5">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-gray-400 hover:text-white transition-colors">
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
