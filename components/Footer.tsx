import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/data";

const SOCIAL = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M17.5 4h2.3l-5 5.7L21 20h-4.7l-3.7-4.8L8.2 20H5.9l5.4-6.1L4 4h4.8l3.3 4.4L17.5 4zm-.8 14.4h1.3L8.4 5.5H7L16.7 18.4z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22 12.2s0-3.2-.4-4.7c-.2-.8-.8-1.4-1.6-1.6C18.5 5.5 12 5.5 12 5.5s-6.5 0-8 .4c-.8.2-1.4.8-1.6 1.6C2 9 2 12.2 2 12.2s0 3.2.4 4.7c.2.8.8 1.4 1.6 1.6 1.5.4 8 .4 8 .4s6.5 0 8-.4c.8-.2 1.4-.8 1.6-1.6.4-1.5.4-4.7.4-4.7zM10 15.2V9.3l5.2 2.95L10 15.2z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              A premium cricket facility website demo — ready to customize with
              any club’s name, photos, pricing, and contact details.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a href="#map" className="text-sm text-white/70 transition hover:text-white">
              Map
            </a>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-green-500">
              Follow
            </p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-green-500 hover:bg-green-500 hover:text-green-950"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CricketHub Demo. All rights reserved.</p>
          <p>Built as a customizable cricket club website template.</p>
        </div>
      </div>
    </footer>
  );
}
