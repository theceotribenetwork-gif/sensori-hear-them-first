import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.floor(eased * to));
              if (p < 1) requestAnimationFrame(tick);
              else setN(to);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="text-gradient-gold font-serif">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
