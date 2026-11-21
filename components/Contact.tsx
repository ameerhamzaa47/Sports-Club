import { CONTACT } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi CricketHub — I’d like to enquire about booking a cricket slot."
  )}`;

  return (
    <section id="contact" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to the club desk"
          description="Dummy contact details for demos. Swap these for any cricket club’s real information later."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-7 lg:col-span-2">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal">Visit us</h3>
                <p className="mt-3 text-charcoal-muted leading-relaxed">
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="mt-5 inline-block text-lg font-semibold text-green-800 transition hover:text-green-700"
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 block text-sm text-charcoal-muted hover:text-green-800"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  Opening hours
                </h3>
                <ul className="mt-3 space-y-3">
                  {CONTACT.hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-center justify-between gap-4 border-b border-border/80 pb-3 text-sm last:border-0"
                    >
                      <span className="font-medium text-charcoal">{row.day}</span>
                      <span className="text-charcoal-muted">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-green-900 p-7 text-white shadow-xl shadow-green-950/20">
            <div>
              <h3 className="font-display text-2xl font-semibold">Prefer WhatsApp?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Send a quick message to confirm availability, ask about coaching,
                or arrange group hire.
              </p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-green-950 transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M20.5 3.5A11 11 0 004.2 17.7L3 21l3.4-1.1A11 11 0 0020.5 3.5zm-8.6 17a9.1 9.1 0 01-4.6-1.3l-.3-.2-2.6.8.8-2.5-.2-.3a9.1 9.1 0 1116.8-4.7 9.1 9.1 0 01-9.9 8.2zm5-6.8c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1a7.4 7.4 0 01-2.2-1.4 8.2 8.2 0 01-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s1 2.4 1.1 2.6c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.3z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
