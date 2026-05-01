import { useEffect, useState, FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IntroOverlay } from "@/components/sensori/IntroOverlay";
import { CursorTrail } from "@/components/sensori/CursorTrail";
import { ParticleField } from "@/components/sensori/ParticleField";
import { CountUp } from "@/components/sensori/CountUp";
import { PhonePreview } from "@/components/sensori/PhonePreview";
import { TiltCard } from "@/components/sensori/TiltCard";
import { useReveal } from "@/components/sensori/useReveal";

const TICKER_ITEMS = [
  "voice first", "no photos", "no filters", "values over visuals",
  "consent based reveal", "private by design", "real connection",
  "meet from the inside out",
];

const STEPS = [
  { n: "01", title: "Build a voice profile", body: "Record a voice intro. Add your interests, favorite places, and a written bio. No photo. Not yet." },
  { n: "02", title: "Match on what matters", body: "Our compatibility engine pairs you on values, curiosity, and shared interests — not aesthetics." },
  { n: "03", title: "Talk first, in private", body: "In-app voice calls and chat. No phone numbers. No socials. Everything stays inside Sensori." },
  { n: "04", title: "The Reveal", body: "When you both feel ready, send a Reveal Request. Only when it's mutual does a photo or video unlock." },
  { n: "05", title: "Define & meet IRL", body: "Romantic, friendship, or undefined — you decide what this is. Then plan your first meetup, together." },
];

const FEATURES = [
  { icon: "◐", title: "Voice-First Profiles", body: "A 30-second intro tells more than a hundred photos ever could." },
  { icon: "◇", title: "Private by Default", body: "No phone numbers. No social handles. No leaks. Ever." },
  { icon: "◈", title: "Compatibility Engine", body: "Matched on values, communication style, and the things you actually care about." },
  { icon: "◉", title: "Mutual Reveal", body: "Photos and video unlock only when both of you say yes. Consent first, always." },
  { icon: "❍", title: "Open Connection Types", body: "Romantic, platonic, or undefined. You name what this becomes." },
  { icon: "◊", title: "IRL, On Your Terms", body: "Plan your first meeting inside the app. Safer, simpler, intentional." },
];

const COMPARE = [
  ["Photo-first profiles", false, true, true],
  ["Voice intro required", true, false, false],
  ["Match on values & compatibility", true, false, false],
  ["Mutual consent reveal", true, false, false],
  ["Private in-app voice calls", true, false, false],
  ["Phone numbers stay hidden", true, false, false],
  ["Friendship & undefined modes", true, false, false],
];

export const Route = createFileRoute("/")({
  component: SensoriLanding,
});

function SensoriLanding() {
  const [showIntro, setShowIntro] = useState(true);

  // Persist past intro across the session for nicer UX
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("sensori-entered") === "1") {
      setShowIntro(false);
    }
  }, []);

  const handleEnter = () => {
    if (typeof window !== "undefined") sessionStorage.setItem("sensori-entered", "1");
    setShowIntro(false);
  };

  useReveal(showIntro);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--ink-deep)] text-[var(--cream)] grain">
      <CursorTrail />
      {showIntro && <IntroOverlay onEnter={handleEnter} />}

      {!showIntro && (
        <>
          <Nav />
          <Hero />
          <Ticker />
          <Stats />
          <HowItWorks />
          <Features />
          <Comparison />
          <Editorial />
          <Waitlist />
          <Footer />
        </>
      )}
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 backdrop-blur-md sm:px-10">
      <div className="font-serif text-2xl tracking-wide">Sensori</div>
      <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] text-[var(--cream-muted)] md:flex">
        <a href="#how" className="hover:text-[var(--gold-bright)] transition-colors">How it works</a>
        <a href="#features" className="hover:text-[var(--gold-bright)] transition-colors">Features</a>
        <a href="#editorial" className="hover:text-[var(--gold-bright)] transition-colors">The Reveal</a>
      </nav>
      <a
        href="#waitlist"
        className="border-gold-soft rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-[var(--gold-pale)] transition-all hover:bg-[var(--gold)]/10 hover:shadow-[var(--shadow-gold)]"
      >
        Join Waitlist
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      {/* Parallax orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[560px] rounded-full animate-float-orb"
        style={{ background: "var(--gradient-emerald)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-[480px] w-[480px] rounded-full animate-float-orb"
        style={{ background: "var(--gradient-gold)", animationDelay: "-6s" }}
      />
      <ParticleField density={70} />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-[var(--gold-bright)]/80 animate-fade-up">
          ⌁ voice-first connection
        </p>
        <h1
          className="font-serif text-7xl font-light leading-[0.95] sm:text-8xl md:text-[10rem] animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Sensori<span className="text-gradient-gold">.</span>
        </h1>
        <p
          className="mt-8 font-serif text-2xl italic text-[var(--cream)]/85 sm:text-3xl animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Meet from the inside out.
        </p>
        <p
          className="mx-auto mt-6 max-w-xl text-sm text-[var(--cream-muted)] sm:text-base animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          A dating app where you connect before you see each other. Voice. Values. Then, only when you're ready — the reveal.
        </p>
        <div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <a
            href="#waitlist"
            className="border-gold-soft inline-flex items-center gap-3 rounded-full bg-[var(--gold)]/5 px-9 py-4 text-xs uppercase tracking-[0.3em] text-[var(--gold-pale)] transition-all hover:bg-[var(--gold)]/15 hover:shadow-[var(--shadow-gold)] hover:tracking-[0.4em]"
          >
            Join the Waitlist <span>→</span>
          </a>
          <a
            href="#how"
            className="text-xs uppercase tracking-[0.3em] text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors"
          >
            How it works
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[var(--cream-muted)]/70">
        scroll ↓
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-[var(--gold)]/20 bg-[var(--emerald-deep)] py-5">
      <div className="flex w-max animate-ticker gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-serif italic text-lg text-[var(--gold-pale)]">
            {t}
            <span className="text-[var(--gold-bright)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { to: 87, suffix: "%", label: "say voice reveals more than photos" },
    { to: 12000, suffix: "+", label: "on the early waitlist" },
    { to: 3, suffix: "×", label: "longer first conversations" },
    { to: 0, suffix: "", label: "phone numbers shared, ever" },
  ];
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="text-5xl font-light sm:text-6xl">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[var(--cream-muted)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-20 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[var(--gold-bright)]/80">The Process</p>
          <h2 className="font-serif text-5xl font-light sm:text-6xl">How it works.</h2>
          <p className="mx-auto mt-5 max-w-lg text-[var(--cream-muted)]">
            Five quiet steps from a voice in the dark to a person you actually know.
          </p>
        </div>

        <div className="space-y-2">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="reveal group grid grid-cols-[auto_1fr] items-start gap-8 border-t border-[var(--gold)]/15 py-10 md:grid-cols-[120px_1fr_auto] md:gap-12"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-serif text-5xl font-light text-[var(--emerald-glow)] transition-colors duration-500 group-hover:text-[var(--gold-bright)] md:text-6xl">
                {s.n}
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-[var(--cream-muted)]">{s.body}</p>
              </div>
              <div className="hidden text-[var(--gold)]/40 md:block">
                <span className="font-serif italic">step {s.n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-16 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[var(--gold-bright)]/80">Features</p>
          <h2 className="font-serif text-5xl font-light sm:text-6xl">
            Designed for <em className="italic text-gradient-gold">real</em> connection.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <TiltCard key={f.title} className="reveal" >
              <div
                className="glass-card h-full rounded-2xl p-8 transition-shadow duration-500 hover:shadow-[var(--shadow-card)]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-6 text-3xl text-[var(--gold-bright)]">{f.icon}</div>
                <h3 className="font-serif text-2xl">{f.title}</h3>
                <p className="mt-3 text-[var(--cream-muted)]">{f.body}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const cols = ["Sensori", "Photo apps", "Swipe apps"];
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-12 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[var(--gold-bright)]/80">A different kind</p>
          <h2 className="font-serif text-5xl font-light sm:text-6xl">Sensori vs the rest.</h2>
        </div>

        <div className="reveal overflow-hidden rounded-2xl border border-[var(--gold)]/20">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-[var(--emerald-deep)]/60 text-xs uppercase tracking-[0.2em] text-[var(--gold-pale)]">
            <div className="p-5"></div>
            {cols.map((c, i) => (
              <div key={c} className={`p-5 text-center font-serif text-base normal-case tracking-normal ${i === 0 ? "text-gradient-gold" : "text-[var(--cream)]/80"}`}>
                {c}
              </div>
            ))}
          </div>
          {COMPARE.map(([label, a, b, c], i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-[var(--gold)]/10 transition-colors hover:bg-[var(--emerald-deep)]/20"
            >
              <div className="p-5 text-sm text-[var(--cream)]/85">{label as string}</div>
              <Cell on={a as boolean} highlight />
              <Cell on={b as boolean} />
              <Cell on={c as boolean} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ on, highlight = false }: { on: boolean; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-center p-5 ${highlight ? "bg-[var(--emerald-deep)]/30" : ""}`}>
      {on ? (
        <span className="font-serif text-xl text-[var(--gold-bright)]">✦</span>
      ) : (
        <span className="text-[var(--cream-muted)]/40">—</span>
      )}
    </div>
  );
}

function Editorial() {
  const stages = [
    { label: "Hear them", body: "Voice is intimate. The pause before a sentence. The way they laugh. You'll know more in three minutes than three hundred photos." },
    { label: "Know them", body: "Talk for hours. Share favorite places. Build something honest before there's anything to perform." },
    { label: "See them", body: "When — and only when — you both decide. The reveal is mutual, deliberate, earned." },
  ];
  return (
    <section id="editorial" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full" style={{ background: "var(--gradient-emerald)" }} />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full" style={{ background: "var(--gradient-gold)" }} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="reveal font-serif text-6xl font-light leading-tight sm:text-7xl md:text-8xl">
          Is love really
          <br />
          <em className="italic text-gradient-gold">blind?</em>
        </h2>
        <p className="reveal mx-auto mt-8 max-w-xl font-serif text-xl italic text-[var(--cream)]/80">
          We don't think so. We think it's just been distracted.
        </p>

        <div className="mt-24 grid gap-10 md:grid-cols-3">
          {stages.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="mb-4 font-serif text-xs uppercase tracking-[0.4em] text-[var(--gold-bright)]">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </div>
              <p className="font-serif text-lg text-[var(--cream)]/85 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.4em] text-[var(--cream-muted)]">
          <span>Hear</span>
          <span className="text-[var(--gold-bright)]">→</span>
          <span>Know</span>
          <span className="text-[var(--gold-bright)]">→</span>
          <span className="text-gradient-gold">See</span>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative px-6 py-32">
      <div className="reveal mx-auto max-w-3xl rounded-3xl border border-[var(--gold)]/25 bg-gradient-to-br from-[var(--emerald-deep)]/40 to-[var(--ink-card)] p-10 text-center sm:p-16 glow-emerald">
        <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[var(--gold-bright)]/80">Early Access</p>
        <h2 className="font-serif text-5xl font-light sm:text-6xl">
          Be among the <em className="italic text-gradient-gold">first</em> to listen.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[var(--cream-muted)]">
          Join the waitlist. You'll be the first invited when Sensori opens.
        </p>

        {submitted ? (
          <div className="mt-10 font-serif text-2xl italic text-[var(--gold-pale)]">
            ✦ You're on the list. We'll be in touch.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-[var(--gold)]/30 bg-[var(--ink-deep)]/60 px-6 py-4 text-sm text-[var(--cream)] placeholder:text-[var(--cream-muted)]/60 outline-none transition-colors focus:border-[var(--gold-bright)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--gold)] px-8 py-4 text-xs uppercase tracking-[0.3em] text-[var(--ink-deep)] transition-all hover:bg-[var(--gold-bright)] hover:shadow-[var(--shadow-gold)]"
            >
              Join
            </button>
          </form>
        )}

        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[var(--cream-muted)]/60">
          No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-[var(--cream-muted)] sm:flex-row">
        <div className="font-serif text-xl normal-case tracking-normal text-[var(--cream)]">
          Sensori
        </div>
        <div className="font-serif italic normal-case tracking-wide">
          Meet from the inside out.
        </div>
        <div>© {new Date().getFullYear()} Sensori</div>
      </div>
    </footer>
  );
}
