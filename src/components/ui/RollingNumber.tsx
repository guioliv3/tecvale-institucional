import { useEffect, useRef, useState } from "react";

export function RollingNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const formattedValue = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 }).format(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span className="sr-only">
        {formattedValue}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" className="inline-flex tabular-nums">
        {Array.from(formattedValue).map((character, index) => {
          if (!/\d/.test(character)) return <span key={`${character}-${index}`}>{character}</span>;

          return (
            <span
              key={`${character}-${index}`}
              className="relative inline-block h-[1em] w-[0.56em] overflow-hidden align-top"
            >
              <span
                className="absolute left-0 top-0 flex flex-col transition-transform duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  transform: `translateY(-${started ? Number(character) : 0}em)`,
                }}
              >
                {Array.from({ length: 10 }, (_, digit) => (
                  <span key={digit} className="flex h-[1em] shrink-0 items-center leading-none">
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
        {suffix && <span className="ml-1 align-top text-[0.46em] leading-none">{suffix}</span>}
      </span>
    </>
  );
}
