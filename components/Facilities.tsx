import { FACILITIES } from "@/lib/data";
import FacilityIcon from "./FacilityIcon";
import SectionHeading from "./SectionHeading";

export default function Facilities() {
  return (
    <section id="facilities" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Facilities"
          title="Everything you need for quality cricket"
          description="Nets, ground hire, coaching support, and amenities — presented clearly so members know exactly what’s available."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility, index) => (
            <article
              key={facility.title}
              className="group rounded-2xl border border-border bg-cream/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-green-700/25 hover:bg-white hover:shadow-xl hover:shadow-green-950/8"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-800 text-white transition group-hover:bg-green-700">
                <FacilityIcon name={facility.icon} />
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal">
                {facility.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted sm:text-[0.95rem]">
                {facility.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
