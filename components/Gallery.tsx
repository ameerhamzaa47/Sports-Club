import Image from "next/image";
import { GALLERY } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="The look and feel of the ground"
          description="High-quality visuals that help club owners show atmosphere, facilities, and match-day energy."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {GALLERY.map((image, index) => {
            const wide = image.span === "wide";
            const tall = image.span === "tall";
            return (
              <figure
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl ${
                  wide
                    ? "col-span-2 aspect-[16/10] md:aspect-auto md:min-h-[260px]"
                    : tall
                      ? "aspect-[3/4] md:row-span-2 md:aspect-auto md:min-h-full"
                      : "aspect-square md:aspect-auto md:min-h-[260px]"
                } ${index === 0 ? "md:col-span-2" : ""} ${
                  index === 1 ? "md:row-span-2" : ""
                } ${index === 3 ? "md:col-span-2" : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-950/80 to-transparent p-4 pt-12 text-sm text-white opacity-0 transition group-hover:opacity-100">
                  {image.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
