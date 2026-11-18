import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type TimelineBlockProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function TimelineBlock({ id, eyebrow, title, children }: TimelineBlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <header className="py-10 md:py-16 lg:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={`${id}-title`} className="mt-4 text-3xl md:text-5xl">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
