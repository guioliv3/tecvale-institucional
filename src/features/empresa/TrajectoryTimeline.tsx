import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/empreendimentos";

const milestones = [
  { year: "2009", detail: "Julho", name: "Mirante do Vale", image: "concreto.jpg" },
  {
    year: "2012",
    detail: "Agosto",
    name: "Condomínio Mirante do Vale",
    image: "fachada-1.jpg",
  },
  { year: "2014", detail: "Setembro", name: "Residencial Johanna", image: "casa-1.jpg" },
  { year: "2017", detail: "Setembro", name: "Maison Soraya", image: "sala-1.jpg" },
  {
    year: "2019",
    detail: "Maio",
    name: "Residencial Antonio de Vimioso",
    image: "casa-2.jpg",
  },
  {
    year: "2021",
    detail: "Agosto",
    name: "Green Life Villa Branca",
    image: "fachada-1.jpg",
  },
  { year: "2023", detail: "Outubro", name: "Believe Residence", image: "ares.jpg" },
  {
    year: "Em obras",
    detail: "Em andamento",
    name: "Neori Residence",
    image: "neori.jpg",
    current: true,
  },
  {
    year: "Em obras",
    detail: "Em andamento",
    name: "Noah Residence",
    image: "noah.jpg",
    current: true,
  },
  {
    year: "Em obras",
    detail: "Em andamento",
    name: "Ares Aquarius",
    image: "ares.jpg",
    current: true,
  },
];

export function TrajectoryTimeline() {
  const timeline = useRef<HTMLDivElement>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressOffset, setProgressOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateTimeline = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const container = timeline.current;
        if (!container) return;

        const fixedPoint = window.innerHeight / 2;
        const containerRect = container.getBoundingClientRect();
        setProgressOffset(
          Math.max(0, Math.min(containerRect.height, fixedPoint - containerRect.top)),
        );

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        steps.current.forEach((step, index) => {
          if (!step) return;
          const rect = step.getBoundingClientRect();
          if (rect.top <= fixedPoint && rect.bottom >= fixedPoint) {
            closestIndex = index;
            closestDistance = 0;
            return;
          }

          const distance = Math.abs(rect.top + rect.height / 2 - fixedPoint);
          if (distance < closestDistance) {
            closestIndex = index;
            closestDistance = distance;
          }
        });
        setActiveIndex(closestIndex);
      });
    };

    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
    };
  }, []);

  const goToStep = (index: number) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    steps.current[index]?.scrollIntoView({ behavior, block: "center" });
  };

  return (
    <div className="mt-8">
      <div ref={timeline} className="relative mx-6 md:mx-10 lg:mx-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-ink/15 lg:left-1/2"
        >
          <div
            className="absolute left-0 top-0 w-full bg-wine"
            style={{ height: `${progressOffset}px` }}
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine ring-4 ring-page lg:left-1/2"
          style={{ top: `${progressOffset}px` }}
        />
        <ol>
          {milestones.map((milestone, index) => (
            <li
              key={`${milestone.year}-${milestone.name}`}
              ref={(element) => {
                steps.current[index] = element;
              }}
              data-step={index}
              className="relative grid min-h-[72svh] grid-cols-1 content-center gap-6 py-10 pl-5 lg:min-h-[64svh] lg:grid-cols-2 lg:items-center lg:gap-0 lg:pl-0"
            >
              {index % 2 === 0 ? (
                <>
                  <div className="order-2 lg:order-1 lg:pr-10">
                    <Photo
                      photo={{
                        src: img(milestone.image),
                        alt: `Imagem ilustrativa de arquitetura para ${milestone.name}`,
                      }}
                      className="aspect-[16/10]"
                    />
                  </div>
                  <div className="order-1 lg:order-2 lg:pl-10">
                    <StepButton
                      milestone={milestone}
                      active={activeIndex === index}
                      onClick={() => goToStep(index)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 lg:order-1 lg:pr-10">
                    <StepButton
                      milestone={milestone}
                      active={activeIndex === index}
                      onClick={() => goToStep(index)}
                    />
                  </div>
                  <div className="order-2 lg:order-2 lg:pl-10">
                    <Photo
                      photo={{
                        src: img(milestone.image),
                        alt: `Imagem ilustrativa de arquitetura para ${milestone.name}`,
                      }}
                      className="aspect-[16/10]"
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StepButton({
  milestone,
  active,
  onClick,
}: {
  milestone: (typeof milestones)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "step" : undefined}
      onClick={onClick}
      className="group text-left"
    >
      <span className="block font-serif text-2xl leading-tight text-wine md:text-3xl">
        {milestone.current ? milestone.detail : `${milestone.detail} de ${milestone.year}`}
      </span>
      <span
        className={`mt-3 block font-serif text-3xl leading-tight transition-colors md:text-4xl ${active ? "text-wine" : "text-ink group-hover:text-wine"}`}
      >
        {milestone.name}
      </span>
    </button>
  );
}
