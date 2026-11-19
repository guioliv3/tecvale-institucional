import { Link } from "react-router";
import type { ReactNode } from "react";

export function TextLink({
  to,
  children,
  variant = "default",
}: {
  to: string;
  children: ReactNode;
  variant?: "default" | "light";
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex cursor-pointer items-center gap-1.5 pb-1 text-[13px] transition-colors ${variant === "light" ? "text-white hover:text-white/75" : "text-wine hover:text-wine-dark"}`}
    >
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform group-hover:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        fill="none"
        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d="M2.25 9.75 9.5 2.5M3 2.5h6.5V9" stroke="currentColor" strokeWidth="1" />
      </svg>
    </Link>
  );
}
