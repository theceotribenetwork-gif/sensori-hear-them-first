import { useEffect } from "react";

export function useReveal(trigger: unknown = null) {
  useEffect(() => {
    // Defer to next frame so conditionally-rendered children are in the DOM
    const raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
      );
      els.forEach((el) => io.observe(el));
      // Store on window for cleanup
      (window as unknown as { __sensoriIO?: IntersectionObserver }).__sensoriIO = io;
    });
    return () => {
      cancelAnimationFrame(raf);
      const io = (window as unknown as { __sensoriIO?: IntersectionObserver }).__sensoriIO;
      io?.disconnect();
    };
  }, [trigger]);
}

export function useCountUp(target: number, trigger: boolean, duration = 1800) {
  return { target, duration, trigger };
}
