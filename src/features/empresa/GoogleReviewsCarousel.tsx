import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const googleMapsUrl =
  "https://www.google.com/maps/place/TECVALE+construtora+e+incorporadora+ltda/@-23.2160234,-45.9096423,15z/data=!4m6!3m5!1s0x94cc35827828a4b1:0x60c9f26c35520429!8m2!3d-23.2160234!4d-45.9096423!16s%2Fg%2F11f2wcgg08";

const reviews = [
  {
    author: "Ana Letícia",
    quote: "Entrega no prazo e exatamente do jeito que prometeu.",
  },
  {
    author: "Anderson Nunes",
    quote: "Tudo tem superado as expectativas.",
  },
  {
    author: "Institucional ACEMT",
    quote: "Parceria e apoio às nossas iniciativas sociais.",
  },
];

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return direction === "previous" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M5 12h14m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Stars({ muted = false }: { muted?: boolean }) {
  return (
    <span
      role="img"
      aria-label="5 de 5 estrelas"
      className={`text-lg leading-none ${muted ? "text-wine" : "text-page"}`}
    >
      ★★★★★
    </span>
  );
}

export function GoogleReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const previous = reviews[(activeIndex - 1 + reviews.length) % reviews.length];
  const active = reviews[activeIndex];
  const next = reviews[(activeIndex + 1) % reviews.length];

  const move = (direction: -1 | 1) => {
    setActiveIndex((index) => (index + direction + reviews.length) % reviews.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointerStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const startX = pointerStartX.current;
    pointerStartX.current = null;
    if (startX === null) return;

    const distance = event.clientX - startX;
    if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
  };

  return (
    <div className="mt-8" onKeyDown={handleKeyDown}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-4">
            <span className="font-sans text-4xl font-light leading-none tracking-[-0.05em] text-wine md:text-5xl">
              5,0
            </span>
            <Stars muted />
          </div>
          <p className="mt-2 text-xs tracking-[0.08em] text-muted">77 avaliações no Google</p>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="border-b border-wine pb-1 text-sm text-wine transition-colors hover:text-wine-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
        >
          Ver avaliações no Google ↗
        </a>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Depoimento anterior"
          className="absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-ink/25 bg-page transition-colors hover:border-wine hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
        >
          <ArrowIcon direction="previous" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Próximo depoimento"
          className="absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-ink/25 bg-page transition-colors hover:border-wine hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
        >
          <ArrowIcon direction="next" />
        </button>
        <div
          role="region"
          aria-label="Depoimentos de clientes no Google"
          aria-roledescription="carrossel"
          className="grid items-stretch gap-3 px-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] md:gap-5"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}
        >
          {[previous, active, next].map((review, index) => {
            const isActive = index === 1;

            return (
              <article
                key={review.author}
                aria-hidden={!isActive}
                aria-live={isActive ? "polite" : undefined}
                className={`flex min-h-72 flex-col justify-between p-6 transition-[opacity,transform] duration-500 md:min-h-80 md:p-7 ${
                  isActive
                    ? "trajectory-slide bg-wine text-page"
                    : "hidden bg-surface/50 text-ink/65 md:flex md:opacity-60"
                }`}
              >
                <div>
                  <div className="mb-7 flex items-center justify-between gap-3">
                    <span className="text-xs tracking-[0.08em] opacity-75">Google</span>
                    <Stars muted={!isActive} />
                  </div>
                  <blockquote className="font-serif text-xl italic leading-snug md:text-2xl">
                    “{review.quote}”
                  </blockquote>
                </div>
                <div className="mt-8">
                  <p className="truncate text-sm font-medium">
                    <span aria-hidden="true">— </span>
                    {review.author}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
