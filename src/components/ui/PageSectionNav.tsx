export type PageSection = {
  id: string;
  label: string;
};

export function PageSectionNav({
  title,
  sections,
  visible,
}: {
  title: string;
  sections: PageSection[];
  visible: boolean;
}) {
  return (
    <aside
      aria-hidden={!visible}
      className={`min-w-0 transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none ${visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}
    >
      <p className="mb-4 text-[10px] uppercase tracking-[0.12em] text-muted">{title}</p>
      <nav
        aria-label={`Nesta página: ${title}`}
        className="-mx-4 min-w-0 overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-3 md:w-auto md:flex-col md:gap-0">
          {sections.map(({ id, label }) => (
            <li key={id} className="shrink-0 md:shrink">
              <a
                href={`#${id}`}
                className="group inline-flex min-h-11 cursor-pointer items-center py-2 text-xs text-muted transition-colors hover:text-ink"
              >
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-wine after:transition-transform group-hover:after:scale-x-100">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
