"use client";

import { GAMES, GameId, formatPrice } from "@/lib/data";
import SectionHeading from "./SectionHeading";

type GamesProps = {
  selectedGameId: GameId;
  onSelect: (id: GameId) => void;
};

export default function Games({ selectedGameId, onSelect }: GamesProps) {
  return (
    <section id="games" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Games & rates"
          title="Choose your game"
          description="Select a game below, then book your starting time and session length. Prices are charged per hour."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => {
            const selected = selectedGameId === game.id;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  onSelect(game.id);
                  document.getElementById("booking")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 ${
                  selected
                    ? "border-green-700 bg-green-900 text-white shadow-xl shadow-green-950/20"
                    : "border-border bg-white text-charcoal hover:border-green-700/30 hover:shadow-xl hover:shadow-green-950/8"
                }`}
                aria-pressed={selected}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">{game.name}</h3>
                  {selected ? (
                    <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-green-950">
                      Selected
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    selected ? "text-white/75" : "text-charcoal-muted"
                  }`}
                >
                  {game.description}
                </p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-semibold tracking-tight">
                    {formatPrice(game.pricePerHour)}
                  </span>
                  <span className={`text-sm ${selected ? "text-white/70" : "text-charcoal-muted"}`}>
                    / hour
                  </span>
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
