"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type NavLink = { label: string; href: string };

type NavProps = {
  logo: { mark: string; wordmark: string };
  links: NavLink[];
  cta: { label: string; href: string };
};

export function Nav({ logo, links, cta }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links
      .map((l) => l.href)
      .filter((h) => h.startsWith("#"))
      .map((h) => h.slice(1));
    if (!ids.length) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border-subtle/80 bg-navy-900/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${logo.mark} — Proof of Launch home`}
        >
          <span
            className="hex-clip flex h-9 w-9 items-center justify-center bg-teal text-[11px] font-display font-black tracking-tightest text-navy-900 transition-colors group-hover:bg-teal-bright"
            aria-hidden="true"
          >
            {logo.mark}
          </span>
          <span
            className="hidden text-sm font-display font-bold tracking-eyebrow text-ink sm:inline-block"
            dangerouslySetInnerHTML={{ __html: logo.wordmark }}
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 font-mono text-[12px] uppercase tracking-eyebrow transition-colors",
                  isActive
                    ? "text-teal"
                    : "text-muted-2 hover:text-ink",
                )}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={cta.href}
            className="bracket-clip ml-3 inline-flex h-10 items-center bg-teal px-6 font-mono text-[12px] uppercase tracking-eyebrow text-navy-900 transition-colors hover:bg-teal-bright"
          >
            {cta.label}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-border-visible text-ink md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-px bg-current transition-transform",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-current transition-transform",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden",
          "overflow-hidden border-t border-border-subtle bg-navy-900/95 backdrop-blur-md transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="flex flex-col gap-1 px-5 py-4"
          aria-label="Mobile primary"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-3 py-3 font-mono text-[12px] uppercase tracking-eyebrow text-muted-2 hover:bg-navy-700 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="bracket-clip mt-3 inline-flex h-12 items-center justify-center bg-teal px-6 font-mono text-[12px] uppercase tracking-eyebrow text-navy-900"
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
