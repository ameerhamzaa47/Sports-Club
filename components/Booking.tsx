"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  GameId,
  SESSION_LENGTHS,
  canBookRange,
  formatHourAmPm,
  formatPrice,
  formatTimeRange,
  getAvailableSessions,
  getBookedHours,
  getDayHours,
  getGameById,
} from "@/lib/data";
import SectionHeading from "./SectionHeading";

type Confirmation = {
  name: string;
  date: string;
  gameName: string;
  timeRange: string;
  duration: number;
  price: number;
  phone: string;
};

type BookingProps = {
  selectedGameId: GameId;
  onGameChange: (id: GameId) => void;
};

function formatDisplayDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

export default function Booking({ selectedGameId, onGameChange }: BookingProps) {
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [duration, setDuration] = useState<(typeof SESSION_LENGTHS)[number]>(1);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const game = getGameById(selectedGameId);
  const dayHours = useMemo(() => getDayHours(), []);

  useEffect(() => {
    const today = todayISO();
    setDate(today);
    setMinDate(today);
  }, []);

  const bookedHours = useMemo(() => new Set(getBookedHours(date)), [date]);

  const availableSessions = useMemo(
    () => getAvailableSessions(date, duration),
    [date, duration]
  );

  const totalPrice = useMemo(() => {
    return game.pricePerHour * duration;
  }, [game.pricePerHour, duration]);

  const timeRange =
    startHour !== null ? formatTimeRange(startHour, duration) : "";

  const selectedHours = useMemo(() => {
    if (startHour === null) return new Set<number>();
    const hours = new Set<number>();
    for (let hour = startHour; hour < startHour + duration; hour += 1) {
      hours.add(hour);
    }
    return hours;
  }, [startHour, duration]);

  useEffect(() => {
    if (startHour === null) return;
    if (!canBookRange(date, startHour, duration)) {
      setStartHour(null);
    }
  }, [date, duration, startHour]);

  function handleDateChange(next: string) {
    setDate(next);
    setStartHour(null);
    setError("");
  }

  function handleDurationChange(next: (typeof SESSION_LENGTHS)[number]) {
    setDuration(next);
    setStartHour(null);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!date || startHour === null || !name.trim() || !phone.trim()) {
      setError("Please complete all fields and choose an available session.");
      return;
    }

    if (!canBookRange(date, startHour, duration)) {
      setError("That session overlaps a booked hour. Please pick another slot.");
      return;
    }

    setConfirmation({
      name: name.trim(),
      date,
      gameName: game.name,
      timeRange: formatTimeRange(startHour, duration),
      duration,
      price: totalPrice,
      phone: phone.trim(),
    });
  }

  function resetForm() {
    setConfirmation(null);
    setStartHour(null);
    setName("");
    setPhone("");
    setError("");
  }

  return (
    <section
      id="booking"
      className="relative overflow-x-hidden bg-green-950 py-16 text-white sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(45,173,127,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(26,122,90,0.4), transparent 35%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl min-w-0 px-3 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Booking"
          title="Reserve your slot in minutes"
          description="Pick a session length, then choose a full available window. Booked hours block any overlapping session."
        />

        {confirmation ? (
          <div className="mx-auto max-w-xl animate-scale-in rounded-2xl border border-white/10 bg-white p-5 text-charcoal shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-800">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold">Booking request received</h3>
            <p className="mt-2 text-charcoal-muted">
              Thanks, {confirmation.name}. We’ve logged your demo request for{" "}
              <span className="font-medium text-charcoal">{confirmation.gameName}</span> on{" "}
              <span className="font-medium text-charcoal">
                {formatDisplayDate(confirmation.date)}
              </span>{" "}
              · <span className="font-medium text-charcoal">{confirmation.timeRange}</span> (
              {confirmation.duration}h).
            </p>
            <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-900">
              Total: <strong>{formatPrice(confirmation.price)}</strong>
              <br />
              A club administrator would normally confirm via WhatsApp or phone (
              {confirmation.phone}). This demo confirms instantly for presentation.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-6 w-full rounded-full bg-green-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
            >
              Make another booking
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid w-full max-w-full min-w-0 gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-4 text-charcoal shadow-2xl backdrop-blur sm:gap-8 sm:rounded-3xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="min-w-0">
              <label htmlFor="session-length" className="block text-sm font-semibold text-charcoal">
                Session length
              </label>
              <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-2">
                {SESSION_LENGTHS.map((hours) => {
                  const active = duration === hours;
                  return (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => handleDurationChange(hours)}
                      className={`min-w-0 rounded-xl border px-1 py-2.5 text-sm font-semibold transition sm:px-2 sm:py-3 ${
                        active
                          ? "border-green-700 bg-green-800 text-white"
                          : "border-border bg-cream text-charcoal hover:border-green-700/40"
                      }`}
                      aria-pressed={active}
                    >
                      {hours}h
                    </button>
                  );
                })}
              </div>
              <select
                id="session-length"
                value={duration}
                onChange={(e) =>
                  handleDurationChange(Number(e.target.value) as (typeof SESSION_LENGTHS)[number])
                }
                className="sr-only"
                tabIndex={-1}
                aria-hidden
              >
                {SESSION_LENGTHS.map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>

              <label
                htmlFor="booking-date"
                className="mt-5 block text-sm font-semibold text-charcoal"
              >
                Select date
              </label>
              <input
                id="booking-date"
                type="date"
                min={minDate || undefined}
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="mt-2 box-border w-full max-w-full min-w-0 rounded-xl border border-border bg-cream px-3 py-3 text-base outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20 sm:px-4"
                required
              />

              <div className="mt-6 min-w-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
                  <p className="text-sm font-semibold text-charcoal">Hourly availability</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-green-600" /> Free
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-red-400/80" /> Booked
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-green-800" /> Your session
                    </span>
                  </div>
                </div>

                <div className="mt-3 -mx-1 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin]">
                  <div className="flex w-max gap-1 px-1">
                    {dayHours.map((hour) => {
                      const isBooked = bookedHours.has(hour);
                      const inSession = selectedHours.has(hour);
                      return (
                        <div
                          key={hour}
                          className={`flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-lg px-0.5 text-center text-[10px] font-medium sm:h-14 sm:w-12 sm:text-[11px] ${
                            isBooked
                              ? "bg-red-100 text-red-700 line-through"
                              : inSession
                                ? "bg-green-800 text-white"
                                : "bg-green-100 text-green-900"
                          }`}
                          title={
                            isBooked
                              ? `${formatHourAmPm(hour)} booked`
                              : inSession
                                ? `${formatHourAmPm(hour)} in your session`
                                : `${formatHourAmPm(hour)} free`
                          }
                        >
                          <span className="leading-tight">
                            {formatHourAmPm(hour).replace(":00", "")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] text-charcoal-muted sm:hidden">
                  Swipe sideways to see all hours
                </p>
              </div>

              <div className="mt-6 min-w-0">
                <p className="text-sm font-semibold text-charcoal">
                  Available {duration}h sessions
                </p>
                <p className="mt-1 text-xs leading-relaxed text-charcoal-muted">
                  Only full free windows are shown. Booked hours block overlapping sessions.
                </p>

                {availableSessions.length === 0 ? (
                  <p className="mt-3 rounded-2xl border border-dashed border-border bg-cream px-4 py-6 text-center text-sm text-charcoal-muted">
                    No {duration}h free windows on this date. Try another date or a shorter
                    session.
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {availableSessions.map((session) => {
                      const isSelected = startHour === session.startHour;
                      return (
                        <button
                          key={session.startHour}
                          type="button"
                          onClick={() => {
                            setStartHour(session.startHour);
                            setError("");
                          }}
                          className={`w-full min-w-0 rounded-xl border px-3 py-3 text-left text-sm font-medium transition sm:px-4 ${
                            isSelected
                              ? "border-green-700 bg-green-800 text-white shadow-md"
                              : "border-border bg-cream text-charcoal hover:border-green-700/40 hover:bg-green-50"
                          }`}
                          aria-pressed={isSelected}
                        >
                          <span className="block break-words font-semibold">{session.label}</span>
                          <span
                            className={`mt-0.5 block break-words text-xs ${
                              isSelected ? "text-white/75" : "text-charcoal-muted"
                            }`}
                          >
                            {duration}h · {formatPrice(totalPrice)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex min-w-0 flex-col">
              <p className="text-sm font-semibold">Selected game</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["cricket", "net", "padel"] as GameId[]).map((id) => {
                  const option = getGameById(id);
                  const active = selectedGameId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onGameChange(id)}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-3.5 ${
                        active
                          ? "bg-green-800 text-white"
                          : "bg-cream text-charcoal hover:bg-green-50"
                      }`}
                    >
                      {option.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-charcoal-muted">
                {formatPrice(game.pricePerHour)} / hour
              </p>

              <label htmlFor="booking-name" className="mt-5 block text-sm font-semibold">
                Full name
              </label>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="mt-2 box-border w-full max-w-full min-w-0 rounded-xl border border-border bg-cream px-3 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20 sm:px-4"
                required
                autoComplete="name"
              />

              <label htmlFor="booking-phone" className="mt-5 block text-sm font-semibold">
                Phone number
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
                className="mt-2 box-border w-full max-w-full min-w-0 rounded-xl border border-border bg-cream px-3 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20 sm:px-4"
                required
                autoComplete="tel"
              />

              <div className="mt-5 break-words rounded-2xl bg-green-50 px-3 py-3 text-sm text-green-900 sm:px-4">
                {date && startHour !== null ? (
                  <>
                    Selected: <strong>{formatDisplayDate(date)}</strong>
                    <br />
                    <strong>{timeRange}</strong>
                    <br />
                    <span className="mt-1 inline-block">
                      {game.name} · {duration}h · Total{" "}
                      <strong>{formatPrice(totalPrice)}</strong>
                    </span>
                  </>
                ) : (
                  "Choose an available session window to see your total price."
                )}
              </div>

              {error ? (
                <p className="mt-3 text-sm font-medium text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-auto w-full rounded-full bg-green-800 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-green-700 hover:shadow-lg active:scale-[0.99] sm:mt-8"
              >
                Submit booking request
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
