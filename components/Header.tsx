"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-green-950/95 shadow-lg shadow-black/10 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Logo light />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-green-950 transition hover:bg-white"
          >
            Book a Slot
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-green-950 md:hidden ${
          open ? "block animate-fade-in" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="mt-2 rounded-full bg-green-500 px-4 py-3 text-center text-base font-semibold text-green-950"
            onClick={() => setOpen(false)}
          >
            Book a Slot
          </a>
        </nav>
      </div>
    </header>
  );
}
