import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 sm:py-24">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-green-100/70 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About CricketHub"
            title="A modern facility built for serious practice"
            description="CricketHub is a demo cricket venue experience designed for clubs that want a clean, professional online presence with effortless slot booking."
          />
          <div className="space-y-4 text-charcoal-muted leading-relaxed">
            <p>
              From early-morning nets to floodlit evening sessions, the facility
              is set up for individuals, academies, and weekend match hire —
              without complicated systems or cluttered pages.
            </p>
            <p>
              This demo showcases how a cricket club can present facilities,
              pricing, and bookings in one polished landing page that feels ready
              for real customers.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {[
              { value: "12+", label: "Net lanes" },
              { value: "7am", label: "Opens daily" },
              { value: "100%", label: "Online booking" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-green-800 sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-charcoal-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-green-950/15 sm:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1000&q=80"
              alt="Cricketer batting on a well-kept ground"
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 max-w-[220px] rounded-2xl bg-green-900 p-5 text-white shadow-xl sm:-left-8">
            <p className="font-display text-lg font-semibold leading-snug">
              Practice-ready grounds, every day of the week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
