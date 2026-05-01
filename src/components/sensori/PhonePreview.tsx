import { useEffect, useState } from "react";

const SCREENS = ["matches", "call", "reveal"] as const;
type Screen = (typeof SCREENS)[number];

export function PhonePreview() {
  const [active, setActive] = useState<Screen>("matches");

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => SCREENS[(SCREENS.indexOf(prev) + 1) % SCREENS.length]);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full" style={{ perspective: "1800px" }}>
      {/* Soft glow behind phone */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-emerald)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[65%] w-[65%] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />

      {/* Responsive scale wrapper — keeps the 300x620 design intact while scaling down */}
      <div className="phone-scale relative mx-auto" style={{ width: 300, height: 620 }}>
        {/* Phone frame */}
        <div
          className="relative animate-float-phone"
          style={{
            width: 300,
            height: 620,
            transform: "rotateY(-12deg) rotateX(6deg) rotateZ(-2deg)",
            transformStyle: "preserve-3d",
          }}
        >
        {/* Outer gold bezel */}
        <div
          className="absolute inset-0 rounded-[48px] p-[3px]"
          style={{
            background:
              "linear-gradient(145deg, var(--gold-pale), var(--gold) 40%, oklch(0.45 0.08 80) 70%, var(--gold-bright))",
            boxShadow:
              "0 40px 80px -20px oklch(0 0 0 / 0.7), 0 0 60px -10px oklch(0.83 0.13 85 / 0.35), inset 0 0 1px oklch(0.95 0.06 90 / 0.6)",
          }}
        >
          {/* Inner ink screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-[var(--ink-deep)]">
            {/* Notch */}
            <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

            {/* Status bar */}
            <div className="relative z-10 flex items-center justify-between px-7 pt-3 text-[10px] font-medium text-[var(--cream)]/80">
              <span>9:41</span>
              <span className="tracking-widest">✦ ✦ ✦</span>
            </div>

            {/* Screens stack */}
            <div className="relative h-[calc(100%-28px)] w-full">
              <ScreenWrap active={active === "matches"}>
                <MatchesScreen />
              </ScreenWrap>
              <ScreenWrap active={active === "call"}>
                <CallScreen />
              </ScreenWrap>
              <ScreenWrap active={active === "reveal"}>
                <RevealScreen />
              </ScreenWrap>
            </div>
          </div>
        </div>
      </div>

      {/* Screen pager dots */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {SCREENS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            aria-label={`Show ${s} screen`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              active === s
                ? "w-8 bg-[var(--gold-bright)]"
                : "w-3 bg-[var(--cream-muted)]/30 hover:bg-[var(--cream-muted)]/60"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-[var(--cream-muted)]/70">
        {active === "matches" && "Compatibility — voice first"}
        {active === "call" && "Private in-app call"}
        {active === "reveal" && "Mutual reveal"}
      </div>
    </div>
  );
}

function ScreenWrap({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ${
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

/* ============================================================ */
/* Screens                                                      */
/* ============================================================ */

function MatchesScreen() {
  const matches = [
    { name: "Maya", age: 28, score: 94, tag: "Honest · Curious · Quiet" },
    { name: "Theo", age: 31, score: 89, tag: "Slow mornings · Books" },
    { name: "Imani", age: 26, score: 86, tag: "Studio nights · Walks" },
  ];
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-2">
      <div className="mb-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--gold-bright)]/80">
          Today's voices
        </p>
        <h3 className="mt-1 font-serif text-2xl font-light text-[var(--cream)]">
          Matched on <em className="italic text-gradient-gold">values</em>
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {matches.map((m, i) => (
          <div
            key={m.name}
            className="rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--emerald-deep)]/40 to-[var(--ink-card)] p-3"
          >
            <div className="flex items-center gap-3">
              {/* Voice avatar */}
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--ink-deep)]">
                <Waveform small delay={i * 0.3} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-serif text-base text-[var(--cream)]">
                    {m.name}, <span className="text-[var(--cream-muted)]">{m.age}</span>
                  </p>
                  <span className="text-[10px] font-medium tracking-wider text-[var(--gold-bright)]">
                    {m.score}%
                  </span>
                </div>
                <p className="truncate text-[10px] text-[var(--cream-muted)]">{m.tag}</p>
                {/* Compatibility bar */}
                <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-[var(--ink-deep)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${m.score}%`,
                      background:
                        "linear-gradient(90deg, var(--emerald-glow), var(--gold-bright))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[var(--cream-muted)]/60">
        <span>tap</span>
        <span className="text-[var(--gold-bright)]">▶</span>
        <span>to listen</span>
      </div>
    </div>
  );
}

function CallScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-between px-6 pb-8 pt-6">
      <div className="text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--gold-bright)]/80">
          On call · 12:47
        </p>
        <p className="mt-2 font-serif text-2xl font-light text-[var(--cream)]">Maya</p>
        <p className="text-[10px] italic text-[var(--cream-muted)]">private · in-app · encrypted</p>
      </div>

      {/* Two pulsing voice rings */}
      <div className="relative flex h-40 w-full items-center justify-center">
        <PulseRing color="emerald" />
        <PulseRing color="gold" offsetX={70} delay={0.7} />
      </div>

      <div className="w-full">
        <div className="mb-5 flex items-center justify-center gap-1">
          <Waveform />
        </div>
        <div className="flex items-center justify-center gap-5">
          <CallBtn icon="◐" />
          <CallBtn icon="✕" big />
          <CallBtn icon="◑" />
        </div>
      </div>
    </div>
  );
}

function RevealScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-between px-6 pb-8 pt-6">
      <div className="text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--gold-bright)]/80">
          The Reveal
        </p>
        <p className="mt-2 font-serif text-xl font-light italic text-[var(--cream)]">
          You both said yes.
        </p>
      </div>

      {/* Blurred-to-clear silhouette */}
      <div className="relative h-52 w-44 overflow-hidden rounded-3xl border border-[var(--gold)]/40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, oklch(0.56 0.14 160 / 0.5), oklch(0.10 0.005 160) 70%)",
          }}
        />
        {/* Silhouette */}
        <div
          className="absolute inset-0 animate-reveal-blur"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 38% 26% at 50% 32%, oklch(0.55 0.04 80) 0%, transparent 100%), radial-gradient(ellipse 55% 38% at 50% 78%, oklch(0.50 0.04 80) 0%, transparent 100%)",
          }}
        />
        {/* Sparkle */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif text-3xl text-[var(--gold-bright)] animate-pulse-glow">
          ✦
        </div>
        {/* Lock bar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--gold)]/50 bg-[var(--ink-deep)]/70 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[var(--gold-pale)] backdrop-blur">
          unlocking
        </div>
      </div>

      <div className="w-full">
        <div className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--emerald-deep)]/30 p-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-bright)]">
            Mutual ✦ consent
          </p>
          <p className="mt-1 font-serif text-sm italic text-[var(--cream)]/85">
            "Earned, not entitled."
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Bits                                                         */
/* ============================================================ */

function Waveform({ small = false, delay = 0 }: { small?: boolean; delay?: number }) {
  const bars = small ? 7 : 14;
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="block w-[2px] rounded-full bg-[var(--gold-bright)] animate-wave"
          style={{
            height: small ? 10 : 22,
            animationDelay: `${delay + i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function PulseRing({
  color,
  offsetX = 0,
  delay = 0,
}: {
  color: "emerald" | "gold";
  offsetX?: number;
  delay?: number;
}) {
  const c = color === "emerald" ? "var(--emerald-glow)" : "var(--gold-bright)";
  return (
    <div
      className="absolute h-24 w-24 rounded-full"
      style={{
        transform: `translateX(${offsetX - 35}px)`,
        background: `radial-gradient(circle, ${c} 0%, transparent 65%)`,
        animation: `pulse-glow 2.4s ease-in-out ${delay}s infinite`,
        opacity: 0.65,
      }}
    />
  );
}

function CallBtn({ icon, big = false }: { icon: string; big?: boolean }) {
  const size = big ? "h-12 w-12" : "h-10 w-10";
  const bg = big ? "bg-[var(--gold)] text-[var(--ink-deep)]" : "bg-[var(--ink-card)] text-[var(--cream)] border border-[var(--gold)]/30";
  return (
    <div className={`flex ${size} items-center justify-center rounded-full ${bg} text-base`}>
      {icon}
    </div>
  );
}
