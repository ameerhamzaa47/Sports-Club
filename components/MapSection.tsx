import SectionHeading from "./SectionHeading";

export default function MapSection() {
  return (
    <section id="map" className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Location"
          title="Find the ground"
          description="Embedded map placeholder using a generic demo location — replace with the club’s real pin when customizing."
        />

        <div className="overflow-hidden rounded-3xl border border-border shadow-lg shadow-green-950/5">
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <iframe
              title="CricketHub demo location map"
              src="https://maps.google.com/maps?q=cricket%20ground&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
