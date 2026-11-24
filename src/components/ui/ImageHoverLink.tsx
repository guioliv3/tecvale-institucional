import { useRef } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";

export function ImageHoverLink({
  to,
  children,
  label = "Ver mais",
}: {
  to: string;
  children: ReactNode;
  label?: string;
}) {
  const cursor = useRef<HTMLSpanElement>(null);

  return (
    <Link
      to={to}
      draggable={false}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !cursor.current) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        cursor.current.style.left = `${event.clientX - bounds.left}px`;
        cursor.current.style.top = `${event.clientY - bounds.top}px`;
      }}
      className="group/image-hover relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine [@media(hover:hover)]:cursor-none"
    >
      {children}
      <span
        ref={cursor}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-wine text-white opacity-0 transition-opacity duration-150 [@media(hover:hover)]:group-hover/image-hover:opacity-100 group-focus-visible/image-hover:opacity-100 motion-reduce:transition-none"
      >
        <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide">
          {label}
          <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="h-3 w-3">
            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
