import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import wordmark from "@/assets/sensori-wordmark.png";

export function IntroOverlay({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (leaving) {
      const t = setTimeout(onEnter, 900);
      return () => clearTimeout(t);
    }
  }, [leaving, onEnter]);

  return (
    <div
      className={`fixed inset-0 z-50 h-screen w-screen overflow-y-auto overflow-x-hidden bg-[var(--ink-deep)] grain transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ height: "100dvh" }}
    >
      {/* Floating orbs — softer, more spacious */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full opacity-70 animate-float-orb"
        style={{ background: "var(--gradient-emerald)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[420px] w-[420px] rounded-full opacity-70 animate-float-orb"
        style={{ background: "var(--gradient-gold)", animationDelay: "-7s" }}
      />

      {/* Subtle particle field — denser on desktop, minimal on mobile */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <ParticleField density={36} />
      </div>
      <div className="pointer-events-none absolute inset-0 sm:hidden opacity-60">
        <ParticleField density={14} />
      </div>

      {/* Logo */}
      <img
        src={wordmark}
        alt="Sensori"
        className="absolute left-6 top-6 h-16 w-auto animate-fade-in sm:left-10 sm:top-10 sm:h-20 md:h-24"
      />

      {/* Center content */}
      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-24 text-center">
        {/* Hairline divider above eyebrow */}
        <div
          className="mb-8 h-px w-16 bg-[var(--gold)]/40 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        />
        <p
          className="mb-6 text-xs uppercase tracking-[0.4em] text-[var(--gold-bright)]/80 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          A new kind of connection
        </p>
        <h1
          className="font-serif text-5xl font-light leading-[1.05] text-[var(--cream)] sm:text-7xl md:text-8xl animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Is love really <em className="italic text-gradient-gold">blind?</em>
        </h1>
        <p
          className="mt-8 max-w-md text-sm text-[var(--cream-muted)] sm:text-base animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          No photos. No filters. No snap judgments. Just voices, values, and what's actually real.
        </p>
        <button
          onClick={() => setLeaving(true)}
          className="group mt-12 inline-flex items-center gap-3 border-gold-soft rounded-full px-9 py-4 text-sm uppercase tracking-[0.3em] text-[var(--gold-pale)] transition-all duration-500 hover:bg-[var(--gold)]/10 hover:tracking-[0.4em] hover:shadow-[var(--shadow-gold)] animate-fade-up"
          style={{ animationDelay: "1.3s" }}
        >
          Let's find out
          <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
        </button>
      </div>

      {/* bottom hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[var(--cream-muted)]/60 animate-fade-in"
        style={{ animationDelay: "2s" }}
      >
        meet from the inside out
      </div>
    </div>
  );
}
