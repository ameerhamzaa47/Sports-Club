import Image from "next/image";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-24"
    >
      <Image
        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=80"
        alt="Expansive cricket ground ready for play"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/92 via-green-950/72 to-green-900/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-green-950/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="animate-fade-up delay-1 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            Book your perfect cricket session
          </h1>
          <p className="animate-fade-up delay-2 mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Premium nets, practice slots, and ground hire — simple online booking
            for players, coaches, and clubs.
          </p>
          <div className="animate-fade-up delay-3 mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-green-500 px-7 py-3.5 text-base font-semibold text-green-950 shadow-lg shadow-black/20 transition hover:bg-white hover:scale-[1.02]"
            >
              Book a Slot
            </a>
            <a
              href="#facilities"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              View Facilities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
