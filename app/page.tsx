import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import BookingExperience from "@/components/BookingExperience";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

function BookingFallback() {
  return (
    <>
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-56 animate-pulse rounded-3xl bg-green-900/10" />
        </div>
      </section>
      <section className="bg-green-950 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Facilities />
        <Suspense fallback={<BookingFallback />}>
          <BookingExperience />
        </Suspense>
        <Gallery />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
