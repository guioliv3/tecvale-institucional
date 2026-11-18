import { Link } from "react-router";
import { getEmpreendimento } from "@/content/empreendimentos";
import { ProvisionalTag } from "@/components/ui/ProvisionalTag";

const cover = getEmpreendimento("ares-aquarius")!.cover;

export function SobreHero() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] bg-page pb-0">
      <div className="on-dark relative h-[calc(100svh-5rem-1rem)] min-h-[560px] overflow-hidden bg-ink text-white md:h-[calc(100svh-5rem-2rem)]">
        <img
          src={cover.src}
          alt={cover.alt}
          className="absolute inset-0 h-full w-full object-cover brightness-[.72]"
          fetchPriority="high"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <ProvisionalTag className="absolute left-4 top-4 md:left-6 md:top-6" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-white/80">A Tecvale</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.02] md:text-6xl">
            Uma história feita de escolhas que permanecem.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            Conheça as pessoas, os compromissos e os lugares que dão forma à nossa trajetória.
          </p>
          <Link
            to="#historia"
            className="mt-6 inline-flex h-10 items-center border border-white px-4 text-xs uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-ink"
          >
            Conheça a Tecvale{" "}
            <span aria-hidden="true" className="ml-5">
              ↓
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
